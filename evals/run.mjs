#!/usr/bin/env node
/**
 * VacinaCheck eval runner.
 *
 * Streams the golden set through the OpenAI reconciliation pipeline,
 * scores each output against the expected fields, and writes:
 *
 *   - evals/reports/run-<ISO>.json   (per-case + aggregate)
 *   - evals/reports/run-<ISO>.md     (human-readable summary)
 *
 * Usage:
 *   node evals/run.js [--model gpt-5.1] [--limit N] [--dry-run]
 *
 * Env:
 *   OPENAI_API_KEY (required unless --dry-run)
 *   OPENAI_ORG (optional)
 *   OPENAI_PROJECT (optional)
 *
 * Notes:
 *   - We score against the GPT reconciliation step only, not the
 *     Gemini PDF extraction. The golden set is plain-text vaccine
 *     card transcripts on purpose: keeps the eval reproducible and
 *     isolates extraction noise from reasoning noise.
 *   - Per-call latency and token usage are logged so we can spot
 *     model drift after upstream OpenAI updates.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadCases, scoreOne, summarize } from "./scorer.mjs";

// `openai` is loaded lazily so that --dry-run works without the package
// installed (handy for CI smoke checks and for scorer iteration).

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const args = process.argv.slice(2);
const argVal = (flag, def = null) => {
  const i = args.indexOf(flag);
  return i >= 0 ? args[i + 1] : def;
};
const hasFlag = (flag) => args.includes(flag);

const MODEL = argVal("--model", "gpt-5.1");
const LIMIT = parseInt(argVal("--limit", "0"), 10) || 0;
const DRY = hasFlag("--dry-run");

const SYSTEM_PROMPT = `Voce e um assistente clinico que reconcilia cartoes
de vacinacao brasileiros contra as recomendacoes oficiais (PNI 2025, SBIm
2025/2026, SUS gestantes, ocupacional, CRIE). Dado o texto de um cartao,
devolva APENAS um JSON com cinco campos:

{
  "done_vaccines": [..],
  "missing_for_age": [..],
  "due_next": [..],
  "contraindicated_now": [..],
  "flags": [..]
}

Regras:
- Nao invente vacinas. Nao recomende vacinas vivas para gestantes ou
  imunossuprimidos.
- Se houver registro ambiguo, coloque em "flags" um aviso explicito como
  "registros_ambiguos" e nao mova item ambiguo para "done_vaccines".
- Liste somente o que e clinicamente acionavel para o paciente especifico
  do cartao.`;

const userPrompt = (cardText) =>
  `CARTAO DE VACINACAO (texto extraido):\n\n${cardText}\n\nResponda apenas o JSON.`;

const tryParse = (raw) => {
  try {
    return JSON.parse(raw);
  } catch {
    const m = raw.match(/\{[\s\S]*\}/);
    if (m) {
      try {
        return JSON.parse(m[0]);
      } catch {
        // fall through
      }
    }
    return null;
  }
};

async function runOne({ openai, model, card }) {
  const t0 = Date.now();
  const resp = await openai.chat.completions.create({
    model,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userPrompt(card.vaccine_card_text) },
    ],
    response_format: { type: "json_object" },
  });
  const latencyMs = Date.now() - t0;
  const raw = resp.choices?.[0]?.message?.content ?? "";
  const predicted = tryParse(raw) ?? {
    done_vaccines: [],
    missing_for_age: [],
    due_next: [],
    contraindicated_now: [],
    flags: ["parse_error"],
  };
  return {
    predicted,
    raw,
    latencyMs,
    usage: resp.usage ?? null,
  };
}

function dryRunPrediction(card) {
  // Mock: copy the expected payload so the scorer reports 1.0 macroF1.
  // Useful when iterating on the scorer or in CI without spending tokens.
  return {
    predicted: card.expected,
    raw: JSON.stringify(card.expected),
    latencyMs: 0,
    usage: null,
  };
}

async function main() {
  let cases = loadCases();
  if (LIMIT > 0) cases = cases.slice(0, LIMIT);

  let openai = null;
  if (!DRY) {
    const { default: OpenAI } = await import("openai");
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      organization: process.env.OPENAI_ORG || undefined,
      project: process.env.OPENAI_PROJECT || undefined,
    });
  }

  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const reportsDir = path.join(__dirname, "reports");
  fs.mkdirSync(reportsDir, { recursive: true });

  const perCase = [];
  for (const c of cases) {
    process.stderr.write(`→ ${c.case_id} ... `);
    let out;
    try {
      out = DRY ? dryRunPrediction(c) : await runOne({ openai, model: MODEL, card: c });
    } catch (err) {
      process.stderr.write(`ERROR ${err.message}\n`);
      perCase.push({
        case_id: c.case_id,
        error: err.message,
        macroF1: 0,
        per: null,
        latencyMs: null,
        usage: null,
      });
      continue;
    }
    const scored = scoreOne({ predicted: out.predicted, expected: c.expected });
    perCase.push({
      case_id: c.case_id,
      scenario: c.scenario,
      ...scored,
      latencyMs: out.latencyMs,
      usage: out.usage,
    });
    process.stderr.write(`macroF1=${scored.macroF1.toFixed(3)} (${out.latencyMs}ms)\n`);
  }

  const agg = summarize(perCase.filter((c) => !c.error));
  const totalUsage = perCase.reduce(
    (a, c) => {
      if (!c.usage) return a;
      a.prompt_tokens += c.usage.prompt_tokens || 0;
      a.completion_tokens += c.usage.completion_tokens || 0;
      a.total_tokens += c.usage.total_tokens || 0;
      return a;
    },
    { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 }
  );
  const totalLatencyMs = perCase.reduce((a, c) => a + (c.latencyMs || 0), 0);

  const report = {
    model: MODEL,
    dryRun: DRY,
    timestamp: stamp,
    n: perCase.length,
    nScored: perCase.filter((c) => !c.error).length,
    aggregate: agg,
    totalUsage,
    totalLatencyMs,
    perCase,
  };

  const jsonPath = path.join(reportsDir, `run-${stamp}.json`);
  const mdPath = path.join(reportsDir, `run-${stamp}.md`);
  fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));

  const md = renderMarkdown(report);
  fs.writeFileSync(mdPath, md);

  process.stderr.write(`\nReport: ${jsonPath}\n        ${mdPath}\n`);
  process.stderr.write(
    `macroF1=${agg.macroF1.toFixed(3)}  total_tokens=${totalUsage.total_tokens}  total_latency=${totalLatencyMs}ms\n`
  );
}

function renderMarkdown(r) {
  const lines = [];
  lines.push(`# VacinaCheck eval run — ${r.timestamp}`);
  lines.push("");
  lines.push(`- Model: \`${r.model}\``);
  lines.push(`- Cases scored: ${r.nScored} / ${r.n}`);
  lines.push(`- Macro F1: **${r.aggregate.macroF1.toFixed(3)}**`);
  lines.push(`- Total tokens: ${r.totalUsage.total_tokens.toLocaleString("en")}`);
  lines.push(`- Total latency: ${r.totalLatencyMs.toLocaleString("en")} ms`);
  lines.push(`- Dry run: ${r.dryRun ? "yes (no model calls)" : "no"}`);
  lines.push("");
  lines.push("## Micro precision/recall per field");
  lines.push("");
  lines.push("| Field | Precision | Recall | F1 | TP | FP | FN |");
  lines.push("|---|---:|---:|---:|---:|---:|---:|");
  for (const [field, m] of Object.entries(r.aggregate.microPerField)) {
    lines.push(
      `| \`${field}\` | ${m.precision.toFixed(3)} | ${m.recall.toFixed(3)} | ${m.f1.toFixed(3)} | ${m.tp} | ${m.fp} | ${m.fn} |`
    );
  }
  lines.push("");
  lines.push("## Per-case macro F1");
  lines.push("");
  lines.push("| Case | Scenario | macro F1 | Latency (ms) |");
  lines.push("|---|---|---:|---:|");
  for (const c of r.perCase) {
    const f1 = c.error ? "ERR" : c.macroF1.toFixed(3);
    lines.push(`| ${c.case_id} | ${c.scenario ?? ""} | ${f1} | ${c.latencyMs ?? "-"} |`);
  }
  return lines.join("\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

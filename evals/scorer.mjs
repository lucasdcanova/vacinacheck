// VacinaCheck eval scorer — computes precision, recall and F1 per field
// against the golden set in ./golden-set/expected/.
//
// This is a deliberately field-level scorer (set-based) rather than
// model-judge-as-grader: that keeps the metric reproducible across
// model swaps and removes LLM-on-LLM noise.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const norm = (s) =>
  String(s ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const asSet = (arr) =>
  new Set((Array.isArray(arr) ? arr : []).map(norm).filter(Boolean));

/**
 * Loose token overlap: an item from `predSet` is considered a hit against
 * `goldSet` if its normalized token-bag overlaps the gold item by >= 60%.
 * This forgives "Pentavalente 4m" vs "Penta 4m" and similar surface noise
 * without falling back to embedding-based similarity.
 */
const tokenOverlap = (a, b) => {
  const at = new Set(a.split(" ").filter((t) => t.length > 2));
  const bt = new Set(b.split(" ").filter((t) => t.length > 2));
  if (at.size === 0 || bt.size === 0) return a === b ? 1 : 0;
  let hit = 0;
  for (const t of at) if (bt.has(t)) hit++;
  return hit / Math.max(at.size, bt.size);
};

const matchesAny = (item, set) => {
  if (set.has(item)) return true;
  for (const g of set) if (tokenOverlap(item, g) >= 0.6) return true;
  return false;
};

/** Returns {tp, fp, fn, precision, recall, f1} for a single field. */
function scoreField(predArr, goldArr) {
  const pred = asSet(predArr);
  const gold = asSet(goldArr);

  let tp = 0;
  for (const p of pred) if (matchesAny(p, gold)) tp++;
  const fp = pred.size - tp;
  const fn = [...gold].filter((g) => !matchesAny(g, pred)).length;

  const precision = pred.size === 0 ? (gold.size === 0 ? 1 : 0) : tp / pred.size;
  const recall = gold.size === 0 ? 1 : tp / gold.size;
  const f1 =
    precision + recall === 0 ? 0 : (2 * precision * recall) / (precision + recall);

  return { tp, fp, fn, precision, recall, f1 };
}

const FIELDS = ["done_vaccines", "missing_for_age", "due_next", "contraindicated_now", "flags"];

export function scoreOne({ predicted, expected }) {
  const per = {};
  for (const f of FIELDS) per[f] = scoreField(predicted?.[f], expected?.[f]);
  const macroF1 =
    FIELDS.reduce((a, f) => a + per[f].f1, 0) / FIELDS.length;
  return { per, macroF1 };
}

export function summarize(results) {
  const agg = Object.fromEntries(
    FIELDS.map((f) => [f, { tp: 0, fp: 0, fn: 0 }])
  );
  let n = 0;
  let macroF1Sum = 0;

  for (const r of results) {
    n++;
    macroF1Sum += r.macroF1;
    for (const f of FIELDS) {
      agg[f].tp += r.per[f].tp;
      agg[f].fp += r.per[f].fp;
      agg[f].fn += r.per[f].fn;
    }
  }

  const microPerField = Object.fromEntries(
    FIELDS.map((f) => {
      const { tp, fp, fn } = agg[f];
      const precision = tp + fp === 0 ? 1 : tp / (tp + fp);
      const recall = tp + fn === 0 ? 1 : tp / (tp + fn);
      const f1 =
        precision + recall === 0 ? 0 : (2 * precision * recall) / (precision + recall);
      return [f, { precision, recall, f1, tp, fp, fn }];
    })
  );

  return {
    n,
    macroF1: n === 0 ? 0 : macroF1Sum / n,
    microPerField,
  };
}

export function loadCases() {
  const cardsDir = path.join(__dirname, "golden-set", "cards");
  const expectedDir = path.join(__dirname, "golden-set", "expected");
  return fs
    .readdirSync(cardsDir)
    .filter((f) => f.endsWith(".json"))
    .sort()
    .map((f) => {
      const card = JSON.parse(fs.readFileSync(path.join(cardsDir, f), "utf8"));
      const expected = JSON.parse(
        fs.readFileSync(path.join(expectedDir, f), "utf8")
      );
      return { ...card, expected };
    });
}

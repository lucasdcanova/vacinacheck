# VacinaCheck evals

Reproducible evaluation harness for the GPT reconciliation step in
`app/api/analyze-vaccine/route.js`.

## Why this exists

The route chains Gemini 3 Pro (PDF text extraction) → GPT‑5.1 / GPT‑5
(reconciliation against PNI 2025, SBIm 2025/2026, SUS gestantes,
occupational and CRIE schedules). Until now the only signal that the
chain was still behaving correctly after a model upgrade was a clinician
spot‑checking the output. This directory turns that into a regression
test.

We deliberately score only the reconciliation step — the golden set is
plain‑text vaccine‑card transcripts, not PDFs — to keep the metric
reproducible across model swaps and to separate **extraction noise**
(Gemini OCR) from **reasoning noise** (GPT clinical mapping).

## Layout

```
evals/
├── golden-set/
│   ├── cards/         # 30 synthetic vaccine cards (plain text)
│   └── expected/      # 30 expected outputs (JSON)
├── reports/           # generated per run (gitignored)
├── run.mjs             # CLI runner
├── scorer.mjs          # field-level precision/recall/F1 (token-overlap matching)
└── RETRO.md           # short post-mortem on every meaningful regression
```

The 30 cases cover:

- 8 paediatric (0 mo – 9 yr) — typical PNI flow, missed windows, name
  variants, double-dose registrations
- 2 adolescent (HPV, dTpa, Meningo ACWY)
- 4 healthy adult (dT lapsed, Hep B incomplete, no Hep B history)
- 4 elderly (Pneumo schedule, Herpes Zoster half-dose, diabetes
  comorbidity)
- 4 obstetric (gestational dTpa, 1st trimester, fully covered 3rd
  trimester, postpartum window for live vaccines)
- 2 immunosuppressed (HIV stable, active chemotherapy)
- 3 traveller / occupational (yellow fever 10‑day rule, healthcare
  resident, lab non‑responder)
- 3 robustness (ambiguous "V V V" registrations, brand spelling drift,
  inadvertent extra dose)

All patient identifiers, dates and brand names in `golden-set/` are
**synthetic**. No real-patient data has ever lived here.

## Running

```bash
# Smoke run with no model calls — useful for CI and for iterating on
# the scorer itself. Returns macro F1 = 1.0 by construction.
node evals/run.mjs --dry-run

# Real run against gpt-5.1
OPENAI_API_KEY=sk-...  \
OPENAI_ORG=org-...     \
OPENAI_PROJECT=proj-... \
node evals/run.mjs --model gpt-5.1

# Real run, but only the first 5 cases
node evals/run.mjs --model gpt-5 --limit 5
```

Each run writes `evals/reports/run-<timestamp>.json` (full per-case
detail) and `evals/reports/run-<timestamp>.md` (summary table) so a
review can be done in 30 seconds without re-running anything.

## What we measure

Per field, against the gold answer (token‑overlap matching is forgiving
of `"Pentavalente 4m"` vs `"Penta 4m"`):

- **Precision** — of what the model claimed, how much was right
- **Recall** — of what the gold said, how much the model caught
- **F1** — harmonic mean

The five fields evaluated separately:

| Field | What it tests |
|---|---|
| `done_vaccines` | extraction + name normalisation |
| `missing_for_age` | clinical mapping against age + status |
| `due_next` | prioritisation (most-relevant-first) |
| `contraindicated_now` | safety: live vaccines on gestante / immunosuppressed |
| `flags` | non-clinical signals (atrasado, gestante, esquema_completo) |

The headline metric is the **macro F1** across the five fields, equally
weighted.

## Calibrating expectations

The thresholds we use today to decide whether a model can be promoted
to production:

| Metric | Promote | Investigate | Block |
|---|---:|---:|---:|
| Macro F1 | ≥ 0.85 | 0.70 – 0.85 | < 0.70 |
| `contraindicated_now` recall | = 1.00 | 0.95 – 0.99 | < 0.95 |
| `done_vaccines` precision | ≥ 0.90 | 0.80 – 0.90 | < 0.80 |
| p95 latency per case | ≤ 8 s | 8 – 15 s | > 15 s |

`contraindicated_now` is **never** allowed to regress — a missed
contraindication for a gestante or an immunocomprometido is a patient
safety event, not a metric drop.

## Cost note

A full 30-case run on `gpt-5.1` costs roughly USD 0.30 – 0.60 today
(prompts are short, completions are constrained JSON). CI runs `--dry-run`;
weekly real runs are triggered manually.

## When to extend the set

Add a new card whenever:

1. We add a new schedule reference file in `public/` (e.g. a new SBIm
   pocket schedule revision).
2. A clinician reports a real misclassification — turn it into a
   synthetic card, redact, add it.
3. We add a population we don't yet cover (e.g. transplant patients,
   anti‑CD20 users).

Keep the set small (~50 cards max). Above that the eval becomes its
own product to maintain.

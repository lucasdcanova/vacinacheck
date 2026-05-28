# Eval retrospective

Short notes on every meaningful regression. Append-only — never edit
past entries, write a new one with the date.

## 2026-05-28 — initial harness

**Why:** the reconciliation step (`app/api/analyze-vaccine/route.js`)
chains GPT-5.1 → GPT-5 with no programmatic safety net. Before today
the only signal the pipeline still worked was a clinician spot-checking
output. That doesn't scale and it doesn't survive a model upgrade.

**What we shipped:**

- 30 synthetic vaccine-card transcripts covering paediatric, adolescent,
  adult, elderly, gestante, immunosuppressed, traveller, occupational
  and three robustness cases (ambiguous registrations, brand spelling
  drift, inadvertent extra dose).
- A field-level scorer (precision / recall / F1) with token-overlap
  matching so that `"Pentavalente 4m"` and `"Penta 4m"` count as the
  same answer.
- A CLI runner that streams cases through the model, scores them, and
  writes a JSON + Markdown report per run.

**What we deliberately did not ship:**

- A grader-LLM. Field-level matching is enough at this size and keeps
  the metric reproducible across model swaps.
- A real PDF pipeline in evals. We score only the GPT reconciliation
  step on plain-text transcripts. Gemini extraction noise belongs in a
  separate harness once it earns its own regressions.
- An auto-fail CI gate on metric regression. Until we have at least
  three real model runs to baseline against, blocking PRs on F1 would
  block work for the wrong reason.

**Promotion thresholds in use today:**

- Macro F1 ≥ 0.85 to promote
- `contraindicated_now` recall must equal 1.00 — missed contraindication
  on gestante / imunossuprimido is a patient-safety event, not a
  metric drop
- `done_vaccines` precision ≥ 0.90 to avoid hallucinated histories
- p95 per-case latency ≤ 8 s

**Next regression to watch for:**

- GPT-5.1 → GPT-6 cutover whenever it lands. Run real before/after,
  diff `flags` and `due_next` (the two fields most sensitive to
  reasoning-style drift).

## How to add an entry

Whenever a real run drops below the promote thresholds OR a clinician
reports a misclassification:

1. Add the failing case to `golden-set/cards/` + `expected/`.
2. Re-run, capture the report path.
3. Append a new entry here with: date, what regressed, which case,
   root cause, fix, before/after macro F1.

Never delete an entry. The point of this file is that someone six
months from now can ask "why is the threshold 0.85?" and get the real
answer.

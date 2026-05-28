# Compliance remediation plan — VacinaCheck

**Owner:** Lucas Dickel Canova, MD
**Plan date:** 2026-05-28
**Source audit:** [`PII_AUDIT.md`](PII_AUDIT.md)
**Branch:** `chore/portfolio-polish-2026-05-28`

This plan operationalises the audit findings. Each item lists what to do, who can do it, the commands, an acceptance test, and a target date.

Items are ordered by **LGPD priority** — third-party PII first, then commercial exposure, then security hygiene, then process.

---

## R-1. Remove third-party CVs from the repository — **LGPD CRITICAL**

**Findings addressed:** F-1 (`CV Sophia Francy.pdf`), F-2 (`CV_Millena_Ollermann.md`).

**Why this is first:** LGPD treats publication of identified third-party personal data without a lawful basis as a violation regardless of how technical the channel is. A public-intent GitHub repository is publication.

### Step 1 — delete from working tree

```bash
git checkout chore/portfolio-polish-2026-05-28
git rm "CV Sophia Francy.pdf"
git rm "CV_Millena_Ollermann.md"
git commit -m "chore: remove third-party CVs (LGPD)"
```

### Step 2 — purge from git history

Step 1 alone is insufficient. The files remain in every prior commit, and on a public repo any clone retains them. A history rewrite is required.

Recommended tool: `git filter-repo` (modern replacement for `filter-branch`).

```bash
# Backup first.
git clone --mirror . ../vacina-check-backup-2026-05-28.git

# Then, on a fresh clone of the repo:
git filter-repo \
  --path "CV Sophia Francy.pdf" \
  --path "CV_Millena_Ollermann.md" \
  --invert-paths

# Force-push to overwrite history. Coordinate with any other contributors first.
git push --force --all
git push --force --tags
```

### Step 3 — invalidate GitHub caches

`git filter-repo` does not purge GitHub's web cache, pull-request views, or any fork. After the force-push:

1. Open a GitHub Support ticket asking them to garbage-collect the affected SHAs (`95e1880`, `be9a8ae`, and the polish-branch SHAs touching these files).
2. Delete any forks of the repo, or ask owners to delete them.
3. If the repo was ever indexed by code-search engines (Sourcegraph, Grep.app), request removal.

### Step 4 — notify the data subjects

LGPD art. 18 grants data subjects the right to be informed of the processing of their data and to request its elimination. Best practice:

- Notify Sophia Francy and Millena Ollermann in writing that their CVs were published in a public repository between `<date of be9a8ae>` / `<date of 95e1880>` and `<date of removal>`, that they have been removed, and that history has been purged.
- Document the notification — date, channel, content — in the clinic's LGPD log.

### Acceptance test

```bash
git log --all --full-history -- "CV Sophia Francy.pdf" "CV_Millena_Ollermann.md"
# expected: no output
```

**Target:** within 24 h of plan approval.

---

## R-2. Stop returning `error.stack` in `/api/analyze-vaccine`

**Finding addressed:** F-6.

The current code (verified at `app/api/analyze-vaccine/route.js:255-262`):

```js
} catch (error) {
    console.error("Erro na API de análise:", error);
    return NextResponse.json({
        error: 'Erro interno do servidor',
        details: error?.message || 'Erro desconhecido',
        stack: error?.stack || null
    }, { status: 500 });
}
```

### Proposed patch

```js
} catch (error) {
    // Log fully server-side; do NOT echo the stack to the client.
    console.error("Erro na API de análise:", error);

    const isProd = process.env.NODE_ENV === 'production';
    return NextResponse.json({
        error: 'Erro interno do servidor',
        details: isProd ? undefined : (error?.message || 'Erro desconhecido')
    }, { status: 500 });
}
```

Notes:

- This is a **behavior change** of the public API response shape (removes the `stack` and conditionalises `details`). Round 2 deliberately does not apply it because the brief forbids API changes. Owner decision required.
- The `console.error` already gives the full stack to Vercel / server logs.
- If the iOS or web client depends on `stack` to render a debug screen, audit and adjust before applying.

### Acceptance test

```bash
# trigger a 500 (e.g. send a corrupt PDF):
curl -X POST https://saudelivrefloripa.com.br/api/analyze-vaccine \
  -F "file=@corrupt.pdf" \
  -F "patientInfo={}"
# response JSON must not contain a "stack" field
```

**Target:** before the next iOS App Store submission.

---

## R-3. Remove internal commercial documents and verify their classification

**Findings addressed:** F-3 (`LobPr0024825.pdf`), F-4 (`Relatório_Listagem_Produto_Preco_Venda-*.pdf`), F-5 (`public/Informacoes da empresa`).

### Step 1 — manual inspection by Lucas

Open each file locally and confirm:

| File                        | What to check                                                            |
|-----------------------------|--------------------------------------------------------------------------|
| `LobPr0024825.pdf`          | Does it contain supplier names, customer names, contract values, CNPJs?  |
| `Relatório_Listagem...pdf`  | Confirm it is only the SKU/price list (not patient-linked invoices).     |
| `public/Informacoes da empresa` | Confirm no field is internal-only.                                   |

### Step 2 — delete + history purge

Same procedure as R-1. Add to the `git filter-repo --path ...` list:

```bash
git filter-repo \
  --path "LobPr0024825.pdf" \
  --path "public/Relatório_Listagem_Produto_Preco_Venda-23fe100f-f8e9-414d-bbb6-a9bad8c524b7.pdf" \
  --path "public/Informacoes da empresa" \
  --invert-paths
```

### Step 3 — verify the production URL is gone

Because items F-4 and F-5 sit under `public/`, they are served at:

```
https://saudelivrefloripa.com.br/Relatório_Listagem_Produto_Preco_Venda-23fe100f-f8e9-414d-bbb6-a9bad8c524b7.pdf
https://saudelivrefloripa.com.br/Informacoes%20da%20empresa
```

After redeployment, `curl -I` both URLs and confirm a 404.

**Target:** within 48 h of plan approval.

---

## R-4. Triage the unverified blobs and the marketing residue

**Findings addressed:** Low-severity table in `PII_AUDIT.md` (IMG_*, WhatsApp image, Design sem nome.png ×3).

### Step 1 — manual inspection by Lucas

For each of `IMG_2422.JPG`, `IMG_2423.JPG`, `WhatsApp Image 2026-01-07 at 18.32.13.jpeg`, `Design sem nome.png`, `Design sem nome - 1.png`, `Design sem nome - 1 2.png`:

1. Open the image.
2. Confirm whether it contains: (a) a real `carteirinha`, (b) a patient face, (c) screenshot of internal system, (d) genuinely a marketing draft, (e) clinic photography.
3. If (a)–(c): treat as critical, escalate into R-1.
4. If (d)–(e) but unused: delete.
5. If (e) and used somewhere: rename to a meaningful slug and move to `public/equipe/` or `public/marketing/`.

### Step 2 — apply

```bash
git rm "IMG_2422.JPG" "IMG_2423.JPG" "WhatsApp Image 2026-01-07 at 18.32.13.jpeg" \
       "Design sem nome.png" "Design sem nome - 1.png" "Design sem nome - 1 2.png"
git commit -m "chore: remove untracked marketing residue (audit R-4)"
```

History purge required only if step 1 revealed any patient content.

**Target:** within 1 week.

---

## R-5. Add CI guardrails to prevent recurrence

**Findings addressed:** general posture; prevents the next CV / screenshot / `.env` from being committed.

### Step 1 — secret scanning

Adopt `gitleaks` (or `trufflehog`) as a pre-commit hook and a CI job.

```yaml
# .github/workflows/secret-scan.yml — proposed
name: secret-scan
on: [pull_request, push]
jobs:
  gitleaks:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }
      - uses: gitleaks/gitleaks-action@v2
        env:
          GITLEAKS_LICENSE: ${{ secrets.GITLEAKS_LICENSE }}
```

### Step 2 — forbidden-file check

Block PRs that introduce PDFs, JPEGs, or PNGs outside whitelisted directories.

```yaml
# .github/workflows/forbidden-paths.yml — proposed
name: forbidden-paths
on: [pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }
      - name: Reject binary blobs outside whitelist
        run: |
          set -e
          changed=$(git diff --name-only --diff-filter=A "origin/${{ github.base_ref }}"...HEAD)
          for f in $changed; do
            case "$f" in
              public/icons/*|public/splash/*|public/equipe/*|ios/App/App/Assets.xcassets/*) ;;
              *.pdf|*.PDF|*.jpg|*.JPG|*.jpeg|*.JPEG|*.png|*.PNG)
                echo "::error file=$f::binary blob outside whitelisted directories";
                exit 1 ;;
            esac
          done
```

### Step 3 — Dependabot for `openai` and `@google/generative-ai`

The model SDKs change rapidly and have historically shipped regressions. Add `.github/dependabot.yml` with weekly checks on `npm` ecosystem.

**Target:** within 2 weeks.

---

## R-6. Document the clinical model chain version policy

**Round 1 gap.**

The model chain is hard-coded as `MODEL_CHAIN = ['gpt-5.1', 'gpt-5']` in `app/api/analyze-vaccine/route.js`. When OpenAI deprecates a model or ships a behavioral change, the clinical reconciliation output silently changes. There is currently no documented policy for:

- Re-validating output shape against the four `calendario_*.md` files when the model rolls forward.
- Pinning a specific snapshot (`gpt-5.1-YYYY-MM-DD`) for clinical reproducibility.
- Recording in `git log` which model produced which output during incident investigation.

### Proposed: add `docs/MODEL_POLICY.md`

Outline:

1. Pinned snapshot per release tag (`v1.0.0` → `gpt-5.1-2026-04-15`, etc.).
2. Re-validation checklist (run the model chain against a fixed, **redacted** fixture and compare JSON).
3. Rollback plan (last-known-good snapshot + how to set it via env override).
4. Bound on prompt-injection risk: explicit list of guards (`adult-only-card`, `gestante`) that must not be bypassable by uploaded content.

**Target:** before the next minor release.

---

## R-7. Build a redacted analysis fixture for clinical regression testing

**Round 1 gap.** Repo has no tests.

A single fixture (`tests/fixtures/redacted_carteira.pdf` — a manually authored fake card with no real patient data) plus a snapshot of the expected `Reconciliation` JSON is the minimum viable clinical regression test.

Acceptance: `npm test` runs the pipeline against the fixture using the pinned model snapshot and diffs the JSON against the snapshot, ignoring `arquivoEnviado.fileId` and ISO timestamps.

**Target:** quarter horizon — not urgent but high leverage.

---

## R-8. Confirm `docs/DATA_SOURCES.md` is sufficient for SBIm audit

Round 1 created `docs/DATA_SOURCES.md`. For SBIm/clinical auditability, the document is **adequate but light**. Recommended additions:

- For each `calendario_*.md`, the SHA of the last upstream document checked against, plus the date of that check.
- A clinician sign-off field per update (the `schedule_update.md` issue template already prompts for this; ensure it propagates into the commit body).
- A documented contact for the upstream owners (SBIm / Ministério da Saúde) for disputed entries.

**Target:** at the next `data:` commit, augment in flight.

---

## Execution checklist (Lucas)

- [ ] R-1: delete CVs + history rewrite + GitHub support ticket + notify subjects
- [ ] R-2: review whether removing `stack` from the 500 response breaks any client; if not, apply the patch
- [ ] R-3: inspect 3 commercial docs, delete + history rewrite, verify production URLs return 404
- [ ] R-4: inspect 6 blobs, escalate or delete
- [ ] R-5: enable `gitleaks` + forbidden-paths workflow + Dependabot
- [ ] R-6: write `docs/MODEL_POLICY.md`
- [ ] R-7: author a redacted fixture and snapshot test
- [ ] R-8: augment `docs/DATA_SOURCES.md` at next clinical update

---

## Why this plan does not include automated fixes

Round 2 of the portfolio polish operates under a "do not delete, do not change APIs" rule. All R-items above are *prescriptive* — the engineer (or Lucas) executes them after this round merges. The audit + this plan + `SECURITY.md` are the artefacts that survive the round.

# PII / PHI audit — VacinaCheck repository

**Audit date:** 2026-05-28
**Audited branch:** `chore/portfolio-polish-2026-05-28`
**Auditor scope:** static review of tracked files in `main` and the polish branch, against LGPD (Lei nº 13.709/2018), HIPAA (US), and GDPR. No live request capture, no dependency audit, no penetration testing.

> This is a *current-state* audit. Even after the offending files are deleted in the working tree, **the data persists in git history** until a history rewrite (`git filter-repo`, BFG) and force-push are performed. See [`COMPLIANCE_REMEDIATION_PLAN.md`](COMPLIANCE_REMEDIATION_PLAN.md) for the rewrite plan.

---

## Findings — by severity

### Severity legend

| Level    | Definition                                                                                             |
|----------|--------------------------------------------------------------------------------------------------------|
| Critical | Identifiable third-party PII or PHI committed to a public-intent repository. LGPD breach risk.         |
| High     | Internal commercial / pricing data exposed publicly without business need.                             |
| Medium   | Server-side detail (stack traces, error internals) reachable by an unauthenticated client.             |
| Low      | Unverified binary blobs of unclear provenance that *might* contain PII (manual review needed).         |
| Info     | Public business contact data already published by the clinic — not a finding, listed for completeness. |

---

### Critical — third-party PII (LGPD art. 5, I; art. 7; art. 11)

#### F-1. `CV Sophia Francy.pdf` (357 KB)

- **What:** Full curriculum vitae of an identified nurse (the current Responsável Técnica).
- **PII contained (confirmed by extraction):** full name, residential address (`Rua José Bonifácio, 378, Canto, Florianópolis/SC`), personal email (`sophiafrancy2525@gmail.com`), personal mobile (`(32) 99818-9130`), educational history, employment history.
- **Legal basis on file?** Not documented in repo. There is no record that the data subject consented to publication of this CV in a public-intent code repository.
- **LGPD classification:** `dado pessoal` (art. 5, I); the medical-professional registration (COREN) approaches `dado de profissional de saúde` but the residential address and personal mobile are squarely personal data unrelated to the professional role.
- **First introduced in commit:** `95e1880` ("feat: Atualiza equipe — substitui Milena por Sophia Francy").
- **Remediation:** delete from working tree + purge from history; if any portion (name, COREN) is needed for the public team page, those fields are already rendered through `public/equipe/sophia.jpg` and `app/equipe/` — the PDF itself is never linked from the app.

#### F-2. `CV_Millena_Ollermann.md` (8 KB)

- **What:** Full CV of a former nurse, in markdown.
- **PII contained:** full name, age (26), personal mobile `(51) 98598-9658`, personal email `mimiollermann@hotmail.com`, residence (`Florianópolis/SC`), COREN-SC 852967, education and employment history.
- **Legal basis on file?** Not documented. The person is no longer the RT (commit `4673c0f` replaced her with Thais), so the data has lost any operational purpose — LGPD art. 15 ("eliminação ao término do tratamento") applies.
- **First introduced in commit:** `be9a8ae` ("Add equipe page and remove pricing details").
- **Remediation:** delete + history purge. There is no business reason to retain.

---

### High — internal commercial data

#### F-3. `LobPr0024825.pdf` (10 MB)

- **What:** 2-page PDF emitted by an iOS app (Quartz PDFContext, Dec 2025) — content not extractable by `pdftotext` (likely raster). File name pattern matches an internal LOB ("loja-base"?) report ID.
- **Risk:** unknown contents. Manual review by Lucas required to confirm whether this is the price-list PDF or contains supplier/customer data. Assuming worst case: internal commercial document with no business reason to be in a public repo.
- **Remediation:** open locally, verify contents, delete + history purge.

#### F-4. `public/Relatório_Listagem_Produto_Preco_Venda-23fe100f-f8e9-414d-bbb6-a9bad8c524b7.pdf` (68 KB)

- **What:** "Listagem de Produtos com Preço de Venda" of `SAUDE LIVRE VACINAS - FLORIANOPOLIS`, dated 03/12/2025. Internal pricing report.
- **Note:** sits under `public/` and is therefore **served publicly by the Next.js app** at `https://saudelivrefloripa.com.br/Relatório_Listagem_Produto_Preco_Venda-23fe100f-f8e9-414d-bbb6-a9bad8c524b7.pdf`. The UUID-style filename provides only obscurity, not access control.
- **Risk:** competitive exposure of vaccine pricing; not a regulated-data issue, but a commercial one.
- **Remediation:** delete from working tree, remove from production deployment, history purge.

#### F-5. `public/Informacoes da empresa` (2.4 KB, no extension)

- **What:** unstructured markdown-ish file labelled "Informações extraídas de fontes públicas (Instagram e site institucional)" — clinic identity, address, public phone, public email, hours, target audience, services, positioning, and an explicit "o que NÃO aparece publicamente" section that itself enumerates what is *not* public (prices, internal clinical protocols, certifications).
- **Note:** sits under `public/` and is served at `https://saudelivrefloripa.com.br/Informacoes da empresa`. The metadata is benign (publicly known clinic contact) **but** the file is described as scraped from public sources for internal analysis purposes — its presence in `public/` is unintended.
- **Remediation:** move to a private location or delete. Keep the underlying data only in code where it is rendered intentionally (footer, layout, schemas).

---

### Medium — server-side detail leaked to client

#### F-6. Stack-trace exposure in `app/api/analyze-vaccine/route.js:260`

```js
return NextResponse.json({
    error: 'Erro interno do servidor',
    details: error?.message || 'Erro desconhecido',
    stack: error?.stack || null
}, { status: 500 });
```

- **What:** the unhandled-exception branch returns the full Node.js stack trace in the 500 response body. Any client (browser, iOS app, third party probing the endpoint) sees internal file paths, dependency call sites, and potentially library internals on any failure.
- **Risk:** classic information-disclosure aiding reconnaissance; common OWASP A05:2021 (Security Misconfiguration) finding; not a PHI leak by itself, but downgrades the security posture and historically has leaked package versions / monorepo paths.
- **Why not fixed in this round:** Round 2 scope (and the "do not change APIs" rule) prohibits altering the response shape. Tracked in [`COMPLIANCE_REMEDIATION_PLAN.md`](COMPLIANCE_REMEDIATION_PLAN.md) item R-2 with proposed patch.

---

### Low — unverified blobs

The following files are committed and shipped in the repo but their contents could not be verified statically in this audit. Each requires manual inspection by Lucas to confirm whether they contain PII, patient data, or are reusable marketing assets.

| File                                          | Size  | Notes                                                          |
|-----------------------------------------------|-------|----------------------------------------------------------------|
| `IMG_2422.JPG`                                | 132 K | Filename pattern matches iPhone Camera Roll. Provenance unknown. |
| `IMG_2423.JPG`                                | 144 K | Same.                                                          |
| `WhatsApp Image 2026-01-07 at 18.32.13.jpeg`  | 148 K | WhatsApp-sourced image. May contain forwarded patient content. |
| `Design sem nome.png`                         | 2.1 M | Canva default name. Likely marketing draft.                    |
| `Design sem nome - 1.png`                     | 2.1 M | Same.                                                          |
| `Design sem nome - 1 2.png`                   | 1.1 M | Same — note the `1 2` suffix from a macOS duplicate.           |

None of these are referenced from any `import`, `src=`, or asset manifest the audit could find. They appear to be drag-and-drop residue.

---

### Info — public business data

The following are not findings; listed so future reviewers don't re-raise them:

- Clinic public phone `(48) 99189-5758` — appears in `app/page.js`, `app/layout.js`, `components/Footer.js`, `app/folder-profissionais/page.js`, `app/vacinas/[slug]/VacinaPageClient.js`. This is the clinic's publicly advertised contact and is *intended* to be public.
- Address `Alameda Gov. Heriberto Hulse, 123 — Centro, Florianópolis/SC` — same justification.
- Clinic email `contato@saudelivrevacinas.com.br` in `saude_livre_brand_guidelines.json` — public franchise contact.

---

## Secrets scan — exhaustive

Patterns scanned across tracked sources and full git history (`git log --all --full-history -p`) for: `sk-...`, `sk-proj-...`, `AIza...`, `gho_/ghp_...`, `xoxb-/xoxp-...`.

- **Working tree (`*.js, *.jsx, *.ts, *.tsx, *.json, *.md, *.env*, *.yml, *.yaml`):** clean. The only matches were placeholders inside `.env.example`.
- **Full git history (`git log --all -p`):** clean for the patterns above.
- **`process.env` references:** only `OPENAI_API_KEY`, `OPENAI_ORG`, `OPENAI_ORGANIZATION`, `OPENAI_PROJECT`, `GEMINI_API_KEY`, `GEMINI_MODEL`, `NEXT_PUBLIC_API_URL` — all documented in `.env.example` and the README. None are logged or echoed.
- **`console.log` / `console.error` of env vars:** none. Logs in `app/api/analyze-vaccine/route.js` print error objects, not env contents — but see F-6 about the response-body leak.
- **Database URLs:** none — the project has no database.
- **Webhook URLs / signing keys:** none.

**Conclusion:** no credentials in tree or in history at audit time. The exposure risk is *future* (a developer pasting a key into one of the binary docs would be invisible to text-based scans), not current.

---

## Compliance posture

| Framework | Applies?    | Current posture                                                                                             |
|-----------|-------------|-------------------------------------------------------------------------------------------------------------|
| LGPD      | yes (BR)    | **Non-compliant** until F-1 and F-2 are removed from working tree *and* purged from git history.            |
| HIPAA     | no (no US patients) | Out of jurisdictional scope, but the data-minimization posture is consistent with HIPAA technical safeguards once F-6 is fixed. |
| GDPR      | possibly    | If any data subject is an EU resident at any point of processing, GDPR art. 6 / art. 9 apply. Same remediation as LGPD covers this. |

---

## Suggested CI guardrails (not implemented in this round)

- `gitleaks` or `trufflehog` pre-commit + CI job, configured to fail on the `OPENAI_API_KEY` / `AIza...` patterns above.
- A repo-level `forbidden-paths` check that rejects PRs adding `*.pdf`, `*.jpg`, `*.jpeg`, `*.png` outside `public/icons/`, `public/splash/`, `public/equipe/`, and `ios/App/App/Assets.xcassets/`.
- A periodic `git ls-files | xargs file` cron that flags non-text blobs whose names look like screenshots or scans (`IMG_*`, `WhatsApp*`, `CV*`, `Relat*`, `Lob*`, `Design sem nome*`).

These are filed in [`COMPLIANCE_REMEDIATION_PLAN.md`](COMPLIANCE_REMEDIATION_PLAN.md) under R-5.

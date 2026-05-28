# Security policy

VacinaCheck is the production stack of [Saúde Livre Vacinas — Florianópolis Centro](https://saudelivrefloripa.com.br) and powers the iOS app `br.com.saudelivre.vacinacheck`. It processes uploaded vaccination cards (`carteirinhas`) and runs a clinical reconciliation pipeline against the SBIm / SUS schedules. Vulnerabilities that could expose patient data, schedule data, or production credentials are treated as high severity.

---

## Supported versions

Only the `main` branch of this repository, as deployed at `saudelivrefloripa.com.br` and shipped through the latest iOS build of `br.com.saudelivre.vacinacheck`, is supported with security fixes.

| Version              | Supported |
|----------------------|-----------|
| `main` (production)  | yes       |
| Feature branches     | no        |
| Forks                | no        |

---

## Reporting a vulnerability

**Please do not open a public GitHub issue for security reports.**

Email: `seguranca@saudelivrefloripa.com.br` (or, until that mailbox is provisioned, the maintainer at the address listed on <https://www.lucascanova.com.br/portfolio>).

Include, where possible:

- A concise description of the issue.
- The affected component (web, iOS app, `app/api/analyze-vaccine`, schedule markdowns, etc.).
- Reproduction steps. **Do not include real patient data.** Use redacted screenshots or describe the case in abstract terms (e.g. "adult-only-card, 34F, not pregnant").
- Your assessment of impact (information disclosure, RCE, prompt injection bypassing clinical guardrails, etc.).
- Any proposed remediation.

Encrypted reports are accepted; request a PGP key in your first message and one will be provided out of band.

### What to expect

- Acknowledgement within **3 business days**.
- A first triage assessment (severity, applicability) within **7 business days**.
- A target remediation window of **30 days** for high-severity issues, longer for lower severity.
- Credit in release notes if you wish (anonymous reports are also accepted).

---

## Scope

### In scope

- The Next.js application (`app/`, `lib/`, `components/`).
- The clinical reconciliation API (`app/api/analyze-vaccine/route.js`) — including prompt injection that bypasses adult-only-card or gestante guards.
- The Capacitor iOS wrapper (`ios/`).
- Schedule markdown ingestion (`public/calendario_vacinal_*.md`, `public/vacinacao_gestantes_rede_privada.md`).
- Build / CI / static export configuration.

### Out of scope

- Findings that depend on a compromised user device or stolen OS-level credentials.
- Social engineering of clinic staff.
- Denial of service through volumetric attacks on the production host.
- Reports about third-party content rendered by the model (use the bug template instead, since these are clinical-content issues, not security issues).
- Theoretical issues in the SBIm / PNI source documents themselves — those belong upstream.

---

## Sensitive data handling expectations

VacinaCheck is regulated by the Brazilian **LGPD** (Lei Geral de Proteção de Dados, Lei nº 13.709/2018) because it processes health data (`dado pessoal sensível`, art. 5, II). The following invariants must hold at all times:

1. **No patient `carteirinha` (image or PDF) is ever committed to this repository.** `.gitignore` blocks the obvious patterns; reviewers must reject PRs that include any binary that could be a real patient record.
2. **No PII of third parties** — staff CVs, supplier reports, internal commercial documents — is committed. See [`docs/PII_AUDIT.md`](docs/PII_AUDIT.md) for the current inventory and [`docs/COMPLIANCE_REMEDIATION_PLAN.md`](docs/COMPLIANCE_REMEDIATION_PLAN.md) for the remediation queue.
3. **No production secrets** (`OPENAI_API_KEY`, `GEMINI_API_KEY`, database URLs, signing keys) are committed. `.env.example` is the only env file that may be tracked.
4. **Server logs that include exception stacks must not be returned in API responses to end users.** A known violation of this rule exists in `app/api/analyze-vaccine/route.js` (the unhandled-exception branch surfaces `error?.stack` to the client) and is tracked in [`docs/COMPLIANCE_REMEDIATION_PLAN.md`](docs/COMPLIANCE_REMEDIATION_PLAN.md).

---

## Disclosure philosophy

Coordinated disclosure. Once a fix is shipped, we publish a brief advisory describing the issue, affected commits, and mitigation. We do not embargo issues that are actively being exploited against patient data — those receive an immediate public advisory regardless of fix status.

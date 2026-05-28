# Data sources

The clinical correctness of VacinaCheck depends entirely on the schedule references it reconciles against. This document tracks where those references come from, how they are versioned, and how updates are applied.

> The application code does **not** embed schedule rules. The four markdown documents listed below are read from `public/` at request time and injected into the model prompt. To update the schedule the clinic uses, edit the markdown — no code change is required.

---

## Reference documents

All four files live at the repository root under `public/`.

### 1. `calendario_vacinal_brasil.md`

- **Source:** Programa Nacional de Imunizações (PNI) — Ministério da Saúde / SUS.
- **Upstream:** https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/c/calendario-nacional-de-vacinacao
- **Scope:** Calendário Nacional de Vacinação — full public-network schedule, infant through elderly.
- **Last dataset update in repo:** SBIm 2025/2026 cycle.

### 2. `calendario_vacinal_criancas.md`

- **Source:** Sociedade Brasileira de Imunizações (SBIm) — Calendário SBIm Criança.
- **Upstream:** https://sbim.org.br/calendarios-de-vacinacao
- **Scope:** Pediatric private-network schedule (birth through 19 years), including catch-up rules.
- **Last dataset update in repo:** SBIm 2025/2026.

### 3. `calendario_vacinal_sbim_nascimento_terceira_idade.md`

- **Source:** SBIm — consolidated lifetime schedule from birth to elderly.
- **Upstream:** https://sbim.org.br/calendarios-de-vacinacao
- **Scope:** Adult and elderly schedules, including dT/dTpa boosters, Hep B, yellow fever, influenza, pneumococcal 13/23, herpes zoster (Shingrix), dengue.
- **Last dataset update in repo:** SBIm 2025/2026.

### 4. `vacinacao_gestantes_rede_privada.md`

- **Source:** SBIm — Calendário SBIm Gestante (private network).
- **Upstream:** https://sbim.org.br/calendarios-de-vacinacao
- **Scope:** Pregnancy schedule — dTpa from week 20, influenza any trimester, Hep B if susceptible, COVID-19 per current MS guidance, contraindications (live attenuated vaccines).
- **Last dataset update in repo:** SBIm 2025/2026.

---

## Update process

The SBIm publishes a refreshed annual calendar (typically late Q1) and the Ministério da Saúde issues PNI notes ad-hoc during the year. The internal process for keeping VacinaCheck current:

1. On SBIm release: a clinician on the Saúde Livre team transcribes the change into the corresponding markdown file in `public/`.
2. Each markdown file's first heading carries the cycle year (e.g. `CALENDÁRIO VACINAL SBIm 2025/2026`).
3. Changes are committed with a `data:` prefix in the message (e.g. `data: update SBIm adulto 2026 — add Shingrix booster`) so the schedule history is filterable via `git log`.
4. No code change is required unless a new entity type is introduced (e.g. a new patient profile field).

This decoupling means the application can be audited independently of the clinical content, and the clinical content can be audited independently of the application.

---

## What is *not* a data source

- `lib/vacinas-data.js` — a UI/SEO catalog of vaccines for the marketing pages. Used to render `/vacinas` and `/vacinas/[slug]`. **Not** consulted at reconciliation time and **must not** be relied on as a clinical reference.
- Patient input — collected per session, never persisted server-side. The OpenAI file upload is to OpenAI's `assistants` storage and is identified back to the client by `fileId` for traceability of a given analysis; it is not used to train models (per OpenAI API terms for the Responses API with workspace-controlled data settings).

---

## Disclaimer

The schedule references reproduce technical documents published by Brazilian public-health bodies for clinical decision support. VacinaCheck applies these references through a probabilistic model; the output is a structured suggestion intended for review by a qualified healthcare professional and does not constitute medical advice.

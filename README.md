# VacinaCheck — Saúde Livre Floripa

> AI-assisted vaccination card analysis built on the SBIm 2025/2026 and SUS schedules. Powers the patient-facing site and iOS app of **[Saúde Livre Vacinas](https://saudelivrefloripa.com.br)** — a private vaccination clinic in Florianópolis (SC), Brazil.

**Status:** Live in production (web + iOS via Capacitor)
**Live URL:** https://saudelivrefloripa.com.br
**Bundle ID (iOS):** `br.com.saudelivre.vacinacheck`

---

## The problem

Brazil runs one of the most complex public immunization programs in the world. A single patient may be subject to four overlapping schedules at once:

- **SUS / PNI** — the national public schedule (Ministério da Saúde)
- **SBIm pediátrica / adulto / idoso** — private-network schedules from the Sociedade Brasileira de Imunizações
- **Gestantes** — pregnancy-specific (dTpa from week 20, influenza any trimester, etc.)
- **Viajantes e ocupacional** — yellow fever, hepatitis A, rabies, etc.

In day-to-day clinical practice the carteirinha de vacinação arrives as a faded paper booklet or a phone photo. Reconciling what was already given against what is *currently due* — for a specific age, sex, pregnancy week, and adult-vs-pediatric record set — is slow and error-prone.

**VacinaCheck does that reconciliation.** A patient or clinician uploads the card; the tool returns a structured report: vaccines on record, missing doses for the patient's profile, and the next due doses with the clinical rationale.

---

## How it works

```
 ┌──────────────────────┐    ┌────────────────────────┐    ┌──────────────────────┐
 │  Patient profile     │    │  Card upload           │    │  SBIm / SUS schedule │
 │  (age, sex,          │    │  (image or PDF)        │    │  reference markdowns │
 │   gestation week,    │    │                        │    │  (public/)           │
 │   adult-only card)   │    │                        │    │                      │
 └──────────┬───────────┘    └──────────┬─────────────┘    └──────────┬───────────┘
            │                           │                             │
            │                           ▼                             │
            │              ┌────────────────────────┐                 │
            │              │ Gemini 3 Pro (PDF)     │                 │
            │              │ → extracted text       │                 │
            │              └──────────┬─────────────┘                 │
            │                         │                               │
            ▼                         ▼                               ▼
           ┌────────────────────────────────────────────────────────────┐
           │  GPT-5 / GPT-5.1 — clinical reconciliation prompt          │
           │  (model chain with fallback, JSON-strict output)           │
           └──────────────────────────┬─────────────────────────────────┘
                                      │
                                      ▼
            ┌──────────────────────────────────────────────────────┐
            │  Structured report                                   │
            │  - vacinasTomadas    [{ nome, data, lote, dose }]    │
            │  - vacinasFaltantes  [{ nome, motivo }]              │
            │  - proximasDoses     [{ nome, dataPrevista, ... }]   │
            │  - observacoes       (clinical summary)              │
            └──────────────────────────────────────────────────────┘
```

The schedule reference is **not** embedded in the model — it is shipped as four versioned markdown documents in `public/` and injected into the prompt at request time, so the immunization rules can be audited and updated independently of the application code.

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for the domain model and request flow, and [`docs/DATA_SOURCES.md`](docs/DATA_SOURCES.md) for the schedule sources and update cadence.

---

## Stack

| Layer        | Choice                                                              |
|--------------|---------------------------------------------------------------------|
| Framework    | Next.js 15 (App Router) + React 18                                  |
| Styling      | Tailwind CSS                                                        |
| AI — vision  | Google Gemini 3 Pro Preview (PDF → text)                            |
| AI — clinical| OpenAI Responses API, model chain `gpt-5.1` → `gpt-5`               |
| Mobile       | Capacitor 8 (iOS) — wraps the static export                         |
| SEO          | Per-vaccine dynamic routes `/vacinas/[slug]`, sitemap, JSON-LD      |
| Analytics    | Google Tag Manager (`GTM-MQQ7M24R`)                                 |

---

## Quick start

```bash
# install
npm install

# configure environment (see .env.example)
cp .env.example .env.local

# dev server
npm run dev
# → http://localhost:3000
```

### Required environment variables

| Variable              | Purpose                                                         |
|-----------------------|-----------------------------------------------------------------|
| `OPENAI_API_KEY`      | Clinical reconciliation (GPT-5 / GPT-5.1 Responses API)         |
| `OPENAI_ORG`          | (optional) OpenAI organization                                  |
| `OPENAI_PROJECT`      | (optional) OpenAI project, if scoped                            |
| `GEMINI_API_KEY`      | PDF text extraction (Gemini 3 Pro)                              |
| `GEMINI_MODEL`        | (optional) override Gemini model id                             |

### Scripts

| Script                       | What it does                                                |
|------------------------------|-------------------------------------------------------------|
| `npm run dev`                | Next.js dev server                                          |
| `npm run build`              | Production build (server mode, API routes active)           |
| `npm run start`              | Serve production build                                      |
| `npm run lint`               | Next.js lint                                                |
| `npm run export`             | Static export (`STATIC_EXPORT=true`) for Capacitor          |
| `npm run cap:sync`           | Sync web assets into the iOS project                        |
| `npm run cap:open:ios`       | Open the iOS project in Xcode                               |
| `npm run prepare:appstore`   | Export + sync, ready for Xcode upload                       |
| `npm run generate:icons`     | Regenerate app icons / splash assets                        |

iOS-specific docs live in [`docs/APP_STORE_GUIDE.md`](docs/APP_STORE_GUIDE.md) and [`docs/MOBILE_GUIDE.md`](docs/MOBILE_GUIDE.md).

---

## Repository layout

```
app/
  api/analyze-vaccine/route.js   # Gemini + GPT-5 pipeline
  vacinas/[slug]/                # per-vaccine SEO pages
  equipe/                        # clinical team
  folder-profissionais/          # printable folder for HCPs
  layout.js · page.js · sitemap.js · opengraph-image.js
components/
  VacinaCheck.jsx                # main client flow (upload → result)
  Footer.js · InstallPrompt.jsx
lib/
  vacinas-data.js                # vaccine catalog (UI + SEO)
  api.js · capacitor.js
public/
  calendario_vacinal_brasil.md
  calendario_vacinal_criancas.md
  calendario_vacinal_sbim_nascimento_terceira_idade.md
  vacinacao_gestantes_rede_privada.md
ios/                             # Capacitor iOS project
docs/                            # architecture + data sources + iOS guides
```

---

## Clinical scope

VacinaCheck supports reconciliation against:

- Pediatric calendar (birth → adolescence): BCG, Hep B, Penta, VIP/VOP, Pneumo 10/13, Rotavirus, Meningo C/ACWY/B, Yellow Fever, MMR/MMRV, DTP, Hep A, HPV, Varicela
- Adult and elderly calendar: dT/dTpa, Hep B, Yellow Fever, Influenza, Pneumo 13/23, Herpes Zoster, Dengue, Shingrix
- Pregnancy: dTpa from week 20, influenza any trimester, Hep B if susceptible, COVID-19 per current MS guidance
- Adult-only-card mode: skips infant catch-up to avoid false-positive "missing" entries

> This tool supports — it does not replace — clinical judgment. The output is a structured suggestion for the attending professional.

---

## Production context

VacinaCheck is the digital front door for **Saúde Livre Floripa**, a private vaccination clinic in Florianópolis Centro (SC). It is the same codebase used to:

- run the marketing site for the clinic (per-vaccine SEO pages, equipe, agendamento via WhatsApp)
- distribute the iOS app on the App Store under `br.com.saudelivre.vacinacheck`
- offer patients an immediate first-pass read of their carteirinha before the in-person consult

This is not a research prototype. It is a production tool used in a real clinic.

---

## License

MIT — see [`LICENSE`](LICENSE).

The Brazilian immunization schedules referenced in `public/` are public-domain technical documents published by the Ministério da Saúde (PNI/SUS) and the Sociedade Brasileira de Imunizações (SBIm). They are reproduced as-is for technical reference; see [`docs/DATA_SOURCES.md`](docs/DATA_SOURCES.md).

---

## Author

**Lucas Dickel Canova, MD** — surgeon and endoscopist, co-owner of Saúde Livre Floripa.
Portfolio: <https://www.lucascanova.com.br/portfolio>
Clinic: <https://saudelivrefloripa.com.br>

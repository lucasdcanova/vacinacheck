# Architecture

This document describes the domain model and request flow of VacinaCheck. For data provenance, see [`DATA_SOURCES.md`](DATA_SOURCES.md).

---

## Domain model

The domain is structured around five entities:

### `PatientProfile`

Captured in the client before any analysis runs. Used both to gate the analysis (adult-only mode skips infant catch-up) and to inject context into the model prompt.

| Field             | Type                                  | Notes                                                  |
|-------------------|---------------------------------------|--------------------------------------------------------|
| `idade`           | number (years) or derived from DOB    | Drives age window matching                             |
| `sexo`            | `'masculino' \| 'feminino'`           | Drives HPV reach, gestation gating                     |
| `gestante`        | boolean                               | Toggles gestation-specific schedule                    |
| `semanasGestacao` | number                                | Drives dTpa timing (≥20 wk), trimester-based rules     |
| `carteiraAdulta`  | boolean                               | If true, infant vaccines are not flagged as missing    |

### `VaccineRecord`

The result of OCR/extraction on the uploaded carteirinha — what the patient *has* received.

| Field   | Type            | Source                                       |
|---------|-----------------|----------------------------------------------|
| `nome`  | string          | Normalized against `SINONIMOS_VACINAS`       |
| `data`  | `DD/MM/AAAA`    | When visible on the card                     |
| `lote`  | string          | When visible (used for traceability)         |
| `dose`  | string          | `1ª dose`, `reforço`, `dose única`, etc.     |

### `ScheduleEntry`

Each entry in the SBIm / SUS reference markdowns (`public/calendario_vacinal_*.md`) is a row of the canonical schedule the model is asked to reconcile against. The reference documents are kept as plain markdown so that:

- updates are reviewable as a normal diff
- the source of truth is auditable without reading code
- a clinician can edit them without touching the application

### `Reconciliation` (model output)

The Responses API is called with `text.format = json_object` so the output is always a structured `Reconciliation`:

```json
{
  "vacinasTomadas":    [{ "nome": "...", "data": "DD/MM/AAAA", "lote": "...", "dose": "..." }],
  "vacinasFaltantes":  [{ "nome": "...", "motivo": "..." }],
  "proximasDoses":     [{ "nome": "...", "dataPrevista": "...", "indicacao": "..." }],
  "observacoes":       "Free-text clinical summary",
  "modeloUtilizado":   "gpt-5.1",
  "cadeiaModelosTentados": ["gpt-5.1", "gpt-5"],
  "arquivoEnviado":    { "nome": "...", "tipo": "...", "pdf": true, "fileId": "..." }
}
```

### `VaccineCatalog`

A separate, UI-facing catalog (`lib/vacinas-data.js`) used by the marketing site to render `/vacinas` and the per-vaccine SEO pages `/vacinas/[slug]`. Fields: `id`, `slug`, `nome`, `descricao`, `descricaoDetalhada`, `indicacao`, `categoria`, `esquemaVacinal`, `contraindicacoes[]`, `efeitosColaterais[]`, `cuidados`, `faq[]`, `keywords[]`. This is **not** consulted at analysis time — it exists for content and SEO.

---

## Request flow — `POST /api/analyze-vaccine`

```
client                                   server                                   external
  │                                        │                                         │
  │  multipart/form-data                   │                                         │
  │   - file: image | pdf                  │                                         │
  │   - patientInfo: JSON-string           │                                         │
  ├───────────────────────────────────────▶│                                         │
  │                                        │ 1. parse formData                       │
  │                                        │ 2. read 4 markdown schedules            │
  │                                        │    from public/                         │
  │                                        │                                         │
  │                                        │ if PDF:                                 │
  │                                        │ 3a. base64 → Gemini 3 Pro Preview       │
  │                                        ├────────────────────────────────────────▶│
  │                                        │                            extracted text
  │                                        │◀────────────────────────────────────────┤
  │                                        │                                         │
  │                                        │ if image:                               │
  │                                        │ 3b. openai.files.create(purpose:        │
  │                                        │     'assistants') → file_id             │
  │                                        ├────────────────────────────────────────▶│
  │                                        │                                 file_id │
  │                                        │◀────────────────────────────────────────┤
  │                                        │                                         │
  │                                        │ 4. build prompt:                        │
  │                                        │    - system role (clinical expert)      │
  │                                        │    - injected schedule markdowns        │
  │                                        │    - patient profile                    │
  │                                        │    - adult-card / gestante guards       │
  │                                        │                                         │
  │                                        │ 5. for model in [gpt-5.1, gpt-5]:       │
  │                                        │      try openai.responses.create({      │
  │                                        │        text.format: 'json_object',      │
  │                                        │        max_output_tokens: 8000          │
  │                                        │      })                                 │
  │                                        ├────────────────────────────────────────▶│
  │                                        │                          JSON response  │
  │                                        │◀────────────────────────────────────────┤
  │                                        │                                         │
  │                                        │ 6. JSON.parse, attach metadata          │
  │ 200 Reconciliation                     │                                         │
  │◀───────────────────────────────────────┤                                         │
```

### Failure modes

| Condition                                  | Status | Response shape                                                 |
|--------------------------------------------|--------|----------------------------------------------------------------|
| No file in form data                       | 400    | `{ error: 'Arquivo não fornecido' }`                           |
| `GEMINI_API_KEY` missing on PDF            | 500    | `{ error: 'Falha ao processar PDF com Gemini', detalhes }`     |
| OpenAI upload failure (image)              | 500    | `{ error: 'Falha ao enviar arquivo para OpenAI', detalhes }`   |
| All models in chain fail                   | 502    | `{ error: '...', detalhes: [{ model, details }, ...] }`        |
| Model returned empty content               | 500    | `{ error: 'Resposta da IA vazia ou inválida' }`                |
| Model returned non-JSON content            | 500    | `{ error: 'Erro ao processar resposta da IA', raw }`           |
| Unhandled exception                        | 500    | `{ error: 'Erro interno do servidor', details, stack }`        |

### Runtime constraints

- `runtime = 'nodejs'` (the API route depends on `fs` and `path`)
- `maxDuration = 300s` (large PDFs / cold-start Gemini calls)
- `maxBodySize = '100mb'` (full carteirinha PDFs from older systems can be large)
- `MAX_OUTPUT_TOKENS = 8000` for the OpenAI call
- Gemini config: `maxOutputTokens: 65536`, `temperature: 0.1`

---

## Build modes

The Next.js config switches behavior based on `STATIC_EXPORT`:

| Mode                | When                       | Effect                                                                 |
|---------------------|----------------------------|------------------------------------------------------------------------|
| Server (default)    | `npm run dev` / `build`    | API routes are live; image optimization on                             |
| Static export       | `STATIC_EXPORT=true build` | `output: 'export'`, images unoptimized — required for Capacitor iOS    |

In static-export mode the iOS bundle ships only the marketing pages and the client UI; the AI route must be served by the same Next.js deployment hit over the network (configured via `NEXT_PUBLIC_API_URL` when needed — see `lib/api.js`).

---

## Mobile

The iOS app is a Capacitor 8 wrapper around the static export. The bundle id is `br.com.saudelivre.vacinacheck`. iOS-specific build and submission steps live in [`APP_STORE_GUIDE.md`](APP_STORE_GUIDE.md) and [`MOBILE_GUIDE.md`](MOBILE_GUIDE.md).

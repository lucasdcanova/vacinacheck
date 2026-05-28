# Summary

<!-- One or two sentences. What does this PR change and why? -->

## Type of change

- [ ] Bug fix
- [ ] Feature (UI / page / flow)
- [ ] Refactor (no behavior change)
- [ ] Schedule / clinical data update (files in `public/calendario_vacinal_*.md` or `public/vacinacao_gestantes_rede_privada.md`)
- [ ] AI pipeline change (`app/api/analyze-vaccine/route.js`, prompts, model chain)
- [ ] Build / infra / iOS / Capacitor
- [ ] SEO / metadata
- [ ] Docs

## Clinical impact

<!-- REQUIRED if this PR touches any file under public/calendario_vacinal_*.md
     or public/vacinacao_gestantes_rede_privada.md, OR the prompt / model chain
     in app/api/analyze-vaccine/route.js. Otherwise: "n/a". -->

- Source consulted (SBIm year, MS nota técnica, etc.):
- Reviewed by clinician:
- Affected patient profiles (pediatric / adult / elderly / gestante / adult-only-card):

## Test plan

- [ ] `npm run lint` clean
- [ ] `npm run build` clean
- [ ] If the change touches the analysis pipeline: re-ran a sample carteirinha (image and PDF) and verified the JSON shape (`vacinasTomadas` / `vacinasFaltantes` / `proximasDoses` / `observacoes`)
- [ ] If the change touches mobile: `npm run cap:sync` and a build in Xcode

## Screenshots / output

<!-- For UI changes, attach before/after. For schedule changes, paste a diff. -->

## Checklist

- [ ] No secrets committed (`OPENAI_API_KEY`, `GEMINI_API_KEY`, etc.)
- [ ] No patient data, real carteirinhas, or PHI committed
- [ ] If a new env var is required, added to `.env.example` and documented in the README

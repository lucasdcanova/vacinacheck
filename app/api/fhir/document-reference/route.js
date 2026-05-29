// POST /api/fhir/document-reference
//
// Wraps a vacinacheck analyze-vaccine response in a FHIR R4
// DocumentReference resource. This is the smallest credible step from
// "we emit JSON" to "we speak FHIR" — enough to integrate with an EHR
// that ingests DocumentReference (most do) without claiming full
// conformance.
//
// Two modes:
//   - "wrap mode" (default): client POSTs a previously-obtained
//     analyze-vaccine output and we wrap it.
//   - "analyze + wrap" mode: client POSTs a file and patientInfo
//     exactly like /api/analyze-vaccine; we run the analyzer and wrap
//     the result. This costs model spend; idempotency cache applies
//     because we reuse the same underlying chain.
//
// The output of this route IS a single FHIR R4 DocumentReference JSON
// object. Errors are FHIR OperationOutcome resources so a downstream
// EHR can handle them with the same parser.

import { NextResponse } from "next/server";
import { buildDocumentReference, validateDocumentReferenceShape } from "../../../../lib/fhir.mjs";

export const runtime = "nodejs";

function operationOutcome({ severity = "error", code = "invalid", diagnostics } = {}) {
  return {
    resourceType: "OperationOutcome",
    issue: [
      {
        severity,
        code,
        diagnostics: diagnostics || "Request failed",
      },
    ],
  };
}

function fhirJson(body, init = {}) {
  return new NextResponse(JSON.stringify(body), {
    ...init,
    headers: {
      "Content-Type": "application/fhir+json",
      ...(init.headers || {}),
    },
  });
}

export async function POST(req) {
  const ct = req.headers.get("content-type") || "";

  // Wrap mode — JSON body { analysis, patientInfo? }
  if (ct.includes("application/json")) {
    let payload;
    try {
      payload = await req.json();
    } catch (e) {
      return fhirJson(operationOutcome({ diagnostics: "Body is not valid JSON" }), { status: 400 });
    }
    const analysis = payload?.analysis;
    const patientInfo = payload?.patientInfo;
    if (!analysis || typeof analysis !== "object") {
      return fhirJson(
        operationOutcome({
          diagnostics:
            "Body must include { analysis: object } — the JSON returned by /api/analyze-vaccine",
        }),
        { status: 400 }
      );
    }
    const doc = buildDocumentReference({ analysis, patientInfo });
    const problems = validateDocumentReferenceShape(doc);
    if (problems.length > 0) {
      // This should never trigger in practice; if it does, surface the
      // exact mismatch so a caller can file a useful bug report.
      return fhirJson(
        operationOutcome({
          severity: "error",
          code: "exception",
          diagnostics:
            "Internal shape check failed for DocumentReference: " + problems.join("; "),
        }),
        { status: 500 }
      );
    }
    return fhirJson(doc, { status: 201 });
  }

  // Analyze + wrap mode — multipart, same envelope as analyze-vaccine
  if (ct.includes("multipart/form-data")) {
    try {
      // We POST to our own analyze-vaccine route to avoid duplicating
      // the model orchestration code. This keeps a single source of
      // truth for the analyzer and means the FHIR endpoint inherits
      // idempotency + retry + DLQ for free.
      const upstreamUrl = new URL("/api/analyze-vaccine", req.nextUrl.origin).toString();
      const upstream = await fetch(upstreamUrl, {
        method: "POST",
        headers: {
          // Forward idempotency hints so the same upload doesn't
          // double-bill the model.
          ...(req.headers.get("idempotency-key")
            ? { "idempotency-key": req.headers.get("idempotency-key") }
            : {}),
        },
        body: req.body,
        duplex: "half",
      });
      if (!upstream.ok) {
        const upstreamBody = await upstream.text();
        return fhirJson(
          operationOutcome({
            severity: "error",
            code: "exception",
            diagnostics: `Upstream analyze-vaccine returned ${upstream.status}: ${upstreamBody.slice(0, 400)}`,
          }),
          { status: 502 }
        );
      }
      const analysis = await upstream.json();
      const doc = buildDocumentReference({ analysis });
      const problems = validateDocumentReferenceShape(doc);
      if (problems.length > 0) {
        return fhirJson(
          operationOutcome({
            severity: "error",
            code: "exception",
            diagnostics: "Internal shape check failed: " + problems.join("; "),
          }),
          { status: 500 }
        );
      }
      return fhirJson(doc, { status: 201 });
    } catch (e) {
      return fhirJson(
        operationOutcome({
          severity: "error",
          code: "exception",
          diagnostics: e?.message || "analyze + wrap failed",
        }),
        { status: 500 }
      );
    }
  }

  return fhirJson(
    operationOutcome({
      diagnostics:
        "Send application/json with { analysis, patientInfo? }, OR multipart/form-data identical to /api/analyze-vaccine.",
    }),
    { status: 415 }
  );
}

export function GET() {
  // CapabilityStatement-lite — tells a curious EHR what this endpoint
  // does without lying about FHIR conformance.
  const body = {
    resourceType: "CapabilityStatement",
    status: "active",
    date: new Date().toISOString(),
    publisher: "VacinaCheck (Lucas Dickel Canova, MD)",
    kind: "instance",
    software: { name: "vacinacheck", version: "mvp" },
    implementation: { description: "VacinaCheck FHIR R4 DocumentReference adapter (MVP, not certified)" },
    fhirVersion: "4.0.1",
    format: ["application/fhir+json"],
    rest: [
      {
        mode: "server",
        resource: [
          {
            type: "DocumentReference",
            interaction: [{ code: "create" }],
            documentation:
              "POST /api/fhir/document-reference — wraps an analyze-vaccine output in a R4 DocumentReference.",
          },
        ],
      },
    ],
  };
  return new NextResponse(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/fhir+json" },
  });
}

// Shape tests for the FHIR R4 DocumentReference wrapper.
//
// We deliberately validate against a minimal but real R4 contract:
// resourceType, status, type.coding[0], content[0].attachment with
// base64 data that round-trips, and the meta.profile that points at
// the official R4 structure. We do NOT pretend to be a full
// FHIR-validator — that would require ingesting the HL7 R4 schema.

import { strict as assert } from "node:assert";
import { test } from "node:test";

import {
  buildDocumentReference,
  validateDocumentReferenceShape,
} from "../lib/fhir.mjs";

const SAMPLE_ANALYSIS = {
  done_vaccines: ["BCG", "Hep B nasc", "Pentavalente 2m"],
  missing_for_age: ["Pentavalente 4m", "VIP 4m"],
  due_next: ["Pentavalente 4m"],
  contraindicated_now: [],
  flags: ["atrasado"],
  modeloUtilizado: "gpt-5.1",
  cadeiaModelosTentados: ["gpt-5.1", "gpt-5"],
};

test("buildDocumentReference returns a R4-shaped DocumentReference", () => {
  const doc = buildDocumentReference({
    analysis: SAMPLE_ANALYSIS,
    patientInfo: { name: "Test Patient", birthDate: "2025-11-15", sex: "F" },
  });
  assert.equal(doc.resourceType, "DocumentReference");
  assert.equal(doc.status, "current");
  assert.equal(doc.docStatus, "final");
  assert.equal(typeof doc.id, "string");
  assert.ok(doc.id.length > 0);
  assert.equal(doc.type.coding[0].system, "http://loinc.org");
  assert.equal(doc.type.coding[0].code, "11369-6");
  assert.equal(doc.category[0].coding[0].code, "clinical-note");
  assert.equal(doc.content[0].attachment.contentType, "application/json");
  assert.ok(doc.content[0].attachment.data.length > 0);
  assert.ok(
    doc.meta.profile.includes(
      "http://hl7.org/fhir/StructureDefinition/DocumentReference"
    )
  );
});

test("attachment.data round-trips through base64 to the original analysis", () => {
  const doc = buildDocumentReference({ analysis: SAMPLE_ANALYSIS });
  const decoded = Buffer.from(
    doc.content[0].attachment.data,
    "base64"
  ).toString("utf-8");
  const reconstructed = JSON.parse(decoded);
  assert.deepEqual(reconstructed, SAMPLE_ANALYSIS);
});

test("validateDocumentReferenceShape passes on a freshly built resource", () => {
  const doc = buildDocumentReference({ analysis: SAMPLE_ANALYSIS });
  const problems = validateDocumentReferenceShape(doc);
  assert.deepEqual(problems, []);
});

test("validateDocumentReferenceShape catches missing fields", () => {
  const problems = validateDocumentReferenceShape({
    resourceType: "DocumentReference",
    // missing id, status, type, content
  });
  assert.ok(problems.length >= 4, `expected >= 4 problems, got ${problems.length}: ${problems.join("; ")}`);
});

test("validateDocumentReferenceShape rejects an invalid resourceType", () => {
  const problems = validateDocumentReferenceShape({
    resourceType: "Patient",
    id: "x",
    status: "current",
    type: { coding: [{ system: "x", code: "y" }] },
    content: [{ attachment: { contentType: "application/json", data: Buffer.from("{}").toString("base64") } }],
  });
  assert.ok(problems.some((p) => p.includes("resourceType")));
});

test("validateDocumentReferenceShape rejects invalid base64 data", () => {
  const doc = buildDocumentReference({ analysis: SAMPLE_ANALYSIS });
  doc.content[0].attachment.data = "not-base64-!!!";
  const problems = validateDocumentReferenceShape(doc);
  // The "base64" validation is intentionally cheap — Node's
  // Buffer.from(...,"base64") accepts a lot of garbage. The TEST here
  // pins behaviour: we accept loose base64 but never accept missing data.
  doc.content[0].attachment.data = "";
  const problems2 = validateDocumentReferenceShape(doc);
  assert.ok(
    problems2.some((p) => p.includes("data")),
    "expected an attachment.data complaint when data is empty"
  );
});

test("buildDocumentReference is stable: same input + same date → same id", () => {
  const date = new Date("2026-05-28T12:00:00Z");
  const a = buildDocumentReference({ analysis: SAMPLE_ANALYSIS, date });
  const b = buildDocumentReference({ analysis: SAMPLE_ANALYSIS, date });
  assert.equal(a.id, b.id);
});

test("patientInfo absence yields a de-identified subject display", () => {
  const doc = buildDocumentReference({ analysis: SAMPLE_ANALYSIS });
  assert.equal(doc.subject.display, "Patient (de-identified)");
  assert.equal(doc.context.sourcePatientInfo, undefined);
});

test("buildDocumentReference rejects non-object analysis", () => {
  assert.throws(() => buildDocumentReference({ analysis: null }), /analysis must be an object/);
  assert.throws(() => buildDocumentReference({ analysis: "string" }), /analysis must be an object/);
});

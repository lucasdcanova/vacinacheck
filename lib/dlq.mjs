// Dead-letter queue for terminal failures of analyze-vaccine.
//
// Prefers an Upstash Redis list; falls back to a structured stderr log
// so platform log aggregation (Vercel / Render) still captures the
// payload and operators can replay later. Either way, *something* is
// persisted — losing a failed analysis on the floor is the failure
// mode we want to avoid.

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL || null;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || null;
const DLQ_KEY = process.env.DLQ_KEY || "analyze-vaccine:dlq";

/**
 * Enqueue a terminal failure for later inspection / replay.
 *
 * @param {{
 *   idempotencyKey?: string | null,
 *   fileName?: string,
 *   stage: 'gemini-extract' | 'openai-reconcile' | 'parse' | 'unknown',
 *   modelChainTried?: string[],
 *   primaryError: string,
 *   attempts?: number,
 * }} item
 * @returns {Promise<boolean>} true if the item landed in Upstash, false if
 *   it was only logged.
 */
export async function enqueueDLQ(item) {
  const payload = { at: new Date().toISOString(), ...item };
  if (!UPSTASH_URL || !UPSTASH_TOKEN) {
    // Log-only fallback — picked up by Vercel / Render log drains.
    console.error("[dlq:fallback]", JSON.stringify(payload));
    return false;
  }
  try {
    const encoded = encodeURIComponent(JSON.stringify(payload));
    const url = `${UPSTASH_URL.replace(/\/$/, "")}/lpush/${encodeURIComponent(DLQ_KEY)}/${encoded}`;
    const r = await fetch(url, {
      headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` },
    });
    if (!r.ok) throw new Error(`upstash ${r.status}`);
    return true;
  } catch (e) {
    console.error(
      "[dlq:fallback]",
      JSON.stringify(payload),
      "(upstash lpush failed:",
      e.message,
      ")"
    );
    return false;
  }
}

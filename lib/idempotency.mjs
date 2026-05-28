// Idempotency cache.
//
// Tries Upstash Redis REST (env: UPSTASH_REDIS_REST_URL +
// UPSTASH_REDIS_REST_TOKEN) and falls back to an in-process Map with a
// TTL when those are not configured. The in-process variant is logged
// loudly at boot so a production miss does not happen silently.

const TTL_SEC_DEFAULT = 60 * 60 * 24; // 24 h
const MEM_CAP = 1000;

const mem = new Map(); // key -> { value, expiresAt }

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL || null;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || null;
const useUpstash = Boolean(UPSTASH_URL && UPSTASH_TOKEN);

let warned = false;
function warnInMemory() {
  if (warned) return;
  warned = true;
  console.warn(
    "[idempotency] UPSTASH_REDIS_REST_URL / _TOKEN not set — using IN-PROCESS Map. " +
      "This is NOT durable across instances or restarts and SHOULD NOT be used in production."
  );
}

function evictExpired() {
  const now = Date.now();
  for (const [k, e] of mem) {
    if (e.expiresAt < now) mem.delete(k);
  }
}

async function upstash(path) {
  const url = `${UPSTASH_URL.replace(/\/$/, "")}${path}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` },
  });
  if (!res.ok) {
    throw new Error(`upstash ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function getCached(key) {
  if (!useUpstash) {
    warnInMemory();
    const e = mem.get(key);
    if (!e) return null;
    if (Date.now() > e.expiresAt) {
      mem.delete(key);
      return null;
    }
    return e.value;
  }
  try {
    const j = await upstash(`/get/${encodeURIComponent(key)}`);
    return j?.result ? JSON.parse(j.result) : null;
  } catch (e) {
    console.error("[idempotency] upstash get failed:", e.message);
    return null;
  }
}

export async function setCached(key, value, ttlSec = TTL_SEC_DEFAULT) {
  if (!useUpstash) {
    warnInMemory();
    mem.set(key, { value, expiresAt: Date.now() + ttlSec * 1000 });
    if (mem.size > MEM_CAP) evictExpired();
    return;
  }
  try {
    const encoded = encodeURIComponent(JSON.stringify(value));
    await upstash(`/setex/${encodeURIComponent(key)}/${ttlSec}/${encoded}`);
  } catch (e) {
    console.error("[idempotency] upstash setex failed:", e.message);
  }
}

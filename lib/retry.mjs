// Exponential backoff with full jitter. Designed for transient API
// failures (5xx, 429, transient network) — never wraps a user error.

const RETRYABLE_HTTP = new Set([408, 425, 429, 500, 502, 503, 504]);
const RETRYABLE_CODES = new Set([
  "ECONNRESET",
  "ETIMEDOUT",
  "ENOTFOUND",
  "EAI_AGAIN",
  "ECONNABORTED",
  "EPIPE",
]);

export function isRetryableError(err) {
  if (!err) return false;
  const status = err.status ?? err.response?.status ?? err.cause?.status;
  if (status && RETRYABLE_HTTP.has(status)) return true;
  const code = err.code ?? err.cause?.code;
  if (code && RETRYABLE_CODES.has(code)) return true;
  return false;
}

/**
 * Retry `fn` with exponential backoff + full jitter.
 * Stops on first non-retryable error or after `maxAttempts`.
 *
 * @param {(attempt: number) => Promise<T>} fn
 * @param {{ maxAttempts?: number, baseMs?: number, maxMs?: number, label?: string }} opts
 * @returns {Promise<T>}
 */
export async function withRetry(fn, opts = {}) {
  const maxAttempts = opts.maxAttempts ?? 3;
  const baseMs = opts.baseMs ?? 500;
  const maxMs = opts.maxMs ?? 10_000;
  const label = opts.label ?? "withRetry";

  let lastErr;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn(attempt);
    } catch (err) {
      lastErr = err;
      if (attempt === maxAttempts || !isRetryableError(err)) throw err;
      const expMs = Math.min(maxMs, baseMs * 2 ** (attempt - 1));
      const wait = Math.floor(Math.random() * expMs);
      console.warn(
        `[${label}] attempt ${attempt}/${maxAttempts} failed ` +
          `(status=${err.status ?? "?"} code=${err.code ?? "?"}); ` +
          `waiting ${wait}ms before retry`
      );
      await new Promise((r) => setTimeout(r, wait));
    }
  }
  throw lastErr;
}

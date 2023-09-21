import memwatch from "@airbnb/node-memwatch";
import { next as automerge } from "@automerge/automerge";
import { v4 } from "uuid";

export async function sleep(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Returns Node's memory used, forcing GC beforehand.
 *
 * Specifically, this returns the sum of Node's used heap size
 * (used for JS data) and resident set stuff (used for WASM data
 * among others).
 */
export async function getMemoryUsed(): Promise<number> {
  // Force the event loop to turn over fully, so that
  // all pending "stats" events are dispatched (I'm guessing
  // during the IO events queue portion of the event loop).
  // Otherwise the first "stats" event we capture may be
  // for an old memory measurement.
  //
  // Basing this on the description of the event loop here:
  // https://miro.medium.com/max/2880/1*2yXbhvpf1kj5YT-m_fXgEQ.png
  // from the article:
  // https://blog.insiderattack.net/event-loop-and-the-big-picture-nodejs-event-loop-part-1-1cb67a182810
  //
  // Two sleep(0)'s works in my tests so far, while a single
  // sleep (even for a longer period, e.g., 5 ms) does not.
  // This suggests that setTimeout calls during the execution
  // of a previous setTimeout's function are queued for
  // the next big event loop iteration, instead of being
  // placed on the current setTimeout queue, although
  // I haven't read this officially.
  // It also worked when I tried a mix of a sleep(0) and
  // a Promise using setImmediate (either order).
  await sleep(0);
  await sleep(0);
  // @ts-ignore types forgot gc
  memwatch.gc();
  return new Promise<number>((resolve) => {
    // @ts-ignore types forgot once
    memwatch.once("stats", (stats: memwatch.GcStats) => {
      resolve(stats.used_heap_size + process.memoryUsage.rss());
    });
  });
}

export const CHARS = (function () {
  let s = "";
  for (let i = 32; i <= 126; i++) {
    s += String.fromCharCode(i);
  }
  return s;
})();

export function randomChar(rng: seedrandom.prng) {
  let index = Math.floor(rng() * CHARS.length);
  return CHARS[index];
}

/**
 * Returns a UUID v4 (in the format of the npm uuid library),
 * but pseudorandomly generated.
 */
export function uuidv4(rng: seedrandom.prng): string {
  const randBytes = new Array<number>(16);
  for (let i = 0; i < 16; i++) randBytes[i] = Math.floor(rng() * 256);
  return v4({ random: randBytes });
}

export type Data = Uint8Array | string | automerge.Change | automerge.Change[];
export function byteLength(msg: Data): number {
  if (typeof msg === "string") return msg.length;
  else if (Array.isArray(msg)) {
    let total = 0;
    for (const bytes of msg) total += bytes.byteLength;
    return total;
  } else return msg.byteLength;
}

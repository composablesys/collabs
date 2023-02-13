const ENCODING = "base64" as const;

/**
 * Uint8Array utilities.
 */
export const Bytes = {
  /**
   * Output is ASCII, so safe to use in [[Collab.send]].
   */
  stringify(bytes: Uint8Array): string {
    return Buffer.from(bytes).toString(ENCODING);
  },

  parse(str: string): Uint8Array {
    return new Uint8Array(Buffer.from(str, ENCODING));
  },

  /**
   * Compares two Uint8Array's for equality.
   */
  equals(one: Uint8Array, two: Uint8Array): boolean {
    if (one.length !== two.length) return false;
    // OPT: convert to a Uint32Array
    // and do 4-byte comparisons at a time?
    for (let i = 0; i < one.length; i++) {
      if (one[i] !== two[i]) return false;
    }
    return true;
  },
} as const;

const ENCODING = "base64";

/**
 * Uint8Array utilities.
 */
export class Bytes {
  private constructor() {
    // Not instantiable.
  }

  /**
   * Output is printable (base64).
   */
  static stringify(bytes: Uint8Array): string {
    return Buffer.from(bytes).toString(ENCODING);
  }

  static parse(str: string): Uint8Array {
    return new Uint8Array(Buffer.from(str, ENCODING));
  }

  /**
   * Compares two Uint8Array's for equality.
   */
  static equals(one: Uint8Array, two: Uint8Array): boolean {
    if (one.length !== two.length) return false;
    // OPT: convert to a Uint32Array
    // and do 4-byte comparisons at a time?
    for (let i = 0; i < one.length; i++) {
      if (one[i] !== two[i]) return false;
    }
    return true;
  }
}

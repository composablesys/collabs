import { fromByteArray, toByteArray } from "base64-js";

/**
 * Uint8Array utilities.
 */
export class Bytes {
  private constructor() {
    // Not instantiable.
  }

  /**
   * Converts a Uint8Array into a printable (base64) string.
   *
   * To recover the original bytes, use [[parse]].
   */
  static stringify(bytes: Uint8Array): string {
    return fromByteArray(bytes);
  }

  /**
   * Inverse of [[stringify]].
   */
  static parse(str: string): Uint8Array {
    return toByteArray(str);
  }

  /**
   * Compares two Uint8Arrays for equality.
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

export class BitSet {
  // TODO: use Uint32Array instead if we can serialize
  // it properly (with consistent endianness)
  array: Uint8Array;
  constructor(readonly length: number, array?: Uint8Array) {
    if (array === undefined) {
      this.array = new Uint8Array(Math.ceil(length / 8));
    } else this.array = array;
  }

  static copy(other: BitSet, newLength: number) {
    let ans = new BitSet(newLength);
    for (let i = 0; i < Math.min(other.array.length, ans.array.length); i++) {
      ans.array[i] = other.array[i];
    }
    return ans;
  }

  static parseBinary(binary: string) {
    let ans = new BitSet(binary.length);
    for (let i = 0; i < binary.length; i++) {
      if (binary[i] === "1") ans.set(i, true);
    }
    return ans;
  }

  /**
   * [compare description]
   * @param  a [description]
   * @param  b [description]
   * @return   [comparison result, first bit where differs
   * (equal to min length if one is a prefix of the other,
   * including when a = b)
   */
  static compare(a: BitSet, b: BitSet): [number, number] {
    // Find first byte where they differ
    let minByteLength = Math.min(a.array.length, b.array.length);
    let i: number;
    for (i = 0; i < minByteLength; i++) {
      if (a.array[i] != b.array[i]) break;
    }
    // Now i is the first byte where they differ, or
    // the min length if one is a prefix of the other.
    if (i === minByteLength) {
      // They didn't actually differ; one is a prefix of
      // the other.
      if (a.length === b.length) return [0, a.length];
      let minLength = Math.min(a.length, b.length);
      if (minLength % 8 === 0) {
        // The prefix ends on a byte boundary.
        // Comparison depends on the next bit
        // (in the next byte) of the suffix.
        if (a.length > minLength) return [a.get(minLength) ? 1 : -1, minLength];
        else return [b.get(minLength) ? -1 : 1, minLength];
      } else {
        // The prefix ends within the already-compared byte.
        // Since those bytes were equal, the suffix must
        // be 0 in the (>= 1) remaining bits of that byte,
        // hence it is lesser.
        return [b.length - a.length, minLength];
      }
    }
    // See which bit within array[i] differs.
    let j: number;
    let ai = a.array[i];
    let bi = b.array[i];
    // TODO: optimize.
    for (j = 0; j < 8; j++) {
      if ((ai & (1 << (7 - j))) !== (bi & (1 << (7 - j)))) break;
    }
    // Now we calculate the (absolute) bit index where they
    // first differ.
    // "Not present" vs present also counts as a difference.
    let index = Math.min(8 * i + j, a.length, b.length);
    // Compare by: 0 < not present < 1.  Represent
    // "not present" with 0.5, 1 with 1 << (7 - j).
    let aBit = index < a.length ? a.getNum(index) : 0.5;
    let bBit = index < b.length ? b.getNum(index) : 0.5;
    return [aBit - bBit, index];
  }

  private checkBounds(index: number) {
    if (index < 0 || index >= this.length) {
      throw new Error(`index out of bounds: ${index} (length: ${this.length})`);
    }
  }

  has(index: number) {
    if (index < 0) throw new Error("index < 0: " + index);
    return index < this.length;
  }

  set(index: number, value: boolean) {
    this.checkBounds(index);
    let major = Math.floor(index / 8);
    let minor = 7 - (index % 8);
    if (value) this.array[major] |= 1 << minor;
    else this.array[major] &= ~(1 << minor);
  }

  get(index: number): boolean {
    this.checkBounds(index);
    let major = Math.floor(index / 8);
    let minor = 7 - (index % 8);
    return (this.array[major] & (1 << minor)) !== 0;
  }

  getNum(index: number): 0 | 1 {
    return this.get(index) ? 1 : 0;
  }

  equals(other: BitSet) {
    return (
      this.length === other.length &&
      Buffer.compare(this.array, other.array) === 0
    );
  }

  toString(): string {
    let str = "";
    for (let i = 0; i < this.length; i++) {
      str += this.getNum(i) + "";
    }
    return str;
  }

  get [Symbol.toStringTag]() {
    return this.toString();
  }
}

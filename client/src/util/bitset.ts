import { BitSetSerialized } from "../../generated/proto_compiled";

export class BitSet {
  array: Uint32Array;
  constructor(readonly length: number, array?: Uint32Array) {
    if (array === undefined) {
      this.array = new Uint32Array(Math.ceil(length / 32));
    } else this.array = array;
  }

  static copy(other: BitSet, newLength: number) {
    let ans = new BitSet(newLength);
    for (let i = 0; i < Math.min(other.array.length, ans.array.length); i++) {
      ans.array[i] = other.array[i];
    }
    if (newLength < other.length && newLength % 32 !== 0) {
      // Zero out bits in the last uint32 that we don't want
      const mask = ~((1 << (32 - (newLength % 32))) - 1) >>> 0;
      ans.array[ans.array.length - 1] =
        (ans.array[ans.array.length - 1] & mask) >>> 0;
    }
    return ans;
  }

  serialize(): Uint8Array {
    // Uint32Array stores the bytes of each uint32 in platform endianness
    // (byte order), so when serializing, we need to be careful to consistently
    // use big endian.
    // The end result is that the serialized array's bits are in order from
    // the root of the tree on down.
    const bigEndian = new ArrayBuffer(this.array.byteLength);
    const view = new DataView(bigEndian);
    for (let i = 0; i < this.array.length; i++) {
      view.setUint32(i << 2, this.array[i]);
    }
    const byteLength = Math.ceil(this.length / 8);
    let message = BitSetSerialized.create({
      array: new Uint8Array(bigEndian, 0, byteLength),
      length: this.length,
    });
    return BitSetSerialized.encode(message).finish();
  }

  static deserialize(serialized: Uint8Array): BitSet {
    const message = BitSetSerialized.decode(serialized);
    const ans = new BitSet(message.length);
    const view = new DataView(
      message.array.buffer,
      message.array.byteOffset,
      message.array.byteLength
    );
    for (let i = 0; i < message.array.length >>> 2; i++) {
      ans.array[i] = view.getUint32(i << 2);
    }
    // If the last uint32 is only partially included in
    // message.array (< 4 bytes were included), we
    // need to extract it ourselves, since view.getUint32
    // won't let us read beyond the end of the byte array.
    for (
      let i = message.array.length - (message.array.length % 4);
      i < message.array.length;
      i++
    ) {
      // End with >>> 0 because bitwise ops always give
      // signed int32's, but we want unsigned uint32's;
      // >>> 0 serves to convert to them.
      // See https://stackoverflow.com/a/6798829
      ans.array[i >>> 2] |= (message.array[i] << ((3 - (i % 4)) << 3)) >>> 0;
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
    let minArrayLength = Math.min(a.array.length, b.array.length);
    let i: number;
    for (i = 0; i < minArrayLength; i++) {
      if (a.array[i] != b.array[i]) break;
    }
    // Now i is the first byte where they differ, or
    // the min length if one is a prefix of the other.
    if (i === minArrayLength) {
      // They didn't actually differ; one is a prefix of
      // the other.
      if (a.length === b.length) return [0, a.length];
      let minLength = Math.min(a.length, b.length);
      if (minLength % 32 === 0) {
        // The prefix ends on an array item boundary.
        // Comparison depends on the next bit
        // (in the next item) of the suffix.
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
    // See which bit within array[i] differs, storing it in j.
    // We want the index of the highest order bit that differs, counting
    // from the left.  I.e., if they differ in the 2^31 bit, we want j = 0;
    // if they first differ in the 2^30 bit, we want j = 1; etc.
    // Taking xor gives us a number with only the differing bits set,
    // and then we just need to count the number of leading zero bits
    // (starting at bit 2^31).
    const j = BitSet.countLeadingZeroes((a.array[i] ^ b.array[i]) >>> 0);

    // Now we calculate the (absolute) bit index where they
    // first differ.
    // "Not present" vs present also counts as a difference.
    let index = Math.min(32 * i + j, a.length, b.length);
    // Compare by: 0 < not present < 1.  Represent
    // "not present" with 0.5, 1 with 1 << (7 - j).
    let aBit = index < a.length ? a.getNum(index) : 0.5;
    let bBit = index < b.length ? b.getNum(index) : 0.5;
    return [aBit - bBit, index];
  }

  /**
   * Return the number of leading zeroes in x as a uint32.
   * In C, this is known as the gcc built-in function __builtin_clz.
   * This implementation is copied from
   * https://blog.stephencleary.com/2010/10/implementing-gccs-builtin-functions.html
   * which credits "This uses a binary search (counting down) algorithm from Hacker's Delight."
   */
  private static countLeadingZeroes(x: number) {
    // Simple version (note this is lacking >>> 0's):
    // for (let j = 0; j < 32; j++) {
    //   if ((x & (1 << (31 - j))) !== 0) return j;
    // }
    // throw new Error("x is zero");

    let n = 32;
    let y = x >>> 16;
    if (y != 0) {
      n = n - 16;
      x = y;
    }
    y = x >>> 8;
    if (y != 0) {
      n = n - 8;
      x = y;
    }
    y = x >>> 4;
    if (y != 0) {
      n = n - 4;
      x = y;
    }
    y = x >>> 2;
    if (y != 0) {
      n = n - 2;
      x = y;
    }
    y = x >>> 1;
    if (y != 0) return n - 2;
    return n - x;
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
    let major = index >>> 5;
    let minor = 31 - (index % 32);
    if (value) {
      // this.array[major] |= (1 << minor);
      this.array[major] = (this.array[major] | (1 << minor)) >>> 0;
    } else {
      //this.array[major] &= ~(1 << minor);
      this.array[major] = (this.array[major] & ~(1 << minor)) >>> 0;
    }
  }

  get(index: number): boolean {
    this.checkBounds(index);
    let major = index >>> 5;
    let minor = 31 - (index % 32);
    return (this.array[major] & (1 << minor)) !== 0;
  }

  getNum(index: number): 0 | 1 {
    return this.get(index) ? 1 : 0;
  }

  /**
   * Returns the least i >= index such that this.get(i)
   * is not value.  "Not present" counts as not true, i.e.,
   * if there are no false bits before the end,
   * max(index, this.length) is returned.
   */
  nextNot(value: boolean, index: number): number {
    if (index >= this.length) return index;
    return value ? this.nextNotTrue(index) : this.nextNotFalse(index);
  }

  private nextNotFalse(index: number): number {
    // Simple version:
    // let i;
    // for (i = index; i < this.length; i++) {
    //   if (this.get(i) !== false) return i;
    // }
    // return i;
    if (index % 32 !== 0) {
      // Check the end of the first uint32
      const mask = ((1 << (32 - (index % 32))) - 1) >>> 0;
      const firstMasked = this.array[index >>> 5] & mask;
      if (firstMasked !== 0) {
        // The answer is here
        return index - (index % 32) + BitSet.countLeadingZeroes(firstMasked);
      }
    }
    for (let i = Math.ceil(index / 32); i < this.array.length; i++) {
      if (this.array[i] !== 0) {
        // The answer is here
        return (i << 5) + BitSet.countLeadingZeroes(this.array[i]);
      }
    }
    // Note that it safe to consider the last uint32 in
    // the previous loop, since its extra bits are all 0,
    // hence won't give a false positive.

    // If we get here, no 1s were found.
    return this.length;
  }

  private nextNotTrue(index: number): number {
    // Simple version:
    // let i;
    // for (i = index; i < this.length; i++) {
    //   if (this.get(i) !== true) return i;
    // }
    // return i;
    if (index % 32 !== 0) {
      // Check the end of the first uint32
      const mask = ((1 << (32 - (index % 32))) - 1) >>> 0;
      const firstMasked = ~this.array[index >>> 5] & mask;
      if (firstMasked !== 0) {
        // The answer is here
        return index - (index % 32) + BitSet.countLeadingZeroes(firstMasked);
      }
    }
    for (let i = Math.ceil(index / 32); i < this.array.length; i++) {
      if (~this.array[i] !== 0) {
        // The answer is here
        return (i << 5) + BitSet.countLeadingZeroes(~this.array[i]);
      }
    }
    // Note that it safe to consider the last uint32 in
    // the previous loop, since its extra bits are all 0,
    // hence the first 0 will cause it to return this.length,
    // the intended answer.

    // If we get here, no 0s were found.
    return this.length;
  }

  /**
   * Sets indices [startIndex, this.length) to value.
   */
  setToEnd(startIndex: number, value: boolean) {
    // TODO: optimize
    for (let i = startIndex; i < this.length; i++) {
      this.set(i, value);
    }
  }

  equals(other: BitSet) {
    if (this.length !== other.length) return false;
    for (let i = 0; i < this.array.length; i++) {
      if (this.array[i] !== other.array[i]) return false;
    }
    return true;
    /*
    // Commenting this out because I don't trust the buffer
    // package's compare method in the browser - it gave
    // an unexpected TypeError once, and from the source
    // code, it looks like it might copy the whole input
    // arrays each time.
    return (
      this.length === other.length &&
      Buffer.compare(this.array, other.array) === 0
    );*/
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

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
    let minor = index % 8;
    if (value) this.array[major] |= 1 << minor;
    else this.array[major] &= 255 - (1 << minor);
  }

  get(index: number): boolean {
    this.checkBounds(index);
    let major = Math.floor(index / 8);
    let minor = index % 8;
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
}

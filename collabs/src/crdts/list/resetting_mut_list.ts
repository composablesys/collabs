import { Resettable } from "../abilities";
import { Collab, InitToken, Pre } from "../../core";
import { MergingMutCMap } from "../map";
import { CListFromMap } from "./list_from_map";
import { RgaDenseLocalList, RgaLoc } from "./rga_dense_local_list";

export class ResettingMutCList<C extends Collab & Resettable>
  extends CListFromMap<
    C,
    [],
    RgaLoc,
    MergingMutCMap<RgaLoc, C>,
    RgaDenseLocalList<undefined>
  >
  implements Resettable
{
  constructor(
    initToken: InitToken,
    valueConstructor: (valueInitToken: InitToken, loc: RgaLoc) => C
  ) {
    const denseLocalList = new RgaDenseLocalList<undefined>(initToken.runtime);
    super(
      initToken,
      Pre(MergingMutCMap)(valueConstructor, denseLocalList),
      denseLocalList
    );
  }

  reset(): void {
    this.internalMap.reset();
  }

  owns(value: C): boolean {
    return this.internalMap.owns(value);
  }

  restore(value: C): void {
    const key = this.internalMap.keyOf(value);
    if (key === undefined) {
      throw new Error("this.owns(value) is false");
    }
    this.internalMap.restore(key);
  }

  indexOf(searchElement: C, fromIndex = 0): number {
    const loc = this.internalMap.keyOf(searchElement);
    if (loc !== undefined) {
      const index = this.denseLocalList.locate(loc)[0];
      if (fromIndex < 0) fromIndex += this.length;
      if (index >= fromIndex) return index;
    }
    return -1;
  }

  lastIndexOf(searchElement: C, fromIndex = this.length - 1): number {
    const index = this.indexOf(searchElement);
    if (index !== -1) {
      if (fromIndex < 0) fromIndex += this.length;
      if (index <= fromIndex) return index;
    }
    return -1;
  }

  includes(searchElement: C, fromIndex = 0): boolean {
    return this.indexOf(searchElement, fromIndex) !== -1;
  }
}

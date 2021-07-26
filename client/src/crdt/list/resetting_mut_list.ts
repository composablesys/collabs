import { Crdt } from "../core";
import { Resettable } from "../helper_crdts";
import { ResettingMutCMap } from "../map";
import { CListFromMap } from "./list_from_map";

export class ResettingMutCList<C extends Crdt & Resettable>
  extends CListFromMap<C, [], TreedocLoc, ResettingMutCMap<TreedocLoc, C>>
  implements Resettable
{
  constructor(valueConstructor: (loc: TreedocLoc) => C) {
    const denseLocalList = new TreedocDenseLocalList();
    super(
      new ResettingMutCMap(valueConstructor, denseLocalList),
      denseLocalList
    );

    // TODO: any extra events?
  }

  reset(): void {
    this.internalMap.reset();
  }

  owns(value: C): boolean {
    // TODO: might throw error due to double-parent.
    // Should change both owns methods to guard against this
    // (return false on rootCrdt).
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
    // TODO: unsafe parent access
    const loc = this.internalMap.keyOf(searchElement);
    if (loc !== undefined) {
      const index = this.denseLocalList.indexOf(loc);
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

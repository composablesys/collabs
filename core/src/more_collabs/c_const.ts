import { CPrimitive } from "../base_collabs/c_primitive";
import { InitToken } from "../core";

/**
 * [[Collab]] wrapper for a constant value.
 *
 * This class lets you use constant values in contexts that require
 * a Collab, e.g., [[CList]]. In most cases, though, you can instead
 * use a "Value" collection like [[CValueList]], which will be more
 * memory-efficient.
 */
export class CConst<T> extends CPrimitive {
  constructor(init: InitToken, readonly value: T) {
    super(init);
  }

  protected receivePrimitive(): void {
    // No-op.
  }

  savePrimitive() {
    return new Uint8Array();
  }

  loadPrimitive(): void {
    // No-op.
  }

  canGC(): boolean {
    return true;
  }
}

import { InitToken } from "../core";
import { CPrimitive } from "./c_primitive";

/**
 * [[Collab]] wrapper for a constant value.
 *
 * This class lets you use constant values in contexts that require
 * a Collab, e.g., collections of Collabs.
 */
export class CConst<T> extends CPrimitive {
  constructor(init: InitToken, readonly value: T) {
    super(init);
  }

  protected receivePrimitive(): void {
    // No-op.
  }

  savePrimitive() {
    return null;
  }

  loadPrimitive(): void {
    // No-op.
  }

  canGC(): boolean {
    return true;
  }
}

import { DefaultElementSerializer, ElementSerializer } from "../../util";
import { Crdt } from "../core";
import { TombstoneMutCSet } from "../set";
import { MovableMutCList, MovableMutCListEntry } from "./movable_mut_list";
import {
  TreedocDenseLocalList,
  TreedocLocWrapper,
} from "./treedoc_dense_local_list";

// TODO: reset.  It only actually works if DenseLocalList
// has no tombstones.  Perhaps this is a reason to just
// fix it to a particular implementation?
// Or: make the subclasses less generic (not generic in
// dense list), and add resets where appropriate.
// Still would like a way to make clear when this is allowed.
// I guess in general, as part of the instructions about
// CompositeCrdt views, need to mention that if (state trivial) does not
// necessarily imply (views trivial), then you need to
// override canGc.

/**
 * TODO: warning: tombstones
 */
export class TombstoneMutCList<
  C extends Crdt,
  InsertArgs extends any[]
> extends MovableMutCList<
  C,
  InsertArgs,
  TreedocLocWrapper,
  TombstoneMutCSet<
    MovableMutCListEntry<C, TreedocLocWrapper>,
    [TreedocLocWrapper, InsertArgs]
  >
> {
  constructor(
    valueConstructor: (...args: InsertArgs) => C,
    concurrentOpRestores = false,
    argsSerializer: ElementSerializer<InsertArgs> = DefaultElementSerializer.getInstance()
  ) {
    super(
      (setValueConstructor, setArgsSerializer) =>
        new TombstoneMutCSet(
          setValueConstructor,
          concurrentOpRestores,
          setArgsSerializer
        ),
      new TreedocDenseLocalList(),
      valueConstructor,
      argsSerializer
    );
  }

  owns(value: C): boolean {
    // TODO: might throw error due to double-parent.
    // Should change both owns methods to guard against this
    // (return false on rootCrdt).
    return this.set.owns(
      value.parent as MovableMutCListEntry<C, TreedocLocWrapper>
    );
  }

  restore(value: C): void {
    if (!this.owns(value)) {
      throw new Error("this.owns(value) is false");
    }
    this.set.restore(
      value.parent as MovableMutCListEntry<C, TreedocLocWrapper>
    );
  }
}

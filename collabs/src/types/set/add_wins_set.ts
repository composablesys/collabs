import { DefaultElementSerializer } from "../../util";
import { CBoolean, TrueWinsCBoolean } from "../boolean";
import { Resettable } from "../../abilities";
import { GrowOnlyImplicitMergingMutCMap } from "../map";
import { AbstractCSetCObject } from "./abstract_set";
import { CrdtInitToken, ElementSerializer, Pre } from "../../core";

export class CSetFromBoolean<
  T,
  BoolT extends CBoolean
> extends AbstractCSetCObject<T, [T]> {
  protected readonly booleanMap: GrowOnlyImplicitMergingMutCMap<T, BoolT>;
  // View of the set size, cached for efficiency.
  private cachedSize = 0;
  /**
   * Booleans must start false.  If you want
   * different behavior, you should wrap around this
   * set (e.g., negate has to make everything start
   * in the set, or do something else if you want it
   * to start containing some elements but not others).
   */
  constructor(
    initToken: CrdtInitToken,
    protected readonly booleanConstructor: (
      booleanInitToken: CrdtInitToken
    ) => BoolT,
    valueSerializer: ElementSerializer<T> = DefaultElementSerializer.getInstance()
  ) {
    super(initToken);
    // TODO: with the usual class-based addChild, TypeScript's
    // generic type inference appeared to get overwhelmed
    // and not infer the inner types correctly, leading to
    // an error.  We work around it by writing an explicit
    // Pre callback instead.
    this.booleanMap = this.addChild(
      "",
      Pre(GrowOnlyImplicitMergingMutCMap)(
        this.internalBooleanConstructor.bind(this),
        valueSerializer
      )
    );
    // Events emitters are setup by internalBooleanConstructor
  }

  static new<T, BoolT extends CBoolean>(
    booleanConstructor: (booleanInitToken: CrdtInitToken) => BoolT,
    valueSerializer: ElementSerializer<T> = DefaultElementSerializer.getInstance()
  ): Pre<CSetFromBoolean<T, BoolT>> {
    return (initToken) =>
      new CSetFromBoolean(initToken, booleanConstructor, valueSerializer);
  }

  private internalBooleanConstructor(
    booleanInitToken: CrdtInitToken,
    key: T
  ): BoolT {
    const bool = this.booleanConstructor(booleanInitToken);
    // Add event listeners
    bool.on("Set", (event) => {
      if (!event.previousValue && bool.value) {
        this.cachedSize++;
        this.emit("Add", { value: key, meta: event.meta });
      } else if (event.previousValue && !bool.value) {
        this.cachedSize--;
        this.emit("Delete", {
          value: key,
          meta: event.meta,
        });
      }
    });
    return bool;
  }

  add(value: T): T {
    this.booleanMap.get(value).value = true;
    return value;
  }

  delete(value: T): void {
    this.booleanMap.get(value).value = false;
  }

  // Use inherited clear implementation (delete every value).

  has(value: T): boolean {
    const bool = this.booleanMap.getIfPresent(value);
    return bool === undefined ? false : bool.value;
  }

  get size(): number {
    return this.cachedSize;
  }

  *values(): IterableIterator<T> {
    for (const [key, valueBool] of this.booleanMap) {
      if (valueBool.value) yield key;
    }
  }

  postLoad() {
    // Set this.cachedSize as a view of the set's size.
    for (const value of this.booleanMap.values()) {
      if (value.value) this.cachedSize++;
    }
  }
}

export class AddWinsCSet<T>
  extends CSetFromBoolean<T, TrueWinsCBoolean>
  implements Resettable
{
  constructor(
    initToken: CrdtInitToken,
    valueSerializer: ElementSerializer<T> = DefaultElementSerializer.getInstance()
  ) {
    super(
      initToken,
      (booleanInitToken) => new TrueWinsCBoolean(booleanInitToken),
      valueSerializer
    );
  }

  delete(value: T): void {
    // Optimize to avoid creating the value if it's
    // not present, in which case deleting is a
    // no-op.
    // Note that we don't do this in the superclass,
    // even though then we are also guaranteed that the
    // value is false, because it is not necessarily a
    // no-op for arbitrary CBoolean's
    // (may still change the internal state).
    const boolean = this.booleanMap.getIfPresent(value);
    if (boolean !== undefined) boolean.value = false;
  }

  reset() {
    // For TrueWinsCBoolean, we know that setting to
    // false is an observed-reset.  So clear, which
    // sets every boolean to false, is semantically
    // an observed-reset.
    this.clear();
  }
}

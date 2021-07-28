import { DefaultElementSerializer, ElementSerializer } from "../../util";
import { CBoolean, TrueWinsCBoolean } from "../boolean";
import { Resettable } from "../helper_crdts";
import { GrowOnlyImplicitMergingMutCMap } from "../map";
import { AbstractCSetCompositeCrdt } from "./abstract_set";

export class CSetFromBoolean<
  T,
  B extends CBoolean
> extends AbstractCSetCompositeCrdt<T, [T]> {
  private readonly booleanMap: GrowOnlyImplicitMergingMutCMap<T, B>;
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
    private readonly booleanConstructor: () => B,
    valueSerializer: ElementSerializer<T> = DefaultElementSerializer.getInstance()
  ) {
    super();
    this.booleanMap = this.addChild(
      "",
      new GrowOnlyImplicitMergingMutCMap(
        this.internalBooleanConstructor.bind(this),
        valueSerializer
      )
    );
    // Events emitters are setup by internalBooleanConstructor
  }

  private internalBooleanConstructor(key: T): B {
    const bool = this.booleanConstructor();
    // Add event listeners
    bool.on("Set", (event) => {
      if (!event.previousValue && bool.value) {
        this.cachedSize++;
        this.emit("Add", { value: key, timestamp: event.timestamp });
      } else if (event.previousValue && !bool.value) {
        this.cachedSize--;
        this.emit("Delete", {
          value: key,
          timestamp: event.timestamp,
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
    // TODO: would it be better to just save the size?
    // It is only a few bytes of save space, vs this extra
    // linear scan, although we already pay the linear time
    // cost when loading booleanMap anyway.
    // Same for MergingMutCMap.
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
    valueSerializer: ElementSerializer<T> = DefaultElementSerializer.getInstance()
  ) {
    super(() => new TrueWinsCBoolean(), valueSerializer);
  }

  reset() {
    // For TrueWinsCBoolean, we know that setting to
    // false is an observed-reset.  So clear, which
    // sets every boolean to false, is semantically
    // an observed-reset.
    this.clear();
  }
}

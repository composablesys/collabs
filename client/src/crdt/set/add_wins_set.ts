import { DefaultElementSerializer, ElementSerializer } from "../../util";
import { CBoolean, TrueWinsCBoolean } from "../boolean";
import { Resettable } from "../helper_crdts";
import { ImplicitCrdtMap } from "../map";
import { AbstractCSetCompositeCrdt } from "./abstract_set";

// TODO: check event types once ImplicitCrdtMap is rewritten
export class BooleanCSet<T> extends AbstractCSetCompositeCrdt<T, [T]> {
  private readonly booleanMap: ImplicitCrdtMap<T, CBoolean>;
  /**
   * TODO: booleans must start false.  If you want
   * different behavior, you should wrap around this
   * set (e.g., negate has to make everything start
   * in the set, or do something else if you want it
   * to start containing some elements but not others).
   */
  constructor(
    booleanConstructor: () => CBoolean,
    valueSerializer: ElementSerializer<T> = DefaultElementSerializer.getInstance()
  ) {
    super();
    this.booleanMap = this.addChild(
      "",
      new ImplicitCrdtMap(booleanConstructor, valueSerializer)
    );

    // Events
    // TODO: optimize to reduce closures?
    this.booleanMap.on("ValueInit", (event) => {
      event.value.on("Change", (event2) => {
        if (this.has(event.key)) {
          this.emit("Add", { value: event.key, timestamp: event2.timestamp });
        } else {
          this.emit("Delete", {
            value: event.key,
            timestamp: event2.timestamp,
          });
        }
      });
    });
  }

  add(value: T): T {
    this.booleanMap.get(value).value = true;
    // TODO: return clone instead, to emphasize that it's
    // a clone in general?
    return value;
  }

  delete(value: T): void {
    this.booleanMap.get(value).value = false;
  }

  // Use inherited clear implementation (delete every value)

  has(value: T): boolean {
    if (this.booleanMap.has(value)) {
      return this.booleanMap.get(value).value;
    } else return false;
  }

  get size(): number {
    // TODO: make run in constant time
    let count = 0;
    for (let _value of this) count++;
    return count;
  }

  *values(): IterableIterator<T> {
    for (let [key, valueBool] of this.booleanMap) {
      if (valueBool.value) yield key;
    }
  }
}

export class AddWinsCSet<T> extends BooleanCSet<T> implements Resettable {
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

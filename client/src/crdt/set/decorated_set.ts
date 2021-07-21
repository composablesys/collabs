import { CompositeCrdt } from "../core";
import { CSet, CSetEventsRecord } from "./interfaces";

// Sets that decorate an existing set, copying its
// methods.  Override to modify methods.
// More flexible/reusable than subclassing the decorated sets.

/**
 * Set that decorates an existing set, copying its
 * methods.  Override to modify methods.
 * More flexible/reusable than subclassing the original set.
 */
export class DecoratedCSet<
    T,
    AddArgs extends any[],
    Events extends CSetEventsRecord<T> = CSetEventsRecord<T>
  >
  extends CompositeCrdt<Events>
  implements CSet<T, AddArgs, Events>
{
  protected readonly set: CSet<T, AddArgs>;
  constructor(set: CSet<T, AddArgs>) {
    super();
    this.set = this.addChild("", set);
    // TODO: do this as a loop if TypeScript will allow it
    this.set.on("Add", (event) => this.emit("Add", event));
    this.set.on("Delete", (event) => this.emit("Delete", event));
    this.set.on("ValueInit", (event) => this.emit("ValueInit", event));
  }

  add(...args: AddArgs): T {
    return this.set.add(...args);
  }

  delete(value: T): void {
    this.set.delete(value);
  }

  has(value: T): boolean {
    return this.set.has(value);
  }

  clear(): void {
    this.set.clear();
  }

  get size(): number {
    return this.set.size;
  }

  forEach(
    callbackfn: (value: T, value2: T, set: this) => void,
    thisArg?: any
  ): void {
    this.set.forEach(
      (value: T, value2: T) => callbackfn(value, value2, this),
      thisArg
    );
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this.set[Symbol.iterator]();
  }

  values(): IterableIterator<T> {
    return this.set.values();
  }
}

// TODO: PlainSet version, if needed

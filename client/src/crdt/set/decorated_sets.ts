import { Crdt, CompositeCrdt } from "../core";
import { CrdtSet, CrdtSetEventsRecord } from "./interfaces";

// Sets that decorate an existing set, copying its
// methods.  Override to modify methods.
// More flexible/reusable than subclassing the decorated sets.

export class DecoratedCrdtSet<C extends Crdt, CreateArgs extends any[] = []>
  extends CompositeCrdt<CrdtSetEventsRecord<C>>
  implements CrdtSet<C, CreateArgs>
{
  protected readonly set: CrdtSet<C, CreateArgs>;
  constructor(set: CrdtSet<C, CreateArgs>) {
    super();
    this.set = this.addChild("", set);
    // TODO: do this as a loop if TypeScript will allow it
    this.set.on("Add", (event) => this.emit("Add", event));
    this.set.on("Delete", (event) => this.emit("Delete", event));
    this.set.on("ValueInit", (event) => this.emit("ValueInit", event));
  }

  create(...args: CreateArgs): C {
    return this.set.create(...args);
  }

  restore(valueCrdt: C): this {
    this.set.restore(valueCrdt);
    return this;
  }

  clear(): void {
    this.set.clear();
  }

  delete(valueCrdt: C): boolean {
    return this.set.delete(valueCrdt);
  }

  owns(valueCrdt: C): boolean {
    return this.set.owns(valueCrdt);
  }

  has(valueCrdt: C): boolean {
    return this.set.has(valueCrdt);
  }

  get size(): number {
    return this.set.size;
  }

  [Symbol.iterator](): IterableIterator<C> {
    return this.set[Symbol.iterator]();
  }

  entries(): IterableIterator<[C, C]> {
    return this.set.entries();
  }

  keys(): IterableIterator<C> {
    return this.set.keys();
  }

  values(): IterableIterator<C> {
    return this.set.values();
  }

  reset(): void {
    return this.set.reset();
  }
}

// TODO: PlainSet version, if needed

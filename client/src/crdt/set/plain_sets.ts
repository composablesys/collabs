import { CausalTimestamp } from "../../net";
import {
  arrayAsString,
  DefaultElementSerializer,
  ElementSerializer,
  stringAsArray,
} from "../../util/serialization";
import { Boolean } from "../boolean/interfaces";
import { TrueWinsBoolean } from "../boolean/wins_booleans";
import { LazyCrdtMap } from "../composers/lazy_crdt_map";
import { PrimitiveCrdt } from "../core/primitive_crdt";
import { AbstractPlainSet } from "./abstract_sets";
import { PlainSet } from "./interfaces";

export class BooleanPlainSet<T> extends AbstractPlainSet<T> {
  private readonly booleanMap: LazyCrdtMap<T, Boolean>;
  /**
   * TODO: trivial (just-initialized) booleans must
   * default to false, for values() to be correct
   * (& finite).  Should there be an option to
   * drop this restriction in return for not calling
   * values()?
   */
  constructor(
    booleanConstructor: () => Boolean,
    valueSerializer: ElementSerializer<T> = DefaultElementSerializer.getInstance()
  ) {
    super();
    this.booleanMap = this.addChild(
      "booleanMap",
      new LazyCrdtMap(booleanConstructor, valueSerializer)
    );
  }
  add(value: T): this {
    this.booleanMap.get(value).value = true;
    return this;
  }
  delete(value: T): boolean {
    const had = this.has(value);
    this.booleanMap.get(value).value = false;
    return had;
  }
  has(value: T): boolean {
    if (this.booleanMap.nontrivialHas(value)) {
      return this.booleanMap.get(value).value;
    } else return false;
  }
  get size(): number {
    // TODO: make run in constant time
    let count = 0;
    for (let _value of this) count++;
    return count;
  }
  values(): IterableIterator<T> {
    throw new Error("Method not implemented.");
  }
  reset(): void {
    // TODO: optimize
    // TODO: this is reset semantics, not set-to-false
    // semantics.  So it may differ from calling delete
    // on every value.  In that case (and more generally),
    // perhaps clear should not be an alias for reset?
    for (let value of this.booleanMap.nontrivialValues()) value.reset();
  }
}

export class AddWinsPlainSet<T> extends BooleanPlainSet<T> {
  constructor(
    valueSerializer: ElementSerializer<T> = DefaultElementSerializer.getInstance()
  ) {
    super(() => new TrueWinsBoolean(), valueSerializer);
  }
}

export class GPlainSet<T>
  extends PrimitiveCrdt<Set<string>>
  implements PlainSet<T>
{
  constructor(
    private readonly valueSerializer: ElementSerializer<T> = DefaultElementSerializer.getInstance()
  ) {
    super(new Set());
  }

  private valueAsString(value: T): string {
    return arrayAsString(this.valueSerializer.serialize(value));
  }

  private stringAsValue(str: string): T {
    return this.valueSerializer.deserialize(stringAsArray(str), this.runtime);
  }

  add(value: T): this {
    this.send(this.valueSerializer.serialize(value));
    return this;
  }

  protected receivePrimitive(
    timestamp: CausalTimestamp,
    message: Uint8Array
  ): void {
    this.state.add(arrayAsString(message));
    // TODO: events
  }

  has(value: T): boolean {
    return this.state.has(this.valueAsString(value));
  }

  get size(): number {
    return this.state.size;
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this.values();
  }

  entries(): IterableIterator<[T, T]> {
    throw new Error("Method not implemented.");
  }

  keys(): IterableIterator<T> {
    return this.values();
  }

  // TODO: note that particular objects may change
  // between different iterations; serialization
  // equality is what matters.
  *values(): IterableIterator<T> {
    for (let str of this.state.values()) {
      yield this.stringAsValue(str);
    }
  }

  clear(): void {
    throw new Error("Unsupported operation: GPlainSet.clear");
  }
  delete(_value: T): boolean {
    throw new Error("Unsupported operation: GPlainSet.delete");
  }
  reset(): void {
    throw new Error("Unsupported operation: GPlainSet.reset");
  }

  canGc(): boolean {
    return this.state.size === 0;
  }
}

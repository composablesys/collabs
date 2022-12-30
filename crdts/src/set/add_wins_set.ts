import {
  AbstractCSetCObject,
  DefaultSerializer,
  InitToken,
  Serializer,
} from "@collabs/core";
import { MultiValueMap } from "../map";

class TrueSerializer implements Serializer<true> {
  private constructor() {
    // Only one instance.
  }

  private static readonly MESSAGE = new Uint8Array();

  serialize(_value: true): Uint8Array {
    return TrueSerializer.MESSAGE;
  }
  deserialize(_message: Uint8Array): true {
    return true;
  }

  static INSTANCE = new TrueSerializer();
}

export class AddWinsCSet<T> extends AbstractCSetCObject<T, [T]> {
  /**
   * Maps from set values to true. A value is present in this set
   * iff it is present as a map key. This essentially implements
   * the classic observed-remove set: a set containing one
   * (value, causal dot) entry per add operation.
   */
  private readonly mvMap: MultiValueMap<T, true>;

  constructor(
    init: InitToken,
    valueSerializer: Serializer<T> = DefaultSerializer.getInstance()
  ) {
    super(init);

    this.mvMap = super.addChild(
      "",
      (init) =>
        new MultiValueMap(init, false, valueSerializer, TrueSerializer.INSTANCE)
    );

    this.mvMap.on("Delete", (e) => {
      this.emit("Delete", {
        value: e.key,
        meta: e.meta,
      });
    });
    this.mvMap.on("Set", (e) => {
      // Ensure the value actually went from not-present to present.
      if (e.previousValue.isPresent) return;
      this.emit("Add", {
        value: e.key,
        meta: e.meta,
      });
    });
  }

  add(value: T): T {
    this.mvMap.set(value, true);
    return value;
  }

  delete(value: T): void {
    this.mvMap.delete(value);
  }

  // Use inherited clear implementation (delete every value).

  has(value: T): boolean {
    return this.mvMap.has(value);
  }

  get size(): number {
    return this.mvMap.size;
  }

  values(): IterableIterator<T> {
    // TODO: mixin confusion here due to ts-expect error.
    // Maybe give up on the mixins with higher-kinded types?
    return this.mvMap.keys();
  }
}

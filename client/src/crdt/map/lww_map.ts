import {
  SequentialMapMessage,
  SequentialMapSave,
} from "../../../generated/proto_compiled";
import { CausalTimestamp } from "../../net";
import {
  arrayAsString,
  byteArrayEquals,
  DefaultElementSerializer,
  ElementSerializer,
  stringAsArray,
} from "../../util";
import { PrimitiveCrdt } from "../core";
import { Resettable } from "../helper_crdts";
import { CRegister, LwwCRegister } from "../register";
import { AbstractCMapCompositeCrdt } from "./abstract_map";
import { ImplicitCrdtMap } from "./riak_crdt_maps";

export class RegisterCMap<K, V, SetArgs extends any[]>
  extends AbstractCMapCompositeCrdt<K, V, SetArgs>
  implements Resettable
{
  private readonly internalMap: ImplicitCrdtMap<
    K,
    CRegister<V, SetArgs> & Resettable
  >;

  /**
   * TODO: the initial value of the register will never
   * be inspected, so feel free to use undefined, even
   * if it is not of type V, with an unsafe type cast,
   * to avoid the trouble of obtain a fake value
   * of type V.
   */
  constructor(
    registerConstructor: (key: K) => CRegister<V, SetArgs> & Resettable,
    keySerializer: ElementSerializer<K> = DefaultElementSerializer.getInstance()
  ) {
    super();
    this.internalMap = this.addChild(
      "",
      new ImplicitCrdtMap(registerConstructor, keySerializer)
    );

    // Events
    // TODO: optimize to reduce closures?
    this.internalMap.on("ValueInit", (event) => {
      event.value.on("Set", (event2) => {
        if (this.internalMap.has(event.key)) {
          this.emit("Set", { key: event.key, timestamp: event2.timestamp });
        } else {
          this.emit("Delete", {
            key: event.key,
            timestamp: event2.timestamp,
          });
        }
      });
    });
  }

  set(key: K, ...args: SetArgs): V {
    const register = this.internalMap.get(key);
    register.set(...args);
    return register.value;
  }

  delete(key: K): void {
    const valueCrdt = this.internalMap.getIfPresent(key);
    if (valueCrdt !== undefined) {
      valueCrdt.reset();
    }
  }

  get(key: K): V | undefined {
    if (this.has(key)) {
      return this.internalMap.get(key).value;
    } else return undefined;
  }

  has(key: K): boolean {
    return this.internalMap.has(key);
  }

  get size(): number {
    return this.internalMap.size;
  }

  *entries(): IterableIterator<[K, V]> {
    for (let [key, valueCrdt] of this.internalMap) {
      yield [key, valueCrdt.value];
    }
  }

  // Use default keyOf with === comparisons.
  // In case SetArgs = [V], you should override keyOf
  // to use serialization equality.

  clear(): void {
    // Slightly more efficient than deleting every value?
    for (let valueCrdt of this.internalMap.values()) {
      valueCrdt.reset();
    }
  }

  reset(): void {
    // Clear indeed has observed-reset semantics.
    this.clear();
  }
}

export class LwwCMap<K, V> extends RegisterCMap<K, V, [V]> {
  constructor(
    keySerializer: ElementSerializer<K> = DefaultElementSerializer.getInstance(),
    private readonly valueSerializer: ElementSerializer<V> = DefaultElementSerializer.getInstance()
  ) {
    super(
      () => new LwwCRegister(undefined as unknown as V, valueSerializer),
      keySerializer
    );
  }

  /**
   * TODO: still O(n), but uses serialization equality
   * instead of ===.
   */
  keyOf(searchElement: V): K | undefined {
    const searchSerialized = this.valueSerializer.serialize(searchElement);
    for (const [key, value] of this) {
      const valueSerialized = this.valueSerializer.serialize(value);
      if (byteArrayEquals(searchSerialized, valueSerialized)) return key;
    }
    return undefined;
  }
}

/**
 * Optimized PlainMap that can *only* be used when
 * keys are unique (never set more than once, even
 * concurrently).  It uses the sequential semantics
 * internally.
 */
export class SequentialPlainMap<K, V>
  extends PrimitiveCrdt<Map<string, V>, PlainMapEventsRecord<K>>
  implements PlainMap<K, V>
{
  constructor(
    private readonly keySerializer: ElementSerializer<K> = DefaultElementSerializer.getInstance(),
    private readonly valueSerializer: ElementSerializer<V> = DefaultElementSerializer.getInstance()
  ) {
    super(new Map());
  }

  private keyAsString(key: K) {
    return arrayAsString(this.keySerializer.serialize(key));
  }
  private stringAsKey(str: string) {
    return this.keySerializer.deserialize(stringAsArray(str), this.runtime);
  }

  clear(): void {
    this.reset();
  }

  delete(key: K): boolean {
    const keySerialized = this.keySerializer.serialize(key);
    const had = this.state.has(arrayAsString(keySerialized));
    const message = SequentialMapMessage.create({
      operation: SequentialMapMessage.Operation.DELETE,
      key: keySerialized,
    });
    super.send(SequentialMapMessage.encode(message).finish());
    return had;
  }

  get(key: K): V | undefined {
    return this.state.get(this.keyAsString(key));
  }

  has(key: K): boolean {
    return this.state.has(this.keyAsString(key));
  }

  set(key: K, value: V): this {
    const message = SequentialMapMessage.create({
      operation: SequentialMapMessage.Operation.SET,
      key: this.keySerializer.serialize(key),
      value: this.valueSerializer.serialize(value),
    });
    super.send(SequentialMapMessage.encode(message).finish());
    return this;
  }

  protected receivePrimitive(
    timestamp: CausalTimestamp,
    message: Uint8Array
  ): void {
    const decoded = SequentialMapMessage.decode(message);
    // TODO: as an optimization, could deserialize key
    // only on demand in the events
    // (use a getter + cache the result)
    const key = this.keySerializer.deserialize(decoded.key, this.runtime);
    switch (decoded.operation) {
      case SequentialMapMessage.Operation.SET:
        // TODO: best-effort error if it's already set?
        this.state.set(
          arrayAsString(decoded.key),
          this.valueSerializer.deserialize(decoded.value, this.runtime)
        );
        this.emit("Set", { key, timestamp });
        break;
      case SequentialMapMessage.Operation.DELETE:
        this.state.delete(arrayAsString(decoded.key));
        this.emit("KeyDelete", { key, timestamp });
        break;
      default:
        throw new Error("Unknown decoded.operation: " + decoded.operation);
    }
  }

  get size(): number {
    return this.state.size;
  }

  [Symbol.iterator](): IterableIterator<[K, V]> {
    return this.entries();
  }

  *keys(): IterableIterator<K> {
    for (let [key, _] of this.entries()) yield key;
  }

  *values(): IterableIterator<V> {
    for (let [_, value] of this.entries()) yield value;
  }

  *entries(): IterableIterator<[K, V]> {
    for (let [keyStr, value] of this.state) {
      yield [this.stringAsKey(keyStr), value];
    }
  }

  reset(): void {
    // TODO: optimize (single message)?
    // Requires remembering causality info.
    // We could require that as part of the uniqueness
    // constraint.
    // Can also optimize by avoiding redundant
    // serialization here.
    for (let key of this.keys()) this.delete(key);
  }

  canGc(): boolean {
    return this.state.size === 0;
  }

  savePrimitive(): Uint8Array {
    // TODO: entries as map<string, bytes> instead?
    // Only if keys are guaranteed to be UTF-8.
    const message = SequentialMapSave.create({
      entries: [...this.state].map(([key, value]) => {
        return {
          key: stringAsArray(key),
          value: this.valueSerializer.serialize(value),
        };
      }),
    });
    return SequentialMapSave.encode(message).finish();
  }

  loadPrimitive(saveData: Uint8Array) {
    const message = SequentialMapSave.decode(saveData);
    for (let entry of message.entries) {
      this.state.set(
        arrayAsString(entry.key),
        this.valueSerializer.deserialize(entry.value, this.runtime)
      );
    }
  }

  forEach(
    callbackfn: (value: V, key: K, map: this) => void,
    thisArg?: any
  ): void {
    for (let [key, value] of this) {
      callbackfn.call(thisArg, value, key, this);
    }
  }

  get [Symbol.toStringTag](): string {
    return "PlainMap";
  }
}

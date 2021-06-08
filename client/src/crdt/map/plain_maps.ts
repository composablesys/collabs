import { SequentialMapMessage } from "../../../generated/proto_compiled";
import { CausalTimestamp } from "../../net";
import {
  arrayAsString,
  DefaultElementSerializer,
  ElementSerializer,
  stringAsArray,
} from "../../util";
import { PrimitiveCrdt } from "../core";
import { Register, LwwRegister } from "../register";
import { AbstractPlainMap } from "./abstract_maps";
import { PlainMap, PlainMapEventsRecord } from "./interfaces";
import { ImplicitCrdtMap } from "./riak_crdt_maps";

export class RegisterPlainMap<K, V> extends AbstractPlainMap<K, V> {
  private readonly internalMap: ImplicitCrdtMap<K, Register<V>>;

  /**
   * TODO: key presence is determined by value
   * triviality (canGc).  Delete calls reset.
   * So make sure these behave normally on Register!
   * (Should we add a more general implementation that uses
   * an arbitrary PlainSet for key presence?  Or a version
   * that uses set-to-undefined for key deletion, in case you
   * want Lww deletion semantics?  I guess the user can do
   * that themselves though.)
   *
   * TODO: the initial value of the register will never
   * be inspected, so feel free to use undefined, even
   * if it is not of type V, with an unsafe type cast,
   * to avoid the trouble of obtain a fake value
   * of type V.
   */
  constructor(
    registerConstructor: (key: K) => Register<V>,
    keySerializer: ElementSerializer<K> = DefaultElementSerializer.getInstance()
  ) {
    super();
    this.internalMap = this.addChild(
      "internalMap",
      new ImplicitCrdtMap(registerConstructor, keySerializer)
    );

    // Events
    // TODO: optimize to reduce closures?
    this.internalMap.on("ValueInit", (event) => {
      event.value.on("Change", () => {
        if (this.has(event.key)) {
          this.emit("Set", { key: event.key, timestamp: event.timestamp });
        } else {
          this.emit("KeyDelete", {
            key: event.key,
            timestamp: event.timestamp,
          });
        }
      });
    });
  }

  delete(key: K): boolean {
    const valueCrdt = this.internalMap.getIfPresent(key);
    if (valueCrdt !== undefined) {
      valueCrdt.reset();
      return true;
    } else return false;
  }

  get(key: K): V | undefined {
    if (this.has(key)) {
      return this.internalMap.get(key).value;
    } else return undefined;
  }

  has(key: K): boolean {
    return this.internalMap.has(key);
  }

  set(key: K, value: V): this {
    this.internalMap.get(key).value = value;
    return this;
  }

  get size(): number {
    return this.internalMap.size;
  }

  *entries(): IterableIterator<[K, V]> {
    for (let [key, valueCrdt] of this.internalMap) {
      yield [key, valueCrdt.value];
    }
  }

  reset(): void {
    // TODO: optimize
    for (let valueCrdt of this.internalMap.values()) {
      valueCrdt.reset();
    }
  }
}

export class LwwPlainMap<K, V> extends RegisterPlainMap<K, V> {
  constructor(
    keySerializer: ElementSerializer<K> = DefaultElementSerializer.getInstance(),
    valueSerializer: ElementSerializer<V> = DefaultElementSerializer.getInstance()
  ) {
    super(
      () => new LwwRegister(undefined as unknown as V, valueSerializer),
      keySerializer
    );
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
}

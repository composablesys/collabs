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

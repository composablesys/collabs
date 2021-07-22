import {
  byteArrayEquals,
  DefaultElementSerializer,
  ElementSerializer,
} from "../../util";
import { CrdtEvent } from "../core";
import { AggregateCRegisterMeta, LwwCRegister } from "../register";
import { DecoratedCMap } from "./decorated_map";
import { CMapEventsRecord } from "./interfaces";
import { RegisterCMap } from "./register_map";

export interface LwwCMapEvent<K, V> extends CrdtEvent {
  key: K;
  value: V;
}

export interface LwwCMapEventsRecord<K, V> extends CMapEventsRecord<K, V> {
  Receive: LwwCMapEvent<K, V>;
}

export class LwwCMap<K, V> extends DecoratedCMap<
  K,
  V,
  [V],
  RegisterCMap<K, V, [V], LwwCRegister<V>>,
  LwwCMapEventsRecord<K, V>
> {
  constructor(
    keySerializer: ElementSerializer<K> = DefaultElementSerializer.getInstance(),
    private readonly valueSerializer: ElementSerializer<V> = DefaultElementSerializer.getInstance()
  ) {
    super(
      new RegisterCMap(
        () => new LwwCRegister(undefined as unknown as V, valueSerializer),
        keySerializer
      )
    );

    // Extra event: Receive
    this.map.internalMap.on("ValueInit", (event) => {
      event.value.on("Receive", (event2) => {
        this.emit("Receive", {
          key: event.key,
          value: event2.value,
          timestamp: event2.timestamp,
        });
      });
    });
  }

  /**
   * Return the current conflicting values at key, i.e., the
   * non-overwritten values.  This may have
   * more than one element due to concurrent writes.
   * If key is not present, returns undefined.
   *
   * The array is guaranteed to contain
   * values in the same order on all replicas, namely,
   * in lexicographic order by sender.
   */
  getConflicts(key: K): V[] | undefined {
    const valueCrdt = this.map.internalMap.getIfPresent(key);
    return valueCrdt === undefined ? undefined : valueCrdt.conflicts();
  }

  /**
   * Return the current conflicting values with metadata.
   * If key is not present, returns undefined.
   *
   * The array is guaranteed to contain
   * values in the same order on all replicas, namely,
   * in lexicographic order by sender.
   */
  getConflictsMeta(key: K): AggregateCRegisterMeta<V>[] | undefined {
    const valueCrdt = this.map.internalMap.getIfPresent(key);
    return valueCrdt === undefined ? undefined : valueCrdt.conflictsMeta();
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

import { IMap, MapEventsRecord } from "@collabs/core";
import { PrimitiveCRDT } from "./primitive_crdt";

/**
 * Skeletal implementation of the [[IMap]] interface, as a subclass of
 * [[PrimitiveCRDT]].
 *
 * This class is a convenience for Collab implementers. It provides
 * some default method implementations and leaves the others abstract.
 */
export declare abstract class AbstractMap_PrimitiveCRDT<
    K,
    V,
    SetArgs extends unknown[] = [V],
    Events extends MapEventsRecord<K, V> = MapEventsRecord<K, V>
  >
  extends PrimitiveCRDT<Events>
  implements IMap<K, V, SetArgs, Events>
{
  clear(): void;
  forEach(
    callbackfn: (value: V, key: K, map: this) => void,
    thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ): void;
  [Symbol.iterator](): IterableIterator<[K, V]>;
  keys(): IterableIterator<K>;
  values(): IterableIterator<V>;
  toString(): string;
  keyOf(searchElement: V): K | undefined;

  abstract set(key: K, ...args: SetArgs): V | undefined;
  abstract delete(key: K): void;
  abstract get(key: K): V | undefined;
  abstract has(key: K): boolean;
  abstract entries(): IterableIterator<[K, V]>;
  abstract readonly size: number;
}

import {
  Bytes,
  DefaultSerializer,
  IMap,
  InitToken,
  int64AsNumber,
  Optional,
  protobufHas,
  Serializer,
  UpdateMeta,
} from "@collabs/core";
import {
  IMultiValueMapItemsSave,
  MultiValueMapItemsSave,
  MultiValueMapMessage,
  MultiValueMapSave,
} from "../../generated/proto_compiled";
import { AbstractMap_PrimitiveCRDT } from "../base_collabs";
import { CRDTMessageMeta, CRDTSavedStateMeta } from "../runtime";

/**
 * An item in a [[MultiValueMap]], i.e., a set value
 * plus metadata.
 */
export interface MultiValueMapItem<V> {
  /**
   * The value.
   */
  readonly value: V;
  /**
   * This item's sender's [[CRuntime.replicaID]].
   */
  readonly senderID: string;
  /**
   * The sender's vector clock entry for the transaction
   * that created this item.
   */
  readonly senderCounter: number;
  /**
   * If [[Aggregator.wallClockTime]] was true in the
   * constructor options, then this
   * is the sender's wall clock time (`Date.now()`) for the transaction
   * that created this item, else undefined.
   */
  readonly wallClockTime?: number;
  /**
   * If [[Aggregator.lamportTimestamp]] was true in the
   * constructor options, then this
   * is the [Lamport timestamp](https://en.wikipedia.org/wiki/Lamport_timestamp)
   * for the transaction
   * that created this item, else undefined.
   */
  readonly lamportTimestamp?: number;
}

/**
 * Wrapper for an aggregate function.
 *
 * By default, if multiple users set a value on a
 * [[CVar]], [[CValueMap]], or [[CMap]] concurrently, one value
 * is picked arbitrarily. You can supply an
 * Aggregator in their constructor to instead apply
 * [[aggregate]] to the concurrently-set values,
 * returning your desired value.
 *
 * For example, our [whiteboard demo](https://collabs-demos.herokuapp.com/web_socket.html?container=demos/whiteboard/dist/whiteboard.html)
 * takes the RGB average of concurrently-set colors,
 * thus blending concurrent strokes.
 */
export interface Aggregator<V> {
  /**
   * The aggregate function, called on concurrently-set
   * values plus metadata (as
   * [[MultiValueMapItem]]s).
   *
   * `items` is always non-empty, and its order is
   * eventually consistent. Specifically, it is
   * in order by [[MultiValueMapItem.sender]].
   *
   * @returns The aggregated value.
   */
  aggregate: (items: MultiValueMapItem<V>[]) => V;
  /**
   * If true, [[MultiValueMapItem.wallClockTime]]
   * is present in aggregated items.
   */
  readonly wallClockTime?: boolean;
  /**
   * If true, [[MultiValueMapItem.lamportTimestamp]]
   * is present in aggregated items.
   */
  readonly lamportTimestamp?: boolean;
}

/**
 * A collaborative "multi-value" map, in which there may be multiple values
 * for a key due to concurrent [[set]] operations.
 *
 * This is a low-level API intended for internal use by other CRDT implementations.
 * In most apps, you are better off using [[CValueMap]] or [[CMap]].
 *
 * @typeParam K The key type.
 * @typeParam V The value type.
 */
export class CMultiValueMap<K, V>
  extends AbstractMap_PrimitiveCRDT<K, MultiValueMapItem<V>[], [V]>
  implements IMap<K, MultiValueMapItem<V>[], [V]>
{
  // In the common case (no concurrent sets on a given key), that key has
  // just one value. We store it as such, instead of as a singleton array,
  // in the hopes of reducing memory usage & (un)boxing time.
  // OPT: profile this to see if it's actually useful.
  // The map key is keyAsString.
  private readonly state = new Map<
    string,
    MultiValueMapItem<V> | MultiValueMapItem<V>[]
  >();

  private readonly keySerializer: Serializer<K>;
  private readonly valueSerializer: Serializer<V>;
  // OPT: don't set if false.
  private readonly wallClockTime: boolean;
  private readonly lamportTimestamp: boolean;

  /**
   * Constructs a MultiValueMap.
   *
   * @param options.keySerializer Serializer for keys. Defaults to [[DefaultSerializer]].
   * @param options.valueSerializer Serializer for values. Defaults to [[DefaultSerializer]].
   * @param options.aggregator [[Aggregator.wallClockTime]]
   * and [[Aggregator.lamportTimestamp]] are used as settings
   * for our [[MultiValueMapItems]]. [[Aggregator.aggregate]]
   * is ignored.
   */
  constructor(
    init: InitToken,
    options: {
      keySerializer?: Serializer<K>;
      valueSerializer?: Serializer<V>;
      aggregator?: Aggregator<V>;
    } = {}
  ) {
    super(init);

    this.keySerializer =
      options.keySerializer ?? DefaultSerializer.getInstance();
    this.valueSerializer =
      options.valueSerializer ?? DefaultSerializer.getInstance();
    this.wallClockTime = options.aggregator?.wallClockTime ?? false;
    this.lamportTimestamp = options.aggregator?.lamportTimestamp ?? false;
  }

  /**
   * Sets the value at key.
   *
   * @returns The corresponding [[MultiValueMapItem]].
   */
  set(key: K, value: V): MultiValueMapItem<V>[] {
    const message = MultiValueMapMessage.create({
      key: this.keySerializer.serialize(key),
      value: this.valueSerializer.serialize(value),
    });
    // Automatic mode suffices to send all of the needed
    // vector clock entries (those corresponding to current
    // items in this.get(key)) and optional wallClockTime/lamportTimestamp.
    super.sendCRDT(MultiValueMapMessage.encode(message).finish());
    // OPT: don't re-serialize here
    return this.get(key)!;
  }

  delete(key: K): void {
    const message = MultiValueMapMessage.create({
      key: this.keySerializer.serialize(key),
    });
    // Automatic mode suffices to send all of the needed
    // vector clock entries (those corresponding to current
    // items in this.get(key)) and optional wallClockTime/lamportTimestamp.
    super.sendCRDT(MultiValueMapMessage.encode(message).finish());
  }

  // OPT: implement clear (better than deleting every value)

  protected receiveCRDT(
    message: Uint8Array | string,
    meta: UpdateMeta,
    crdtMeta: CRDTMessageMeta
  ): void {
    const decoded = MultiValueMapMessage.decode(<Uint8Array>message);
    const keyAsString = Bytes.stringify(decoded.key);
    const previousValue = this.getInternal(keyAsString);

    const newItems: MultiValueMapItem<V>[] = [];
    let needsSort = false;

    if (previousValue !== undefined) {
      for (const item of previousValue) {
        // Omit causally dominated entries, including previous sets from the
        // same transaction.
        if (crdtMeta.vectorClock.get(item.senderID) < item.senderCounter) {
          newItems.push(item);
        }
      }
    }
    if (protobufHas(decoded, "value")) {
      // It's a set operation; add the set item.
      newItems.push({
        value: this.valueSerializer.deserialize(decoded.value),
        senderID: meta.senderID,
        senderCounter: crdtMeta.senderCounter,
        ...(this.wallClockTime
          ? { wallClockTime: crdtMeta.wallClockTime! }
          : {}),
        ...(this.lamportTimestamp
          ? { lamportTimestamp: crdtMeta.lamportTimestamp! }
          : {}),
      });
      needsSort = true;
    }

    this.applyNewItems(
      keyAsString,
      decoded.key,
      previousValue,
      newItems,
      meta,
      needsSort
    );
  }

  private applyNewItems(
    keyAsString: string,
    keyAsBytes: Uint8Array | undefined,
    previousValue: MultiValueMapItem<V>[] | undefined,
    newItems: MultiValueMapItem<V>[],
    meta: UpdateMeta,
    needsSort: boolean
  ) {
    if (needsSort) {
      // Sort newItems to make its order deterministic (same across replicas).
      newItems.sort((a, b) => (a.senderID < b.senderID ? -1 : 1));
    }

    const key = this.keySerializer.deserialize(
      keyAsBytes ?? Bytes.parse(keyAsString)
    );

    if (newItems.length === 0) {
      this.state.delete(keyAsString);
      if (previousValue !== undefined) {
        this.emit("Delete", { key, value: previousValue, meta });
      }
    } else {
      this.state.set(
        keyAsString,
        newItems.length === 1 ? newItems[0] : newItems
      );
      this.emit("Set", {
        key,
        value: newItems,
        previousValue:
          previousValue === undefined
            ? Optional.empty()
            : Optional.of(previousValue),
        meta,
      });
    }
  }

  private asArray(
    value: MultiValueMapItem<V> | MultiValueMapItem<V>[]
  ): MultiValueMapItem<V>[] {
    if (value === undefined) return [];
    if (Array.isArray(value)) return value;
    else return [value];
  }

  /**
   * Returns the array of [[MultiValueMapItem]]s corresponding
   * to conflicting concurrent [[set]]s at `key`,
   * or undefined if key is not present.
   *
   * If defined, the return value is always non-empty, and its order is
   * eventually consistent. Specifically, it is
   * in order by [[MultiValueMapItem.sender]].
   *
   * Do not modify a returned array.
   */
  get(key: K): MultiValueMapItem<V>[] | undefined {
    return this.getInternal(Bytes.stringify(this.keySerializer.serialize(key)));
  }

  private getInternal(keyAsString: string): MultiValueMapItem<V>[] | undefined {
    const value = this.state.get(keyAsString);
    return value === undefined ? undefined : this.asArray(value);
  }

  has(key: K): boolean {
    return this.state.has(Bytes.stringify(this.keySerializer.serialize(key)));
  }

  get size(): number {
    return this.state.size;
  }

  /**
   * Returns an iterable of `[key, get(key)]` pairs
   * for every entry in the map.
   *
   * The iteration order is NOT eventually consistent:
   * it may differ on replicas with the same state.
   */
  *entries(): IterableIterator<[K, MultiValueMapItem<V>[]]> {
    for (const [key, value] of this.state) {
      yield [
        this.keySerializer.deserialize(Bytes.parse(key)),
        this.asArray(value),
      ];
    }
  }

  protected saveCRDT(): Uint8Array {
    const entries: Record<string, IMultiValueMapItemsSave> = {};
    const senders: string[] = [];
    const indexBySender = new Map<string, number>();
    for (const [keyAsString, itemsRaw] of this.state) {
      const items = this.asArray(itemsRaw);
      const entry: IMultiValueMapItemsSave = {
        values: new Array(items.length),
        senders: new Array(items.length),
        senderCounters: new Array(items.length),
      };
      if (this.wallClockTime) entry.wallClockTimes = new Array(items.length);
      if (this.lamportTimestamp)
        entry.lamportTimestamps = new Array(items.length);

      for (let i = 0; i < items.length; i++) {
        entry.values![i] = this.valueSerializer.serialize(items[i].value);
        let sender = indexBySender.get(items[i].senderID);
        if (sender === undefined) {
          sender = senders.length;
          senders.push(items[i].senderID);
        }
        entry.senders![i] = sender;
        entry.senderCounters![i] = items[i].senderCounter;
        if (this.wallClockTime)
          entry.wallClockTimes![i] = items[i].wallClockTime!;
        if (this.lamportTimestamp)
          entry.lamportTimestamps![i] = items[i].lamportTimestamp!;
      }

      entries[keyAsString] = entry;
    }

    return MultiValueMapSave.encode({ entries, senders }).finish();
  }

  loadCRDT(
    savedState: Uint8Array | null,
    meta: UpdateMeta,
    crdtMeta: CRDTSavedStateMeta
  ): void {
    let decoded: MultiValueMapSave;
    if (savedState === null) {
      // Assume the saved state was trivial (had canGC() = true), i.e.,
      // 0 values.
      decoded = MultiValueMapSave.create({ entries: {}, senders: [] });
    } else {
      decoded = MultiValueMapSave.decode(savedState);
    }

    // Loop through keys in this.state.
    for (const [keyAsString, itemsRaw] of this.state) {
      this.loadOneKey(
        keyAsString,
        this.asArray(itemsRaw),
        decoded.entries[keyAsString] as MultiValueMapItemsSave | undefined,
        decoded.senders,
        meta,
        crdtMeta
      );
      // Delete from decoded so we don't loop over it again.
      delete decoded.entries[keyAsString];
    }
    // Loop through keys in decoded but not this.state.
    for (const [keyAsString, items] of Object.entries(decoded.entries)) {
      this.loadOneKey(
        keyAsString,
        undefined,
        items as MultiValueMapItemsSave,
        decoded.senders,
        meta,
        crdtMeta
      );
    }
  }

  private loadOneKey(
    keyAsString: string,
    localItems: MultiValueMapItem<V>[] | undefined,
    remoteItems: MultiValueMapItemsSave | undefined,
    decodedSenders: string[],
    meta: UpdateMeta,
    crdtMeta: CRDTSavedStateMeta
  ): void {
    // The new set of items is the union of:
    // 1. Items in both localItems and remoteItems.
    // 2. Items in localItems only that are not causally dominated by crdtMeta.remoteVC.
    // 3. Items in remoteItems only that are not causally dominated by crdtMeta.localVC.
    const newItems: MultiValueMapItem<V>[] = [];

    let addedRemote = false;
    if (localItems !== undefined) {
      // Map remote senders to senderCounters, for intersection checking.
      // We are guaranteed that items with the same sender & senderCounter
      // are identical. (Even if there were multiple ops in that transaction,
      // we'll only ever see the last op.)
      const remoteMap = new Map();
      if (remoteItems !== undefined) {
        for (let i = 0; i < remoteItems.senders.length; i++) {
          remoteMap.set(
            decodedSenders[remoteItems.senders[i]],
            remoteItems.senderCounters[i]
          );
        }
      }

      for (const localItem of localItems) {
        if (
          // Case 2
          crdtMeta.remoteVectorClock.get(localItem.senderID) <
            localItem.senderCounter ||
          // Case 1
          remoteMap.get(localItem.senderID) === localItem.senderCounter
        ) {
          newItems.push(localItem);
        }
      }
    }
    if (remoteItems !== undefined) {
      for (let i = 0; i < remoteItems.senders.length; i++) {
        const sender = decodedSenders[remoteItems.senders[i]];
        const senderCounter = remoteItems.senderCounters[i];
        // Case 3
        if (crdtMeta.localVectorClock.get(sender) < senderCounter) {
          newItems.push({
            value: this.valueSerializer.deserialize(remoteItems.values[i]),
            senderID: sender,
            senderCounter,
            ...(this.wallClockTime
              ? {
                  wallClockTime: int64AsNumber(remoteItems.wallClockTimes[i]),
                }
              : {}),
            ...(this.lamportTimestamp
              ? {
                  lamportTimestamp: int64AsNumber(
                    remoteItems.lamportTimestamps[i]
                  ),
                }
              : {}),
          });
          addedRemote = true;
        }
      }
    }

    if (
      addedRemote ||
      (localItems !== undefined && newItems.length < localItems.length)
    ) {
      // newItems differs from localItems; update this.state and emit
      // an event.
      this.applyNewItems(
        keyAsString,
        undefined,
        localItems,
        newItems,
        meta,
        addedRemote
      );
    }
  }

  canGC(): boolean {
    return this.state.size === 0;
  }
}

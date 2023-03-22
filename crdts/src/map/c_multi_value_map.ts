import {
  Bytes,
  DefaultSerializer,
  IMap,
  InitToken,
  int64AsNumber,
  Optional,
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

// TODO: don't modify arrays you get from get() or events
// (may be live).

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
  readonly sender: string;
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
    const key = this.keySerializer.deserialize(decoded.key);
    const keyAsString = Bytes.stringify(decoded.key);

    // OPT: don't re-serialize here
    const previousValueLiteral = this.get(key);

    const newItems: MultiValueMapItem<V>[] = [];
    if (previousValueLiteral !== undefined) {
      for (const item of previousValueLiteral) {
        // Omit causally dominated entries, including previous sets from the
        // same transaction.
        if (crdtMeta.vectorClock.get(item.sender) < item.senderCounter) {
          newItems.push(item);
        }
      }
    }

    if (Object.prototype.hasOwnProperty.call(decoded, "value")) {
      // It's a set operation; add the set item.
      newItems.push({
        value: this.valueSerializer.deserialize(decoded.value),
        sender: meta.senderID,
        senderCounter: crdtMeta.senderCounter,
        ...(this.wallClockTime
          ? { wallClockTime: crdtMeta.wallClockTime! }
          : {}),
        ...(this.lamportTimestamp
          ? { lamportTimestamp: crdtMeta.lamportTimestamp! }
          : {}),
      });
      // Sort newItems to make its order deterministic (same across replicas).
      // We don't have to do this in the delete case because then newItems
      // is a suborder of the previous items, which were sorted.
      newItems.sort((a, b) => (a.sender < b.sender ? -1 : 1));
    }

    if (newItems.length === 0) {
      this.state.delete(keyAsString);
      if (previousValueLiteral !== undefined) {
        this.emit("Delete", { key, value: previousValueLiteral, meta });
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
          previousValueLiteral === undefined
            ? Optional.empty()
            : Optional.of(previousValueLiteral),
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
   * The return value is always non-empty, and its order is
   * eventually consistent. Specifically, it is
   * in order by [[MultiValueMapItem.sender]].
   */
  get(key: K): MultiValueMapItem<V>[] | undefined {
    const value = this.state.get(
      Bytes.stringify(this.keySerializer.serialize(key))
    );
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

  protected saveCRDT(): Uint8Array | null {
    // Even if we have no state, we cannot return null, because load()
    // needs to look at our VC.

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
        let sender = indexBySender.get(items[i].sender);
        if (sender === undefined) {
          sender = senders.length;
          senders.push(items[i].sender);
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
    savedState: Uint8Array,
    meta: UpdateMeta,
    crdtMeta: CRDTSavedStateMeta
  ): void {
    const decoded = MultiValueMapSave.decode(savedState);

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
    // 1. Items in both oldItems and loadedItems.
    // 2. Items in localItems only that are not causally dominated by crdtMeta.remoteVC.
    // 3. Items in remoteItems only that are not causally dominated by crdtMeta.localVC.
    const newItems: MultiValueMapItem<V>[] = [];

    let pushedRemote = false;
    const localLength = localItems?.length ?? 0;
    const remoteLength = remoteItems?.values.length ?? 0;
    // To keep the results sorted and allow quickly checking Case 1, use a
    // mergesort-like loop.
    let localI = 0;
    let remoteI = 0;
    while (localI < localLength || remoteI < remoteLength) {
      let pushLocal = false;
      let pushRemote = false;
      let remoteSenderCounter: number;
      const localSender =
        localI === localLength ? undefined : localItems![localI].sender;
      const remoteSender =
        remoteI === remoteLength
          ? undefined
          : decodedSenders[remoteItems!.senders[remoteI]];
      if (remoteSender === undefined || localSender! < remoteSender) {
        // Local item has next sender, check case 2.
        const localSenderCounter = localItems![localI].senderCounter;
        if (localSenderCounter > crdtMeta.remoteVectorClock.get(localSender!)) {
          pushLocal = true;
        }
        localI++;
      } else if (localSender === undefined || remoteSender < localSender) {
        // Remote item has next sender, check case 3.
        remoteSenderCounter = int64AsNumber(
          remoteItems!.senderCounters[remoteI]
        );
        if (remoteSenderCounter > crdtMeta.localVectorClock.get(remoteSender)) {
          pushRemote = true;
        }
        remoteI++;
      } else {
        // Both items have same sender; the one with >= senderCounter
        // is the only remaining item and can't be dominated by the
        // other. This includes case 1:
        // == senderCounters must be the same item even if the source
        // transaction had multiple sets (it's always the last set).
        const localSenderCounter = localItems![localI].senderCounter;
        remoteSenderCounter = int64AsNumber(
          remoteItems!.senderCounters[remoteI]
        );
        if (localSenderCounter >= remoteSenderCounter) {
          pushLocal = true;
        } else {
          pushRemote = true;
        }
        localI++;
        remoteI++;
      }

      if (pushLocal) {
        newItems.push(localItems![localI]);
      } else if (pushRemote) {
        newItems.push({
          value: this.valueSerializer.deserialize(remoteItems!.values[remoteI]),
          sender: remoteSender!,
          senderCounter: remoteSenderCounter!,
          ...(this.wallClockTime
            ? {
                wallClockTime: int64AsNumber(
                  remoteItems!.wallClockTimes[remoteI]
                ),
              }
            : {}),
          ...(this.lamportTimestamp
            ? {
                lamportTimestamp: int64AsNumber(
                  remoteItems!.lamportTimestamps[remoteI]
                ),
              }
            : {}),
        });
        pushedRemote = true;
      }
    }

    if (pushedRemote || newItems.length < localLength) {
      // newItems differs from localItems; update this.state and emit
      // an event.
      const key = this.keySerializer.deserialize(Bytes.parse(keyAsString));
      if (newItems.length === 0) {
        this.state.delete(keyAsString);
        this.emit("Delete", { key, value: localItems!, meta });
      } else {
        this.state.set(
          keyAsString,
          newItems.length === 1 ? newItems[0] : newItems
        );
        this.emit("Set", {
          key,
          value: newItems,
          previousValue:
            localItems === undefined
              ? Optional.empty()
              : Optional.of(localItems),
          meta,
        });
      }
    }
  }

  canGC(): boolean {
    return this.state.size === 0;
  }
}

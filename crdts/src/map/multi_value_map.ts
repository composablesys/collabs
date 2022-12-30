import {
  CMap,
  DefaultSerializer,
  InitToken,
  int64AsNumber,
  Message,
  MessageMeta,
  Optional,
  Serializer,
} from "@collabs/core";
import {
  MultiValueMapMessage,
  MultiValueMapSave,
} from "../../generated/proto_compiled";
import { AbstractCMapPrimitiveCRDT } from "../constructions";
import { CRDTMeta } from "../crdt-runtime";

export interface MultiValueMapItem<V> {
  readonly value: V;
  readonly sender: string;
  readonly senderCounter: number;
  readonly wallClockTime?: number;
}

export class MultiValueMap<K, V>
  extends AbstractCMapPrimitiveCRDT<K, MultiValueMapItem<V>[], [V]>
  implements CMap<K, MultiValueMapItem<V>[], [V]>
{
  // TODO: explain/profile array opt (trying to avoid singleton array memory)
  private readonly state = new Map<
    K,
    MultiValueMapItem<V> | MultiValueMapItem<V>[]
  >();

  constructor(
    init: InitToken,
    private readonly wallClockTime = false,
    private readonly keySerializer: Serializer<K> = DefaultSerializer.getInstance(),
    private readonly valueSerializer: Serializer<V> = DefaultSerializer.getInstance()
  ) {
    super(init);
  }

  set(key: K, value: V): MultiValueMapItem<V>[] {
    const message = MultiValueMapMessage.create({
      key: this.keySerializer.serialize(key),
      value: this.valueSerializer.serialize(value),
    });
    super.sendCRDT(MultiValueMapMessage.encode(message).finish(), {
      // Automatic mode suffices to send all of the needed
      // vector clock entries (those corresponding to current
      // items in this.get(key)) and optional wallClockTime.
      automatic: true,
    });
    return this.get(key)!;
  }

  delete(key: K): void {
    const message = MultiValueMapMessage.create({
      key: this.keySerializer.serialize(key),
    });
    super.sendCRDT(MultiValueMapMessage.encode(message).finish(), {
      // Automatic mode suffices to send all of the needed
      // vector clock entries (those corresponding to current
      // items in this.get(key)).
      automatic: true,
    });
  }

  protected receiveCRDT(
    message: Message,
    meta: MessageMeta,
    crdtMeta: CRDTMeta
  ): void {
    const decoded = MultiValueMapMessage.decode(<Uint8Array>message);
    const key = this.keySerializer.deserialize(decoded.key);

    const previousValueLiteral = this.get(key);

    const newItems: MultiValueMapItem<V>[] = [];
    if (previousValueLiteral !== undefined) {
      for (const item of previousValueLiteral) {
        if (crdtMeta.vectorClockGet(item.sender) < item.senderCounter) {
          newItems.push(item);
        }
      }
    }

    if (Object.prototype.hasOwnProperty.call(decoded, "value")) {
      // It's a set operation; add the set item.
      newItems.push({
        value: this.valueSerializer.deserialize(decoded.value),
        sender: crdtMeta.sender,
        senderCounter: crdtMeta.senderCounter,
        ...(this.wallClockTime
          ? { wallClockTime: crdtMeta.wallClockTime! }
          : {}),
      });
      // Sort newItems to make its order deterministic (same across replicas).
      // We don't have to do this in the delete case because then newItems
      // is a suborder of the previous items, which were sorted.
      newItems.sort((a, b) => (a.sender < b.sender ? -1 : 1));
    }

    if (newItems.length === 0) {
      this.state.delete(key);
      if (previousValueLiteral !== undefined) {
        this.emit("Delete", { key, value: previousValueLiteral, meta });
      }
    } else {
      this.state.set(key, newItems.length === 1 ? newItems[0] : newItems);
      this.emit("Set", {
        key,
        value: newItems,
        previousValue:
          previousValueLiteral === undefined
            ? Optional.empty<MultiValueMapItem<V>[]>()
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
   * If not has, returns undefined, not [].
   *
   * Singleton return values are not === stable (may be different arrays
   * with same single item).
   *
   * Items ordered lexicographically by sender.
   */
  get(key: K): MultiValueMapItem<V>[] | undefined {
    const value = this.state.get(key);
    return value === undefined ? undefined : this.asArray(value);
  }

  has(key: K): boolean {
    return this.state.has(key);
  }

  get size(): number {
    return this.state.size;
  }

  /**
   * Items in each value ordered lexicographically by sender.
   */
  *entries(): IterableIterator<[K, MultiValueMapItem<V>[]]> {
    for (const [key, value] of this.state.entries()) {
      yield [key, this.asArray(value)];
    }
  }

  save(): Uint8Array {
    const stateBySender: Record<
      string,
      {
        keys: Uint8Array[];
        values: Uint8Array[];
        senderCounterDiffs: number[];
        wallClockTimeDiffs: number[];
      }
    > = {};
    const lastItems = new Map<string, MultiValueMapItem<V>>();

    for (const [key, items] of this.state) {
      const keySerialized = this.keySerializer.serialize(key);
      for (const item of this.asArray(items)) {
        let senderSave = stateBySender[item.sender];
        if (senderSave === undefined) {
          senderSave = {
            keys: [],
            values: [],
            senderCounterDiffs: [],
            wallClockTimeDiffs: [],
          };
        }

        const lastItem = lastItems.get(item.sender);
        lastItems.set(item.sender, item);

        senderSave.keys.push(keySerialized);
        senderSave.values.push(this.valueSerializer.serialize(item.value));
        senderSave.senderCounterDiffs.push(
          item.senderCounter - (lastItem?.senderCounter ?? 0)
        );
        if (this.wallClockTime) {
          senderSave.wallClockTimeDiffs.push(
            item.wallClockTime! - (lastItem?.wallClockTime ?? 0)
          );
        }
      }
    }

    return MultiValueMapSave.encode({ stateBySender }).finish();
  }

  load(saveData: Optional<Uint8Array>): void {
    if (!saveData.isPresent) return;

    const stateBySender = MultiValueMapSave.decode(
      saveData.get()
    ).stateBySender;

    for (const [sender, senderSave] of Object.entries(stateBySender)) {
      let senderCounter = 0;
      let wallClockTime = 0;
      for (let i = 0; i < senderSave.keys!.length; i++) {
        const key = this.keySerializer.deserialize(senderSave.keys![i]);
        senderCounter += int64AsNumber(senderSave.senderCounterDiffs![i]);
        if (this.wallClockTime) {
          wallClockTime += int64AsNumber(senderSave.wallClockTimeDiffs![i]);
        }
        const newItem: MultiValueMapItem<V> = {
          value: this.valueSerializer.deserialize(senderSave.values![i]),
          sender,
          senderCounter,
          ...(this.wallClockTime ? { wallClockTime } : {}),
        };

        const previousValue = this.state.get(key);
        if (previousValue === undefined) {
          this.state.set(key, newItem);
        } else if (Array.isArray(previousValue)) {
          previousValue.push(newItem);
        } else {
          this.state.set(key, [previousValue, newItem]);
        }
      }
    }
  }

  canGC(): boolean {
    return this.state.size === 0;
  }
}

import {
  InitToken,
  Message,
  MessageMeta,
  AbstractCListCPrimitive,
  FoundLocation,
  LocatableCList,
  DefaultSerializer,
  int64AsNumber,
  Optional,
  Serializer,
} from "@collabs/core";
import {
  IPrimitiveCListInsertMessage,
  IPrimitiveCListSave,
  PrimitiveCListMessage,
  PrimitiveCListSave,
} from "../../generated/proto_compiled";
import {
  ArrayListItemManager,
  ListPosition,
  ListPositionSource,
} from "./list_position_source";

export class PrimitiveCList<T>
  extends AbstractCListCPrimitive<T, [T]>
  implements LocatableCList<T>
{
  private readonly positionSource: ListPositionSource<T[]>;
  /**
   * Used for local operations, to store the index where the operation is
   * happening, so we don't have to find() the relevant position twice.
   * Reset to -1 (indicating not valid) whenever we receive a remote message.
   * That implies that this is still reliable even if we don't get immediate
   * local echos, i.e., the CText is used in a non-CRDT fashion.
   */
  private indexHint = -1;

  constructor(
    initToken: InitToken,
    protected readonly valueSerializer: Serializer<T> = DefaultSerializer.getInstance(),
    protected readonly valueArraySerializer:
      | Serializer<T[]>
      | undefined = undefined
  ) {
    super(initToken);

    this.positionSource = new ListPositionSource(
      this.runtime.replicaID,
      ArrayListItemManager.getInstance()
    );
  }

  // OPT: optimize bulk methods.

  insert(index: number, value: T): T;
  insert(index: number, ...values: T[]): T | undefined;
  insert(index: number, ...values: T[]): T | undefined {
    if (values.length === 0) return undefined;

    this.indexHint = index;
    const prevPos =
      index === 0 ? null : this.positionSource.getPosition(index - 1);
    const [counter, startValueIndex, metadata] =
      this.positionSource.createPositions(prevPos);

    const imessage: IPrimitiveCListInsertMessage = {
      counter,
      startValueIndex,
      metadata,
    };
    if (values.length === 1) {
      imessage.value = this.valueSerializer.serialize(values[0]);
    } else if (this.valueArraySerializer !== undefined) {
      imessage.valuesArray = this.valueArraySerializer.serialize(values);
    } else {
      imessage.values = values.map((value) =>
        this.valueSerializer.serialize(value)
      );
    }

    const message = PrimitiveCListMessage.create({
      insert: imessage,
    });
    this.sendPrimitive(PrimitiveCListMessage.encode(message).finish());

    return values[0];
  }

  delete(startIndex: number, count = 1): void {
    if (startIndex < 0) {
      throw new Error(`startIndex out of bounds: ${startIndex}`);
    }
    if (startIndex + count > this.length) {
      throw new Error(
        `(startIndex + count) out of bounds: ${startIndex} + ${count} (length: ${this.length})`
      );
    }

    // OPT: native range deletes? E.g. compress waypoint valueIndex ranges.
    // OPT: optimize range iteration (back to front).
    // Delete from back to front, so indices make sense.
    for (let i = startIndex + count - 1; i >= startIndex; i--) {
      this.indexHint = i;
      const pos = this.positionSource.getPosition(i);
      const message = PrimitiveCListMessage.create({
        delete: {
          sender: pos[0] === this.runtime.replicaID ? null : pos[0],
          counter: pos[1],
          valueIndex: pos[2],
        },
      });
      this.sendPrimitive(PrimitiveCListMessage.encode(message).finish());
    }
  }

  protected receivePrimitive(message: Message, meta: MessageMeta): void {
    if (!meta.isLocalEcho) this.indexHint = -1;

    const decoded = PrimitiveCListMessage.decode(<Uint8Array>message);
    switch (decoded.op) {
      case "insert": {
        const counter = int64AsNumber(decoded.insert!.counter);
        const startValueIndex = decoded.insert!.startValueIndex;
        const metadata = Object.prototype.hasOwnProperty.call(
          decoded.insert!,
          "metadata"
        )
          ? decoded.insert!.metadata!
          : null;

        let values: T[];
        if (Object.prototype.hasOwnProperty.call(decoded.insert!, "value")) {
          values = [this.valueSerializer.deserialize(decoded.insert!.value!)];
        } else if (this.valueArraySerializer !== undefined) {
          values = this.valueArraySerializer.deserialize(
            decoded.insert!.valuesArray!
          );
        } else {
          values = decoded.insert!.values!.map((value) =>
            this.valueSerializer.deserialize(value)
          );
        }

        const pos: ListPosition = [meta.sender, counter, startValueIndex];
        this.positionSource.receiveAndAddPositions(pos, values, metadata);

        const startIndex =
          this.indexHint !== -1
            ? this.indexHint
            : this.positionSource.find(pos)[0];
        // Here we exploit the LtR non-interleaving property
        // to assert that the inserted values are contiguous.
        this.emit("Insert", {
          startIndex,
          count: values.length,
          meta,
        });

        break;
      }
      case "delete": {
        const sender = Object.prototype.hasOwnProperty.call(
          decoded.delete!,
          "sender"
        )
          ? decoded.delete!.sender!
          : meta.sender;
        const counter = int64AsNumber(decoded.delete!.counter);
        const valueIndex = decoded.delete!.valueIndex;
        const pos: ListPosition = [sender, counter, valueIndex];
        const deletedValues = this.positionSource.delete(pos);
        if (deletedValues !== null) {
          const startIndex =
            this.indexHint !== -1
              ? this.indexHint
              : this.positionSource.find(pos)[0];
          this.emit("Delete", {
            startIndex,
            count: 1,
            deletedValues,
            meta,
          });
        }
        break;
      }
      default:
        throw new Error(`Unrecognized decoded.op: ${decoded.op}`);
    }
  }

  get(index: number): T {
    const [item, offset] = this.positionSource.getItem(index);
    return item[offset];
  }

  *values(): IterableIterator<T> {
    for (const item of this.positionSource.items()) {
      yield* item;
    }
  }

  get length(): number {
    return this.positionSource.length;
  }

  // Override alias insert methods so we can accept
  // bulk values.

  push(value: T): T;
  push(...values: T[]): T | undefined;
  push(...values: T[]): T | undefined {
    return this.insert(this.length, ...values);
  }

  unshift(value: T): T;
  unshift(...values: T[]): T | undefined;
  unshift(...values: T[]): T | undefined {
    return this.insert(0, ...values);
  }

  splice(startIndex: number, deleteCount?: number, ...values: T[]): void {
    // Sanitize deleteCount
    if (deleteCount === undefined || deleteCount > this.length - startIndex)
      deleteCount = this.length - startIndex;
    else if (deleteCount < 0) deleteCount = 0;
    // Delete then insert
    this.delete(startIndex, deleteCount);
    if (values.length > 0) {
      this.insert(startIndex, ...values);
    }
  }

  slice(start?: number, end?: number): T[] {
    // Optimize common case (slice())
    if (start === undefined && end === undefined) {
      return [...this.values()];
    } else {
      // OPT: optimize using items() iterator or similar.
      return super.slice(start, end);
    }
  }

  getLocation(index: number): string {
    const pos = this.positionSource.getPosition(index);
    return JSON.stringify(pos);
  }

  findLocation(location: string): FoundLocation {
    const pos = <ListPosition>JSON.parse(location);
    return new FoundLocation(...this.positionSource.find(pos));
  }

  *locationEntries(): IterableIterator<[string, T]> {
    for (const [pos, length, item] of this.positionSource.itemPositions()) {
      for (let i = 0; i < length; i++) {
        yield [JSON.stringify(pos), item[i]];
        pos[2]++;
      }
    }
  }

  save(): Uint8Array {
    const imessage: IPrimitiveCListSave = {
      positionSourceSave: this.positionSource.save(),
    };
    if (this.valueArraySerializer !== undefined) {
      imessage.valuesArraySave = this.valueArraySerializer.serialize(
        this.slice()
      );
    } else {
      imessage.valuesSave = new Array(this.length);
      let i = 0;
      for (const value of this.values()) {
        imessage.valuesSave[i] = this.valueSerializer.serialize(value);
        i++;
      }
    }
    const message = PrimitiveCListSave.create(imessage);
    return PrimitiveCListSave.encode(message).finish();
  }

  load(saveData: Optional<Uint8Array>): void {
    if (saveData.isPresent) {
      const decoded = PrimitiveCListSave.decode(saveData.get());
      let values: T[];
      if (this.valueArraySerializer !== undefined) {
        values = this.valueArraySerializer.deserialize(decoded.valuesArraySave);
      } else {
        values = decoded.valuesSave.map((value) =>
          this.valueSerializer.deserialize(value)
        );
      }
      let index = 0;
      this.positionSource.load(decoded.positionSourceSave, (count) => {
        const ans = values.slice(index, index + count);
        index += count;
        return ans;
      });
    }
  }

  canGC(): boolean {
    // OPT: return true if not yet mutated.
    // Also, note in docs that this won't be true even if empty, due to
    // tombstones.
    return false;
  }

  // // For debugging positionSource.
  // printTreeWalk() {
  //   this.positionSource.printTreeWalk();
  // }
}

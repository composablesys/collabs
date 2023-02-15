import {
  DefaultSerializer,
  InitToken,
  int64AsNumber,
  Serializer,
  UpdateMeta,
} from "@collabs/core";
import {
  CValueListMessage,
  CValueListSave,
  ICValueListInsertMessage,
  ICValueListSave,
} from "../../generated/proto_compiled";
import { AbstractList_PrimitiveCRDT } from "../constructions";
import {
  ArrayListItemManager,
  ListPosition,
  ListPositionSource,
} from "./list_position_source";

// OPT: better position encoding than JSON.
// (Distribute with ListPositionSource, in place of / addition to
// the current serializers?)

export class CValueList<T> extends AbstractList_PrimitiveCRDT<T, [T]> {
  private readonly positionSource: ListPositionSource<T[]>;

  protected readonly valueSerializer: Serializer<T>;
  protected readonly valueArraySerializer: Serializer<T[]> | undefined;

  constructor(
    init: InitToken,
    options: {
      valueSerializer?: Serializer<T>;
      /** Default is to next Serializer<T>, not DefaultSerializer<T[]> */
      valueArraySerializer?: Serializer<T[]>;
    } = {}
  ) {
    super(init);

    this.valueSerializer =
      options.valueSerializer ?? DefaultSerializer.getInstance();
    this.valueArraySerializer = options.valueArraySerializer ?? undefined;

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

    const prevPos =
      index === 0 ? null : this.positionSource.getPosition(index - 1);
    const [counter, startValueIndex, metadata] =
      this.positionSource.createPositions(prevPos);

    const imessage: ICValueListInsertMessage = {
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

    const message = CValueListMessage.create({
      insert: imessage,
    });
    this.sendPrimitive(CValueListMessage.encode(message).finish());

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
      const pos = this.positionSource.getPosition(i);
      const message = CValueListMessage.create({
        delete: {
          sender: pos[0] === this.runtime.replicaID ? null : pos[0],
          counter: pos[1],
          valueIndex: pos[2],
        },
      });
      this.sendPrimitive(CValueListMessage.encode(message).finish());
    }
  }

  protected receiveCRDT(message: Uint8Array | string, meta: UpdateMeta): void {
    const decoded = CValueListMessage.decode(<Uint8Array>message);
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

        const startPos: ListPosition = [
          meta.senderID,
          counter,
          startValueIndex,
        ];
        this.positionSource.receiveAndAddPositions(startPos, values, metadata);

        const startIndex = this.positionSource.indexOfPosition(startPos);
        const positions = new Array<string>(values.length);
        for (let i = 0; i < values.length; i++) {
          positions[i] = JSON.stringify([
            meta.senderID,
            counter,
            startValueIndex + i,
          ] as ListPosition);
        }
        // Here we exploit the LtR non-interleaving property
        // to assert that the inserted values are contiguous.
        this.emit("Insert", {
          index: startIndex,
          values,
          positions,
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
          : meta.senderID;
        const counter = int64AsNumber(decoded.delete!.counter);
        const valueIndex = decoded.delete!.valueIndex;
        const pos: ListPosition = [sender, counter, valueIndex];
        const deletedValues = this.positionSource.delete(pos);
        if (deletedValues !== null) {
          const startIndex = this.positionSource.indexOfPosition(pos);
          this.emit("Delete", {
            index: startIndex,
            values: deletedValues,
            positions: [JSON.stringify(pos)],
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

  getPosition(index: number): string {
    const pos = this.positionSource.getPosition(index);
    return JSON.stringify(pos);
  }

  indexOfPosition(
    position: string,
    searchDir: "none" | "left" | "right" = "none"
  ): number {
    const pos = <ListPosition>JSON.parse(position);
    return this.positionSource.indexOfPosition(pos, searchDir);
  }

  // OPT: override hasPosition, getByPosition.

  *entries(): IterableIterator<[index: number, position: string, value: T]> {
    let i = 0;
    for (const [pos, length, item] of this.positionSource.itemsAndPositions()) {
      for (let j = 0; j < length; j++) {
        yield [i, JSON.stringify(pos), item[j]];
        pos[2]++;
        i++;
      }
    }
  }

  savePrimitive(): Uint8Array {
    const imessage: ICValueListSave = {
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
    const message = CValueListSave.create(imessage);
    return CValueListSave.encode(message).finish();
  }

  loadPrimitive(savedState: Uint8Array): void {
    const decoded = CValueListSave.decode(savedState);
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

  // OPT: canGC if not yet mutated.

  // // For debugging positionSource.
  // printTreeWalk() {
  //   this.positionSource.printTreeWalk();
  // }
}

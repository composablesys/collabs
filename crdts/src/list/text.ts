import {
  InitToken,
  Message,
  MessageMeta,
  int64AsNumber,
  Optional,
  CPrimitive,
  CollabEvent,
  CollabEventsRecord,
  PositionedList,
} from "@collabs/core";
import { CTextMessage, CTextSave } from "../../generated/proto_compiled";
import {
  ListPosition,
  ListPositionSource,
  StringListItemManager,
} from "./list_position_source";

export interface CTextInsertEvent extends CollabEvent {
  startIndex: number;
  count: number;
}

export interface CTextDeleteEvent extends CollabEvent {
  startIndex: number;
  count: number;
  deletedValues: string;
}

export interface CTextEventsRecord extends CollabEventsRecord {
  Insert: CTextInsertEvent;
  Delete: CTextDeleteEvent;
}

export class CText
  extends CPrimitive<CTextEventsRecord>
  implements PositionedList
{
  private readonly positionSource: ListPositionSource<string>;
  /**
   * Used for local operations, to store the index where the operation is
   * happening, so we don't have to findPosition() twice.
   * Reset to -1 (indicating not valid) whenever we receive a remote message.
   * That implies that this is still reliable even if we don't get immediate
   * local echos, i.e., the CText is used in a non-CRDT fashion.
   */
  private indexHint = -1;

  constructor(init: InitToken) {
    super(init);

    this.positionSource = new ListPositionSource(
      this.runtime.replicaID,
      StringListItemManager.instance
    );
  }

  // OPT: optimize bulk methods.

  insert(index: number, values: string): void {
    if (values.length === 0) return undefined;

    this.indexHint = index;
    const prevPos =
      index === 0 ? null : this.positionSource.getPosition(index - 1);
    const [counter, startValueIndex, metadata] =
      this.positionSource.createPositions(prevPos);

    const message = CTextMessage.create({
      insert: {
        counter,
        startValueIndex,
        metadata,
        values,
      },
    });
    this.sendPrimitive(CTextMessage.encode(message).finish());
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
      const message = CTextMessage.create({
        delete: {
          sender: pos[0] === this.runtime.replicaID ? null : pos[0],
          counter: pos[1],
          valueIndex: pos[2],
        },
      });
      this.sendPrimitive(CTextMessage.encode(message).finish());
    }
  }

  clear(): void {
    this.delete(0, this.length);
  }

  protected receivePrimitive(message: Message, meta: MessageMeta): void {
    if (!meta.isLocalEcho) this.indexHint = -1;

    const decoded = CTextMessage.decode(<Uint8Array>message);
    switch (decoded.op) {
      case "insert": {
        const counter = int64AsNumber(decoded.insert!.counter);
        const startValueIndex = decoded.insert!.startValueIndex;
        const values = decoded.insert!.values;
        const metadata = Object.prototype.hasOwnProperty.call(
          decoded.insert!,
          "metadata"
        )
          ? decoded.insert!.metadata!
          : null;

        const pos: ListPosition = [meta.sender, counter, startValueIndex];
        this.positionSource.receiveAndAddPositions(pos, values, metadata);

        const startIndex =
          this.indexHint !== -1
            ? this.indexHint
            : this.positionSource.findPosition(pos)[0];
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
              : this.positionSource.findPosition(pos)[0];
          this.emit("Delete", {
            startIndex,
            count: 1,
            deletedValues: deletedValues.charAt(0),
            meta,
          });
        }
        break;
      }
      default:
        throw new Error(`Unrecognized decoded.op: ${decoded.op}`);
    }
  }

  charAt(index: number): string {
    const [item, offset] = this.positionSource.getItem(index);
    return item[offset];
  }

  *values(): IterableIterator<string> {
    for (const item of this.positionSource.items()) {
      yield* item;
    }
  }

  [Symbol.iterator]() {
    return this.values();
  }

  // OPT: items() version of iterator? Likewise for PrimitiveCList?

  get length(): number {
    return this.positionSource.length;
  }

  toString(): string {
    let ans = "";
    for (const item of this.positionSource.items()) {
      ans += item;
    }
    return ans;
  }

  getPosition(index: number): string {
    const pos = this.positionSource.getPosition(index);
    return JSON.stringify(pos);
  }

  findPosition(position: string): [geIndex: number, isPresent: boolean] {
    const pos = <ListPosition>JSON.parse(position);
    return this.positionSource.findPosition(pos);
  }

  save(): Uint8Array {
    const message = CTextSave.create({
      positionSourceSave: this.positionSource.save(),
      valuesSave: this.toString(),
    });
    return CTextSave.encode(message).finish();
  }

  load(saveData: Optional<Uint8Array>): void {
    if (saveData.isPresent) {
      const decoded = CTextSave.decode(saveData.get());
      const values = decoded.valuesSave;
      let index = 0;
      this.positionSource.load(decoded.positionSourceSave, (count) => {
        const ans = values.slice(index, index + count);
        index += count;
        return ans;
      });
    }
  }

  canGC(): boolean {
    // OPT: return true if not yet mutated
    return false;
  }

  // // For debugging ListPositionSource.
  // printTreeWalk() {
  //   this.positionSource.printTreeWalk();
  // }
}

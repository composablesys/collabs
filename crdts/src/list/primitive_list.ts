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
import { Position, PositionSource } from "./position_source";

export class PrimitiveCList<T>
  extends AbstractCListCPrimitive<T, [T]>
  implements LocatableCList<T>
{
  private readonly positionSource: PositionSource;
  private readonly _values: Map<string, T[][]>;

  constructor(
    initToken: InitToken,
    protected readonly valueSerializer: Serializer<T> = DefaultSerializer.getInstance(),
    protected readonly valueArraySerializer:
      | Serializer<T[]>
      | undefined = undefined
  ) {
    super(initToken);

    this.positionSource = new PositionSource(this.runtime.replicaID);
    this._values = new Map();
    this._values.set("", []);
  }

  // TODO: optimize bulk methods.

  insert(index: number, value: T): T;
  insert(index: number, ...values: T[]): T | undefined;
  insert(index: number, ...values: T[]): T | undefined {
    if (values.length === 0) return undefined;

    const prevPos = index === 0 ? null : this.positionSource.get(index - 1);
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

    // TODO: native range deletes? E.g. compress waypoint valueIndex ranges.
    // TODO: optimize range iteration (back to front).
    // Delete from back to front, so indices make sense.
    for (let i = startIndex + count - 1; i >= startIndex; i--) {
      const pos = this.positionSource.get(i);
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
    // TODO: events
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

        const pos: Position = [meta.sender, counter, startValueIndex];
        this.positionSource.receiveAndAddPositions(
          pos,
          values.length,
          metadata
        );

        const bySender = this._values.get(meta.sender);
        if (bySender === undefined) {
          this._values.set(meta.sender, [values]);
        } else if (counter === bySender.length) {
          bySender.push(values);
        } else {
          bySender[counter].push(...values);
        }

        // Here we exploit the LtR non-interleaving property
        // to assert that the inserted values are contiguous.
        this.emit("Insert", {
          startIndex: this.positionSource.find(pos)[0],
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
        const pos: Position = [sender, counter, valueIndex];
        if (this.positionSource.delete(pos)) {
          const byCounter = this._values.get(sender)![counter];
          const deletedValues = [byCounter[valueIndex]];
          delete byCounter[valueIndex];

          this.emit("Delete", {
            startIndex: this.positionSource.find(pos)[0],
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
    const pos = this.positionSource.get(index);
    return this._values.get(pos[0])![pos[1]][pos[2]];
  }

  *values(): IterableIterator<T> {
    // TODO: use positionsOpt.
    for (const pos of this.positionSource.positions()) {
      yield this._values.get(pos[0])![pos[1]][pos[2]];
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
    } else return super.slice(start, end);
  }

  getLocation(index: number): string {
    const pos = this.positionSource.get(index);
    // TODO: shorter encoding? Also in locationEntries().
    return JSON.stringify(pos);
  }

  findLocation(location: string): FoundLocation {
    const pos = <Position>JSON.parse(location);
    return new FoundLocation(...this.positionSource.find(pos));
  }

  *locationEntries(): IterableIterator<[string, T]> {
    // TODO: use positionsOpt.
    for (const pos of this.positionSource.positions()) {
      yield [JSON.stringify(pos), this._values.get(pos[0])![pos[1]][pos[2]]];
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
      this.positionSource.load(decoded.positionSourceSave);
      let values: T[];
      if (this.valueArraySerializer !== undefined) {
        values = this.valueArraySerializer.deserialize(decoded.valuesArraySave);
      } else {
        values = decoded.valuesSave.map((value) =>
          this.valueSerializer.deserialize(value)
        );
      }

      // Fill values into this._values according to positionSource.
      let i = 0;
      for (const pos of this.positionSource.positions()) {
        let bySender = this._values.get(pos[0]);
        if (bySender === undefined) {
          bySender = new Array(this.positionSource.countersFor(pos[0]));
          this._values.set(pos[0], bySender);
        }
        let byCounter = bySender[pos[1]];
        if (byCounter === undefined) {
          byCounter = [];
          bySender[pos[1]] = byCounter;
        }
        byCounter[pos[2]] = values[i];
        i++;
      }
    }
  }

  canGC(): boolean {
    // TODO: return true if not yet mutated
    return false;
  }

  // TODO: remove
  printTreeWalk() {
    this.positionSource.printTreeWalk();
  }
}

import {
  IPrimitiveCListDeleteRangeMessage,
  IPrimitiveCListInsertMessage,
  IPrimitiveCListSave,
  PrimitiveCListInsertMessage,
  PrimitiveCListMessage,
  PrimitiveCListSave,
} from "../../../generated/proto_compiled";
import { DefaultElementSerializer, ElementSerializer } from "../../util";
import { CausalTimestamp, CrdtInitToken } from "../../core";
import { AbstractCListPrimitiveCrdt } from "./abstract_list";
import { DenseLocalList } from "./dense_local_list";
import {
  TreedocDenseLocalList,
  TreedocLocWrapper,
} from "./treedoc_dense_local_list";
import { Resettable } from "../../abilities";

// TODO: document, test.
// Note this is not a CRDT
// TODO: way to share with others (e.g., putting seqId
// in a LwwRegister).  Could make this a CRDT for that,
// but not desired if it's not going to be replicated.
export interface Cursor {
  index: number;
}

export class PrimitiveCListFromDenseLocalList<
  T,
  L extends object,
  DenseT extends DenseLocalList<L, T>
> extends AbstractCListPrimitiveCrdt<T, [T]> {
  // TODO: make senderCounters optional?  (Only needed
  // if you will do deleteRange, and take up space.)
  // TODO: use uniqueNumbers (from ids) instead of
  // senderCounters?  (Send maximum abs value of a uniqueNumber
  // present in the deleted range for each user; compare
  // to those instead of senderCounters in deleteRange;
  // get rid of this map).  Would reduce memory by 4MB,
  // save size by 200-300KB, save & load time, and
  // need for causality, at the expense of larger
  // deleteRange messages (since we are not piggy-backing
  // on the CausalTimestamp), especially in bulk messages.
  // TODO: try putting this in the values instead of its
  // own map.
  /**
   * keys are precisely the locs in the list.
   */
  protected readonly senderCounters = new Map<L, number>();

  /**
   * @param denseLocalList                   [description]
   * @param valueSerializer [description]
   * @param valueArraySerializer (optional) optimized
   * serializer for arrays of values during range ops.
   * If undefined, then valueSerializer is used on each
   * value instead.
   */
  constructor(
    initToken: CrdtInitToken,
    protected readonly denseLocalList: DenseT,
    protected readonly valueSerializer: ElementSerializer<T> = DefaultElementSerializer.getInstance(),
    protected readonly valueArraySerializer:
      | ElementSerializer<T[]>
      | undefined = undefined
  ) {
    super(initToken);
  }

  /**
   * At least one value must be provided.  (TODO: we
   * could mandate this with types by having an extra
   * value param first, but then you can't use ...
   * to input the values.)
   * @return the first value
   * @param  index          [description]
   * @param  value          [description]
   * @param  ...extraValues [description]
   * @return                [description]
   */
  insert(index: number, ...values: T[]): T {
    if (values.length === 0) {
      throw new Error("At least one value must be provided");
    }

    const locMessage = this.denseLocalList.prepareNewLocs(index, values.length);
    const imessage: IPrimitiveCListInsertMessage = { locMessage };
    if (values.length === 1) {
      imessage.value = this.valueSerializer.serialize(values[0]);
    } else if (this.valueArraySerializer !== undefined) {
      imessage.values = this.valueArraySerializer.serialize(values);
    } else {
      imessage.valuesArray = {
        values: values.map((oneValue) =>
          this.valueSerializer.serialize(oneValue)
        ),
      };
    }
    const message = PrimitiveCListMessage.create({ insert: imessage });
    this.send(PrimitiveCListMessage.encode(message).finish());
    return values[0];
  }

  // Override alias insert methods so we can accept
  // bulk values.
  /**
   * [push description]
   *
   * At least one value must be provided.
   *
   * @param  value          [description]
   * @param  ...extraValues [description]
   * @return the first value
   */
  push(...values: T[]): T {
    return this.insert(this.length, ...values);
  }

  /**
   * [push description]
   *
   * At least one value must be provided.
   *
   * @param  value          [description]
   * @param  ...extraValues [description]
   * @return the first value
   */
  unshift(...values: T[]): T {
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

  /**
   * Note: event will show as varying bulk deletes,
   * since the deleted values may not be contiguous anymore
   * on other replicas.
   *
   * @param index   [description]
   * @param count=1 [description]
   */
  delete(startIndex: number, count = 1): void {
    if (count < 0 || !Number.isInteger(count)) {
      throw new Error("invalid count: " + count);
    }
    if (count === 0) return;
    if (count === 1) {
      const id = this.denseLocalList.idOf(
        this.denseLocalList.getLoc(startIndex)
      );
      const message = PrimitiveCListMessage.create({
        delete: {
          sender: id[0],
          uniqueNumber: id[1],
        },
      });
      this.send(PrimitiveCListMessage.encode(message).finish());
    } else {
      const imessage: IPrimitiveCListDeleteRangeMessage = {};
      if (startIndex !== 0) {
        imessage.startLoc = this.denseLocalList.serialize(
          this.denseLocalList.getLoc(startIndex)
        );
      }
      if (startIndex + count !== this.length) {
        imessage.endLoc = this.denseLocalList.serialize(
          this.denseLocalList.getLoc(startIndex + count - 1)
        );
      }
      const message = PrimitiveCListMessage.create({
        deleteRange: imessage,
      });
      this.send(PrimitiveCListMessage.encode(message).finish());
    }
  }

  clear() {
    const message = PrimitiveCListMessage.create({ deleteRange: {} });
    this.send(PrimitiveCListMessage.encode(message).finish());
  }

  protected receivePrimitive(
    timestamp: CausalTimestamp,
    message: Uint8Array
  ): void {
    const decoded = PrimitiveCListMessage.decode(message);
    switch (decoded.op) {
      case "insert":
        const insert = PrimitiveCListInsertMessage.create(decoded.insert!);
        let values: T[];
        switch (insert.type) {
          case "value":
            values = [
              this.valueSerializer.deserialize(insert.value, this.runtime),
            ];
            break;
          case "values":
            values = this.valueArraySerializer!.deserialize(
              insert.values,
              this.runtime
            );
            break;
          case "valuesArray":
            values = insert.valuesArray!.values!.map((oneValue) =>
              this.valueSerializer.deserialize(oneValue, this.runtime)
            );
            break;
          default:
            throw new Error("Unrecognized insert.type: " + insert.type);
        }
        const [index, locs] = this.denseLocalList.receiveNewLocs(
          insert.locMessage,
          timestamp,
          values
        );
        // Store senderCounters.
        for (const loc of locs) {
          this.senderCounters.set(loc, timestamp.getSenderCounter());
        }
        // Event
        this.emit("Insert", {
          startIndex: index,
          count: values.length,
          timestamp,
        });
        break;
      case "delete": {
        // Single delete, using id.
        const toDelete = this.denseLocalList.getLocById(
          decoded.delete!.sender,
          decoded.delete!.uniqueNumber
        );
        if (toDelete !== undefined) {
          const ret = this.denseLocalList.delete(toDelete)!;
          // Delete from senderCounters.
          this.senderCounters.delete(toDelete);
          // Event
          this.emit("Delete", {
            startIndex: ret[0],
            count: 1,
            deletedValues: [ret[1]],
            timestamp,
          });
        } // Else already deleted
        break;
      }
      case "deleteRange": {
        // Range delete, using start & end locs
        // TODO: use internal iterator instead (O(1) instead
        // of O(log n) to get next).  Perhaps expose slice
        // or forEach functionality on partial ranges.
        // Can also optimize by giving the startLoc instead
        // of startIndex.  Also, can use RBTree's iter.remove
        // method to remove elements without doing an
        // extra O(log n) remove each (which is most of
        // the current cost).
        const startIndex = decoded.deleteRange!.hasOwnProperty("startLoc")
          ? this.denseLocalList.rightIndex(
              this.denseLocalList.deserialize(
                decoded.deleteRange!.startLoc!,
                this.runtime
              )
            )
          : 0;
        // TODO: leftIndex name is improper
        const endIndex = decoded.deleteRange!.hasOwnProperty("endLoc")
          ? this.denseLocalList.leftIndex(
              this.denseLocalList.deserialize(
                decoded.deleteRange!.endLoc!,
                this.runtime
              )
            ) - 1
          : this.length - 1;

        const vc = timestamp.asVectorClock();
        const toDelete: L[] = [];
        for (let i = startIndex; i <= endIndex; i++) {
          const loc = this.denseLocalList.getLoc(i);
          // Check causality
          const vcEntry = vc.get(this.denseLocalList.idOf(loc)[0]);
          if (
            vcEntry !== undefined &&
            vcEntry >= this.senderCounters.get(loc)!
          ) {
            // Store for later instead of deleting
            // immediately, so that indices don't move on
            // us unexpectedly.
            toDelete.push(loc);
          }
        }
        // Delete in reverse order, so that indices
        // are valid both before and at the time of
        // deletion.  This isn't necessary but may
        // avoid confusion.
        for (let i = toDelete.length - 1; i >= 0; i--) {
          const ret = this.denseLocalList.delete(toDelete[i])!;
          // Delete from senderCounters.
          this.senderCounters.delete(toDelete[i]);
          // Event
          // TODO: bulk events, for efficiency.
          // Also can we make that work with string?
          // (Use array | string for deletedValues?)
          this.emit("Delete", {
            startIndex: ret[0],
            count: 1,
            deletedValues: [ret[1]],
            timestamp,
          });
        }
        break;
      }
      default:
        throw new Error("Unrecognized decoded.op: " + decoded.op);
    }
  }

  get(index: number): T {
    return this.denseLocalList.get(index);
  }

  values(): IterableIterator<T> {
    return this.denseLocalList.values();
  }

  get length(): number {
    return this.denseLocalList.length;
  }

  slice(start?: number, end?: number): T[] {
    // Optimize common case (slice())
    if (start === undefined && end === undefined) {
      return this.denseLocalList.valuesArray();
    } else return super.slice(start, end);
  }

  canGc(): boolean {
    return this.denseLocalList.canGc();
  }

  protected savePrimitive(): Uint8Array {
    const senderCountersSave = new Array<number>(this.denseLocalList.length);
    let i = 0;
    this.denseLocalList.forEach((loc) => {
      senderCountersSave[i] = this.senderCounters.get(loc)!;
      i++;
    });
    const imessage: IPrimitiveCListSave = {
      locs: this.denseLocalList.saveLocs(),
      senderCounters: senderCountersSave,
    };
    if (this.valueArraySerializer !== undefined) {
      imessage.values = this.valueArraySerializer.serialize(
        this.denseLocalList.valuesArray()
      );
    } else {
      imessage.valuesArray = {
        values: this.denseLocalList
          .valuesArray()
          .map((oneValue) => this.valueSerializer.serialize(oneValue)),
      };
    }
    const message = PrimitiveCListSave.create(imessage);
    return PrimitiveCListSave.encode(message).finish();
  }

  protected loadPrimitive(saveData: Uint8Array): void {
    const decoded = PrimitiveCListSave.decode(saveData);
    if (this.valueArraySerializer !== undefined) {
      const values = this.valueArraySerializer.deserialize(
        decoded.values,
        this.runtime
      );
      this.denseLocalList.loadLocs(decoded.locs, (index) => values[index]);
    } else {
      this.denseLocalList.loadLocs(decoded.locs, (index) =>
        this.valueSerializer.deserialize(
          decoded.valuesArray!.values![index],
          this.runtime
        )
      );
    }
    // Load this.senderCounters.
    let i = 0;
    this.denseLocalList.forEach((loc) => {
      this.senderCounters.set(loc, decoded.senderCounters[i]);
      i++;
    });
    // for (const loc of this.denseLocalList.locs()) {
    //   const id = this.denseLocalList.idOf(loc);
    //   let senderLocsById = this.locsById.get(id[0]);
    //   if (senderLocsById === undefined) {
    //     senderLocsById = new Map();
    //     this.locsById.set(id[0], senderLocsById);
    //   }
    //   senderLocsById.set(id[1], loc);
    //   this.senderCounters.set(loc, decoded.senderCounters[i]);
    //   i++;
    // }
  }

  newCursor(startIndex: number, binding: "left" | "right" = "left"): Cursor {
    const outerThis = this;
    let loc: L | null = null;
    const cursor = {
      set index(index: number) {
        if (binding === "left") {
          if (index === 0) loc = null;
          else loc = outerThis.denseLocalList.getLoc(index - 1);
        } else {
          if (index === outerThis.length) loc = null;
          else loc = outerThis.denseLocalList.getLoc(index);
        }
      },

      get index(): number {
        if (binding === "left") {
          if (loc === null) return 0;
          else return outerThis.denseLocalList.leftIndex(loc);
        } else {
          if (loc === null) return outerThis.length;
          else return outerThis.denseLocalList.rightIndex(loc);
        }
      },
    };
    cursor.index = startIndex;
    return cursor;
  }
}

export class PrimitiveCList<T>
  extends PrimitiveCListFromDenseLocalList<
    T,
    TreedocLocWrapper,
    TreedocDenseLocalList<T>
  >
  implements Resettable
{
  constructor(
    initToken: CrdtInitToken,
    valueSerializer: ElementSerializer<T> = DefaultElementSerializer.getInstance(),
    valueArraySerializer: ElementSerializer<T[]> | undefined = undefined
  ) {
    super(
      initToken,
      new TreedocDenseLocalList(initToken.parent.runtime),
      valueSerializer,
      valueArraySerializer
    );
  }

  reset() {
    // Since TreedocDenseLocalList has no tombstones,
    // clear is an observed-reset.
    this.clear();
  }
}

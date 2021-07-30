import {
  IPrimitiveCListInsertMessage,
  IPrimitiveCListSave,
  PrimitiveCListInsertMessage,
  PrimitiveCListMessage,
  PrimitiveCListSave,
} from "../../../generated/proto_compiled";
import { CausalTimestamp } from "../../net";
import { DefaultElementSerializer, ElementSerializer } from "../../util";
import { CrdtParent } from "../core";
import { Resettable } from "../helper_crdts";
import { AbstractCListPrimitiveCrdt } from "./abstract_list";
import { DenseLocalList } from "./dense_local_list";
import {
  TreedocDenseLocalList,
  TreedocLocWrapper,
} from "./treedoc_dense_local_list";

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
  L,
  DenseT extends DenseLocalList<L, T>
> extends AbstractCListPrimitiveCrdt<DenseT, T, [T]> {
  /**
   * Maps from ids to locs.  Used for single-element
   * deletions.
   */
  private readonly locsById: Map<string, Map<number, L>> = new Map();

  /**
   * @param denseLocalList                   [description]
   * @param valueSerializer [description]
   * @param valueArraySerializer (optional) optimized
   * serializer for arrays of values during range ops.
   * If undefined, then valueSerializer is used on each
   * value instead.
   */
  constructor(
    denseLocalList: DenseT,
    protected readonly valueSerializer: ElementSerializer<T> = DefaultElementSerializer.getInstance(),
    protected readonly valueArraySerializer:
      | ElementSerializer<T[]>
      | undefined = undefined
  ) {
    super(denseLocalList);
  }

  init(name: string, parent: CrdtParent) {
    super.init(name, parent);
    this.state.setRuntime(this.runtime);
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

    const locMessage = this.state.prepareNewLocs(index, values.length);
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
      const id = this.state.idOf(this.state.getLoc(startIndex));
      const message = PrimitiveCListMessage.create({
        delete: {
          sender: id[0],
          uniqueNumber: id[1],
        },
      });
      this.send(PrimitiveCListMessage.encode(message).finish());
    } else {
      const message = PrimitiveCListMessage.create({
        deleteRange: {
          startLoc: this.state.serialize(this.state.getLoc(startIndex)),
          endLoc: this.state.serialize(
            this.state.getLoc(startIndex + count - 1)
          ),
        },
      });
      this.send(PrimitiveCListMessage.encode(message).finish());
    }
  }

  clear() {
    this.delete(0, this.length);
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
        const [index, locs] = this.state.receiveNewLocs(
          insert.locMessage,
          timestamp,
          values
        );
        // Cache locs by id.
        let senderLocsById = this.locsById.get(timestamp.getSender());
        if (senderLocsById === undefined) {
          senderLocsById = new Map();
          this.locsById.set(timestamp.getSender(), senderLocsById);
        }
        for (const loc of locs) {
          if (this.state.idOf(loc)[0] !== timestamp.getSender()) {
            throw new Error("Bad sender id");
          }
          senderLocsById.set(this.state.idOf(loc)[1], loc);
        }
        // Event
        this.emit("Insert", {
          startIndex: index,
          count: values.length,
          timestamp,
        });
        break;
      case "delete":
        // Single delete, using id.
        const toDelete = this.locsById
          .get(decoded.delete!.sender)
          ?.get(decoded.delete!.uniqueNumber);
        if (toDelete !== undefined) {
          const ret = this.state.delete(toDelete);
          // Update locsById.
          this.locsById
            .get(decoded.delete!.sender)!
            .delete(decoded.delete!.uniqueNumber);
          // Event
          this.emit("Delete", {
            startIndex: ret![0],
            count: 1,
            deletedValues: [ret![1]],
            timestamp,
          });
        } // Else already deleted
        break;
      case "deleteRange":
        // Range delete, using start & end locs
        const startLoc = this.state.deserialize(
          decoded.deleteRange!.startLoc,
          this.runtime
        );
        const endLoc = this.state.deserialize(
          decoded.deleteRange!.endLoc!,
          this.runtime
        );
        this.state.deleteRange(
          startLoc,
          endLoc,
          timestamp,
          (startIndex, deletedLocs, deletedValues) => {
            // Update locsById.
            for (const deletedLoc of deletedLocs) {
              // deletedLoc must still exist.
              const id = this.state.idOf(deletedLoc);
              this.locsById.get(id[0])!.delete(id[1]);
            }
            // Event
            this.emit("Delete", {
              startIndex,
              count: deletedLocs.length,
              deletedValues,
              timestamp,
            });
          }
        );
        break;
      default:
        throw new Error("Unrecognized decoded.op: " + decoded.op);
    }
  }

  get(index: number): T {
    return this.state.get(index);
  }

  values(): IterableIterator<T> {
    return this.state.values();
  }

  get length(): number {
    return this.state.length;
  }

  slice(start?: number, end?: number): T[] {
    // Optimize common case (slice())
    if (start === undefined && end === undefined) {
      return this.state.valuesArray();
    } else return super.slice(start, end);
  }

  canGc(): boolean {
    return this.state.canGc();
  }

  protected savePrimitive(): Uint8Array {
    const imessage: IPrimitiveCListSave = { locs: this.state.saveLocs() };
    if (this.valueArraySerializer !== undefined) {
      imessage.values = this.valueArraySerializer.serialize(
        this.state.valuesArray()
      );
    } else {
      imessage.valuesArray = {
        values: this.state
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
      this.state.loadLocs(decoded.locs, (index) => values[index]);
    } else {
      this.state.loadLocs(decoded.locs, (index) =>
        this.valueSerializer.deserialize(
          decoded.valuesArray!.values![index],
          this.runtime
        )
      );
    }
    // Load this.locsById.
    for (const loc of this.state.locs()) {
      const id = this.state.idOf(loc);
      let senderLocsById = this.locsById.get(id[0]);
      if (senderLocsById === undefined) {
        senderLocsById = new Map();
        this.locsById.set(id[0], senderLocsById);
      }
      senderLocsById.set(id[1], loc);
    }
  }

  newCursor(startIndex: number, binding: "left" | "right" = "left"): Cursor {
    const outerThis = this;
    let loc: L | null = null;
    const cursor = {
      set index(index: number) {
        if (binding === "left") {
          if (index === 0) loc = null;
          else loc = outerThis.state.getLoc(index - 1);
        } else {
          if (index === outerThis.length) loc = null;
          else loc = outerThis.state.getLoc(index);
        }
      },

      get index(): number {
        if (binding === "left") {
          if (loc === null) return 0;
          else return outerThis.state.leftIndex(loc);
        } else {
          if (loc === null) return outerThis.length;
          else return outerThis.state.rightIndex(loc);
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
    valueSerializer: ElementSerializer<T> = DefaultElementSerializer.getInstance(),
    valueArraySerializer: ElementSerializer<T[]> | undefined = undefined
  ) {
    super(new TreedocDenseLocalList(), valueSerializer, valueArraySerializer);
  }

  reset() {
    // Since TreedocDenseLocalList has no tombstones,
    // clear is an observed-reset.
    this.clear();
  }
}

import {
  IPrimitiveCListDeleteMessage,
  IPrimitiveCListInsertMessage,
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

// TODO: specialize to default DenseLocalList.
// Perhaps default I, and have a default constructor param
// with unsafe typing?
export class PrimitiveCList<T, I = TreedocLoc>
  extends AbstractCListPrimitiveCrdt<DenseLocalList<I, T>, T, [T]>
  implements Resettable
{
  constructor(
    private readonly valueSerializer: ElementSerializer<T> = DefaultElementSerializer.getInstance(),
    private readonly valueArraySerializer: ElementSerializer<
      T[]
    > = DefaultElementSerializer.getInstance(),
    denseLocalList: DenseLocalList<I, T> = new TreedocDenseLocalList()
  ) {
    super(denseLocalList);
  }

  init(name: string, parent: CrdtParent) {
    super.init(name, parent);
    this.state.setRuntime(this.runtime);
  }

  // TODO: bounds checking.  Or should that be part of
  // DenseLocalList?

  /**
   * @return the first value
   * @param  index          [description]
   * @param  value          [description]
   * @param  ...extraValues [description]
   * @return                [description]
   */
  insert(index: number, value: T, ...extraValues: T[]): T {
    const locMessage = this.state.prepareNewLocs(index, 1 + extraValues.length);
    const imessage: IPrimitiveCListInsertMessage = { locMessage };
    if (extraValues.length === 0) {
      imessage.value = this.valueSerializer.serialize(value);
    } else {
      imessage.values = this.valueArraySerializer.serialize([
        value,
        ...extraValues,
      ]);
    }
    const message = PrimitiveCListMessage.create({ insert: imessage });
    this.send(PrimitiveCListMessage.encode(message).finish());
    return value;
  }

  delete(index: number, count = 1): void {
    if (count < 1) throw new Error("count < 1");
    const imessage: IPrimitiveCListDeleteMessage = {
      startLoc: this.state.serialize(this.state.getLoc(index)),
    };
    if (count > 1) {
      imessage.endLoc = this.state.serialize(
        this.state.getLoc(index + count - 1)
      );
    }
    const message = PrimitiveCListMessage.create({ delete: imessage });
    this.send(PrimitiveCListMessage.encode(message).finish());
  }

  reset() {
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
            values = this.valueArraySerializer.deserialize(
              insert.values,
              this.runtime
            );
            break;
          default:
            throw new Error("Unrecognized insert.type: " + insert.type);
        }
        const index = this.state.receiveNewLocs(
          insert.locMessage,
          timestamp,
          values
        );
        // TODO: need to do a single bulk event, since
        // otherwise the state will be ahead
        for (let i = 0; i < values.length; i++) {
          this.emit("Insert", {
            index: index + 1,
            timestamp,
          });
        }
        break;
      case "delete":
        const startLoc = this.state.deserialize(
          decoded.delete!.startLoc,
          this.runtime
        );
        if (decoded.delete!.hasOwnProperty("endLoc")) {
          // Range delete
          const endLoc = this.state.deserialize(
            decoded.delete!.endLoc!,
            this.runtime
          );
          this.state.deleteRange(startLoc, endLoc, timestamp, (index) => {
            this.emit("Delete", { index, timestamp });
          });
        } else {
          // Single delete
          const ret = this.state.delete(startLoc);
          if (ret !== undefined) {
            this.emit("Delete", {
              timestamp,
              index: ret[0],
            });
          }
        }
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

  // TODO: overrides for optimization (e.g. slice)
  // TODO: bulk methods (e.g. push) - should be able to
  // override method, since interface is technically
  // compatible.

  canGc(): boolean {
    return this.state.canGc();
  }

  protected savePrimitive(): Uint8Array {
    const message = PrimitiveCListSave.create({
      locs: this.state.saveLocs(),
      values: this.valueArraySerializer.serialize(this.state.valuesArray()),
    });
    return PrimitiveCListSave.encode(message).finish();
  }

  protected loadPrimitive(saveData: Uint8Array): void {
    const decoded = PrimitiveCListSave.decode(saveData);
    const values = this.valueArraySerializer.deserialize(
      decoded.values,
      this.runtime
    );
    this.state.loadLocs(decoded.locs, (index) => values[index]);
  }
}

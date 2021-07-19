import {
  GrowOnlyCCounterMessage,
  GrowOnlyCCounterSave,
  IGrowOnlyCCounterResetEntry,
  IGrowOnlyCCounterSaveEntry,
} from "../../../generated/proto_compiled";
import { CausalTimestamp } from "../../net";
import { CompositeCrdt, CrdtEvent, PrimitiveCrdt } from "../core";
import { ResettableEventsRecord } from "../helper_crdts";

export interface CCounterEvent extends CrdtEvent {
  readonly added: number;
}

export interface CCounterEventsRecord extends ResettableEventsRecord {
  Add: CCounterEvent;
}

class GrowOnlyCCounterState {
  // M entry format: [p, n, idCounter]
  M = new Map<string, [number, number, number]>();
}

export class GrowOnlyCCounter extends PrimitiveCrdt<
  GrowOnlyCCounterState,
  CCounterEventsRecord
> {
  constructor() {
    super(new GrowOnlyCCounterState());
  }

  add(toAdd: number) {
    if (toAdd === 0) return;
    if (toAdd < 0) {
      throw new Error(
        "toAdd = " +
          toAdd +
          "; must be nonnegative (consider using CCounter instead)"
      );
    }
    if (!Number.isInteger(toAdd)) {
      // TODO: restrict range?  E.g. do sums modulo the max
      // safe int (or that over 2), or use bigints.  Otherwise
      // might not be commutative.
      throw new Error("toAdd = " + toAdd + "; must be an integer");
    }

    const m = this.state.M.get(this.runtime.replicaId);
    const idCounter =
      m === undefined ? this.runtime.getReplicaUniqueNumber() : m[2];
    const prOld = m === undefined ? 0 : m[0];
    let message = GrowOnlyCCounterMessage.create({
      add: {
        prOld,
        toAdd,
        idCounter,
      },
    });
    super.send(GrowOnlyCCounterMessage.encode(message).finish());
  }

  inc() {
    this.add(1);
  }

  reset() {
    const V: { [id: string]: IGrowOnlyCCounterResetEntry } = {};
    for (let [replicaId, m] of this.state.M) {
      V[replicaId] = { v: m[1], idCounter: m[2] };
    }
    const message = GrowOnlyCCounterMessage.create({
      reset: { V },
    });
    super.send(GrowOnlyCCounterMessage.encode(message).finish());
  }

  protected receivePrimitive(
    timestamp: CausalTimestamp,
    message: Uint8Array
  ): void {
    let decoded = GrowOnlyCCounterMessage.decode(message);
    switch (decoded.data) {
      case "add":
        const m = this.state.M.get(timestamp.getSender());
        if (m === undefined) {
          // We are guaranteed m[2] === decoded.add!.idCounter
          this.state.M.set(timestamp.getSender(), [
            decoded.add!.prOld + decoded.add!.toAdd,
            decoded.add!.prOld,
            decoded.add!.idCounter,
          ]);
        } else {
          m[0] += decoded.add!.toAdd;
        }
        this.emit("Add", {
          added: decoded.add!.toAdd,
          timestamp,
        });
        break;
      case "reset":
        for (let vEntry of Object.entries(decoded.reset!.V!)) {
          const m = this.state.M.get(vEntry[0]);
          if (m !== undefined && m[2] === vEntry[1].idCounter) {
            m[1] = Math.max(m[1], vEntry[1].v);
            // TODO: 0 vs -0 issue?
            if (m[0] === m[1]) {
              this.state.M.delete(vEntry[0]);
            }
          }
        }
        this.emit("Reset", { timestamp });
        break;
      default:
        throw new Error("Unknown decoded.data: " + decoded.data);
    }
  }

  get value(): number {
    // TODO: cache value as optimization?
    // In general, compute incrementally except on reset.
    let ans = 0;
    for (let m of this.state.M.values()) ans += m[0] - m[1];
    return ans;
  }

  canGc() {
    return this.state.M.size === 0;
  }

  savePrimitive(): Uint8Array {
    const mMessage: { [replicaId: string]: IGrowOnlyCCounterSaveEntry } = {};
    for (const [replicaId, m] of this.state.M) {
      mMessage[replicaId] = {
        p: m[0],
        n: m[1],
        idCounter: m[2],
      };
    }
    const message = GrowOnlyCCounterSave.create({ M: mMessage });
    return GrowOnlyCCounterSave.encode(message).finish();
  }

  loadPrimitive(saveData: Uint8Array) {
    const message = GrowOnlyCCounterSave.decode(saveData);
    for (const [replicaId, m] of Object.entries(message.M)) {
      this.state.M.set(replicaId, [m.p, m.n, m.idCounter]);
    }
  }
}

export class CCounter extends CompositeCrdt<CCounterEventsRecord> {
  private readonly plus: GrowOnlyCCounter;
  private readonly minus: GrowOnlyCCounter;

  constructor(readonly initialValue: number = 0) {
    super();
    this.plus = this.addChild("", new GrowOnlyCCounter());
    this.minus = this.addChild("0", new GrowOnlyCCounter());
    this.plus.on("Add", (event) => this.emit("Add", event));
    this.minus.on("Add", (event) =>
      this.emit("Add", {
        added: -event.added,
        timestamp: event.timestamp,
      })
    );
    // Dispatch on minus since that is reset last.
    // TODO: that may break with generic CompositeCrdt.
    // How to dispatch reset events for CompositeCrdt in general?
    this.minus.on("Reset", (event) => this.emit("Reset", event));
  }

  add(toAdd: number) {
    if (toAdd > 0) this.plus.add(toAdd);
    else if (toAdd < 0) this.minus.add(-toAdd);
  }

  inc() {
    this.plus.inc();
  }

  dec() {
    this.minus.inc();
  }

  reset() {
    // TODO: generic CompositeCrdt reset
    this.plus.reset();
    this.minus.reset();
  }

  get value(): number {
    return this.plus.value - this.minus.value;
  }
}

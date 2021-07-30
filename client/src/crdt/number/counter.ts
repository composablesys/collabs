import {
  GrowOnlyCCounterMessage,
  GrowOnlyCCounterSave,
  IGrowOnlyCCounterResetEntry,
  IGrowOnlyCCounterSaveEntry,
} from "../../../generated/proto_compiled";
import { CausalTimestamp } from "../../net";
import {
  CompositeCrdt,
  CrdtEvent,
  CrdtEventsRecord,
  PrimitiveCrdt,
} from "../core";
import { Resettable } from "../helper_crdts";

export interface CCounterEvent extends CrdtEvent {
  readonly arg: number;
  readonly previousValue: number;
}

export interface CCounterEventsRecord extends CrdtEventsRecord {
  Add: CCounterEvent;
  /**
   * arg gives the value "added" to the state
   * as a result of the reset (e.g., -this.value, if
   * the reset affected all operations).
   */
  Reset: CCounterEvent;
}

class GrowOnlyCCounterState {
  // M entry format: [p, n, idCounter]
  M = new Map<string, [number, number, number]>();
}

export class GrowOnlyCCounter
  extends PrimitiveCrdt<GrowOnlyCCounterState, CCounterEventsRecord>
  implements Resettable
{
  /**
   * To prevent overflow into unsafe integers, whose
   * addition is not necessarily commutative (making
   * eventual consistency more difficult), all operations
   * and values are taken modulo this value.  It is
   * half of Number.MAX_SAFE_INTEGER (rounded down),
   * i.e., 2^52 - 1.
   */
  static readonly MODULUS = (Number.MAX_SAFE_INTEGER - 1) / 2;

  private valueInternal = 0;

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
      throw new Error("toAdd = " + toAdd + "; must be an integer");
    }

    toAdd %= GrowOnlyCCounter.MODULUS;

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
      V[replicaId] = { v: m[0], idCounter: m[2] };
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
    const previousValue = this.value;
    switch (decoded.data) {
      case "add":
        const m = this.state.M.get(timestamp.getSender());
        if (m === undefined) {
          this.state.M.set(timestamp.getSender(), [
            (decoded.add!.prOld + decoded.add!.toAdd) %
              GrowOnlyCCounter.MODULUS,
            decoded.add!.prOld,
            decoded.add!.idCounter,
          ]);
        } else {
          // We are guaranteed m[2] === decoded.add!.idCounter.
          m[0] = (m[0] + decoded.add!.toAdd) % GrowOnlyCCounter.MODULUS;
        }
        // Update the cached value.
        this.valueInternal =
          (this.valueInternal + decoded.add!.toAdd) % GrowOnlyCCounter.MODULUS;
        this.emit("Add", {
          arg: decoded.add!.toAdd,
          timestamp,
          previousValue,
        });
        break;
      case "reset":
        for (let vEntry of Object.entries(decoded.reset!.V!)) {
          const m = this.state.M.get(vEntry[0]);
          if (m !== undefined && m[2] === vEntry[1].idCounter) {
            m[1] = Math.max(m[1], vEntry[1].v);
            // 0 vs -0 issue should be impossible because
            // we only ever deal with >= 0 numbers, so
            // -0 shouldn't be possible.
            if (m[0] === m[1]) {
              this.state.M.delete(vEntry[0]);
            }
          }
        }
        // Update the cached value.
        this.valueInternal = 0;
        for (const m of this.state.M.values()) {
          // Since m[1] <= m[0], m[0] - m[1] is within
          // the safe range, so we don't need an extra
          // modulo for it.
          this.valueInternal =
            (this.valueInternal + m[0] - m[1]) % GrowOnlyCCounter.MODULUS;
        }

        this.emit("Reset", {
          arg: this.value - previousValue,
          timestamp,
          previousValue,
        });
        break;
      default:
        throw new Error("Unknown decoded.data: " + decoded.data);
    }
  }

  get value(): number {
    return this.valueInternal;
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

export class CCounter
  extends CompositeCrdt<CCounterEventsRecord>
  implements Resettable
{
  /**
   * To prevent overflow into unsafe integers, whose
   * addition is not necessarily commutative (making
   * eventual consistency more difficult), all operations
   * and values are taken modulo this value, separately
   * for positive and negative additions.  So the
   * range of CCounter is (-MODULUS, MODULUS), with positive
   * additions overflowing within [0, MODULUS) and negative
   * additions underflowing within (-MODULUS, 0].
   * MODULUS is
   * half of Number.MAX_SAFE_INTEGER (rounded down),
   * i.e., 2^52 - 1.
   */
  static readonly MODULUS = GrowOnlyCCounter.MODULUS;

  private readonly plus: GrowOnlyCCounter;
  private readonly minus: GrowOnlyCCounter;

  private plusResetEvent?: CCounterEvent;

  constructor() {
    super();
    this.plus = this.addChild("", new GrowOnlyCCounter());
    this.minus = this.addChild("0", new GrowOnlyCCounter());

    // Events
    this.plus.on("Add", (event) => {
      this.emit("Add", {
        arg: event.arg,
        previousValue: event.previousValue - this.minus.value,
        timestamp: event.timestamp,
      });
    });
    this.minus.on("Add", (event) => {
      this.emit("Add", {
        arg: -event.arg,
        previousValue: this.plus.value - event.previousValue,
        timestamp: event.timestamp,
      });
    });
    this.plus.on("Reset", (event) => {
      // We don't know the full arg & previousValue until after minus
      // is also reset, so we store plus's event until then.
      this.plusResetEvent = event;
    });
    this.minus.on("Reset", (event) => {
      this.emit("Reset", {
        // Subtraction without modulo is okay because each
        // value is in the range [0, MODULUS), so the
        // difference is in the safe range (-MODULUS, MODULUS).
        arg: this.plusResetEvent!.arg - event.arg,
        previousValue: this.plusResetEvent!.previousValue - event.previousValue,
        timestamp: event.timestamp,
      });
      delete this.plusResetEvent;
    });
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
    this.plus.reset();
    this.minus.reset();
  }

  get value(): number {
    // Subtraction without modulo is okay because each
    // value is in the range [0, MODULUS), so the
    // difference is in the safe range (-MODULUS, MODULUS).
    return this.plus.value - this.minus.value;
  }
}

import {
  GrowOnlyResettableCCounterMessage,
  GrowOnlyResettableCCounterSave,
  IGrowOnlyResettableCCounterResetEntry,
  IGrowOnlyResettableCCounterSaveEntry,
} from "../../../generated/proto_compiled";
import { CObject } from "../../constructions";
import {
  CollabEvent,
  CollabEventsRecord,
  InitToken,
  MessageMeta,
  Pre,
} from "../../core";
import { PrimitiveCRDT } from "../constructions";
import { int64AsNumber, Optional } from "../../util";

export interface ResettableCCounterEvent extends CollabEvent {
  readonly arg: number;
  readonly previousValue: number;
}

export interface ResettableCCounterEventsRecord extends CollabEventsRecord {
  Add: ResettableCCounterEvent;
  /**
   * arg gives the value "added" to the state
   * as a result of the reset (e.g., -this.value, if
   * the reset affected all operations).
   */
  Reset: ResettableCCounterEvent;
}

export class GrowOnlyResettableCCounter extends PrimitiveCRDT<ResettableCCounterEventsRecord> {
  /**
   * This was an attempt at fixing overflow issues that is
   * not actually sound; see https://github.com/composablesys/collabs/issues/50
   */
  static readonly MODULUS = (Number.MAX_SAFE_INTEGER - 1) / 2;

  // M entry format: [p, n, idCounter]
  private readonly M = new Map<string, [number, number, number]>();
  /**
   * The current value, cached for efficiency.
   */
  private valueInternal = 0;

  add(toAdd: number) {
    if (toAdd === 0) return;
    if (toAdd < 0) {
      throw new Error(
        `toAdd = ${toAdd}; must be nonnegative (consider using ResettableCCounter instead)`
      );
    }
    if (!Number.isInteger(toAdd)) {
      throw new Error(`toAdd = ${toAdd}; must be an integer`);
    }

    toAdd %= GrowOnlyResettableCCounter.MODULUS;

    const m = this.M.get(this.runtime.replicaID);
    const idCounter =
      m === undefined ? this.runtime.getReplicaUniqueNumber() : m[2];
    const prOld = m === undefined ? 0 : m[0];
    const message = GrowOnlyResettableCCounterMessage.create({
      add: {
        prOld,
        toAdd,
        idCounter,
      },
    });
    this.sendCRDT(GrowOnlyResettableCCounterMessage.encode(message).finish());
  }

  inc() {
    this.add(1);
  }

  reset() {
    const V: { [id: string]: IGrowOnlyResettableCCounterResetEntry } = {};
    for (const [replicaID, m] of this.M) {
      V[replicaID] = { v: m[0], idCounter: m[2] };
    }
    const message = GrowOnlyResettableCCounterMessage.create({
      reset: { V },
    });
    this.sendCRDT(GrowOnlyResettableCCounterMessage.encode(message).finish());
  }

  protected receiveCRDT(message: string | Uint8Array, meta: MessageMeta): void {
    const decoded = GrowOnlyResettableCCounterMessage.decode(
      <Uint8Array>message
    );
    const previousValue = this.value;
    switch (decoded.data) {
      case "add": {
        const m = this.M.get(meta.sender);
        if (m === undefined) {
          this.M.set(meta.sender, [
            (int64AsNumber(decoded.add!.prOld) +
              int64AsNumber(decoded.add!.toAdd)) %
              GrowOnlyResettableCCounter.MODULUS,
            int64AsNumber(decoded.add!.prOld),
            decoded.add!.idCounter,
          ]);
        } else {
          // We are guaranteed m[2] === decoded.add!.idCounter.
          m[0] =
            (m[0] + int64AsNumber(decoded.add!.toAdd)) %
            GrowOnlyResettableCCounter.MODULUS;
        }
        // Update the cached value.
        this.valueInternal =
          (this.valueInternal + int64AsNumber(decoded.add!.toAdd)) %
          GrowOnlyResettableCCounter.MODULUS;
        this.emit("Add", {
          arg: int64AsNumber(decoded.add!.toAdd),
          meta,
          previousValue,
        });
        break;
      }
      case "reset":
        for (const vEntry of Object.entries(decoded.reset!.V!)) {
          const m = this.M.get(vEntry[0]);
          if (m !== undefined && m[2] === vEntry[1].idCounter) {
            m[1] = Math.max(m[1], int64AsNumber(vEntry[1].v));
            // 0 vs -0 issue should be impossible because
            // we only ever deal with >= 0 numbers, so
            // -0 shouldn't be possible.
            if (m[0] === m[1]) {
              this.M.delete(vEntry[0]);
            }
          }
        }
        // Update the cached value.
        this.computeValue();

        this.emit("Reset", {
          arg: this.value - previousValue,
          meta,
          previousValue,
        });
        break;
      default:
        throw new Error(`Unknown decoded.data: ${decoded.data}`);
    }
  }

  /**
   * Set this.valueInternal directly from this.state.
   */
  private computeValue(): void {
    this.valueInternal = 0;
    for (const m of this.M.values()) {
      // Since m[1] <= m[0], m[0] - m[1] is within
      // the safe range, so we don't need an extra
      // modulo for it.
      this.valueInternal =
        (this.valueInternal + m[0] - m[1]) % GrowOnlyResettableCCounter.MODULUS;
    }
  }

  get value(): number {
    return this.valueInternal;
  }

  /**
   * @return this.value.toString()
   */
  toString(): string {
    return this.value.toString();
  }

  canGC() {
    return this.M.size === 0;
  }

  save(): Uint8Array {
    const mMessage: {
      [replicaID: string]: IGrowOnlyResettableCCounterSaveEntry;
    } = {};
    for (const [replicaID, m] of this.M) {
      mMessage[replicaID] = {
        p: m[0],
        n: m[1],
        idCounter: m[2],
      };
    }
    const message = GrowOnlyResettableCCounterSave.create({ M: mMessage });
    return GrowOnlyResettableCCounterSave.encode(message).finish();
  }

  load(saveData: Optional<Uint8Array>) {
    if (!saveData.isPresent) return;
    const message = GrowOnlyResettableCCounterSave.decode(saveData.get());
    for (const [replicaID, m] of Object.entries(message.M)) {
      this.M.set(replicaID, [
        int64AsNumber(m.p),
        int64AsNumber(m.n),
        m.idCounter,
      ]);
    }
    // Set the cached value.
    this.computeValue();
  }
}

// TODO: revise to use latest paper version.
/**
 * TODO: experimental.
 *
 * A counter CRDT with an "observed-reset" operation
 * [[reset]], which restores the counter to its initial
 * state by undoing all *causally* prior operations.
 *
 * Based on ["An Oblivious Observed-Reset Embeddable Replicated Counter"](https://doi.org/10.1145/3517209.3524084)
 * by Matthew Weidner and Paulo Sérgio Almeida,
 * PaPoC 2022.
 */
export class ResettableCCounter extends CObject<ResettableCCounterEventsRecord> {
  /**
   * To prevent overflow into unsafe integers, whose
   * addition is not necessarily commutative (making
   * eventual consistency more difficult), all operations
   * and values are taken modulo this value, separately
   * for positive and negative additions.  So the
   * range of ResettableCCounter is (-MODULUS, MODULUS), with positive
   * additions overflowing within [0, MODULUS) and negative
   * additions underflowing within (-MODULUS, 0].
   * MODULUS is
   * half of Number.MAX_SAFE_INTEGER (rounded down),
   * i.e., 2^52 - 1.
   */
  static readonly MODULUS = GrowOnlyResettableCCounter.MODULUS;

  private readonly plus: GrowOnlyResettableCCounter;
  private readonly minus: GrowOnlyResettableCCounter;

  private plusResetEvent?: ResettableCCounterEvent = undefined;

  constructor(initToken: InitToken) {
    super(initToken);
    this.plus = this.addChild("", Pre(GrowOnlyResettableCCounter)());
    this.minus = this.addChild("0", Pre(GrowOnlyResettableCCounter)());

    // Events
    this.plus.on("Add", (event) => {
      this.emit("Add", {
        arg: event.arg,
        previousValue: event.previousValue - this.minus.value,
        meta: event.meta,
      });
    });
    this.minus.on("Add", (event) => {
      this.emit("Add", {
        arg: -event.arg,
        previousValue: this.plus.value - event.previousValue,
        meta: event.meta,
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
        meta: event.meta,
      });
      this.plusResetEvent = undefined;
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

  /**
   * @return this.value.toString()
   */
  toString(): string {
    return this.value.toString();
  }
}

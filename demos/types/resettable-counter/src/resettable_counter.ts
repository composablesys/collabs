import {
  CObject,
  CollabEvent,
  CollabEventsRecord,
  InitToken,
  PrimitiveCRDT,
  UpdateMeta,
} from "@collabs/collabs";
import { int64AsNumber } from "@collabs/core";
import {
  GrowOnlyResettableCounterMessage,
  GrowOnlyResettableCounterSave,
  IGrowOnlyResettableCounterResetEntry,
  IGrowOnlyResettableCounterSaveEntry,
} from "../generated/proto_compiled";

export interface ResettableCounterAddEvent extends CollabEvent {
  readonly added: number;
  readonly value: number;
  readonly previousValue: number;
}

export interface ResettableCounterResetEvent extends CollabEvent {
  readonly value: number;
  readonly previousValue: number;
}

export interface ResettableCounterEventsRecord extends CollabEventsRecord {
  Add: ResettableCounterAddEvent;
  Reset: ResettableCounterResetEvent;
}

// TODO: update to latest alg (published paper)
/**
 * A grow-only counter CRDT with an "observed-reset" operation
 * [[reset]], which restores the counter to its initial
 * state by undoing all *causally* prior operations.
 *
 * Values are restricted to safe integers. More generally,
 * the sum of all additions by any one replica is restricted
 * to be a safe integer. Otherwise, results are not
 * guaranteed to be correct or eventually consistent.
 */
export class CGrowOnlyResettableCounter extends PrimitiveCRDT<ResettableCounterEventsRecord> {
  // M entry format: [p, n, idCounter]
  private readonly M = new Map<string, [number, number, number]>();
  /**
   * The current value, cached for efficiency.
   */
  private _value = 0;

  add(toAdd: number) {
    if (toAdd === 0) return;
    if (toAdd < 0) {
      throw new Error(
        `toAdd = ${toAdd}; must be nonnegative (consider using CResettableCounter instead)`
      );
    }
    if (!Number.isSafeInteger(toAdd)) {
      throw new Error(`toAdd = ${toAdd}; must be a safe integer`);
    }

    const m = this.M.get(this.runtime.replicaID);
    const idCounter = m === undefined ? this.runtime.nextLocalCounter() : m[2];
    const prOld = m === undefined ? 0 : m[0];
    const message = GrowOnlyResettableCounterMessage.create({
      add: {
        prOld,
        toAdd,
        idCounter,
      },
    });
    this.sendCRDT(GrowOnlyResettableCounterMessage.encode(message).finish());
  }

  reset() {
    const V: { [id: string]: IGrowOnlyResettableCounterResetEntry } = {};
    for (const [replicaID, m] of this.M) {
      V[replicaID] = { v: m[0], idCounter: m[2] };
    }
    const message = GrowOnlyResettableCounterMessage.create({
      reset: { V },
    });
    this.sendCRDT(GrowOnlyResettableCounterMessage.encode(message).finish());
  }

  protected receiveCRDT(message: string | Uint8Array, meta: UpdateMeta): void {
    const decoded = GrowOnlyResettableCounterMessage.decode(
      <Uint8Array>message
    );
    const previousValue = this.value;
    switch (decoded.data) {
      case "add": {
        const prOld = int64AsNumber(decoded.add!.prOld);
        const toAdd = int64AsNumber(decoded.add!.toAdd);
        const m = this.M.get(meta.senderID);
        if (m === undefined) {
          this.M.set(meta.senderID, [
            prOld + toAdd,
            prOld,
            decoded.add!.idCounter,
          ]);
        } else {
          // We are guaranteed m[2] === decoded.add!.idCounter.
          m[0] += toAdd;
        }
        // Update the cached value.
        this._value += toAdd;
        this.emit("Add", {
          added: toAdd,
          previousValue,
          value: this.value,
          meta,
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
          value: this.value,
          previousValue,
          meta,
        });
        break;
      default:
        throw new Error(`Unknown decoded.data: ${decoded.data}`);
    }
  }

  /**
   * Set this._value directly from this.state.
   */
  private computeValue(): void {
    this._value = 0;
    for (const m of this.M.values()) {
      this._value += m[0] - m[1];
    }
  }

  get value(): number {
    return this._value;
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

  savePrimitive(): Uint8Array {
    const mMessage: {
      [replicaID: string]: IGrowOnlyResettableCounterSaveEntry;
    } = {};
    for (const [replicaID, m] of this.M) {
      mMessage[replicaID] = {
        p: m[0],
        n: m[1],
        idCounter: m[2],
      };
    }
    const message = GrowOnlyResettableCounterSave.create({ M: mMessage });
    return GrowOnlyResettableCounterSave.encode(message).finish();
  }

  loadPrimitive(savedState: Uint8Array | null) {
    const message = GrowOnlyResettableCounterSave.decode(savedState);
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

/**
 * A counter CRDT with an "observed-reset" operation
 * [[reset]], which restores the counter to its initial
 * state by undoing all *causally* prior operations.
 *
 * Based on ["An Oblivious Observed-Reset Embeddable Replicated Counter"](https://doi.org/10.1145/3517209.3524084)
 * by Matthew Weidner and Paulo Sérgio Almeida,
 * PaPoC 2022.
 *
 * Values are restricted to safe integers. More generally,
 * the sum of all additions by any one replica is restricted
 * to be a safe integer. Otherwise, results are not
 * guaranteed to be correct or eventually consistent.
 */
export class CResettableCounter extends CObject<ResettableCounterEventsRecord> {
  private readonly plus: CGrowOnlyResettableCounter;
  private readonly minus: CGrowOnlyResettableCounter;

  private plusResetEvent?: ResettableCounterResetEvent = undefined;

  constructor(init: InitToken) {
    super(init);
    this.plus = this.registerCollab(
      "",
      (init) => new CGrowOnlyResettableCounter(init)
    );
    this.minus = this.registerCollab(
      "0",
      (init) => new CGrowOnlyResettableCounter(init)
    );

    // Events
    this.plus.on("Add", (event) => {
      this.emit("Add", {
        added: event.added,
        value: this.value,
        previousValue: event.previousValue - this.minus.value,
        meta: event.meta,
      });
    });
    this.minus.on("Add", (event) => {
      this.emit("Add", {
        added: -event.added,
        value: this.value,
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
        value: this.value,
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

  reset() {
    this.plus.reset();
    this.minus.reset();
  }

  get value(): number {
    return this.plus.value - this.minus.value;
  }

  /**
   * @return this.value.toString()
   */
  toString(): string {
    return this.value.toString();
  }
}

import { GAddOnlyNumberMessage } from "../../../generated/proto_compiled";
import { CausalTimestamp } from "../../net";
import { CompositeCrdt, PrimitiveCrdt } from "../core";
import { Number, NumberEventsRecord } from "./interfaces";

class GAddOnlyNumberState {
  P = new Map<string, number>();
  N = new Map<string, number>();
  idAddOnlyNumber?: number;
}

class GAddOnlyNumber extends PrimitiveCrdt<
  GAddOnlyNumberState,
  NumberEventsRecord
> {
  constructor() {
    super(new GAddOnlyNumberState());
  }

  private keyString(sender: string, idAddOnlyNumber: number) {
    return idAddOnlyNumber + " " + sender;
  }

  add(toAdd: number) {
    if (toAdd < 0) {
      throw new Error(
        "GAddOnlyNumber.add: toAdd = " +
          toAdd +
          "; must be nonnegative (consider using AddOnlyNumber instead)"
      );
    }
    if (toAdd === 0) return;
    if (this.state.idAddOnlyNumber === undefined) {
      // TODO: do this in constructor once we get
      // access to this.runtime there
      this.state.idAddOnlyNumber = this.runtime.getReplicaUniqueNumber();
    }

    let prOld =
      this.state.P.get(
        this.keyString(this.runtime.replicaId, this.state.idAddOnlyNumber!)
      ) ?? 0;
    let message = GAddOnlyNumberMessage.create({
      add: {
        prOld,
        prNew: prOld + toAdd,
        idAddOnlyNumber: this.state.idAddOnlyNumber!,
      },
    });
    super.send(GAddOnlyNumberMessage.encode(message).finish());
  }

  reset() {
    const message = GAddOnlyNumberMessage.create({
      reset: {
        V: Object.fromEntries(this.state.P.entries()),
      },
    });
    super.send(GAddOnlyNumberMessage.encode(message).finish());
  }

  protected receivePrimitive(
    timestamp: CausalTimestamp,
    message: Uint8Array
  ): void {
    let decoded = GAddOnlyNumberMessage.decode(message);
    switch (decoded.data) {
      case "add":
        let keyString = this.keyString(
          timestamp.getSender(),
          decoded.add!.idAddOnlyNumber
        );
        if (!this.state.P.has(keyString)) {
          this.state.N.set(keyString, decoded.add!.prOld);
        }
        this.state.P.set(keyString, decoded.add!.prNew);
        this.emit("Add", {
          added: decoded.add!.prNew - decoded.add!.prOld,
          caller: this,
          timestamp,
        });
        break;
      case "reset":
        for (let vEntry of Object.entries(decoded.reset!.V!)) {
          let nEntry = this.state.N.get(vEntry[0]);
          if (nEntry !== undefined) {
            this.state.N.set(vEntry[0], Math.max(nEntry, vEntry[1]));
            if (this.state.N.get(vEntry[0]) === this.state.P.get(vEntry[0])) {
              this.state.N.delete(vEntry[0]);
              this.state.P.delete(vEntry[0]);
            }
          }
        }
        this.emit("Reset", { caller: this, timestamp });
        break;
      default:
        throw new Error("Unknown decoded.data: " + decoded.data);
    }
  }

  get value(): number {
    // TODO: cache value as optimization?
    return this.sum(this.state.P) - this.sum(this.state.N);
  }

  private sum(map: Map<string, number>): number {
    let ans = 0;
    for (let value of map.values()) ans += value;
    return ans;
  }

  canGc() {
    return this.state.P.size === 0 && this.state.N.size === 0;
  }
}

export class AddOnlyNumber
  extends CompositeCrdt<NumberEventsRecord>
  implements Number
{
  private readonly plus: GAddOnlyNumber;
  private readonly minus: GAddOnlyNumber;

  constructor(readonly initialValue: number = 0) {
    super();
    this.plus = this.addChild("1", new GAddOnlyNumber());
    this.minus = this.addChild("2", new GAddOnlyNumber());
    this.plus.on("Add", (event) =>
      this.emit("Add", { ...event, caller: this })
    );
    this.minus.on("Add", (event) =>
      this.emit("Add", {
        added: -event.added,
        caller: this,
        timestamp: event.timestamp,
      })
    );
    // Dispatch on minus since that is reset last.
    // TODO: that may break with generic CompositeCrdt.
    // How to dispatch reset events for CompositeCrdt in general?
    this.minus.on("Reset", (event) =>
      this.emit("Reset", { ...event, caller: this })
    );
  }

  add(toAdd: number) {
    if (toAdd > 0) this.plus.add(toAdd);
    else if (toAdd < 0) this.minus.add(-toAdd);
  }

  /**
   * Performs an equivalent add.
   */
  mult(toMult: number) {
    this.value *= toMult;
  }

  reset() {
    // TODO: generic CompositeCrdt reset
    this.plus.reset();
    this.minus.reset();
  }

  get value(): number {
    return this.plus.value - this.minus.value;
  }

  /**
   * Performs an equivalent add.
   */
  set value(value: number) {
    this.add(value - this.value);
  }
}

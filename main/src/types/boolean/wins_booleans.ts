import { WinsCBooleanSave } from "../../../generated/proto_compiled";
import { Resettable } from "../../abilities";
import { CompositeCrdt, PrimitiveCrdt } from "../../constructions";
import { CausalTimestamp } from "../../core";
import { CRegisterEventsRecord } from "../register";
import { MakeAbstractCBoolean } from "./abstract_boolean";

interface WinsCBooleanEntry {
  readonly sender: string;
  readonly senderCounter: number;
}

export class TrueWinsCBoolean
  extends MakeAbstractCBoolean(PrimitiveCrdt)<CRegisterEventsRecord<boolean>>
  implements Resettable
{
  private entries: WinsCBooleanEntry[] = [];

  set value(value: boolean) {
    // Length 0 for true, length 1 for false.
    // We send redundantly for true because it can still
    // change the state (add another entry), but not for
    // false, because in that case setting to false
    // does nothing.
    if (value) this.send(new Uint8Array());
    else if (this.value) this.send(new Uint8Array(1));
  }

  get value(): boolean {
    return this.entries.length !== 0;
  }

  protected receivePrimitive(
    timestamp: CausalTimestamp,
    message: Uint8Array
  ): void {
    const previousValue = this.value;

    const newEntries: WinsCBooleanEntry[] = [];
    let vc = timestamp.asVectorClock();
    for (const entry of this.entries) {
      let vcEntry = vc.get(entry.sender);
      if (vcEntry === undefined || vcEntry < entry.senderCounter) {
        newEntries.push(entry);
      }
    }

    if (message.length === 0) {
      // It's setting to true, add a new entry.
      newEntries.push({
        sender: timestamp.getSender(),
        senderCounter: timestamp.getSenderCounter(),
      });
    }

    this.entries = newEntries;

    // Event
    if (this.value !== previousValue) {
      this.emit("Set", { previousValue, timestamp });
    }
  }

  canGc(): boolean {
    return this.entries.length === 0;
  }

  reset() {
    // Setting to false is an observed-reset.
    this.value = false;
  }

  protected savePrimitive(): Uint8Array {
    const message = WinsCBooleanSave.create({
      senders: this.entries.map((entry) => entry.sender),
      senderCounters: this.entries.map((entry) => entry.senderCounter),
    });
    return WinsCBooleanSave.encode(message).finish();
  }

  protected loadPrimitive(saveData: Uint8Array): void {
    const decoded = WinsCBooleanSave.decode(saveData);
    for (let i = 0; i < decoded.senders.length; i++) {
      this.entries.push({
        sender: decoded.senders[i],
        senderCounter: decoded.senderCounters[i],
      });
    }
  }
}

export class FalseWinsCBoolean
  extends MakeAbstractCBoolean(CompositeCrdt)<CRegisterEventsRecord<boolean>>
  implements Resettable
{
  private readonly negated: TrueWinsCBoolean;

  constructor() {
    super();
    this.negated = this.addChild("", new TrueWinsCBoolean());

    // Events
    this.negated.on("Set", (event) =>
      this.emit("Set", {
        previousValue: !event.previousValue,
        timestamp: event.timestamp,
      })
    );
  }

  set value(value: boolean) {
    this.negated.value = !value;
  }

  get value(): boolean {
    return !this.negated.value;
  }

  reset(): void {
    this.negated.reset();
  }
}

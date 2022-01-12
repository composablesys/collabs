import { WinsCBooleanSave } from "../../../generated/proto_compiled";
import { Resettable } from "../abilities";
import { CObject } from "../../constructions";
import { InitToken, Pre } from "../../core";
import { CRegisterEventsRecord, MakeAbstractCBoolean } from "../../data_types";
import { CRDTMessageMeta, PrimitiveCRDT } from "../constructions";
import { Optional } from "../../util";

interface WinsCBooleanEntry {
  readonly sender: string;
  readonly senderCounter: number;
}

export class TrueWinsCBoolean
  extends MakeAbstractCBoolean(PrimitiveCRDT)<CRegisterEventsRecord<boolean>>
  implements Resettable
{
  private entries: WinsCBooleanEntry[] = [];

  set value(value: boolean) {
    // Length 0 for true, length 1 for false.
    // We send redundantly for true because it can still
    // change the state (add another entry), but not for
    // false, because in that case setting to false
    // does nothing.
    if (value) this.sendCRDT(new Uint8Array());
    else if (this.value) this.sendCRDT(new Uint8Array(1));
  }

  get value(): boolean {
    return this.entries.length !== 0;
  }

  protected receiveCRDT(message: Uint8Array, meta: CRDTMessageMeta): void {
    const previousValue = this.value;

    const newEntries: WinsCBooleanEntry[] = [];
    for (const entry of this.entries) {
      if (meta.vectorClock.get(entry.sender) < entry.senderCounter) {
        newEntries.push(entry);
      }
    }

    if (message.length === 0) {
      // It's setting to true, add a new entry.
      newEntries.push({
        sender: meta.sender,
        senderCounter: meta.senderCounter,
      });
    }

    this.entries = newEntries;

    // Event
    if (this.value !== previousValue) {
      this.emit("Set", {
        previousValue,
        meta,
      });
    }
  }

  canGC(): boolean {
    return this.entries.length === 0;
  }

  reset() {
    // Setting to false is an observed-reset.
    this.value = false;
  }

  save(): Uint8Array {
    const message = WinsCBooleanSave.create({
      senders: this.entries.map((entry) => entry.sender),
      senderCounters: this.entries.map((entry) => entry.senderCounter),
    });
    return WinsCBooleanSave.encode(message).finish();
  }

  load(saveData: Optional<Uint8Array>): void {
    if (!saveData.isPresent) return;
    const decoded = WinsCBooleanSave.decode(saveData.get());
    for (let i = 0; i < decoded.senders.length; i++) {
      this.entries.push({
        sender: decoded.senders[i],
        senderCounter: decoded.senderCounters[i],
      });
    }
  }
}

export class FalseWinsCBoolean
  extends MakeAbstractCBoolean(CObject)<CRegisterEventsRecord<boolean>>
  implements Resettable
{
  private readonly negated: TrueWinsCBoolean;

  constructor(initToken: InitToken) {
    super(initToken);
    this.negated = this.addChild("", Pre(TrueWinsCBoolean)());

    // Events
    this.negated.on("Set", (event) =>
      this.emit("Set", {
        previousValue: !event.previousValue,
        meta: event.meta,
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

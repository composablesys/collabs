import {
  CObject,
  CVariableEventsRecord,
  InitToken,
  MakeAbstractCBoolean,
  MessageMeta,
  Optional,
  Pre,
} from "@collabs/core";
import { WinsCBooleanSave } from "../../generated/proto_compiled";
import { PrimitiveCRDT } from "../constructions";
import { CRDTMeta } from "../crdt-runtime";

interface WinsCBooleanEntry {
  readonly sender: string;
  readonly senderCounter: number;
}

export class TrueWinsCBoolean extends MakeAbstractCBoolean(PrimitiveCRDT)<
  CVariableEventsRecord<boolean>
> {
  private entries: WinsCBooleanEntry[] = [];

  set value(value: boolean) {
    // Length 0 for true, length 1 for false.
    // We send redundantly for true because it can still
    // change the state (add another entry), but not for
    // false, because in that case setting to false
    // does nothing.
    // Automatic mode suffices to send all of the needed
    // vector clock entries (those corresponding to current
    // values in this.entries).
    if (value) this.sendCRDT(new Uint8Array(), { automatic: true });
    else if (this.value) this.sendCRDT(new Uint8Array(1), { automatic: true });
  }

  get value(): boolean {
    return this.entries.length !== 0;
  }

  protected receiveCRDT(
    message: Uint8Array,
    meta: MessageMeta,
    crdtMeta: CRDTMeta
  ): void {
    const previousValue = this.value;

    const newEntries: WinsCBooleanEntry[] = [];
    for (const entry of this.entries) {
      if (crdtMeta.vectorClockGet(entry.sender) < entry.senderCounter) {
        newEntries.push(entry);
      }
    }

    if (message.length === 0) {
      // It's setting to true, add a new entry.
      newEntries.push({
        sender: crdtMeta.sender,
        senderCounter: crdtMeta.senderCounter,
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

export class FalseWinsCBoolean extends MakeAbstractCBoolean(CObject)<
  CVariableEventsRecord<boolean>
> {
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
}

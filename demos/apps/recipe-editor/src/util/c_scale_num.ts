import {
  CRDTMessageMeta,
  CRDTSavedStateMeta,
  IVar,
  InitToken,
  PrimitiveCRDT,
  UpdateMeta,
  VarEventsRecord,
} from "@collabs/collabs";
import { int64AsNumber } from "@collabs/core";
import {
  ScaleNumMessage,
  ScaleNumSave,
} from "../../../../generated/proto_compiled";

/**
 * A number with a "scale" controlled by an ambient scaleVar (constructor arg).
 * Changing the scaleVar causes this.value to be scaled likewise, with conflict
 * resolutions:
 * - Set/set: One of the set values is picked arbitrarily (LWW).
 * - Scale/scale: One of the scales is picked arbitrarily (LWW).
 * - Scale/set: The set value is kept and also scaled.
 *
 * This class is implemented as a custom PrimitiveCRDT for demonstration purposes.
 * Specifically, the messages implement a Lamport LWW register storing
 * (valueWhenSet, scaleWhenSet). This isn't actually necessary; a simpler
 * implementation would just use a CVar<[valueWhenSet: number, scaleWhenSet: number]>.
 */
export class CScaleNum
  extends PrimitiveCRDT<VarEventsRecord<number>>
  implements IVar<number>
{
  private valueWhenSet = 0;
  private scaleWhenSet = 1;
  private lamport = 0;
  private lamportSender = "";

  constructor(init: InitToken, readonly scaleVar: IVar<number>) {
    super(init);

    scaleVar.on("Set", (e) =>
      this.emit("Set", {
        previousValue:
          this.valueWhenSet * (e.previousValue / this.scaleWhenSet),
        value: this.value,
        meta: e.meta,
      })
    );
  }

  set(value: number): number {
    this.value = value;
    return value;
  }

  set value(_value: number) {
    // Use an optimized custom binary format, as a demonstration.
    const message = ScaleNumMessage.encode({
      valueWhenSet: _value,
      scaleWhenSet: this.scaleVar.value,
    }).finish();
    super.sendPrimitive(message);
  }

  get value(): number {
    return this.valueWhenSet * (this.scaleVar.value / this.scaleWhenSet);
  }

  protected receiveCRDT(
    message: string | Uint8Array,
    meta: UpdateMeta,
    crdtMeta: CRDTMessageMeta
  ): void {
    const decoded = ScaleNumMessage.decode(<Uint8Array>message);
    this.processUpdate(
      decoded.valueWhenSet,
      decoded.scaleWhenSet,
      crdtMeta.lamportTimestamp!,
      crdtMeta.senderID,
      meta
    );
  }

  private processUpdate(
    valueWhenSet: number,
    scaleWhenSet: number,
    lamport: number,
    lamportSender: string,
    meta: UpdateMeta
  ) {
    if (
      lamport > this.lamport ||
      (lamport == this.lamport && lamportSender > this.lamportSender)
    ) {
      const previousValue = this.value;
      this.valueWhenSet = valueWhenSet;
      this.scaleWhenSet = scaleWhenSet;
      this.lamport = lamport;
      this.lamportSender = lamportSender;
      this.emit("Set", { value: this.value, previousValue, meta });
    }
  }

  protected saveCRDT(): Uint8Array {
    // Use an optimized custom binary format, as a demonstration.
    return ScaleNumSave.encode({
      valueWhenSet: this.valueWhenSet,
      scaleWhenSet: this.scaleWhenSet,
      lamport: this.lamport,
      lamportSender: this.lamportSender,
    }).finish();
  }

  protected loadCRDT(
    savedState: Uint8Array | null,
    meta: UpdateMeta,
    _crdtMeta: CRDTSavedStateMeta
  ): void {
    if (savedState === null) return;

    const decoded = ScaleNumSave.decode(savedState);
    this.processUpdate(
      decoded.valueWhenSet,
      decoded.scaleWhenSet,
      int64AsNumber(decoded.lamport),
      decoded.lamportSender,
      meta
    );
  }
}

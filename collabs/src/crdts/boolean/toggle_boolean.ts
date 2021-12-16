import { MessageMeta, InitToken } from "../../core";
import {
  CBoolean,
  CRegisterEventsRecord,
  MakeAbstractCBoolean,
} from "../../data_types";
import { CRDTMessageMeta, PrimitiveCRDT } from "../constructions";

export class ToggleCBoolean
  extends MakeAbstractCBoolean(PrimitiveCRDT)<CRegisterEventsRecord<boolean>>
  implements CBoolean
{
  private valueInternal: boolean;

  constructor(initToken: InitToken, private readonly initialValue = false) {
    super(initToken);
    this.valueInternal = initialValue;
  }

  set value(value: boolean) {
    if (value !== this.valueInternal) this.toggle();
  }

  get value(): boolean {
    return this.valueInternal;
  }

  toggle() {
    this.sendCRDT(new Uint8Array());
  }

  protected receiveCRDT(
    message: string | Uint8Array,
    meta: CRDTMessageMeta
  ): void {
    if (message.length !== 0)
      throw new Error("Unexpected nontrivial message for ToggleCBoolean");
    this.valueInternal = !this.valueInternal;
    this.emit("Set", {
      meta,
      previousValue: !this.valueInternal,
    });
  }

  // Length 0 for false, 1 for true.
  private static FALSE_MESSAGE = new Uint8Array(0);
  private static TRUE_MESSAGE = new Uint8Array(1);

  save(): Uint8Array {
    if (this.valueInternal) return ToggleCBoolean.FALSE_MESSAGE;
    else return ToggleCBoolean.TRUE_MESSAGE;
  }

  load(saveData: Uint8Array | null): void {
    if (saveData === null) return;
    this.valueInternal = saveData.length !== 0;
  }

  canGc(): boolean {
    return this.valueInternal === this.initialValue;
  }
}

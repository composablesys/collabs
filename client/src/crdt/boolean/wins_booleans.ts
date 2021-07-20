import {
  NoopCrdt,
  Resettable,
  ResettableEventsRecord,
  ResetWrapClass,
} from "../helper_crdts";
import { MakeAbstractCBoolean } from "./abstract_boolean";
import { CBoolean } from "./interfaces";

/** Enable-wins flag */
export class TrueWinsCBoolean
  extends MakeAbstractCBoolean(
    ResetWrapClass(NoopCrdt, true, false)
  )<ResettableEventsRecord>
  implements CBoolean, Resettable
{
  constructor() {
    super();
  }

  get value(): boolean {
    return !this.state.isHistoryEmpty();
  }

  set value(value: boolean) {
    if (value) this.original.noop();
    else this.reset();
  }
}

/** Disable-wins flag */
export class FalseWinsCBoolean
  extends MakeAbstractCBoolean(
    ResetWrapClass(NoopCrdt, true, false)
  )<ResettableEventsRecord>
  implements CBoolean, Resettable
{
  constructor() {
    super();
  }

  get value(): boolean {
    return this.state.isHistoryEmpty();
  }

  set value(value: boolean) {
    if (!value) this.original.noop();
    else this.reset();
  }
}

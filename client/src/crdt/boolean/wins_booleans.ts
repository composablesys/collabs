import {
  NoopCrdt,
  ResettableEventsRecord,
  ResetWrapClass,
} from "../helper_crdts";
import { Boolean } from "./interfaces";

/** Enable-wins flag */
export class TrueWinsBoolean
  extends ResetWrapClass(NoopCrdt, true, false)<ResettableEventsRecord>
  implements Boolean
{
  constructor() {
    super();
  }

  get value(): boolean {
    return !this.state.isHistoryEmpty();
  }

  set value(newValue: boolean) {
    if (newValue) this.original.noop();
    else this.reset();
  }
}

/** Disable-wins flag */
export class FalseWinsBoolean
  extends ResetWrapClass(NoopCrdt, true, false)<ResettableEventsRecord>
  implements Boolean
{
  constructor() {
    super();
  }

  get value(): boolean {
    return this.state.isHistoryEmpty();
  }

  set value(newValue: boolean) {
    if (!newValue) this.original.noop();
    else this.reset();
  }
}

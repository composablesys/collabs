import { Crdt, CrdtEvent, CrdtEventsRecord, CrdtRuntime } from "../crdt_core";
import { HardResettable, StrongResetWrapperCrdt } from "../resettable";
import {
  AddEvents,
  Constructor,
  CrdtMixinWithNewEvents,
  makeEventAdder,
} from "./mixin";

export interface StrongResettable {
  /**
   * Perform a strong-reset (reset-wins) operation on this Crdt.
   * Actually, any behavior is acceptable (will not violate eventual
   * consistency) so long as this method commutes with
   * concurrent operations.
   * In particular, if you don't want to implement strong resets,
   * it is okay to make this method a no-op, so long as users are
   * aware that strongReset() will have no effect.
   *
   * TODO: clarify strongReset vs reset semantics.  What is required
   * for EC?  Sensible approach seems to be that reset-strongs override
   * resets (even if a reset-strong is itself reset).
   */
  strongReset(): void;
}

export interface StrongResettableEventsRecord extends CrdtEventsRecord {
  StrongReset: CrdtEvent;
}

export const AddStrongResettable: CrdtMixinWithNewEvents<
  Crdt & HardResettable,
  StrongResettable,
  StrongResettableEventsRecord
> = <Input extends Constructor<Crdt & HardResettable>>(Base: Input) => {
  const AddEvents = makeEventAdder<StrongResettableEventsRecord>();
  return class StrongResettableBase
    extends AddEvents(Base)
    implements StrongResettable {
    protected strongResetWrapper: StrongResetWrapperCrdt;
    constructor(...args: any[]) {
      let parentOrRuntime = args[0] as Crdt | CrdtRuntime;
      let id = args[1] as string;
      let strongResetWrapper = new StrongResetWrapperCrdt(
        parentOrRuntime,
        id + "_reset"
      );
      args[0] = strongResetWrapper;
      super(...args);
      this.strongResetWrapper = strongResetWrapper;
      strongResetWrapper.setupStrongReset(this);
      strongResetWrapper.on("StrongReset", (event) => {
        this.emit("StrongReset", {
          caller: this,
          timestamp: event.timestamp,
        });
        this.emit("Change", {
          caller: this,
          timestamp: event.timestamp,
        });
      });
    }
    strongReset() {
      this.strongResetWrapper.strongReset();
    }
  };
};

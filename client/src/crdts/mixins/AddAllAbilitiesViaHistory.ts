import { CausalTimestamp } from "../../network/causal_broadcast_network";
import { Crdt, CrdtRuntime } from "../crdt_core";
import {
  HardResettable,
  ResetWrapperCrdt,
  StrongResetWrapperCrdt,
} from "../resettable";
import { SemidirectState } from "../semidirect";
import {
  AbilityFlag,
  AllAble,
  AllAbleEventsRecord,
  InterfaceOf,
} from "./abilities";
import {
  Constructor,
  CrdtMixinWithOptionsAndNewEvents,
  makeEventAdder,
} from "./mixin";
import { AddStrongResettable } from "./StrongResettable";

export interface AllAbleWithResetState extends AllAble {
  getResetState(): SemidirectState;
}

export const AddAllAbilitiesViaHistory: CrdtMixinWithOptionsAndNewEvents<
  Crdt & HardResettable,
  AllAbleWithResetState,
  boolean,
  AllAbleEventsRecord
> = <Input extends Constructor<Crdt & HardResettable>>(
  Base: Input,
  historyMaximalOnly: boolean = false
) => {
  const StrongResettableOnly = AddStrongResettable(Base);
  const AddEvents = makeEventAdder<AllAbleEventsRecord>();
  return class AbleViaHistory
    extends AddEvents(Base)
    implements AllAbleWithResetState {
    protected strongResetWrapper: StrongResetWrapperCrdt;
    protected resetWrapper: ResetWrapperCrdt;

    constructor(...args: any[]) {
      const parentOrRuntime = args[0] as Crdt | CrdtRuntime;
      const id = args[1] as string;
      const strongResetWrapper = new StrongResetWrapperCrdt(
        parentOrRuntime,
        id + "_reset"
      );
      const resetWrapper = new ResetWrapperCrdt(
        strongResetWrapper,
        id + "_reset",
        historyMaximalOnly
      );
      super(resetWrapper, id, ...args.slice(2));

      this.resetWrapper = resetWrapper;
      resetWrapper.setupReset(this);
      resetWrapper.on("Reset", (event) =>
        this.emit("Reset", { ...event, caller: this })
      );

      this.strongResetWrapper = strongResetWrapper;
      strongResetWrapper.setupStrongReset(resetWrapper);
      strongResetWrapper.on("StrongReset", (event) =>
        this.emit("StrongReset", { ...event, caller: this })
      );
    }

    getResetState(): SemidirectState {
      return this.resetWrapper.state;
    }

    reset() {
      this.resetWrapper.reset();
    }
    strongReset() {
      this.strongResetWrapper.strongReset();
    }
    receiveOutOfOrder(
      targetPath: string[],
      timestamp: CausalTimestamp,
      message: Uint8Array
    ) {
      // TODO
      throw new Error("Not implemented yet");
    }

    static withAbilities<F extends AbilityFlag>(
      abilityFlag: F,
      parentOrRuntime: Crdt | CrdtRuntime,
      id: string,
      ...otherArgs: any[]
    ): InstanceType<Input> & InterfaceOf<F> {
      if (
        abilityFlag.resettable === undefined &&
        abilityFlag.outOfOrderAble === undefined
      ) {
        if (abilityFlag.strongResettable === undefined) {
          return new Base(parentOrRuntime, id, ...otherArgs) as any;
        } else {
          return new StrongResettableOnly(
            parentOrRuntime,
            id,
            ...otherArgs
          ) as any;
        }
      }
      // TODO: as a minor optimization, we could avoid the StrongResettable
      // layer if we're not using it.
      else return new AbleViaHistory(parentOrRuntime, id, ...otherArgs) as any;
    }
  } as any;
};

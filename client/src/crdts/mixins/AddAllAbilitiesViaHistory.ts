import { CausalTimestamp } from "../../network/causal_broadcast_network";
import { Crdt, CrdtRuntime } from "../crdt_core";
import {
  HardResettable,
  ResetWrapperCrdt,
  StrongResetWrapperCrdt,
} from "../resettable";
import { SemidirectState } from "../semidirect";
import { AbilityFlag, AllAble, InterfaceOf } from "./abilities";
import { Constructor, MixinOpt1 } from "./mixin";
import { AddStrongResettable } from "./StrongResettable";

export interface AllAbleWithResetState extends AllAble {
  getResetState(): SemidirectState;
}

export const AddAllAbilitiesViaHistory: MixinOpt1<
  Crdt & HardResettable,
  AllAbleWithResetState,
  boolean
> = <Input extends Constructor<Crdt & HardResettable>>(
  Base: Input,
  historyMaximalOnly: boolean = false
) => {
  let StrongResettableOnly = AddStrongResettable(Base);
  return class AbleViaHistory extends Base implements AllAbleWithResetState {
    protected strongResetWrapper: StrongResetWrapperCrdt;
    protected resetWrapper: ResetWrapperCrdt;

    constructor(...args: any[]) {
      let parentOrRuntime = args[0] as Crdt | CrdtRuntime;
      let id = args[1] as string;
      let strongResetWrapper = new StrongResetWrapperCrdt(
        parentOrRuntime,
        id + "_reset"
      );
      let resetWrapper = new ResetWrapperCrdt(
        strongResetWrapper,
        id + "_reset",
        historyMaximalOnly
      );
      args[0] = resetWrapper;
      super(...args);
      this.resetWrapper = resetWrapper;
      resetWrapper.setupReset(this);
      this.strongResetWrapper = strongResetWrapper;
      strongResetWrapper.setupStrongReset(resetWrapper);
      // TODO: events: reset and strongReset.
      // strongResetWrapper.addEventListener(
      //     "Reset", (event: CrdtEvent) =>
      //     this.dispatchEvent({
      //         caller: this,
      //         type: event.type,
      //         timestamp: event.timestamp
      //     }), true
      // );
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
  };
};

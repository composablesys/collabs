import { IVariable } from "../interfaces/variable";
import { MicroTrace } from "./micro_trace";

export class MicroVariableTrace extends MicroTrace<IVariable> {
  constructor() {
    super({ Set: [(replica, rng) => replica.set(rng()), 1] });
  }

  getState(replica: IVariable): unknown {
    return replica.get();
  }
}

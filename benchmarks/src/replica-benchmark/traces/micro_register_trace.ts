import { IRegister } from "../interfaces/register";
import { MicroTrace } from "./micro_trace";

export class MicroRegisterTrace extends MicroTrace<IRegister> {
  constructor() {
    super({ Set: [(replica, rng) => replica.set(rng()), 1] });
  }

  getState(replica: IRegister): unknown {
    return replica.get();
  }
}

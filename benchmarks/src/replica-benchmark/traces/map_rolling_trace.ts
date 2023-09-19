import { IMap } from "../interfaces/map";
import { MicroTrace } from "./micro_trace";

export class MapRollingTrace extends MicroTrace<IMap> {
  constructor() {
    super({
      Roll: [
        (replica, rng, opNum) => {
          if (opNum >= 100) replica.delete(opNum - 100 + "");
          replica.set(opNum + "", Math.floor(rng() * 100 - 50));
        },
        1.0,
      ],
    });
  }

  getState(replica: IMap): unknown {
    return replica.asMap();
  }
}

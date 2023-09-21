import { IMap } from "../interfaces/map";
import { MicroTrace } from "./micro_trace";

export class MapTrace extends MicroTrace<IMap> {
  constructor() {
    super({
      Toggle: [
        (replica, rng) => {
          const key = Math.floor(rng() * 100);
          if (replica.has(key + "")) replica.delete(key + "");
          else replica.set(key + "", 0);
        },
        0.5,
      ],
      ValueOp: [
        (replica, rng) => {
          const key = Math.floor(rng() * 100);
          replica.set(key + "", Math.floor(rng() * 100 - 50));
        },
        0.5,
      ],
    });
  }

  getState(replica: IMap): unknown {
    return replica.asMap();
  }
}

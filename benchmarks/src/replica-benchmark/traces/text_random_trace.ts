import { randomChar } from "../../util";
import { IText } from "../interfaces/text";
import { MicroTrace } from "./micro_trace";

export class TextRandomTrace extends MicroTrace<IText> {
  constructor() {
    super({
      Op: [
        (replica, rng) => {
          if (replica.length > 100) replica.delete(Math.floor(rng() * 100));
          else
            replica.insert(
              Math.floor(rng() * (replica.length + 1)),
              randomChar(rng)
            );
        },
        1.0,
      ],
    });
  }

  getState(replica: IText): unknown {
    return replica.getText();
  }
}

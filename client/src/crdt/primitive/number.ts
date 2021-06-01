import { Register } from "../register/interfaces";

export interface Number extends Register<number> {
  add(toAdd: number): void;
  mult(toMult: number): void;
  // TODO: min, max?
}

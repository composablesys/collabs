import { Register } from "../register";

export interface Boolean extends Register<boolean> {
  // TODO: boolean ops (e.g. xor/and, which form
  // the boolean ring)?  Toggle?
  // Mixin to implement them using value-set?
}

// TODO: add-number mod 2 version?  Or ring version?

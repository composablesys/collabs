import { Resettable } from "../composers/resettable";

// An opaque register of type T, any semantics.
export interface Register<T> extends Resettable {
  // Set and get-able
  value: T;
}

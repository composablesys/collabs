import { SequentialCSet } from "./sequential_set";

export class GrowOnlyCSet<T> extends SequentialCSet<T> {
  delete(_value: T): void {
    throw new Error("Unsupported operation: GrowOnlyCSet.delete");
  }

  clear(): void {
    throw new Error("Unsupported operation: GrowOnlyCSet.clear");
  }

  reset(): void {
    throw new Error("Unsupported operation: GrowOnlyCSet.reset");
  }
}

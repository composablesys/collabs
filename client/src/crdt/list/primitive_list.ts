// TODO: specialize to default DenseLocalList.
// Perhaps default I, and have a default constructor param

import { CausalTimestamp } from "../../net";
import { AbstractCListPrimitiveCrdt } from "./abstract_list";
import { DenseLocalList } from "./dense_local_list";

// with unsafe typing?
export class PrimitiveCList<T, I> extends AbstractCListPrimitiveCrdt<
  DenseLocalList<I, T>,
  T,
  T[]
> {
  insert(index: number, ...args: T[]): T {
    throw new Error("Method not implemented.");
  }
  delete(index: number, count?: number): void {
    throw new Error("Method not implemented.");
  }
  get(index: number): T {
    throw new Error("Method not implemented.");
  }
  values(): IterableIterator<T> {
    throw new Error("Method not implemented.");
  }
  length: number;

  // TODO: overrides for optimization (e.g. slice)

  canGc(): boolean {
    throw new Error("Method not implemented.");
  }
  protected receivePrimitive(
    timestamp: CausalTimestamp,
    message: Uint8Array
  ): void {
    throw new Error("Method not implemented.");
  }
  protected savePrimitive(): Uint8Array {
    throw new Error("Method not implemented.");
  }
  protected loadPrimitive(saveData: Uint8Array): void {
    throw new Error("Method not implemented.");
  }
}

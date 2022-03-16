import { ItemManager } from "./position_source";

export class NumberItemManager implements ItemManager<number> {
  private constructor() {
    // Private constructor, use instance instead.
  }

  static instance = new NumberItemManager();

  length(item: number): number {
    return item;
  }

  get(_item: number, _index: number): number {
    return 1;
  }

  merge(a: number, b: number): number {
    return a + b;
  }

  merge3(a: number, b: number, c: number): number {
    return a + b + c;
  }

  split(item: number, index: number): [left: number, right: number] {
    return [index, item - index];
  }

  splitDelete(item: number, index: number): [left: number, right: number] {
    return [index, item - index - 1];
  }

  trimFirst(item: number): number {
    return item - 1;
  }

  trimLast(item: number): number {
    return item - 1;
  }
}

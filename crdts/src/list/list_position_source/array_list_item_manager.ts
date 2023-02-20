import { ListItemManager } from "./list_position_source";

export class ArrayListItemManager<T> implements ListItemManager<T[]> {
  private constructor() {
    // Private constructor, use getInstance instead.
  }

  private static instance = new this();

  static getInstance<T>(): ArrayListItemManager<T> {
    return <ArrayListItemManager<T>>this.instance;
  }

  length(item: T[]): number {
    return item.length;
  }

  get(item: T[], index: number): T[] {
    return [item[index]];
  }

  merge(a: T[], b: T[]): T[] {
    a.push(...b);
    return a;
  }

  merge3(a: T[], b: T[], c: T[]): T[] {
    a.push(...b, ...c);
    return a;
  }

  split(item: T[], index: number): [left: T[], right: T[]] {
    return [item.slice(0, index), item.slice(index)];
  }

  splitDelete(item: T[], index: number): [left: T[], right: T[]] {
    return [item.slice(0, index), item.slice(index + 1)];
  }

  trimFirst(item: T[]): T[] {
    item.shift();
    return item;
  }

  trimLast(item: T[]): T[] {
    item.pop();
    return item;
  }
}

import { CrdtParent } from "../core";
import { CMap } from "../map";
import { AbstractCListCompositeCrdt } from "./abstract_list";
import { DenseLocalList } from "./dense_local_list";

export class CListFromMap<
  T,
  InsertArgs extends any[],
  I,
  M extends CMap<I, T, InsertArgs>
> extends AbstractCListCompositeCrdt<T, InsertArgs> {
  protected readonly internalMap: M;

  constructor(
    map: M,
    protected readonly denseLocalList: DenseLocalList<I, undefined>
  ) {
    super();

    this.internalMap = this.addChild("", map);

    this.internalMap.on("Set", (event) => {
      this.denseLocalList.set(event.key, undefined);
    });
    this.internalMap.on("Delete", (event) => {
      this.denseLocalList.delete(event.key);
    });

    // TODO: events
  }

  init(name: string, parent: CrdtParent) {
    super.init(name, parent);
    this.denseLocalList.setRuntime(this.runtime);
  }

  insert(index: number, ...args: InsertArgs): T {
    const loc = this.denseLocalList.createNewLocs(index, 1)[0];
    return this.internalMap.set(loc, ...args);
  }

  delete(index: number, count = 1): void {
    // Note that the index to delete is a moving target.
    // TODO: this assumes set deletion works sequentially.
    for (let i = 0; i < count; i++) {
      this.internalMap.delete(this.denseLocalList.getLoc(index));
    }
  }

  get(index: number): T {
    return this.internalMap.get(this.denseLocalList.getLoc(index))!;
  }

  *values(): IterableIterator<T> {
    for (const loc of this.denseLocalList.locs()) {
      yield this.internalMap.get(loc)!;
    }
  }

  get length(): number {
    return this.denseLocalList.length;
  }

  saveComposite(): Uint8Array {
    return this.denseLocalList.saveLocs();
  }

  loadComposite(saveData: Uint8Array): void {
    this.denseLocalList.loadLocs(saveData, () => undefined);
  }
}

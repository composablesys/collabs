import { InitToken, Pre } from "../../core";
import { AbstractCListCObject, CMap } from "../../data_types";
import { Serializer } from "../../util";
import { LocatableCList } from "./cursor";
import { DenseLocalList } from "./dense_local_list";

export class CListFromMap<
    T,
    InsertArgs extends unknown[],
    L,
    MapT extends CMap<L, T, InsertArgs>,
    DenseT extends DenseLocalList<L, undefined>
  >
  extends AbstractCListCObject<T, InsertArgs>
  implements LocatableCList<L, T, InsertArgs>
{
  protected readonly internalMap: MapT;

  constructor(
    initToken: InitToken,
    map: Pre<MapT>,
    protected readonly denseLocalList: DenseT
  ) {
    super(initToken);

    this.internalMap = this.addChild("", map);

    // Maintain denseLocalList as a view of map's keys.
    // Also emit events.
    this.internalMap.on("Set", (event) => {
      // Reasonable CMap's will only dispatch Set when
      // the value is set the first time (since it's only
      // set once), but just in case, we check that the Set
      // event really is for a new key.
      if (!event.previousValue.isPresent) {
        // We do this here and not in the valueConstructor
        // because denseLocalList is a view of the map keys
        // only, we don't care if values are refreshed by GC.
        const startIndex = this.denseLocalList.set(event.key, undefined);
        this.emit("Insert", {
          startIndex,
          count: 1,
          meta: event.meta,
        });
      }
    });
    this.internalMap.on("Delete", (event) => {
      const startIndex = this.denseLocalList.delete(event.key)![0];
      this.emit("Delete", {
        startIndex,
        count: 1,
        deletedValues: [event.deletedValue],
        meta: event.meta,
      });
    });
  }

  insert(index: number, ...args: InsertArgs): T {
    const loc = this.denseLocalList.createNewLocs(index, 1)[0];
    return this.internalMap.set(loc, ...args);
  }

  delete(startIndex: number, count = 1): void {
    if (count < 0 || !Number.isInteger(count)) {
      throw new Error(`invalid count: ${count}`);
    }
    // Get the locs to delete.
    const toDelete = new Array<L>(count);
    for (let i = 0; i < count; i++) {
      toDelete[i] = this.denseLocalList.getLoc(startIndex + i);
    }
    // Delete them.
    for (const value of toDelete) {
      this.internalMap.delete(value);
    }
  }

  get(index: number): T {
    return this.internalMap.get(this.denseLocalList.getLoc(index))!;
  }

  getLocation(index: number): L {
    return this.denseLocalList.getLoc(index);
  }

  locate(location: L): [index: number, isPresent: boolean] {
    return this.denseLocalList.locate(location);
  }

  get locationSerializer(): Serializer<L> {
    return this.denseLocalList;
  }

  *values(): IterableIterator<T> {
    for (const loc of this.denseLocalList.locs()) {
      yield this.internalMap.get(loc)!;
    }
  }

  get length(): number {
    return this.denseLocalList.length;
  }

  canGC(): boolean {
    // Even if the map is trivial, denseLocalList might
    // have tombstones, so we need to check for it here.
    return super.canGC() && this.denseLocalList.canGC();
  }

  protected saveObject(): Uint8Array {
    return this.denseLocalList.saveLocs();
  }

  protected loadObject(saveData: Uint8Array | null): void {
    this.denseLocalList.loadLocs(saveData, () => undefined);
  }
}

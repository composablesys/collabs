import { MovableMutCListSave } from "../../../generated/proto_compiled";
import {
  arrayAsString,
  DefaultElementSerializer,
  ElementSerializer,
  PairSerializer,
  stringAsArray,
} from "../../util";
import { CompositeCrdt, Crdt, CrdtParent } from "../core";
import { LwwCRegister } from "../register";
import { CSet } from "../set";
import { AbstractCListCompositeCrdt } from "./abstract_list";
import { DenseLocalList } from "./dense_local_list";

// TODO: don't export this and MovableMutCList if they're
// only used internally.
export class MovableMutCListEntry<C extends Crdt, I> extends CompositeCrdt {
  // TODO: FWW option? generic register option?
  readonly value: C;
  readonly loc: LwwCRegister<I>;
  constructor(value: C, initialLoc: I, locSerializer: ElementSerializer<I>) {
    super();
    this.value = this.addChild("", value);
    this.loc = this.addChild("0", new LwwCRegister(initialLoc, locSerializer));
  }
}

// TODO: name?
export interface WithIds<T> {
  idOf(value: T): string;
  getById(id: string): T | undefined;
}

export class MovableMutCList<
    C extends Crdt,
    InsertArgs extends any[],
    I = TreedocLoc
  >
  extends AbstractCListCompositeCrdt<C, InsertArgs>
  implements MovableCList<C, InsertArgs> 
{
  protected readonly set: CSet<MovableMutCListEntry<C, I>, [I, InsertArgs]> &
    WithIds<MovableMutCListEntry<C, I>>;

  constructor(
    setCallback: <D extends Crdt, U extends any[]>(
      setValueConstructor: (...setArgs: U) => D,
      setArgsSerializer: ElementSerializer<U>
    ) => CSet<D, U> & WithIds<D>,
    valueConstructor: (...args: InsertArgs) => C,
    argsSerializer: ElementSerializer<InsertArgs> = DefaultElementSerializer.getInstance(),
    private readonly denseLocalList: DenseLocalList<
      I,
      MovableMutCListEntry<C, I>
    > = new TreedocDenseLocalList()
  ) {
    super();

    this.set = this.addChild(
      "",
      setCallback((loc, args) => {
        return new MovableMutCListEntry(
          valueConstructor(...args),
          loc,
          denseLocalList
        );
      }, new PairSerializer(denseLocalList, argsSerializer))
    );
    this.set.on("Add", (event) => {
      this.denseLocalList.set(event.value.loc.value, event.value);
    });
    this.set.on("Delete", (event) => {
      // TODO: use previousLoc instead, in case delete is
      // a reset or similar?  (But make sure it's up-to-date
      // if the delete didn't change anything, not necessarily
      // the cached previousLoc).
      this.denseLocalList.delete(event.value.valueBeforeDelete);
    });
    this.set.on("ValueInit", (event) => {
      event.value.loc.on("Set", (event2) => {
        this.denseLocalList.delete(event.value.valueBeforeMove);
        this.denseLocalList.set(event.value.loc.value, event.value);
      });
    });

    // TODO: events
  }

  init(name: string, parent: CrdtParent) {
    super.init(name, parent);
    this.denseLocalList.setRuntime(this.runtime);
  }

  insert(index: number, ...args: InsertArgs): C {
    const loc = this.denseLocalList.createNewLocs(index, 1)[0];
    return this.set.add(loc, args).value;
  }

  delete(index: number, count = 1): void {
    // Note that the index to delete is a moving target.
    // TODO: this assumes set deletion works sequentially.
    for (let i = 0; i < count; i++) {
      this.set.delete(this.denseLocalList.get(index));
    }
  }

  // TODO: move

  get(index: number): C {
    return this.denseLocalList.get(index).value;
  }

  // TODO: generic owns / restore?  If only using for own implementations.

  *values(): IterableIterator<C> {
    for (const entry of this.denseLocalList.values()) {
      yield entry.value;
    }
  }

  get length(): number {
    return this.set.size;
  }

  // TODO: optimized methods (see AbstractCList)

  canGc(): boolean {
    // Even if the set is trivial, denseLocalList might
    // have tombstones, so we need to check for it here.
    return super.canGc() && this.denseLocalList.canGc();
  }

  saveComposite(): Uint8Array {
    // Save denseLocalList.
    const ids = new Array<Uint8Array>(this.length);
    let i = 0;
    for (const entry of this.denseLocalList.values()) {
      ids[i] = stringAsArray(this.set.idOf(entry));
    }
    const message = MovableMutCListSave.create({
      locs: this.denseLocalList.saveLocs(),
      ids,
    });
    return MovableMutCListSave.encode(message).finish();
  }

  private saveData?: Uint8Array;
  loadComposite(saveData: Uint8Array) {
    // Need to wait until this.set is loaded so we
    // can call getById.
    this.saveData = saveData;
  }

  postLoad() {
    const decoded = MovableMutCListSave.decode(this.saveData!);
    delete this.saveData;

    this.denseLocalList.loadLocs(
      decoded.locs,
      (index) => this.set.getById(arrayAsString(decoded.ids[index]))!
    );
  }
}

// TODO: Resettable if Set is Resettable

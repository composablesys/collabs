import { DefaultElementSerializer, ElementSerializer } from "../../util";
import { Crdt, Runtime } from "../core";
import { Resettable } from "../helper_crdts";
import { CMap } from "../map";
import { AbstractCSetCompositeCrdt } from "./abstract_set";

class MapMutCSetSerializer<AddArgs extends any[]>
  implements
    ElementSerializer<[sender: string, uniqueNumber: number, args: AddArgs]>
{
  constructor(private readonly argsSerializer: ElementSerializer<AddArgs>) {}

  serialize(
    value: [sender: string, uniqueNumber: number, args: AddArgs]
  ): Uint8Array {
    // TODO
  }

  deserialize(
    message: Uint8Array,
    runtime: Runtime
  ): [sender: string, uniqueNumber: number, args: AddArgs] {
    // TODO
  }
}

export class MapMutCSet<
  C extends Crdt,
  AddArgs extends any[]
> extends AbstractCSetCompositeCrdt<C, AddArgs> {
  // TODO: use a MutCMap, where the
  // keys are id (like in other sets) + serialized args.
  // Caution that each message contains the whole args, so
  // make them small (ideally []) or use a different set.
  // Choose keySerializer so that it is no larger than current
  // keys when args is [].
  protected map: CMap<
    [sender: string, uniqueNumber: number, args: AddArgs],
    C,
    []
  >;

  /**
   * mapCallback is called once to construct the internal
   * CMap; it's a callback just so we can supply you with
   * the usual CMap constructor arguments
   * (valueConstructor and keySerializer).
   *
   * TODO: note argsSerializer isn't used if the arg is
   * a 0-length Array (e.g., when AddArgs = []); we instead
   * use an optimized marker that gets deserialized to [].
   *
   * TODO: the Map should implement keyOf in constant or
   * log time, since it is called as part of has and delete.
   */
  constructor(
    mapCallback: <K>(
      mapValueConstructor: (key: K) => C,
      keySerializer: ElementSerializer<K>
    ) => CMap<K, C, []>,
    valueConstructor: (sender: string, ...args: AddArgs) => C,
    argsSerializer: ElementSerializer<AddArgs> = DefaultElementSerializer.getInstance()
  ) {
    super();
    this.map = this.addChild(
      "",
      mapCallback(
        ([sender, _, args]) => valueConstructor(sender, ...args),
        new MapMutCSetSerializer(argsSerializer)
      )
    );

    // Events
    this.map.on("ValueInit", (event) => {
      this.emit("ValueInit", {
        value: event.value,
      });
    });
    this.map.on("Set", (event) => {
      this.emit("Add", {
        // TODO: avoid get here if no one's going to use it?
        // (value as getter with cache)
        value: this.map.get(event.key)!,
        timestamp: event.timestamp,
      });
    });
    this.map.on("Delete", (event) => {
      this.emit("Delete", {
        value: event.value,
        timestamp: event.timestamp,
      });
    });
  }

  add(...args: AddArgs): C {
    return this.map.set([
      this.runtime.replicaId,
      this.runtime.getReplicaUniqueNumber(),
      args,
    ]);
  }

  delete(value: C): void {
    const key = this.map.keyOf(value);
    if (key !== undefined) this.map.delete(key);
  }

  has(value: C): boolean {
    const key = this.map.keyOf(value);
    return key !== undefined && this.map.has(key);
  }

  values(): IterableIterator<C> {
    return this.map.values();
  }

  get size(): number {
    return this.map.size;
  }
}

export class ResettingMutCSet<
  C extends Crdt & Resettable,
  AddArgs extends any[]
> extends MapMutCSet<C, AddArgs> {
  constructor(
    private readonly valueConstructor: (sender: string, ...args: AddArgs) => C,
    private readonly argsSerializer: ElementSerializer<AddArgs> = DefaultElementSerializer.getInstance()
  ) {
    super(
      (mapValueConstructor, keySerializer) =>
        new ResettingMutCMap(mapValueConstructor, keySerializer),
      valueConstructor,
      argsSerializer
    );
  }

  owns(value: C): boolean {
    return (this.map as ResettingMutCMap<C, AddArgs>).owns(value);
  }

  restore(value: C): void {
    if (!this.owns(value)) {
      throw new Error("this.owns(value) is false");
    }
    (this.map as ResettingMutCMap<C, AddArgs>).restore(this.map.keyOf(value)!);
  }
}

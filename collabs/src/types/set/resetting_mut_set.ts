import {
  IMutCSetFromMapKeyMessage,
  MutCSetFromMapKeyMessage,
} from "../../../generated/proto_compiled";
import { DefaultSerializer } from "../../util";
import { Crdt, InitToken, Serializer, Pre, Runtime } from "../../core";
import { Resettable } from "../../abilities";
import { CMap, MergingMutCMap } from "../map";
import { AbstractCSetCObject } from "./abstract_set";
import { CSetEventsRecord } from "./interfaces";

class MutCSetFromMapSerializer<AddArgs extends any[]>
  implements Serializer<[sender: string, uniqueNumber: number, args: AddArgs]>
{
  constructor(private readonly argsSerializer: Serializer<AddArgs>) {}

  serialize(
    value: [sender: string, uniqueNumber: number, args: AddArgs]
  ): Uint8Array {
    const iMessage: IMutCSetFromMapKeyMessage = {
      sender: value[0],
      uniqueNumber: value[1],
    };
    if (value[2].length !== 0) {
      iMessage.args = this.argsSerializer.serialize(value[2]);
    }
    const message = MutCSetFromMapKeyMessage.create(iMessage);
    return MutCSetFromMapKeyMessage.encode(message).finish();
  }

  deserialize(
    message: Uint8Array,
    runtime: Runtime
  ): [sender: string, uniqueNumber: number, args: AddArgs] {
    const decoded = MutCSetFromMapKeyMessage.decode(message);
    // If args is not set, then use [].
    // According to https://github.com/protobufjs/protobuf.js/issues/728#issuecomment-289234674
    // (possibly outdated) and some forum posts,
    // the proper way to check if
    // an optional field is set is to use hasOwnProperty.
    const args = decoded.hasOwnProperty("args")
      ? this.argsSerializer.deserialize(decoded.args, runtime)
      : ([] as unknown as AddArgs);
    return [decoded.sender, decoded.uniqueNumber, args];
  }
}

/**
 * Caution: each key contains the whole args, so
 * make sure that is okay for map performance (e.g.
 * if every map message includes the key, you should
 * be okay with sending the key on every message).
 **/
export class MutCSetFromMap<
  C extends Crdt,
  AddArgs extends any[],
  MapT extends CMap<
    [sender: string, uniqueNumber: number, args: AddArgs],
    C,
    []
  >,
  Events extends CSetEventsRecord<C> = CSetEventsRecord<C>
> extends AbstractCSetCObject<C, AddArgs, Events> {
  protected map: MapT;

  /**
   * mapCallback is called once to construct the internal
   * CMap; it's a callback just so we can supply you with
   * the usual CMap constructor arguments
   * (valueConstructor and keySerializer).
   *
   * The Map should implement keyOf in constant or
   * log time, since it is called as part of has and delete.
   *
   * Note: argsSerializer isn't used if the arg is
   * a 0-length Array (e.g., when AddArgs = []); we instead
   * use an optimized marker that gets deserialized to [].
   */
  constructor(
    initToken: InitToken,
    mapCallback: (
      mapValueConstructor: (
        mapValueInitToken: InitToken,
        key: [sender: string, uniqueNumber: number, args: AddArgs]
      ) => C,
      keySerializer: Serializer<
        [sender: string, uniqueNumber: number, args: AddArgs]
      >
    ) => Pre<MapT>,
    valueConstructor: (valueInitToken: InitToken, ...args: AddArgs) => C,
    argsSerializer: Serializer<AddArgs> = DefaultSerializer.getInstance(
      initToken.runtime
    )
  ) {
    super(initToken);
    this.map = this.addChild(
      "",
      mapCallback(
        (mapValueInitToken, key) =>
          valueConstructor(mapValueInitToken, ...key[2]),
        new MutCSetFromMapSerializer(argsSerializer)
      )
    );

    // Events
    this.map.on("Set", (event) => {
      if (!event.previousValue.isPresent) {
        this.emit("Add", {
          value: this.map.get(event.key)!,
          meta: event.meta,
        });
      }
    });
    this.map.on("Delete", (event) => {
      this.emit("Delete", {
        value: event.deletedValue,
        meta: event.meta,
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

/**
 * Caution: each message contains the whole args, so
 * make them small (ideally []) or use a different set.
 **/
export class ResettingMutCSet<
    C extends Crdt & Resettable,
    AddArgs extends any[]
  >
  extends MutCSetFromMap<
    C,
    AddArgs,
    MergingMutCMap<[sender: string, uniqueNumber: number, args: AddArgs], C>
  >
  implements Resettable
{
  constructor(
    initToken: InitToken,
    valueConstructor: (valueInitToken: InitToken, ...args: AddArgs) => C,
    argsSerializer: Serializer<AddArgs> = DefaultSerializer.getInstance(
      initToken.runtime
    )
  ) {
    super(initToken, Pre(MergingMutCMap), valueConstructor, argsSerializer);
  }

  owns(value: C): boolean {
    return this.map.owns(value);
  }

  restore(value: C): void {
    const key = this.map.keyOf(value);
    if (key === undefined) {
      throw new Error("this.owns(value) is false");
    }
    this.map.restore(key);
  }

  /**
   * @param  value [description]
   * @return the AddArgs used to add value
   * @throws if !this.owns(value)
   */
  getArgs(value: C): AddArgs {
    const key = this.map.keyOf(value);
    if (key === undefined) {
      throw new Error("this.owns(value) is false");
    }
    return key[2];
  }

  reset(): void {
    this.map.reset();
  }
}

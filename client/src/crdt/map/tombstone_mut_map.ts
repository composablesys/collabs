import { DefaultElementSerializer, ElementSerializer } from "../../util";
import { Crdt } from "../core";
import { TombstoneMutCRegister } from "../register";
import { RegisterMutCMap } from "./register_mut_map";

// TODO: note that ValueInit events are emitted for all
// values, even ones that never show up locally due to
// a winning concurrent write to their key.

/**
 * TODO: warning: tombstones.
 */
export class TombstoneMutCMap<
  K,
  C extends Crdt,
  SetArgs extends any[]
> extends RegisterMutCMap<K, C, SetArgs> {
  constructor(
    valueConstructor: (key: K, ...args: SetArgs) => C,
    writerWinsRule: "first" | "last" = "last",
    concurrentOpRestores = false,
    keySerializer: ElementSerializer<K> = DefaultElementSerializer.getInstance(),
    argsSerializer: ElementSerializer<SetArgs> = DefaultElementSerializer.getInstance()
  ) {
    super(
      (key) =>
        new TombstoneMutCRegister(
          (...args: SetArgs) => valueConstructor(key, ...args),
          writerWinsRule,
          concurrentOpRestores,
          argsSerializer
        ),
      keySerializer
    );
  }

  delete(key: K): void {
    const register = this.internalMap.internalMap.getIfPresent(key);
    // clear, not reset
    if (register !== undefined) register.clear();
  }
}

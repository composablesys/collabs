import { DefaultElementSerializer, ElementSerializer } from "../../util";
import { Crdt } from "../core";
import { Resettable } from "../helper_crdts";
import { DeletingMutCSet } from "../set";
import { MutCMapFromSet } from "./mut_map_from_set";

export class DeletingMutCMap<K, C extends Crdt, SetArgs extends any[]>
  extends MutCMapFromSet<K, C, SetArgs, DeletingMutCSet<C, [K, SetArgs]>>
  implements Resettable
{
  constructor(
    valueConstructor: (key: K, ...args: SetArgs) => C,
    keySerializer: ElementSerializer<K> = DefaultElementSerializer.getInstance(),
    argsSerializer: ElementSerializer<SetArgs> = DefaultElementSerializer.getInstance()
  ) {
    super(
      (setValueConstructor, setArgsSerializer) =>
        new DeletingMutCSet(setValueConstructor, undefined, setArgsSerializer),
      valueConstructor,
      keySerializer,
      argsSerializer
    );
  }

  reset() {
    // This should be equivalent to clear, but just in case...
    this.map.reset();
    this.valueSet.reset();
  }
}

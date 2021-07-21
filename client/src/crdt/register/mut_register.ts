import {
  ElementSerializer,
  DefaultElementSerializer,
  Optional,
} from "../../util";
import { CompositeCrdt, Crdt } from "../core";
import { Resettable, ResettableEventsRecord } from "../helper_crdts";
import { YjsCrdtSet } from "../set";
import { CRegister } from "./interfaces";
import { FwwCRegister, LwwCRegister } from "./wins_registers";

// TODO: events: default change events will be odd because
// you'll see intermediate states if you listen to all that.
// Perhaps this is an argument for a Set: CrdtEvent in general?

export class MutCRegister<C extends Crdt, SetArgs extends any[]>
  extends CompositeCrdt<ResettableEventsRecord>
  implements CRegister<Optional<C>, SetArgs>, Resettable
{
  private readonly crdtFactory: YjsCrdtSet<C, SetArgs>;
  private readonly register: FwwCRegister<C> | LwwCRegister<C>;

  constructor(
    valueConstructor: (...args: SetArgs) => C,
    writerWinsRule: "first" | "last" = "last",
    argsSerializer: ElementSerializer<SetArgs> = DefaultElementSerializer.getInstance()
  ) {
    super();
    this.crdtFactory = this.addChild(
      "",
      new YjsCrdtSet(valueConstructor, [], argsSerializer)
    );
    // TODO: use optimized serializer (just Set id, not full
    // pathToRoot).
    // Initial value hacking is okay since we only ever
    // consult optionalValue.
    switch (writerWinsRule) {
      case "first":
        this.register = this.addChild(
          "0",
          new FwwCRegister<C>(undefined as unknown as C)
        );
        break;
      case "last":
        this.register = this.addChild(
          "0",
          new LwwCRegister<C>(undefined as unknown as C)
        );
        break;
    }

    // TODO: events.  Including ValueInit?
    this.register.on("Reset", (event) => {
      this.emit("Reset", event);
    });
  }

  set(...args: SetArgs): void {
    this.crdtFactory.clear();
    // TypeScript doesn't understand that value is of type
    // C, not an arbitrary T
    (this.register.value as C) = this.crdtFactory.create(...args);
  }

  get value(): Optional<C> {
    return this.register.optionalValue;
  }

  reset() {
    this.crdtFactory.reset();
    this.register.reset();
  }
}

import { CausalTimestamp } from "../../net";
import {
  DefaultElementSerializer,
  ElementSerializer,
} from "../../util/serialization";
import { Crdt, CrdtEvent, CrdtEventsRecord } from "./crdt";

export interface NewCrdtEvent<C extends Crdt> extends CrdtEvent {
  readonly newCrdt: C;
}

export interface CrdtFactoryEventsRecord<C extends Crdt>
  extends CrdtEventsRecord {
  NewCrdt: NewCrdtEvent<C>;
}

// TODO: resets/canGC, to allow proper nesting?
// What would the use case and semantics be?
// TODO: use crdtConstructor type as generic type instead
// of explicitly separating args and C?  Makes using the
// type more intuitive.
export class CrdtFactory<TArgs extends any[], C extends Crdt> extends Crdt<
  CrdtFactoryEventsRecord<C>
> {
  private readonly children: Map<string, C> = new Map();

  /**
   * If you use the default argsSerializer, then args
   * (as an array) must be serializable with BSON.
   * In particular, undefined (e.g. due to optional
   * arguments), functions, and serializers
   * are not allowed.
   * TODO: nicer way to do this?
   * @param crdtConstructor [description]
   */
  constructor(
    private readonly crdtConstructor: (...args: TArgs) => C,
    private readonly argsSerializer: ElementSerializer<TArgs> = DefaultElementSerializer.getInstance()
  ) {
    super();
  }

  private ourCreatedCrdt: C | undefined = undefined;
  new(...args: TArgs): C {
    this.runtime.send(this, this.argsSerializer.serialize(args));
    let created = this.ourCreatedCrdt;
    if (created === undefined) {
      // TODO: use assertion instead
      throw new Error("Bug: created was undefined");
    }
    this.ourCreatedCrdt = undefined;
    return created;
  }

  protected receiveInternal(
    targetPath: string[],
    timestamp: CausalTimestamp,
    message: Uint8Array
  ): void {
    if (targetPath.length === 0) {
      // It's a new Crdt message.
      const args = this.argsSerializer.deserialize(message, this.runtime);
      const newCrdt = this.crdtConstructor(...args);
      // Add as child with "counter:sender" as id.  Similar
      // to CompositeCrdt#addChild.
      let name = timestamp.getSenderCounter() + ":" + timestamp.getSender();
      if (this.children.has(name)) {
        throw new Error(
          'Duplicate newCrdt name (was timestamp reused?): "' + name + '"'
        );
      }
      this.children.set(name, newCrdt);
      this.childBeingAdded = newCrdt;
      newCrdt.init(name, this);
      this.childBeingAdded = undefined;

      this.emit("NewCrdt", { caller: this, newCrdt, timestamp });

      if (timestamp.isLocal()) {
        this.ourCreatedCrdt = newCrdt;
      }
    } else {
      // Message for an existing child.  Proceed as in
      // CompositeCrdt.
      let child = this.children.get(targetPath[targetPath.length - 1]);
      if (child === undefined) {
        // TODO: deliver error somewhere reasonable
        throw new Error(
          "Unknown child: " +
            targetPath[targetPath.length - 1] +
            " in: " +
            JSON.stringify(targetPath) +
            ", children: " +
            JSON.stringify([...this.children.keys()])
        );
      }
      targetPath.length--;
      child.receive(targetPath, timestamp, message);
    }
  }

  private childBeingAdded?: C;
  onChildInit(child: Crdt) {
    if (child != this.childBeingAdded) {
      throw new Error(
        "this was passed to Crdt.init as parent externally" +
          " (use this.new or a CompositeCrdt instead)"
      );
    }
  }

  getDescendant(targetPath: string[]): Crdt<CrdtEventsRecord> {
    // Copied from CompositeCrdt.  TODO: unify implementations?
    if (targetPath.length === 0) return this;

    let child = this.children.get(targetPath[targetPath.length - 1]);
    if (child === undefined) {
      throw new Error(
        "Unknown child: " +
          targetPath[targetPath.length - 1] +
          " in: " +
          JSON.stringify(targetPath) +
          ", children: " +
          JSON.stringify([...this.children.keys()])
      );
    }
    targetPath.length--;
    return child.getDescendant(targetPath);
  }

  canGC(): boolean {
    return this.children.size === 0;
  }

  // /**
  //  * Constructor args must be serializable with the
  //  * default serializer (basically BSON).
  //  *
  //  * @param  [description]
  //  * @return          [description]
  //  */
  // static for<TArgs extends any[], C extends Crdt>(
  //   CrdtClass: ConstructorArgs<TArgs, C>
  // ): CrdtFactory<TArgs, C> {
  //   return new CrdtFactory((...args: TArgs) => new CrdtClass(...args));
  // }
}

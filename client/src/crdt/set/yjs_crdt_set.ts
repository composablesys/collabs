import {
  YjsCrdtSetMessage,
  YjsCrdtSetSave,
} from "../../../generated/proto_compiled";
import { CausalTimestamp } from "../../net";
import {
  arrayAsString,
  DefaultElementSerializer,
  ElementSerializer,
} from "../../util";
import { Crdt, CrdtParent } from "../core";
import { CrdtSet, CrdtSetEventsRecord } from "./interfaces";

// TODO: rename (odd to reference Yjs)

// TODO: allow args in create?
// Niche use case since you can just
// use CRDT ops a new value to do what you want, and
// requires adding an extra TArgs type param to the
// CrdtSet interface (since create() uses it).
/**
 * TODO: when you delete a Crdt, it is "frozen" -
 * no longer receives ops, doing ops locally causes an
 * error, not guaranteed EC.  Use has to check if it's
 * frozen.  Restore not allowed (2P-set semantics).
 *
 * TODO: in given constructor/its init function,
 * be careful not to use replica-specific info
 * (replicaId, runtime.getReplicaUniqueNumber()) -
 * it won't be consistent on different replicas.
 * If you need these, you must pass them yourself as
 * constructor args.  Likewise, if you are passed in a
 * reference to another Crdt, don't use its state to
 * set other parts of your own state; any such state
 * must instead be passed as a separate non-Crdt
 * constructor arg.
 */
export class YjsCrdtSet<C extends Crdt, CreateArgs extends any[] = []>
  extends Crdt<CrdtSetEventsRecord<C>>
  implements CrdtSet<C, CreateArgs>, CrdtParent
{
  // TODO: rename
  private readonly children: Map<string, C> = new Map();
  private readonly constructorArgs: Map<string, Uint8Array> = new Map();
  private initialValues: C[] | undefined;
  // TODO: for initialValues: give directly, or give args?
  constructor(
    private readonly valueCrdtConstructor: (...args: CreateArgs) => C,
    initialValues: C[] = [],
    private readonly argsSerializer: ElementSerializer<CreateArgs> = DefaultElementSerializer.getInstance()
  ) {
    super();
    this.initialValues = initialValues;
  }

  init(name: string, parent: CrdtParent) {
    super.init(name, parent);
    // Construct the initial values
    for (let i = 0; i < this.initialValues!.length; i++) {
      const newCrdt = this.initialValues![i];
      // Add as child with "["INIT", -i]" as id.
      // Similar to CompositeCrdt#addChild.
      let name = arrayAsString(
        YjsCrdtSet.nameSerializer.serialize(["INIT", -i])
      );
      if (this.children.has(name)) {
        throw new Error(
          '(initial value) Duplicate newCrdt name: "' + name + '"'
        );
      }
      this.children.set(name, newCrdt);
      this.childBeingAdded = newCrdt;
      newCrdt.init(name, this);
      this.childBeingAdded = undefined;

      // Initial values are not added to this.constructorArgs,
      // since they are passed to the constructor, hence
      // do not need to be saved.

      // TODO: is this needed?
      this.emit("ValueInit", { value: newCrdt });
    }
    delete this.initialValues;
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

  private static nameSerializer =
    DefaultElementSerializer.getInstance<[string, number]>();

  private ourCreatedCrdt: C | undefined = undefined;
  protected receiveInternal(
    targetPath: string[],
    timestamp: CausalTimestamp,
    message: Uint8Array
  ): void {
    if (targetPath.length === 0) {
      let decoded = YjsCrdtSetMessage.decode(message);
      switch (decoded.op) {
        case "create":
          const name = arrayAsString(
            YjsCrdtSet.nameSerializer.serialize([
              timestamp.getSender(),
              decoded.create!.replicaUniqueNumber,
            ])
          );
          const newCrdt = this.receiveCreate(name, decoded.create!.args);

          this.emit("ValueInit", { value: newCrdt });
          this.emit("Add", { value: newCrdt, timestamp });

          if (timestamp.isLocal()) {
            this.ourCreatedCrdt = newCrdt;
          }
          break;
        case "delete":
          const valueCrdt = this.children.get(decoded.delete);
          if (valueCrdt !== undefined) {
            this.children.delete(decoded.delete);
            this.constructorArgs.delete(decoded.delete);
            this.emit("Delete", { value: valueCrdt, timestamp });
          }
          break;
        default:
          throw new Error("Unknown decoded.op: " + decoded.op);
      }
    } else {
      // Message for an existing child.  Proceed as in
      // CompositeCrdt.
      let child = this.children.get(targetPath[targetPath.length - 1]);
      if (child === undefined) {
        // Assume it's a message for a deleted (hence
        // frozen) child.
        if (timestamp.isLocal()) {
          throw new Error(
            "Operation performed on deleted " +
              "(hence frozen) child of YjsCrdtSet, name: " +
              targetPath[targetPath.length - 1]
          );
        } else {
          // Ignore
          return;
        }
      }
      targetPath.length--;
      child.receive(targetPath, timestamp, message);
    }
  }

  private receiveCreate(name: string, serializedArgs: Uint8Array): C {
    const args = this.argsSerializer.deserialize(serializedArgs, this.runtime);
    const newCrdt = this.valueCrdtConstructor(...args);
    // Add as child with "[sender, counter]" as id.
    // Similar to CompositeCrdt#addChild.
    if (this.children.has(name)) {
      throw new Error('Duplicate newCrdt name: "' + name + '"');
    }
    this.children.set(name, newCrdt);
    this.childBeingAdded = newCrdt;
    newCrdt.init(name, this);
    this.childBeingAdded = undefined;

    // Record args for later save calls
    this.constructorArgs.set(name, serializedArgs);

    return newCrdt;
  }

  getChild(name: string): Crdt {
    const child = this.children.get(name);
    if (child === undefined) {
      // TODO: what to do here?
      // Assume it is a deleted (frozen) child.
      // It seems hard to prevent getDescendant calls
      // concurrent to a delete, which we want to return
      // a frozen Crdt instead of an error.  But we have
      // no way to construct a default frozen Crdt.
      // For now we just return null and hope that errors
      // will propagate if it is used.
      return null as unknown as Crdt;
    }
    return child;
  }

  canGc(): boolean {
    return this.children.size === 0;
  }

  create(...args: CreateArgs): C {
    // TODO: replica unique number makes the op non-pure.
    // But using senderCounter would be dangerous if we
    // runLocally, thus reusing timestamps, or if we
    // decide to reuse timestamps for batched messages.
    let message = YjsCrdtSetMessage.create({
      create: {
        replicaUniqueNumber: this.runtime.getReplicaUniqueNumber(),
        args: this.argsSerializer.serialize(args),
      },
    });
    this.runtime.send(this, YjsCrdtSetMessage.encode(message).finish());
    let created = this.ourCreatedCrdt;
    if (created === undefined) {
      // TODO: use assertion instead
      throw new Error("Bug: created was undefined");
    }
    this.ourCreatedCrdt = undefined;
    return created;
  }

  restore(_valueCrdt: C): this {
    throw new Error(
      "YjsCrdtSet.restore not supported" + " (deletes are permanent)"
    );
  }

  delete(valueCrdt: C): boolean {
    const had = this.has(valueCrdt);
    if (had) {
      let message = YjsCrdtSetMessage.create({
        delete: valueCrdt.name,
      });
      this.runtime.send(this, YjsCrdtSetMessage.encode(message).finish());
    }
    return had;
  }

  owns(valueCrdt: C): boolean {
    return valueCrdt.parent === this;
  }

  has(valueCrdt: C): boolean {
    this.checkOwns(valueCrdt);
    return this.children.has(valueCrdt.name);
  }

  get size(): number {
    return this.children.size;
  }

  values(): IterableIterator<C> {
    return this.children.values();
  }

  clear(): void {
    // TODO: optimize
    for (let value of this) this.delete(value);
  }

  reset(): void {
    this.clear();
  }

  /**
   * Returns a short unique identifier for valueCrdt
   * which can be passed to getByUid to retrieve
   * valueCrdt later.
   * @param  valueCrdt [description]
   * @return           [description]
   */
  uidOf(valueCrdt: C): string {
    this.checkOwns(valueCrdt);
    return valueCrdt.name;
  }

  /**
   * Returns the valueCrdt with the given uid, obtained
   * from uidOf.  If valueCrdt has been deleted, returns
   * undefined.
   *
   * @param  uid [description]
   * @return     [description]
   */
  getByUid(uid: string): C | undefined {
    return this.children.get(uid);
  }

  /**
   * Throws an error if !this.owns(valueCrdt).
   */
  protected checkOwns(valueCrdt: C) {
    if (!this.owns(valueCrdt)) {
      throw new Error("valueCrdt is not owned by this CrdtSet");
    }
  }

  [Symbol.iterator](): IterableIterator<C> {
    return this.values();
  }

  *entries(): IterableIterator<[C, C]> {
    for (let value of this.values()) {
      yield [value, value];
    }
  }

  keys(): IterableIterator<C> {
    return this.values();
  }

  save(): [saveData: Uint8Array, children: Map<string, Crdt>] {
    const saveMessage = YjsCrdtSetSave.create({
      // Note this will be in insertion order because
      // Map iterators run in insertion order.
      constructorArgs: [...this.constructorArgs].map(([name, args]) => {
        return {
          name,
          args,
        };
      }),
    });
    return [YjsCrdtSetSave.encode(saveMessage).finish(), this.children];
  }

  load(saveData: Uint8Array) {
    const saveMessage = YjsCrdtSetSave.decode(saveData);
    // Construct the children in the order given in
    // saveMessage, which is the same as the order they
    // were created on the saved replica, since Map
    // iterators run in insertion order.  That means that
    // if deserializing the createArgs causes getChild
    // to be called on this, that child will have
    // already been initialized, so the call will
    // succeed uneventfully.
    for (const { name, args } of saveMessage.constructorArgs) {
      this.receiveCreate(name, args);
    }
  }
}

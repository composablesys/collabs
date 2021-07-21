import {
  DeletingMutCSetMessage,
  DeletingMutCSetSave,
} from "../../../generated/proto_compiled";
import { CausalTimestamp } from "../../net";
import {
  arrayAsString,
  DefaultElementSerializer,
  ElementSerializer,
  stringAsArray,
} from "../../util";
import { Crdt, CrdtParent } from "../core";
import { Resettable } from "../helper_crdts";
import { AbstractCSetCrdt } from "./abstract_set";

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
export class DeletingMutCSet<C extends Crdt, AddArgs extends any[] = []>
  extends AbstractCSetCrdt<C, AddArgs>
  implements Resettable, CrdtParent
{
  private readonly children: Map<string, C> = new Map();
  // constructorArgs are saved for later save calls
  private readonly constructorArgs: Map<string, Uint8Array> = new Map();
  private initialValuesArgs?: AddArgs[];

  constructor(
    private readonly valueConstructor: (sender: string, ...args: AddArgs) => C,
    initialValuesArgs: AddArgs[] = [],
    private readonly argsSerializer: ElementSerializer<AddArgs> = DefaultElementSerializer.getInstance()
  ) {
    super();
    this.initialValuesArgs = initialValuesArgs;
  }

  init(name: string, parent: CrdtParent) {
    super.init(name, parent);

    // Create the initial values from initialValuesArgs
    for (let i = 0; i < this.initialValuesArgs!.length; i++) {
      const args = this.initialValuesArgs![i];
      // TODO: what name to use?  ""?  Regardless, should
      // make it a constant on Runtime, to prevent magic
      // strings.
      const name = arrayAsString(
        DeletingMutCSet.nameSerializer.serialize(["INIT", i])
      );
      this.receiveCreate(
        name,
        "INIT",
        this.argsSerializer.serialize(args),
        args,
        true
      );
    }
    delete this.initialValuesArgs;
  }

  private childBeingAdded?: C;
  onChildInit(child: Crdt) {
    if (child != this.childBeingAdded) {
      throw new Error(
        "this was passed to Crdt.init as parent externally" +
          " (use this.add or a CompositeCrdt instead)"
      );
    }
  }

  private static nameSerializer =
    DefaultElementSerializer.getInstance<[string, number]>();

  private ourCreatedValue?: C;
  protected receiveInternal(
    targetPath: string[],
    timestamp: CausalTimestamp,
    message: Uint8Array
  ): void {
    if (targetPath.length === 0) {
      let decoded = DeletingMutCSetMessage.decode(message);
      switch (decoded.op) {
        case "add":
          const name = arrayAsString(
            DeletingMutCSet.nameSerializer.serialize([
              timestamp.getSender(),
              decoded.add!.replicaUniqueNumber,
            ])
          );
          const newValue = this.receiveCreate(
            timestamp.getSender(),
            name,
            decoded.add!.args
          );

          this.emit("Add", { value: newValue, timestamp });

          if (timestamp.isLocal()) {
            this.ourCreatedValue = newValue;
          }
          break;
        case "delete":
          const child = this.children.get(decoded.delete);
          if (child !== undefined) {
            this.children.delete(decoded.delete);
            this.constructorArgs.delete(decoded.delete);
            this.emit("Delete", { value: child, timestamp });
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
              "(hence frozen) child of DeletingMutCSet, name: " +
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

  private receiveCreate(
    name: string,
    sender: string,
    serializedArgs: Uint8Array,
    args: AddArgs | undefined = undefined,
    isInitialValue = false
  ): C {
    if (args === undefined) {
      args = this.argsSerializer.deserialize(serializedArgs, this.runtime);
    }
    const newValue = this.valueConstructor(sender, ...args);
    // Add as child with "[sender, counter]" as id.
    // Similar to CompositeCrdt#addChild.
    if (this.children.has(name)) {
      throw new Error('Duplicate newValue name: "' + name + '"');
    }
    this.children.set(name, newValue);
    if (!isInitialValue) {
      // Initial values are not saved, since they are created
      // as part of initialization.
      this.constructorArgs.set(name, serializedArgs);
    }
    this.childBeingAdded = newValue;
    newValue.init(name, this);
    this.childBeingAdded = undefined;

    // Emit this even during loading, since the user may
    // need to add event listeners, and it is not associated
    // to a timestamp anyway.
    this.emit("ValueInit", { value: newValue });

    return newValue;
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
      // Perhaps return a proxy that gives errors on every call?
      return null as unknown as Crdt;
    }
    return child;
  }

  canGc(): boolean {
    return this.children.size === 0;
  }

  add(...args: AddArgs): C {
    let message = DeletingMutCSetMessage.create({
      add: {
        replicaUniqueNumber: this.runtime.getReplicaUniqueNumber(),
        args: this.argsSerializer.serialize(args),
      },
    });
    this.runtime.send(this, DeletingMutCSetMessage.encode(message).finish());
    let created = this.ourCreatedValue;
    delete this.ourCreatedValue;
    return created!;
  }

  delete(value: C): void {
    if (this.has(value)) {
      let message = DeletingMutCSetMessage.create({
        delete: value.name,
      });
      this.runtime.send(this, DeletingMutCSetMessage.encode(message).finish());
    }
  }

  /**
   * Returns whether the given value was created by this
   * set, regardless of whether it is still present.
   */
  owns(value: C): boolean {
    return value.parent === this;
  }

  has(value: C): boolean {
    return this.owns(value) && this.children.has(value.name);
  }

  values(): IterableIterator<C> {
    return this.children.values();
  }

  get size(): number {
    return this.children.size;
  }

  // TODO: optimize clear

  reset(): void {
    // This is semantically an observed-reset: it removes
    // all causally prior add operations from the history.
    // It is also causes any messages on those
    // added values to be ignored, but that is the same thing
    // that would happen if we processed the message history
    // consisting only of messages concurrent to this message.
    this.clear();
  }

  /**
   * Returns a short unique identifier for value
   * which can be passed to getById to retrieve
   * value later.
   * @param  value [description]
   * @return           [description]
   * @throws if !this.owns(value)
   */
  idOf(value: C): string {
    if (!this.owns(value)) {
      throw new Error("this.owns(value) is false");
    }
    return value.name;
  }

  /**
   * Returns the value with the given uid, obtained
   * from idOf.  If value has been deleted, returns
   * undefined.
   *
   * @param  uid [description]
   * @return     [description]
   */
  getById(id: string): C | undefined {
    return this.children.get(id);
  }

  save(): [saveData: Uint8Array, children: Map<string, Crdt>] {
    const saveMessage = DeletingMutCSetSave.create({
      // Note this will be in insertion order because
      // Map iterators run in insertion order.
      constructorArgs: [...this.constructorArgs].map(([name, args]) => {
        return {
          name: stringAsArray(name),
          args,
        };
      }),
    });
    return [DeletingMutCSetSave.encode(saveMessage).finish(), this.children];
  }

  load(saveData: Uint8Array) {
    const saveMessage = DeletingMutCSetSave.decode(saveData);
    // Construct the children in the order given in
    // saveMessage, which is the same as the order they
    // were created on the saved replica, since Map
    // iterators run in insertion order.  That means that
    // if deserializing the createArgs causes getChild
    // to be called on this, that child will have
    // already been initialized, so the call will
    // succeed uneventfully.
    for (const { name, args } of saveMessage.constructorArgs) {
      const sender = DeletingMutCSet.nameSerializer.deserialize(
        name,
        this.runtime
      )[0];
      this.receiveCreate(arrayAsString(name), sender, args);
    }
  }
}

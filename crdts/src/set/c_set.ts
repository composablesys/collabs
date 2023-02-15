import {
  AbstractSet_Collab,
  Collab,
  CollabEventsRecord,
  CollabID,
  collabIDOf,
  DefaultSerializer,
  InitToken,
  IParent,
  MetaRequest,
  Parent,
  SavedStateTree,
  Serializer,
  UpdateMeta,
} from "@collabs/core";
import { CSetMessage, CSetSave } from "../../generated/proto_compiled";

/**
 * A set of mutable values, each represented by a [[Collab]] of type `C`.
 *
 * Because the values are Collabs, you can't add a new value by sending
 * it over the network directly. Instead, you supply arbitrary AddArgs
 * to [[add]], which sends those values over the network. Then all replicas
 * construct the actual value - replicas of a new Collab - by calling
 * the `valueConstructor` callback that you supply in the constructor.
 * See the constructor's docs for an example.
 *
 * When a value is deleted with [[delete]], it is deleted permanently and
 * can no longer be used; future and concurrent operations on that value
 * are ignored. (Local operations will succeed but will not be propagated to
 * remote replicas.) You can perform cleanup in [[Collab.finalize]] (called
 * just after the "Delete" event) or in a "Delete" event handler.
 */
export class CSet<C extends Collab, AddArgs extends unknown[]>
  extends AbstractSet_Collab<C, AddArgs>
  implements IParent
{
  private readonly children: Map<string, C> = new Map();
  // constructorArgs are saved for later save calls
  private readonly constructorArgs: Map<string, Uint8Array> = new Map();

  private readonly argsSerializer: Serializer<AddArgs>;

  /**
   * Constructs a [[CSet]] with the given valueConstructor and
   * optional arguments.
   *
   * The valueConstructor is a callback used to construct newly inserted
   * values. It takes arbitrary AddArgs, plus an [[InitToken]], and returns
   * a new value replica. For example, with value type [[CCounter]],
   * and taking an initial value as
   * the AddArgs (`AddArgs = [initialValue: number]`):
   * ```
   * import * as collabs from "@collabs/collabs";
   * // ...
   *
   * function valueConstructor(valueInit: collabs.InitToken, initialValue: number) {
   *   return new collabs.CCounter(valueInit, initialValue);
   * }
   * // app is a CRDTApp or CRDTContainer
   * const set = app.registerCollab(
   *   "set",
   *   (init) => new collabs.CSet(init, valueConstructor)
   * );
   * ```
   * Then when any replica calls `list.add(initialValue)`, e.g. in response to
   * a user button click, all replicas run `valueConstructor` to create
   * a new counter value. These values are all linked, i.e., they
   * start with the same value (`initialValue`) and replicate each other's operations.
   *
   * For more info, see the [Guide](../../../guide/initialization.html#dynamically-created-collabs).
   *
   * @param init         [description]
   * @param valueConstructor  [description]
   * @param argsSerializer = DefaultSerializer.getInstance() Optional,
   * use this to specify a custom [[Serializer]] for InsertArgs.\
   */
  constructor(
    init: InitToken,
    private readonly valueConstructor: (
      valueInit: InitToken,
      ...args: AddArgs
    ) => C,
    options: { argsSerializer?: Serializer<AddArgs> } = {}
  ) {
    super(init);

    this.argsSerializer =
      options.argsSerializer ?? DefaultSerializer.getInstance();
  }

  /**
   * A deleted child that is sending a message. This var is used to
   * pass the child from childSend to receive so that we
   * can deliver the message successfully despite not keeping the
   * child around in this.children.
   */
  private deletedSendingChild?: C = undefined;

  childSend(
    child: Collab,
    messageStack: (Uint8Array | string)[],
    metaRequests: MetaRequest[]
  ): void {
    if (child.parent !== this) {
      throw new Error(`childSend called by non-child: ${child}`);
    }

    // OPT: Should we avoid this redundant Map lookup by storing the child
    // regardless?
    if (!this.children.has(child.name)) {
      this.deletedSendingChild = <C>child;
    }

    messageStack.push(child.name);
    this.send(messageStack, metaRequests);
  }

  // Vars used to return the newly-added value in add().
  private inAdd = false;
  private ourCreatedValue?: C = undefined;

  receive(messageStack: (Uint8Array | string)[], meta: UpdateMeta): void {
    const lastMessage = messageStack.pop()!;
    if (typeof lastMessage === "string") {
      // Message for an existing child.  Proceed as in
      // CObject.
      let child = this.children.get(lastMessage);
      if (child === undefined) {
        // Assume it's a message for a deleted (hence
        // frozen) child.
        if (this.deletedSendingChild !== undefined) {
          // Deliver the message locally so that the child ops go through,
          // preventing errors from chained ops.
          child = this.deletedSendingChild;
          this.deletedSendingChild = undefined;
        } else {
          // Ignore.
          return;
        }
      }
      child.receive(messageStack, meta);
    } else {
      const decoded = CSetMessage.decode(lastMessage);
      switch (decoded.op) {
        case "add": {
          const name = this.makeName(
            meta.senderID,
            decoded.add!.replicaUniqueNumber
          );
          const newValue = this.receiveCreate(
            name,
            decoded.add!.args,
            undefined,
            false
          );

          if (this.inAdd) {
            this.ourCreatedValue = newValue;
          }

          this.emit("Add", {
            value: newValue,
            meta,
          });
          break;
        }
        case "delete": {
          const child = this.children.get(decoded.delete);
          if (child !== undefined) {
            this.children.delete(decoded.delete);
            this.constructorArgs.delete(decoded.delete);

            this.emit("Delete", {
              value: child,
              meta,
            });
            child.finalize();
          }
          break;
        }
        default:
          throw new Error(`Unknown decoded.op: ${decoded.op}`);
      }
    }
  }

  private receiveCreate(
    name: string,
    serializedArgs: Uint8Array | undefined,
    args: AddArgs | undefined = undefined,
    isInitialValue: boolean
  ): C {
    if (args === undefined) {
      args = this.argsSerializer.deserialize(serializedArgs!);
    }
    // Add as child with "[sender, counter]" as id.
    // Similar to CObject#addChild.
    if (this.children.has(name)) {
      throw new Error('Duplicate newValue name: "' + name + '"');
    }
    const newValue = this.valueConstructor(new InitToken(name, this), ...args);

    this.children.set(name, newValue);
    if (!isInitialValue) {
      // Save the constuctor args.
      // Not needed for initial values, since they are created
      // as part of initialization.
      this.constructorArgs.set(name, serializedArgs!);
    }

    return newValue;
  }

  private makeName(sender: string, counter: number) {
    // OPT: shorten (base128 instead of base36)
    return `${counter.toString(36)},${sender}`;
  }

  add(...args: AddArgs): C {
    this.inAdd = true;
    const message = CSetMessage.create({
      add: {
        replicaUniqueNumber: this.runtime.nextLocalCounter(),
        args: this.argsSerializer.serialize(args),
      },
    });
    this.send([CSetMessage.encode(message).finish()], []);
    const created = this.ourCreatedValue!;
    this.ourCreatedValue = undefined;
    this.inAdd = false;
    return created;
  }

  delete(value: C): void {
    if (this.has(value)) {
      const message = CSetMessage.create({
        delete: value.name,
      });
      this.send([CSetMessage.encode(message).finish()], []);
    }
  }

  // OPT: better clear()

  has(value: C): boolean {
    return value.parent === this && this.children.has(value.name);
  }

  values(): IterableIterator<C> {
    return this.children.values();
  }

  get size(): number {
    return this.children.size;
  }

  /**
   * @param  value [description]
   * @return the AddArgs used to add value
   * @throws if !this.has(value) or if value is an initialValue
   * (those args aren't retained, for efficiency)
   */
  getArgs(value: C): AddArgs {
    if (!this.has(value)) {
      throw new Error("this.has(value) is false");
    }
    const argsSerialized = this.constructorArgs.get(value.name);
    if (argsSerialized === undefined) {
      throw new Error("Cannot call argsOf on initial value");
    }
    return this.argsSerializer.deserialize(argsSerialized);
  }

  save(): SavedStateTree | null {
    if (this.canGC()) return null;

    // Note this will be in insertion order because
    // Map iterators run in insertion order.
    const args = new Array<Uint8Array>(this.size);
    const childSaves = new Map<string, SavedStateTree | null>();
    let i = 0;
    for (const [name, child] of this.children) {
      args[i] = this.constructorArgs.get(name)!;
      childSaves.set(name, child.save());
      i++;
    }
    const saveMessage = CSetSave.create({ args });
    return {
      self: CSetSave.encode(saveMessage).finish(),
      children: childSaves,
    };
  }

  load(savedStateTree: SavedStateTree, meta: UpdateMeta): void {
    const saveMessage = CSetSave.decode(savedStateTree.self!);
    const childSaves = savedStateTree.children!;

    // Create children.
    let i = 0;
    for (const name of childSaves.keys()) {
      this.receiveCreate(name, saveMessage.args[i], undefined, false);
      i++;
    }

    // Load children.
    for (const [name, childSave] of childSaves) {
      if (childSave !== null) {
        this.children.get(name)!.load(childSave, meta);
      }
    }
  }

  idOf<C extends Collab>(descendant: C): CollabID<C> {
    return collabIDOf(descendant, this);
  }

  fromID<D extends Collab<CollabEventsRecord>>(
    id: CollabID<D>,
    startIndex = 0
  ): D | undefined {
    const name = id.namePath[startIndex];
    const child = this.children.get(name) as Collab;
    if (child === undefined) {
      // Assume it is a deleted child.
      return undefined;
    }

    // Terminal case.
    // Note that this cast is unsafe, but convenient.
    if (startIndex === id.namePath.length - 1) return child as D;
    // Recursive case.
    if ((child as Parent).fromID === undefined) {
      throw new Error("child is not a parent, but CollabID is its descendant");
    }
    return (child as Parent).fromID(id, startIndex + 1);
  }

  canGC(): boolean {
    return this.size === 0;
  }
}

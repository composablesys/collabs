import {
  Collab,
  ICollabParent,
  InitToken,
  MessageMeta,
  Message,
  AbstractCSetCollab,
  Serializer,
  DefaultSerializer,
  makeUID,
  Optional,
} from "@collabs/core";
import {
  DeletingMutCSetMessage,
  DeletingMutCSetSave,
  IDeletingMutCSetValueSave,
} from "../../generated/proto_compiled";

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
 * are ignored. See [[ArchivingMutCSet]] for an alternative semantics.
 */
export class DeletingMutCSet<C extends Collab, AddArgs extends unknown[]>
  extends AbstractCSetCollab<C, AddArgs>
  implements ICollabParent 
{
  private readonly children: Map<string, C> = new Map();
  // constructorArgs are saved for later save calls
  private readonly constructorArgs: Map<string, Uint8Array> = new Map();
  private readonly initialValuesCount: number;

  /**
   * Constructs a [[DeletingMutCSet]] with the given valueConstructor and
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
   * function valueConstructor(valueInitToken: collabs.InitToken, initialValue: number) {
   *   return new collabs.CCounter(valueInitToken, initialValue);
   * }
   * // app is a CRDTApp or CRDTContainer
   * const set = app.registerCollab(
   *   "set",
   *   (initToken) => new collabs.DeletingMutCSet(initToken, valueConstructor)
   * );
   * ```
   * Then when any replica calls `list.add(initialValue)`, e.g. in response to
   * a user button click, all replicas run `valueConstructor` to create
   * a new counter value. These values are all linked, i.e., they
   * start with the same value (`initialValue`) and replicate each other's operations.
   *
   * For more info, see the [Guide](../../../guide/initialization.html#dynamically-created-collabs).
   *
   * @param initToken         [description]
   * @param valueConstructor  [description]
   * @param initialValuesArgs = [] Optional, use this to specify AddArgs for
   * initial values that are present when the list is created.
   * @param argsSerializer = DefaultSerializer.getInstance() Optional,
   * use this to specify a custom [[Serializer]] for InsertArgs.
   */
  constructor(
    initToken: InitToken,
    private readonly valueConstructor: (
      valueInitToken: InitToken,
      ...args: AddArgs
    ) => C,
    initialValuesArgs: AddArgs[] = [],
    private readonly argsSerializer: Serializer<AddArgs> = DefaultSerializer.getInstance()
  ) {
    super(initToken);

    // Create the initial values from initialValuesArgs.
    for (let i = 0; i < initialValuesArgs.length; i++) {
      const args = initialValuesArgs[i];
      // Using name "INIT" is a hack; need to figure out
      // a proper way to do this when implementing
      // initial values generally.
      const name = makeUID("INIT", i);
      this.receiveCreate(name, undefined, args, true, false);
    }
    this.initialValuesCount = initialValuesArgs.length;
  }

  /**
   * A deleted child that is sending a message. This var is used to
   * pass the child from childSend to receive so that we
   * can deliver the message successfully despite not keeping the
   * child around in this.children.
   */
  private deletedSendingChild?: C = undefined;

  childSend(child: Collab, messagePath: Message[]): void {
    if (child.parent !== this) {
      throw new Error(`childSend called by non-child: ${child}`);
    }

    // OPT: Should we avoid this redundant Map lookup by storing the child
    // regardless?
    if (!this.children.has(child.name)) {
      this.deletedSendingChild = <C>child;
    }

    messagePath.push(child.name);
    this.send(messagePath);
  }

  private ourCreatedValue?: C = undefined;
  receive(messagePath: Message[], meta: MessageMeta): void {
    const lastMessage = messagePath[messagePath.length - 1];
    if (typeof lastMessage === "string") {
      // Message for an existing child.  Proceed as in
      // CObject.
      let child = this.children.get(lastMessage);
      if (child === undefined) {
        // Assume it's a message for a deleted (hence
        // frozen) child.
        if (meta.isLocalEcho) {
          // Deliver the message locally so that the child ops go through,
          // preventing errors from chained ops.
          if (this.deletedSendingChild !== undefined) {
            child = this.deletedSendingChild;
            this.deletedSendingChild = undefined;
          } else {
            throw new Error(
              "Received local echo for deleted child, but this.deletedSendingChild is undefined"
            );
          }
        } else {
          // Ignore.
          return;
        }
      }
      messagePath.length--;
      child.receive(messagePath, meta);
    } else {
      const decoded = DeletingMutCSetMessage.decode(<Uint8Array>lastMessage);
      switch (decoded.op) {
        case "add": {
          const name = makeUID(meta.sender, decoded.add!.replicaUniqueNumber);
          const newValue = this.receiveCreate(
            name,
            decoded.add!.args,
            undefined,
            false,
            false
          );

          if (meta.isLocalEcho) {
            // Previously we also did this if runLocally
            // was true; see https://github.com/composablesys/collabs/issues/172
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
    isInitialValue: boolean,
    inLoad: boolean
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
      if (!inLoad) {
        // Not an initial value and not currently loading =>
        // this has already been loaded.
        // Since the value is new with no prior saved state,
        // we need to call value.load(null) to indicate that
        // newValue skipped loading.
        newValue.load(Optional.empty());
      }
      // Save the constuctor args.
      // Not needed for initial values, since they are created
      // as part of initialization.
      this.constructorArgs.set(name, serializedArgs!);
    }

    return newValue;
  }

  /**
   * No added context.
   *
   * @return undefined
   */
  getAddedContext(_key: symbol): unknown {
    return undefined;
  }

  add(...args: AddArgs): C {
    const message = DeletingMutCSetMessage.create({
      add: {
        replicaUniqueNumber: this.runtime.getReplicaUniqueNumber(),
        args: this.argsSerializer.serialize(args),
      },
    });
    this.send([DeletingMutCSetMessage.encode(message).finish()]);
    const created = this.ourCreatedValue;
    this.ourCreatedValue = undefined;
    return created!;
  }

  /**
   * Experimental; subject to removal.
   *
   * This was added for the rich-text-yata demo, which
   * requires a "pure" (in the sense of pure op-based CRDTs)
   * add method, in order to work with runLocally.
   *
   * (TODO: remove or clarify.)
   */
  pureAdd(uniqueNumber: number, ...args: AddArgs): C {
    const message = DeletingMutCSetMessage.create({
      add: {
        replicaUniqueNumber: uniqueNumber,
        args: this.argsSerializer.serialize(args),
      },
    });
    this.send([DeletingMutCSetMessage.encode(message).finish()]);
    const created = this.ourCreatedValue;
    this.ourCreatedValue = undefined;
    return created!;
  }

  delete(value: C): void {
    if (this.has(value)) {
      const message = DeletingMutCSetMessage.create({
        delete: value.name,
      });
      this.send([DeletingMutCSetMessage.encode(message).finish()]);
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

  save(): Uint8Array {
    // Note this will be in insertion order (remaining initial
    // values first) because
    // Map iterators run in insertion order.
    const valueSaves = new Array<IDeletingMutCSetValueSave>(this.children.size);
    let i = 0;
    for (const [name, child] of this.children) {
      valueSaves[i] = {
        name,
        saveData: child.save(),
        args: this.constructorArgs.get(name),
      };
      i++;
    }
    const saveMessage = DeletingMutCSetSave.create({ valueSaves });
    return DeletingMutCSetSave.encode(saveMessage).finish();
  }

  load(saveData: Optional<Uint8Array>): void {
    if (!saveData.isPresent) {
      // Indicates skipped loading. Pass on the message.
      for (const child of this.children.values()) child.load(saveData);
    } else {
      const saveMessage = DeletingMutCSetSave.decode(saveData.get());
      // Delete initial values (our current values) that
      // were deleted before the save.
      const remainingInitialValues = new Set<string>();
      let i = 0;
      for (; i < saveMessage.valueSaves.length; i++) {
        const valueSave = saveMessage.valueSaves[i];
        if (Object.prototype.hasOwnProperty.call(valueSave, "args")) {
          // Reached end of initial values' saves.
          break;
        }
        remainingInitialValues.add(valueSave.name);
      }
      for (const initialValue of this.children.keys()) {
        if (!remainingInitialValues.has(initialValue)) {
          this.children.delete(initialValue);
        }
      }
      // Create non-initial values.
      for (; i < saveMessage.valueSaves.length; i++) {
        const valueSave = saveMessage.valueSaves[i];
        this.receiveCreate(
          valueSave.name,
          valueSave.args!,
          undefined,
          false,
          true
        );
      }
      // Load all children (initial or not).
      for (const valueSave of saveMessage.valueSaves) {
        this.children
          .get(valueSave.name)!
          .load(Optional.of(valueSave.saveData));
      }
    }
  }

  getDescendant(namePath: string[]): Collab | undefined {
    if (namePath.length === 0) return this;

    const name = namePath[namePath.length - 1];
    const child = this.children.get(name);
    if (child === undefined) {
      // Assume it is a deleted (frozen) child.
      return undefined;
    }
    namePath.length--;
    return child.getDescendant(namePath);
  }

  canGC(): boolean {
    // To be in the initial state:
    // 1. All values except the initial ones must be deleted.
    // Such values are except those referenced by constructorArgs.
    if (this.constructorArgs.size === 0) {
      // 2. All initial values must still be present.
      if (this.size === this.initialValuesCount) {
        // 3. All initial values must canGC().
        for (const value of this.values()) {
          if (!value.canGC()) return false;
        }
        return true;
      }
    }
    return false;
  }
}

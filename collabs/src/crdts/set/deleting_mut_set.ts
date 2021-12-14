import {
  DeletingMutCSetMessage,
  DeletingMutCSetSave,
  IDeletingMutCSetValueSave,
} from "../../../generated/proto_compiled";
import { bytesAsString, DefaultSerializer } from "../../util";
import {
  Collab,
  InitToken,
  MessageMeta,
  ParentCollab,
  Runtime,
  Serializer,
} from "../../core";
import { AbstractCSetCollab } from "./abstract_set";
import { Resettable } from "../../abilities";

class FakeDeletedCollab extends Collab {
  private constructor(initToken: InitToken) {
    super(initToken);
  }

  protected receiveInternal(): void {
    throw new Error("Collab has been deleted from DeletingMutCSet and is frozen");
  }
  save(): Uint8Array {
    throw new Error("Collab has been deleted from DeletingMutCSet and is frozen");
  }
  load(): void {
    throw new Error("Collab has been deleted from DeletingMutCSet and is frozen");
  }
  getDescendant(): Collab {
    throw new Error("Collab has been deleted from DeletingMutCSet and is frozen");
  }
  canGc(): boolean {
    throw new Error("Collab has been deleted from DeletingMutCSet and is frozen");
  }

  /**
   * Used in getChild when the requested Collab is deleted/
   * frozen.  See the comment there.
   */
  static of(initToken: InitToken): FakeDeletedCollab {
    const fakeDeletedCollab = new FakeDeletedCollab(initToken);
    return new Proxy(fakeDeletedCollab, {
      get: function (target, p) {
        if (p in target) {
          // Do the behavior defined by FakeDeletedCollab.
          return (target as any)[p];
        } else {
          throw new Error(
            "Collab has been deleted from DeletingMutCSet and is frozen"
          );
        }
      },

      set: function (target, p, value) {
        if (p in target) {
          // Do the behavior defined by FakeDeletedCollab.
          (target as any)[p] = value;
          return true;
        } else {
          throw new Error(
            "Collab has been deleted from DeletingMutCSet and is frozen"
          );
        }
      },
    });
  }
}

/**
 * Warning: when you delete a Collab, it is "frozen" -
 * no longer receives ops, doing ops locally causes an
 * error, not guaranteed EC.  Use has to check if it's
 * frozen.  Restore not allowed (2P-set semantics).
 *
 * Warning: in given constructor/its init function,
 * be careful not to use replica-specific info
 * (replicaId, runtime.getReplicaUniqueNumber()) -
 * it won't be consistent on different replicas.
 * If you need these, you must pass them yourself as
 * constructor args.  Likewise, if you are passed in a
 * reference to another Collab, don't use its state to
 * set other parts of your own state; any such state
 * must instead be passed as a separate non-Collab
 * constructor arg.
 */
export class DeletingMutCSet<C extends Collab, AddArgs extends any[]>
  extends AbstractCSetCollab<C, AddArgs>
  implements ParentCollab, Resettable
{
  private readonly children: Map<string, C> = new Map();
  // constructorArgs are saved for later save calls
  private readonly constructorArgs: Map<string, Uint8Array> = new Map();
  private readonly initialValuesCount: number;

  /**
   * [constructor description]
   * @param initToken                [description]
   * @param readonlyvalueConstructor [description]
   * @param initialValues to get the created values,
   * call this.value() right after construction.  The
   * iterator will return them in the order given by initialValuesArgs.
   */
  constructor(
    initToken: InitToken,
    private readonly valueConstructor: (
      valueInitToken: InitToken,
      ...args: AddArgs
    ) => C,
    initialValuesArgs: AddArgs[] = [],
    private readonly argsSerializer: Serializer<AddArgs> = DefaultSerializer.getInstance(
      initToken.runtime
    )
  ) {
    super(initToken);

    // Create the initial values from initialValuesArgs.
    for (let i = 0; i < initialValuesArgs.length; i++) {
      const args = initialValuesArgs[i];
      // TODO: Using name "INIT" is a hack; need to figure out
      // a proper way to do this when implementing
      // initial values generally.
      const name = bytesAsString(
        DeletingMutCSet.nameSerializer.serialize(["INIT", i])
      );
      this.receiveCreate(name, undefined, args, true);
    }
    this.initialValuesCount = initialValuesArgs.length;
  }

  childSend(child: Collab, messagePath: (string | Uint8Array)[]): void {
    if (child.parent !== this) {
      throw new Error("childSend called by non-child: " + child);
    }

    messagePath.push(child.name);
    this.send(messagePath);
  }

  nextMessageMeta(): MessageMeta {
    return this.parent.nextMessageMeta();
  }

  // TODO: less hacky way to use Default when you don't have a runtime?
  // Although really this should have its own serializer.
  private static nameSerializer = DefaultSerializer.getInstance<
    [string, number]
  >(undefined as unknown as Runtime);

  private ourCreatedValue?: C = undefined;
  protected receiveInternal(
    messagePath: (Uint8Array | string)[],
    meta: MessageMeta
  ): void {
    const lastMessage = messagePath[messagePath.length - 1];
    if (typeof lastMessage === "string") {
      // Message for an existing child.  Proceed as in
      // CObject.
      let child = this.children.get(lastMessage);
      if (child === undefined) {
        // Assume it's a message for a deleted (hence
        // frozen) child.
        if (meta.isLocal) {
          throw new Error(
            "Operation performed on deleted " +
              "(hence frozen) child of DeletingMutCSet, name: " +
              lastMessage
          );
        } else {
          // Ignore
          return;
        }
      }
      messagePath.length--;
      child.receive(messagePath, meta);
    } else {
      let decoded = DeletingMutCSetMessage.decode(lastMessage);
      switch (decoded.op) {
        case "add":
          const name = bytesAsString(
            DeletingMutCSet.nameSerializer.serialize([
              meta.sender,
              decoded.add!.replicaUniqueNumber,
            ])
          );
          const newValue = this.receiveCreate(name, decoded.add!.args);

          if (meta.isLocal) {
            // TODO: previously we also did this if runLocally
            // was true.
            this.ourCreatedValue = newValue;
          }

          this.emit("Add", {
            value: newValue,
            meta,
          });
          break;
        case "delete":
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
        default:
          throw new Error("Unknown decoded.op: " + decoded.op);
      }
    }
  }

  private receiveCreate(
    name: string,
    serializedArgs: Uint8Array | undefined,
    args: AddArgs | undefined = undefined,
    isInitialValue = false
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
      // Initial values are not saved, since they are created
      // as part of initialization.
      this.constructorArgs.set(name, serializedArgs!);
    }

    return newValue;
  }

  add(...args: AddArgs): C {
    let message = DeletingMutCSetMessage.create({
      add: {
        replicaUniqueNumber: this.runtime.getReplicaUniqueNumber(),
        args: this.argsSerializer.serialize(args),
      },
    });
    this.send([DeletingMutCSetMessage.encode(message).finish()]);
    let created = this.ourCreatedValue;
    this.ourCreatedValue = undefined;
    return created!;
  }

  // TODO
  pureAdd(uniqueNumber: number, ...args: AddArgs): C {
    let message = DeletingMutCSetMessage.create({
      add: {
        replicaUniqueNumber: uniqueNumber,
        args: this.argsSerializer.serialize(args),
      },
    });
    this.send([DeletingMutCSetMessage.encode(message).finish()]);
    let created = this.ourCreatedValue;
    this.ourCreatedValue = undefined;
    return created!;
  }

  delete(value: C): void {
    if (this.has(value)) {
      let message = DeletingMutCSetMessage.create({
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
   *
   * Although identifier has type
   * string, it is properly a byte array, not
   * necessarily valid UTF-8.  So it should be serialized
   * as a byte array (using stringAsBytes), not a string.
   *
   * TODO: remove in favor of BaseSerializer(this)?
   * Although then if you need strings like in YATA,
   * you end up redundantly converting the string names
   * to arrays and back.
   *
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

  /**
   * Map from child names to their saveData, containing
   * precisely the children that have not yet initiated loading.
   * null if we are not currently loading children.
   */
  private pendingChildSaves: Map<string, Uint8Array> | null = null;

  load(saveData: Uint8Array | null): void {
    if (saveData === null) {
      // Indicates skipped loading. Pass on the message.
      for (const child of this.children.values()) child.load(null);
    } else {
      const saveMessage = DeletingMutCSetSave.decode(saveData);
      // As in CObject, prepare this.pendingChildSaves in
      // case this.getDescendant is called during loading.
      this.pendingChildSaves = new Map();
      for (const valueSave of saveMessage.valueSaves) {
        this.pendingChildSaves.set(valueSave.name, valueSave.saveData);
      }
      // Delete initial values (our current values) that
      // were deleted before the save.
      const remainingInitialValues = new Set<string>();
      let i = 0;
      for (; i < saveMessage.valueSaves.length; i++) {
        const valueSave = saveMessage.valueSaves[i];
        if (valueSave.hasOwnProperty("args")) {
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
      // Construct the non-initial children in the order given in
      // saveMessage, which is the same as the order they
      // were created on the saved replica, since Map
      // iterators run in insertion order.  That means that
      // if deserializing the createArgs causes getDescendant
      // to be called on this, the relevant child will have
      // already been initialized, so the call will
      // succeed uneventfully.
      for (; i < saveMessage.valueSaves.length; i++) {
        const valueSave = saveMessage.valueSaves[i];
        this.receiveCreate(valueSave.name, valueSave.args!);
      }
      // Load children that have not already been loaded.
      for (const [name, childSave] of this.pendingChildSaves) {
        this.pendingChildSaves.delete(name);
        // Note this loop will skip over children that get
        // loaded preemptively by getDescendant, since they
        // are deleted from this.pendingChildSaves.
        this.children.get(name)!.load(childSave);
      }
      this.pendingChildSaves = null;
    }
  }

  getDescendant(namePath: string[]): Collab {
    if (namePath.length === 0) return this;

    const name = namePath[namePath.length - 1];
    const child = this.children.get(name);
    if (child === undefined) {
      // Assume it is a deleted (frozen) child.
      // It seems hard to prevent getDescendant calls
      // concurrent to a delete (e.g. due to an operation
      // putting a Collab into a register concurrent to a
      // delete), which we want to return
      // a frozen Collab instead of an immediate error.
      // For now, we return a Proxy that throws an error when
      // you do anything with it except the predefined
      // Collab operations (name, runtime, parent); these
      // are defined properly in case the Collab gets
      // re-serialized (e.g. during saving of whatever
      // holds a reference to it).
      return FakeDeletedCollab.of(new InitToken(name, this));
    }
    namePath.length--;
    if (this.pendingChildSaves !== null && namePath.length > 0) {
      // Ensure child is loaded.
      const childSave = this.pendingChildSaves.get(name);
      if (childSave !== undefined) {
        this.pendingChildSaves.delete(name);
        child.load(childSave);
      }
    }
    return child.getDescendant(namePath);
  }

  canGc(): boolean {
    // To be in the initial state:
    // 1. All values except the initial ones must be deleted.
    // Such values are except those referenced by constructorArgs.
    if (this.constructorArgs.size === 0) {
      // 2. All initial values must still be present.
      if (this.size === this.initialValuesCount) {
        // 3. All initial values must canGc().
        for (const value of this.values()) {
          if (!value.canGc()) return false;
        }
        return true;
      }
    }
    return false;
  }
}

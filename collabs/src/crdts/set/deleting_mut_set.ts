import {
  DeletingMutCSetMessage,
  DeletingMutCSetSave,
  IDeletingMutCSetValueSave,
} from "../../../generated/proto_compiled";
import { DefaultSerializer, Optional, Serializer } from "../../util";
import {
  Collab,
  ICollabParent,
  InitToken,
  MessageMeta,
  Message,
} from "../../core";
import { Resettable } from "../abilities";
import { AbstractCSetCollab } from "../../data_types";
import { makeUID } from "../../util/uid";

class FakeDeletedCollab extends Collab {
  private constructor(initToken: InitToken) {
    super(initToken);
  }

  protected receiveInternal(): void {
    throw new Error(
      "Collab has been deleted from DeletingMutCSet and is frozen"
    );
  }
  save(): Uint8Array {
    throw new Error(
      "Collab has been deleted from DeletingMutCSet and is frozen"
    );
  }
  load(): void {
    throw new Error(
      "Collab has been deleted from DeletingMutCSet and is frozen"
    );
  }
  getDescendant(): Collab {
    throw new Error(
      "Collab has been deleted from DeletingMutCSet and is frozen"
    );
  }
  canGC(): boolean {
    throw new Error(
      "Collab has been deleted from DeletingMutCSet and is frozen"
    );
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
          return (target as unknown as Record<string | symbol, unknown>)[p];
        } else {
          throw new Error(
            "Collab has been deleted from DeletingMutCSet and is frozen"
          );
        }
      },

      set: function (target, p, value) {
        if (p in target) {
          // Do the behavior defined by FakeDeletedCollab.
          (target as unknown as Record<string | symbol, unknown>)[p] = value;
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
 * (replicaID, runtime.getReplicaUniqueNumber()) -
 * it won't be consistent on different replicas.
 * If you need these, you must pass them yourself as
 * constructor args.  Likewise, if you are passed in a
 * reference to another Collab, don't use its state to
 * set other parts of your own state; any such state
 * must instead be passed as a separate non-Collab
 * constructor arg.
 */
export class DeletingMutCSet<C extends Collab, AddArgs extends unknown[]>
  extends AbstractCSetCollab<C, AddArgs>
  implements ICollabParent, Resettable
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
      // Using name "INIT" is a hack; need to figure out
      // a proper way to do this when implementing
      // initial values generally.
      const name = makeUID("INIT", i);
      this.receiveCreate(name, undefined, args, true);
    }
    this.initialValuesCount = initialValuesArgs.length;
  }

  childSend(child: Collab, messagePath: Message[]): void {
    if (child.parent !== this) {
      throw new Error(`childSend called by non-child: ${child}`);
    }

    messagePath.push(child.name);
    this.send(messagePath);
  }

  private ourCreatedValue?: C = undefined;
  protected receiveInternal(messagePath: Message[], meta: MessageMeta): void {
    const lastMessage = messagePath[messagePath.length - 1];
    if (typeof lastMessage === "string") {
      // Message for an existing child.  Proceed as in
      // CObject.
      const child = this.children.get(lastMessage);
      if (child === undefined) {
        // Assume it's a message for a deleted (hence
        // frozen) child.
        if (meta.isLocalEcho) {
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
      const decoded = DeletingMutCSetMessage.decode(<Uint8Array>lastMessage);
      switch (decoded.op) {
        case "add": {
          const name = makeUID(meta.sender, decoded.add!.replicaUniqueNumber);
          const newValue = this.receiveCreate(name, decoded.add!.args);

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
      if (this.pendingChildSaves === null) {
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

  load(saveData: Optional<Uint8Array>): void {
    if (!saveData.isPresent) {
      // Indicates skipped loading. Pass on the message.
      for (const child of this.children.values()) child.load(saveData);
    } else {
      const saveMessage = DeletingMutCSetSave.decode(saveData.get());
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
        this.children.get(name)!.load(Optional.of(childSave));
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
        child.load(Optional.of(childSave));
      }
    }
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

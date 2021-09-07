import {
  DeletingMutCSetMessage,
  DeletingMutCSetSave,
} from "../../../generated/proto_compiled";
import {
  bytesAsString,
  DefaultElementSerializer,
  ElementSerializer,
} from "../../util";
import {
  CausalTimestamp,
  Crdt,
  CrdtEventMeta,
  CrdtInitToken,
  Pre,
} from "../../core";
import { AbstractCSetCrdt } from "./abstract_set";
import { Resettable } from "../../abilities";

class FakeDeletedCrdt extends Crdt {
  private constructor(initToken: CrdtInitToken) {
    super(initToken);
  }

  protected receiveInternal(
    _targetPath: string[],
    _timestamp: CausalTimestamp,
    _message: Uint8Array
  ): void {
    throw new Error("Crdt has been deleted from DeletingMutCSet and is frozen");
  }
  getChild(_name: string): Crdt {
    throw new Error("Crdt has been deleted from DeletingMutCSet and is frozen");
  }
  canGc(): boolean {
    throw new Error("Crdt has been deleted from DeletingMutCSet and is frozen");
  }
  save(): [saveData: Uint8Array, children: Map<string, Crdt>] {
    throw new Error("Crdt has been deleted from DeletingMutCSet and is frozen");
  }
  load(_saveData: Uint8Array): boolean {
    throw new Error("Crdt has been deleted from DeletingMutCSet and is frozen");
  }

  /**
   * Used in getChild when the requested Crdt is deleted/
   * frozen.  See the comment there.
   */
  static of(initToken: CrdtInitToken): FakeDeletedCrdt {
    const fakeDeletedCrdt = new FakeDeletedCrdt(initToken);
    return new Proxy(fakeDeletedCrdt, {
      get: function (target, p) {
        if (p in target) {
          // Do the behavior defined by FakeDeletedCrdt.
          return (target as any)[p];
        } else {
          throw new Error(
            "Crdt has been deleted from DeletingMutCSet and is frozen"
          );
        }
      },

      set: function (target, p, value) {
        if (p in target) {
          // Do the behavior defined by FakeDeletedCrdt.
          (target as any)[p] = value;
          return true;
        } else {
          throw new Error(
            "Crdt has been deleted from DeletingMutCSet and is frozen"
          );
        }
      },
    });
  }
}

/**
 * Warning: when you delete a Crdt, it is "frozen" -
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
 * reference to another Crdt, don't use its state to
 * set other parts of your own state; any such state
 * must instead be passed as a separate non-Crdt
 * constructor arg.
 */
export class DeletingMutCSet<C extends Crdt, AddArgs extends any[]>
  extends AbstractCSetCrdt<C, AddArgs>
  implements Resettable
{
  private readonly children: Map<string, C> = new Map();
  // constructorArgs are saved for later save calls
  private readonly constructorArgs: Map<string, Uint8Array> = new Map();

  constructor(
    initToken: CrdtInitToken,
    private readonly valueConstructor: (
      valueInitToken: CrdtInitToken,
      ...args: AddArgs
    ) => C,
    /*initialValuesArgs: AddArgs[] = [],*/
    initialValues: Pre<C>[] = [],
    private readonly argsSerializer: ElementSerializer<AddArgs> = DefaultElementSerializer.getInstance()
  ) {
    super(initToken);

    /*// Create the initial values from initialValuesArgs
    for (let i = 0; i < this.initialValuesArgs!.length; i++) {
      const args = this.initialValuesArgs![i];
      // Using name "INIT" is a hack; need to figure out
      // a proper way to do this when implementing
      // initial values generally.
      const name = bytesAsString(
        DeletingMutCSet.nameSerializer.serialize(["INIT", i])
      );
      this.receiveCreate(name, this.argsSerializer.serialize(args), args, true);
    }
    this.initialValuesArgs = undefined;*/
    // Construct the initial values
    for (let i = 0; i < initialValues.length; i++) {
      // Add as child with "["INIT", -i]" as id.
      // Similar to CObject#addChild.
      let name = bytesAsString(
        DeletingMutCSet.nameSerializer.serialize(["INIT", -i])
      );
      if (this.children.has(name)) {
        throw new Error(
          '(initial value) Duplicate newCrdt name: "' + name + '"'
        );
      }
      const newCrdt = initialValues[i](new CrdtInitToken(name, this));
      this.children.set(name, newCrdt);

      // Initial values are not added to this.constructorArgs,
      // since they are passed to the constructor, hence
      // do not need to be saved.
    }
  }

  private static nameSerializer =
    DefaultElementSerializer.getInstance<[string, number]>();

  private ourCreatedValue?: C = undefined;
  protected receiveInternal(
    targetPath: string[],
    timestamp: CausalTimestamp,
    message: Uint8Array
  ): void {
    if (targetPath.length === 0) {
      let decoded = DeletingMutCSetMessage.decode(message);
      switch (decoded.op) {
        case "add":
          const name = bytesAsString(
            DeletingMutCSet.nameSerializer.serialize([
              timestamp.getSender(),
              decoded.add!.replicaUniqueNumber,
            ])
          );
          const newValue = this.receiveCreate(name, decoded.add!.args);

          if (timestamp.isLocal() || this.runtime.isInRunLocally) {
            // Giving support for runLocally
            this.ourCreatedValue = newValue;
          }

          this.emit("Add", {
            value: newValue,
            meta: CrdtEventMeta.fromTimestamp(timestamp),
          });
          break;
        case "delete":
          const child = this.children.get(decoded.delete);
          if (child !== undefined) {
            this.children.delete(decoded.delete);
            this.constructorArgs.delete(decoded.delete);

            this.emit("Delete", {
              value: child,
              meta: CrdtEventMeta.fromTimestamp(timestamp),
            });
          }
          break;
        default:
          throw new Error("Unknown decoded.op: " + decoded.op);
      }
    } else {
      // Message for an existing child.  Proceed as in
      // CObject.
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
    serializedArgs: Uint8Array,
    args: AddArgs | undefined = undefined,
    isInitialValue = false
  ): C {
    if (args === undefined) {
      args = this.argsSerializer.deserialize(serializedArgs, this.runtime);
    }
    // Add as child with "[sender, counter]" as id.
    // Similar to CObject#addChild.
    if (this.children.has(name)) {
      throw new Error('Duplicate newValue name: "' + name + '"');
    }
    const newValue = this.valueConstructor(
      new CrdtInitToken(name, this),
      ...args
    );
    this.children.set(name, newValue);
    if (!isInitialValue) {
      // Initial values are not saved, since they are created
      // as part of initialization.
      this.constructorArgs.set(name, serializedArgs);
    }

    return newValue;
  }

  getChild(name: string): Crdt {
    const child = this.children.get(name);
    if (child === undefined) {
      // Assume it is a deleted (frozen) child.
      // It seems hard to prevent getDescendant calls
      // concurrent to a delete (e.g. due to an operation
      // putting a Crdt into a register concurrent to a
      // delete), which we want to return
      // a frozen Crdt instead of an immediate error.
      // For now, we return a Proxy that throws an error when
      // you do anything with it except the predefined
      // Crdt operations (name, runtime, parent); these
      // are defined properly in case the Crdt gets
      // re-serialized (e.g. during saving of whatever
      // holds a reference to it).
      return FakeDeletedCrdt.of(new CrdtInitToken(name, this));
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
    this.runtime.send(this, DeletingMutCSetMessage.encode(message).finish());
    let created = this.ourCreatedValue;
    this.ourCreatedValue = undefined;
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
    return this.argsSerializer.deserialize(argsSerialized, this.runtime);
  }

  save(): [saveData: Uint8Array, children: Map<string, Crdt>] {
    const saveMessage = DeletingMutCSetSave.create({
      // Note this will be in insertion order because
      // Map iterators run in insertion order.
      constructorArgs: [...this.constructorArgs].map(([name, args]) => {
        return {
          name,
          args,
        };
      }),
    });
    return [DeletingMutCSetSave.encode(saveMessage).finish(), this.children];
  }

  load(saveData: Uint8Array): boolean {
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
      this.receiveCreate(name, args);
    }
    return true;
  }
}

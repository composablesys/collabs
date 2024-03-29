import {
  AbstractSet_Collab,
  Collab,
  CollabEventsRecord,
  CollabID,
  DefaultSerializer,
  IParent,
  InitToken,
  MessageMeta,
  MetaRequest,
  Parent,
  SavedStateMeta,
  SavedStateTree,
  Serializer,
  UpdateMeta,
  collabIDOf,
  nonNull,
} from "@collabs/core";
import { CSetMessage, CSetSave } from "../../generated/proto_compiled";
import { CRDTMessageMeta, CRDTSavedStateMeta, CRuntime } from "../runtime";

const RADIX = 36;

/**
 * A collaborative set with *mutable*
 * values of type C.
 *
 * Values are internally mutable.
 * Specifically, each value is its own [[Collab]], and
 * operations on that Collab are collaborative as usual.
 *
 * Unlike a normal `Set<C>`, you do not add values directly.
 * Instead, you use the pattern described in
 * [collections of Collabs](https://collabs.readthedocs.io/en/latest/guide/collections.html):
 * one user calls [[add]] with `AddArgs`; each
 * replica passes those `AddArgs` to its
 * `valueConstructor`;
 * and `valueConstructor` returns the local copy of the new value Collab.
 *
 * When a value is deleted with [[delete]], it is deleted permanently and
 * can no longer be used; future and concurrent operations on that value
 * are ignored.
 *
 * You can also treat a `CSet<C>` as a "factory"
 * for Collabs of type C: [[add]] is like "new"/"malloc" and
 * [[delete]] is like "free", but replicated across all devices.
 *
 * See also: [[CValueSet]].
 *
 * @typeParam C The value type, which is a Collab.
 * @typeParam AddArgs The type of arguments to [[add]].
 */
export class CSet<C extends Collab, AddArgs extends unknown[]>
  extends AbstractSet_Collab<C, AddArgs>
  implements IParent
{
  private readonly children: Map<string, C> = new Map();
  // constructorArgs are saved for later save calls.
  private readonly constructorArgs: Map<string, Uint8Array> = new Map();
  // We store just-deleted children until the next runtime Change event, for
  // the purpose of answering fromId calls in same-transaction event listeners.
  private readonly justDeletedChildren: Map<string, C> = new Map();

  private readonly argsSerializer: Serializer<AddArgs>;

  /**
   * Constructs a CSet with the given `valueConstructor`.
   *
   * @param valueConstructor Callback used to construct a
   * value Collab with the given [[InitToken]] and arguments to [[add]]. See [collections of Collabs](https://collabs.readthedocs.io/en/latest/guide/collections.html)
   * for example usage.
   * @param options.argsSerializer A serializer for `AddArgs` as an array.
   * Defaults to [[DefaultSerializer]].
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

    if ((this.runtime as CRuntime).isCRDTRuntime !== true) {
      throw new Error("this.runtime must be CRuntime or compatible");
    }

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

  receive(messageStack: (Uint8Array | string)[], meta: MessageMeta): void {
    const lastMessage = nonNull(messageStack.pop());
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
      const crdtMeta = meta.runtimeExtra as CRDTMessageMeta;
      switch (decoded.op) {
        case "add": {
          const name = this.makeName(meta.senderID, crdtMeta.senderCounter);
          this.receiveAdd(name, decoded.add, meta);
          break;
        }
        case "delete": {
          const child = this.children.get(decoded.delete);
          if (child !== undefined) {
            this.receiveDelete(decoded.delete, child, meta);
          }
          break;
        }
        default:
          throw new Error(`Unknown decoded.op: ${decoded.op}`);
      }
    }
  }

  private receiveAdd(
    name: string,
    serializedArgs: Uint8Array | undefined,
    meta: UpdateMeta
  ): void {
    if (this.children.has(name)) {
      throw new Error('Duplicate newValue name: "' + name + '"');
    }
    const newValue = this.valueConstructor(
      new InitToken(name, this),
      ...this.argsSerializer.deserialize(nonNull(serializedArgs))
    );

    this.children.set(name, newValue);
    this.constructorArgs.set(name, nonNull(serializedArgs));

    if (this.inAdd) {
      this.ourCreatedValue = newValue;
    }

    this.emit("Add", {
      value: newValue,
      meta,
    });
  }

  private receiveDelete(name: string, value: C, meta: UpdateMeta) {
    this.children.delete(name);
    this.constructorArgs.delete(name);

    // Store the child in justDeletedChildren until the end
    // of the current update. See [[fromID]]'s doc header for why.
    if (this.justDeletedChildren.size === 0) {
      (this.runtime as CRuntime).on(
        "Update",
        () => this.justDeletedChildren.clear(),
        { once: true }
      );
    }
    this.justDeletedChildren.set(name, value);

    this.emit("Delete", {
      value,
      meta,
    });
    value.finalize();
  }

  // Name requirements:
  // 1. Contain their causal dot (senderID, senderCounter), for merging
  // 2. Unique, even with multiple adds in same transaction
  // 3. Pure - doesn't reference sender-side state, for future runLocally
  // To satisfy these, we use a causal dot plus a per-transaction counter
  // (evaluated on the receiver side).
  // To avoid a wasteful senderID -> utf8 bytes -> base64 string
  // conversion, we encode the string manually,
  // instead of using protobuf + base64.
  // OPT: shorter number encodings? Esp for senderCounter.

  private trCounter = 0;

  private makeName(senderID: string, senderCounter: number) {
    let ans: string;
    if (this.trCounter === 0) {
      // Reset trCounter at the end of the transaction.
      // Since this method is only called during receive(), transactions
      // coincide with updates.
      (this.runtime as CRuntime).on(
        "Update",
        () => {
          this.trCounter = 0;
        },
        { once: true }
      );
      // Omit trCounter in this common case.
      ans = `${senderCounter.toString(RADIX)},${senderID}`;
    } else {
      ans = `${senderCounter.toString(RADIX)}.${this.trCounter.toString(
        RADIX
      )},${senderID}`;
    }
    this.trCounter++;
    return ans;
  }

  private parseName(name: string): [senderID: string, senderCounter: number] {
    const comma = name.indexOf(",");
    const dot = name.lastIndexOf(".", comma - 1);
    const senderCounterStr = name.slice(0, dot === -1 ? comma : dot);
    return [name.slice(comma + 1), Number.parseInt(senderCounterStr, RADIX)];
  }

  /**
   * Adds a value to the set using args.
   *
   * The args are broadcast to all replicas in serialized form.
   * Every replica then passes them to `valueConstructor` to construct the actual
   * value of type C, a new Collab that is collaborative as usual.
   *
   * @returns The added value.
   */
  add(...args: AddArgs): C {
    this.inAdd = true;
    const message = CSetMessage.create({
      add: this.argsSerializer.serialize(args),
    });
    this.send([CSetMessage.encode(message).finish()], []);
    const created = nonNull(this.ourCreatedValue);
    this.ourCreatedValue = undefined;
    this.inAdd = false;
    return created;
  }

  /**
   * Deletes the given value, making it no longer present
   * in this set.
   *
   * `value` is deleted permanently and
   * can no longer be used; future and concurrent operations on that value
   * are ignored. Local operations will succeed but will not affect
   * remote replicas. The value can perform cleanup in its
   * [[Collab.finalize]] method.
   */
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
   * Returns the `AddArgs` used to add `value`.
   *
   * @throws if `!this.has(value)`.
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

  save(): SavedStateTree {
    const args = new Array<Uint8Array>(this.size);
    const childSaves = new Map<string, SavedStateTree>();
    let i = 0;
    for (const [name, child] of this.children) {
      args[i] = nonNull(this.constructorArgs.get(name));
      childSaves.set(name, child.save());
      i++;
    }
    const saveMessage = CSetSave.create({ args });
    return {
      self: CSetSave.encode(saveMessage).finish(),
      children: childSaves,
    };
  }

  load(savedStateTree: SavedStateTree | null, meta: SavedStateMeta): void {
    const crdtMeta = meta.runtimeExtra as CRDTSavedStateMeta;

    let saveMessage: CSetSave;
    let childSaves: Map<string, SavedStateTree>;
    if (savedStateTree === null) {
      // Assume the saved state was trivial (had canGC() = true), i.e.,
      // 0 values.
      saveMessage = CSetSave.create({ args: [] });
      childSaves = new Map();
    } else {
      saveMessage = CSetSave.decode(nonNull(savedStateTree.self));
      childSaves = nonNull(savedStateTree.children);
    }

    // 1. Delete our children that are not present in the saved
    // state and that are causally dominated by the remote VC.
    for (const [name, value] of this.children) {
      if (!childSaves.has(name)) {
        const [senderID, senderCounter] = this.parseName(name);
        if (crdtMeta.remoteVectorClock.get(senderID) >= senderCounter) {
          this.receiveDelete(name, value, meta);
        }
      }
    }

    // 2. Add new children (not already present here) that are not
    // causally dominated by the local VC.
    let i = 0;
    for (const name of childSaves.keys()) {
      if (!this.children.has(name)) {
        const [senderID, senderCounter] = this.parseName(name);
        if (crdtMeta.localVectorClock.get(senderID) < senderCounter) {
          // This will emit an Add event, even though we haven't
          // loaded the value yet.
          // That matches add()'s behavior, and it lets users register event
          // listeners in the Add event before any updates occur.
          this.receiveAdd(name, saveMessage.args[i], meta);
        }
      }
      i++;
    }

    // 3. Load children that have a save and are still present.
    for (const [name, childSave] of childSaves) {
      const child = this.children.get(name);
      if (child !== undefined) {
        child.load(childSave, meta);
      }
    }
  }

  idOf<D extends Collab>(descendant: D): CollabID<D> {
    return collabIDOf(descendant, this);
  }

  /**
   * Inverse of [[idOf]].
   *
   * Specifically, given a [[CollabID]] returned by [[idOf]] on some replica of
   * this CSet, returns this replica's copy of the original
   * `descendant`.
   *
   * If the original `descendant` has been deleted from this
   * set, this method will usually return `undefined`. The exception
   * is if `descendant` was just deleted from this set.
   * In that case, this method will
   * still return the original `descendant` until the end of
   * the deleting update.
   * Thus event handlers within the same transaction can still
   * get the deleted value.
   *
   * @param id A CollabID from [[idOf]].
   * @param startIndex Internal (parent) use only.
   * If provided, treat `id.collabIDPath` as if
   * it starts at startIndex instead of 0.
   */
  fromID<D extends Collab<CollabEventsRecord>>(
    id: CollabID<D>,
    startIndex = 0
  ): D | undefined {
    const name = id.collabIDPath[startIndex];
    let child = this.children.get(name) as Collab;
    if (child === undefined) {
      // If it's a just-deleted child, still succeed.
      child = this.justDeletedChildren.get(name) as Collab;
      if (child === undefined) {
        // Assume it is a deleted child.
        return undefined;
      }
    }

    // Terminal case.
    // Note that this cast is unsafe, but convenient.
    if (startIndex === id.collabIDPath.length - 1) return child as D;
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

import { CObjectSave } from "../../generated/proto_compiled";
import {
  Crdt,
  CrdtEventsRecord,
  InitToken,
  MessageMeta,
  ParentCrdt,
  Pre,
} from "../core";

/**
 * A collaborative object, made of instance fields that
 * are themselves collaborative data types.
 *
 * The collaborative instance fields are its *children*.
 *
 * `CObject` enables the simplest form of composition:
 * you use a fixed set of existing collaborative data
 * types side-by-side, and call it a new collaborative
 * data type.  This is useful because you can apply standard
 * object-oriented programming techniques like encapsulation
 * and inheritance.  It can be useful even with just a single
 * child.  For example, [[LwwCMap]] has a single child, a mutable
 * map with [[LwwCRegister]] values; its contribution is to
 * provide a simple [[CMap]]-compliant API for the wrapped type.
 *
 * TODO: difference from normal object: scoping, Crdt interface
 *
 * ## Usage
 *
 * The children must be registered in the constructor
 * using [[addChild]], which accepts a [[Pre]]-Crdt and
 * outputs the constructed Crdt.  Each child must be assigned
 * a unique name, e.g., its name as an instance field.  (If
 * you are concerned about message sizes on the network,
 * you can instead use maximally short names - "" for the most-used
 * child, then "0", "1", etc.)
 *
 * To be eventually consistent, a `CObject` should not have
 * mutable besides outside of its children.  One exception
 * is
 *
 * Allowed instance fields (children, non-collaborative stuff
 * (e.g. readonly vars)), views of collab state.  Correctness
 * condition?
 *
 * 3 things to translate for your users: operations, queries (reading value), events
 *
 * ## Example Subclass
 */
export class CObject<
    Events extends CrdtEventsRecord = CrdtEventsRecord,
    C extends Crdt = Crdt
  >
  extends Crdt<Events>
  implements ParentCrdt
{
  /**
   * The children, keyed by name.
   *
   * This map should only be read, not mutated.
   *
   * Typically, subclasses should store their
   * children in their own instance variables,
   * not use this map to look them up.  This map
   * is exposed mainly as a convenience for methods that
   * act on all children in the style of canGc().
   *
   * TODO: just expose values method instead?
   */
  protected readonly children: Map<string, C> = new Map();

  /**
   * Add child as a child of this Crdt with the given
   * name.
   *
   * TODO: correctness requirements and recommended usage
   * as this.foo = this.addChild("foo", new ...)
   * (ref to class doc?).
   *
   * @return child
   */
  protected addChild<D extends C>(name: string, preChild: Pre<D>): D {
    if (this.children.has(name)) {
      throw new Error('Duplicate child name: "' + name + '"');
    }
    const child = preChild(new InitToken(name, this));
    this.children.set(name, child);
    return child;
  }

  childSend(child: Crdt, messagePath: (string | Uint8Array)[]): void {
    if (child.parent !== this) {
      throw new Error("childSend called by non-child: " + child);
    }

    messagePath.push(child.name);
    this.send(messagePath);
  }

  nextMessageMeta(): MessageMeta {
    return this.parent.nextMessageMeta();
  }

  protected receiveInternal(
    messagePath: (Uint8Array | string)[],
    meta: MessageMeta
  ): void {
    if (messagePath.length === 0) {
      // We are the target
      throw new Error("CObject received message for itself");
    }

    const child = this.children.get(
      <string>messagePath[messagePath.length - 1]
    );
    if (child === undefined) {
      throw new Error(
        "Unknown child: " +
          messagePath[messagePath.length - 1] +
          " in: " +
          JSON.stringify(messagePath) +
          ", children: " +
          JSON.stringify([...this.children.keys()])
      );
    }
    messagePath.length--;
    child.receive(messagePath, meta);
  }

  save(): Uint8Array {
    const childSaves: { [name: string]: Uint8Array } = {};
    for (const [name, child] of this.children) {
      childSaves[name] = child.save();
    }
    const saveMessage = CObjectSave.create({
      childSaves,
      objectSave: this.saveObject(),
    });
    return CObjectSave.encode(saveMessage).finish();
  }

  /**
   * Override to save extra state, which is passed
   * to loadObject during load after the children
   * are initialized.  TODO: how to use safely (general
   * save/load advice).
   * @return [description]
   */
  protected saveObject(): Uint8Array | null {
    return null;
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
      this.loadObject(null);
    } else {
      const saveMessage = CObjectSave.decode(saveData);
      // For the child saves: it's possible that loading
      // one child might lead to this.getDescendant being
      // called for some other child (typically by deserializing
      // a Crdt reference). So we use this.pendingChildSaves
      // to allow getDescendant to load children on demand.
      this.pendingChildSaves = new Map(Object.entries(saveMessage.childSaves));
      for (const [name, childSave] of this.pendingChildSaves) {
        // Note this loop will skip over children that get
        // loaded preemptively by getDescendant, since they
        // are deleted from this.pendingChildSaves.
        this.children.get(name)!.load(childSave);
      }
      this.pendingChildSaves = null;
      if (saveMessage.hasOwnProperty("objectSave")) {
        this.loadObject(saveMessage.objectSave!);
      } else {
        this.loadObject(null);
      }
    }
  }

  /**
   * Note this is called after the children are initialized
   * but before they are loaded.
   *
   * @param  saveData the output of saveObject() on
   * a previous saved instance
   */
  protected loadObject(saveData: Uint8Array | null): void {}

  getDescendant(namePath: string[]): Crdt {
    if (namePath.length === 0) return this;

    const name = namePath[namePath.length - 1];
    const child = this.children.get(name);
    if (child === undefined) {
      throw new Error(
        "Unknown child: " +
          name +
          ", children: " +
          JSON.stringify([...this.children.keys()])
      );
    }
    namePath.length--;
    if (this.pendingChildSaves !== null && namePath.length > 0) {
      // Ensure child is loaded.
      const childSave = this.pendingChildSaves.get(name);
      if (childSave !== undefined) {
        child.load(childSave);
      }
    }
    return child.getDescendant(namePath);
  }

  /**
   * @return true if canGc() returns true on every child
   */
  canGc(): boolean {
    for (const child of this.children.values()) {
      if (!child.canGc()) return false;
    }
    return true;
  }
}

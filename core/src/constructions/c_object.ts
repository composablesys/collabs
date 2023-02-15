import {
  Collab,
  CollabEventsRecord,
  CollabID,
  collabIDOf,
  InitToken,
  IParent,
  MetaRequest,
  Parent,
  SavedStateTree,
  UpdateMeta,
} from "../core";

/**
 * A collaborating object, consisting of properties that
 * are themselves [[Collab]]s.
 *
 * The Collab properties are its *children*.
 *
 * `CObject` enables the simplest form of composition:
 * you use a fixed set of existing collaborative data
 * types side-by-side, and call it a new collaborative
 * data type.  This is useful because you can apply standard
 * object-oriented programming techniques like encapsulation
 * and inheritance.  It can be useful even with just a single
 * child.  For example, [[LWWCMap]] has a single child, a mutable
 * map with [[CVar]] values; its contribution is to
 * provide a simple [[IMap]]-compliant API for the wrapped type.
 *
 * Unlike a normal object or a `Collab` with normal
 * properties, `CObject` ensures that its `Collab` children
 * are linked to each other through the network. Specifically,
 * each time a child requests to send a message, `CObject` sends
 * it tagged with the child's name; recipient replicas then
 * pass the message to their own child
 * with that name.
 *
 * ## Usage
 *
 * The children must be registered in the constructor
 * using [[addChild]], which accepts a [[Pre]]-Collab and
 * outputs the constructed Collab.  Each child must be assigned
 * a unique name, e.g., its name as an property.  (If
 * you are concerned about message sizes on the network,
 * you can instead use maximally short names - "" for the most-used
 * child, then "0", "1", etc. Think of
 * these short names like the field numbers in Protobuf structs.)
 *
 * To be eventually consistent, a `CObject` should not have
 * mutable properties outside of its children.  One exception
 * is mutable properties that are deterministic views of
 * child state. E.g., if one child stores a set of words,
 * it is of course eventually consistent to also store an
 * alphabetized list as a view of that set. You can keep
 * such a view up-to-date by updating the view in response
 * to child events.
 *
 * A fully reusable `CObject` instance has three main
 * responsibilities:
 * - Translate operations (mutating method calls) into operations on
 * its children.
 * - Translate queries (method calls/properties for reading
 * the state) into queries on its children and views.
 * - Translate events emitted by the children into its own
 * events.
 *
 * ## Example Subclass
 *
 * See [template-custom-type](../../../../template-custom-type).
 */
export class CObject<Events extends CollabEventsRecord = CollabEventsRecord>
  extends Collab<Events>
  implements IParent
{
  /**
   * The children, keyed by name.
   *
   * This map should only be read, not mutated.
   *
   * It is good style for subclasses to store their
   * children in their own instance variables,
   * not use this map to look them up.  This map
   * is exposed mainly as a convenience for methods that
   * act on all children, in the style of [[canGC]].
   */
  protected readonly children: Map<string, Collab> = new Map();

  /**
   * Add child as a child of this Collab with the given
   * name.
   *
   * It is recomend that you use this in the style
   * ```ts
   * this.foo = this.addChild("foo", (init) => new FooClass(init, constructor args...));
   * ```
   * In particular, the created child should be stored as an ordinary
   * object property.  Each child must be assigned
   * a unique name, e.g., its name as an property.  (If
   * you are concerned about message sizes on the network,
   * you can instead use maximally short names - "" for the most-used
   * child, then "0", "1", etc.)
   *
   * @return child
   */
  protected addChild<C extends Collab>(
    name: string,
    childCallback: (init: InitToken) => C
  ): C {
    if (this.children.has(name)) {
      throw new Error('Duplicate child name: "' + name + '"');
    }
    const child = childCallback(new InitToken(name, this));
    this.children.set(name, child);
    return child;
  }

  childSend(
    child: Collab,
    messageStack: (Uint8Array | string)[],
    metaRequests: MetaRequest[]
  ): void {
    if (child.parent !== this) {
      throw new Error(`childSend called by non-child: ${child}`);
    }

    messageStack.push(child.name);
    this.send(messageStack, metaRequests);
  }

  receive(messageStack: (Uint8Array | string)[], meta: UpdateMeta): void {
    if (messageStack.length === 0) {
      // We are the target
      throw new Error("CObject received message for itself");
    }

    const child = this.children.get(<string>messageStack.pop());
    if (child === undefined) {
      // Assume this is a version issue; ignore the child (protobuf3-style).
      return;
    }
    child.receive(messageStack, meta);
  }

  save(): SavedStateTree | null {
    const childSaves = new Map<string, SavedStateTree>();
    for (const [name, child] of this.children) {
      const childSave = child.save();
      if (childSave !== null) childSaves.set(name, childSave);
    }
    return {
      self: this.saveObject() ?? undefined,
      children: childSaves,
    };
  }

  load(savedStateTree: SavedStateTree, meta: UpdateMeta): void {
    if (savedStateTree.children !== undefined) {
      for (const [name, childSave] of savedStateTree.children) {
        const child = this.children.get(name);
        // For versioning purposes, skip loading children that no longer exist.
        if (child !== undefined) {
          // We don't save nulls, so can assert childSave!.
          child.load(childSave!, meta);
        }
      }
    }
    this.loadObject(savedStateTree.self ?? null);
  }

  /**
   * Override to save extra state, which is passed
   * to loadObject during load after the children
   * are initialized.
   * @return [description]
   */
  protected saveObject(): Uint8Array | null {
    return null;
  }

  /**
   * Override to load extra state, using `savedState` from
   * [[saveObject]].
   *
   * Note this is called after the children are loaded.
   * Also, this is always called, even if [[saveObject]] returned
   * null (in that case this is called with null); that lets
   * you do some post-processing (e.g., computing child views)
   * even if you didn't have any extra state to save.
   *
   * @param  savedState the output of [[saveObject]] on
   * a previous saved instance, possibly null.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected loadObject(savedState: Uint8Array | null): void {
    // Does nothing by default.
  }

  idOf<C extends Collab>(descendant: C): CollabID<C> {
    return collabIDOf(descendant, this);
  }

  fromID<C extends Collab>(id: CollabID<C>, startIndex = 0): C | undefined {
    const name = id.namePath[startIndex];
    const child = this.children.get(name);
    if (child === undefined) {
      // Return undefined instead of an erroring, in case it is
      // caused by versioning (child deleted in current version).
      return undefined;
    }
    // Terminal case.
    // Note that this cast is unsafe, but convenient.
    if (startIndex === id.namePath.length - 1) return child as C;
    // Recursive case.
    if ((child as Parent).fromID === undefined) {
      throw new Error("child is not a parent, but CollabID is its descendant");
    }
    return (child as Parent).fromID(id, startIndex + 1);
  }

  /**
   * @return true if canGC() returns true on every child
   */
  canGC(): boolean {
    for (const child of this.children.values()) {
      if (!child.canGC()) return false;
    }
    return true;
  }

  /**
   * Called by this Collab's parent when it has been deleted from a
   * collection on the local
   * replica and can no longer be used.
   *
   * By default, this method calls finalize on every child.
   * A CObject subclass can override this method to clean up
   * external resources, e.g., associated DOM elements.
   * If overridden, consider calling super.finalize().
   */
  finalize(): void {
    for (const child of this.children.values()) {
      child.finalize();
    }
  }
}

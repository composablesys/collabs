import {
  Collab,
  CollabEvent,
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
 * Base class for a collaborative object, containing
 * properties that are themselves [[Collab]]s.
 *
 * See [Data Modeling](../../../guide/data_modeling.html) for a guide and
 * examples of how to extend this class.
 *
 * Extending CObject lets you create a reusable object-oriented
 * unit out of one or more existing Collabs.
 * In particular, you can:
 * - Wrap existing Collabs in a domain-specific API.
 * - Implement a complex Collab as a composition of simple ones,
 * without the need to send your own messages over the network.
 *
 * To use CObject:
 * 1. In your constructor, register any
 * Collab properties using [[registerCollab]]. The registrations
 * must be identical across all replicas.
 * We call the registered properties our [[children]].
 * 2. Implement your methods by calling methods
 * on the Collab properties; operations called this way
 * are collaborative as usual.
 * 3. You may also register event
 * handlers on your Collab properties that emit your
 * own events in response (in your constructor).
 * For simple CObjects,
 * it may be easier to instead expose Collab properties
 * publicly (so users can add their own event handlers)
 * or have users listen on [[CRuntime]]'s "Change" event.
 *
 * A CObject may have non-Collab properties, but they
 * are not automatically collaborative. Typically, such
 * properties will all be `readonly`. You can also store
 * functional "views" of the Collab properties' states that
 * update in response to events (e.g., a cached `length`
 * field).
 */
export class CObject<Events extends CollabEventsRecord = CollabEventsRecord>
  extends Collab<Events>
  implements IParent
{
  /**
   * The children (registered Collab properties), keyed by name.
   *
   * This map should only be read, not mutated.
   * It is exposed to subclasses as a convenience for methods
   * that loop over all children.
   */
  protected readonly children: Map<string, Collab> = new Map();

  /**
   * Registers a [[Collab]] property of this CObject
   * with the given name, making it one of our [[children]].
   *
   * Typically, you will call this method during the
   * constructor in the style:
   * ```ts
   * this.foo = this.registerCollab("foo", (init) => new FooClass(init, constructor args...));
   * ```
   * where `readonly foo: FooClass;` is a Collab property.
   * See [Data Modeling](../../../guide/data_modeling.html) for examples.
   *
   * Registrations must be identical across all replicas.
   *
   * See also: [[CRuntime.registerCollab]].
   *
   * @param name A name for this property, unique among
   * this class's `registerCollab` calls.
   * We recommend using the same name as the property,
   * but you can also use short strings to reduce
   * network usage ("", "0", "1", ...).
   * @param collabCallback A callback that uses the
   * given [[InitToken]] to construct the registered [[Collab]].
   * @return The registered Collab.
   */
  protected registerCollab<C extends Collab>(
    name: string,
    collabCallback: (init: InitToken) => C
  ): C {
    if (this.children.has(name)) {
      throw new Error('Duplicate child name: "' + name + '"');
    }
    const child = collabCallback(new InitToken(name, this));
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
    this.loadObject(savedStateTree.self ?? null, meta);
  }

  /**
   * Override to save extra state, which is passed
   * to [[loadObject]] at the end of [[load]].
   */
  protected saveObject(): Uint8Array | null {
    return null;
  }

  /**
   * Override to load extra state, using `savedState` from
   * [[saveObject]]. You can also do post-processing
   * of child saves, e.g., computing functional
   * views of child states.
   *
   * This is called after the children are loaded.
   * Also, this is always called, even if [[saveObject]] returned
   * null.
   *
   * @param  savedState the output of [[saveObject]] on
   * a previous saved instance, possibly null.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected loadObject(savedState: Uint8Array | null, meta: UpdateMeta): void {
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
   * Internal (parent) use only.
   *
   * By default, this method returns true if `canGC` returns true
   * on every child. Override to change this behavior.
   *
   * See [[Collab.canGC]].
   */
  canGC(): boolean {
    for (const child of this.children.values()) {
      if (!child.canGC()) return false;
    }
    return true;
  }

  /**
   * Internal (parent) use only.
   *
   * By default, this methods calls `finalize` on every child.
   * on every child. Override to change this behavior,
   * e.g., to add your own finalization steps
   * (but consider calling `super.finalize()`).
   */
  finalize(): void {
    for (const child of this.children.values()) {
      child.finalize();
    }
  }
}

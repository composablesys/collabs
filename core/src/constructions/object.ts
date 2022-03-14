import { CObjectSave } from "../../generated/proto_compiled";
import {
  Collab,
  CollabEventsRecord,
  ICollabParent,
  InitToken,
  MessageMeta,
  Pre,
  Message,
} from "../core";
import { Optional } from "../util";

/**
 * A [[Collab]] object, made of properties that
 * are themselves Collabs.
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
 * map with [[LWWCVariable]] values; its contribution is to
 * provide a simple [[CMap]]-compliant API for the wrapped type.
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
export class CObject<
    Events extends CollabEventsRecord = CollabEventsRecord,
    C extends Collab = Collab
  >
  extends Collab<Events>
  implements ICollabParent
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
  protected readonly children: Map<string, C> = new Map();

  /**
   * Add child as a child of this Collab with the given
   * name.
   *
   * It is recomend that you use this in the style
   * ```ts
   * this.foo = this.addChild("foo", Pre(FooClass)(constructor args...));
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
  protected addChild<D extends C>(name: string, preChild: Pre<D>): D {
    if (this.children.has(name)) {
      throw new Error('Duplicate child name: "' + name + '"');
    }
    const child = preChild(new InitToken(name, this));
    this.children.set(name, child);
    return child;
  }

  childSend(child: Collab, messagePath: Message[]): void {
    if (child.parent !== this) {
      throw new Error(`childSend called by non-child: ${child}`);
    }

    messagePath.push(child.name);
    this.send(messagePath);
  }

  /**
   * No added context.
   *
   * @return undefined
   */
  getAddedContext(_key: symbol): unknown {
    return undefined;
  }

  receive(messagePath: Message[], meta: MessageMeta): void {
    if (messagePath.length === 0) {
      // We are the target
      throw new Error("CObject received message for itself");
    }

    const child = this.children.get(
      <string>messagePath[messagePath.length - 1]
    );
    if (child === undefined) {
      throw new Error(
        `Unknown child: ${
          messagePath[messagePath.length - 1]
        } in: ${JSON.stringify(messagePath)}, children: ${JSON.stringify([
          ...this.children.keys(),
        ])}`
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
   * are initialized.
   * @return [description]
   */
  protected saveObject(): Uint8Array | null {
    return null;
  }

  load(saveData: Optional<Uint8Array>): void {
    if (!saveData.isPresent) {
      // Indicates skipped loading. Pass on the message.
      for (const child of this.children.values()) child.load(saveData);
      this.loadObject(saveData);
    } else {
      const saveMessage = CObjectSave.decode(saveData.get());
      for (const [name, childSave] of Object.entries(saveMessage.childSaves)) {
        this.children.get(name)!.load(Optional.of(childSave));
      }
      const objectSave = Object.prototype.hasOwnProperty.call(
        saveMessage,
        "objectSave"
      )
        ? saveMessage.objectSave
        : null;
      this.loadObject(Optional.of(objectSave));
    }
  }

  /**
   * Override to load extra state, using `saveData` from
   * [[saveObject]].
   *
   * Note this is called after the children are loaded.
   * Also, this is always called, even if [[saveObject]] returned
   * null (in that case this is called with null).
   *
   * @param  saveData the output of [[saveObject]] on
   * a previous saved instance, or null if loading
   * is being skipped (the app instance is new).
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected loadObject(saveData: Optional<Uint8Array | null>): void {
    // Does nothing by default.
  }

  getDescendant(namePath: string[]): Collab | undefined {
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
    return child.getDescendant(namePath);
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
}

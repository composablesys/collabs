import { CollabIDMessage } from "../../generated/proto_compiled";
import { Collab, Runtime } from "../core";
import { Serializer } from "./serialization";

/**
 * A replica-independent ID for a [[Collab]].
 *
 * Use a CollabID to refer to the same [[Collab]] on different replicas.
 * In particular, use a CollabID to store
 * a (reference to a) Collab as a value in another Collab, and give that
 * other Collab a [[CollabIDSerializer]] so it can serialize them.
 *
 * For example, suppose you have a team of people represented as a [[ISet]]
 * of custom `CPerson` Collabs, and you want to use a separate
 * [[IVar]] to indicate the team leader. Then your IVar should
 * store a CollabID of the leader's CPerson, i.e., it should be a
 * `IVar<CollabID<CPerson>>`.
 * Do not use a `IVar<CPerson>` (without the CollabID) because this will
 * cause serialization issues: you cannot serialize Collabs, only CollabIDs.
 */
export class CollabID<C extends Collab> {
  /**
   * @param pathToBase  [description]
   * @param base An ancestor of the referenced Collab, used in [[get]]
   * and serialization.
   */
  constructor(
    readonly pathToBase: string[],
    // Technically this should be CollabParent. However, that is sometimes
    // annoying when you make a CollabID with a generic base, since then you
    // have to add (or cast) the CollabParent constraint to the generic type.
    readonly base: Collab | Runtime
  ) {}

  /**
   * Returns this replica's instance of the [[Collab]] with ID, or
   * undefined if it no longer exists relative to this.base.
   *
   * A Collab can cease to exist if it or one of its ancestors is deleted
   * by its parent. For example, this happens when the `Deleting` collections
   * delete a value. Existence is determined relative to this.base, so
   * it only matters whether an ancestor between the referenced Collab
   * and this.base was deleted, not whether this.base or one of its ancestors
   * was deleted.
   */
  get(): C | undefined {
    // TODO: document this: need to copy in case getDescendant modifies it.
    return <C | undefined>(
      this.base.getDescendant(this.pathToBase[Symbol.iterator]())
    );
  }

  /**
   * Returns whether this is equivalent to other: they have the same
   * `base` and identify the same [[Collab]].
   */
  equals(other: CollabID<C>): boolean {
    if (this.base !== other.base) return false;
    if (this.pathToBase.length !== other.pathToBase.length) return false;
    for (let i = 0; i < this.pathToBase.length; i++) {
      if (this.pathToBase[i] !== other.pathToBase[i]) return false;
    }
    return true;
  }

  /**
   * Returns a [[CollabID]] for `collab`.
   *
   * @param collab
   * @param  base An ancestor of the referenced Collab, used in [[get]]
   * and serialization.
   */
  static of<C extends Collab>(collab: C, base: Collab | Runtime): CollabID<C> {
    return new CollabID(base.getNamePath(collab), base);
  }
}

// OPT: cache instances? Probably not necessary - expect only one per base.
/**
 * Serializes [[CollabID]]s using their [[Collab]]'s name path with
 * respect to a specified [[base]].
 *
 * All serialized CollabIDs must have the same [[CollabID.base]] as
 * this.[[base]]. In particular, the base must be an ancestor of all serialized
 * CollabIDs' Collabs.
 */
export class CollabIDSerializer<C extends Collab>
  implements Serializer<CollabID<C>>
{
  constructor(readonly base: Collab | Runtime) {}

  serialize(value: CollabID<C>): Uint8Array {
    if (value.base !== this.base) {
      throw new Error(
        "CollabID must have same base as this CollabIDSerializer"
      );
    }
    const message = CollabIDMessage.create({
      pathToBase: value.pathToBase,
    });
    return CollabIDMessage.encode(message).finish();
  }

  deserialize(message: Uint8Array): CollabID<C> {
    const decoded = CollabIDMessage.decode(message);
    return new CollabID(decoded.pathToBase, this.base);
  }
}

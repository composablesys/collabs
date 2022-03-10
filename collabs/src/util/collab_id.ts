import { Collab, isRuntime, Runtime } from "../core";

/**
 * A replica-independent ID for a [[Collab]].
 *
 * A `CollabID` can be used to unambiguously refer to (replicas of) the same
 * [[Collab]] on different users. In particular, [[CollabIDSerializer]] and
 * [[DefaultSerializer]]
 * can serialize [[CollabID]]s.
 * Those serializers allow you to add `CollabID`s to collections, as a way of
 * adding (pointers to) `Collab`s to collections beside their parents.
 * (See also [[CollabSerializer]], which is a more convenient option when
 * you guarantee that your `Collab`s will never be deleted.)
 *
 * For example, suppose you have a `Collab` class `CNote` representing a note
 * on a collaborative note board. You can use a [[DeletingMutCSet]] to
 * create new `CNote`s. To let users archive notes and restore them later,
 * you can store the IDs of "present" (non-archived) notes in an
 * [[AddWinsCSet]]`<CollabID<CNote>>`. Then `add` and `delete` operations
 * on the `AddWinsCSet` will change which IDs (hence notes) are present,
 * without affecting the `CNote`s themselves - unlike [[DeletingMutCSet.delete]]
 * on the original set, which deletes `CNote`s permanently (making them
 * unusable). This is precisely how [[TombstoneMutCSet]] works.
 *
 * A [[CollabID]] from one [[Runtime]] can be used within
 * another. Continuing the `CNote` example, perhaps the [[AddWinsCSet]]
 * storing "present" notes has different permissions from the notes themselves,
 * e.g., only moderators can archive notes. One way to accomplish this is
 * to store that [[AddWinsCSet]] in a different [[Runtime]] using a different
 * network. That set will still work as expected, i.e., it will correctly
 * serialize and deserialize `CollabID`s. But when turning `CollabID`s back
 * into `CNote`s, you must be sure to pass the `CNote`s' runtime into
 * [[get]] (not the `AddWinsCSet`'s runtime).
 *
 * ## Getting `Collab`s and (Non-)Existence
 *
 * [[get]] converts a `CollabID` into the local replica of its `Collab`,
 * or `undefined` if that `Collab` no longer exists.
 * Whether a `Collab` exists or not is up to its ancestors and is a function
 * of the collaborative, not local, state.
 *
 * For example, after [[DeletingMutCSet.delete]] is called, the deleted value
 * and its descendants no longer exist. This is because [[DeletingMutCSet]]
 * forgets deleted values. The same is true of [[DeletingMutCList]],
 * [[DeletingMutCMap]], and (causally) overwritten values in [[MutCRegister]].
 *
 * Warnings:
 * - When you send a `CollabID` over the network (e.g., by adding it to
 * a Collabs collection), even if the corresponding `Collab` existed on
 * the sender, it may be deleted by the time other users receive the message.
 * For example, this can happen if the `Collab` is concurrently deleted from
 * a [[DeletingMutCSet]].
 * - A `Collab` may "not exist" (i.e., [[get]] returns `undefined`) even if
 * you have a local copy of it in memory. For example, if you store
 * a `Collab` in a variable, then call [[DeletingMutCSet.delete]] on it,
 * then your variable will still point to your local replica of that `Collab`,
 * but the [[DeletingMutCSet]] (and other users) will consider it non-existent.
 *
 * ## Internals
 *
 * [[namePath]]`()` is the content of this `CollabID`, i.e., the concrete,
 * serializable piece of information that uniquely identifies its [[Collab]]
 * in a replica-independent way. `Collab`s are converted to
 * name paths and vice-versa using [[Runtime.getNamePath]] and
 * [[Runtime.getDescendant]], or [[Collab.getNamePath]]
 * and [[Collab.getDescendant]] if you specify a [[Collab]] ancestor.
 */
export class CollabID<C extends Collab = Collab> {
  constructor(
    private readonly pathToBase: string[],
    private readonly base?: Collab
  ) {}

  static fromCollab<C extends Collab>(collab: C, base?: Collab): CollabID<C> {
    const realBase = base ?? collab.runtime;
    return new CollabID(realBase.getNamePath(collab), base);
  }

  /**
   * The name path of the [[Collab]] with this ID relative to the given
   * ancestor, i.e., `ancestor.getNamePath(collab)`.
   *
   * If `ancestor` is not specified, then this returns the `Collab`'s
   * full name path, i.e., `collab.runtime.getNamePath(collab)`.
   *
   * Do not modify the return value.
   */
  namePath(ancestor?: Collab): string[] {
    if (ancestor === this.base) {
      // Fast path.
      return this.pathToBase;
    } else if (this.base !== undefined) {
      const realAncestor =
        ancestor === undefined ? this.base.runtime : ancestor;
      const baseNamePath = realAncestor.getNamePath(this.base);
      if (this.pathToBase.length === 0) return baseNamePath;
      else return this.pathToBase.concat(baseNamePath);
    } else {
      // pathToBase is the full namePath.
      // Note ancestor !== this.base and this.base === undefined, so
      // ancestor !== undefined.
      const ancestorNamePath = ancestor!.runtime.getNamePath(ancestor!);
      // Check that ancestorNamePath is the tail of namePath, then return the
      // rest of namePath (the head).
      if (ancestorNamePath.length > this.pathToBase.length) {
        throw new Error("ancestor is not an ancestor of the target Collab");
      }
      // OPT: skip this error check?
      for (let i = 0; i < ancestorNamePath.length; i++) {
        if (
          ancestorNamePath[ancestorNamePath.length - 1 - i] !==
          this.pathToBase[this.pathToBase.length - 1 - i]
        ) {
          throw new Error("ancestor is not an ancestor of the target Collab");
        }
      }
      return this.pathToBase.slice(0, -ancestorNamePath.length);
    }
  }

  /**
   * Returns the local replica of the [[Collab]] with this ID, or
   * `undefined` if it no longer exists.
   *
   * Existence is defined relative to ancestor, i.e., what matters
   * is `ancestor.getDescendant`. So if you can guarantee that ancestor
   * and its descendants will never delete the `Collab` with this ID,
   * then you can safely ignore the undefined case.
   *
   * As with [[Collab]] methods, this method should not be called
   * before [[Runtime.load]] is completed; otherwise, behavior is undefined.
   *
   * @param ancestor An ancestor of the target [[Collab]].
   */
  get(ancestor: Runtime | Collab): C | undefined {
    if (ancestor === this.base) {
      return <C | undefined>this.base.getDescendant(this.pathToBase);
    } else if (isRuntime(ancestor)) {
      return <C | undefined>ancestor.getDescendant(this.namePath());
    } else {
      const namePath = this.namePath();
      const ancestorNamePath = ancestor.runtime.getNamePath(ancestor);
      // OPT: skip these error checks?
      if (ancestorNamePath.length > namePath.length) {
        throw new Error("ancestor is not an ancestor of the target Collab");
      }
      let i: number;
      for (i = 0; i < ancestorNamePath.length; i++) {
        if (
          ancestorNamePath[ancestorNamePath.length - 1 - i] !==
          namePath[namePath.length - 1 - i]
        ) {
          throw new Error("ancestor is not an ancestor of the target Collab");
        }
      }
      return <C | undefined>(
        ancestor.getDescendant(
          namePath.slice(0, namePath.length - ancestorNamePath.length)
        )
      );
    }
  }

  /**
   * @return Whether `other` and `this` are IDs for the same
   * [[Collab]] (assuming they both target `Collab`s in the same [[Runtime]]).
   */
  equals(other: CollabID<C>): boolean {
    if (this.base === other.base) {
      // Fast path.
      return this.stringArrayEquals(this.pathToBase, other.pathToBase);
    } else {
      return this.stringArrayEquals(this.namePath(), other.namePath());
    }
  }

  private stringArrayEquals(a: string[], b: string[]): boolean {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
}

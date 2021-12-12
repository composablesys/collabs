import { Crdt } from "./crdt";
import { Runtime } from "./runtime";

/**
 * Interface implemented by something that can be a parent
 * of a [[Crdt]].
 *
 * Consumers should use [[CrdtParent]] instead of this interface.
 * You should only reference this interface directly if you
 * are a [[Crdt]] implementing it in order to be a [[CrdtParent]].
 */
export interface ICrdtParent {
  childSend(child: Crdt, messagePath: (Uint8Array | string)[]): void;

  /**
   * Returns context added by this particular [[CrdtParent]]
   * for the given key, or undefined if not added.
   *
   * Keys are queried by [[Crdt.getContext]] in
   * a call chain (like in object inheritance): first, the [[Crdt]]
   * calls `getAddedContext(key)` on the parent;
   * if that returns undefined, it calls on the grandparent,
   * etc., ending with the [[Runtime]].
   *
   * As in object inheritance, a key present in one [[Crdt]]
   * overshadows its ancestors' values for that key,
   * but that [[Crdt]] may choose to consult the next
   * higher up value, accessed through its own [[Crdt.getContext]]
   * method.
   *
   * The returned context may be a value or a function.
   * The value case is analogous to a property,
   * while the function case is analogous to a method.
   */
  getAddedContext(key: symbol): any | undefined;
}

/**
 * Something that can be a parent of a [[Crdt]]: either
 * a [[Runtime]] or a [[Crdt]] that can have children.
 */
export type CrdtParent = ICrdtParent & (Crdt | Runtime);

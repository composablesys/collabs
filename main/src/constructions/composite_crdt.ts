import { Crdt, CrdtEventsRecord, CausalTimestamp, Pre } from "../core";

/**
 * TODO: usage.
 *
 * TODO: type params
 */
export class CompositeCrdt<
  Events extends CrdtEventsRecord = CrdtEventsRecord,
  C extends Crdt = Crdt
> extends Crdt<Events> {
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
    const child = preChild({ name, parent: this });
    this.children.set(name, child);
    return child;
  }

  protected receiveInternal(
    targetPath: string[],
    timestamp: CausalTimestamp,
    message: Uint8Array
  ): void {
    if (targetPath.length === 0) {
      // We are the target
      throw new Error("CompositeCrdt received message for itself");
    }

    let child = this.children.get(targetPath[targetPath.length - 1]);
    if (child === undefined) {
      throw new Error(
        "Unknown child: " +
          targetPath[targetPath.length - 1] +
          " in: " +
          JSON.stringify(targetPath) +
          ", children: " +
          JSON.stringify([...this.children.keys()])
      );
    }
    targetPath.length--;
    child.receive(targetPath, timestamp, message);
  }

  getChild(name: string): Crdt {
    const child = this.children.get(name);
    if (child === undefined) {
      throw new Error(
        "Unknown child: " +
          name +
          ", children: " +
          JSON.stringify([...this.children.keys()])
      );
    }
    return child;
  }

  /**
   * @return true if canGc() returns true on every child
   */
  canGc(): boolean {
    for (let child of this.children.values()) {
      if (!child.canGc()) return false;
    }
    return true;
  }

  save(): [saveData: Uint8Array, children: Map<string, Crdt>] {
    return [this.saveComposite(), this.children];
  }

  /**
   * Override to save extra state, which is passed
   * to loadComposite during load after the children
   * are initialized.
   * @return [description]
   */
  protected saveComposite(): Uint8Array {
    return new Uint8Array();
  }

  load(saveData: Uint8Array): boolean {
    this.loadComposite(saveData);
    return true;
  }

  /**
   * Note this is called after the children are initialized
   * but before they are loaded.
   *
   * @param  saveData the output of saveComposite() on
   * a previous saved instance
   */
  protected loadComposite(saveData: Uint8Array) {}

  // You can also choose to override postLoad().
}

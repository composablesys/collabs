import { CausalTimestamp } from "../../net";
import { Crdt, CrdtEventsRecord } from "./crdt";
import { CrdtParent } from "./interfaces";

/**
 * TODO: usage.
 *
 * TODO: type params
 */
export class CompositeCrdt<
    Events extends CrdtEventsRecord = CrdtEventsRecord,
    C extends Crdt = Crdt
  >
  extends Crdt<Events>
  implements CrdtParent
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
  protected addChild<D extends C>(name: string, child: D): D {
    if (this.children.has(name)) {
      throw new Error('Duplicate child name: "' + name + '"');
    }
    this.children.set(name, child);
    if (this.afterInit) this.initChild(name, child);
    return child;
  }

  init(name: string, parent: CrdtParent) {
    super.init(name, parent);
    // Init children added before init was called
    for (let entry of this.children.entries()) {
      this.initChild(entry[0], entry[1]);
    }
  }

  private initChild(name: string, child: C) {
    this.childBeingAdded = child;
    child.init(name, this);
    this.childBeingAdded = undefined;
  }

  private childBeingAdded?: C;
  onChildInit(child: Crdt) {
    if (child != this.childBeingAdded) {
      throw new Error(
        "this was passed to Crdt.init as parent externally" +
          " (use this.addChild instead)"
      );
    }
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

  saveComposite(): Uint8Array {
    return new Uint8Array();
  }

  load(saveData: Uint8Array) {
    this.loadComposite(saveData);
  }

  loadComposite(saveData: Uint8Array) {}

  // You can also choose to override postLoad().
}

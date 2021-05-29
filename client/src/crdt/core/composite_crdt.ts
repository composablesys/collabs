export class CompositeCrdt<
    Events extends CrdtEventsRecord = CrdtEventsRecord,
    C extends Crdt = Crdt
  >
  extends Crdt<Events>
  implements CrdtParent 
{
  private readonly children: Map<string, C> = new Map();

  /**
   * TODO.  child returned to allow writing e.g.
   * this.foo = this.addChild("foo", new Counter());
   *
   * TODO: pass constructor and params instead, to enforce that the Crdt
   * is fresh and that we will call init?
   *
   * TODO: instead of passing name, just use 0, 1, 2, ...?
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
      throw new Error("TODO");
    }

    let child = this.children.get(targetPath[targetPath.length - 1]);
    if (child === undefined) {
      // TODO: deliver error somewhere reasonable
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

  getDescendant(targetPath: string[]): Crdt {
    if (targetPath.length === 0) return this;

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
    return child.getDescendant(targetPath);
  }

  canGC(): boolean {
    for (let child of this.children.values()) {
      if (!child.canGC()) return false;
    }
    return true;
  }
}

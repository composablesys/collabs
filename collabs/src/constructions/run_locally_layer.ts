import {
  Crdt,
  CrdtEventsRecord,
  InitToken,
  MessageMeta,
  ParentCrdt,
  Pre,
} from "../core";

/**
 * Layer that allows you to run operations on its descendants
 * locally only, not as a replicated operation, by calling
 * [[runLocally]].
 *
 * TODO: use case (bulk ops, renamed ops)
 */
export class RunLocallyLayer extends Crdt implements ParentCrdt {
  private child!: Crdt;
  private runLocallyMeta: MessageMeta | null = null;

  setChild<C extends Crdt>(preChild: Pre<C>): C {
    const child = preChild(new InitToken("", this));
    this.child = child;
    return child;
  }

  // TODO: permit nested runLocally calls? Then need to
  // count nesting

  runLocally<T>(meta: MessageMeta, doPureOps: () => T): T {
    const oldRunLocallyMeta = this.runLocallyMeta;
    this.runLocallyMeta = meta;
    const ret = doPureOps();
    this.runLocallyMeta = oldRunLocallyMeta;
    return ret;
  }

  childSend(
    child: Crdt<CrdtEventsRecord>,
    messagePath: (string | Uint8Array)[]
  ): void {
    if (child !== this.child) {
      throw new Error("childSend called by non-child: " + child);
    }

    if (this.runLocallyMeta !== null) {
      // Local echo only.
      this.child.receive(messagePath, this.runLocallyMeta);
    } else {
      // Normal send.
      this.send(messagePath);
    }
  }

  nextMessageMeta(): MessageMeta {
    if (this.runLocallyMeta !== null) {
      // TODO: is this appropriate/needed?
      return this.runLocallyMeta;
    } else return this.parent.nextMessageMeta();
  }

  protected receiveInternal(
    messagePath: (string | Uint8Array)[],
    meta: MessageMeta
  ): void {
    this.child.receive(messagePath, meta);
  }

  save(): Uint8Array {
    return this.child.save();
  }

  load(saveData: Uint8Array | null): void {
    this.child.load(saveData);
  }

  getDescendant(namePath: string[]): Crdt<CrdtEventsRecord> {
    if (namePath.length === 0) return this;
    if (namePath[namePath.length - 1] !== "") {
      throw new Error("Unrecognized child: " + namePath[namePath.length - 1]);
    }
    namePath.length--;
    return this.child.getDescendant(namePath);
  }

  canGc(): boolean {
    return this.child.canGc();
  }
}

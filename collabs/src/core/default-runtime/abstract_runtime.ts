import { Crdt, CrdtEventsRecord, InitToken, Pre } from "../crdt";
import { EventEmitter } from "../event_emitter";
import { MessageMeta } from "../message_meta";
import { Runtime } from "../runtime";

/**
 * Skeletal implementation of [[Runtime]] that implements
 * most behavior using a [[rootCrdt]].
 */
export abstract class AbstractRuntime<Events extends CrdtEventsRecord>
  extends EventEmitter<Events>
  implements Runtime
{
  readonly isRuntime: true = true;
  /**
   * Readonly. Set with setRootCrdt.
   */
  protected rootCrdt!: Crdt;

  constructor(readonly replicaId: string) {
    super();
  }

  protected setRootCrdt<C extends Crdt>(preRootCrdt: Pre<C>): C {
    const rootCrdt = preRootCrdt(new InitToken("", this));
    this.rootCrdt = rootCrdt;
    return rootCrdt;
  }

  private idCounter = 0;
  getReplicaUniqueNumber(count = 1): number {
    const ans = this.idCounter;
    this.idCounter += count;
    return ans;
  }

  getUniqueString(): string {
    // TODO: shorten?  (base64 instead of base10)
    return this.getReplicaUniqueNumber() + " " + this.replicaId;
  }

  getNamePath(descendant: Crdt): string[] {
    return this.rootCrdt.getNamePath(descendant);
  }

  getDescendant(namePath: string[]): Crdt {
    return this.rootCrdt.getDescendant(namePath);
  }

  load(saveData: Uint8Array | null): Promise<void> {
    return this.rootCrdt.load(saveData);
  }

  save(): Promise<Uint8Array> {
    return this.rootCrdt.save();
  }

  abstract childSend(child: Crdt, messagePath: Uint8Array[]): void;

  abstract nextMessageMeta(): MessageMeta;

  abstract registerCrdt<C extends Crdt>(name: string, preCrdt: Pre<C>): C;
}

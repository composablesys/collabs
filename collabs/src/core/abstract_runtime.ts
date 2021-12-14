import { Collab, CollabEventsRecord, InitToken, Pre } from "../crdt";
import { EventEmitter } from "../event_emitter";
import { MessageMeta } from "../message_meta";
import { Runtime } from "../runtime";

/**
 * Skeletal implementation of [[Runtime]] that implements
 * most behavior using a root [[Collab]].
 */
export abstract class AbstractRuntime<Events extends CollabEventsRecord>
  extends EventEmitter<Events>
  implements Runtime
{
  readonly isRuntime: true = true;
  /**
   * Readonly. Set with setRootCollab.
   */
  protected rootCollab!: Collab;

  constructor(readonly replicaId: string) {
    super();
  }

  protected setRootCollab<C extends Collab>(preRootCollab: Pre<C>): C {
    const rootCollab = preRootCollab(new InitToken("", this));
    this.rootCollab = rootCollab;
    return rootCollab;
  }

  save(): Uint8Array {
    return this.rootCollab.save();
  }

  load(saveData: Uint8Array | null): void {
    this.rootCollab.load(saveData);
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

  getNamePath(descendant: Collab): string[] {
    return this.rootCollab.getNamePath(descendant);
  }

  getDescendant(namePath: string[]): Collab {
    return this.rootCollab.getDescendant(namePath);
  }

  abstract childSend(child: Collab, messagePath: Uint8Array[]): void;

  abstract nextMessageMeta(): MessageMeta;

  abstract registerCollab<C extends Collab>(name: string, preCollab: Pre<C>): C;
}

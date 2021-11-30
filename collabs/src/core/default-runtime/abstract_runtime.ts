import { Crdt, InitToken, Pre } from "../crdt";
import { MessageMeta } from "../message_meta";
import { Runtime } from "../runtime";

/**
 * Skeletal implementation of [[Runtime]] that implements
 * most behavior using a [[rootCrdt]].
 */
export abstract class AbstractRuntime<M extends MessageMeta = MessageMeta>
  implements Runtime<M>
{
  readonly isRuntime: true = true;
  readonly rootCrdt: Crdt;

  constructor(readonly replicaId: string, preRootCrdt: Pre<Crdt>) {
    this.rootCrdt = preRootCrdt(new InitToken("", this));
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

  abstract nextMessageMeta(): M;

  abstract registerCrdt<C extends any>(name: string, preCrdt: any): C;
}

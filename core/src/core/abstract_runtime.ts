import { Serializer } from "../util";
import { makeUID } from "../util/uid";
import { Collab, CollabEventsRecord, InitToken } from "./collab";
import { Message, MessageMeta, MetaRequest } from "./message";
import { Runtime } from "./runtime";

class MetaSerializer implements Serializer<MessageMeta> {
  constructor(readonly runtimeSpecificSerializer: Serializer<unknown>) {}

  serialize(value: MessageMeta): Uint8Array {
    // OPT: protobuf version
    const msg = {
      type: value.type,
      creator: value.creator,
      runtimeSpecific: this.runtimeSpecificSerializer.serialize(
        value.runtimeSpecific
      ),
    };
    return new Uint8Array(Buffer.from(JSON.stringify(msg)));
  }
  deserialize(message: Uint8Array): MessageMeta {
    const msg = <
      { type: "op" | "save"; creator: string; runtimeSpecific: Uint8Array }
    >JSON.parse(Buffer.from(message).toString());
    return {
      type: msg.type,
      creator: msg.creator,
      runtimeSpecific: this.runtimeSpecificSerializer.deserialize(
        msg.runtimeSpecific
      ),
    };
  }
}

/**
 * Skeletal implementation of [[Runtime]] that uses
 * a root [[Collab]].
 */
export abstract class AbstractRuntime implements Runtime {
  readonly isRuntime: true = true;
  readonly metaSerializer: Serializer<MessageMeta>;
  /**
   * Readonly. Set with setRootCollab.
   */
  protected rootCollab!: Collab;

  /**
   * @param replicaID This replica's [[replicaID]].
   * @param runtimeSpecificSerializer Serializer for this Runtime's [[MessageMeta.runtimeSpecific]] type.
   */
  constructor(
    readonly replicaID: string,
    runtimeSpecificSerializer: Serializer<unknown>
  ) {
    if (replicaID === "") {
      throw new Error('replicaID must not be ""');
    }
    this.metaSerializer = new MetaSerializer(runtimeSpecificSerializer);
  }

  protected setRootCollab<C extends Collab>(
    rootCallback: (init: InitToken) => C
  ): C {
    const rootCollab = rootCallback(new InitToken("", this));
    this.rootCollab = rootCollab;
    return rootCollab;
  }

  private idCounter = 0;
  getLocalCounter(count = 1): number {
    const ans = this.idCounter;
    this.idCounter += count;
    return ans;
  }

  getUID(): string {
    return makeUID(this.replicaID, this.getLocalCounter());
  }

  getNamePath(descendant: Collab): string[] {
    return this.rootCollab.getNamePath(descendant);
  }

  getDescendant(namePath: string[]): Collab | undefined {
    return this.rootCollab.getDescendant(namePath);
  }

  abstract childSend(
    child: Collab<CollabEventsRecord>,
    messagePath: Message[],
    metaRequests: MetaRequest[]
  ): void;
}

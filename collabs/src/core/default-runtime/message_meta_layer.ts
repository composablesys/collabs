import { MessageMetaLayerMessage } from "../../../generated/proto_compiled";
import { int64AsNumber } from "../../util";
import { Crdt, CrdtEventsRecord, InitToken, Pre } from "../crdt";
import { ParentCrdt } from "../crdt_parent";
import { MessageMeta } from "../message_meta";

/**
 * Crdt that provides optional MessageMeta fields to its
 * descendants.
 */
export class MessageMetaLayer extends Crdt implements ParentCrdt {
  private child!: Crdt;
  /**
   * Excludes this.replicaId.
   */
  private currentVectorClock = new Map<string, number>();
  /**
   * The current Lamport meta, i.e., the max meta
   * sent or received so far.
   * Note the next message's senderCounter will be one greater.
   * @param  newInitToken("",this [description]
   * @return                      [description]
   */
  private currentLamportTimestamp: number = 0;

  // These are all cached so that === equality is valid.
  private pendingMeta: MessageMeta | null = null;
  private pendingMetaBase: MessageMeta | null = null;
  private pendingMetaSerialized: Uint8Array | null = null;

  setChild<C extends Crdt>(preChild: Pre<C>): C {
    const child = preChild(new InitToken("", this));
    this.child = child;
    return child;
  }

  /**
   * TODO: calling this the first time sets the meta's time,
   * which is a little weird for a not-obviously-mutating
   * method name.
   *
   * Note that the return value is invalid once any
   * other messages are sent/received by this layer or
   * parent's nextMessageMeta() changes.
   *
   * @return [description]
   */
  nextMessageMeta(): MessageMeta {
    if (
      this.pendingMeta === null ||
      this.pendingMetaBase !== this.parent.nextMessageMeta()
    ) {
      // pendingMeta is either not yet created, or invalidated
      // by our parent's meta change; make a new one.
      const parentMeta = this.parent.nextMessageMeta();
      const vcMapCopy = new Map(this.currentVectorClock);
      const meta: MessageMeta = {
        ...parentMeta,
        vectorClock: {
          get(replicaId) {
            return vcMapCopy.get(replicaId) ?? 0;
          },
        },
        wallClockTime: Date.now(),
        lamportTimestamp: this.currentLamportTimestamp + 1,
      };
      this.pendingMeta = meta;

      // Also update other cached fields.
      this.pendingMetaBase = parentMeta;
      const metaMessage = MessageMetaLayerMessage.create({
        vectorClock: Object.fromEntries(this.currentVectorClock),
        wallClockTime: meta.wallClockTime!,
        lamportTimestamp: meta.lamportTimestamp!,
      });
      this.pendingMetaSerialized =
        MessageMetaLayerMessage.encode(metaMessage).finish();
    }
    return this.pendingMeta;
  }

  childSend(
    child: Crdt<CrdtEventsRecord>,
    messagePath: (Uint8Array | string)[]
  ): void {
    if (child !== this.child) {
      throw new Error("childSend called by non-child: " + child);
    }

    // TODO: optimization: if parent.nextMessageMeta()
    // is unchanged, we can assume this message will be batched
    // with the previous (TODO: document this guarantee
    // in ParentCrdt, Runtime). So even if our meta has changed,
    // we can just send the diff (e.g. updated vector clock entry,
    // skip updating time?).

    // Add the next MessageMeta, serialized, to messagePath.
    // First call nextMessageMeta() to ensure it's created.
    this.nextMessageMeta();
    messagePath.push(this.pendingMetaSerialized!);
    this.send(messagePath);
  }

  protected receiveInternal(
    messagePath: Uint8Array[],
    meta: MessageMeta
  ): void {
    if (messagePath.length === 0) {
      throw new Error("messagePath.length === 0");
    }

    // Deserialize messagePath[messagePath.length - 1] to get
    // our optional MessageMeta fields.
    const metaDeserialized = MessageMetaLayerMessage.decode(
      messagePath[messagePath.length - 1]
    );
    const lamportTimestamp = int64AsNumber(metaDeserialized.lamportTimestamp);
    const newMeta: MessageMeta = {
      ...meta,
      vectorClock: {
        get(replicaId) {
          return int64AsNumber(metaDeserialized.vectorClock[replicaId] ?? 0);
        },
      },
      wallClockTime: int64AsNumber(metaDeserialized.wallClockTime),
      lamportTimestamp,
    };

    // Propagate the message.
    messagePath.length--;
    this.child.receive(messagePath, newMeta);

    // Update our own state to reflect newMeta.
    if (meta.isLocal) {
      this.currentLamportTimestamp++;
    } else {
      this.currentVectorClock.set(meta.sender, meta.senderCounter);
      this.currentLamportTimestamp = Math.max(
        lamportTimestamp,
        this.currentLamportTimestamp
      );
    }
    // Invalidate the current pendingMeta.
    this.pendingMeta = null;
    this.pendingMetaBase = null;
    this.pendingMetaSerialized = null;
  }

  save(): Uint8Array {
    throw new Error("Method not implemented.");
  }

  load(saveData: Uint8Array | null): void {
    throw new Error("Method not implemented.");
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
    // Vector clock state is never trivial.
    return false;
  }
}
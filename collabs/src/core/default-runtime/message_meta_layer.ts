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
   * The current Lamport timestamp, i.e., the max timestamp
   * sent or received so far.
   * Note the next message's senderCounter will be one greater.
   * @param  newInitToken("",this [description]
   * @return                      [description]
   */
  private currentLamportTimestamp: number = 0;

  private pendingMeta: MessageMeta | null = null;

  setChild<C extends Crdt>(preChild: Pre<C>): C {
    const child = preChild(new InitToken("", this));
    this.child = child;
    return child;
  }

  /**
   * TODO: calling this the first time sets the meta's time,
   * which is a little weird for a not-obviously-mutating
   * method name.
   * Also, it's invalidated if any other messages are sent/received.
   * @return [description]
   */
  nextMessageMeta(): MessageMeta {
    if (this.pendingMeta === null) {
      // Create the next MessageMeta.
      const vcMapCopy = new Map(this.currentVectorClock);
      this.pendingMeta = {
        ...this.parent.nextMessageMeta(),
        vectorClock: {
          get(replicaId) {
            return vcMapCopy.get(replicaId) ?? 0;
          },
        },
        wallClockTime: Date.now(),
        lamportTimestamp: this.currentLamportTimestamp + 1,
      };
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

    // Add the next MessageMeta, serialized, to messagePath.
    const meta = this.nextMessageMeta();
    const metaMessage = MessageMetaLayerMessage.create({
      vectorClock: Object.fromEntries(this.currentVectorClock),
      wallClockTime: meta.wallClockTime!,
      lamportTimestamp: meta.lamportTimestamp!,
    });
    const metaSerialized = MessageMetaLayerMessage.encode(metaMessage).finish();

    messagePath.push(metaSerialized);
    this.send(messagePath);

    // Update metadata for the next message.
    this.currentLamportTimestamp++;
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
    if (!meta.isLocal) {
      this.currentVectorClock.set(meta.sender, meta.senderCounter);
      this.currentLamportTimestamp = Math.max(
        lamportTimestamp,
        this.currentLamportTimestamp
      );
    }
  }

  load(saveData: Uint8Array | null): Promise<void> {
    throw new Error("Method not implemented.");
  }

  save(): Promise<Uint8Array> {
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

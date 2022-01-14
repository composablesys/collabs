import {
  MessageMeta,
  InitToken,
  CPrimitive,
  Optional,
  CollabEventsRecord,
  CollabEvent,
} from "@collabs/collabs";
import { ContainerHostSave } from "../generated/proto_compiled";
import { ContainerMessage, HostMessage } from "./message_types";

// TODO: ability to send our own metadata to the container
// (e.g. user's name)?
// More generally, arbitrary message-passing ability?

export interface CRDTContainerHostEventsRecord extends CollabEventsRecord {
  /**
   * Emitted when [[CRDTContainerHost.isContainerReady]]
   * becomes true, hence user interaction with the container
   * is allowed.
   *
   * Note that this is a local, not replicated, event: it refers
   * to conditions on the local replica related to the
   * app start cycle, not something that all replicas see
   * in sync.
   */
  ContainerReady: CollabEvent;
  /**
   * Emitted when [[CRDTContainerHost.metadata]]
   * changes, including when it first becomes present.
   *
   * Note this is a local, not replicated, event: metadata
   * is local and may differ between replicas, and so
   * replicas may not see changes in sync.
   */
  MetadataChange: CollabEvent;
}

/**
 * TODO: usage: make sure to block user input to the container
 * before [[isContainerReady]] / "ContainerReady" event!
 * (Sample code with nextEvent)
 */
export class CRDTContainerHost extends CPrimitive<CRDTContainerHostEventsRecord> {
  private messagePort: MessagePort | null = null;
  private _isContainerReady = false;
  private _metadata: Optional<unknown> = Optional.empty();

  /**
   * Queue for messages to be sent over messagePort,
   * before it exists.
   */
  private sendQueue: ContainerMessage[] | null = [];

  /**
   * The latest save data received from the container
   * (possibly extracted in [[load]], i.e., from a prior
   * replica), or null if no save
   * data was ever received.
   */
  private latestSaveData: Uint8Array | null = null;
  /**
   * The ID for the next received message.
   * This increases each time.
   * Note that if further messages are found in [[load]],
   * then those messages get ids 0, 1, ...; newly
   * received messages then start where they leave off.
   */
  private nextReceivedMessageID = 0;
  /**
   * Received messages that are not accounted for in
   * latestSaveData, tagged with their IDs,
   * in order of receipt.
   *
   * This includes messages found in [[load]] (until they
   * become accounted for in latestSaveData).
   */
  private furtherReceivedMessages: [id: number, message: Uint8Array][] = [];
  /**
   * Sent messages (i.e., sent by the container)
   * that are not accounted for in latestSaveData.
   * predID is the ID of the last message the replica
   * received before sending a message (-1 if no messages
   * received), counting received messages found in [[loadd]].
   */
  private furtherSentMessages: [predID: number, message: Uint8Array][] = [];

  /**
   * TODO: timing assumptions: before container is
   * constructed in its IFrame (e.g., in the same thread
   * as the IFrame as created, so it's not loaded yet).
   *
   * @param containerIFrame [description]
   */
  constructor(
    initToken: InitToken,
    readonly containerIFrame: HTMLIFrameElement
  ) {
    super(initToken);

    // Listen for this.messagePort.
    window.addEventListener(
      "message",
      (e) => {
        // TODO: what if contentWindow is not accessible, due to
        // same-origin policy, or because it's still null
        // for some reason?
        if (e.source !== containerIFrame.contentWindow) return;
        // TODO: other checks?
        this.messagePort = e.ports[0];
        // Send queued messages.
        this.sendQueue!.forEach((message) =>
          this.messagePort!.postMessage(message)
        );
        this.sendQueue = null;
        // Begin receiving.
        // Do this last just in case it starts receiving
        // synchronously (although I'm guessing the spec doesn't
        // actually allow that).
        this.messagePort.onmessage = this.messagePortReceive.bind(this);
      },
      { once: true }
    );
  }

  private messagePortSend(message: ContainerMessage) {
    if (this.messagePort === null) {
      this.sendQueue!.push(message);
    } else {
      this.messagePort.postMessage(message);
    }
  }

  private messagePortReceive(e: MessageEvent<HostMessage>) {
    switch (e.data.type) {
      case "Ready":
        this._isContainerReady = true;
        this.emit("ContainerReady", {
          meta: { isLocalEcho: true, sender: this.runtime.replicaID },
        });
        break;
      case "Metadata":
        this._metadata = Optional.of(e.data.metadata);
        this.emit(
          "MetadataChange",
          { meta: { isLocalEcho: true, sender: this.runtime.replicaID } },
          false
        );
        break;
      case "Send":
        const message = e.data.message;
        this.furtherSentMessages.push([e.data.predID, message]);
        this.sendPrimitive(message);
        break;
      case "Saved":
        this.latestSaveData = e.data.saveData;
        // Trim further messages that are accounted for by the
        // save: all sent messages, and all received messages
        // with id <= e.data.lastReceivedID.
        this.furtherSentMessages.splice(0);
        if (this.furtherReceivedMessages.length > 0) {
          const startID = this.furtherReceivedMessages[0][0];
          const deleteCount = e.data.lastReceivedID - startID + 1;
          this.furtherReceivedMessages.splice(0, deleteCount);
        }
        // Resolve the Promise returned by the
        // original compactSaveData call.
        if (e.data.requestID !== undefined) {
          const resolve = this.compactSaveDataResolves.get(e.data.requestID);
          if (resolve !== undefined) {
            this.compactSaveDataResolves.delete(e.data.requestID);
            resolve();
          }
        }
        break;
      default:
        throw new Error("bad e.data: " + e.data);
    }
  }

  protected receivePrimitive(message: Uint8Array, meta: MessageMeta): void {
    if (!meta.isLocalEcho) {
      const id = this.nextReceivedMessageID++;
      this.messagePortSend({ type: "Receive", message, id });
      this.furtherReceivedMessages.push([id, message]);
    }
    // Else the container already processed it.
  }

  /**
   * Whether the container is ready to be used by the
   * user.
   *
   * Specifically, this becomes true once all of the following are true:
   * - The container's IFrame is loaded.
   * - The container's [[ContainerAppSource]] has been initialized.
   * - [[load]] has been called (including the case that
   * it was called with an empty Optional, i.e., there is
   * no prior save data), the container received our message
   * with its save data, and we received an ack from the container
   * confirming that it finished loading that save data.
   *
   * Until the container is ready, you MUST block user inputs
   * for the container.
   * E.g., hide the IFrame (but not in a way that prevents
   * loading), or overlay it with a blur and a spinner.
   *
   * A [[CRDTContainerHostEventsRecord.ContainerReady]] event
   * is emitted immediately after this becomes true.
   */
  get isContainerReady(): boolean {
    return this._isContainerReady;
  }

  /**
   * Metadata provided by the container.
   *
   * It is initially not present. It becomes present when
   * we first receive metadata from the container
   * (by receiving a message sent during
   * [[CRDTContainer]]'s constructor), then may be changed
   * by the container. Each change, including the first
   * (becoming present), is signalled by a "MetadataChange"
   * event.
   *
   * TODO: structure/interface (e.g. default fields: name, description,
   * etc. Can even be optional.)
   */
  get metadata(): Optional<unknown> {
    return this._metadata;
  }

  private nextCompactSaveDataID = 0;
  private compactSaveDataResolves = new Map<number, () => void>();
  /**
   * TODO: asks the container for its saveData and uses
   * that in our own save message instead of
   * (previous saveData, if any) + log of messages.
   * I.e. log compaction.
   *
   * Resolves when done (next call to save() will include
   * the compacted saveData due to this method call).
   * Note it's not guaranteed that
   * the log will be empty even if you then call save() right away,
   * because the container may have sent/received more messages
   * during the async wait.
   *
   * TODO: advice on when to do? Measurement methods;
   * setInterval; how to remove when done with the container?
   *
   * @return [description]
   */
  compactSaveData(): Promise<void> {
    const requestID = this.nextCompactSaveDataID++;
    this.messagePortSend({ type: "SaveRequest", requestID });
    return new Promise((resolve) => {
      // resolve will be called by the "saved" message handler.
      this.compactSaveDataResolves.set(requestID, resolve);
    });
  }

  save(): Uint8Array {
    // Sort further messages in the order they were processed
    // (sent or received) by the container.
    // This means that each sent message comes right after
    // the received message with its predID
    // (except that earlier sent messages with the same predID
    // come first, of course).
    const furtherMessages = new Array<Uint8Array>(
      this.furtherSentMessages.length + this.furtherReceivedMessages.length
    );
    let i = 0,
      j = 0;
    while (i + j < furtherMessages.length) {
      const sent = this.furtherSentMessages[i];
      const received = this.furtherReceivedMessages[j];
      // Deciding whether to push the next sent message
      // or the next received mesage:
      // if the received message is a predecessor of the sent
      // message, we push the received message, else we
      // push the sent message.
      if (received[0] <= sent[0]) {
        furtherMessages[i + j] = received[1];
        j++;
      } else {
        furtherMessages[i + j] = sent[1];
        i++;
      }
    }

    // Note that it makes sense to treat all further message
    // (sent + received) as received messages in the saveData:
    // from a newly-loaded replica's perspective, they're all
    // received messages (sent by different replicas).
    const message = ContainerHostSave.create({
      latestSaveData: this.latestSaveData,
      furtherMessages,
    });
    return ContainerHostSave.encode(message).finish();
  }

  load(saveData: Optional<Uint8Array>): void {
    // Set our latestSaveData and furtherMessages.
    if (!saveData.isPresent) {
      // Leave this.latestSaveData, this.furtherReceivedMessages
      // as their initial values (null, []).
      this.messagePortSend({
        type: "Load",
        skipped: true,
      });
    } else {
      const decoded = ContainerHostSave.decode(saveData.get());
      this.latestSaveData = Object.prototype.hasOwnProperty.call(
        decoded,
        "latestSaveData"
      )
        ? decoded.latestSaveData
        : null;
      this.furtherReceivedMessages = decoded.furtherMessages.map(
        (message, index) => [index, message]
      );
      this.nextReceivedMessageID = this.furtherReceivedMessages.length;

      this.messagePortSend({
        type: "Load",
        skipped: false,
        latestSaveData: this.latestSaveData,
        furtherMessages: decoded.furtherMessages,
        lastID: decoded.furtherMessages.length - 1,
      });
    }
  }

  canGC(): boolean {
    return false;
  }
}

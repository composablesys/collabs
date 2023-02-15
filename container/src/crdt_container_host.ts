import {
  CollabEvent,
  CollabEventsRecord,
  CPrimitive,
  InitToken,
  Optional,
  UpdateMeta,
} from "@collabs/collabs";
import { ContainerHostSave } from "../generated/proto_compiled";
import { ContainerMessage, HostMessage, ReceiveMessage } from "./message_types";

// TODO: ability to send our own metadata to the container
// (e.g. user's name)?
// More generally, arbitrary message-passing ability?

export interface CRDTContainerHostEventsRecord extends CollabEventsRecord {
  /**
   * Emitted when [[CRDTContainerHost.isContainerReady]]
   * becomes true, hence user interaction with the container
   * is allowed.
   *
   * This event may be emitted as soon as the next event loop
   * iteration after you initialize the container's IFrame.
   * So, you must either add an event handler within the same
   * event loop iteration that you initialize the IFrame,
   * or check [[CRDTContainerHost.isContainerReady]] before
   * adding the handler.
   *
   * Note that this is a local, not replicated, event: it refers
   * to conditions on the local replica related to the
   * app start cycle, not something that all replicas see
   * in sync.
   */
  ContainerReady: CollabEvent;
}

/**
 * A host for a Collabs container running in a child IFrame.
 *
 * See [container docs](https://github.com/composablesys/collabs/blob/master/collabs/docs/containers.md).
 *
 * A `CRDTContainerHost` connects to the `CRDTContainer`
 * instance running in the `containerIFrame` provided to
 * the constructor. All messages sent by the `CRDTContainer`
 * become messages sent by this class, and likewise for
 * received messages. This class's save data is also
 * derived from the container's own save data, and likewise,
 * the container is loaded based on the save data passed to [[load]].
 *
 * You are responsible for blocking user input to `containerIFrame`
 * until [[isContainerReady]] is true (signalled by the
 * "ContainerReady" event). Otherwise, the user might interact
 * with the container before it is loaded, causing errors.
 * Typically, you'll also want to hide the `containerIFrame`
 * until then, so that the user doesn't see partially-initialized
 * state. You can accomplish both by setting
 * `containerIFrame.hidden = true`, then when it is ready,
 * setting `containerIFrame.hidden = false`.
 *
 * You can use `CRDTContainerHost` to embed Collabs containers
 * inside your own app. In particular, if you want to
 * support a specific network/storage/UX/etc. for containers,
 * you can do so by making a Collabs app
 * that uses your chosen network/storage/UX/etc.,
 * with a `CRDTContainerHost` as its single Collab, and with
 * some way for users to specify the container.
 */
export class CRDTContainerHost extends CPrimitive<CRDTContainerHostEventsRecord> {
  private messagePort: MessagePort | null = null;
  private _isContainerReady = false;

  /**
   * Queue for messages to be sent over messagePort,
   * before it exists.
   */
  private messagePortQueue: ContainerMessage[] | null = [];

  /**
   * Queue for ReceiveMessages that are received
   * (via receivePrimitive) before the container is ready.
   */
  private receiveMessageQueue: ReceiveMessage[] | null = [];

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
   * Constructs a `CRDTContainerHost` that connects to the `CRDTContainer`
   * instance running in `containerIFrame`.
   *
   * Restrictions for now:
   * - `containerIFrame`'s `window.parent` must be your `window`.
   * - You should call this constructor synchronously after
   * constructing the IFrame, so that it is not yet loaded.
   *
   * @param containerIFrame
   */
  constructor(init: InitToken, readonly containerIFrame: HTMLIFrameElement) {
    super(init);

    // Listen for this.messagePort.
    const onmessage = (e: MessageEvent<unknown>) => {
      // TODO: what if contentWindow is not accessible, due to
      // same-origin policy, or because it's still null
      // for some reason?
      if (e.source !== containerIFrame.contentWindow) return;
      // TODO: other checks?
      this.messagePort = e.ports[0];
      // Send queued messages.
      this.messagePortQueue!.forEach((message) =>
        this.messagePort!.postMessage(message)
      );
      this.messagePortQueue = null;
      // Begin receiving.
      // Do this last just in case it starts receiving
      // synchronously (although I'm guessing the spec doesn't
      // actually allow that).
      this.messagePort.onmessage = this.messagePortReceive.bind(this);
      window.removeEventListener("message", onmessage);
    };
    window.addEventListener("message", onmessage);
  }

  private messagePortSend(message: ContainerMessage) {
    if (this.messagePort === null) {
      this.messagePortQueue!.push(message);
    } else {
      this.messagePort.postMessage(message);
    }
  }

  private messagePortReceive(e: MessageEvent<HostMessage>) {
    switch (e.data.type) {
      case "Ready":
        this._isContainerReady = true;
        this.emit("ContainerReady", {
          meta: UpdateMeta.new(this.runtime.replicaID, true, true),
        });
        // Deliver queued ReceiveMessages.
        this.receiveMessageQueue!.forEach((message) =>
          this.messagePortSend(message)
        );
        this.receiveMessageQueue = null;
        break;
      case "Send":
        const message = e.data.message;
        this.furtherSentMessages.push([e.data.predID, message]);
        this.sendPrimitive(message);
        break;
      case "Saved":
        this.latestSaveData = e.data.savedState;
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
          const resolveReject = this.compactSaveDataResolves.get(
            e.data.requestID
          );
          if (resolveReject !== undefined) {
            this.compactSaveDataResolves.delete(e.data.requestID);
            resolveReject[0]();
          }
        }
        break;
      case "SaveRequestFailed":
        const resolveReject = this.compactSaveDataResolves.get(
          e.data.requestID
        );
        if (resolveReject !== undefined) {
          this.compactSaveDataResolves.delete(e.data.requestID);
          resolveReject[1](
            "Container had error processing compactSaveData() request: " +
              e.data.errorToString
          );
        }
        break;
      default:
        throw new Error("bad e.data: " + e.data);
    }
  }

  protected receivePrimitive(
    message: Uint8Array | string,
    meta: UpdateMeta
  ): void {
    if (!meta.isEcho) {
      const id = this.nextReceivedMessageID++;
      this.furtherReceivedMessages.push([id, message]);
      const receiveMessage: ReceiveMessage = { type: "Receive", message, id };
      if (this._isContainerReady) {
        this.messagePortSend(receiveMessage);
      } else {
        this.receiveMessageQueue!.push(receiveMessage);
      }
    }
    // Else the container already processed it.
  }

  /**
   * Whether the container is ready to be used by the
   * user.
   *
   * Specifically, this becomes true once the internal
   * container's [[CRDTContainer.ready]] method has been called.
   *
   * Until this is true, you MUST block user input to
   * `containerIFrame`. Otherwise, the user might interact
   * with the container before it is loaded, causing errors.
   * Typically, you'll also want to hide the `containerIFrame`
   * until then, so that the user doesn't see partially-initialized
   * state. You can accomplish both by setting
   * `containerIFrame.hidden = true`, then when it is ready,
   * setting `containerIFrame.hidden = false`.
   *
   * A [[CRDTContainerHostEventsRecord.ContainerReady]] event
   * is emitted immediately after this becomes true.
   */
  get isContainerReady(): boolean {
    return this._isContainerReady;
  }

  private nextCompactSaveDataID = 0;
  private compactSaveDataResolves = new Map<
    number,
    [resolve: () => void, reject: (reason: unknown) => void]
  >();

  /**
   * Asks the internal [[CRDTContainer]] to call its analog
   * of [[CRDTApp.save]], generating compact save data
   * describing its current state. This save data will then
   * be used in future calls to our own [[save]] method,
   * in place of a message log.
   *
   * To prevent our own save data from becoming too large
   * (acting as an ever-growing message log), you should
   * call this method occasionally. However, do not call it
   * too often, since saving large documents can take some
   * time and freezes the container.
   *
   * The returned Promise resolves when done, i.e., when the
   * next call to save() will include
   * the compacted savedState due to this method call.
   * Note it's not guaranteed that
   * the log will be empty even if you then call save() right away,
   * because the container may have sent/received more messages
   * during the async wait.
   *
   * The Promise rejects if the container's call to save failed, with
   * the container's error as reason.
   *
   * @throws if [[isContainerReady]] is false
   */
  compactSaveData(): Promise<void> {
    if (!this._isContainerReady) {
      throw new Error("Container is not ready yet");
    }

    const requestID = this.nextCompactSaveDataID++;
    this.messagePortSend({ type: "SaveRequest", requestID });
    return new Promise((resolve, reject) => {
      // resolve will be called by the "saved" message handler.
      this.compactSaveDataResolves.set(requestID, [resolve, reject]);
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
    // (sent + received) as received messages in the savedState:
    // from a newly-loaded replica's perspective, they're all
    // received messages (sent by different replicas).
    const message = ContainerHostSave.create({
      latestSaveData: this.latestSaveData,
      furtherMessages,
    });
    return ContainerHostSave.encode(message).finish();
  }

  load(savedState: Optional<Uint8Array>): void {
    // Set our latestSaveData and furtherMessages.
    if (!savedState.isPresent) {
      // Leave this.latestSaveData, this.furtherReceivedMessages
      // as their initial values (null, []).
      this.messagePortSend({
        type: "Load",
        hostSkipped: true,
        latestSaveData: null,
        furtherMessages: [],
      });
    } else {
      const decoded = ContainerHostSave.decode(savedState.get());
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
        hostSkipped: false,
        latestSaveData: this.latestSaveData,
        furtherMessages: decoded.furtherMessages,
      });
    }
  }
}

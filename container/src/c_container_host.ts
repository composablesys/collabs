import { CollabEventsRecord, InitToken, UpdateMeta } from "@collabs/collabs";
import { CPrimitive, CollabEvent, protobufHas } from "@collabs/core";
import { ContainerHostSave } from "../generated/proto_compiled";
import {
  ContainerMessage,
  HostMessage,
  Update,
  UpdateMessage,
} from "./message_types";

export interface ContainerHostEventsRecord extends CollabEventsRecord {
  /**
   * Emitted when [[CContainerHost.isContainerReady]]
   * becomes true, hence user interaction with the container
   * is allowed.
   *
   * This event may be emitted as soon as the next event loop
   * iteration after you initialize the container's IFrame.
   * So, you must either add an event handler within the same
   * event loop iteration that you initialize the IFrame,
   * or check [[CContainerHost.isContainerReady]] before
   * adding the handler.
   *
   * Note that this is a local, not replicated, event: it refers
   * to conditions on the local replica related to the
   * app start cycle, not something that all replicas see
   * in sync.
   */
  ContainerReady: {};
}

/**
 * A host for a Collabs container running in a child IFrame.
 *
 * See [Containers](../../../guide/containers.html).
 *
 * A `CContainerHost` connects to the `CContainer`
 * instance running in the `containerIFrame` provided to
 * the constructor. All messages sent by the `CContainer`
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
 * You can use `CContainerHost` to embed Collabs containers
 * inside your own app. In particular, if you want to
 * support a specific network/storage/UX/etc. for containers,
 * you can do so by making a Collabs app
 * that uses your chosen network/storage/UX/etc.,
 * with a `CContainerHost` as its single Collab, and with
 * some way for users to specify the container.
 */
export class CContainerHost extends CPrimitive<ContainerHostEventsRecord> {
  private messagePort: MessagePort | null = null;
  private _isContainerReady = false;
  private didFirstLoad = false;

  /**
   * Queue for messages to be sent over messagePort,
   * before it exists.
   */
  private messagePortQueue: ContainerMessage[] | null = [];

  /**
   * Queue for UpdateMessages that are received
   * (via receivePrimitive or non-first loadPrimitive)
   * before the container is ready.
   */
  private updateMessageQueue: UpdateMessage[] | null = [];

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
  private nextUpdateID = 0;
  /**
   * Received messages that are not accounted for in
   * latestSaveData, tagged with their IDs,
   * in order of receipt.
   *
   * This includes messages found in [[load]] (until they
   * become accounted for in latestSaveData).
   */
  private furtherReceivedUpdates: [id: number, update: Update][] = [];
  /**
   * Sent messages (i.e., sent by the container)
   * that are not accounted for in latestSaveData.
   * predID is the ID of the last message the replica
   * received before sending a message (-1 if no messages
   * received), counting received messages found in [[loadd]].
   */
  private furtherSentUpdates: [predID: number, update: Update][] = [];

  /**
   * Constructs a `CContainerHost` that connects to the `CContainer`
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
        this.emit("ContainerReady", {} as CollabEvent, false);
        // Deliver queued ReceiveMessages.
        this.updateMessageQueue!.forEach((message) =>
          this.messagePortSend(message)
        );
        this.updateMessageQueue = null;
        break;
      case "Send":
        const message = e.data.message;
        this.furtherSentUpdates.push([
          e.data.predID,
          { updateType: "message", data: message },
        ]);
        this.sendPrimitive(message);
        break;
      case "Saved":
        this.latestSaveData = e.data.savedState;
        // Trim further messages that are accounted for by the
        // save: all sent messages, and all received messages
        // with id <= e.data.lastReceivedID.
        this.furtherSentUpdates.splice(0);
        if (this.furtherReceivedUpdates.length > 0) {
          const startID = this.furtherReceivedUpdates[0][0];
          const deleteCount = e.data.lastReceivedID - startID + 1;
          this.furtherReceivedUpdates.splice(0, deleteCount);
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
    if (!meta.isLocalOp) {
      this.deliverUpdate({
        updateType: "message",
        data: <Uint8Array>message,
      });
    }
    // Else the container already processed it.
  }

  private deliverUpdate(update: Update) {
    const id = this.nextUpdateID++;
    this.furtherReceivedUpdates.push([id, update]);
    const receiveMessage: UpdateMessage = {
      type: "Update",
      id,
      ...update,
    };
    if (this._isContainerReady) {
      this.messagePortSend(receiveMessage);
    } else {
      this.updateMessageQueue!.push(receiveMessage);
    }
  }

  /**
   * Whether the container is ready to be used by the
   * user.
   *
   * Specifically, this becomes true once the internal
   * container's [[CContainer.ready]] method has been called.
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
   * A [[CContainerHostEventsRecord.ContainerReady]] event
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
   * Asks the internal [[CContainer]] to call its analog
   * of [[CRuntime.save]], generating compact save data
   * describing its current state. This save data will then
   * be used in future calls to our own [[save]] method,
   * in place of an update log.
   *
   * To prevent our own save data from becoming too large
   * (acting as an ever-growing update log), you should
   * call this method occasionally, e.g., every 30 seconds.
   *
   * The returned Promise resolves when done, i.e., when the
   * next call to save() will include
   * the compacted savedState due to this method call.
   * Note it's not guaranteed that
   * the log will be empty even if you then call save() right away,
   * because the container may have sent/received more updates
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

  savePrimitive(): Uint8Array {
    // Sort further updates in the order they were processed
    // (sent or received) by the container.
    // This means that each sent update comes right after
    // the applied update with its predID
    // (except that earlier sent messages with the same predID
    // come first, of course).
    const furtherUpdatesData = new Array<Uint8Array>(
      this.furtherSentUpdates.length + this.furtherReceivedUpdates.length
    );
    const furtherUpdatesTypes = new Array<boolean>(furtherUpdatesData.length);
    let i = 0,
      j = 0;
    while (i + j < furtherUpdatesData.length) {
      const sent = this.furtherSentUpdates[i];
      const received = this.furtherReceivedUpdates[j];
      // Deciding whether to push the next sent message
      // or the next received mesage:
      // if the received message is a predecessor of the sent
      // message, we push the received message, else we
      // push the sent message.
      if (received[0] <= sent[0]) {
        furtherUpdatesData[i + j] = received[1].data;
        furtherUpdatesTypes[i + j] = received[1].updateType === "savedState";
        j++;
      } else {
        furtherUpdatesData[i + j] = sent[1].data;
        furtherUpdatesTypes[i + j] = sent[1].updateType === "savedState";
        i++;
      }
    }

    // Note that it makes sense to treat all further message
    // (sent + received) as received messages in the savedState:
    // from a newly-loaded replica's perspective, they're all
    // received messages (sent by different replicas).
    const message = ContainerHostSave.create({
      latestSaveData: this.latestSaveData,
      furtherUpdatesData,
      furtherUpdatesTypes,
    });
    return ContainerHostSave.encode(message).finish();
  }

  loadPrimitive(savedState: Uint8Array | null): void {
    if (!this.didFirstLoad) {
      // First load case.
      this.didFirstLoad = true;

      if (savedState === null) {
        this.loadSkipped();
        return;
      }

      // Set our latestSaveData and furtherMessages.
      const decoded = ContainerHostSave.decode(savedState);
      this.latestSaveData = protobufHas(decoded, "latestSaveData")
        ? decoded.latestSaveData
        : null;
      const furtherUpdates: Update[] = decoded.furtherUpdatesData.map(
        (data, index) => ({
          data,
          updateType: decoded.furtherUpdatesTypes[index]
            ? "savedState"
            : "message",
        })
      );
      this.furtherReceivedUpdates = furtherUpdates.map((message, index) => [
        index,
        message,
      ]);
      this.nextUpdateID = this.furtherReceivedUpdates.length;

      this.messagePortSend({
        type: "Load",
        hostSkipped: false,
        latestSaveData: this.latestSaveData,
        furtherUpdates,
      });
    } else {
      // Non-first load. Send it as an update instead.
      if (savedState === null) return;

      this.deliverUpdate({ updateType: "savedState", data: savedState });
    }
  }

  /**
   * Must call if initial loading (via [[CRuntime.load]] at the start of the
   * app, before allowing user interaction or remote messages) is skipped.
   */
  loadSkipped(): void {
    if (this.didFirstLoad) {
      throw new Error("Loading already done or skipped");
    }
    this.didFirstLoad = true;

    // Leave this.latestSaveData, this.furtherReceivedUpdates
    // as their initial values (null, []).
    this.messagePortSend({
      type: "Load",
      hostSkipped: true,
      latestSaveData: null,
      furtherUpdates: [],
    });
  }
}

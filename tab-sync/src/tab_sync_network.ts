import { AbstractDoc, CRuntime, EventEmitter } from "@collabs/collabs";
import { nonNull } from "@collabs/core";

type Doc = AbstractDoc | CRuntime;

export interface TabSyncNetworkEventsRecord {
  Connect: {};
  Disconnect: {
    // TODO: only keep relevant causes
    cause: "close" | "error" | "disconnect";
    wsEvent: CloseEvent | Event | null;
  };
}

interface DocInfo {
  readonly docID: string;
  localCounter: number;
  off?: () => void;
  subscribeDenied?: true;
}

export class TabSyncNetwork extends EventEmitter<TabSyncNetworkEventsRecord> {
  private bc: BroadcastChannel | null = null;

  private readonly subs = new Map<Doc, DocInfo>();
  /** Inverse map docID -> Doc. */
  private readonly docsByID = new Map<string, Doc>();

  constructor(options: { connect?: boolean } = {}) {
    super();

    if (options.connect ?? true) this.connect();
  }

  // Doc: may call multiple times, e.g., reconnecting.
  // Okay to call if already connected.
  // E.g. net.on("Disconnect", () => setTimeout(net.connect(), 2000))
  // will (repeatedly) try to reconnect after a disconnection. (TODO: is disconnect possible?)
  connect() {
    if (this.connected) return;

    const bc = new BroadcastChannel(TODO);
    this.bc = bc;
    bc.addEventListener("open", () => {
      if (bc !== this.bc) return;

      // (Re-) subscribe to all docIDs.
      if (this.docsByID.size !== 0) {
        this.sendInternal({
          subscribe: {
            docIDs: [...this.docsByID.keys()],
          },
        });
      }

      // Emit event.
      this.emit("Connect", {});
    });
    bc.addEventListener("message", (e) =>
      this.wsReceive(e.data as ArrayBuffer)
    );
    bc.addEventListener("close", (e) => this.wsDisconnect(bc, "close", e));
    bc.addEventListener("error", (e) => this.wsDisconnect(bc, "error", e));
  }

  private wsDisconnect(
    caller: TabSync,
    cause: "close" | "error",
    e: CloseEvent | Event
  ) {
    if (caller !== this.bc) return;

    this.bc = null;

    this.emit("Disconnect", { cause, wsEvent: e });
  }

  // Doc: Can call this and later reconnect.
  disconnect() {
    this.bc?.close();

    // Note that changing this.ws right away will cause wsDisconnect to
    // ignore the TabSync close event, which is dispatched async.
    // We instead emit our own Disconnect event.
    this.bc = null;

    this.emit("Disconnect", { cause: "disconnect", wsEvent: null });
  }

  // Whether we have an active WS connection (connect was called, and we
  // haven't had disconnect() or WS close/error). Note that the WS connection
  // might not be ready (OPEN) yet.
  get connected(): boolean {
    return this.bc !== null;
  }

  /**
   * Sends the given message if the connection is open.
   *
   * We do not guarantee eventual receipt - if the server is not open,
   * or if sending fails, the message will not reach the server.
   * So make sure to re-do message's effect on open.
   */
  private sendInternal(message: IWSMessage) {
    if (this.bc != null && this.bc.readyState == TabSync.OPEN) {
      this.bc.send(WSMessage.encode(message).finish());
    }
  }

  subscribe(doc: AbstractDoc | CRuntime, docID: string) {
    if (this.subs.has(doc)) {
      throw new Error("doc is already subscribed to a docID");
    }

    if (this.docsByID.has(docID)) {
      throw new Error("Unsupported: multiple docs with same docID");
    }

    // TODO: if you unsub & re-sub to a doc, old acks might trick you
    // into thinking you're up-to-date.
    this.subs.set(doc, { docID, localCounter: 0 });
    this.docsByID.set(docID, doc);
    this.sendInternal({ subscribe: { docIDs: [docID] } });

    // Wait to subscribe to doc updates until after the first time
    // we send our whole state (on Welcome).
  }

  unsubscribe(doc: AbstractDoc | CRuntime) {
    const info = this.subs.get(doc);
    if (info === undefined) return;

    if (info.off !== undefined) info.off();
    this.subs.delete(doc);
    this.docsByID.delete(info.docID);
    this.sendInternal({ unsubscribe: { docID: info.docID } });
  }

  private wsReceive(encoded: ArrayBuffer) {
    const message = WSMessage.decode(new Uint8Array(encoded));
    switch (message.type) {
      case "welcome":
        this.onWelcome(message.welcome as Welcome);
        break;
      case "subscribeDenied":
        this.onSubscribeDenied(message.subscribeDenied as SubscribeDenied);
        break;
      case "receive":
        this.onReceive(message.receive as Receive);
        break;
      case "ack": {
        this.onAck(message.ack as Ack);
        break;
      }
      default:
        throw new Error(
          "Unexpected TabSyncNetwork message type: " + message.type
        );
    }
  }

  private onWelcome(message: Welcome): void {
    const doc = this.docsByID.get(message.docID);
    if (doc === undefined) return;
    const info = nonNull(this.subs.get(doc));

    const ourOldState = doc.save();

    // Make us up-to-date with the server:
    //   1. Load the welcome state.
    if (protobufHas(message, "savedState")) {
      doc.load(message.savedState, this);
    }
    //   2. Load the further updates.
    for (let i = 0; i < message.updates.length; i++) {
      const update = message.updates[i];
      const updateType = message.updateTypes[i];
      switch (updateType) {
        case UpdateType.Message:
          doc.receive(update, this);
          break;
        case UpdateType.SavedState:
          doc.load(update, this);
          break;
        default:
          throw new Error("Unrecognized UpdateType: " + updateType);
      }
    }

    this.emit("Load", { doc, docID: message.docID });

    // Make the server up-to-date with us.
    // OPT: use a delta on top of ourOldState instead.
    this.sendInternal({
      send: {
        docID: message.docID,
        update: ourOldState,
        updateType: UpdateType.SavedState,
        localCounter: ++info.localCounter,
      },
    });

    if (info.off === undefined) {
      // Subscribe to future doc updates and forward them to the server.
      // This includes both local operations and updates that we learn
      // of from other network/storage tools.
      const docID = message.docID;
      info.off = doc.on("Update", (e) => {
        // Skip updates that we delivered.
        if (e.caller === this) return;
        // Skip updates delivered by other tabs; they should be sending
        // their updates to the server themselves.
        // TODO

        // OPT: if it's a saved state, only send the delta on top of our
        // old state to the server (skipping the delta computation if disconnected).
        this.sendInternal({
          send: {
            docID,
            update: e.update,
            updateType: stringToEnum(e.updateType),
            localCounter: ++info.localCounter,
          },
        });
      });
    }
  }

  private onSubscribeDenied(message: SubscribeDenied): void {
    const doc = this.docsByID.get(message.docID);
    if (doc === undefined) return;
    const info = nonNull(this.subs.get(doc));

    if (info.subscribeDenied === undefined) {
      // First we've heard of it.
      this.emit("SubscribeDenied", { doc, docID: message.docID });
      // If the server disconnects and reconnects, don't emit another event.
      info.subscribeDenied = true;
    }
  }

  private onReceive(message: Receive): void {
    const doc = this.docsByID.get(message.docID);
    if (doc === undefined) return;

    // Note: we might get this update before the room Welcome.
    // That is fine; if the update causally depends on existing state,
    // doc will buffer it.
    if (message.updateType === UpdateType.Message)
      doc.receive(message.update, this);
    else doc.load(message.update, this);
  }

  private onAck(message: Ack): void {
    const doc = this.docsByID.get(message.docID);
    if (doc === undefined) return;
    const info = nonNull(this.subs.get(doc));

    if (message.localCounter === info.localCounter) {
      // The ack'd update is the last one we sent to the server.
      // So doc's state is now completely saved.
      this.emit("Save", { doc, docID: message.docID });
    }

    if (protobufHas(message, "checkpointRequest")) {
      // The server requests that we send our current saved state.
      // It will use this as a "checkpoint", replacing its message log
      // (up to the point that we've saved).
      this.sendInternal({
        checkpointResponse: {
          docID: message.docID,
          savedState: doc.save(),
          checkpointRequest: message.checkpointRequest,
        },
      });
    }
  }
}

import { AbstractDoc, CRuntime, ReplicaIDs } from "@collabs/collabs";
import { EventEmitter, nonNull } from "@collabs/core";

type Doc = AbstractDoc | CRuntime;

interface DocInfo {
  readonly docID: string;
  off?: () => void;
  unsubscribed?: true;
}

type Message =
  | {
      type: "update";
      docID: string;
      updateType: "message" | "savedState";
      update: Uint8Array;
    }
  | { type: "join"; senderID: string; docID: string; savedState: Uint8Array }
  | {
      type: "joinReply";
      targetID: string;
      docID: string;
      savedState: Uint8Array;
    };

/** Events record for [[TabSyncNetwork]]. */
export interface TabSyncNetworkEventsRecord {
  /**
   * Emitted when there is an error, e.g., we fail to parse a message.
   */
  Error: { err: unknown };
}

/**
 * Syncs updates to Collabs documents across different tabs for the same origin,
 * using BroadcastChannel.
 *
 * By default, this only forwards *local* operations to other tabs. Updates from other sources (e.g., a remote server via
 * [@collabs/ws-client](https://www.npmjs.com/package/@collabs/ws-client))
 * are not sent over the BroadcastChannel, since we expect that other tabs will
 * get a copy from their own sources. You can override this with the `allUpdates`
 * constructor option.
 */
export class TabSyncNetwork extends EventEmitter<TabSyncNetworkEventsRecord> {
  /**
   * The name of this class's BroadcastChannel,
   * set in the constructor.
   *
   * Default: "@collabs/tab-sync".
   */
  readonly bcName: string;
  private readonly allUpdates: boolean;

  private readonly bc: BroadcastChannel;
  /** A random senderID for this object. */
  private readonly objID: string;

  private readonly subs = new Map<Doc, DocInfo>();
  /** Inverse map docID -> Doc. */
  private readonly docsByID = new Map<string, Doc>();

  private closed = false;

  readonly isTabSyncNetwork = true;

  /**
   * Constructs a TabSyncNetwork.
   *
   * You typically only need one TabSyncNetwork per app, since it
   * can [[subscribe]] multiple documents.
   *
   * @param options.bcName The name of the BroadcastChannel to use.
   * Default: "@collabs/tab-sync".
   * @param options.allUpdates Set to true to forward all doc updates over
   * the BroadcastChannel, not just local operations.
   */
  constructor(options: { bcName?: string; allUpdates?: boolean } = {}) {
    super();

    this.bcName = options.bcName ?? "@collabs/tab-sync";
    this.allUpdates = options.allUpdates ?? false;
    this.objID = ReplicaIDs.random();

    this.bc = new BroadcastChannel(this.bcName);
    this.bc.addEventListener("message", (e) =>
      this.bcReceive(e.data as Message)
    );
    this.bc.addEventListener("messageerror", (e) =>
      this.emit("Error", { err: e })
    );
  }

  private sendInternal(message: Message) {
    this.bc.postMessage(message);
  }

  /**
   * Subscribes `doc` to updates for `docID`.
   *
   * `doc` will send and receive updates with other tabs
   * that are subscribed to `docID`. It will also sync initial states with
   * other tabs, to ensure that they start up-to-date.
   *
   * @param doc The document to subscribe.
   * @param docID An arbitrary string that identifies which updates to use.
   * @throws If `doc` is already subscribed to a docID.
   * @throws If another doc is subscribed to `docID`.
   */
  subscribe(doc: AbstractDoc | CRuntime, docID: string) {
    if (this.closed) throw new Error("Already closed");
    if (this.subs.has(doc)) {
      throw new Error("doc is already subscribed to a docID");
    }
    if (this.docsByID.has(docID)) {
      throw new Error("Unsupported: multiple docs with same docID");
    }

    const info: DocInfo = { docID };
    this.subs.set(doc, { docID });
    this.docsByID.set(docID, doc);

    // Call save() in a separate task, to match other networks
    // (in particular, they don't block for long during subscribe()).
    setTimeout(() => {
      if (info.unsubscribed) return;

      // Broadcast our current state.
      this.sendInternal({
        type: "join",
        senderID: this.objID,
        docID,
        savedState: doc.save(),
      });
      // Subscribe to future updates.
      info.off = doc.on("Update", (e) => {
        // Skip updates that we delivered.
        if (e.caller === this) return;

        // Skip non-local updates unless allUpdates is true.
        if (!(this.allUpdates || e.isLocalOp)) return;

        this.sendInternal({
          type: "update",
          docID,
          updateType: e.updateType,
          update: e.update,
        });
      });
    }, 0);
  }

  /**
   * Unsubscribes `doc` from its subscribed `docID` (if any).
   *
   * `doc` will no longer send or receive updates with other tabs.
   */
  unsubscribe(doc: AbstractDoc | CRuntime) {
    const info = this.subs.get(doc);
    if (info === undefined) return;

    info.unsubscribed = true;
    this.subs.delete(doc);
    this.docsByID.delete(info.docID);
    if (info.off !== undefined) info.off();
  }

  private bcReceive(message: Message) {
    const doc = this.docsByID.get(message.docID);
    if (doc === undefined) return;
    const info = nonNull(this.subs.get(doc));

    switch (message.type) {
      case "join":
        // Reply with our state.
        // OPT: use a delta on top of the peer's state instead.
        this.sendInternal({
          type: "joinReply",
          targetID: message.senderID,
          docID: message.docID,
          savedState: doc.save(),
        });
        // Merge the new peer's state into ours.
        // Do it in a separate task to avoid blocking for too long.
        setTimeout(() => {
          if (info.unsubscribed) return;
          doc.load(message.savedState);
        });
        break;

      case "joinReply":
        if (message.targetID !== this.objID) return;

        // Merge the peer's state into ours.
        doc.load(message.savedState);
        break;

      case "update":
        // Apply the update.
        switch (message.updateType) {
          case "message":
            doc.receive(message.update);
            break;
          case "savedState":
            doc.load(message.update);
            break;
          default:
            this.emit("Error", {
              err: `Unrecognized message.updateType ${message.updateType} on ${message}`,
            });
        }
        break;

      default:
        this.emit("Error", {
          err: `Unrecognized message.type ${(<any>message).type} on ${message}`,
        });
    }
  }

  /**
   * Closes our BroadcastChannel and unsubscribes all documents.
   *
   * Future [[subscribe]] calls will throw an error.
   */
  close() {
    if (this.closed) return;

    this.closed = true;

    // Unsubscribe all docs.
    for (const doc of this.subs.keys()) this.unsubscribe(doc);

    // Close our BroadcastChannel.
    this.bc.close();
  }
}

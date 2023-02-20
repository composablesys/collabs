import { AbstractDoc, CRuntime, SendEvent } from "@collabs/collabs";
import { Buffer } from "buffer";
import {
  Capability,
  IWidgetApiRequest,
  IWidgetApiRequestData,
  WidgetApi,
} from "matrix-widget-api";

// TODO: reasonable error if lacking capabilities

/**
 * We limit the size of the "msg" field in our events
 * to this size.  Matrix imposes message size limits
 * of 65535 bytes
 * (https://matrix.org/docs/spec/client_server/r0.6.1#size-limits);
 * Element encrypted rooms further limit it to
 * 40-something KB; and there is presumably overhead
 * added by the matrix-widget-api / Element, so we aim
 * low to be safe.
 */
const MAX_MSG_SIZE = 32000;
/**
 * For the uid: we use ascii chars in the range 32-95,
 * for 6 bits of entropy per char.  I haven't thought
 * carefully about whether 60 bits of entropy is correct.
 */
const LONG_MSG_UID_LENGTH = 10;
/**
 * Delay between sending messages, in ms, to prevent
 * Matrix from rate-limiting us.
 */
const MESSAGE_INTERVAL_MS = 500;

interface NetworkEvent {
  msg: string;
  uid?: string;
  numPieces?: number;
  piece?: number;
}

export class MatrixWidgetNetwork {
  private readonly eventType: string;
  private readonly api: WidgetApi;

  private isReady = false;
  private queued: NetworkEvent[] = [];

  /**
   * [constructor description]
   * @param rootEventType The root type of Matrix room events
   * to be sent by this network.  Per the Matrix spec
   * (https://matrix.org/docs/spec/client_server/r0.6.1#room-event-fields),
   * this SHOULD be namespaced similar to Java package
   * naming conventions e.g. 'com.example.subdomain.event.type', so that different
   * programs use different eventTypes.
   * Also, if multiple MatrixWidgetNetworks appear in the
   * same webpage, they MUST use different rootEventTypes, or
   * else they will receive each other's messages.
   * Note that the user will be prompted to approve
   * the widget's use of this rootEventType, so it should
   * be comprehensible to end-users.
   * The actual event type used is <rootEventType>.<widgetId>.
   */
  constructor(
    readonly doc: AbstractDoc | CRuntime,
    rootEventType: string,
    requestCapabilities: Capability[] = []
  ) {
    this.eventType = `${rootEventType}.${MatrixWidgetNetwork.widgetId}`;
    this.api = new WidgetApi(MatrixWidgetNetwork.widgetId);
    this.initializeWidgetApi(rootEventType, requestCapabilities);

    this.doc.on("Send", this.appSend.bind(this));
  }

  private initializeWidgetApi(
    rootEventType: string,
    requestCapabilities: Capability[]
  ): void {
    // Would like this to work, since it gives a sensible
    // message to the client, and is more likely to somdeay
    // allow the user to add the same widget twice without
    // getting a permissions request the second time.
    // this.api.requestCapabilityToSendEvent(rootEventType);
    // this.api.requestCapabilityToReceiveEvent(rootEventType);
    this.api.requestCapabilityToSendEvent(this.eventType);
    this.api.requestCapabilityToReceiveEvent(this.eventType);
    this.api.requestCapabilities(requestCapabilities);
    this.api.on("action:send_event", (ev: CustomEvent<IWidgetApiRequest>) => {
      const mxEvent = ev.detail.data;
      if (mxEvent.type === this.eventType) {
        this.receive(mxEvent);
        ev.preventDefault(); // we're handling it, so stop the widget API from doing something.
        this.api.transport.reply(ev.detail, {}); // ack
      }
    });
    // This has to be called before this.api.start(), otherwise
    // start throws an error
    this.api.on("ready", () => {
      // Replay any messages we missed.  We request as many
      // messages as possible.  Indeed, we want every message
      // with this event type.  However, per the draft spec:
      // https://github.com/matrix-org/matrix-doc/blob/travis/msc%2Fwidgets-send-receive-events/proposals/2762-widget-event-receiving.md
      // "The client is not required to backfill (use the
      // /messages endpoint) to get more events for the
      // widget, and is able to return less than the requested amount of events."
      // So it is possible we will not get every message,
      // but we can at least hope.
      this.api
        .readRoomEvents(this.eventType, Number.MAX_SAFE_INTEGER)
        .then((events: any) => {
          const eventsTyped = events as IWidgetApiRequestData[];
          eventsTyped.forEach(this.receive, this);
        });
      // Allow sending messages
      this.isReady = true;
      // Send queued messages
      this.startClearQueue();
    });
    this.api.start();
  }

  // TODO: once we add loading, it seems possible we will
  // get partial messages that we don't need (already received)
  // but that never complete, so that they are stored here
  // forever (inefficient).
  // That could be an argument to move this splitting into
  // DefaultCausalBroadcastNetwork, which can immediately tell
  // when a piece is unneeded, and also adds its own uids
  // (sender/counter), so we don't need to create new ones.
  private longMsgBuffer: Map<string, Array<string | null>> = new Map();

  private receive(mxEvent: IWidgetApiRequestData) {
    const ourEvent = mxEvent.content as NetworkEvent;
    if (ourEvent.uid !== undefined) {
      // It's a long msg split into pieces.
      let array = this.longMsgBuffer.get(ourEvent.uid);
      if (array === undefined) {
        array = new Array(ourEvent.numPieces!);
        array.fill(null);
        this.longMsgBuffer.set(ourEvent.uid, array);
      }
      array[ourEvent.piece!] = ourEvent.msg;
      if (array.every((value) => value !== null)) {
        // It's done.
        this.longMsgBuffer.delete(ourEvent.uid);
        this.receiveString(array.join(""));
      }
    } else {
      // It's a whole message.
      this.receiveString(ourEvent.msg);
    }
  }

  private receiveString(msg: string) {
    this.doc.receive(new Uint8Array(Buffer.from(msg, "base64")));
  }

  private appSend(e: SendEvent): void {
    const encoded = Buffer.from(e.message).toString("base64");
    if (encoded.length > MAX_MSG_SIZE) {
      // Break it into chunks of length <= MAX_MSG_SIZE,
      // linked together by a random uid.
      // TODO: rate limit these (2 per second?).
      const uid = this.longMsgUid();
      const numPieces = Math.ceil(encoded.length / MAX_MSG_SIZE);
      for (let i = 0; i < encoded.length; i += MAX_MSG_SIZE) {
        this.queueEvent({
          msg: encoded.substring(i, i + MAX_MSG_SIZE),
          uid,
          numPieces,
          piece: Math.floor(i / MAX_MSG_SIZE),
        });
      }
    } else {
      this.queueEvent({
        msg: encoded,
      });
    }
  }

  private queueEvent(event: NetworkEvent) {
    // Queue the message for later
    this.queued.push(event);
    if (this.isReady) {
      this.startClearQueue();
    }
  }

  private currentInterval: number | null = null;
  private startClearQueue() {
    if (this.currentInterval !== null) {
      // setInterval already running.
      return;
    }
    if (this.sendEventFromQueue()) {
      // There wasn't actually a message to send.
      return;
    }
    // Otherwise, the above call to this.sendEventFromQueue()
    // sent the first message in the queue; now
    // we need to wait at least MESSAGE_INTERVAL_MS ms before sending
    // the next one (even if there is no message
    // currently in the queue).
    this.currentInterval = window.setInterval(() => {
      if (this.sendEventFromQueue()) {
        // Queue is empty and MESSAGE_INTERVAL_MS ms has passed;
        // unset the interval.
        clearInterval(this.currentInterval!);
        this.currentInterval = null;
      }
    }, MESSAGE_INTERVAL_MS);
  }

  /**
   * @return Whether the queue was empty to start with.
   */
  private sendEventFromQueue(): boolean {
    if (this.queued.length > 0) {
      this.api.sendRoomEvent(this.eventType, this.queued[0]);
      // Opt: actual queue instead of splicing
      this.queued.splice(0, 1);
      return false;
    } else {
      return true;
    }
  }

  private longMsgUid(): string {
    const uidBytes = new Uint8Array(LONG_MSG_UID_LENGTH);
    window.crypto.getRandomValues(uidBytes);
    const uidChars = new Array<number>(LONG_MSG_UID_LENGTH);
    for (let i = 0; i < LONG_MSG_UID_LENGTH; i++) {
      uidChars[i] = 32 + (uidBytes[i] % 64);
    }
    return String.fromCharCode(...uidChars);
  }

  static isWidgetApiAvailable(): boolean {
    try {
      void this.widgetId;
      return true;
    } catch (e) {
      return false;
    }
  }

  private static widgetIdInternal: string | undefined = undefined;

  static get widgetId(): string {
    if (this.widgetIdInternal === undefined) {
      this.widgetIdInternal = this.findWidgetId();
    }
    return this.widgetIdInternal;
  }

  // From https://github.com/matrix-org/matrix-widget-api/blob/master/examples/widget/utils.js
  private static findWidgetId(): string {
    const qs = this.parseFragment();
    return this.assertParam(qs, "widgetId");
  }

  private static parseFragment() {
    const fragmentString = window.location.toString() || "?";
    return new URLSearchParams(
      fragmentString.substring(Math.max(fragmentString.indexOf("?"), 0))
    );
  }

  private static assertParam(fragment: URLSearchParams, name: string) {
    const val = fragment.get(name);
    if (!val) {
      console.log(`${name} is not present in URL - cannot load widget`);
      console.log(`URL: ${window.location.toString()}`);
      throw new Error(`${name} is not present in URL - cannot load widget`);
    }
    return val;
  }
}

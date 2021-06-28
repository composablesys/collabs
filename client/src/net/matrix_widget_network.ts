import {
  WidgetApi,
  IWidgetApiRequest,
  IWidgetApiRequestData,
} from "matrix-widget-api";
import {
  BroadcastNetwork,
  DefaultCausalBroadcastNetwork,
} from "./default_causal_broadcast_network";
import { CausalTimestamp } from "./causal_broadcast_network";

// TODO: size limits:
// https://matrix.org/docs/spec/client_server/r0.6.1#size-limits

// TODO: reasonable error if lacking capabilities

interface NetworkEvent {
  msg: string;
}

export class MatrixWidgetNetwork implements BroadcastNetwork {
  private readonly eventType: string;
  private readonly api: WidgetApi;
  private causal!: DefaultCausalBroadcastNetwork;

  private isReady = false;
  private queued: NetworkEvent[] | undefined = [];

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
  constructor(rootEventType: string) {
    this.eventType = `${rootEventType}.${MatrixWidgetNetwork.widgetId}`;
    this.api = new WidgetApi(MatrixWidgetNetwork.widgetId);
    this.initializeWidgetApi(rootEventType);
  }

  private initializeWidgetApi(rootEventType: string): void {
    // Would like this to work, since it gives a sensible
    // message to the client, and is more likely to somdeay
    // allow the user to add the same widget twice without
    // getting a permissions request the second time.
    // this.api.requestCapabilityToSendEvent(rootEventType);
    // this.api.requestCapabilityToReceiveEvent(rootEventType);
    this.api.requestCapabilityToSendEvent(this.eventType);
    this.api.requestCapabilityToReceiveEvent(this.eventType);
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
      // Replay any messages we missed
      // TODO: how to do more than 25?
      this.api.readRoomEvents(this.eventType, 25).then((events: any) => {
        const eventsTyped = events as IWidgetApiRequestData[];
        eventsTyped.forEach(this.receive, this);
      });
      // Allow sending messages
      this.isReady = true;
      // Send queued messages
      if (this.queued !== undefined) {
        this.queued.forEach((event) =>
          this.api.sendRoomEvent(this.eventType, event)
        );
        this.queued = undefined;
      }
    });
    this.api.start();
  }
  /**
   * @return true if we handled the event
   */
  private receive(mxEvent: IWidgetApiRequestData) {
    const ourEvent = mxEvent.content as NetworkEvent;
    this.causal.receive(new Uint8Array(Buffer.from(ourEvent.msg, "base64")));
  }

  register(causal: DefaultCausalBroadcastNetwork): void {
    this.causal = causal;
  }

  send(
    message: Uint8Array,
    _firstTimestamp: CausalTimestamp,
    _lastTimestamp: CausalTimestamp
  ): void {
    const encoded = Buffer.from(message).toString("base64");
    const event: NetworkEvent = {
      msg: encoded,
    };
    if (this.isReady) {
      this.api.sendRoomEvent(this.eventType, event);
    } else {
      // Queue the message for later
      this.queued!.push(event);
    }
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

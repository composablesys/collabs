import { WidgetApi, IWidgetApiRequest } from "matrix-widget-api";
import {
  BroadcastNetwork,
  DefaultCausalBroadcastNetwork,
} from "./default_causal_broadcast_network";
import { CausalTimestamp } from "./causal_broadcast_network";

interface NetworkEvent {
  id: string;
  msg: string;
  name?: string;
}

export class MatrixWidgetNetwork implements BroadcastNetwork {
  private static widgetApiInternal: WidgetApi | undefined = undefined;

  static get widgetApi(): WidgetApi {
    if (this.widgetApiInternal === undefined) {
      this.initializeWidgetApi();
    }
    return this.widgetApiInternal!;
  }

  private static widgetIdInternal: string | undefined = undefined;
  static get widgetId(): string {
    if (this.widgetIdInternal === undefined) {
      const qs = this.parseFragment();
      this.widgetIdInternal = this.assertParam(qs, "widgetId");
    }
    return this.widgetIdInternal;
  }

  private static networksByName = new Map<string, MatrixWidgetNetwork>();

  static initializeWidgetApi(): void {
    const api = new WidgetApi(this.widgetId);

    api.requestCapabilityToSendEvent("crdts.message");
    api.requestCapabilityToReceiveEvent("crdts.message");
    api.on("action:send_event", (ev: CustomEvent<IWidgetApiRequest>) => {
      // TODO: will this prevent multiple widgets from
      // listening to the same type of events?
      ev.preventDefault(); // we're handling it, so stop the widget API from doing something.
      api.transport.reply(ev.detail, {}); // ack
      const mxEvent = ev.detail.data;
      if (mxEvent.type === "crdts.message") {
        const ourEvent = mxEvent.content as NetworkEvent;
        const network = this.networksByName.get(ourEvent.name ?? "");
        if (network === undefined) {
          // TODO
          throw new Error("Unknown network name: " + (ourEvent.name ?? ""));
        }
        network.receive(ourEvent);
      }
    });
    // This has to be called before api.start(), otherwise
    // start throws an error
    api.on("ready", () => {
      // TODO: queue messages until ready?
    });
    api.start();

    this.widgetApiInternal = api;
  }

  static get isWidgetApiAvailable(): boolean {
    try {
      // TODO: supress warning
      const _ = this.widgetApi;
      return true;
    } catch (e) {
      return false;
    }
  }

  // From https://github.com/matrix-org/matrix-widget-api/blob/master/examples/widget/utils.js
  private static parseFragment() {
    const fragmentString = window.location.toString() || "?";
    return new URLSearchParams(
      fragmentString.substring(Math.max(fragmentString.indexOf("?"), 0))
    );
  }

  private static assertParam(fragment: URLSearchParams, name: string) {
    const val = fragment.get(name);
    if (!val)
      throw new Error(`${name} is not present in URL - cannot load widget`);
    return val;
  }

  private causal!: DefaultCausalBroadcastNetwork;

  constructor(private readonly name: string = "") {
    MatrixWidgetNetwork.initializeWidgetApi();
    MatrixWidgetNetwork.networksByName.set(name, this);
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
      id: MatrixWidgetNetwork.widgetId,
      msg: encoded,
    };
    if (this.name !== "") event.name = this.name;
    MatrixWidgetNetwork.widgetApi.sendRoomEvent("crdts.message", event);
  }

  private receive(event: NetworkEvent) {
    this.causal.receive(new Uint8Array(Buffer.from(event.msg, "base64")));
  }
}

import {
  BroadcastNetwork,
  DefaultCausalBroadcastNetwork,
} from "./default_causal_broadcast_network";
import { CausalTimestamp } from "./causal_broadcast_network";
import ReconnectingWebSocket from "reconnecting-websocket";

export class WebSocketNetwork implements BroadcastNetwork {
  causal!: DefaultCausalBroadcastNetwork;
  /**
   * WebSocket for connection to server.
   */
  ws: ReconnectingWebSocket;
  /**
   * Constructor which takes in a webSocketArgs for
   * generating a new WebSocket connection.
   *
   * @param webSocketArgs the argument that
   * use to create a new WebSocket connection.
   */
  constructor(webSocketArgs: string) {
    /**
     * Open WebSocket connection with server.
     * Register EventListener with corresponding event handler.
     */
    this.ws = new ReconnectingWebSocket(webSocketArgs);
    this.ws.addEventListener("message", this.receiveAction);
  }
  /**
   * Invoke heartbeat function to keep clients alive.
   *
   * TODO:
   * The message sending to server is 'heartbeat' right now.
   * The timeout interval is set to 5000 millionseconds.
   */
  // heartbeat() : void {
  //     setTimeout(() => {
  //         this.ws.send('heartbeat');
  //         this.heartbeat();
  //     }, 5000);
  // }
  /**
   * Parse JSON format data back into myMessage type.
   * Push the message into received message buffer.
   * Check the casuality of all the messages and deliver to application.
   *
   * @param message the MessageEvent from the WebSocket.
   */
  receiveAction = (message: MessageEvent) => {
    // TODO: use Uint8Array directly instead
    // (requires changing options + server)
    // See https://stackoverflow.com/questions/15040126/receiving-websocket-arraybuffer-data-in-the-browser-receiving-string-instead
    let parsed = JSON.parse(message.data) as { group: string; message: string };
    this.causal.receive(
      parsed.group,
      new Uint8Array(Buffer.from(parsed.message, "base64"))
    );
  };
  /**
   * Register a CausalBroadcastNetwork which implement the interface.
   * Use DefaultCausalBroadcastNetwork is needed.
   * @param causal the underlying CausalBroadcastNetwork.
   */
  register(causal: DefaultCausalBroadcastNetwork): void {
    this.causal = causal;
  }
  /**
   * Join the group with unique identifier.
   * @param group the group name which is uniquely identified.
   */
  joinGroup(group: string): void {
    // Create a new message with type == "register"
    let message = JSON.stringify({
      type: "register",
      group: group,
    });
    this.ws.send(message);
  }
  /**
   * The actual send function using underlying WebSocket protocol.
   * @param group the unique string identifier of Group.
   * @param message the message with Uint8Array type.
   * @param timestamp the CasualTimestamp.
   */
  send(group: string, message: Uint8Array, _timestamp: CausalTimestamp): void {
    let encoded = Buffer.from(message).toString("base64");
    let toSend = JSON.stringify({ group: group, message: encoded });
    // TODO: use Uint8Array directly instead
    // (requires changing options + server)
    // See https://stackoverflow.com/questions/15040126/receiving-websocket-arraybuffer-data-in-the-browser-receiving-string-instead
    this.ws.send(toSend);
  }
}

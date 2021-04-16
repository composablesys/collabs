import {
  BroadcastNetwork,
  DefaultCausalBroadcastNetwork,
} from "./default_causal_broadcast_network";
import { CausalTimestamp } from "./causal_broadcast_network";

export class WebSocketNetwork implements BroadcastNetwork {
  causal!: DefaultCausalBroadcastNetwork;
  /**
   * WebSocket for connection to server.
   */
  ws: WebSocket;
  /**
   * Message waiting to be sent by the WebSocket
   */
  sendBuffer: Array<string>;
  /**
   * Constructor which takes in a webSocketArgs for
   * generating a new WebSocket connection.
   *
   * @param webSocketArgs the argument that
   * use to create a new WebSocket connection.
   */
  constructor(webSocketArgs: string) {
    this.sendBuffer = [];
    /**
     * Open WebSocket connection with server.
     * Register EventListener with corresponding event handler.
     */
    this.ws = new WebSocket(webSocketArgs);
    this.ws.addEventListener("open", this.sendAction);
    this.ws.addEventListener("message", this.receiveAction);
    // this.ws.addEventListener('ping', function(pingMessage){
    //     console.log('Receive a ping : ' + pingMessage);
    // });
  }
  /**
   * Check if the send message buffer has any message waiting to be sent.
   * If there exist, then send it via WebSocket and remove the item from buffer.
   * If not, then wait a customized time period and check again.
   */
  sendAction = () => {
    let index = 0;
    while (index < this.sendBuffer.length) {
      // TODO: use Uint8Array directly instead
      // (requires changing options + server)
      // See https://stackoverflow.com/questions/15040126/receiving-websocket-arraybuffer-data-in-the-browser-receiving-string-instead
      // this.ws.send(new TextDecoder().decode(this.sendBuffer[index]));
      this.ws.send(this.sendBuffer[index]);
      index++;
    }
    this.sendBuffer = [];
    // Use heartbeat to keep client alive.
    // this.heartbeat();
  };
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
    if (this.ws.readyState == 1) {
      this.ws.send(message);
    } else {
      this.sendBuffer.push(message);
    }
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
    if (this.ws.readyState === 1) {
      // TODO: use Uint8Array directly instead
      // (requires changing options + server)
      // See https://stackoverflow.com/questions/15040126/receiving-websocket-arraybuffer-data-in-the-browser-receiving-string-instead
      this.ws.send(toSend);
    } else {
      this.sendBuffer.push(toSend);
    }
  }
}

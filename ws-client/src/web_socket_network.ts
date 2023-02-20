import { AbstractDoc, CRuntime, SendEvent } from "@collabs/collabs";
import { Buffer } from "buffer";
import ReconnectingWebSocket from "reconnecting-websocket";

export class WebSocketNetwork {
  /**
   * Connection to the server.
   *
   * Use ReconnectingWebSocket so we don't have to worry about
   * reopening closed connections.
   */
  readonly ws: ReconnectingWebSocket;

  private _sendConnected = true;
  private _receiveConnected = true;
  private sendQueue: SendEvent[] = [];
  private receiveQueue: MessageEvent[] = [];

  /**
   * [constructor description]
   * @param url The url to pass to WebSocket's constructor.
   * @param group A group name that uniquely identifies this
   * app and group of collaborators on the server.
   * (The server broadcasts messages between WebSocketNetworks
   * in the same group.)
   */
  constructor(
    readonly doc: AbstractDoc | CRuntime,
    url: string,
    readonly group: string
  ) {
    this.ws = new ReconnectingWebSocket(url);
    this.ws.addEventListener("message", this.wsReceive.bind(this));

    this.doc.on("Send", this.docSend.bind(this));

    // Register with the server.
    // TODO: wait until after "loading", so we only request
    // messages we need, and also this won't start delivering
    // messages before the user signals that the app is ready.
    // Make sure server won't give us *any* messages (even new
    // ones) until after registration, or if it does, we queue them.
    const register = JSON.stringify({
      type: "register",
      group: group,
    });
    this.ws.send(register);
  }

  /**
   * this.ws "message" event handler.
   */
  private wsReceive(e: MessageEvent) {
    if (!this._receiveConnected) {
      this.receiveQueue.push(e);
      return;
    }

    // Opt: use Uint8Array directly instead
    // (requires changing options + server)
    // See https://stackoverflow.com/questions/15040126/receiving-websocket-arraybuffer-data-in-the-browser-receiving-string-instead
    let parsed = JSON.parse(e.data) as { group: string; message: string };
    // TODO: is this check necessary?
    if (parsed.group === this.group) {
      // It's for us
      this.doc.receive(new Uint8Array(Buffer.from(parsed.message, "base64")));
    }
  }

  /**
   * this.doc "Send" event handler.
   */
  private docSend(e: SendEvent): void {
    if (!this._sendConnected) {
      this.sendQueue.push(e);
      return;
    }

    let encoded = Buffer.from(e.message).toString("base64");
    let toSend = JSON.stringify({ group: this.group, message: encoded });
    // Opt: use Uint8Array directly instead
    // (requires changing options + server)
    // See https://stackoverflow.com/questions/15040126/receiving-websocket-arraybuffer-data-in-the-browser-receiving-string-instead
    this.ws.send(toSend);
  }

  // ---Testing utitily: disconnection methods---

  /**
   * Set this to false to (temporarily) queue messages sent
   * by the local CRuntime instead of sending them to the server.
   *
   * Intended as a testing utility (lets you artificially
   * create concurrency).
   *
   * Note that this does not affect the ReconnectingWebSocket's
   * connection state; it just causes us to queue sent messages.
   */
  set sendConnected(sendConnected: boolean) {
    this._sendConnected = sendConnected;
    if (sendConnected) {
      this.sendQueue.forEach(this.docSend.bind(this));
      this.sendQueue = [];
    }
  }

  get sendConnected(): boolean {
    return this._sendConnected;
  }

  /**
   * Set this to false to (temporarily) queue messages received
   * from the server instead of delivering them to the local
   * CRuntime.
   *
   * Intended as a testing utility (lets you artificially
   * create concurrency).
   *
   * Note that this does not affect the ReconnectingWebSocket's
   * connection state; it just causes us to queue received messages.
   */
  set receiveConnected(receiveConnected: boolean) {
    this._receiveConnected = receiveConnected;
    if (receiveConnected) {
      this.receiveQueue.forEach(this.wsReceive.bind(this));
      this.receiveQueue = [];
    }
  }

  get receiveConnected(): boolean {
    return this._receiveConnected;
  }
}

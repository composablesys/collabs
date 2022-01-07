import { BroadcastNetwork } from "../crdt-runtime";

/**
 * A [[BroadcastNetwork]] that wraps another network and
 * provides the ability to disconnect its send or
 * receive functionality.  While disconnected, messages
 * are queued until reconnected.
 */
export class DisconnectableNetwork implements BroadcastNetwork {
  readonly onreceive!: (message: Uint8Array) => void;

  private _sendConnected = true;
  private _receiveConnected = true;
  private sendQueue: Uint8Array[] = [];
  private receiveQueue: Uint8Array[] = [];

  constructor(private readonly pipedNetwork: BroadcastNetwork) {
    pipedNetwork.onreceive = this.receive.bind(this);
  }

  send(message: Uint8Array): void {
    if (this._sendConnected) {
      this.pipedNetwork.send(message);
    } else {
      this.sendQueue.push(message);
    }
  }

  set sendConnected(sendConnected: boolean) {
    this._sendConnected = sendConnected;
    if (sendConnected) {
      this.sendQueue.forEach((message) => this.pipedNetwork.send(message));
      this.sendQueue = [];
    }
  }

  get sendConnected(): boolean {
    return this._sendConnected;
  }

  receive(message: Uint8Array): void {
    if (this._receiveConnected) {
      this.onreceive(message);
    } else {
      this.receiveQueue.push(message);
    }
  }

  set receiveConnected(receiveConnected: boolean) {
    this._receiveConnected = receiveConnected;
    if (receiveConnected) {
      this.receiveQueue.forEach((message) => this.onreceive(message));
      this.receiveQueue = [];
    }
  }

  get receiveConnected(): boolean {
    return this._receiveConnected;
  }

  save(): Uint8Array {
    throw new Error("Method not implemented.");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load(saveData: Uint8Array | null): void {
    throw new Error("Method not implemented.");
  }
}

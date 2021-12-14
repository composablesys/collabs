import { CausalBroadcastNetwork } from "../core";

/**
 * A CausalBroadcastNetwork that wraps another network and
 * provides the ability to disconnect it send or
 * receive functionality.  While disconnected, messages
 * are queued until reconnected.
 */
export class DisconnectableNetwork implements CausalBroadcastNetwork {
  readonly onreceive!: (message: Uint8Array) => void;

  private _sendConnected = true;
  private _receiveConnected = true;
  private sendQueue: [message: Uint8Array, senderCounter: number][] = [];
  private receiveQueue: Uint8Array[] = [];

  constructor(private readonly pipedNetwork: CausalBroadcastNetwork) {
    pipedNetwork.onreceive = this.receive.bind(this);
  }

  set replicaId(replicaId: string) {
    this.pipedNetwork.replicaId = replicaId;
  }

  send(message: Uint8Array, senderCounter: number): void {
    if (this._sendConnected) {
      this.pipedNetwork.send(message, senderCounter);
    } else {
      this.sendQueue.push([message, senderCounter]);
    }
  }

  set sendConnected(sendConnected: boolean) {
    this._sendConnected = sendConnected;
    if (sendConnected) {
      this.sendQueue.forEach((message) => this.pipedNetwork.send(...message));
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

  load(saveData: Uint8Array | null): void {
    throw new Error("Method not implemented.");
  }
}

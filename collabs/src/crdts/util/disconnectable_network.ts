import { DisconnectableNetworkSave } from "../../../generated/proto_compiled";
import { Optional } from "../../util";
import { BroadcastNetwork } from "../crdt-runtime";

/**
 * A [[BroadcastNetwork]] that wraps another network and
 * provides the ability to disconnect its send or
 * receive functionality.  While disconnected, messages
 * are queued until reconnected.
 *
 * TODO: if you save while there are queued send messages,
 * they'll be sent during the next load---possibly resent,
 * possibly by a different user than originally sent them.
 * This is fine as long as the inner network treats messages
 * as opaque; duplicate messages will get filtered by the
 * CRDTRuntime (really CRDTExtraMetaLayer). Could still be
 * weird, but okay because this class is just for testing anyway.
 * If you want to prevent those messages from being dispatched
 * during load, you'll need to disconnect this before load
 * is called.
 * Note that delivering messages during load can cause
 * CRDTs to send events and stuff during load.
 * Technically not allowed (?) for a BroadcastNetwork, so
 * this one is special.
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
    const message = DisconnectableNetworkSave.create({
      sendQueue: this.sendQueue,
      receiveQueue: this.receiveQueue,
      pipedNetworkSave: this.pipedNetwork.save(),
    });
    return DisconnectableNetworkSave.encode(message).finish();
  }

  load(saveData: Optional<Uint8Array>): void {
    if (!saveData.isPresent) {
      // Loading skipped; pass on the message.
      this.pipedNetwork.load(saveData);
    } else {
      const decoded = DisconnectableNetworkSave.decode(saveData.get());
      this.sendQueue = decoded.sendQueue;
      this.receiveQueue = decoded.receiveQueue;
      this.pipedNetwork.load(Optional.of(decoded.pipedNetworkSave));
      // Deliver queued messages if we're connected.
      this.sendConnected = this._sendConnected;
      this.receiveConnected = this._receiveConnected;
    }
  }
}

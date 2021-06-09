// The casual broadcast network designed for a two-way interactive
// communication session between user and server using WebSocket API.
//
// Also ensure the order of delivery with casuality check.

import { DefaultCausalBroadcastMessage } from "../../generated/proto_compiled";
import { Runtime } from "../crdt";
import {
  CausalTimestamp,
  CausalBroadcastNetwork,
} from "./causal_broadcast_network";
import { VectorClock } from "./vector_clock";

/**
 * Interface describing a (reliable, at-least-once, ordering
 * agnostic)
 * broadcast network.  This network is used
 * by DefaultCausalBroadcastNetwork to broadcast messages to
 * other replicas reliably, while the
 * DefaultCausalBroadcastNetwork handles the tagged causal
 * ordering of messages.
 */
export interface BroadcastNetwork {
  /**
   * Registers the given DefaultCausalBroadcastNetwork
   * to receive messages
   * from other replicas.  Such messages should be delivered
   * to runtime.receive.  This method will be
   * called exactly once, before any other methods.
   * @param causal The DefaultCausalBroadcastNetwork.
   */
  register(causal: DefaultCausalBroadcastNetwork): void;
  /**
   * Used by DefaultCausalBroadcastNetwork
   * to send a broadcast message. This message should be
   * delivered to the
   * registered DefaultCausalBroadcastNetwork's
   * receive method on
   * all other replicas in group, reliably and at-least-once,
   * but without any ordering requirements.  (However, messages
   * will only be delivered to their target Crdt's in
   * causal order, with DefaultCausalBroadcastNetwork
   * bufferring messages if needed).
   * timestamp
   * is provided for information purposes only -
   * you can safely ignore it, and in particular, there
   * is no ordering requirement for delivered messages.
   * @param group An identifier for the group that
   * this message should be broadcast to (see joinGroup).
   * @param message The message to send
   * @param firstTimestamp The CausalTimestamp of the first CRDT message
   * inluded in message (which may be a batch of messages),
   * for information purposes only.
   * @param lastTimestamp The CausalTimestamp of the last CRDT message
   * inluded in message (which may be a batch of messages),
   * for information purposes only.
   */
  send(
    message: Uint8Array,
    firstTimestamp: CausalTimestamp,
    lastTimestamp: CausalTimestamp
  ): void;
}

/**
 * Customized message event that travel through
 * casualbroadcast network.
 */
export class myMessage {
  /**
   * Crdt update message.
   */
  message: Uint8Array;
  /**
   * Timestamp for casuality/concurrency check.
   *
   * Provide basic functions such as :
   * getSender() / getSenderCounter() / asVectorClock().
   */
  timestamp: VectorClock;

  constructor(message: Uint8Array, timestamp: VectorClock) {
    this.message = message;
    this.timestamp = timestamp;
  }
  /**
   * Returns a serialized form of the message.
   *
   * @returns serialize message
   */
  serialize(): Uint8Array {
    const message = DefaultCausalBroadcastMessage.create({
      message: this.message,
      sender: this.timestamp.sender,
      vectorMap: Object.fromEntries(this.timestamp.vectorMap.entries()),
      time: this.timestamp.getTime(),
    });
    return DefaultCausalBroadcastMessage.encode(message).finish();
  }

  /**
   * Parse serialized data back to myMessage.
   *
   * @param data serialized message
   * @param myReplicaId the local use's replicaId
   * @returns a deserialized myMessage
   */
  static deserialize(data: Uint8Array, myReplicaId: string): myMessage {
    let decoded = DefaultCausalBroadcastMessage.decode(data);
    let vc = new VectorClock(
      decoded.sender,
      myReplicaId === decoded.sender,
      decoded.time
    );
    vc.vectorMap = new Map(Object.entries(decoded.vectorMap));
    return new myMessage(decoded.message, vc);
  }
}

/**
 * WebSocketNetwork:
 *
 * Process initialization when starting a new user node.
 *
 * Communicate with CRDT's runtime and send/receive message via
 * central broadcast server with WebSocket protocol.
 *
 * Perform casuality check to ensure message ordering.
 */
export class DefaultCausalBroadcastNetwork implements CausalBroadcastNetwork {
  /**
   * Registered Runtime.
   */
  private runtime!: Runtime;
  /**
   * BroadcastNetwork for broadcasting messages.
   */
  readonly broadcastNetwork: BroadcastNetwork;
  /**
   * Our current vector clock.
   */
  private vc!: VectorClock;
  /**
   * Message buffer to store received message to ensure casual delivery.
   */
  private readonly messageBuffer: myMessage[] = [];
  /**
   * Whether there is a  pending send batch
   * (begun but not committed).  Don't
   * deliver received messages until after commitBatch
   * is called.
   */
  private isPendingBatch: boolean = false;

  /**
   * [constructor description]
   * @param broadcastNetwork [description]
   */
  constructor(broadcastNetwork: BroadcastNetwork) {
    /**
     * Open WebSocket connection with server.
     * Register EventListener with corresponding event handler.
     */
    this.broadcastNetwork = broadcastNetwork;
    this.broadcastNetwork.register(this);
  }
  /**
   * Parse JSON format data back into myMessage type.
   * Push the message into received message buffer.
   * Check the casuality of all the messages and deliver to application.
   *
   * @param message
   */
  receive(message: Uint8Array) {
    let parsed = myMessage.deserialize(message, this.crdtRuntime.replicaId);
    this.messageBuffer.push(parsed);
    this.checkMessageBuffer();
  }
  /**
   * Register Runtime CasualBroadcastNetwork.
   *
   * @param runtime
   */
  register(runtime: Runtime): void {
    this.runtime = runtime;
    this.vc = new VectorClock(this.runtime.replicaId, true, -1);
  }

  beginBatch(): CausalTimestamp {
    this.isPendingBatch = true;

    // Return the next timestamp.
    const next = this.nextTimestamp(this.vc) as VectorClock;
    next.time = Date.now();
    return next;
  }
  /**
   * Send function on casualbroadcast network layer, which called
   * by crdt's runtime layer.
   *
   * The message is wrapped with its corresponding timestamp (basic sender node
   * info and vector clock).
   *
   * Using WebSocket as network transmission protocol.
   * Using JSON format as message type.
   *
   * If the WebSocket Readystate is not Open, then buffer the message and
   * wait until WebSocket open.
   * If the WebSocket Readystate is Open, then send it with ws.send().
   *
   * @param group An identifier for the group that
   * this message should be broadcast to.  A group
   * encompasses both a set of replicas and a unit
   * of causal consistency, i.e., messages should
   * be causally consistent within a group but need
   * not be across groups.
   * @param message The message to send
   * TODO
   */
  commitBatch(
    message: Uint8Array,
    firstTimestamp: CausalTimestamp,
    lastTimestamp: CausalTimestamp
  ): void {
    // Register that we received all of the timestamps, for causal ordering
    this.vc = lastTimestamp as VectorClock;

    // Send the message
    let myPackage = new myMessage(message, firstTimestamp as VectorClock);
    this.broadcastNetwork.send(
      myPackage.serialize(),
      firstTimestamp,
      lastTimestamp
    );

    this.isPendingBatch = false;

    // Deliver any messages received in the meantime, which were previously
    // blocked by the pending batch.
    this.checkMessageBuffer();
  }

  nextTimestamp(previous: CausalTimestamp): CausalTimestamp {
    // Copy a new vector clock.
    // TODO: can we avoid copying, for efficiency?
    let vc = previous as CausalTimestamp;
    let vcCopy = new VectorClock(
      previous.getSender(),
      previous.isLocal(),
      previous.getTime()
    );
    vcCopy.vectorMap = new Map<string, number>(vc.asVectorClock());

    // Update the timestamp of this replica with next value.
    vcCopy.increment();

    return vcCopy;
  }

  /**
   * Check the casuality of buffered messages and deliver the
   * messages back to crdtMessageListener which are ready.
   *
   * The checking order is from the lastest to the oldest.
   * Update the VectorClock entry and MessageBuffer when necessary.
   *
   * Send the message back to runtime with corresponding
   * crdtMessageListener.
   *
   * TODO: optimize?
   */
  private checkMessageBuffer(): void {
    // Don't deliver any messages to the runtime if there is a pending
    // batch of messages to send.
    if (this.isPendingBatch) return;

    let index = this.messageBuffer.length - 1;

    while (index >= 0) {
      let curVectorClock = this.messageBuffer[index].timestamp;

      if (this.vc.isReady(curVectorClock)) {
        /**
         * Send back the received message to runtime.
         */
        let lastTimestamp = this.runtime.receive(
          this.messageBuffer[index].message,
          curVectorClock
        );
        this.vc.mergeSender(lastTimestamp as VectorClock);
        this.messageBuffer.splice(index, 1);
        // Set index to the end and try again, in case
        // this makes more messages ready
        index = this.messageBuffer.length - 1;
      } else {
        console.log(
          "DefaultCausalBroadcastNetwork.checkMessageBuffer: not ready"
        );
        if (this.vc.isAlreadyReceived(curVectorClock)) {
          // Remove the message from the buffer
          this.messageBuffer.splice(index, 1);
          console.log("(already received)");
        }
        index--;
        console.log(this.vc.toString());
        console.log(curVectorClock.toString());
      }
    }
  }

  get crdtRuntime(): Runtime {
    return this.runtime;
  }

  readonly isCausalBroadcastNetwork: true = true;

  static timestampOf(_message: Uint8Array) {
    // TODO
    throw new Error("Method not implemented.");
  }
}

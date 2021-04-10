// The casual broadcast network designed for a two-way interactive
// communication session between user and server using WebSocket API.
//
// Also ensure the order of delivery with casuality check.

import { DefaultCausalBroadcastMessage } from "../../generated/proto_compiled";
import { CrdtRuntime } from "../crdts";
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
   * See CausalBroadcastNetwork#joinGroup.  (TODO: copy
   * desc from there, or move it here, since this is
   * the more user-facing interface).
   * @param group See CausalBroadcastNetwork#joinGroup
   */
  joinGroup(group: string): void;
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
    group: string,
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
    let vectorMapAsIndexSignature: { [key: string]: number } = {};
    for (let entry of this.timestamp.vectorMap.entries()) {
      vectorMapAsIndexSignature[entry[0]] = entry[1];
    }
    let message = DefaultCausalBroadcastMessage.create({
      message: this.message,
      sender: this.timestamp.sender,
      vectorMap: vectorMapAsIndexSignature,
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
    let vc = new VectorClock(decoded.sender, myReplicaId === decoded.sender);
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
   * Registered CrdtRuntime.
   */
  private runtime!: CrdtRuntime;
  /**
   * BroadcastNetwork for broadcasting messages.
   */
  readonly broadcastNetwork: BroadcastNetwork;
  /**
   * Map stores all groups with its corresponding vector clock.
   */
  private readonly vcMap: Map<string, VectorClock>;
  /**
   * Message buffer to store received message to ensure casual delivery.
   */
  private readonly messageBuffer: Map<string, Array<myMessage>>;
  /**
   * Groups with a pending send batch (begun but not committed).  Don't
   * deliver received messages for these groups until after commitBatch
   * is called.
   */
  private readonly pendingBatches = new Set<string>();

  /**
   * [constructor description]
   * @param broadcastNetwork [description]
   */
  constructor(broadcastNetwork: BroadcastNetwork) {
    this.vcMap = new Map();
    this.messageBuffer = new Map();
    /**
     * Open WebSocket connection with server.
     * Register EventListener with corresponding event handler.
     */
    this.broadcastNetwork = broadcastNetwork;
    this.broadcastNetwork.register(this);
  }

  joinGroup(group: string): void {
    this.broadcastNetwork.joinGroup(group);
    this.messageBuffer.set(group, []);
  }
  /**
   * Parse JSON format data back into myMessage type.
   * Push the message into received message buffer.
   * Check the casuality of all the messages and deliver to application.
   *
   * @param message
   */
  receive(group: string, message: Uint8Array) {
    let parsed = myMessage.deserialize(
      message,
      this.crdtRuntime.getReplicaId()
    );
    this.messageBuffer.get(group)!.push(parsed);
    this.checkMessageBuffer(group);
  }
  /**
   * Register CrdtRuntime CasualBroadcastNetwork.
   *
   * @param runtime
   */
  register(runtime: CrdtRuntime): void {
    this.runtime = runtime;
  }

  beginBatch(group: string): CausalTimestamp {
    this.pendingBatches.add(group);

    // Return the next timestamp for group.
    let vc = this.vcMap.get(group);
    if (!vc) {
      vc = new VectorClock(this.runtime.getReplicaId(), true);
      this.vcMap.set(group, vc);
    }
    return this.nextTimestamp(vc);
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
    group: string,
    message: Uint8Array,
    firstTimestamp: CausalTimestamp,
    lastTimestamp: CausalTimestamp
  ): void {
    // Register that we received all of the timestamps, for causal ordering
    this.vcMap.set(group, lastTimestamp as VectorClock);

    // Send the message
    let myPackage = new myMessage(message, firstTimestamp as VectorClock);
    this.broadcastNetwork.send(
      group,
      myPackage.serialize(),
      firstTimestamp,
      lastTimestamp
    );

    this.pendingBatches.delete(group);

    // Deliver any messages received in the meantime, which were previously
    // blocked by the pending batch.
    this.checkMessageBuffer(group);
  }

  nextTimestamp(previous: CausalTimestamp): CausalTimestamp {
    // Copy a new vector clock.
    // TODO: can we avoid copying, for efficiency?
    let vc = previous as CausalTimestamp;
    let vcCopy = new VectorClock(previous.getSender(), previous.isLocal());
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
  checkMessageBuffer(group: string): void {
    // Don't deliver any messages to the runtime if there is a pending
    // batch of messages to send.
    if (this.pendingBatches.has(group)) return;

    let groupBuffer = this.messageBuffer.get(group)!;
    let index = groupBuffer.length - 1;

    while (index >= 0) {
      let curVectorClock = groupBuffer[index].timestamp;

      let myVectorClock = this.vcMap.get(group);
      if (!myVectorClock) {
        myVectorClock = new VectorClock(this.runtime.getReplicaId(), true);
        this.vcMap.set(group, myVectorClock);
      }
      if (myVectorClock.isReady(curVectorClock)) {
        /**
         * Send back the received message to runtime.
         */
        let lastTimestamp = this.runtime.receive(
          group,
          groupBuffer[index].message,
          curVectorClock
        );
        myVectorClock.mergeSender(lastTimestamp as VectorClock);
        groupBuffer.splice(index, 1);
        // Set index to the end and try again, in case
        // this makes more messages ready
        index = groupBuffer.length - 1;
      } else {
        console.log(
          "DefaultCausalBroadcastNetwork.checkMessageBuffer: not ready"
        );
        if (myVectorClock.isAlreadyReceived(curVectorClock)) {
          // Remove the message from the buffer
          groupBuffer.splice(index, 1);
          console.log("(already received)");
        }
        index--;
        console.log(myVectorClock.toString());
        console.log(curVectorClock.toString());
      }
    }
  }

  get crdtRuntime(): CrdtRuntime {
    return this.runtime;
  }

  static timestampOf(_message: Uint8Array) {
    // TODO
    throw new Error("Method not implemented.");
  }
}

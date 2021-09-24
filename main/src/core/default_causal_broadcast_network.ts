import {
  DefaultCausalBroadcastMessage,
  DefaultCausalBroadcastSave,
} from "../../generated/proto_compiled";
import { Runtime } from "./runtime";
import {
  CausalTimestamp,
  CausalBroadcastNetwork,
} from "./causal_broadcast_network";
import { VectorClock } from "./vector_clock";
import { int64AsNumber } from "../util";

const DEBUG = false;

/**
 * Interface describing a (reliable, at-least-once, ordering
 * agnostic)
 * broadcast network.
 *
 * This network is used
 * by [[DefaultCausalBroadcastNetwork]] to broadcast messages to
 * other replicas reliably, while the
 * [[DefaultCausalBroadcastNetwork]] handles the causal
 * ordering of messages.
 *
 * Implementations are provided by plugin packages (see TODO), or you
 * can write your own for a custom network.
 */
export interface BroadcastNetwork {
  /**
   * Callback set by the using network.  Pass received
   * messages to this function.
   */
  onreceive: (message: Uint8Array) => void;
  /**
   * Used by [[DefaultCausalBroadcastNetwork]]
   * to send a broadcast message.
   *
   * For implementers: The message must be
   * delivered to the `onreceive` callbacks of
   * all other replicas in group, reliably and at-least-once,
   * but without any ordering requirements.
   *
   * @param message The message to send.
   */
  send(message: Uint8Array): void;

  // TODO: need to prevent loading all messages after
  // construction but before loading (the current behavior
  // of WebSocketNetwork), iff it's going to be loaded.
  /**
   * Save any current state if desired.  This method should
   * only be called by [[DefaultCausalBroadcastNetwork.save]].
   *
   * The returned saveData may later be passed to [[load]]
   * on a newly initialized instance of the same class,
   * constructed with the same constructor arguments.
   * The loaded instance will then deliver to `onreceive`
   * **at least** any messages that were not delivered before
   * saving, in any order as usual.
   *
   * Advice for implementers:
   * - The only requirement is that a loaded copy must
   * eventually deliver any messages that were not already
   * delivered by the saved instance.  It is okay to deliver
   * more (e.g., if you save no state and ignore loading), but
   * inefficient.
   * - Note that
   * [[load]] will be called on a replica
   * with a different replicaId than this one, and that
   * the save data may be loaded by multiple replicas concurrently.  Thus
   * the save data must be forkable without breaking
   * reliable delivery.
   *
   * @return [description]
   */
  save(): Uint8Array;

  /**
   * Loads the state from save data.  See [[save]].  This method should
   * only be called by [[DefaultCausalBroadcastNetwork.load]].
   *
   * This must have been constructed with the same class and
   * constructor arguments as the saved instance, and it must
   * not have sent or received any messages yet.
   *
   * @param saveData An output of [[save]] from a previous
   * instance of this class. Note that `saveData` will have been output
   * by a different replica (with a different [[Runtime.replicaId]]),
   * and the same `saveData` may be loaded on multiple
   * replicas, possibly concurrently.
   */
  load(saveData: Uint8Array): void;
}

/**
 * Customized message event that travel through
 * casualbroadcast network.
 */
class myMessage {
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
    const vectorMap = Object.fromEntries(this.timestamp.vectorMap);
    delete vectorMap[this.timestamp.sender];
    const message = DefaultCausalBroadcastMessage.create({
      message: this.message,
      sender: this.timestamp.sender,
      senderCounter: this.timestamp.getSenderCounter(),
      vectorMap,
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
      int64AsNumber(decoded.time)
    );
    vc.vectorMap = new Map(Object.entries(decoded.vectorMap));
    vc.vectorMap.set(decoded.sender, decoded.senderCounter);
    return new myMessage(decoded.message, vc);
  }
}

/**
 * Default implementation of [[CausalBroadcastNetwork]]
 * on top of an arbitrary [[BroadcastNetwork]].
 */
export class DefaultCausalBroadcastNetwork implements CausalBroadcastNetwork {
  /**
   * Registered Runtime.
   */
  private runtime!: Runtime;
  private onreceive!: (
    message: Uint8Array,
    firstTimestamp: CausalTimestamp
  ) => CausalTimestamp;
  private onreceiveblocked!: (sender: string) => void;
  /**
   * Our current vector clock.
   */
  private vc!: VectorClock;
  /**
   * Message buffer to store received message to ensure casual delivery.
   */
  private messageBuffer: myMessage[] = [];
  /**
   * The first index to check for readiness in the buffer.
   */
  private bufferCheckIndex = 0;
  /**
   * Whether there is a  pending send batch
   * (begun but not committed).  Don't
   * deliver received messages until after commitBatch
   * is called.
   */
  private isPendingBatch: boolean = false;

  /**
   * @param broadcastNetwork The [[BroadcastNetwork]] used
   * to send and receive messages.
   */
  constructor(readonly broadcastNetwork: BroadcastNetwork) {
    /**
     * Open WebSocket connection with server.
     * Register EventListener with corresponding event handler.
     */
    this.broadcastNetwork = broadcastNetwork;
    this.broadcastNetwork.onreceive = this.receive.bind(this);
  }
  /**
   * Parse JSON format data back into myMessage type.
   * Push the message into received message buffer.
   * Check the casuality of all the messages and deliver to application.
   *
   * @param message
   */
  private receive(message: Uint8Array) {
    let parsed = myMessage.deserialize(message, this.runtime.replicaId);
    this.messageBuffer.push(parsed);
    this.checkMessageBuffer();
  }

  registerRuntime(
    runtime: Runtime,
    onreceive: (
      message: Uint8Array,
      firstTimestamp: CausalTimestamp
    ) => CausalTimestamp,
    onreceiveblocked: (sender: string) => void
  ): void {
    this.runtime = runtime;
    this.onreceive = onreceive;
    this.onreceiveblocked = onreceiveblocked;
    this.vc = new VectorClock(this.runtime.replicaId, true, -1);
  }

  beginBatch(): CausalTimestamp {
    this.isPendingBatch = true;

    // Return the next timestamp.
    const next = this.nextTimestamp(this.vc) as VectorClock;
    next.time = Date.now();
    return next;
  }

  commitBatch(
    message: Uint8Array,
    firstTimestamp: CausalTimestamp,
    lastTimestamp: CausalTimestamp
  ): void {
    // Register that we received all of the timestamps, for causal ordering
    this.vc = lastTimestamp as VectorClock;

    // Send the message
    let myPackage = new myMessage(message, firstTimestamp as VectorClock);
    this.broadcastNetwork.send(myPackage.serialize());

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
    let index = this.messageBuffer.length - 1;

    while (index >= this.bufferCheckIndex) {
      let curVectorClock = this.messageBuffer[index].timestamp;

      if (this.vc.isReady(curVectorClock)) {
        // Don't deliver any messages to the runtime if there is a pending
        // batch of messages to send, but do let the runtime
        // know of them.
        if (this.isPendingBatch) {
          this.onreceiveblocked(curVectorClock.getSender());
          return;
        }
        /**
         * Send back the received message to runtime.
         */
        let lastTimestamp = this.onreceive(
          this.messageBuffer[index].message,
          curVectorClock
        );
        this.vc.mergeSender(lastTimestamp as VectorClock);
        // TODO: something more efficient?  (Costly array
        // deletions).
        this.messageBuffer.splice(index, 1);
        // Set index to the end and try again, in case
        // this makes more messages ready
        this.bufferCheckIndex = 0;
        index = this.messageBuffer.length - 1;
      } else {
        if (DEBUG) {
          console.log(
            "DefaultCausalBroadcastNetwork.checkMessageBuffer: not ready"
          );
        }
        if (this.vc.isAlreadyReceived(curVectorClock)) {
          // Remove the message from the buffer
          this.messageBuffer.splice(index, 1);
          if (DEBUG) console.log("(already received)");
        }
        index--;
        if (DEBUG) {
          console.log(this.vc.toString());
          console.log(curVectorClock.toString());
        }
      }
    }
    this.bufferCheckIndex = this.messageBuffer.length;
  }

  serialize(value: CausalTimestamp): Uint8Array {
    // TODO: make reasonable (don't use myMessage)
    return new myMessage(new Uint8Array(), value as VectorClock).serialize();
  }

  deserialize(message: Uint8Array, runtime: Runtime): CausalTimestamp {
    return myMessage.deserialize(message, runtime.replicaId).timestamp;
  }

  save(): Uint8Array {
    const message = DefaultCausalBroadcastSave.create({
      vectorMap: Object.fromEntries(this.vc.vectorMap),
      messageBuffer: this.messageBuffer.map((value) => value.serialize()),
      bufferCheckIndex: this.bufferCheckIndex,
      broadcastNetworkSave: this.broadcastNetwork.save(),
    });
    return DefaultCausalBroadcastSave.encode(message).finish();
  }

  load(saveData: Uint8Array) {
    const message = DefaultCausalBroadcastSave.decode(saveData);
    for (let entry of Object.entries(message.vectorMap)) {
      this.vc.vectorMap.set(...entry);
    }
    this.messageBuffer = message.messageBuffer.map((serialized) =>
      myMessage.deserialize(serialized, this.runtime.replicaId)
    );
    this.bufferCheckIndex = message.bufferCheckIndex;
    this.broadcastNetwork.load(message.broadcastNetworkSave);
  }

  readonly isCausalBroadcastNetwork: true = true;
}

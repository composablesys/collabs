import { CrdtRuntime, CausalTimestamp } from '../crdt_runtime_interface';
import { CrdtMessageListener } from "../crdt_runtime_interface";
import { VectorClock } from './vector_clock';
// import WebSocket = require("ws");

// The casual broadcast network designed for a two-way interactive
// communication session between user and server using WebSocket API.
//
// Also ensure the order of delivery with casuality check.

/**
 * Customized message event that travel through
 * casualbroadcast network.
 */
export class myMessage {
    /**
     * Crdt update message.
     */
    message : any;
    /**
     * Unique crdtId for identification.
     */
    crdtId : any;
    /**
     * Timestamp for casuality/concurrency check.
     *
     * Provide basic functions such as :
     * getSender() / getSenderCounter() / asVectorClock().
     */
    timestamp : VectorClock;

    constructor (message : any, crdtId : any, timestamp : VectorClock) {
        this.message = message;
        this.crdtId = crdtId;
        this.timestamp = timestamp;
    }
    /**
     * customized toJSON function to convert message as JSON format.
     *
     * @returns package info in JSON format.
     */
    toJSON() : string {
        return JSON.stringify(
            {   "message" : this.message,
                "crdtId" : this.crdtId,
                "timestamp" : {
                    "uid" : this.timestamp.uid,
                    "vectorMap" : Array.from(this.timestamp.vectorMap.entries())
                }
            }
        );
    }
}

/**
 * CasualBroadcastNetwork:
 *
 * Process initialization when starting a new user node.
 *
 * Communicate with CRDT's runtime and send/receive message via
 * central broadcast server with WebSocket protocol.
 *
 * Perform casuality check to ensure message ordering.
 */
export class CrdtNetworkRuntime implements CrdtRuntime{
    /**
     * Unique ID for replica for identification.
     */
    uid : any;
    /**
     * WebSocket for connection to server.
     */
    ws : WebSocket;
    /**
     * Map stores all crdtId with its corresponding vector clock.
     */
    vcMap : Map<any, VectorClock>;
    /**
     * Message buffer to store received message to ensure casual delivery.
     */
    messageBuffer : Array<[any, any, VectorClock]>;
    /**
     * Message waiting to be sent by the WebSocket
     */
    sendBuffer : Array<myMessage>;
    /**
     * The registered CRDT with corresponding CrdtMessageListener.
     */
    listenersById : Map<any, CrdtMessageListener>;

    constructor (replicaId: any, webSocketArgs: string) {
        this.uid = replicaId;
        this.vcMap = new Map<any, VectorClock>();
        this.messageBuffer = new Array<[any, any, VectorClock]>();
        this.sendBuffer = new Array<myMessage>();
        this.listenersById = new Map<any, CrdtMessageListener>();
        /**
         * Open WebSocket connection with server.
         * Register EventListener with corresponding event handler.
         */
        this.ws = new WebSocket(webSocketArgs);
        this.ws.addEventListener('open', this.sendAction);
        this.ws.addEventListener('message', this.receiveAction);
    }
    /**
     * Check if the send message buffer has any message waiting to be sent.
     * If there exist, then send it via WebSocket and remove the item from buffer.
     * If not, then wait a customized time period and check again.
     */
    sendAction = () => {
        let index = 0;
        while (index < this.sendBuffer.length) {
            this.ws.send(this.sendBuffer[index].toJSON());
            index++;
        }
        this.sendBuffer = new Array<myMessage>();
    }
    /**
     * Parse JSON format data back into myMessage type.
     * Push the message into received message buffer.
     * Check the casuality of all the messages and deliver to application.
     *
     * @param data the JSON format data send via network
     */
    receiveAction = (data : any) => {
        let myPackage = this.parseJSON(data.data);
        this.messageBuffer.push([myPackage.message, myPackage.crdtId, myPackage.timestamp]);
        this.checkMessageBuffer();
    };
    /**
     * Implement the function defined in CrdtRuntime interfaces.
     *
     * @returns This replica's id, used by some CRDTs internally
     * (e.g., to generate unique identifiers of the form (replica id, counter)).
     *
     */
    getReplicaId() : any {
        return this.uid;
    }
    /**
     * Register newly created crdtId on CasualBroadcastNetwork.
     *
     * @param crdtId
     */
    registerCrdtId(crdtId : any) : void {
        if (this.vcMap.has(crdtId)) {
            throw new Error("Duplicate crdtId: " + crdtId);
        }
        this.vcMap.set(crdtId, new VectorClock(this.uid));
    }
    /**
     * Register newly created crdt with its ID and corresponding message
     * listener on CasualBroadcastNetwork.
     *
     * @param crdtMessageListener the message listener of each crdt.
     * @param crdtId the ID of each crdt.
     *
     */
    register(crdtMessageListener: CrdtMessageListener, crdtId: any) : void {
        if (this.listenersById.has(crdtId) || this.vcMap.has(crdtId)) {
            throw new Error("Duplicate crdtId: " + crdtId);
        }
        this.listenersById.set(crdtId, crdtMessageListener);
        this.vcMap.set(crdtId, new VectorClock(this.uid));
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
     * @param message the crdt update message.
     * @param crdtId the unique ID for each crdt.
     */
    send(message : any, crdtId : any) : void{
        // Check if the crdtId exist in the map.
        if (this.vcMap.has(crdtId)) {
            this.vcMap.get(crdtId)!.increment();
        } else {
            this.vcMap.set(crdtId, new VectorClock(this.uid));
            this.vcMap.get(crdtId)!.increment();
        }

        // Copy a new vector clock for sending
        let vcCopy = new VectorClock(this.uid);
        vcCopy.vectorMap = new Map<any, number>(this.vcMap.get(crdtId)?.asVectorClock()!);
        let myPackage = new myMessage(message, crdtId, vcCopy!);

        // Convert the message into JSON
        if (this.ws.readyState === 1) {
            this.ws.send(myPackage.toJSON());
        } else {
            this.sendBuffer.push(myPackage);
        }
    }
    /**
     * Get the next timestamp of the given crdtId in this replica.
     * 
     * This is passed to CrdtInternal.effect when a replica processes its own
     * message.
     * 
     * @param crdtId the crdtId that would like to return.
     * @returns The timestamp that would be assigned to a CRDT
     * message sent by this replica and given crdtId right now.
     * 
     */
    getNextTimestamp(crdtId: any) : CausalTimestamp {
        // Copy a new vector clock.  
        let vcCopy = new VectorClock(this.uid);
        vcCopy.vectorMap = new Map<any, number>(this.vcMap.get(crdtId)?.asVectorClock()!);

        // Update the timestamp of this replica with next value. 
        vcCopy.vectorMap.set(this.uid, vcCopy.vectorMap.get(this.uid) as number + 1);

        return vcCopy;
    }
    /**
     * Parse JSON format data back to customized data type.
     *
     * @param data the JSON format data travel through network.
     * @returns the customized data type => myMessage
     */
    parseJSON(data : string) : myMessage {
        let dataJSON = JSON.parse(data);
        let vc = new VectorClock(dataJSON.timestamp.uid);
        vc.vectorMap = new Map(dataJSON.timestamp.vectorMap);
        let myPackage = new myMessage(dataJSON.message, dataJSON.crdtId, vc);

        return myPackage;
    }
    /**
     * Check the casuality of buffered messages and delivery the
     * messages back to crdtMessageListener which are ready.
     *
     * The checking order is from the lastest to the oldest.
     * Update the VectorClock entry and MessageBuffer when necessary.
     *
     * Send the message back to crdtRuntime with corresponding 
     * crdtMessageListener.
     */
    checkMessageBuffer() : void {
        let index = this.messageBuffer.length - 1;

        while(index >= 0) {
            let curCrdtId = this.messageBuffer[index][1];
            let curVectorClock = this.messageBuffer[index][2];

            if (!this.vcMap.has(curCrdtId)) {
                this.messageBuffer.splice(index, 1);
            } else {
                let myVectorClock = this.vcMap.get(curCrdtId);
                if (myVectorClock?.isready(curVectorClock)) {
                    /**
                     * Send back the received messages to crdtMessageListener.
                    
                     */
                    if (this.listenersById.has(curCrdtId)) {
                        this.listenersById.get(curCrdtId)?.receive(this.messageBuffer[index][0], curVectorClock);
                        myVectorClock.incrementSender(curVectorClock);
                        this.messageBuffer.splice(index, 1);
                    }
                }
            }
            index--;
        }
    }
}

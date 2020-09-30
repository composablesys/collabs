import { CausalTimestamp,CrdtNetwork,VectorClock } from '.';
import { CrdtRuntime} from '../crdts';
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
    message : Uint8Array;
    /**
     * Unique group for identification.
     */
    group: string
    /**
     * Timestamp for casuality/concurrency check.
     *
     * Provide basic functions such as :
     * getSender() / getSenderCounter() / asVectorClock().
     */
    timestamp : VectorClock;

    constructor (message : Uint8Array, group: string, timestamp : VectorClock) {
        this.message = message;
        this.group = group;
        this.timestamp = timestamp;
    }
    /**
     * customized toJSON function to convert message as JSON format.
     * TODO: use protobufs.
     *
     * @returns package info in JSON format.
     */
    toJSON() : string {
        return JSON.stringify(
            {   "message" : this.message,
                "group" : this.group,
                "timestamp" : {
                    "uid" : this.timestamp.uid,
                    "vectorMap" : Array.from(this.timestamp.vectorMap.entries())
                }
            }
        );
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
export class WebSocketNetwork implements CrdtNetwork {
    /**
     * Unique ID for replica for identification.
     */
    uid : string;
    /**
     * Registered CrdtRuntime.
     */
    crdtRuntime!: CrdtRuntime;
    /**
     * WebSocket for connection to server.
     */
    ws : WebSocket;
    /**
     * Map stores all groups with its corresponding vector clock.
     */
    vcMap : Map<string, VectorClock>;
    /**
     * Message buffer to store received message to ensure casual delivery.
     */
    messageBuffer : Array<[Uint8Array, string, VectorClock]>;
    /**
     * Message waiting to be sent by the WebSocket
     */
    sendBuffer : Array<myMessage>;

    constructor (replicaId: string, webSocketArgs: string) {
        this.uid = replicaId;
        this.vcMap = new Map<string, VectorClock>();
        this.messageBuffer = new Array<[Uint8Array, string, VectorClock]>();
        this.sendBuffer = new Array<myMessage>();
        /**
         * Open WebSocket connection with server.
         * Register EventListener with corresponding event handler.
         */
        this.ws = new WebSocket(webSocketArgs);
        this.ws.addEventListener('open', this.sendAction);
        this.ws.addEventListener('message', this.receiveAction);
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
            this.ws.send(this.sendBuffer[index].toJSON());
            index++;
        }
        this.sendBuffer = new Array<myMessage>();

        // Use heartbeat to keep client alive.
        // this.heartbeat();
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
     * @param data the JSON format data send via network
     */
    receiveAction = (data : any) => {
        let myPackage = this.parseJSON(data.data);
        this.messageBuffer.push([myPackage.message, myPackage.group, myPackage.timestamp]);
        this.checkMessageBuffer();
    };
    /**
     * Implement the function defined in CrdtRuntime interfaces.
     *
     * @returns This replica's id, used by some CRDTs internally
     * (e.g., to generate unique identifiers of the form (replica id, counter)).
     *
     */
    getReplicaId() : string {
        return this.uid;
    }
    /**
     * Register CrdtRuntime CasualBroadcastNetwork.
     *
     * @param crdtRuntime
     */
    register(crdtRuntime: CrdtRuntime) : void {
        this.crdtRuntime = crdtRuntime;
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
     * @param timestamp The CausalTimestamp returned by the
     * last call to getNextTimestamp(group).
     */
    send(group: string, message: Uint8Array, timestamp: CausalTimestamp): void {
        let vc = timestamp as VectorClock;
        this.vcMap.set(group, vc);
        let myPackage = new myMessage(message, group, vc);

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
    getNextTimestamp(group: string) : CausalTimestamp {
        // Copy a new vector clock.
        let vc = this.vcMap.get(group);
        if (!vc) {
            vc = new VectorClock(this.uid, true);
            this.vcMap.set(group, vc);
        }
        let vcCopy = new VectorClock(this.uid, true);
        vcCopy.vectorMap = new Map<string, number>(vc.asVectorClock()!);

        // Update the timestamp of this replica with next value.
        vcCopy.increment()

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
        let vc = new VectorClock(
            dataJSON.timestamp.uid,
            this.uid === dataJSON.timestamp.uid
        );
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
                     * Send back the received messages to crdtRuntime.

                     */
                    this.crdtRuntime.receive(
                        this.messageBuffer[index][1],
                        this.messageBuffer[index][0],
                        this.messageBuffer[index][2]
                    );
                    myVectorClock.incrementSender(curVectorClock);
                    this.messageBuffer.splice(index, 1);
                }
            }
            index--;
        }
    }
}

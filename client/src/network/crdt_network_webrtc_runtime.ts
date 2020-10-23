import { CausalTimestamp,VectorClock, CausalBroadcastNetwork } from '.';
import { CrdtRuntime} from '../crdts';
import { myMessage } from './default_causal_broadcast_network';


// NOTE: This WebRTC network layer is just a prototype, which only
// two users peer-to-peer connection.
//
// The webrtc network designed for a two-way peer-to-peer interactive
// communication session among two users using WebRTC protocol.
//
// The whole infrastructure is based-on the WebSocket protocol to
// initialize the connection between WebRTC candidates.
//
// Also ensure the order of delivery with casuality check.

/**
 * WebRtcNetwork:
 *
 * Process initialization when starting a new user node.
 *
 * Communicate with CRDT's runtime and send/receive message via
 * central server with WebSocket protocol to exchange signals.
 * Then create channels for peer-to-peer communications by using
 * the WebRtc.
 *
 * Perform casuality check to ensure message ordering.
 */
export class WebRtcNetwork implements CausalBroadcastNetwork{
    /**
     * Unique ID for replica for identification.
     */
    uid : any;
    /**
     * Registered CrdtRuntime.
     */
    crdtRuntime!: CrdtRuntime;
    /**
     * WebSocket for connection to server.
     */
    ws : WebSocket;
    /**
     * WebRtc for connection to another user.
     */
    peerRtc : RTCPeerConnection;
    /**
     * Data channel for connection to another user.
     */
    dataChannel: any;
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
    sendBuffer : Array<any>;
    /**
     * Message waiting to be sent by the WebRtc
     */
    dataBuffer : Array<myMessage>;
    /**
     * User's name that current data channel connected.
     */
    userName: String;

    constructor (replicaId: any, webSocketArgs: string) {
        this.uid = replicaId;
        this.vcMap = new Map<any, VectorClock>();
        this.messageBuffer = new Array<[any, any, VectorClock]>();
        this.sendBuffer = new Array<any>();
        this.dataBuffer = new Array<any>();
        this.userName = "";
        /**
         * Open WebSocket connection with server.
         * Register EventListener with corresponding event handler.
         */
        this.ws = new WebSocket(webSocketArgs);
        this.ws.addEventListener('open', this.sendWebSocketData);
        this.ws.addEventListener('message', this.receiveAction);

         /**
         * Open WebRtc peer connection.
         * Register EventListener with corresponding event handler.
         */
        let configuration : RTCConfiguration = {
            "iceServers": [{ "urls": "stun:stun2.1.google.com:19302" }]
        };
        this.peerRtc = new RTCPeerConnection(configuration);
        this.peerRtc.addEventListener('icecandidate', this.handleIceCandidate);
        this.peerRtc.addEventListener('datachannel', this.peerRtcReceiveMessage);

    }

    joinGroup(group: string): void {
        // TODO: use this
    }
    /**
     * Send signal message in JSON format by using WebSocket
     *
     * @param message the JSON format data send via network
     */
    sendSignalingMessage(message : any) : void {
        message.webRtc = true;
        if (this.ws.readyState === 1) {
            this.ws.send(JSON.stringify(message));
        } else {
            this.sendBuffer.push(message);
        }
    }
    /**
     * Check if the send message buffer has any message waiting to be sent.
     * If there exist, then send it via WebSocket and remove the item from buffer.
     * If not, then wait a customized time period and check again.
     */
    sendWebSocketData = () => {
        let index = 0;
        while (index < this.sendBuffer.length) {
            console.log(this.sendBuffer[index]);
            this.ws.send(JSON.stringify(this.sendBuffer[index]));
            index++;
        }
        this.sendBuffer = new Array<any>();
    }
    /**
     * Parse JSON format signal message and check signal message type.
     * Jump to the corresponding signal handler for further steps to
     * build WebRtc channel.
     *
     * @param msg the JSON format data send via network.
     */
    receiveAction = (msg : any) => {
        console.log("Got message", msg.data);
        var data = JSON.parse(msg.data);

        switch(data.type) {
            case "register":
                this.handleRegister(data.success);
                break;
            case "connect":
                this.handleConnect(data.users);
                break;
            case "offer":
                this.handleOffer(data.offer, data.requestName);
                break;
            case "answer":
                this.handleAnswer(data.answer);
                break;
            case "candidate":
                this.handleCandidate(data.candidate);
                break;
            case "leave":
                this.handleLeave();
                break;
           default:
              break;
        }
    };
    /**
     * Handle register signal sent back from the central server.
     * Check if login successfully or not.
     *
     * @param successStatus A register status sent back from the server.
     */
    handleRegister(successStatus : any) : void {
        if(successStatus == false) {
            console.log("Register failed: duplicate CRDT id.");
        } else {
            console.log("Register successfully in server.")
        }
    }
    /**
     * Handle connect signal sent from the central server.
     * Create an offer and send it to the requested user.
     *
     * @param users An array of users that shared a same CRDTs.
     */
    handleConnect(users : Array<any>) : void {
        // This loop is to check the correct user to connect.
        // Design for the multiple users.
        // TODO: Complete multiple users connection built.
        let index = 0;
        while(index < users.length) {
            if(users[index] != this.uid) {
                this.userName = users[index];
                break;
            }
            index++;
        }

        // Create an offer to build WebRtc connection.
        // Set offer as the local descrition.
        this.peerRtc.createOffer().then((offer) => {
            this.sendSignalingMessage({
                type: "offer",
                name: this.userName,
                offer: offer,
                requestName: this.uid
            })
            this.peerRtc.setLocalDescription(offer);
        });
    }
    /**
     * Handle offer signal sent from the server.
     * Create an answer as a response and send the answer to the server.
     *
     * @param offer The offer received from the central server.
     * @param name The name of a user who sends this offer.
     */
    handleOffer(offer : any, name : string) : void {
        this.userName = name;
        this.peerRtc.setRemoteDescription(new RTCSessionDescription(offer));
        this.peerRtc.createAnswer().then((answer) => {
            this.sendSignalingMessage({
                type: "answer",
                name: this.userName,
                answer: answer
            })
            this.peerRtc.setLocalDescription(answer);
        });
    };
    /**
     * Handle answer signal sent from the central server.
     * Setup remote description by using the answer.
     *
     * @param answer The answer received from the central server.
     */
    handleAnswer(answer : any) : void {
        this.peerRtc.setRemoteDescription(new RTCSessionDescription(answer));
    };

    handleCandidate(candidate : any) : void {
        this.peerRtc.addIceCandidate(new RTCIceCandidate(candidate))
        .catch(e => console.error(e));
    };

    handleLeave() {
        this.peerRtc.close();
        this.peerRtc.onicecandidate = null;
    };
    /**
     * Handle icecandidate event when an RTCIceCandidate has been
     * identified and added to the local peer by a call.
     * Send signal message to the central server.
     *
     * @param event Ice candidate event that should be handled
     */
    handleIceCandidate = (event : any) => {
        if(event.candidate != null) {
            this.sendSignalingMessage({
               type: "candidate",
               candidate: event.candidate,
               name: this.userName
            });
        }
    }

    peerRtcReceiveMessage = (event : any) => {
        let receiveChannel = event.channel;
        console.log(receiveChannel);
        receiveChannel.addEventListener("message", this.dataChanelReceiveMsg);
    }

    dataChanelReceiveMsg = (event : any) => {
        console.log(event.data);
        let myPackage = this.parseJSON(event.data);
        this.messageBuffer.push([myPackage.message, myPackage.group, myPackage.timestamp]);
        this.checkMessageBuffer();
    }

    sendWebRtcData = () => {
        console.log("The data channel is open")
        let index = 0;
        while (index < this.dataBuffer.length) {
            console.log(this.dataBuffer[index]);
            this.dataChannel.send(this.dataBuffer[index].toJSON());
            index++;
        }
        this.dataBuffer = new Array<any>();
    }
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
     * Register newly created crdt with its ID and corresponding message
     * listener on CasualBroadcastNetwork.
     *
     * @param crdtMessageListener the message listener of each crdt.
     * @param crdtId the ID of each crdt.
     *
     */
    register(crdtRuntime: CrdtRuntime) : void {
        this.crdtRuntime = crdtRuntime;
        this.sendSignalingMessage( {
            type: "register",
            name: this.uid,
            crdtName: CrdtRuntime.name
        });

        console.log("Create dataChannel")
        this.dataChannel = this.peerRtc.createDataChannel("channel1");
        this.dataChannel.onerror = function (error : any) {
            console.log("Errors: ", error);
        };

        this.dataChannel.addEventListener("open", this.sendWebRtcData);

        this.dataChannel.onclose = function () {
            console.log("data channel is closed");
        };
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
    send(group: string, message: Uint8Array, timestamp: CausalTimestamp) : void{
        // Check if the crdtId exist in the map.
        let vc = timestamp as VectorClock;
        this.vcMap.set(group, vc);
        let myPackage = new myMessage(message, group, vc);

        if(this.dataChannel.readyState == "open") {
            this.dataChannel.send(myPackage.toJSON());
        } else {
            this.dataBuffer.push(myPackage);
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
        vcCopy.vectorMap = new Map<string, number>(vc.asVectorClock());

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
        let message = Uint8Array.from(dataJSON.message as number[]);
        let myPackage = new myMessage(message, dataJSON.group, vc);

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
            let group = this.messageBuffer[index][1];
            let curVectorClock = this.messageBuffer[index][2];

            let myVectorClock = this.vcMap.get(group);
            if (!myVectorClock) {
                myVectorClock = new VectorClock(this.uid, true);
                this.vcMap.set(group, myVectorClock);
            }
            if (myVectorClock.isready(curVectorClock)) {
                /**
                 * Send back the received messages from network to the
                 * registered crdtRuntime.
                 */
                this.crdtRuntime.receive(
                    this.messageBuffer[index][1],
                    this.messageBuffer[index][0],
                    this.messageBuffer[index][2]
                );
                myVectorClock.incrementSender(curVectorClock);
                this.messageBuffer.splice(index, 1);
            }
            index--;
        }
    }
}

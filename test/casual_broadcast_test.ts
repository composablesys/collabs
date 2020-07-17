import { CasualBroadcastNetwork } from '../src/casual_broadcast_network';
import { CrdtRuntime, CrdtMessageListener, CausalTimestamp } from "../src/crdt_runtime_interface";
import { VectorClock} from '../src/vector_clock';
import assert = require('assert');

function myWait(ms : number){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
}

class TestRunTime implements CrdtRuntime {
    constructor() { }
    send(message: any, crdtId: any): void {;}
    register(crdtMessageListener: CrdtMessageListener, crdtId: any): void {;}
    getReplicaId(): any {return null};
    getNextTimestamp(): CausalTimestamp {
        return {
            getSender() { return null; },
            getSenderCounter() { return 0;},
            asVectorClock() { return new Map<any, number>(); }}
    };
}

console.log('Test Starting.. ')
let crdt_1 = new TestRunTime();
let crdt_2 = new TestRunTime();
let crdt_3 = new TestRunTime();
let casual_broadcast_network_1 = new CasualBroadcastNetwork(1, crdt_1);
let casual_broadcast_network_2 = new CasualBroadcastNetwork(2, crdt_2);
let casual_broadcast_network_3 = new CasualBroadcastNetwork(3, crdt_3);

console.log('Test Case 1 Start')
casual_broadcast_network_1.vcMap.set("counter_ID", new VectorClock(1));
casual_broadcast_network_2.vcMap.set("counter_ID", new VectorClock(2));
casual_broadcast_network_3.vcMap.set("counter_ID", new VectorClock(3));
let vc1 = casual_broadcast_network_1.vcMap;
let vc2 = casual_broadcast_network_2.vcMap;
let vc3 = casual_broadcast_network_3.vcMap;

assert.equal(vc1.get("counter_ID")?.asVectorClock().get(1), 0);
assert.equal(vc2.get("counter_ID")?.asVectorClock().get(2), 0);
assert.equal(vc3.get("counter_ID")?.asVectorClock().get(3), 0);

casual_broadcast_network_2.sendMessage("Hi layer 2!", "counter_ID");
// myWait(10000);
casual_broadcast_network_1.sendMessage("hello layer 1", "counter_ID");
// myWait(2000);
casual_broadcast_network_3.sendMessage("hello all", "counter_ID");
// myWait(2000);
casual_broadcast_network_2.sendMessage("Welcome layer 3!", "counter_ID");
// myWait(2000);


// assert.equal(vc1.get("counter_ID")?.asVectorClock().get(1), 1);
// assert.equal(vc1.get("counter_ID")?.asVectorClock().get(2), 1);
// assert.equal(vc1.get("counter_ID")?.asVectorClock().get(3), 1);
// assert.equal(vc2.get("counter_ID")?.asVectorClock().get(1), 1);
// assert.equal(vc2.get("counter_ID")?.asVectorClock().get(2), 1);
// assert.equal(vc2.get("counter_ID")?.asVectorClock().get(3), 1);
// assert.equal(vc3.get("counter_ID")?.asVectorClock().get(1), 1);
// assert.equal(vc3.get("counter_ID")?.asVectorClock().get(2), 1);
// assert.equal(vc3.get("counter_ID")?.asVectorClock().get(3), 1);
console.log('OK..! Test Case 1 pass')


 
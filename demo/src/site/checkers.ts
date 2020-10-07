import {CheckersCrdt} from "./checkers_crdt";
import { network } from 'compoventuals-client';
import { v4 as uuid } from 'uuid';

let HOST = location.origin.replace(/^http/, 'ws')

const client_uuid : string = uuid();

console.log('Set Host & Unique Identifier')

/**
 * Generate CRDTs' Runtime on each client and create CRDTs (e.g. CounterCrdt).
 */
let client = new network.CrdtNetworkRuntime(client_uuid, HOST);
console.log('Generate CRDT Runtime')

let game = new CheckersCrdt("checkersID", client);
console.log('Created and Starting Checkers Game')

game.startGame();


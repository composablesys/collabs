import {CheckersCrdt} from "./checkers_crdt";
import { network } from 'compoventuals-client';
import { v4 as uuid } from 'uuid';

let HOST = location.origin.replace(/^http/, 'ws')

const client_uuid : string = uuid();

/**
 * Generate CRDTs' Runtime on each client and create CRDTs (e.g. CounterCrdt).
 */
let client = new network.CrdtNetworkRuntime(client_uuid, HOST);

let game = new CheckersCrdt("checkersID", client);

game.startGame();


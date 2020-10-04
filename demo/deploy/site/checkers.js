"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkers_crdt_1 = require("./checkers_crdt");
const compoventuals_client_1 = require("compoventuals-client");
const uuid_1 = require("uuid");
let HOST = location.origin.replace(/^http/, 'ws');
const client_uuid = uuid_1.v4();
/**
 * Generate CRDTs' Runtime on each client and create CRDTs (e.g. CounterCrdt).
 */
let client = new compoventuals_client_1.network.CrdtNetworkRuntime(client_uuid, HOST);
let game = new checkers_crdt_1.CheckersCrdt("checkersID", client);
game.startGame();
//# sourceMappingURL=checkers.js.map
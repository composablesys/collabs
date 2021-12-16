import { BatchingStrategy } from "../../constructions/batching_strategy";
import { App } from "../../core";
import { BroadcastNetwork } from "./broadcast_network";
import { CRDTRuntime } from "./crdt_runtime";

export class CRDTApp extends App {
  constructor(
    network: BroadcastNetwork,
    options?: {
      batchingStrategy?: BatchingStrategy;
      casualOrderGuaranteed: boolean;
      debugReplicaId?: string;
    }
  ) {
    super(new CRDTRuntime(network, options));
  }
}

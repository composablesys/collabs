import { Crdt, CrdtEventsRecord, Pre } from "./crdt";
import { DefaultRuntime } from "./default-runtime";
import { BatchingStrategy } from "./default-runtime/batching_strategy";
import { CausalBroadcastNetwork } from "./default-runtime/causal_broadcast_network";
import { EventEmitter } from "./event_emitter";
import { Runtime } from "./runtime";

/**
 * The entrypoint for a Collabs app.
 *
 * TODO: sample code. Workflow: new, register, await load
 * (call with null if new), start, then use Crdts.
 *
 * Internally, an App is a thin wrapper around its [[Runtime]],
 * exposing only the user-facing methods and events.
 */
export class App extends EventEmitter<CrdtEventsRecord> {
  static createDefault(
    network: CausalBroadcastNetwork,
    options?: { batchingStrategy?: BatchingStrategy; debugReplicaId?: string }
  ): App {
    return new App(new DefaultRuntime(network, options));
  }

  constructor(readonly runtime: Runtime) {
    super();
    this.runtime.on("Change", (e) => this.emit("Change", e));
  }

  registerCrdt<C extends Crdt>(name: string, preCrdt: Pre<C>): C {
    return this.runtime.registerCrdt(name, preCrdt);
  }

  // TODO: flush? Or make part of saving?
  // (Right before signing out, want to force-send any
  // queued messages in a batch.)

  // TODO: need to block interaction during this?
  // (Runtime queue received messages; need to block user input)
  save(): Uint8Array {
    return this.runtime.save();
  }

  load(saveData: Uint8Array | null): void {
    this.runtime.load(saveData);
  }

  // TODO: on change/message/receive; other events?
  // How to do "Change" event in case messages get caught
  // deep inside and never reach the Runtime
  // (e.g. batching, nested containers), without violating
  // transactions?

  // TODO: user-led transactions? Consider Yjs, Automerge APIs.
}

import { Crdt } from "./crdt";
import { Runtime } from "./runtime";

/**
 * The entrypoint for a Collabs app.
 *
 * TODO: sample code. Workflow: new, register, await load
 * (call with null if new), then use Crdts.
 *
 * Internally, an App is a thin wrapper around its [[Runtime]],
 * exposing only the user-facing methods.
 */
export class App {
  static fromNetwork(network: CausalBroadcastNetwork): App {
    return new App(new DefaultRuntime(network));
  }

  constructor(readonly runtime: Runtime) {}

  registerCrdt<C extends Crdt>(name: string, preCrdt: Pre<C>): C {
    return this.runtime.registerCrdt(name, preCrdt);
  }

  load(saveData: Uint8Array | null): Promise<void> {
    return this.runtime.load(saveData);
  }

  save(): Promise<Uint8Array> {
    return this.runtime.save();
  }

  // TODO: on change/message/receive; other events?
  // How to do "Change" event in case messages get caught
  // deep inside and never reach the Runtime
  // (e.g. batching, nested containers), without violating
  // transactions?

  // TODO: user-led transactions? Consider Yjs, Automerge APIs.
}

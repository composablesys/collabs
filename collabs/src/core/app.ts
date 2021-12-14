import { Collab, CollabEvent, Pre } from "./collab";
import { EventEmitter } from "./event_emitter";
import { Runtime } from "./runtime";

interface AppEventsRecord {
  /**
   * Emitted each time the app's state is changed and
   * is in a reasonable user-facing state
   * (so not in the middle of a transaction).
   *
   * A simple way to keep a GUI in sync with the app is to
   * do `app.on("Change", refreshDisplay)`.
   */
  Change: CollabEvent;
}

/**
 * The entrypoint for a Collabs app.
 *
 * TODO: sample code. Workflow: new, register, await load
 * (call with null if new), start, then use Collabs.
 *
 * Internally, an App is a thin wrapper around its [[Runtime]],
 * exposing only the user-facing methods and events.
 *
 * TODO: see [concrete instance]
 */
export class App extends EventEmitter<AppEventsRecord> {
  constructor(readonly runtime: Runtime) {
    super();
    this.runtime.on("Change", (e) => this.emit("Change", e));
  }

  registerCollab<C extends Collab>(name: string, preCollab: Pre<C>): C {
    return this.runtime.registerCollab(name, preCollab);
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

  // TODO: user-led transactions? Consider Yjs, Automerge APIs.
}

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
 * See [../../getting_started_guide.md] for a sample application
 * using the [[CRDTApp]] subclass, which illustrates the general
 * usage pattern.
 *
 * Internally, an App is a thin wrapper around its [[Runtime]],
 * exposing only the user-facing methods and events.
 *
 * For a concrete instance designed for used with Collabs's
 * built-in library of Conflict-free Replicated Data
 * Types, see [[CRDTApp]].
 */
export class App<
  R extends Runtime = Runtime
> extends EventEmitter<AppEventsRecord> {
  constructor(readonly runtime: R) {
    super();
    this.runtime.on("Change", (e) => this.emit("Change", e));
  }

  registerCollab<C extends Collab>(name: string, preCollab: Pre<C>): C {
    return this.runtime.registerCollab(name, preCollab);
  }

  save(): Uint8Array {
    return this.runtime.save();
  }

  load(saveData: Uint8Array | null): void {
    this.runtime.load(saveData);
  }
}

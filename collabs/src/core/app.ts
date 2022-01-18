import { Optional } from "../util";
import { Collab, CollabEvent, Pre } from "./collab";
import { EventEmitter } from "./event_emitter";
import { LoadEvent, Runtime } from "./runtime";

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
  /**
   * Emitted at the end of [[Runtime.load]].
   *
   * TODO: mention a good time to construct views (ref docs).
   */
  Load: LoadEvent;
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

  /**
   * [save description]
   *
   * Note: this may take other actions needed for saving
   * to make sense, e.g., sending queued messages
   * (as is done in [[CRDTApp]]).
   *
   * @return [description]
   */
  save(): Uint8Array {
    return this.runtime.save();
  }

  load(saveData: Optional<Uint8Array>): void {
    this.runtime.load(saveData);

    this.emit("Load", {
      skipped: !saveData.isPresent,
    });
  }
}

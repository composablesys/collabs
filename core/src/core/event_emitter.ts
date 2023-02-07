export interface EventsRecord {
  // Need "any" here instead of "unknown" or else TypeScript
  // complains about a missing index signature when you
  // implement the interface.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [eventName: string]: any;
}

// Not exported to reduce conceptual size.
type Handler<T, C> = (event: T, caller: C) => void;

/**
 * Classes extending EventEmitter can emit events, and listeners can await
 * events from EventEmitters.
 *
 * @typeParam Events - type of the interface mapping event names to event types.
 *
 * @remarks
 * Inspired by {@link https://github.com/ai/nanoevents | nanoevents}, but
 * refactored as a class to better fit into our class hierarchy.
 */
export class EventEmitter<Events extends EventsRecord> {
  /**
   * Maps event names to registered handlers.
   *
   * Properly, `any` should instead be `this`.  However,
   * that causes errors when trying to treat a Collab
   * subclass as an instance of Collab, for reasons
   * that are not clear to me.
   */
  private readonly handlers: Partial<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [K in keyof Events]: Set<Handler<Events[K], any>>;
  }> = {};

  /**
   * Registers an event handler that is triggered when the event happens.
   *
   * @param eventName Name of the event to listen to
   * @param handler Callback that handles the event
   * @return An "off" function that removes the event handler when called
   */
  on<K extends keyof Events>(
    eventName: K,
    handler: (event: Events[K], caller: this) => void
  ): () => void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const set: Set<Handler<Events[K], any>> = (this.handlers[eventName] =
      this.handlers[eventName] ?? new Set([handler]));
    set.add(handler);
    return () => set.delete(handler);
  }

  /**
   * Registers an event handler that is triggered *only once*, the next
   * time the event happens, then unsubscribed.
   *
   * @param eventName Name of the event to listen to
   * @param handler Callback that handles the event
   * @return An "off" function that removes the event handler when called.
   * Use this to remove the handler before the next event (which removes
   * it automatically).
   */
  once<K extends keyof Events>(
    eventName: K,
    handler: (event: Events[K], caller: this) => void
  ): () => void {
    const unsubscribe = this.on(eventName, (event, caller) => {
      unsubscribe();
      handler(event, caller);
    });
    return unsubscribe;
  }

  /**
   * Emits an event, which triggers all the registered event handlers.
   *
   * @param eventName Name of the event
   * @param event Event object to pass to the event handlers
   */
  protected emit<K extends keyof Events>(eventName: K, event: Events[K]): void {
    for (const handler of this.handlers[eventName] ?? []) {
      try {
        handler(event, this);
      } catch (err) {
        // TODO: what to do about this? Console log is annoying, but need
        // to not blackhole the error. Perhaps add an onError handler that can
        // get the error?
        console.error("Error in Collabs event handler:\n", err);
      }
    }
  }
}

export interface EventsRecord {
  // Need "any" here instead of "unknown" or else TypeScript
  // complains about a missing index signature when you
  // implement the interface.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [eventName: string]: any;
}

export type Unsubscribe = () => void;
export type Handler<T, C> = (event: T, caller: C) => void;

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
   */
  on<K extends keyof Events>(
    eventName: K,
    handler: Handler<Events[K], this>
  ): Unsubscribe {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const set: Set<Handler<Events[K], any>> = (this.handlers[eventName] =
      this.handlers[eventName] ?? new Set([handler]));
    set.add(handler);
    return () => set.delete(handler);
  }

  /**
   * Returns a promise that will be resolved exactly once, next time the event
   * is emitted. If the event never happens, the promise is neither resolved nor
   * rejected.
   *
   * @param eventName Name of the event to listen to
   */
  nextEvent<K extends keyof Events>(eventName: K): Promise<Events[K]> {
    return new Promise((resolve) => {
      const unsubscribe = this.on(eventName, (event) => {
        unsubscribe();
        resolve(event);
      });
    });
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
        // Don't let the error block other event handlers
        // or affect the emitter, but still make it print
        // its error like it was unhandled.
        setTimeout(() => {
          throw err;
        });
      }
    }
  }
}

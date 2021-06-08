export interface EventsRecord {
  [eventName: string]: any;
}

type Unsubscribe = () => void;
type Handler<T, C> = (event: T, caller: C) => void;

/**
 * Classes extending EventEmitter can emit events, and listeners can await
 * events from EventEmitters.
 *
 * @typeParam Events - type of the interface mapping event names to event types.
 *
 * @remarks
 * Inspired by {@link https://github.com/ai/nanoevents | nanoevents}, but
 * refactored as an abstract class to better fit into our class hierarchy.
 */
export abstract class EventEmitter<Events extends EventsRecord> {
  /**
   * Maps event names to registered handlers.
   */
  private readonly handlers: Partial<
    { [K in keyof Events]: Set<Handler<Events[K], this>> }
  > = {};

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
    const set: Set<Handler<Events[K], this>> = (this.handlers[eventName] =
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
      handler(event, this);
    }
  }
}

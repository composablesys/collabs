export interface EventsRecord {
  [eventName: string]: any;
}

type Unsubscribe = () => void;
type Handler<T> = (event: T) => void;

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
  private readonly handlersSync: Partial<
    { [K in keyof Events]: Set<Handler<Events[K]>> }
  > = {};
  private readonly handlersAsync: Partial<
    { [K in keyof Events]: Set<Handler<Events[K]>> }
  > = {};

  /**
   * Registers an event handler that is triggered when the event happens.
   *
   * @param eventName Name of the event to listen to
   * @param handler Callback that handles the event
   * @param synchronous Whether emit will call the handler
   * synchronously (within the body of emit) or
   * asynchronously (in a future event loop iteration).
   * Typically, applications using a Crdt should set this
   * to false, while Crdt's listening on other Crdt's as
   * part of an operation, or to dispatch their own events,
   * should set this to true.
   */
  on<K extends keyof Events>(
    eventName: K,
    handler: Handler<Events[K]>,
    synchronous: boolean = false
  ): Unsubscribe {
    let handlers = synchronous ? this.handlersSync : this.handlersAsync;
    const set: Set<Handler<Events[K]>> = (handlers[eventName] =
      handlers[eventName] ?? new Set([handler]));
    set.add(handler);
    return () => set.delete(handler);
  }

  /**
   * Returns a promise that will be resolved exactly once, next time the event
   * is emitted. If the event never happens, the promise is neither resolved nor
   * rejected.
   *
   * @param eventName Name of the event to listen to
   * @param synchronous Whether emit will call the handler
   * synchronously (within the body of emit) or
   * asynchronously (in a future event loop iteration).
   */
  nextEvent<K extends keyof Events>(
    eventName: K,
    synchronous: boolean = false
  ): Promise<Events[K]> {
    return new Promise((resolve) => {
      const unsubscribe = this.on(
        eventName,
        (event) => {
          unsubscribe();
          resolve(event);
        },
        synchronous
      );
    });
  }

  /**
   * Emits an event, which triggers all the registered event handlers.
   *
   * @param eventName Name of the event
   * @param event Event object to pass to the event handlers
   */
  protected emit<K extends keyof Events>(eventName: K, event: Events[K]): void {
    for (const handler of this.handlersSync[eventName] ?? []) {
      try {
        handler(event);
      } catch (e) {
        console.log("Error in event handler: ");
        console.log(e);
      }
    }
    for (const handler of this.handlersAsync[eventName] ?? []) {
      setTimeout(() => handler(event), 0);
    }
  }
}

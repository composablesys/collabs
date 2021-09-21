# Events

Collaborative data types use _events_ to notify you when they change, due to either a local or remote operation. Typically, you will act on these events by updating the view (UI).

## Quick Start

In any app, you can listen on [`Runtime`](./typedoc/classes/Runtime.html)'s "Change" event, then refresh the whole view each time it is emitted.

```ts
runtime.on("Change", () => {
  // Refresh the whole view using the current collaborative state.
  // ...
});
```

This works because a `Runtime` "Change" event is dispatched whenever the local user performs an operation or a message is received from another user. Of course, it might be inefficient or interact poorly with the UI.

## API

See [`EventEmitter`](./typedoc/classes/EventEmitter.html). `Crdt` (hence all collaborative data types) and `Runtime` have `EventEmitter` as a superclass, hence they have the following methods:

- `on` adds an event listener. Calling `on`'s return value removes the listener.
- `nextEvent` returns a Promise that is resolved when the next event is emitted.
- `emit` (protected) emits an event. Call this from within a custom collaborative type to emit your own events.

Each class's allowed events are typed using the `Events` type parameter. This has the form of an interface mapping `string` event names to their event type:

```ts
interface MyEventsRecord {
  Event1Name: Event1Type;
  Event2Name: Event2Type;
  // ...
}
```

When calling the `EventEmitter` methods, TypeScript will force you to use a valid event name, and it will then infer the corresponding event type. In particular, your IDE should show you the proper event type in the method signature once you type the event name.

## Using Collaborative Data Type Events

All events emitted by collaborative data types (`Crdt` subclasses) extend [`CrdtEvent`](./typedoc/interfaces/CrdtEvent.html). This means that they have a `meta` field of type [`CrdtEventMeta`](./typedoc/interfaces/CrdtEventMeta.html). When listening on events, you can use `meta.isLocal` to filter out events from the local user.

Also, all collaborative data types have a "Change" event of type `CrdtEvent`, from [`CrdtEventsRecord`](./typedoc/interfaces/CrdtEventsRecord). This event is emitted after any other event by default. Thus if you just want to know when a collaborative type is changed, but you don't care about the specific change (e.g., because you are planning to just refresh your whole view of the type), then you can listen on "Change" events instead of listening on every event specifically.

When listening on a collaborative type's events, you should register event listeners as soon as possible - usually in the same thread as the type is constructed. For example, to listen on child events in a `CObject`, you should register listeners in the constructor. This ensures that you don't miss any events.

When listening on events from a collaborative type that is created dynamically in a collection (e.g., `DeletingMutCSet`), you should register event listeners within the `valueConstructor` callback. So typically this callback will create the new value, register event listeners, then return the value. You should not wait until the collection's "Add", "Insert", "Set", etc. event to register listeners. This is because some collections destroy and recreate their values independently of any operations; when a value is recreated in this way, `valueConstructor` will be called, but no event will be emitted, and so you would miss registering event listeners.

## Adding Events to Custom Types

If you are publishing a custom type as a third-party library, we recommend that it emits its own events. These let your consumers observe changes while maintaining encapsulation. See the template's `CPair` for an example.

See [`CrdtEventsRecord`](./typedoc/interfaces/CrdtEventsRecord) for guidelines on what events to include. Note that each of our interfaces (`CSet`, etc.) has a corresponding events records that you must extend if you are implementing that interface; you should then emit those events.

> **Aside:** For custom types that you only plan to use in your own application, you may not need to emit events. It can be easier to just listen on events dispatched by internal collaborative types, or to just listen on `Runtime`'s "Change" event.

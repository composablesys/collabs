# Events

`Collab`s use _events_ to notify you when they change, due to either a local or remote operation. Typically, you will act on these events by updating the view (UI).

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

See [`EventEmitter`](./typedoc/classes/EventEmitter.html). `Collab` (hence all collaborative data structures) and `Runtime` have `EventEmitter` as a superclass/superinterface, hence they have the following methods:

- `on` adds an event listener. Calling `on`'s return value removes the listener.
- `nextEvent` returns a Promise that is resolved when the next event is emitted.
- `emit` (protected) emits an event. Call this from within a custom `Collab` to emit your own events.

Each class's allowed events are typed using the `Events` type parameter. This has the form of an interface mapping `string` event names to their event type:

```ts
interface MyEventsRecord {
  Event1Name: Event1Type;
  Event2Name: Event2Type;
  // ...
}
```

When calling the `EventEmitter` methods, TypeScript will force you to use a valid event name, and it will then infer the corresponding event type. In particular, your IDE should show you the proper event type in the method signature once you type the event name.

## Using `Collab` Events

All events emitted by `Collab`s extend [`CollabEvent`](./typedoc/interfaces/CollabEvent.html). This means that they have a `meta` field of type [`MessageMeta`](./typedoc/interfaces/MessageMeta.html). When listening on events, you can use `meta.isLocalEcho` to filter out events from the local user.

Also, all `Collab`s have a "Change" event of type `CollabEvent`, from [`CollabEventsRecord`](./typedoc/interfaces/CollabEventsRecord). This event is emitted after any other event. Thus if you just want to know when a `Collab` is changed, but you don't care about the specific change (e.g., because you are planning to just refresh your whole view of the structure), then you can listen on "Change" events instead of listening on every event specifically.

When listening on a `Collab`'s events, you should register event listeners as soon as possible - usually in the same thread as the structure is constructed. For example, to listen on child events in a `CObject`, you should register listeners in the constructor. This ensures that you don't miss any events.

When listening on events from a `Collab` that is created dynamically in a collection (e.g., `ResettingMutCSet`), you should register event listeners within the `valueConstructor` callback. So typically this callback will create the new value, register event listeners, then return the value. You should not wait until the collection's "Add", "Insert", "Set", etc. event to register listeners. This is because some collections destroy and recreate their values independently of any operations; when a value is recreated in this way, `valueConstructor` will be called, but no event will be emitted, and so you would miss registering event listeners.

TODO: not dipatched during loading. If you normally

- depend on events to set some state (e.g., a GUI view),
- you must instead construct that state from reading the whole state after loading

## Adding Events to Custom Types

If you are publishing a custom type as a third-party library, we recommend that it emits its own events. These let your consumers observe changes while maintaining encapsulation. See the template's `CPair` for an example.

TODO: General advice (merge with below paragraph):

- - Only emit events when your state is usable. If one of
- your operations is made up of several sub-operations, and
- the intermediate states are nonsensical, don't emit events
- then, since the listeners might try to inspect the state
- during their event handlers.
- - Events should be sufficient to maintain a view of
- the state. But, it is recommended to omit info
- that the user can get from the Collab during the event
- listener (e.g., in CMap, events provide key but not value,
- since the listener can get the value themselves.)
- - Give the previous value, if it cannot be determined
- otherwise (e.g. from the remaining state). That is useful
- for some views that only account for part of the state,
- e.g., the size of a CMap.
- - Don't dispatch events redundantly if there is no way
- to tell whether they are redundant. E.g., in CSet, only
- dispatch Add if the value went from (not present) to (present);
- don't dispatch it if the value was already present.
- That is useful
- for some views that only track part of the state,
- e.g., the size of a CSet.
- - If you making a non-reusable component for an app and
- don't want to bother adding individual events, you can just
- emit "Change" events when your state changes (e.g., on
- your children's "Change" events). Or, you can skip events
- entirely and either refresh the whole display on Runtime
- "Change" events, or refresh your Collab-specific display on
- its children's "Change" events.

See [`CollabEventsRecord`](./typedoc/interfaces/CollabEventsRecord) for guidelines on what events to include. Note that each of our interfaces (`CSet`, etc.) has a corresponding events records that you must extend if you are implementing that interface; you should then emit those events.

> **Aside:** For custom types that you only plan to use in your own application, you may not need to emit events. It can be easier to just listen on events dispatched by internal `Collab`s, or to just listen on `Runtime`'s "Change" event.

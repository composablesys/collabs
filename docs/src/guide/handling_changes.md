# Handling Changes

When remote users change a collaborative data structure's state, you need to know about that change, so that you can refresh your display. The easiest way to do this is to handle your [entry point](./entry_points.html)'s `Change` event, which works for both [CRuntime](../api/collabs/classes/CRuntime.html) and [CContainer](../api/container/classes/CContainer.html):

```ts
function refreshDisplay() {
  // Refresh the display (and other views of the collaborative state)
  // so that it reflects the current state of your collaborative data structures
  // ...
}

runtime.on("Change", refreshDisplay);
```

For example, in the [Quick Start](../quick_start.html), we did:

```ts
// Refresh the display when the Collabs state changes, possibly
// due to a message from another replica.
const display = document.getElementById("display")!;
function refreshDisplay() {
  display.innerHTML = counter.value.toString();
}
container.on("Change", refreshDisplay);
```

As described in the API docs ([CRuntime Change event docs](../api/collabs/interfaces/RuntimeEventsRecord.html#Change), [CContainer change event docs](../api/container/interfaces/CContainerEventsRecord.html#Change)), a `Change` event is emitted each time your app performs a local operation, receives a message from a remote collaborator, or loads a saved state. Thus using the above pattern ensures that your display is always a functional view of your collaborative state.

> You can find the API docs for events like these by going to the event emitter's `on` method (e.g. [CRuntime.on](../api/collabs/classes/CRuntime.html#on)), clicking on `eventName`'s key type (e.g. [RuntimeEventsRecord](../api/collabs/interfaces/RuntimeEventsRecord.html)), then viewing the property with the event's name. That property's type tells you the type of the event `e` passed to your event handler (ignored in our example).

## Fine-Grained Changes: Events

Sometimes you want to know not just that _something_ changed, but _what specifically_ changed. For example, you might want to know which `Collab` changed so you can efficiently refresh only its part of the GUI, or you might want to know what characters were typed in [CText](../api/collabs/classes/CText.html) and where. [Events](../advanced/events.html), covered in [Advanced Topics](../advanced/), make this possible.

## Next Steps

We've finished describing the three [wrinkles](./introduction.html#using-collabs) from the introduction. You now know enough to start using Collabs for real - congrats!

The [Walkthrough of Quick Start](../walkthrough.html) puts everything together. After that, the Guide continues with some pages that are not necessary but often useful.

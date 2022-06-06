# Handling Changes

When remote users change a collaborative data structure's state, you need to know about that change, so that you can refresh your display. The easiest way to do this is to handle your [entry point](./entry_points.html)'s `Change` event, which works for both [CRDTApp](../api/collabs/classes/CRDTApp.html) and [CRDTContainer](../api/container/classes/CRDTContainer.html):

```ts
function refreshDisplay() {
  // Refresh the display (and other views of the collaborative state)
  // so that it reflects the current state of your collaborative data structures
  // ...
}

app.on("Change", refreshDisplay);
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

As described in the API docs ([CRDTApp Change event docs](../api/collabs/interfaces/CRDTAppEventsRecord.html#Change), [CRDTContainer change event docs](../api/container/interfaces/CRDTContainerEventsRecord.html#Change)), a `Change` event is emitted each time your app receives a message, whether from a remote collaborator or from the local user's own operations. Thus using the above pattern ensures that your display is always a functional view of your collaborative state.

> You can find the API docs for events like these by going to the event emitter's `on` method (e.g. [CRDTApp.on](../api/collabs/classes/CRDTApp.html#on)), clicking on `eventName`'s key type (e.g. [CRDTAppEventsRecord](../api/collabs/interfaces/CRDTAppEventsRecord.html)), then viewing the property with the event's name. That property's type tells you the type of the event `e` passed to your event handler (ignored in our example).

## Handling Loading

A special kind of change happens while setting up your app: you (optionally) load a previous session's saved state from disk (or wherever). This was the call to [CRDTApp.load](../api/collabs/classes/CRDTApp.html#load) or [CRDTContainer.load](../api/container/classes/CRDTContainer#load) in our [Entry Points](./entry_points.html) boilerplate.

Loading saved state changes each `Collab` from its initial states to whatever its state was in the last session, so you need to update your display to reflect the new loaded state. An easy way to do this is to call the same `refreshDisplay()` function that you used as the `Change` handler, right after calling [CRDTApp.load](../api/collabs/classes/CRDTApp.html#load) or [CRDTContainer.load](../api/container/classes/CRDTContainer#load).

> Although loading changes the state, a `Change` event is not emitted. In general, events are only emitted in response to **messages** caused by `Collab` operations (mutating method calls), whether remote or local.

## Fine-Grained Changes: Events

Sometimes you want to know not just that _something_ changed, but _what specifically_ changed. For example, you might want to know which `Collab` changed so you can efficiently refresh only its part of the GUI, or you might want to know what characters were typed in [CText](../api/collabs/classes/CText.html) and where. [Events](../advanced/events.html), covered in the [Advanced Guide](../advanced/), make this possible.

## Next Steps

We've finished describing the three [wrinkles](./introduction.html#using-collabs) from the introduction. You now know enough to start using Collabs for real - congrats!

The [Walkthrough of Quick Start](./walkthrough.html) puts everything together. After that, the Guide continues with some pages that are not necessary but often useful.

# Getting Started: App

Work in progress. For now, check out the starter code in [WebSocket app starter template](https://github.com/composablesys/collabs/tree/master/template-app), especially `my_app.ts` and its comments.

Basically, it's similar to Getting Started: Container, except you use `collabs.CRDTApp` instead of `CRDTContainer`, and you have to handle networking, saving, and loading yourself.

`CRDTApp` methods/events that you'll need to use (in addition to `registerCollab`, which is the same as for `CRDTContainer`):

- A "Send" event is emitted each time the app wants to send a message. This message needs to be delivered eventually at-least-once to every other collaborator, by giving it to their `CRDTApp`s' `receive` methods.
- `receive`: Receives a message from a collaborator, applying it to the local app.
- `save`: Returns a snapshot of the current state. This can be passed to `load` on a future instance of the app. It has the same effect as receiving all messages received before `save` was called, so that the future instance doesn't need to receive those messages again, but does need to receive all other messages.
- `load`: Loads a snapshot from a previous instance's `save` method. This can only be called on a new instance, which registered Collabs but not been used (either user operations or calling `receive`). If you have no previous snapshot, you must still call `load` before using the app, but with `Optional.empty()` as its argument.

Other things to keep in mind when writing an app:

- Persist locally sent messages until they are sent on the network, so that if they don't get sent properly before the user closes the app, you can retry later.
- Persist locally sent/received messages that are not accounted for in the most recent save data (`save` output), so that you can reload the app from its most recent state the next time it starts up, even if the user is offline then. Specifically, you will want to deliver these messages to the app (`receive`) after setting it up and calling `load`, before letting the user interact with it.
- Occasionally call `save` and persist its save data locally. The returned save data will be smaller and load faster than the complete message history.
- More occasionally, call `save` and put its save data somewhere that new users can access. That way, they can initialize starting from that save data, instead of needing to `receive` every message ever sent.

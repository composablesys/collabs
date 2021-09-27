# Error Handling

[Custom collaborative types](TODO: custom types) or [custom serializers](TODO: serialization) might have bugs that produce errors or inconsistencies at runtime. These bugs can potentially corrupt the collaborative state forever, so they are best avoided.

Coming soon: how the library handles errors, and advice for recovering from a bug. (First thing to try: refresh the app, so that its state is reloaded from past messages.)

<!-- TODO

On sender: user may need to refresh the page, in case you did something with the op locally that wasn't caused by a message (user processes the mesage like anyone else). Bad op won't do anything to anyone, except for partial state ops?

On receiver: WIP. But if it errors during receipt on the sender, it won't get sent.

Versioning?

If one of your collaborative types tries to apply the wrong `ElementSerializer` to a type, it may deserialize to an unexpected value. However, the value will still be consistent on all replicas (including the sender): the user who performs an operation applies it locally by processing the message, just like all other users, and so they will end up with the same deserialized value.

In case of inconsistency: refresh the page, hope that it's not ordering related or that the order will EC eventually.  Need to avoid saving?  Try not to get into this situation (might not be recoverable). -->

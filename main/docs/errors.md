TODO

On sender: user may need to refresh the page, in case you did something with the op locally that wasn't caused by a message (user processes the mesage like anyone else). Bad op won't do anything to anyone, except for partial state ops?

On receiver: WIP. But if it errors during receipt on the sender, it won't get sent.

Versioning?

If one of your collaborative types tries to apply the wrong `ElementSerializer` to a type, it may deserialize to an unexpected value. However, the value will still be consistent on all replicas (including the sender): the user who performs an operation applies it locally by processing the message, just like all other users, and so they will end up with the same deserialized value.

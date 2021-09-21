Advanced: writing your own.

Usually just need CObject (see data modeling - but go over events here only). CPrimitive: op-based Crdt (refer to precise model somewhere). SemidirectProduct and variants: coming soon.

template-custom-type (use as CObject example).

Note for writing: you can have CPrimitive, SemidirectProduct just as part of your app's data model, not as a lib. So you don't always need events (but for CPrimitive, it is a good idea to at least dispatch one event per change, so that you get a Change event).

TODO: others available (CPrimitive, Semidirect, direct Crdt subclass), but not needed for most apps, unless you start micro-tuning the conflict resolution. Link to pages for doing that.

# Initialization

Coming soon

<!-- TODO: initialization rules: same on all replicas, don't depend on time or anything like that; init children in same thread as parent (register globals in same thread as Runtime creation), since else you might get messages that you don't know how to process; don't do ops on initialization. These rules are necessary to support arbitrary types (each user has to tell library what to do with messages, since the library doesn't know).

Pre Collabs, Pre type, valueConstructor (different). What you give to registerCollab / addChild. Mostly don't have to think about it, just use Pre() instead of `new`. Generic types, if needed, go after the Pre() closing paren. Serves to prevent accidentally making detached Collabs, which would do nothing and error on sending. -->

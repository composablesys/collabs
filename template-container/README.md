## Licensing

Containers are meant to be easily redistributable. Therefore they should have a permissive license TODO? Also nice to release the source code so people can tweak if they like - makes for easily distributed open-source collab apps.

TODO: testing advice (ws host - public or launch your own; Matrix - upload to host or launch your own local https server). Including concurrency testing - need an easy way to disconnect and reconnect with multiple users. Perhaps just include a dev server in /bin that auto-hosts your app (as few clicks as possible), with buttons to help test concurrency, and https option to test in matrix? Plus also refresh button (refresh message history, load new app)? Shouldn't matter if you have to restart the server command.

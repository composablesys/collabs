TODO: move all advice in here that is not specific to containers to the guide page (?). At least keep install instructions, scripts, container-specific config.

TODO: test both output files (once we add server)

TODO: how to test saving?

npm run build-prod: build for production (smaller output file, but no source maps and takes longer). Configured in package.json; you can also use a file (see https://webpack.js.org/guides/production/)

How to test with Matrix using test server (/addwidget https://localhost:3000/dist/my_container.html)

Also link to public sites where you can test it by uploading? (Matrix container host, ??) Or just call that deployment.

Make sure to replace my_container with your file names in webpack.config.ts, package.json start command

## Licensing

Containers are meant to be easily redistributable. Therefore they should have a permissive license TODO? Also nice to release the source code so people can tweak if they like - makes for easily distributed open-source collab apps.

TODO: testing advice (ws host - public or launch your own; Matrix - upload to host or launch your own local https server). Including concurrency testing - need an easy way to disconnect and reconnect with multiple users. Perhaps just include a dev server in /bin that auto-hosts your app (as few clicks as possible), with buttons to help test concurrency, and https option to test in matrix? Plus also refresh button (refresh message history, load new app)? Shouldn't matter if you have to restart the server command.

See guide: if you decided not to inline any resources (e.g. a lot of images, for size/load time reasons), you can host them on a static site and refer to them by absolute URL
(use output.publicPath for this in prod mode). You can't depend on relative URLs because the container might be loaded from a different domain (e.g., a blob: URL). Need to setup the static site's CORS headers so this is allowed (Access-Control-Allow-Origin: "\*"). Regardless, should inline as much as possible so that it can mostly work offline.

Also need to allow CORS on main page if you want people to be able to get it by URL within a host. TODO: does github pages do this?

TODO: test source maps (local + imported)

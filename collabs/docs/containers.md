# Containers

Coming soon

<!-- TODO: novel container hosts (copy container-testing-server code with your own network, saving); also see matrix-container-host once that exists

## Deployment

TODO: deployment (which files and what to do with them). For containers, choose between single file (inline everything with Webpack) vs static site deployment (set publicPath; allow CORS for main file, so hosts can get it with AJAX; understand implications of the first file being downloaded vs rest loaded on-demand - offline support, CORS, sandboxing; github pages is a free option, check if it has right CORS).

TODO: make sure CORS okay, for hosts that get by URL. Else your users will have to download and re-upload. Or they can point the host at it directly?

When making your own project, depending on how you configure Webpack, you might end up with output files besides just the HTML file (e.g., non-inlined images). You'll need to distribute those files as well. TODO: how; also webpack config for inline vs not.

Link to Webpack docs.

Misc TODOs:

single vs multi-file; hosts; uploading

if you decided not to inline any resources (e.g. a lot of images, for size/load time reasons - see the one horse dist for an example), you can host them on a static site and refer to them by absolute URL
(use output.publicPath for this in prod mode) (TODO: do this for horse). You can't depend on relative URLs because the container might be loaded from a different domain (e.g., a blob: URL). Need to setup the static site's CORS headers so this is allowed (Access-Control-Allow-Origin: "\*"). Regardless, should inline as much as possible so that it can mostly work offline.

Also need to allow CORS on main page if you want people to be able to get it by URL within a host. TODO: does github pages do this?

mention need to bundle all scripts (e.g. JQuery) like Webpack says, if you want it to work offline.  Also: links should target "_parent" or "_blank", since the container will be loaded inside an iframe.

-->

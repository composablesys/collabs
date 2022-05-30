# `@collabs/container-testing-server`

Part of the Collabs library. Main package: [@collabs/collabs](https://www.npmjs.com/package/@collabs/collabs).

**@collabs/container** provides the `container-testing-server` npm command, which runs a simple server for testing [Collabs containers](https://collabs.readthedocs.io/en/latest/guide/containers.html).

## Docs

See [https://collabs.readthedocs.io/](https://collabs.readthedocs.io/)

## Usage

`container-testing-server [OPTION] CONTAINER`

where CONTAINER is a container file (or URL, if --url is set). Then navigate to the printed link ([http://localhost:3000](http://localhost:3000) by default).

The home page (index.html) runs the container, using the server to connect clients over WebSockets.

To test collaboration, open the link in multiple windows/tabs at once. You can simulate concurrency (multiple user making changes at the same time) by unchecking one window's "Connected" checkbox, making some changes in that window and another one, then re-checking the box. Doing so temporarily isolates the disconnected window, then reconnects it, delivering all messages queued during disconnection (sent + receivd). Unless something has gone wrong, all windows will end up in the same state. Ideally, that state will also be a reasonable merge of the concurrent changes.

You can also test that saving and loading doesn't corrupt the state. Click "Save to sessionStorage" to save the current state in the browser, then "Reload from sessionStorage" to load that state followed by replaying any further messages. Unless you write your own Collabs with custom load/save functions, you should only need to worry about bugs due to improperly displaying the loaded state.

> Note about saving & reloading: If you "Save to sessionStorage" while there are unsent messages (because "Send Connected" is unchecked), then "Reload from sessionStorage" without ever rechecking "Send Connected", then those messages will be accounted for in the loaded state but never sent to the server. So other windows' states will diverge from the reloaded one: they don't have a message that you do have. Furthermore, they will refuse to process future messages from the offending window, due to the missing prior messages.
> Takeaway: if you do this and see diverging states, don't worry, it is not a bug in your app; it is just a missing feature of container-testing-server. A proper container host will ensure this doesn't happen, by persisting not-yet-sent messages whenever it saves the state, then resending on reload.

### Options

- -s, --https run in https mode, using a fake (not secret, self-signed) certificate
- -u, --url interpret CONTAINER as an absolute URL instead of a file path
- -h, --help display help for command

The port can be configured with the PORT environment variable. It defaults to 3000.

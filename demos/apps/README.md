# Collabs Demo Server

Demo server for [Collabs](https://collabs.readthedocs.io/). Source of [compoventuals-tests.herokuapp.com/](compoventuals-tests.herokuapp.com/).

## Usage

Install: `npm i`.

Build: `npm run build`, or `npm run dev` for dev mode (faster compilation, larger bundles).

Run: `npm start`, then open the printed link in a web browser. The linked demos use that server to collaborate, but you can also follow the instructions to run in Matrix widgets. (To load Matrix widgets from a localhost server, you'll need to start it in HTTPS mode: `npm start -- -- --https`. Note that other clients will only be able to load the widget if they can connect to the server at the same address---if it's a localhost address, all clients need to be on the same machine). See [server/README.md](server/README.md) for more options.

## Development

There appears to be an issue with the nested workspaces and installing dependencies correctly: running `npm i` in the top-level folder will not install dependencies listed in the individual demos only. As a workaround, when using the monorepo as a single workspace, individual demos' dependencies must be duplicated in this folder's `package.json`.

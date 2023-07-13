# Collabs Demo Server

Demo server for [Collabs](https://collabs.readthedocs.io/). Source of [collabs-demos.herokuapp.com/](collabs-demos.herokuapp.com/).

## Usage

All commands below should be run in **the monorepo's top-level folder** (two levels up).

Install: `npm i`.

Build: `npm run buildDemoServer` (`npm run build` also works but takes longer).

Run: `npm start`, then open the printed link in a web browser. The linked demos use that server to collaborate, but you can also follow the instructions to run in Matrix widgets. (To load Matrix widgets from a localhost server, you'll need to start it in HTTPS mode: `npm start -- -- --https`. Note that other clients will only be able to load the widget if they can connect to the server at the same address---if it's a localhost address, all clients need to be on the same machine). See [server/README.md](server/README.md) for more options.

### Individual apps

You can install, build, and start individual apps using commands in their individual folders: `npm i`, `npm run build` (or `npm run dev` for Webpack development mode), `npm start`.

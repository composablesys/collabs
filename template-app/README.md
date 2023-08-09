# Collabs App Starter Template

Template for a generic Collabs app, using [@collabs/ws-client](https://www.npmjs.com/package/@collabs/ws-client) and [@collabs/ws-server](https://www.npmjs.com/package/@collabs/ws-server) to connect users over a WebSocket server.

[Walkthrough of this template](https://collabs.readthedocs.io/en/latest/quick_start.html)

[Collabs Docs](https://collabs.readthedocs.io/en/latest/)

## Installation

First, install [Node.js](https://nodejs.org/). Then run `npm i`.

## Commands

### `npm start`

Runs both servers for testing for the app:

- `webpack-dev-server` on [http://localhost:3000/](http://localhost:3000/), to serve static files.
- `collabs-ws-server` on [http://localhost:3001/](http://localhost:3001/), to connect users over a WebSocket server.

Open [http://localhost:3000/](http://localhost:3000/) to try it out. Use multiple browser windows at once to test collaboration.

You can run the servers separately with `npm run start:webpack` and `npm run start:ws-server`.

### `npm run dev`

Build the app from `src/`, in [development mode](https://webpack.js.org/guides/development/).

> `webpack-dev-server` will build for you, so you do not need to do this until you start serving files yourself.

### `npm run build`

Build the app from `src/`, in [production mode](https://webpack.js.org/guides/production/).

> `webpack-dev-server` will build for you, so you do not need to do this until you start serving files yourself.

### `npm run clean`

Delete `dist/`.

## Starter Files

- Code:
  - `src/index.html`: The app's HTML.
  - `src/main.ts`: The app's TypeScript code.
- Configuration:
  - `package.json`: npm install file.
  - `tsconfig.json`: TypeScript configuration for the app.
  - `webpack.config.ts`: Wepback configuration.
  - `tsconfig.webpack-config.json`: TypeScript configuration that lets us write `webpack.config.ts` in TypeScript instead of JavaScript.

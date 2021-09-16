# Compoventuals template-container

Template for a Compoventuals container. Containers are network agnostic and can be run in any [host](TODO: link to list of hosts).

Guide: TODO

See also [template-app](TODO).

## Installation

First, install [Node.js](https://nodejs.org/). Then run `npm i`.

## Commands

### `npm run dev`

Build the container from `src/`, in [development mode](https://webpack.js.org/guides/development/).

### `npm run build`

Build the container from `src/`, in [production mode](https://webpack.js.org/guides/production/) (smaller output files; longer build time; no source maps).

### `npm start`

Run the testing server. Open [http://localhost:3000/](http://localhost:3000/) to view your container. Use multiple browser windows at once to test collaboration.

See [container-testing-server](TODO) for usage info.

### `npm run clean`

Delete `dist/`.

## Starter Files

- `src/`: Client-side app source files. If you rename the files in here, also rename their uses in `webpack.config.ts` and `package.json`.
- `webpack.config.ts`: Webpack config for the client-side app.
- `tsconfig.json`: TypeScript config for the client-side app.

## Deployment

See the [Guide](TODO) for deployment options.

## Licensing

Coming soon: how to add license info and credits to your output file.

Note that if you build your container as a single file with no external dependencies (recommended), then users can easily redistribute your container. Hence a permissive license is recommended.

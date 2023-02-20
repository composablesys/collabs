# Collabs Container Starter Template

Template for a [Collabs container](https://collabs.readthedocs.io/en/latest/guide/containers.html), using the [CContainer](https://collabs.readthedocs.io/en/latest/api/container/classes/CContainer.html) [entry point](https://collabs.readthedocs.io/en/latest/guide/entry_points.html).

[Quick Start using this template](https://collabs.readthedocs.io/en/latest/quick_start.html)

[Collabs Docs](https://collabs.readthedocs.io/en/latest/)

[@collabs/collabs API](https://collabs.readthedocs.io/en/latest/api/collabs/index.html)

[@collabs/container API](https://collabs.readthedocs.io/en/latest/api/container/index.html)

See also: [template-app](https://github.com/composablesys/collabs/tree/master/template-app), which is for a generic Collabs app using [CRuntime](https://collabs.readthedocs.io/en/latest/api/collabs/classes/CRuntime.html).

## Installation

First, install [Node.js](https://nodejs.org/). Then run `npm i`.

## Commands

### `npm run dev`

Build the container from `src/`, in [development mode](https://webpack.js.org/guides/development/).

### `npm run build`

Build the container from `src/`, in [production mode](https://webpack.js.org/guides/production/) (smaller output files; longer build time; source maps have line numbers only).

### `npm start`

Run the testing server. Open [http://localhost:3000/](http://localhost:3000/) to view your container. Use multiple browser windows at once to test collaboration.

See [container-testing-server](https://www.npmjs.com/package/@collabs/container-testing-server) for usage info.

### `npm run clean`

Delete `dist/`.

## Development

Start by filling in the `TODO`s in `src/index.html`, `src/app.ts`, and `webpack.config.ts`.

If you add assets, you may need to add rules in `webpack.config.ts` to bundle and inline them. In particular, see the commented out rules, which inline some common asset types.

## Deployment

See [Deployment](https://collabs.readthedocs.io/en/latest/guide/containers.html#deployment) for deployment options. Your container's built HTML file is placed in `dist/` when you run `npm run dev` or `npm run build`.

## Template Setup

This template sets up a fairly standard [npm](https://docs.npmjs.com/cli/) + [TypeScript](https://www.typescriptlang.org/) + [Webpack](https://webpack.js.org/) browser app. The HTML entrypoint is `src/index.html` and the TypeScript entrypoint is `src/app.ts`.

The only unusual part is that Webpack is configured to output a single HTML file (`dist/MY_CONTAINER.html`) with all assets inlined, including the compiled and bundled JavaScript code, TypeScript source maps, and other assets (once you uncomment the relevant rules in `webpack.config.ts`). See the comments in `webpack.config.ts` to understand how this is done, and see [Containers](https://collabs.readthedocs.io/en/latest/guide/containers.html) for the rationale behind this setup. If you don't want to inline assets, you can change the settings in `webpack.config.ts` and the `--devtool inline-nosources-source-map` option in `package.json`'s `build` script.

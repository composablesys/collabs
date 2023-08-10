# Collabs Demo Apps

Demo apps for [Collabs](https://collabs.readthedocs.io/). Source of [https://collabs-demos.herokuapp.com/](https://collabs-demos.herokuapp.com/).

## Usage

All commands below should be run in **the monorepo's top-level folder** (two levels up).

Install: `npm i`.

Build: `npm run buildDemoServer` (`npm run build` also works but takes longer).

Run: `npm start`, then open the printed link in a web browser. See [server/README.md](server/README.md) for options.

The demos use a central server to collaborate. For easier testing, we omit cross-tab sync and IndexedDB storage; see our [app template](https://github.com/composablesys/collabs/tree/master/template-app) for code that incorporates those.

### Individual apps

You can install, build, and start individual apps using commands in their individual folders: `npm i`, `npm run build` (or `npm run dev` for Webpack development mode), `npm start`.

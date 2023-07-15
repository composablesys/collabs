# Collabs

**Collabs** is a collections library for **collaborative data structures**. These are data structures that look like `Set`, `Map`, `Array`, etc., except they are synchronized between multiple users: when one user changes a collaborative data structure, their changes show up for every other user. You can use them to quickly build collaborative apps along the lines of Google Docs/Sheets/Slides, shared whiteboards, etc.

## Docs

See [https://collabs.readthedocs.io/](https://collabs.readthedocs.io/)

- [API](https://collabs.readthedocs.io/en/latest/api/)
- [Published packages](https://collabs.readthedocs.io/en/latest/packages.html)

## Source Code

This monorepo has a folder for each [published package](https://collabs.readthedocs.io/en/latest/packages.html) plus related code. In particular:

- [collabs](https://github.com/composablesys/collabs/tree/master/collabs) is the source for the main package, [@collabs/collabs](https://www.npmjs.com/package/@collabs/collabs). However, the actual code lives in the [core](https://github.com/composablesys/collabs/tree/master/core) and [crdts](https://github.com/composablesys/collabs/tree/master/crdts) folders, which are the sources of [@collabs/core](https://www.npmjs.com/package/@collabs/core) and [@collabs/crdts](https://www.npmjs.com/package/@collabs/crdts), respectively; @collabs/collabs merely re-exports those two packages.
- [demos/apps](https://github.com/composablesys/collabs/tree/master/demos/apps) is the source of our [demo site](https://collabs-demos.herokuapp.com/).
- [docs](https://github.com/composablesys/collabs/tree/master/docs) is the source of our [documentation site](https://collabs.readthedocs.io/).

### Developing

Run `npm i` (or `npm ci`, to use pinned package versions) in this folder. That will install all packages in this repo as an [npm workspace](https://docs.npmjs.com/cli/v7/using-npm/workspaces), symlinked so that updates to one package are automatically made available to other packages (once they are built).

To run commands in the `docs/` folder, also install its Python dependencies: `pip install -r docs/requirements.txt`.

When installing dependencies, instead of running `npm i <dependency>` in the relevant package's folder, you should run `npm i <dependency> -w <package>` in this top-level folder. That will ensure that the dependency is installed in the workspace's top-level `node_modules` folder, but it is recorded in the correct package's `package.json`. See [https://docs.npmjs.com/cli/v7/using-npm/workspaces#adding-dependencies-to-a-workspace](https://docs.npmjs.com/cli/v7/using-npm/workspaces#adding-dependencies-to-a-workspace).

If you are only making changes to one package, you can skip running `npm i` in this directory and instead do it only in the directory for the package you are working on.

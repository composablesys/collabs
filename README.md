# Collabs Monorepo

You're probably looking for [@collabs/collabs](https://github.com/composablesys/collabs/tree/master/collabs#readme).

## Packages in this repo

See folders in this directory.

## Developing

Run `npm i` (or `npm ci`, to use pinned package versions) in this folder. That will install all packages in this repo as an [npm workspace](https://docs.npmjs.com/cli/v7/using-npm/workspaces), symlinked so that updates to one package are automatically made available to other packages (once they are built).

When installing dependencies, instead of running `npm i <dependency>` in the relevant package's folder, you should run `npm i <dependency> -w <package>` in this top-level folder. That will ensure that the dependency is installed in the workspace's top-level `node_modules` folder, but it is recorded in the correct package's `package.json`. See [https://docs.npmjs.com/cli/v7/using-npm/workspaces#adding-dependencies-to-a-workspace](https://docs.npmjs.com/cli/v7/using-npm/workspaces#adding-dependencies-to-a-workspace).

If you wish to develop using the published package versions instead of those in this repo, you can skip running `npm i` in this directory and instead do it only in the directory for the package you are working on.

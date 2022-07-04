# Collabs Documentation

```{toctree}
---
titlesonly:
hidden:
maxdepth: 2
---
quick_start
walkthrough
guide/index
advanced/index
further_info/index
packages
api/index
```

**Collabs** is a collections library for **collaborative data structures**. These are data structures that look like `Set`, `Map`, `Array`, etc., except they are synchronized between multiple users: when one user changes a collaborative data structure, their changes show up for every other user. You can use them to quickly build collaborative apps along the lines of Google Docs/Sheets/Slides, shared whiteboards, etc.

- [@collabs/collabs npm package](https://www.npmjs.com/package/@collabs/collabs) (see also [All Packages](./packages.html))
- [Quick Start](./quick_start.html)
- [Docs](./guide/)
- [API](./api/)
- [Github](https://github.com/composablesys/collabs)

## Install

Using [npm](https://docs.npmjs.com/cli/v8/commands/npm): `npm i --save @collabs/collabs`

Collabs is written in TypeScript and should work in any JavaScript environment (browser, NodeJS, etc.).

## Demos

[Live demos](https://compoventuals-tests.herokuapp.com/) of collaborative apps built on top of Collabs. [Source code](https://github.com/composablesys/collabs/tree/master/demos)

## Principles

- [**Local-first:**](https://www.inkandswitch.com/local-first/) Each user always keeps a full copy of the state on their own device and sees their own changes immediately, even when offline. They can then sync up with other users in the background. All users see the same state once they sync up, even if they made simultaneous changes (e.g., two users typing at once).
- **Network-agnostic:** Collabs generates messages that you must eventually broadcast to all users, but how is completely up to you and your users: your own server, WebRTC, encrypted [Matrix](matrix.org) room, etc. <!-- TODO: page with options for both app and container -->
- **Flexible and extensible:** At its core, Collabs is a library _for_ collaborative data structures, not just a library _of_ them (although we provide plenty of those too). So if our built-in data structures don't meet your needs, you can create your own or get them from third-party libraries. <!-- TODO: create your own: link to advanced guide page -->
- **Composable**: In particular, we provide techniques to create new types by composing existing ones. Correctness properties compose too! <!-- TODO: composing existing ones: link to advanced guide page on composition techniques -->
- **Keep your data model and type safety:** A core feature of Collabs is that you can organize your collaborative state using [reusable, strongly-typed classes](./guide/data_modeling.html). In particular, you can make a single-user app collaborative while preserving its data model and type safety, by directly replacing its frontend data types with collaborative versions.

## Algorithms

Under the hood, our built-in collaborative data structures use operation-based [Conflict-free Replicated Data Types (CRDTs)](https://crdt.tech/). This is how we ensure that all users eventually see the same state, even if they made simultaneous changes or messages were arbitrarily delayed.

<!-- TODO: link to page with details of specific data structures' algorithms. -->

We also publish a core subset of Collabs, [@collabs/core](https://www.npmjs.com/package/@collabs/core) ([API](./api/core/)), that can be used as a framework more general collaborative data structures, not just op-based CRDTs. This core package provides superclasses, APIs, and composition techniques to help you implement arbitrary message-based collaborative data structures, such as [Operational Transformation](https://en.wikipedia.org/wiki/Operational_transformation) algorithms or data structures that rely on a central server to order operations.

## Community

[Discuss over Matrix](https://matrix.to/#/#collabs-library:matrix.org)

## Authors

Collabs was created by Matthew Weidner, Heather Miller, Huairui Qi, Maxime Kjaer, Ria Pradeep, Ignacio Maronna, Benito Geordie, and Yicheng Zhang at Carnegie Mellon University's Composable Systems Lab.

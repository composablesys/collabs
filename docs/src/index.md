# Collabs Documentation

```{toctree}
---
titlesonly:
hidden:
maxdepth: 2
---
quick_start
guide/index
advanced/index
further_info/index
packages
api/index
```

**Collabs** is a library for **collaborative data structures** (CRDTs). These are data structures that look like `Set`, `Map`, `Array`, etc., except that they are synchronized between multiple users: when one user changes a collaborative data structure, their changes show up for every other user. You can use them to build collaborative apps along the lines of Google Docs/Sheets/Slides, shared whiteboards, etc.

- [Quick Start](./quick_start.html)
- [Guide](./guide/)
- [API](./api/)
- [Github](https://github.com/composablesys/collabs)

## Install

`npm i --save @collabs/collabs`

Collabs is written in TypeScript and should work in any JavaScript environment (browser, Node.js, etc.).

Consider using our [app template](https://github.com/composablesys/collabs-template-app).

## Demos

- [Live demos](https://collabs-demos.herokuapp.com/) of collaborative apps built using Collabs ([source code](https://github.com/composablesys/collabs/tree/master/demos/apps)).
- [fileshare-recipe-editor](https://github.com/mweidner037/fileshare-recipe-editor/), a collaborative recipe editor that syncs through Dropbox.

## How it Works

Collabs implements hybrid op-based/state-based [Conflict-free Replicated Data Types (CRDTs)](https://crdt.tech/). These ensure that collaborators converge to a consistent state once they apply the same updates, regardless of order. We also try hard to converge to a "reasonable" result when users make concurrent changes.

Our [built-in CRDTs](./guide/built_in_collabs.html) implement modern [algorithms](./further_info/algorithms.html) including [Peritext](./api/collabs/classes/CRichText.html), [Fugue](./api/collabs/classes/CTotalOrder.html), and a [list with a move operation](./api/collabs/classes/CList.html).

You can learn more in our [paper preprint](https://arxiv.org/abs/2212.02618). The paper also has benchmark results showing that a Collabs rich-text editor can scale to over 100 simultaneous users, and its memory usage and load/save times are comparable to Yjs.

## Principles

See our talk at [LFW.dev](https://localfirstweb.dev/) meetup #5: [Video](https://www.youtube.com/watch?v=Z0nzsxhoToo&t=2346s), [Slides](https://docs.google.com/presentation/d/13I3L76R-wwiXxgTXI2ide3zlbjiWoTWXMSU9YbQdYXU/edit?usp=sharing), [Live demo](https://collabs-demos.herokuapp.com/recipe-editor/).

- **[Local-first](https://www.inkandswitch.com/local-first/) ready:** Collabs lets users work offline and sync up with collaborators later. We use CRDTs to merge changes even with arbitrary latency and concurrency.
- **Network- and storage-agnostic:** Collabs generates updates that you must eventually deliver to all collaborators, but you are free to deliver and store these updates however you like. We also publish [providers](./guide/providers.html) that handle this for you.
- **Keep your data model and type safety:** A key feature of Collabs is that you can organize your collaborative state using [encapsulated, strongly-typed classes](./guide/data_modeling.html).
- **Flexible and extensible:** Collabs is a library _for_ collaborative data structures, not just a menu of built-in options (but [we provide those too](./guide/built_in_collabs.html)). So if our data structures don't meet your needs, you can [create your own](https://github.com/composablesys/collabs-template-crdt) and even publish them as 3rd-party libraries: new semantics, faster algorithms, CRDT paper implementations...

## Community

[Discuss over Matrix](https://matrix.to/#/#collabs-library:matrix.org)

## Authors

Collabs was created by Matthew Weidner, Heather Miller, Huairui Qi, Maxime Kjaer, Ria Pradeep, Ignacio Maronna, Benito Geordie, and Yicheng Zhang at Carnegie Mellon University's Composable Systems Lab.

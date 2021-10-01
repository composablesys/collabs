# Collabs

**A collections library for collaborative data structures**

[https://www.npmjs.com/package/@collabs/collabs](https://www.npmjs.com/package/@collabs/collabs)

Collabs is a library for building and using _collaborative data structures_. These are data structures that look like `Set`, `Map`, `Array`, etc., except they are synchronized between multiple users: when one user changes a collaborative data structure, their changes show up for every other user. You can use them to quickly build collaborative apps along the lines of Google Docs/Sheets/Slides, shared whiteboards, etc.

## Quick Start

[Live demos](https://compoventuals-tests.herokuapp.com/) ([source](https://github.com/composablesys/collabs/tree/master/demos))

[Getting Started Guide](./docs/getting_started_guide.md)

## Principles

- **Local-first:** Users see their own changes immediately, even when offline, and sync up with other users in the background. All users see the same state once they sync up, even if they made simultaneous changes (e.g., two users typing at once).
- **Network-agnostic:** `collabs` generates messages that you must eventually broadcast to all users, but how is completely up to you and your users: your own server, WebRTC, encrypted [Matrix](matrix.org) room, etc.
<!-- TODO: link to zero-hosting deployment options (use someone else's); links to docs on each option. Networks page with all options? -->
- **Flexible and extensible:** At its core, `collabs` is a library _for_ collaborative data structures, not just a library _of_ them (although we provide plenty of those too). So if our data types don't meet your needs, you can create your own or get them from third-party libraries.
- **Composable**: In particular, we provide techniques to create new types by composing existing ones. Correctness properties compose too!
- **Keep your data model and type safety:** A core feature of Compoventuals is that you can organize your collaborative state using reusable, strongly-typed classes. In particular, you can make a single-user app collaborative while preserving its data model and type safety, by directly replacing its frontend data types with collaborative versions.

## Docs

[Docs](./docs/index.md)

[API](./docs/typedoc)

## Authors and Acknowledgements

Compoventuals was created by Matthew Weidner, Heather Miller, Huairui Qi, Maxime Kjaer, Ria Pradeep, Ignacio Maronna, and Benito Geordie at Carnegie Mellon University's Composable Systems Lab.

Matthew Weidner's work on the project is supported by an NDSEG Fellowship sponsored by the US Office of Naval Research.

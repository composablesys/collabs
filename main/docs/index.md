# Compoventuals

**A collections library for collaborative data types**

Compoventuals is a library for building and using _collaborative data types_. These are data types that look like `Set`, `Map`, `Array`, etc., except they are synchronized between multiple users: when one user changes a collaborative type, their changes show up for every other user. You can use them to quickly build collaborative apps along the lines of Google Docs/Sheets/Slides, shared whiteboards, etc.

## Quick Start

[Live demos with source code](TODO)

[Getting Started Guide](./getting_started_guide.md)

## Principles

- **Conflict-free:** All users see the same state once they sync up, even if they made simultaneous changes (e.g., two users typing at once). Users see their own changes immediately, even when offline.
- **Network-agnostic:** Compoventuals generates messages that you must eventually broadcast to all users, but how is completely up to you and your users: your own server, WebRTC, encrypted [Matrix](matrix.org) room, etc. TODO: link to zero-hosting deployment options (use someone else's); links to docs on each option.
- **Keep your data model and type safety:** A unique feature of Compoventuals is that you can organize your collaborative state using reusable, strongly-typed classes. In particular, you can make a single-user app collaborative while preserving its data model and type safety, by directly replacing its frontend data types with collaborative versions. TODO: example link (e.g. spreadsheet, talk)?
- **Flexible and extensible:** At its core, Compoventuals is a library _for_ collaborative data types, not just a library _of_ types (although we provide plenty of those too). So if our data types don't meet your needs, you can create your own or get them from third-party libraries.

## API

[Typedoc](./typedoc)

acknowledge funding, CMU, all authors
multiple semantics (some included, rest you can write your own), with common interfaces to ease switching.
Own types: We provide composition techniques and common interfaces to make this easier.

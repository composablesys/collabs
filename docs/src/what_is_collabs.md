# What is Collabs?

Collabs is a library for building and using _collaborative data structures_ (`Collab`s, for short). These are data structures that look like `Set`, `Map`, `Array`, etc., except they are synchronized between multiple users: when one user changes a collaborative data structure, their changes show up for every other user. You can use them to quickly build collaborative apps along the lines of Google Docs/Sheets/Slides, shared whiteboards, etc.

## Principles

- **Local-first:** Each user always keeps a full copy of the state on their own device and sees their own changes immediately, even when offline. They can then sync up with other users in the background. All users see the same state once they sync up, even if they made simultaneous changes (e.g., two users typing at once).
- **Network-agnostic:** Collabs generates messages that you must eventually broadcast to all users, but how is completely up to you and your users: your own server, WebRTC, encrypted [Matrix](matrix.org) room, etc.
- **Flexible and extensible:** At its core, Collabs is a library _for_ collaborative data structures, not just a library _of_ them (although we provide plenty of those too). So if our data types don't meet your needs, you can create your own or get them from third-party libraries.
- **Composable**: In particular, we provide techniques to create new types by composing existing ones. Correctness properties compose too!
- **Keep your data model and type safety:** A core feature of Collabs is that you can organize your collaborative state using reusable, strongly-typed classes. In particular, you can make a single-user app collaborative while preserving its data model and type safety, by directly replacing its frontend data types with collaborative versions.

## Using Collabs

You use Collabs similar to a normal data structures library: create `Collab`s containing the collaborative state of your application, then implement the GUI as a view of that state and implement user inputs as operations on that state. Also, you can of course combine Collabs with other web libraries and services. However, to make sure they are connected to the network, you cannot create `Collab`s directly; you first have to construct an _entry point_, connect that to the network, and then ask the entry point to create `Collab`s for you. We offer two entry points:

- [**CRDTContainer**](./guide/containers.html) (package [@collabs/container](TODO)): Instead of providing networking (and storage) yourself, you can let a separate _Collabs container host_ do that for you. `CRDTContainer` connects to this container host automatically, assuming that your app is deployed by the host. This simplifies deployment and also lets users choose their preferred network, but it is hard to integrate into an existing website. The [Quick Start](./quick_start.html) and its [Walkthrough](./guide/walkthrough.html) show a simple example. <!-- TODO: link to docs/container lib -->
- [**CRDTApp**](./advanced/getting_started_app.html): You can use Collabs anywhere by constructing a `CRDTApp` and connecting it to a network and storage yourself. [Getting Started - App](./advanced/getting_started_app.html) gives an example. <!-- TODO: link to CRDTApp docs -->

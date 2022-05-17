# Custom Collaborative Data Structures

A core feature of Collabs is that you can extend the library with your own collaborative data structures (`Collab` subclasses). This includes both creating [data models](../guide/data_modeling.html) as compositions of existing data structures, as well as implementing completely new data structures from scratch (e.g., an algorithm from a [CRDT](https://crdt.tech/) paper). Thus you are not stuck with only the types/operations/semantics that we provide.

See [template-custom-type](https://github.com/composablesys/collabs/tree/master/template-custom-type) for a template that you can use to get started. The template comes with a simple custom type `CPair` as an example (in `src/custom_type.ts`).

## Superclasses

We recommend using one of the following superclasses for your custom type. However, if none of them are suitable, you can use [`Collab`](../api/collabs/classes/Collab.html) directly as your superclass. (All collaborative data structures must ultimately be subclasses of `Collab`).

See the API docs for a class (linked in the headers below) for instructions on how to subclass them.

If your custom type is implementing one of the interfaces `CBoolean`, `CList`, `CMap`, `CSet`, you probably want to extend the corresponding abstract helper class instead of the classes listed here. E.g., to implement a `CList` that would otherwise extend `CObject`, instead extend [`AbstractCListCObject`](../api/collabs/modules.html#AbstractCListCObject).

<!-- TODO: examples here, or in class docs? -->

### [`CObject`](../api/collabs/classes/CObject.html)

For classes whose instance variables are themselves collaborative data structures (`Collab` subclasses). This is the most common and easiest to use superclass, and suffices for many [Data Models](./data_modeling.md).

### [`PrimitiveCRDT`](../api/collabs/classes/PrimitiveCRDT.html)

For implementing an [operation-based CRDT](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type#Operation-based_CRDTs) directly, using raw message passing.

### [`CPrimitive`](../api/collabs/classes/CPrimitive.html)

For implementing a general collaborative data structure (not necessarily a CRDT) directly, using raw message passing.

### [`SemidirectProduct`](../api/collabs/classes/SemidirectProduct.html)

For combining non-commuting operations in the same type, adding operations to an existing type, or tweaking the semantics of existing operations in the face of concurrency. `SemidirectProduct` offers a similar amount of flexibility as `PrimitiveCRDT`, but supports composition / reusing existing types and operations. Specifically, it implements the [semidirect product of op-based CRDTs](https://doi.org/10.1145/3408976).

> **Caution:** As of 9/2021, the library's semidirect product support is under construction, so the API is subject to change. There are also a few variants ([`SemidirectProduct`](../api/collabs/classes/SemidirectProduct.html), [`SemidirectProductRev`](../api/collabs/classes/SemidirectProductRev.html), and [`MultipleSemidirectProduct`](../api/collabs/classes/MultipleSemidirectProduct.html)). The final version(s) will probably look most like the current `SemidirectProductRev`.

<!-- TODO: Collab -->

## Adding Events

See [Adding Events to Custom Types](./events.md).

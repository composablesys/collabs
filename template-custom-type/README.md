# Collabs Custom Type Template

**Template for a library exporting a custom Collabs collaborative type.**

This template demonstrates how to define a custom Collabs collaborative type and export it for reuse (e.g., as an npm package). It requires nothing fancy: you write the type, then export it. See [src/custom_type.ts](./src/custom_type.ts).

[test/custom_type.test.ts](./test/custom_type.test.ts) shows how to test your type using [`TestingRuntimes`](https://collabs.readthedocs.io/en/latest/api/collabs/classes/TestingRuntimes.html).

The rest of this template is a (bare-bones) TypeScript library setup. For a real project, you'll probably want to use something more substantial like [typescript-starter](https://github.com/bitjson/typescript-starter).

## Custom messages

Many types can be built out of existing Collabs types using `CObject`. However, sometimes you need the power of raw message passing, e.g., when writing a `CPrimitive`.

Collabs expects `Uint8Array | string` for these messages. Some suggested ways to encoded and decode:

- Use JSON to encode plain JS objects as strings.
- Use [BSON](https://www.npmjs.com/package/bson) (binary JSON) to encode plain JS objects as `Uint8Array`s.
- Use provided [`Serializer`](https://collabs.readthedocs.io/en/latest/api/core/interfaces/Serializer.html) instances - in particular, [`DefaultSerializer`](https://collabs.readthedocs.io/en/latest/api/collabs/classes/DefaultSerializer.html), which can serialize many non-circular types, including [`CollabID`](https://collabs.readthedocs.io/en/latest/api/collabs/modules.html#CollabID).
- Use [protobuf.js](https://github.com/protobufjs/protobuf.js) with [its Typescript support](https://github.com/protobufjs/protobuf.js#usage-with-typescript). This is what Collabs does. See the @collabs/collabs package for an example of how to set this up; it's a bit tricky to get the ESM build working and make it tree-shakable, due to bugs in the library's ESM output (as of 09/2021).

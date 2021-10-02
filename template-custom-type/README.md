# Collabs template-custom-type

**Template for a library exporting a custom Collabs collaborative type.**

This template demonstrates how to define a custom Collabs collaborative type and export it for reuse (e.g., as an npm package). It requires nothing fancy: you write the type, then export it. See [src/custom_type.ts](./src/custom_type.ts).

[test/custom_type.test.ts](./test/custom_type.test.ts) shows how to test your type using `TestingNetworkGenerator`.

The rest of this template is a (bare-bones) TypeScript library setup. For a real project, you'll probably want to use something more substantial like [typescript-starter](https://github.com/bitjson/typescript-starter).

## Custom messages

Many types can be built out of existing Collabs types using `CObject`. However, sometimes you need the power of raw message passing, e.g., when writing a `CPrimitive`.

Collabs expects `Uint8Array`s for these messages. Some suggested ways to encoded and decode these `Uint8Array`s:

- Use [protobuf.js](https://github.com/protobufjs/protobuf.js) with [its Typescript support](https://github.com/protobufjs/protobuf.js#usage-with-typescript). This is what Collabs does. See the @collabs/collabs package for an example of how to set this up; it's a bit tricky to get the ESM build working and make it tree-shakable, due to bugs in the library's ESM output (as of 09/2021).
- Use [BSON](https://www.npmjs.com/package/bson) (binary JSON) to encode plain JS objects as `Uint8Array`s.
- Use `Buffer.from` and `Buffer.toString` from [buffer](https://www.npmjs.com/package/buffer) to convert strings to `Uint8Array`s.

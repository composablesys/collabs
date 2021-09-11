# compoventuals/template-custom-type

**Template for a library exporting a custom Compoventuals collaborative type.**

This template demonstrates how to define a custom Compoventuals collaborative type and export it for reuse (e.g., as an npm package). It requires nothing fancy: you write the type, then export it. See [src/custom_type.ts](./src/custom_type.ts).

Really we are just trying to advertise that yes, you can implement and share your own collaborative types - you're not stuck with only the ones we implemented! This is a unique feature of Compoventuals.

[test/custom_type.test.ts](./test/custom_type.test.ts) shows how to test your type using `TestingNetworkGenerator`.

The rest of this template is a (bare-bones) TypeScript library setup. For a real project, you'll probably want to use something more substantial like [typescript-starter](https://github.com/bitjson/typescript-starter).

## Custom messages

Many types can be built out of existing Compoventuals types using `CObject`. However, sometimes you need the power of raw message passing, e.g., when writing a `CPrimitive`.

Compoventuals expects `Uint8Array`s for these messages. Some suggested ways to encoded and decode these `Uint8Array`s:

- Use [protobuf.js](https://github.com/protobufjs/protobuf.js) with [its Typescript support](https://github.com/protobufjs/protobuf.js#usage-with-typescript). This is what Compoventuals does. See the main Compoventuals project for an example of how to incorporate protobuf.js into your build script (the `build:protobuf:` commands in `package.json`). If you copy those scripts, you will also want to:

  - add the `generated` and `generated_esm` folders to your `.gitignore` and `clean` scripts
  - add `generated` to your `"include"` list in `tsconfig.json`
  - change `"rootDir"` to `.` in `tsconfig.json`
  - copy the `hack_protobuf_for_tree_shaking.js` script, which fixes a bug in protobuf.js's ESM support that prevents Webpack tree-shaking (as of protobuf.js version 6.9.0).

- Use [BSON](https://www.npmjs.com/package/bson) (binary JSON) to encode plain JS objects as `Uint8Array`s.
- Use `Buffer.from` and `Buffer.toString` from [buffer](https://www.npmjs.com/package/buffer) to convert strings to `Uint8Array`s.

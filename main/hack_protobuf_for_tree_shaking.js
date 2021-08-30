/**
 * protobuf.js's output js file (generated/proto_compiled.js)
 * is not amenable to Webpack tree-shaking, even when in ES6
 * module mode, because:
 * - it uses IIFE's to define its classes.
 * - it adds a copy of each class to the $root variable, which
 * is global within the file.
 *
 * These each individually make Webpack (really UglifyJS) concerned
 * that each class definition may have side effects, so when
 * bundling a webapp that uses compoventuals, Webpack chooses
 * to include the entire proto_compiled.js file even if the
 * app only uses a few messages from it.
 * See https://github.com/mishoo/UglifyJS/issues/1261#issuecomment-285203500
 * That is a problem
 * since the file is quite large (currently 580 KB plain,
 * ~100 KB minified).
 *
 * This script is run during the build:protobuf process to
 * automatically refactor proto_compiled.js so that Webpack
 * will accept it.
 *
 * Note that this script may break when the protobuf.js version
 * is changed, since it depends on the exact output format.
 * Currently the version is pinned to 6.9.0 because
 * protobuf.js >= 6.10 es6 module exports have a bug
 * (https://github.com/protobufjs/protobuf.js/issues/1452).
 * Also, it deletes the default export $root.  TODO: if we run
 * this before pbts, perhaps .d.ts file will reflect this.
 */

const fs = require("fs");
const PATH = "./generated/proto_compiled.js";
let source = fs.readFileSync(PATH).toString();

// 1. Replace "(() => {" with "/*@__PURE__*/ (() => {".
// This tells UglifyJS to trust that the IIFE class definitions
// have no side effects.
source = source.replaceAll("(() => {", "/*@__PURE__*/ (() => {");

// 2. Remove all prefixes "$root.".  For the default export, all
// classes within the file are assigned as properties as
// $root and then referenced as its properties, instead of
// just as constants; but we don't need the default export.
source = source.replaceAll("$root.", "");

// 3. Removing "$root." in (2) creates awkward statements:
//    export const DeletingMutCSetCreateMessage = $root.DeletingMutCSetCreateMessage = [class def]
// becomes
//    export const DeletingMutCSetCreateMessage = DeletingMutCSetCreateMessage = [class def]
// and in my testing, this also breaks tree-shaking.
// We need to remove one of these "classname =" copies
// from each line starting with "export const".
let index = -1;
while ((index = source.indexOf("export const ", index + 1)) !== -1) {
  const classNameStart = index + 13;
  const classNameEquals = source.indexOf("=", classNameStart);
  source =
    source.substring(0, classNameStart) + source.substring(classNameEquals + 1);
}

fs.writeFileSync(PATH, source);

// The use of CompositeCrdt in Runtime (as the superclass of
// its RootCrdt) causes some circular dependency headaches -
// if we're not careful, Node.js will try to construct a class
// before its superclass, leading to
// "TypeError: Class extends value undefined is not a constructor or null".
// We fix this by:
// - Exporting constructions before core, so that CompositeCrdt
// becomes staged before Runtime is imported.
// - Making RootCrdt a field in Runtime, so that its class
// definition is not read until the first time a Runtime is
// constructed, which will be after CompositeCrdt finishes
// loading.
export * from "./constructions";
export * from "./core";
export * from "./abilities";
export * from "./types";
// TODO: do we need to export the stuff from event_emitter.ts?
// Or is it good enough to export the Crdt versions?
// TODO: should we export all of this serialization stuff?
// TODO: export newer classes
export {
  EventEmitter,
  ElementSerializer,
  DefaultElementSerializer,
  TextSerializer,
  TextArraySerializer,
  arrayAsString,
  stringAsArray,
  TestingNetwork,
  TestingNetworkGenerator,
} from "./util";

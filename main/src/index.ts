// We load core before constructions or else you will
// get errors due to superclasses not being loaded before
// their subclasses
// (e.g. in NodeJS: "TypeError: Class extends value undefined is not a constructor or null").
// Specifically, loading constructions/composite_crdt
// tries to load ./core before running the CompositeCrdt
// class definition, and then when ./core tries to run
// RootCrdt's class definition, it fails because
// its superclass (CompositeCrdt) does not yet exist.
export * from "./core";
export * from "./abilities";
export * from "./constructions";
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

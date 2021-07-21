import { Crdt } from "../core";
import { Resettable } from "../helper_crdts";
import { AbstractCSetCompositeCrdt } from "./abstract_set";

// TODO: ImplicitMutCSet, like ImplicitMap?  What would
// be the use case?  Should it have delete = reset by
// default, or should it have delete throw an error, with
// a subclass that resets on delete?

export class ResettingMutCSet<
  C extends Crdt & Resettable,
  AddArgs extends any[]
> extends AbstractCSetCompositeCrdt<C, AddArgs> {
  // TODO: use a ResettingMutMap (RiakCrdtMap), where the
  // keys are id (like in other sets) + serialized args.
  // Caution that each message contains the whole args, so
  // make them small (ideally []) or use a different set.
  // Choose keySerializer so that it is no larger than current
  // keys when args is [].
}

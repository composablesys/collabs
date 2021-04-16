import { Crdt, CrdtEventsRecord } from "../crdt_core";

export type Constructor<T> = new (...args: any[]) => T;

export type ConstructorArgs<Args extends any[], T> = new (...args: Args) => T;

/**
 * A `CrdtConstructor` is a constructor function that takes as its first two
 * parameters the two parameters that all CRDTs must take: a `parent` and an id.
 * No constraint is imposed on the remaining parameters. This constructor
 * function must return a {@link Crdt} instance of type `T`.
 *
 * TODO: delete in favor of Constructor<T extends Crdt>?
 *
 * @typeParam T - Type of the returned {@link Crdt} instance
 */
export type CrdtConstructor<T extends Crdt> = new (...args: any[]) => T;

// Mixin types for wrapper Crdts, which wrap an existing Crdt, taking
// the same constructor arguments to initialize the wrapped Crdt, but
// are themselves given by some existing class.
// E.g. ResetWrapperMixin, StrongResetWrapperMixin in resettable.ts.

// TODO

/**
 * A mixin meant to be applied to a {@link Crdt}.
 *
 * Mixins are functions that take a class constructor of type `Input`, which
 * must be a subtype of `Required`, and generate a constructor for a class that
 * mixes the interface of `Input` with its own interface `Self`.
 *
 * Note that `CrdtMixin` uses a {@link CrdtConstructor}, but actual mixins typed
 * with `CrdtMixin` use a regular {@link Constructor}. The reason for this is
 * that TypeScript requires mixin constructors to have a single rest parameter
 * with type `any[]` (see error ts(2545)). The implementation of a mixin can
 * therefore not respect the contract of {@link CrdtConstructor}. However, we
 * can signal the contract to the outside world by using {@link CrdtConstructor}
 * in the type annotation. TypeScript is able to unify the type signature of
 * mixins with the type signature of the `CrdtMixin`. This gives us the
 * flexibility to type our code *and* show a slightly different contract to the
 * outside wold.
 *
 * This is probably unsound, but it's quite convenient. Note that soundness
 * {@link https://github.com/Microsoft/TypeScript/wiki/TypeScript-Design-Goals |
 * is a non-goal of TypeScript}.
 *
 * @see {@link https://www.typescriptlang.org/docs/handbook/mixins.html}
 * @see {@link https://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/}
 *
 * @typeParam Required - The minimal interface into which this mixin can be
 * merged. Must be at least a {@link Crdt}.
 * @typeParam Self - The interface of the mixin.
 *
 * @return A constructor that creates a mixed type of the input type and the
 * mixin type.
 */
export type CrdtMixin<Required extends Crdt, Self> = <Input extends Required>(
  Base: CrdtConstructor<Input>
) => CrdtConstructor<Input & Self>;

/**
 * Same as a {@link CrdtMixin}, but a mixin of this type can optionally be
 * configured with an options object of type `Option`.
 */
export type CrdtMixinWithOptions<Required extends Crdt, Self, Options> = <
  Input extends Required
>(
  Base: CrdtConstructor<Input>,
  options?: Options
) => CrdtConstructor<Input & Self>;

export type CrdtMixinWithNewEvents<
  Required extends Crdt,
  Self,
  NewEvents extends CrdtEventsRecord
> = <Input extends Required>(
  Base: CrdtConstructor<Input>
) => CrdtConstructor<AddEvents<NewEvents, Input> & Self>;

export type CrdtMixinWithOptionsAndNewEvents<
  Required extends Crdt,
  Self,
  Options,
  NewEvents extends CrdtEventsRecord
> = <Input extends Required>(
  Base: CrdtConstructor<Input>,
  options?: Options
) => CrdtConstructor<AddEvents<NewEvents, Input> & Self>;

type AddEvents<
  NewEvents extends CrdtEventsRecord,
  C extends Crdt
> = C extends Crdt<infer OldEvents> ? C & Crdt<OldEvents & NewEvents> : C;

export function makeEventAdder<AdditionalEvents extends CrdtEventsRecord>(): <
  Instance extends Crdt
>(
  Base: CrdtConstructor<Instance>
) => CrdtConstructor<AddEvents<AdditionalEvents, Instance>> {
  // Just trust me!
  return (Base) => Base as any;
}

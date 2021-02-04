export type Constructor<T = {}> = new (...args: any[]) => T;

/**
 * @typeParam Required - The minimal interface into which this mixin can be
 * merged.
 * @typeParam Self - The interface of the mixin.
 *
 * @return A constructor that creates a mixed type of the input type and the
 * mixin type.
 */
export type Mixin<Required, Self> = <Input extends Required>(
  Base: Constructor<Input>
) => Constructor<Input & Self>;

/**
 * Same as {@link Mixin}, but also takes an optional option of type Option.
 */
export type MixinOpt1<Required, Self, Option1> = <Input extends Required>(
  Base: Constructor<Input>,
  option1?: Option1
) => Constructor<Input & Self>;

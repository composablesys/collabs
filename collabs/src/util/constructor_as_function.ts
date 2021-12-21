export function ConstructorAsFunction<T, Args extends unknown[]>(
  Class: new (...args: Args) => T
): (...args: Args) => T {
  return (...args) => new Class(...args);
}

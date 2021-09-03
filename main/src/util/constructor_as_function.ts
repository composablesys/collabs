export function ConstructorAsFunction<T, Args extends any[]>(
  Class: new (...args: Args) => T
): (...args: Args) => T {
  return (...args) => new Class(...args);
}

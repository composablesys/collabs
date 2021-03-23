/*type Constructor = new (...args: any[]) => {};
type GConstructor<T> = new (...args: any[]) => T;

function copyMethodsInternal<F, TBase extends Constructor>(
  Base: TBase,
  fFactory: () => F,
  methods: string[]
) {
  let subclass = class Subclass extends Base {
    readonly original: F;
    constructor(...args: any[]) {
      super(...args);
      this.original = fFactory();
    }
  };
  for (let method of methods) {
    subclass.prototype[method] = function (...args: any[]): any {
      return this.original[method](...args);
    };
  }
  return subclass;
}

function copyMethods<F, TBase extends Constructor>(
  Base: TBase,
  fFactory: () => F,
  methods: string[]
): ReturnType<typeof copyMethodsInternal> & GConstructor<F> {
  return copyMethodsInternal(Base, fFactory, methods) as any;
}

// TODO: also copy events (?)

let TestClass = copyMethods(
  Object,
  () => {
    return {};
  },
  ["test"]
);
let x = new TestClass();
x.original;
*/

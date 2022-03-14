export interface IVariable {
  set(value: unknown): void;

  get(): unknown;
}

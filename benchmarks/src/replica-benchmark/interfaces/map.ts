export interface IMap {
  set(key: string, value: unknown): void;

  delete(key: string): void;

  get(key: string): unknown;

  has(key: string): boolean;

  asMap(): Map<string, unknown>;
}

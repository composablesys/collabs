export interface IText {
  insert(index: number, char: string): void;

  delete(index: number): void;

  getText(): string;

  readonly length: number;
}

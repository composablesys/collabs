export interface ITodoListInternal {
  addItem(index: number, text: string): void;

  deleteItem(index: number): void;

  getItem(index: number): ITodoListInternal;

  readonly itemsSize: number;

  // Not used at top-level; default to false there
  done: boolean;

  // Not used at top-level; default to "" there
  insertText(index: number, text: string): void;

  deleteText(index: number, count: number): void;

  readonly textSize: number;

  getText(): string;
}

export interface ITodoList {
  readonly rootInternal: ITodoListInternal;
}

/**
 * Like IText, but operations are specified relative to a cursor
 * instead always as indices. The cursor should move as the user
 * expects in reponse to both local and remote operations.
 *
 * The cursor's purpose is to let us do the RealText trace in
 * concurrent mode, without breaking its realism: namely, that
 * users tend to write in LtR chunks. If we try to use RealText
 * with IText in concurrent mode (clamping indices to the current
 * length), then the users rarely write in LtR sequences, since they
 * type at an index i, some concurrent edits shift index i's char
 * elsewhere, then they type at index i+1, etc.
 * To the extent that the cursor adds overhead, that overhead reflects
 * the overhead that would be present in a realistic app anyway
 * (since it needs to manage the local user's cursor).
 */
export interface ITextWithCursor {
  moveCursor(index: number): void;

  /**
   * Whether the current cursor position is not known (because
   * the replica is new), hence moveCursor must be called before
   * the next op.
   */
  needsCursor(): boolean;

  insert(char: string): void;

  delete(): void;

  getText(): string;

  readonly length: number;
}

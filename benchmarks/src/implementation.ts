export type Data = Uint8Array | string;
export function byteLength(msg: Data): number {
  if (typeof msg === "string") return msg.length;
  else return msg.byteLength;
}

export interface Replica {
  /**
   * Only perform ops by calling this method.
   */
  transact(doOps: () => void): void;
  receive(msg: Data): void;
  save(): Data;
  load(saveData: Data): void;
  skipLoad(): void;
}

export type Implementation<R extends Replica> = new (
  onsend: (msg: Data) => void,
  replicaIdRng: seedrandom.prng
) => R;

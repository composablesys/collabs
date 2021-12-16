/**
 * A network that broadcasts messages to all replicas
 * exactly once in causal order with no echo.
 *
 * TODO: some standard bidirectional pipe abstraction,
 * instead of custom send/register stuff?
 *
 * TODO: workflow: create, set onreceive, await load, then
 * messages start coming. Implementers could also choose to
 * wait until later, e.g., add a start() method.
 */
export interface BroadcastNetwork {
  /**
   * Set by the using Runtime to receive messages.
   */
  onreceive: (message: Uint8Array) => void;
  /**
   * Set by the using Runtime to indicate its replicaId.
   */
  replicaId: string;

  // /**
  //  * TODO: opt: if true, you guarantee exactly-once causal
  //  * order delivery. In that case, CRDTRuntime will skip
  //  * adding that, yielding a slight message size decrease.
  //  */
  // readonly guaranteesCausalOrder: boolean;

  send(message: Uint8Array): void;

  load(saveData: Uint8Array | null): void;
  save(): Uint8Array;
}

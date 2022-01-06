/**
 * A network that broadcasts messages to all replicas
 * exactly once in causal order with no echo.
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

  send(message: Uint8Array): void;

  load(saveData: Uint8Array | null): void;
  save(): Uint8Array;
}

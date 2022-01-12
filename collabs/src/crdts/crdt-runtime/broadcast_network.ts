import { Optional } from "../../util";

/**
 * A network that broadcasts messages to all replicas
 * exactly once in causal order with no echo.
 */
export interface BroadcastNetwork {
  /**
   * Set by the using Runtime to receive messages.
   */
  onreceive: (message: Uint8Array) => void;

  send(message: Uint8Array): void;

  load(saveData: Optional<Uint8Array>): void;
  save(): Uint8Array;
}

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

  /**
   * TODO: shouldn't cause you to deliver messages
   * (they should've been delivered before)?
   * But DisconnectableNetwork is an exception because
   * it's special/for testing.
   * @param saveData [description]
   */
  load(saveData: Optional<Uint8Array>): void;
  save(): Uint8Array;
}

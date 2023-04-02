/**
 * Helper type, not a message.
 */
export interface Update {
  updateType: "message" | "savedState";
  data: Uint8Array;
}

export interface ReadyMessage {
  type: "Ready";
}

export interface SendMessage {
  type: "Send";
  message: Uint8Array;
  predID: number;
}

export interface SavedMessage {
  type: "Saved";
  savedState: Uint8Array;
  lastReceivedID: number;
  // Optional in case we later want to allow the container
  // to save on its own initiative.
  requestID?: number;
}

export interface SaveRequestFailedMessage {
  type: "SaveRequestFailed";
  requestID: number;
  errorToString: string;
}

export type HostMessage =
  | ReadyMessage
  | SendMessage
  | SavedMessage
  | SaveRequestFailedMessage;

export interface UpdateMessage extends Update {
  type: "Update";
  id: number;
}

export interface SaveRequestMessage {
  type: "SaveRequest";
  requestID: number;
}

/**
 * Only used for the initial load. Later "merging" loads
 * are sent as UpdateMessages.
 */
export interface LoadMessage {
  type: "Load";
  hostSkipped: boolean;
  latestSaveData: Uint8Array | null;
  furtherUpdates: Update[];
}

export type ContainerMessage = UpdateMessage | SaveRequestMessage | LoadMessage;

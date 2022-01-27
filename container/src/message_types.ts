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
  saveData: Uint8Array;
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

export interface ReceiveMessage {
  type: "Receive";
  message: Uint8Array;
  id: number;
}

export interface SaveRequestMessage {
  type: "SaveRequest";
  requestID: number;
}

export interface LoadMessage {
  type: "Load";
  hostSkipped: boolean;
  latestSaveData: Uint8Array | null;
  furtherMessages: Uint8Array[];
}

export type ContainerMessage =
  | ReceiveMessage
  | SaveRequestMessage
  | LoadMessage;

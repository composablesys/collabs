export interface ReadyMessage {
  type: "Ready";
}

export interface MetadataMessage {
  type: "Metadata";
  metadata: unknown;
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
  error: unknown;
}

export type HostMessage =
  | ReadyMessage
  | MetadataMessage
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

export type LoadMessage =
  | {
      type: "Load";
      skipped: true;
    }
  | {
      type: "Load";
      skipped: false;
      latestSaveData: Uint8Array | null;
      furtherMessages: Uint8Array[];
      lastID: number;
    };

export type ContainerMessage =
  | ReceiveMessage
  | SaveRequestMessage
  | LoadMessage;

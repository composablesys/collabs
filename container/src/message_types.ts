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
  requestID?: number;
}

export type HostMessage =
  | ReadyMessage
  | MetadataMessage
  | SendMessage
  | SavedMessage;

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
  skipped: boolean;
  latestSaveData?: Uint8Array | null;
  furtherMessages?: Uint8Array[];
}

export type ContainerMessage =
  | ReceiveMessage
  | SaveRequestMessage
  | LoadMessage;

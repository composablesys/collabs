// TODO: protobuf?

export type Subscribe = {
  type: "Subscribe";
  /** May be multiple if we're reconnecting. */
  roomNames: string[];
};

export type Unsubscribe = {
  type: "Unsubscribe";
  roomName: string;
};

export type Welcome = {
  type: "Welcome";
  /**
   * Even if Subscribe sends multiple roomNames, a separate Welcome
   * is sent for each room, so that we can make incremental progress
   * when there are many subscribed rooms.
   */
  roomName: string;
  savedState: string | null;
  furtherUpdates: {
    update: string;
    updateType: "message" | "savedState";
  }[];
};

export type Send = {
  type: "Send";
  roomName: string;
  /** Base64 encoded Uint8Array. */
  update: string;
  updateType: "message" | "savedState";
  localCounter: number;
};

export type Receive = {
  type: "Receive";
  roomName: string;
  /** Base64 encoded Uint8Array. */
  update: string;
  updateType: "message" | "savedState";
};

export type Ack = {
  type: "Ack";
  roomName: string;
  localCounter: number;
  saveRequest?: string;
};

export type SaveResponse = {
  type: "SaveResponse";
  roomName: string;
  /** Base64 encoded Uint8Array. */
  savedState: string;
  saveRequest: string;
};

export type WSMessage =
  | Subscribe
  | Unsubscribe
  | Welcome
  | Send
  | Receive
  | Ack
  | SaveResponse;

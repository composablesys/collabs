export enum UpdateType {
  Message = 1,
  SavedState = 2,
}

export function stringToEnum(updateType: "message" | "savedState"): UpdateType {
  return updateType === "message" ? UpdateType.Message : UpdateType.SavedState;
}

export interface SerializableMessage {
  // TODO: allow calling multiple times, possibly in different
  // states? (Shouldn't happen, but easy enough to allow?)
  // Also: allow current CRDTMetaLayer behavior, where
  // calling this changes the state, since it makes assumptions
  // about batching? (What exact guarantees do we need for
  // that to make sense?)
  serialize(): Uint8Array | string;
}

// TODO: on local echo, you get back exactly what you sent
// (same object) - in particular, can safely cast it to
// the type of thing you sent. Otherwise, you get the serialized form.
// (This is a promise for consumers, and a responsibility
// for parents: if you're locally echoing, or if you do
// inner serialization that you might deserialize during
// a local echo, then you must preserve objects.)
// (Put these restrictions childSend, and promises on Collab.receive.)
// Careful when using this: it's an easy way to violate EC,
// since the local user is seeing something different than
// everyone else.
// TODO: to meet this restrictions, runLocally needs to set
// isLocalEcho = true on echoed messages (as we already suspected
// for other reasons).
// TODO: check that we never do inner serialization when
// we don't locally echo.

export type Message = Uint8Array | string | SerializableMessage;

export function serializeMessage(message: Message): Uint8Array | string {
  if (typeof message === "string" || message instanceof Uint8Array)
    return message;
  else return message.serialize();
}

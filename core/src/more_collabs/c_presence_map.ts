import { PresenceMapMessage } from "../../generated/proto_compiled";
import { CPrimitive } from "../base_collabs";
import { InitToken, UpdateMeta } from "../core";
import { MapEventsRecord } from "../data_types";
import { DefaultSerializer, Optional, Serializer } from "../util";

enum MessageType {
  Set = 1,
  Delete = 2,
  Heartbeat = 3,
  RequestAll = 4,
  SetRequestAll = 5,
}

interface TimedValue<V> {
  value: V;
  present: boolean;
  timeoutID: ReturnType<typeof setTimeout> | null;
}

/**
 * A map for sharing *presence info* between present (simultaneously online)
 * replicas, e.g., usernames or shared cursors.
 *
 * Each replica controls a fixed key, namely, its [[IRuntime.replicaID]].
 * Its value should contain presence info about itself, e.g.,
 * its user's latest [[Cursor]] location in a collaborative text editor.
 *
 * Values are ephemeral: they expire at a fixed interval after they are received
 * (30 seconds by default), and they are not saved.
 * This helps ensure that you only see values for currently-online peers.
 *
 * When a value is deleted due to its expiration, we emit a [[MapEventsRecord.Delete]]
 * event as usual.
 *
 * Values must be internally immutable;
 * mutating a value internally will not change it on
 * other replicas. Consider storing a JSON value and overwriting the whole
 * value when a property changes, or using a separate CPresenceMap for each
 * property.
 *
 * See also:
 * - [[CValueMap]]: for an ordinary collaborative map.
 * - [[CMessenger]]: for sending ephemeral (non-saved) messages in general.
 *
 * @typeParam V The value type.
 */
export class CPresenceMap<V> extends CPrimitive<MapEventsRecord<string, V>> {
  /**
   * The default [[ttlMS]]: 30 seconds.
   */
  static readonly TTL_MS_DEFAULT = 30000;

  private readonly state = new Map<string, TimedValue<V>>();
  /** Cached size. */
  private _size = 0;

  private joined = false;
  private heartbeatIntervalID: ReturnType<typeof setInterval> | null = null;

  private readonly valueSerializer: Serializer<V>;
  /**
   * The time-to-live for received values in milliseconds,
   * i.e., how long until a value expires locally. The time is measured from
   * when we receive the value, not when it was sent.
   *
   * Configure using the constructor's `options.ttlMS`.
   * Defaults to [[TTL_MS_DEFAULT]].
   */
  readonly ttlMS: number;

  /**
   * Constructs a CPresenceMap.
   *
   * @param options.valueSerializer Serializer for values. Defaults to [[DefaultSerializer]].
   * @param options.ttlMS The value of [[ttlMS]].
   * Defaults to [[TTL_MS_DEFAULT]].
   */
  constructor(
    init: InitToken,
    options: {
      valueSerializer?: Serializer<V>;
      ttlMS?: number;
    } = {}
  ) {
    super(init);

    this.ttlMS = options?.ttlMS ?? CPresenceMap.TTL_MS_DEFAULT;
    this.valueSerializer =
      options?.valueSerializer ?? DefaultSerializer.getInstance();

    // Maintain this._size as a view of the externally-visible map's size.
    this.on("Set", (e) => {
      if (!e.previousValue.isPresent) this._size++;
    });
    this.on("Delete", () => this._size--);
  }

  requestAll(): void {
    this.joined = true;
    super.sendPrimitive(
      PresenceMapMessage.encode({ type: MessageType.RequestAll }).finish()
    );
  }

  /**
   * Sets our value, i.e., the value at key [[IRuntime.replicaID]].
   *
   * Since the value expires after [[ttlMS]], you should call this method
   * slightly more often, even if your value has not changed.
   */
  setOurs(value: V): void {
    const message = PresenceMapMessage.create({
      type: this.joined ? MessageType.Set : MessageType.SetRequestAll,
      value: this.valueSerializer.serialize(value),
    });
    this.joined = true;
    super.sendPrimitive(PresenceMapMessage.encode(message).finish());

    // Start heartbeats.
    if (this.heartbeatIntervalID !== null) {
      clearInterval(this.heartbeatIntervalID);
    }
    this.heartbeatIntervalID = setInterval(
      () => this.heartbeat(),
      Math.floor(this.ttlMS / 2)
    );
  }

  private heartbeat() {
    super.sendPrimitive(
      PresenceMapMessage.encode({ type: MessageType.Heartbeat }).finish()
    );
  }

  /**
   * Deletes our value, i.e., the value at key [[IRuntime.replicaID]].
   *
   * It is a good idea to call this method if the user is about to disconnect or if
   * they stopped using the relevant app/component.
   * That way, other users immediately see that this user is no longer
   * present, instead of waiting for the current value to expire.
   */
  deleteOurs(): void {
    super.sendPrimitive(
      PresenceMapMessage.encode({ type: MessageType.Delete }).finish()
    );

    // Stop heartbeats.
    if (this.heartbeatIntervalID !== null) {
      clearInterval(this.heartbeatIntervalID);
    }
  }

  protected receivePrimitive(
    message: Uint8Array | string,
    meta: UpdateMeta
  ): void {
    const replicaID = meta.senderID;
    const decoded = PresenceMapMessage.decode(<Uint8Array>message);

    switch (decoded.type as MessageType) {
      case MessageType.Set:
      case MessageType.SetRequestAll: {
        // If the message is forRequestAll and its value is already present,
        // treat it as a heartbeat. Else treat it as a normal Set.
        if (decoded.forRequestAll && this.has(replicaID)) {
          this.processHeartbeat(replicaID, meta);
          break;
        }

        const value = this.valueSerializer.deserialize(decoded.value);
        const previousValue = this.has(replicaID)
          ? Optional.of(this.get(replicaID)!)
          : Optional.empty<V>();

        let timedValue = this.state.get(replicaID);
        if (timedValue === undefined) {
          timedValue = { value, timeoutID: null, present: true };
          this.state.set(replicaID, timedValue);
        }

        timedValue.value = value;
        this.resetTimeout(replicaID, timedValue);

        this.emit("Set", {
          key: replicaID,
          value,
          previousValue,
          meta,
        });
        break;
      }
      case MessageType.Delete:
        this.deleteLocallyInternal(replicaID, meta);
        break;
      case MessageType.Heartbeat: {
        this.processHeartbeat(replicaID, meta);
        break;
      }
    }

    if (
      decoded.type === MessageType.RequestAll ||
      decoded.type === MessageType.SetRequestAll
    ) {
      // Send our state to the requester.
      // Do it in a separate task because Collabs does not allow message sends
      // while processing a message.
      // TODO: rate limit? consider case where everyone joins at once.
      setTimeout(() => {
        if (this.has(this.runtime.replicaID)) {
          const message = PresenceMapMessage.create({
            type: MessageType.Set,
            value: this.valueSerializer.serialize(this.getOurs()!),
            forRequestAll: true,
          });
          super.sendPrimitive(PresenceMapMessage.encode(message).finish());
        }
      }, 0);
    }
  }

  private processHeartbeat(replicaID: string, meta: UpdateMeta): void {
    const timedValue = this.state.get(replicaID);
    if (timedValue === undefined) return;

    const wasPresent = timedValue.present;
    this.resetTimeout(replicaID, timedValue);

    if (!wasPresent) {
      // Make it present again.
      timedValue.present = true;
      this.emit("Set", {
        key: replicaID,
        value: timedValue.value,
        previousValue: Optional.empty(),
        meta,
      });
    }
  }

  private resetTimeout(replicaID: string, timedValue: TimedValue<V>): void {
    if (timedValue.timeoutID !== null) clearTimeout(timedValue.timeoutID);
    timedValue.timeoutID = setTimeout(
      () => this.deleteLocallyInternal(replicaID, null),
      this.ttlMS
    );
    timedValue.present = true;
  }

  /**
   * Deletes the key `replicaID` in our *local* copy of the map, without
   * affecting other replicas.
   *
   * You may wish to call this method when you know that a replica has disconnected,
   * instead of waiting for its current value to expire.
   * In particular, you may wish to call this method for every `replicaID` in [[keys]]
   * if you know that the local device has gone offline, to show the local user
   * that they are no longer collaborating live.
   */
  deleteLocally(replicaID: string): void {
    this.deleteLocallyInternal(replicaID, null);
  }

  private deleteLocallyInternal(
    replicaID: string,
    meta: UpdateMeta | null
  ): void {
    if (!this.has(replicaID)) return;

    if (meta === null) {
      meta = {
        updateType: "message",
        senderID: replicaID,
        isLocalOp: false,
        runtimeExtra: undefined,
      };
    }

    const timedValue = this.state.get(replicaID)!;
    if (timedValue.timeoutID !== null) clearTimeout(timedValue.timeoutID);
    timedValue.timeoutID = null;
    timedValue.present = false;

    this.emit("Delete", {
      key: replicaID,
      value: timedValue.value,
      meta,
    });
  }

  /**
   * Returns the value associated to key `replicaID`, or undefined if
   * `replicaID` is not present.
   */
  get(replicaID: string): V | undefined {
    if (this.has(replicaID)) return this.state.get(replicaID)!.value;
    else return undefined;
  }

  /**
   * Returns our value, i.e., the value at key [[IRuntime.replicaID]].
   */
  getOurs(): V | undefined {
    return this.get(this.runtime.replicaID);
  }

  /**
   * Returns whether key `replicaID` is present in the map.
   */
  has(replicaID: string): boolean {
    return this.state.get(replicaID)?.present ?? false;
  }

  /**
   * The number of present keys in the map.
   */
  get size(): number {
    return this._size;
  }

  /**
   * Returns an iterator for entries in the map.
   *
   * The iteration order is NOT eventually consistent:
   * it may differ on replicas with the same state.
   */
  [Symbol.iterator](): IterableIterator<[string, V]> {
    return this.entries();
  }

  /**
   * Returns an iterator of key (replicaID), value pairs for every entry in the map.
   *
   * The iteration order is NOT eventually consistent:
   * it may differ on replicas with the same state.
   */
  *entries(): IterableIterator<[string, V]> {
    for (const [key, timedValue] of this.state) {
      if (timedValue.present) yield [key, timedValue.value];
    }
  }

  /**
   * Returns an iterator for keys (replicaIDs) in the map.
   *
   * The iteration order is NOT eventually consistent:
   * it may differ on replicas with the same state.
   */
  *keys(): IterableIterator<string> {
    for (const [key] of this.entries()) yield key;
  }

  /**
   * Returns an iterator for values in the map.
   *
   * The iteration order is NOT eventually consistent:
   * it may differ on replicas with the same state.
   */
  *values(): IterableIterator<V> {
    for (const [, value] of this.entries()) yield value;
  }

  /**
   * Executes a provided function once for each (key, value) pair in
   * the map, in the same order as [[entries]].
   *
   * @param callbackfn Function to execute for each value.
   * Its arguments are the value, key, and this map.
   * @param thisArg Value to use as `this` when executing `callbackfn`.
   */
  forEach(
    callbackfn: (value: V, key: string, map: this) => void,
    thisArg?: any //eslint-disable-line @typescript-eslint/no-explicit-any
  ): void {
    // Not sure if this gives the exact same semantics
    // as Map if callbackfn modifies this during the
    // loop.  (Given that Array.forEach has a rather
    // funky polyfill on MDN, I expect Map.forEach is
    // similarly funky.)  Although users probably shouldn't
    // be doing that anyway.
    for (const [key, value] of this) {
      callbackfn.call(thisArg, value, key, this);
    }
  }

  protected savePrimitive(): Uint8Array {
    // No saved state.
    return new Uint8Array();
  }

  protected loadPrimitive(
    _savedState: Uint8Array | null,
    _meta: UpdateMeta
  ): void {
    // No saved state.
  }
}

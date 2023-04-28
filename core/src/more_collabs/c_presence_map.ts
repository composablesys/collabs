import { PresenceMapMessage } from "../../generated/proto_compiled";
import { CPrimitive } from "../base_collabs";
import { InitToken, UpdateMeta } from "../core";
import { MapEventsRecord } from "../data_types";
import { DefaultSerializer, Optional, Serializer } from "../util";

enum MessageType {
  Set = 1,
  Update = 2,
  Delete = 3,
  Heartbeat = 4,
  None = 5,
}

interface TimedValue<F> {
  state: F;
  present: boolean;
  timeoutID: ReturnType<typeof setTimeout> | null;
}

/**
 * A map for sharing *presence info* between present (simultaneously online)
 * replicas, e.g., usernames or shared cursors.
 *
 * Each replica controls a fixed key: its [[IRuntime.replicaID]].
 * Its value should contain presence info about itself, such as
 * its user's latest [[Cursor]] location in a collaborative text editor.
 *
 * Values are ephemeral: they expire at a fixed interval after the sender's
 * last heartbeat (default 30 seconds), and they are not saved.
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
 *
 * TODO: rename CPresence?
 *
 * TODO: doc how version interactions could give type Partial<F>
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class CPresenceMap<F extends Record<string, any>> extends CPrimitive<
  MapEventsRecord<string, F>
> {
  /**
   * The default [[ttlMS]]: 30 seconds.
   */
  static readonly TTL_MS_DEFAULT = 30000;

  private readonly state = new Map<string, TimedValue<F>>();
  /** Cached size. */
  private _size = 0;

  private oursSet = false;
  private heartbeatIntervalID: ReturnType<typeof setInterval> | null = null;

  private readonly updateSerializer: Serializer<Partial<F>>;
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
   * @param options.valueSerializer Serializer for values. Defaults to [[DefaultSerializer]]. TODO
   * @param options.ttlMS The value of [[ttlMS]]. Defaults to [[TTL_MS_DEFAULT]].
   */
  constructor(
    init: InitToken,
    // TODO: remove?
    private readonly defaults: F,
    options: {
      updateSerializer?: Serializer<Partial<F>>;
      ttlMS?: number;
    } = {}
  ) {
    super(init);

    this.ttlMS = options?.ttlMS ?? CPresenceMap.TTL_MS_DEFAULT;
    this.updateSerializer =
      options?.updateSerializer ?? DefaultSerializer.getInstance();

    // Maintain this._size as a view of the externally-visible map's size.
    this.on("Set", (e) => {
      if (!e.previousValue.isPresent) this._size++;
    });
    this.on("Delete", () => this._size--);
  }

  /**
   * Requests that all currently-online peers send their current presence
   * values.
   *
   * Call this near the start of your app if you do not call [[setOurs]]
   * right away.
   *
   * TODO: omit, set null in CRichText instead? What about read-only users?
   * TODO: doc: also useful after you've deletedLocally folks and now need
   * their values again.
   */
  requestAll(): void {
    super.sendPrimitive(
      PresenceMapMessage.encode({
        type: MessageType.None,
        requestAll: true,
      }).finish()
    );
  }

  /**
   * Sets our value, i.e., the value at key [[IRuntime.replicaID]].
   *
   * The first time this is called (typically at the beginning of your
   * app), this also requests that all currently-online peers send their
   * current presence values.
   */
  setOurs(state: F): void {
    const message = PresenceMapMessage.create({
      type: MessageType.Set,
      updates: this.updateSerializer.serialize(state),
      requestAll: !this.oursSet ? true : undefined,
    });
    this.oursSet = true;
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
    if (this.has(this.runtime.replicaID)) {
      super.sendPrimitive(
        PresenceMapMessage.encode({ type: MessageType.Heartbeat }).finish()
      );
    }
  }

  // TODO: must not be called before setOurs.
  updateOurs<K extends keyof F & string>(key: K, value: F[K]): void {
    if (!this.oursSet) {
      throw new Error("Must call setOurs before updateOurs");
    }

    const updates: Partial<F> = {};
    updates[key] = value;
    super.sendPrimitive(
      PresenceMapMessage.encode({
        type: MessageType.Update,
        updates: this.updateSerializer.serialize(updates),
      }).finish()
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
      case MessageType.Update: {
        // If the message is forRequestAll and its value is already present,
        // treat it as a heartbeat. Else treat it as a normal Set.
        if (decoded.forRequestAll && this.has(replicaID)) {
          this.processHeartbeat(replicaID, meta);
          break;
        }

        const previousValue = this.has(replicaID)
          ? Optional.of(this.get(replicaID)!)
          : Optional.empty<F>();

        let oldState: Partial<F>;
        if (this.state.has(replicaID)) {
          oldState = this.state.get(replicaID)!.state;
        } else oldState = {};
        // TODO: if you get an update before your requestAll set, you'll
        // get defaults except for the updated value. Should we just
        // hide it instead?
        const state = {
          ...this.defaults,
          ...oldState,
          ...this.updateSerializer.deserialize(decoded.updates),
        };

        const oldTimeoutID = this.state.get(replicaID)?.timeoutID;
        if (oldTimeoutID !== undefined && oldTimeoutID !== null) {
          clearTimeout(oldTimeoutID);
        }

        this.state.set(replicaID, {
          state,
          timeoutID: null,
          present: true,
        });
        this.resetTimeout(replicaID);

        this.emit("Set", {
          key: replicaID,
          // TODO: rename state to value to match this?
          value: state,
          previousValue,
          meta,
        });
        break;
      }
      case MessageType.Delete: {
        const timedValue = this.state.get(replicaID);
        if (timedValue !== undefined) {
          if (timedValue.timeoutID !== null) clearTimeout(timedValue.timeoutID);
          this.state.delete(replicaID);
          if (timedValue.present) {
            this.emit("Delete", {
              key: replicaID,
              value: timedValue.state,
              meta,
            });
          }
        }
        break;
      }
      case MessageType.Heartbeat: {
        this.processHeartbeat(replicaID, meta);
        break;
      }
    }

    if (decoded.requestAll) {
      // Send our state to the requester.
      // Do it in a separate task because Collabs does not allow message sends
      // while processing a message.
      // TODO: rate limit? consider case where everyone joins at once.
      setTimeout(() => {
        if (this.has(this.runtime.replicaID)) {
          const message = PresenceMapMessage.create({
            type: MessageType.Set,
            updates: this.updateSerializer.serialize(this.getOurs()!),
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

    this.resetTimeout(replicaID);

    if (!timedValue.present) {
      timedValue.present = true;
      this.emit("Set", {
        key: replicaID,
        value: timedValue.state,
        previousValue: Optional.empty(),
        meta,
      });
    }
  }

  private resetTimeout(replicaID: string): void {
    const timedValue = this.state.get(replicaID);
    if (timedValue === undefined) return;

    if (timedValue.timeoutID !== null) clearTimeout(timedValue.timeoutID);
    timedValue.timeoutID = setTimeout(
      () => this.hideLocally(replicaID),
      this.ttlMS
    );
  }

  /**
   * Deletes the key `replicaID` in our *local* copy of the map, without
   * affecting other replicas. TODO: only until next set/hearbeat.
   *
   * You may wish to call this method when you know that a replica has disconnected,
   * instead of waiting for its current value to expire.
   * In particular, you may wish to call this method for every `replicaID` in [[keys]]
   * if you know that the local device has gone offline, to show the local user
   * that they are no longer collaborating live.
   */
  hideLocally(replicaID: string): void {
    if (!this.has(replicaID)) return;

    const meta: UpdateMeta = {
      updateType: "message",
      senderID: replicaID,
      isLocalOp: false,
      runtimeExtra: undefined,
    };

    const timedValue = this.state.get(replicaID)!;
    if (timedValue.timeoutID !== null) clearTimeout(timedValue.timeoutID);
    timedValue.timeoutID = null;
    timedValue.present = false;

    this.emit("Delete", {
      key: replicaID,
      value: timedValue.state,
      meta,
    });
  }

  /**
   * Returns the value associated to key `replicaID`, or undefined if
   * `replicaID` is not present.
   */
  get(replicaID: string): F | undefined {
    if (this.has(replicaID)) return this.state.get(replicaID)!.state;
    else return undefined;
  }

  /**
   * Returns our value, i.e., the value at key [[IRuntime.replicaID]].
   */
  getOurs(): F | undefined {
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
  [Symbol.iterator](): IterableIterator<[string, F]> {
    return this.entries();
  }

  /**
   * Returns an iterator of key (replicaID), state pairs for every entry in the map.
   *
   * The iteration order is NOT eventually consistent:
   * it may differ on replicas with the same state.
   */
  *entries(): IterableIterator<[string, F]> {
    for (const [key, timedValue] of this.state) {
      if (timedValue.present) yield [key, timedValue.state];
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
   * Returns an iterator for states in the map.
   *
   * The iteration order is NOT eventually consistent:
   * it may differ on replicas with the same state.
   */
  *values(): IterableIterator<F> {
    for (const [, value] of this.entries()) yield value;
  }

  /**
   * Executes a provided function once for each (key, state) pair in
   * the map, in the same order as [[entries]].
   *
   * @param callbackfn Function to execute for each key.
   * Its arguments are the state, key, and this map.
   * @param thisArg Value to use as `this` when executing `callbackfn`.
   */
  forEach(
    callbackfn: (state: F, key: string, map: this) => void,
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

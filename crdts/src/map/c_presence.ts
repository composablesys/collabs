import {
  DefaultSerializer,
  InitToken,
  MapEventsRecord,
  Optional,
  Serializer,
  UpdateMeta,
  int64AsNumber,
} from "@collabs/core";
import {
  IPresenceInfoSave,
  PresenceMessage,
  PresenceSave,
  PresenceSetMessage,
} from "../../generated/proto_compiled";
import { PrimitiveCRDT } from "../base_collabs";
import { CRDTMessageMeta, CRDTSavedStateMeta } from "../runtime";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface Info<V extends Record<string, any>> {
  value: V;
  present: boolean;
  timeout: ReturnType<typeof setTimeout> | null;
  // For saved states:
  time: number;
}

/**
 * A map for sharing *presence info* between present (simultaneously online)
 * replicas, e.g., usernames or shared cursors.
 *
 * Each replica controls a fixed key: its [[IRuntime.replicaID]].
 * Its value should be a plain object that contains presence info about
 * itself, such as its user's latest [[Cursor]] location in a collaborative
 * text editor.
 *
 * To make yourself present and start listening to others, call [[setOurs]]
 * followed by [[connect]]. To update your value, call [[updateOurs]]
 * or [[setOurs]] again. If you know you are about to go offline, try to call
 * [[disconnect]] to let others know; otherwise, they will infer it from
 * a timeout (default 10 seconds).
 *
 * CPresence attempts to detect presence accurately on a variety
 * of networks (centralized, peer-to-peer, op-based, state-based). You may
 * prefer a custom solution if you can detect presence more accurately,
 * e.g., by asking a central server who is connected.
 *
 * Values must be internally immutable;
 * mutating a value internally will not change it on
 * other replicas. Instead, use [[updateOurs]].
 *
 * See also:
 * - [[CValueMap]]: for an ordinary collaborative map.
 * - [[CMessenger]]: for sending ephemeral messages in general.
 *
 * @typeParam V The value type: a plain object that contains presence info
 * about a single replica.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class CPresence<V extends Record<string, any>> extends PrimitiveCRDT<
  MapEventsRecord<string, V>
> {
  /** Excludes us. */
  private readonly state = new Map<string, Info<V>>();
  private _size = 0;

  private ourValue: V | null = null;
  private heartbeatTimeout: ReturnType<typeof setTimeout> | null = null;
  private _connected = false;
  /** Whether we have joined, i.e., ever connected. */
  private joined = false;

  private readonly ttlMS: number;
  private readonly heartbeatInterval: number;
  private readonly updateSerializer: Serializer<Partial<V>>;
  /**
   * The default time-to-live: 10 seconds.
   */
  static readonly TTL_MS_DEFAULT = 10000;

  /**
   * Constructs a CPresence.
   *
   * @param options.ttlMS The time-to-live for users who we have not heard from,
   * after which their entry is deleted. Heartbeats sent twice as often
   * keep present users alive. Default: [[TTL_MS_DEFAULT]].
   * @param options.updateSerializer Serializer for updates ([[setOurs]] and
   * [[updateOurs]]), which change a subset of V's keys.
   * Defaults to [[DefaultSerializer]].
   */
  constructor(
    init: InitToken,
    options: { ttlMS?: number; updateSerializer?: Serializer<Partial<V>> } = {}
  ) {
    super(init);

    this.updateSerializer =
      options.updateSerializer ?? DefaultSerializer.getInstance();
    this.ttlMS = options.ttlMS ?? CPresence.TTL_MS_DEFAULT;
    if (!(Number.isInteger(this.ttlMS) && this.ttlMS > 0)) {
      throw new Error(
        `options.ttlMS must be a positive integer; got ${this.ttlMS}`
      );
    }
    this.heartbeatInterval = Math.ceil(this.ttlMS / 2);
  }

  /**
   * Sets our value, overwriting the current value.
   *
   * To become present, call this method followed by [[connect]].
   */
  setOurs(value: V): void {
    const previousValue =
      this.ourValue === null ? Optional.empty<V>() : Optional.of(this.ourValue);
    if (this.ourValue === null) this._size++;
    this.ourValue = value;

    if (this.connected) {
      super.sendCRDT(
        PresenceMessage.encode({
          set: {
            value: this.updateSerializer.serialize(this.ourValue),
          },
        }).finish()
      );
      this.resetHeartbeat();
    }

    this.emitOwnSetEvent(previousValue);
  }

  /**
   * Updates a single property in our value, leaving the other
   * properties unchanged.
   *
   * Use this method for frequently-changed properties like cursor positions.
   */
  updateOurs<P extends keyof V & string>(
    property: P,
    propertyValue: V[P]
  ): void {
    if (this.ourValue === null) {
      throw new Error(
        "You must set our value with setOurs before updating it with updateOurs"
      );
    }

    const previousValue = Optional.of(this.ourValue);

    this.ourValue = { ...this.ourValue, [property]: propertyValue };

    if (this.connected) {
      const updates: Partial<V> = {};
      updates[property] = propertyValue;
      super.sendCRDT(
        PresenceMessage.encode({
          update: this.updateSerializer.serialize(updates),
        }).finish()
      );
      this.resetHeartbeat();
    }

    this.emitOwnSetEvent(previousValue);
  }

  private emitOwnSetEvent(previousValue: Optional<V>) {
    this.emit("Set", {
      key: this.runtime.replicaID,
      value: this.ourValue!,
      previousValue,
      meta: {
        isLocalOp: true,
        senderID: this.runtime.replicaID,
        updateType: "message",
        runtimeExtra: undefined,
      },
    });
  }

  /**
   * Connects to the group, marking us as present.
   * This method must only be called after setting our value with [[setOurs]].
   */
  connect(): void {
    if (this._connected) return;
    if (this.ourValue === null) {
      throw new Error(
        "You must set our value with setOurs before calling connect()"
      );
    }

    // Connect, (re-)sending our current state, since setOurs/updateOurs do not
    // send messages while disconnected.
    super.sendCRDT(
      PresenceMessage.encode({
        set: {
          value: this.updateSerializer.serialize(this.ourValue),
          isJoin: !this.joined,
        },
      }).finish()
    );

    this._connected = true;
    this.joined = true;
    // Start heartbeats.
    this.resetHeartbeat();
  }

  /**
   * Disconnects from the group, marking us as not present.
   *
   * If you know the local user is about to go offline, try to call
   * this method to let others know; otherwise, they will infer it from
   * a timeout (default 10 seconds).
   *
   * Disconnection affects others' view of us, not our view of them.
   * When disconnected, you may wish to treat others as offline even though
   * CPresence still has their state.
   */
  disconnect(): void {
    if (!this._connected) return;

    super.sendCRDT(PresenceMessage.encode({ disconnect: true }).finish());
    this._connected = false;
    // Stop heartbeats.
    this.resetHeartbeat();
  }

  /**
   * Whether we are connected.
   */
  get connected(): boolean {
    return this._connected;
  }

  private resetHeartbeat() {
    if (this.heartbeatTimeout !== null) clearTimeout(this.heartbeatTimeout);
    if (this._connected) {
      this.heartbeatTimeout = setTimeout(
        this.heartbeat,
        this.heartbeatInterval
      );
    } else this.heartbeatTimeout = null;
  }

  private heartbeat = () => {
    if (this.connected) {
      super.sendCRDT(PresenceMessage.encode({ heartbeat: true }).finish());
    }
    this.resetHeartbeat();
  };

  protected receiveCRDT(
    message: string | Uint8Array,
    meta: UpdateMeta,
    _crdtMeta: CRDTMessageMeta
  ): void {
    // Ignore own messages. Their methods emit their own events.
    if (meta.isLocalOp) return;
    // Before joining (= first connection), ignore remote messages,
    // in case they are being replayed as part of loading (hence are old).
    // Instead, we'll get up-to-date states in response to joining.
    if (!this.joined) return;

    const decoded = PresenceMessage.decode(<Uint8Array>message);

    switch (decoded.type) {
      case "heartbeat": {
        this.processHeartbeat(null, meta);
        break;
      }
      case "set": {
        const set = decoded.set as PresenceSetMessage;
        if (set.isResponse && this.state.has(meta.senderID)) {
          // It's a response that (probably) just repeats our current state.
          // Treat as a heartbeat, to avoid a redundant event.
          this.processHeartbeat(null, meta);
        } else {
          const value = this.updateSerializer.deserialize(set.value) as V;
          this.processHeartbeat(value, meta);
        }
        if (set.isJoin) this.sendResponse();
        break;
      }
      case "update": {
        // Single-field update.
        const info = this.state.get(meta.senderID);
        if (info === undefined) {
          // We don't have the state to update; treat as a heartbeat, which
          // will trigger us to request the full state.
          this.processHeartbeat(null, meta);
        } else {
          const newValue = {
            ...info.value,
            ...this.updateSerializer.deserialize(decoded.update),
          };
          this.processHeartbeat(newValue, meta);
        }
        break;
      }
      case "disconnect": {
        // Delete the entry. If they reconnect, they'll resend their whole state.
        const info = this.state.get(meta.senderID);
        if (info !== undefined) {
          if (info.timeout !== null) clearTimeout(info.timeout);
          this.state.delete(meta.senderID);
          this._size--;
          this.emit("Delete", { key: meta.senderID, value: info.value, meta });
        }
        break;
      }
      case "request": {
        if (decoded.request === this.runtime.replicaID) this.sendResponse();
        // Requests don't count as a heartbeat.
        break;
      }
    }
  }

  /**
   * @param time The time of receipt. Defaults to now.
   */
  private processHeartbeat(
    newValue: V | null,
    meta: UpdateMeta,
    time = Date.now()
  ): void {
    let info = this.state.get(meta.senderID);
    if (info === undefined) {
      if (newValue === null) {
        // The sender has state but we don't know it; request it.
        // Send in a separate task because Collabs does not allow
        // send-during-receive.
        // OPT: Wait a bit after connecting, since our join may have already
        // triggered a response.
        setTimeout(
          () =>
            super.sendCRDT(
              PresenceMessage.encode({
                request: meta.senderID,
              }).finish()
            ),
          // Requests don't count as heartbeats, so don't call resetHeartbeat().
          0
        );
        return;
      } else {
        info = { value: newValue, present: false, time: 0, timeout: null };
        this.state.set(meta.senderID, info);
      }
    }

    const previousValue = info.present
      ? Optional.of(info.value)
      : Optional.empty<V>();
    if (newValue !== null) info.value = newValue;
    if (info.timeout !== null) clearTimeout(info.timeout);
    // Loading might give us a causally newer value but with an earlier timestamp
    // than our current value. Take the max to avoid going backwards.
    info.time = Math.max(info.time, time);
    const ttlRemaining = info.time + this.ttlMS - Date.now();
    if (ttlRemaining > 0) {
      // The entry is now present.
      if (!info.present) this._size++;
      info.present = true;
      info.timeout = setTimeout(
        () => this.processTimeout(meta.senderID, info!, meta),
        ttlRemaining
      );

      if (!previousValue.isPresent || newValue !== null) {
        // The value changed (possibly from timedout to not-timedout)
        // and is present.
        this.emit("Set", {
          key: meta.senderID,
          value: info.value,
          previousValue,
          meta,
        });
      }
    } else info.timeout = null;
  }

  private processTimeout(senderID: string, info: Info<V>, meta: UpdateMeta) {
    info.timeout = null;
    if (!info.present) return;
    info.present = false;
    this._size--;
    this.emit("Delete", { key: senderID, value: info.value, meta });
  }

  /**
   * If connected, sends our state in response to a request/join.
   */
  private sendResponse() {
    // Send in a separate task because Collabs does not allow
    // send-during-receive.
    // OPT: wait a minimum amount of time between responses, to avoid flooding
    // at startup.
    setTimeout(() => {
      if (!this.connected) return;
      super.sendCRDT(
        PresenceMessage.encode({
          set: {
            value: this.updateSerializer.serialize(this.ourValue!),
            isResponse: true,
          },
        }).finish()
      );
      this.resetHeartbeat();
    });
  }

  /**
   * Returns our value, i.e., the value at key [[IRuntime.replicaID]].
   */
  getOurs(): V | undefined {
    return this.ourValue ?? undefined;
  }

  /**
   * Returns the value associated to key `replicaID`, or undefined if
   * `replicaID` is not present.
   */
  get(replicaID: string): V | undefined {
    if (replicaID === this.runtime.replicaID) return this.getOurs();
    const info = this.state.get(replicaID);
    if (info === undefined || !info.present) return undefined;
    return info.value;
  }

  /**
   * Returns whether key `replicaID` is present in the map.
   */
  has(replicaID: string): boolean {
    return this.get(replicaID) !== undefined;
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
   * it may differ on replicas with the same value.
   */
  *entries(): IterableIterator<[string, V]> {
    if (this.ourValue !== null) yield [this.runtime.replicaID, this.ourValue];
    for (const [key, info] of this.state) {
      if (info.present) yield [key, info.value];
    }
  }

  /**
   * Returns an iterator for entries in the map.
   *
   * The iteration order is NOT eventually consistent:
   * it may differ on replicas with the same value.
   */
  [Symbol.iterator](): IterableIterator<[string, V]> {
    return this.entries();
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
    thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
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

  /**
   * Returns an iterator for keys (replicaIDs) in the map.
   *
   * The iteration order is NOT eventually consistent:
   * it may differ on replicas with the same state.
   */
  *keys(): IterableIterator<string> {
    for (const [key] of this) yield key;
  }

  /**
   * Returns an iterator for values in the map.
   *
   * The iteration order is NOT eventually consistent:
   * it may differ on replicas with the same state.
   */
  *values(): IterableIterator<V> {
    for (const [, value] of this) yield value;
  }

  protected saveCRDT(): Uint8Array {
    const state: Record<string, IPresenceInfoSave> = {};
    for (const [replicaID, info] of this.state) {
      if (info.present) {
        state[replicaID] = {
          value: this.updateSerializer.serialize(info.value),
          time: info.time,
        };
      }
    }
    if (this.connected) {
      state[this.runtime.replicaID] = {
        value: this.updateSerializer.serialize(this.ourValue!),
        time: Date.now(),
      };
    }
    return PresenceSave.encode({ state }).finish();
  }

  protected loadCRDT(
    savedState: Uint8Array | null,
    meta: UpdateMeta,
    crdtMeta: CRDTSavedStateMeta
  ): void {
    if (savedState === null) return;

    const decoded = PresenceSave.decode(savedState);
    for (const [replicaID, infoSave] of Object.entries(decoded.state)) {
      if (
        crdtMeta.remoteVectorClock.get(replicaID) >
        crdtMeta.localVectorClock.get(replicaID)
      ) {
        // The saved entry is newer; use it.
        // Note this also causes us to skip overwriting our own value.
        const value = this.updateSerializer.deserialize(infoSave.value) as V;
        let time = int64AsNumber(infoSave.time);
        if (time > Date.now()) {
          // Impossible future time due to clock drift.
          // Reverse the drift direction so that in case of clock desync,
          // both users timeout for each other simultaneously
          // (neglecting network latency).
          time = 2 * Date.now() - time;
        }
        // Process the value and emit events if appropriate.
        this.processHeartbeat(value, meta, time);
      }
    }
  }
}

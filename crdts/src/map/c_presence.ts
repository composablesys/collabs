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
 * - may want to hide other entries if you know they're unreachable (e.g. you're disconnected)
 * - prefer set once, update throughout: less traffic
 * - version changes could lead to type-proof undefineds; use defaults if you do that.
 * - designed to work okay with op and state-based networks, incl p2p, but is imperfect at detecting online/offline (slow start, ttl). So you may wish to do your own thing if you have (e.g.) a server that reliably describes presence.
 * - map includes us once set for the first time,
 * regardless of current connection status.
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
   * The default [[ttlMS]]: 10 seconds.
   */
  static readonly TTL_MS_DEFAULT = 10000;

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

  updateOurs<K extends keyof V & string>(
    property: K,
    propertyValue: V[K]
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
   * Disconnection affects others' view of you, but not your own view (you even still process received updates).
   * Though you may want to hide/fade other users if you can't see their changes
   * anymore.
   */
  disconnect(): void {
    if (!this._connected) return;

    super.sendCRDT(PresenceMessage.encode({ disconnect: true }).finish());
    this._connected = false;
    // Stop heartbeats.
    this.resetHeartbeat();
  }

  get connected(): boolean {
    return this._connected;
  }

  private resetHeartbeat() {
    if (this.heartbeatTimeout !== null) clearTimeout(this.heartbeatTimeout);
    if (!this.connected) {
      this.heartbeatTimeout = null;
      return;
    }
    this.heartbeatTimeout = setTimeout(this.heartbeat, this.heartbeatInterval);
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
    // Ignore own messages. Their methods emit events, for consistency with
    // disconnected periods.
    if (meta.isLocalOp) return;
    // Before joining (= first connection), ignore remote messages,
    // in case they are being replayed as part of loading (hence are old).
    // Instead, we'll get up-to-date states from joining.
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
   *
   * @param newValue
   * @param meta
   * @param time The time of receipt. Defaults to now.
   * @returns
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
    }
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
   *
   * TODO: even if disconnected (= not present in other replicas).
   */
  getOurs(): V | undefined {
    return this.ourValue ?? undefined;
  }

  /**
   * Returns the value associated to key `replicaID`, or undefined if
   * `replicaID` is not present.
   *
   * Don't mutate return values
   */
  get(replicaID: string): V | undefined {
    if (replicaID === this.runtime.replicaID) return this.getOurs();
    const info = this.state.get(replicaID);
    if (info === undefined || !info.present) return undefined;
    else return info.value;
  }

  /**
   * Returns whether key `replicaID` is present in the map.
   */
  has(replicaID: string): boolean {
    if (replicaID === this.runtime.replicaID) return this.ourValue !== null;
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

  *keys(): IterableIterator<string> {
    for (const [key] of this) yield key;
  }

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

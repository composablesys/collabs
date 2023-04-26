import { CObject } from "../base_collabs";
import { InitToken, UpdateMeta } from "../core";
import { MapEventsRecord } from "../data_types";
import {
  DefaultSerializer,
  Optional,
  OptionalSerializer,
  Serializer,
} from "../util";
import { CMessenger, MessengerEvent } from "./c_messenger";

const TTL_MS_DEFAULT = 30000;

/**
 * A map for sharing *awareness info* between replicas, e.g., cursor positions
 * or user presence.
 *
 * Each replica controls a fixed key, namely, its [[IRuntime.replicaID]].
 * Its value should contain awareness info about itself, e.g.,
 * its user's latest cursor location in a collaborative text editor.
 *
 * Values are ephemeral: they expire at a fixed interval after they are received
 * (30 seconds by default), and they are not saved.
 * This helps ensure that you only see values for currently-online peers.
 *
 * When a value is deleted due to its expiration, we emit a [[MapEventsRecord.Delete]]
 * event as usual, with its `e.meta.isLocalOp` field set to true.
 *
 * Values must be internally immutable;
 * mutating a value internally will not change it on
 * other replicas. Consider storing a JSON value and overwriting the whole
 * value when a property changes, or using a separate CAwarenessMap for each
 * property.
 *
 * See also:
 * - [[CValueMap]]: for an ordinary collaborative map.
 * - [[CMessenger]]: for sending ephemeral (non-saved) messages in general.
 *
 * @typeParam V The value type.
 */
export class CAwarenessMap<V> extends CObject<MapEventsRecord<string, V>> {
  private readonly messenger: CMessenger<Optional<V>>;

  private readonly state = new Map<string, V>();
  private readonly timeoutIDs = new Map<
    string,
    ReturnType<typeof setTimeout>
  >();

  /**
   * The time-to-live for received values in milliseconds,
   * i.e., how long until a value expires locally. The time is measured from
   * when we receive the value, not when it was sent.
   *
   * Configure using the constructor's `options.ttlMS`.
   * Defaults to 30000 (30 seconds).
   */
  readonly ttlMS: number;

  /**
   * Constructs a CAwarenessMap.
   *
   * @param options.valueSerializer Serializer for values. Defaults to [[DefaultSerializer]].
   * @param options.ttlMS The value of [[ttlMS]].
   * Defaults to 30000 (30 seconds).
   */
  constructor(
    init: InitToken,
    options: {
      valueSerializer?: Serializer<V>;
      ttlMS?: number;
    } = {}
  ) {
    super(init);

    this.ttlMS = options?.ttlMS ?? TTL_MS_DEFAULT;

    const valueSerializer =
      options?.valueSerializer ?? DefaultSerializer.getInstance();
    this.messenger = super.registerCollab(
      "",
      (init) =>
        new CMessenger(init, {
          messageSerializer: OptionalSerializer.getInstance(valueSerializer),
        })
    );
    this.messenger.on("Message", (e) => this.onMessage(e));
  }

  /**
   * Sets our value, i.e., the value at key [[IRuntime.replicaID]].
   *
   * Since the value expires after [[ttlMS]], you should call this method
   * slightly more often, even if your value has not changed.
   */
  setOurs(value: V): void {
    this.messenger.sendMessage(Optional.of(value));
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
    this.messenger.sendMessage(Optional.empty());
  }

  private onMessage(e: MessengerEvent<Optional<V>>): void {
    const replicaID = e.meta.senderID;

    if (e.message.isPresent) {
      // Set operation.
      const value = e.message.get();

      let previousValue: Optional<V>;
      if (this.state.has(replicaID)) {
        previousValue = Optional.of(this.state.get(replicaID)!);
        clearTimeout(this.timeoutIDs.get(replicaID)!);
        this.timeoutIDs.delete(replicaID);
      } else previousValue = Optional.empty();

      this.state.set(replicaID, value);
      const timeoutID = setTimeout(() => {
        this.deleteLocally(replicaID);
      }, this.ttlMS);
      this.timeoutIDs.set(replicaID, timeoutID);

      // We emit even if it's redundant (e.g., the sender is re-setting its value
      // to indicate that it's still present). That way, you can lazily update
      // cursor indices, by moving a shared cursor to the current index on
      // every Set event instead of every time the text changes (which can
      // change the cursor's index even if its Position stayed the same).
      this.emit("Set", {
        key: replicaID,
        value,
        previousValue,
        meta: e.meta,
      });
    } else {
      // Delete operation.
      this.deleteLocallyInternal(replicaID, e.meta);
    }
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
    if (!this.state.has(replicaID)) return;

    if (meta === null) {
      meta = {
        updateType: "message",
        senderID: this.runtime.replicaID,
        isLocalOp: true,
        runtimeExtra: undefined,
      };
    }

    const value = this.state.get(replicaID)!;
    this.state.delete(replicaID);
    clearTimeout(this.timeoutIDs.get(replicaID)!);
    this.timeoutIDs.delete(replicaID);

    this.emit("Delete", {
      key: replicaID,
      value,
      meta,
    });
  }

  /**
   * Returns the value associated to key `replicaID`, or undefined if
   * `replicaID` is not present.
   */
  get(replicaID: string): V | undefined {
    return this.state.get(replicaID);
  }

  /**
   * Returns whether key `replicaID` is present in the map.
   */
  has(replicaID: string): boolean {
    return this.state.has(replicaID);
  }

  /**
   * The number of present keys in the map.
   */
  get size(): number {
    return this.state.size;
  }

  /**
   * Returns an iterator for entries in the map.
   *
   * The iteration order is NOT eventually consistent:
   * it may differ on replicas with the same state.
   */
  [Symbol.iterator](): IterableIterator<[string, V]> {
    return this.state.entries();
  }

  /**
   * Returns an iterator of key (replicaID), value pairs for every entry in the map.
   *
   * The iteration order is NOT eventually consistent:
   * it may differ on replicas with the same state.
   */
  entries(): IterableIterator<[string, V]> {
    return this.state.entries();
  }

  /**
   * Returns an iterator for keys (replicaIDs) in the map.
   *
   * The iteration order is NOT eventually consistent:
   * it may differ on replicas with the same state.
   */
  keys(): IterableIterator<string> {
    return this.state.keys();
  }

  /**
   * Returns an iterator for values in the map.
   *
   * The iteration order is NOT eventually consistent:
   * it may differ on replicas with the same state.
   */
  values(): IterableIterator<V> {
    return this.state.values();
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
}

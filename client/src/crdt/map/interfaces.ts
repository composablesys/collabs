// // TODO: for now, include all resets because it's easier.
// // Might want to split into Base and Resettable versions,
// // but that's just for micro-optimizers, so can leave until
// // later.  For now, throw UnimplementedException or similar.
//
// // TODO: events
// // TODO: extend Crdt?
//
// // Types based on those for ES6 Maps/Sets/Arrays.
// // https://github.com/microsoft/TypeScript/blob/master/src/lib/es2015.collection.d.ts
// // https://github.com/microsoft/TypeScript/blob/master/src/lib/es2015.iterable.d.ts
//
// // Opaque collections.  Values obey (any) register semantics, if you set them (only the case for Map values).
// // The values themselves, if objects, should be immutable,
// // unless they're CRDTs (but then consider C-versions, e.g.
// // so you can watch changes).
// // Methods to convert to the original type are not
// // necessary because you can do new Map(map),
// // new Set(), or [...list].
//
// // TODO: keyOf, etc. methods from LazyCrdtMap
// // TODO: for Riak semantics: instead of weird set add thing,
// // do (set contains || value is nontrivial).  More efficient,
// // doesn't need runLocally, and semantically more sensible.
// // Could also have a more general containedness condition,
// // although might make more sense implemented by end-users
// // (especially if we add getIgnoreHas or similar).
//
// // A map from keys to opaque values, with (any) register
// // semantics for values.
// export interface PlainMap<K, V> extends Resettable {
//   /** Alias for reset(). */
//   clear(): void;
//   delete(key: K): boolean;
//   // TODO
//   // forEach(
//   //   callbackfn: (value: V, key: K, map: Map<K, V>) => void,
//   //   thisArg?: any
//   // ): void;
//
//   get(key: K): V | undefined;
//   has(key: K): boolean;
//   set(key: K, value: V): this;
//   readonly size: number;
//
//   /** Returns an iterable of entries in the map. */
//   [Symbol.iterator](): IterableIterator<[K, V]>;
//
//   /**
//    * Returns an iterable of key, value pairs for every entry in the map.
//    */
//   entries(): IterableIterator<[K, V]>;
//
//   /**
//    * Returns an iterable of keys in the map
//    */
//   keys(): IterableIterator<K>;
//
//   /**
//    * Returns an iterable of values in the map
//    */
//   values(): IterableIterator<V>;
// }
//
// // CRDT collections.  Values are controlled by
// // CRDTs explicitly, instead of being primitive and
// // controlled by registers.
// // They may (but don't always) obey Riak map semantics:
// // multiple creations/sets merge all ops, you can't
// // overwrite a value.  Remove semantics can vary:
// // Riak map (reset & revive on concurrent ops);
// // Yjs (delete forever); mixed (e.g. revive on
// // concurrent ops but don't reset - not GC-able
// // though).
// // TODO: change "value" to "valueCrdt" throughout?
// // TODO: find/indexOf type methods, since you know
// // values are unique?  Can do the same for ordinary types
// // too (return first/arbitrary instance).
// // Likewise, delete(value)/deleteAll(values) methods.
// // Although I suppose you can implement those yourself?
//
// // TODO: same as Map above, but with values controlled
// // by implicitly-initialized Crdt's.  Any semantics.
// export interface CrdtMap<K, C extends Crdt> extends Resettable {
//   /** Alias for reset(). */
//   clear(): void;
//   delete(key: K): boolean;
//   // TODO
//   // forEach(
//   //   callbackfn: (value: V, key: K, map: Map<K, V>) => void,
//   //   thisArg?: any
//   // ): void;
//
//   get(key: K): C | undefined;
//   getForce(key: K): C;
//   has(key: K): boolean;
//   addKey(key: K): this;
//   readonly size: number;
//
//   /** Returns an iterable of entries in the map. */
//   [Symbol.iterator](): IterableIterator<[K, C]>;
//
//   /**
//    * Returns an iterable of key, value pairs for every entry in the map.
//    */
//   entries(): IterableIterator<[K, C]>;
//
//   /**
//    * Returns an iterable of keys in the map
//    */
//   keys(): IterableIterator<K>;
//
//   /**
//    * Returns an iterable of values in the map
//    */
//   values(): IterableIterator<C>;
// }

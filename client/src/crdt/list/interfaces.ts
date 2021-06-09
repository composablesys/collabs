// TODO
export interface CrdtList {}

// // A list of opaque elements, supporting insert, delete,
// // and move, with any semantics.
// // TODO: way to access seqIds (e.g. expose the underlying
// // binary tree).
// // TODO: version of list that maps seqIds to themselves
// export interface PlainList<T> extends Resettable {
//   /** Alias for reset(). */
//   clear(): void;
//   // throws an error if out of bounds
//   get(index: number): T;
//   set(index: number, value: T): this;
//   /**
//    * Removes the last element from an array and returns it.
//    * If the array is empty, undefined is returned and the array is not modified.
//    */
//   pop(): T | undefined;
//   /**
//    * Appends new elements to the end of an array, and returns the new length of the array.
//    * @param items New elements to add to the array.
//    */
//   push(...items: T[]): number;
//   /**
//    * Inserts new elements at the start of an array, and returns the new length of the array.
//    * @param items Elements to insert at the start of the array.
//    */
//   unshift(...items: T[]): number;
//   /**
//    * Removes the first element from an array and returns it.
//    * If the array is empty, undefined is returned and the array is not modified.
//    */
//   shift(): T | undefined;
//   /**
//    * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
//    * @param start The zero-based location in the array from which to start removing elements.
//    * @param deleteCount The number of elements to remove.
//    * @returns An array containing the elements that were deleted.
//    */
//   splice(start: number, deleteCount?: number): T[];
//   /**
//    * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
//    * @param start The zero-based location in the array from which to start removing elements.
//    * @param deleteCount The number of elements to remove.
//    * @param items Elements to insert into the array in place of the deleted elements.
//    * @returns An array containing the elements that were deleted.
//    */
//   splice(start: number, deleteCount: number, ...items: T[]): T[];
//   // TODO: semantics: movement does an insertion (not
//   // overwriting the existing toIndex), and toIndex is
//   // done relative to the current state, not the state
//   // after deleting fromIndex (which may shift toIndex's
//   // meaning 1 to the right).  moves count elements,
//   // works even if overlapping.
//   move(fromIndex: number, toIndex: number, count?: number): this;
//   // TODO
//   // /**
//   //  * Performs the specified action for each element in an array.
//   //  * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
//   //  * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
//   //  */
//   // forEach(
//   //   callbackfn: (value: T, index: number, array: T[]) => void,
//   //   thisArg?: any
//   // ): void;
//   // /**
//   //  * Reverses the elements in an array in place.
//   //  * This method mutates the array and returns a reference to the same array.
//   //  */
//   // reverse(): T[];
//
//   readonly size: number;
//
//   /**
//    * Returns an iterable of [index,entry] pairs for every entry in the list.
//    */
//   entries(): IterableIterator<[number, T]>;
//
//   /**
//    * Returns an iterable of values in the list.
//    */
//   values(): IterableIterator<T>;
//
//   /** Alias for values(). */
//   [Symbol.iterator](): IterableIterator<T>;
//
//   // TODO: include?  Same Q for other array inspection
//   // methods that could run in sublinear time,
//   // but will run in linear time if you copy this
//   // to an array and then use the array method (e.g. some).
//   /**
//    * Returns a copy of a section of an array.
//    * For both start and end, a negative index can be used to indicate an offset from the end of the array.
//    * For example, -2 refers to the second to last element of the array.
//    * @param start The beginning index of the specified portion of the array.
//    * If start is undefined, then the slice begins at index 0.
//    * @param end The end index of the specified portion of the array. This is exclusive of the element at the index 'end'.
//    * If end is undefined, then the slice extends to the end of the array.
//    */
//   slice(start?: number, end?: number): T[];
// }
//
// // TODO: remove fluency (redundant this return values),
// // in case a subclass wants to overwrite them?
//
// // Not allowing revivals (Yjs semantics) lets you
// // avoid making elements direct children; instead you can
// // use a CrdtSet to hold the children, with arbitrary
// // initializers, and the CrdtSet will id them by unique ids.
// // That will make their names shorter (no seqId).
// export interface CrdtList<C extends Crdt> extends Resettable {
//   /** Alias for reset(). */
//   clear(): void;
//   // throws an error if out of bounds
//   get(index: number): C;
//   // TODO: create instead of insert?  For consistency
//   // with set.  I find insert more intuitive, although
//   // we would run into trouble if we later wanted
//   // to add it to PList (instead of just having splice).
//   insert(index: number): C;
//   insertRange(index: number, count: number): C[];
//   delete(index: number): void;
//   deleteRange(index: number, count: number): void;
//   // TODO: semantics: movement does an insertion (not
//   // overwriting the existing toIndex), and toIndex is
//   // done relative to the current state, not the state
//   // after deleting fromIndex (which may shift toIndex's
//   // meaning 1 to the right).  moves count elements,
//   // works even if overlapping.
//   move(fromIndex: number, toIndex: number, count?: number): this;
//   // TODO
//   // /**
//   //  * Performs the specified action for each element in an array.
//   //  * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
//   //  * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
//   //  */
//   // forEach(
//   //   callbackfn: (value: T, index: number, array: T[]) => void,
//   //   thisArg?: any
//   // ): void;
//   // /**
//   //  * Reverses the elements in an array in place.
//   //  * This method mutates the array and returns a reference to the same array.
//   //  */
//   // reverse(): T[];
//
//   readonly size: number;
//
//   /**
//    * Returns an iterable of [index,entry] pairs for every entry in the list.
//    */
//   entries(): IterableIterator<[number, C]>;
//
//   /**
//    * Returns an iterable of values in the list.
//    */
//   values(): IterableIterator<C>;
//
//   /** Alias for values(). */
//   [Symbol.iterator](): IterableIterator<C>;
//
//   // TODO: include?  Same Q for other array inspection
//   // methods that could run in sublinear time,
//   // but will run in linear time if you copy this
//   // to an array and then use the array method (e.g. some).
//   /**
//    * Returns a copy of a section of an array.
//    * For both start and end, a negative index can be used to indicate an offset from the end of the array.
//    * For example, -2 refers to the second to last element of the array.
//    * @param start The beginning index of the specified portion of the array.
//    * If start is undefined, then the slice begins at index 0.
//    * @param end The end index of the specified portion of the array. This is exclusive of the element at the index 'end'.
//    * If end is undefined, then the slice extends to the end of the array.
//    */
//   slice(start?: number, end?: number): C[];
// }

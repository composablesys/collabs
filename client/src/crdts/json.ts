// import { CrdtObject, MapCrdt, EnableWinsFlag, IntRegisterCrdt, AddWinsSet } from "./standard";
// import { Crdt } from "./crdt_core";
// import { MultiValueRegister } from "./basic_crdts";
// import { CrdtRuntime } from "../network";
//
// interface JsonIndexType {
//     [key: string]: any;
// }
//
// export class JsonCrdt extends CrdtObject<string, Crdt<any>> {
//     private readonly booleans: MapCrdt<string, EnableWinsFlag>;
//     // TODO: dwFlags too?
//     private readonly numbers: MapCrdt<string, IntRegisterCrdt>;
//     private readonly strings: MapCrdt<string, MultiValueRegister<string>>;
//     private readonly sets: MapCrdt<string, AddWinsSet<any>>;
//     // TODO: RWSets too?
//     private readonly objects: MapCrdt<string, JsonCrdt>;
//     // TODO: arrays (sequences).  Uses maps for now.
//     // TODO: nulls?
//
//     // TODO: ability to pass initial value (which is not synced).
//     // More generally, ability to perform operations on your
//     // predefined properties that are not synced?
//     // Use the existing flag and block messages in CrdtObject.
//     constructor(crdtId: any, runtime: CrdtRuntime) {
//         super(crdtId, runtime);
//         this.startPredefinedPropertyCreation();
//         this.booleans = new MapCrdt(
//             "booleans", this, (key, internalRuntime) =>
//             new EnableWinsFlag(key, internalRuntime)
//         );
//         this.numbers = new MapCrdt(
//             "numbers", this, (key, internalRuntime) =>
//             new IntRegisterCrdt(key, internalRuntime)
//         );
//         this.strings = new MapCrdt(
//             "strings", this, (key, internalRuntime) =>
//             new MultiValueRegister<string>(key, internalRuntime)
//         );
//         this.sets = new MapCrdt(
//             "sets", this, (key, internalRuntime) =>
//             new AddWinsSet(key, internalRuntime)
//         );
//         this.objects = new MapCrdt(
//             "objects", this, (key, internalRuntime) =>
//             new JsonCrdt(key, internalRuntime)
//         );
//         this.endPredefinedPropertyCreation();
//     }
//     /**
//      * Return the Crdt value at the given key storing
//      * values with the same type as typeIndicator,
//      * or undefined if the key is not present (including
//      * if it previously was present but was removed).
//      * (Use init instead if you want a guaranteed-defined
//      * return value.)
//      * (TODO: explain keys are
//      * segregated by value type).
//      * E.g. get("a", 0) to get the number value with key 0.
//      * Standard typeIndicator values:
//      * - false: boolean (EnableWinsFlag)
//      * - 0: number (IntRegisterCrdt)
//      * - "": string (MultiValueRegister<string>)
//      * - new Set(): set (AddWinsSet)
//      * - {}: object (JsonCrdt)
//      *
//      * TODO: explictly typed versions?  Can we do this cleverly
//      * with generics and type polymorphism or something?
//      *
//      * @param  key           [description]
//      * @param  typeIndicator [description]
//      * @return               [description]
//      */
//     get(key: string, typeIndicator: boolean | number | string |
//             Set<any> | Object) {
//         switch (typeof typeIndicator) {
//             case "boolean": return this.booleans.get(key);
//             case "number": return this.numbers.get(key);
//             case "string": return this.strings.get(key);
//             case "object":
//                 if (typeIndicator instanceof Set) {
//                     return this.sets.get(key);
//                 }
//                 else return this.objects.get(key);
//             default:
//                 throw new Error("Unrecognized typeIndicator type: " +
//                         (typeof typeIndicator) + " (" + typeIndicator + ")");
//         }
//     }
//     has(key: string, typeIndicator: boolean | number | string |
//             Set<any> | Object) {
//         switch (typeof typeIndicator) {
//             case "boolean": return this.booleans.has(key);
//             case "number": return this.numbers.has(key);
//             case "string": return this.strings.has(key);
//             case "object":
//                 if (typeIndicator instanceof Set) {
//                     return this.sets.has(key);
//                 }
//                 else return this.objects.has(key);
//             default:
//                 throw new Error("Unrecognized typeIndicator type: " +
//                         (typeof typeIndicator) + " (" + typeIndicator + ")");
//         }
//     }
//     delete(key: string, typeIndicator: boolean | number | string |
//             Set<any> | Object) {
//         switch (typeof typeIndicator) {
//             case "boolean": this.booleans.delete(key); return;
//             case "number": this.numbers.delete(key); return;
//             case "string": this.strings.delete(key); return;
//             case "object":
//                 if (typeIndicator instanceof Set) {
//                     this.sets.delete(key); return;
//                 }
//                 else this.objects.delete(key); return;
//             default:
//                 throw new Error("Unrecognized typeIndicator type: " +
//                         (typeof typeIndicator) + " (" + typeIndicator + ")");
//         }
//     }
//     /**
//      * Like get, but instead of returning the value Crdt,
//      * returns its value.  Note for strings, if the Crdt
//      * does not have a single value (either or 2+),
//      * which is possible due to the MultiValueRegister
//      * semantics, we return the set of all current values
//      * instead of a single string.
//      *
//      * TODO: use generics to say that return value is
//      * same as typeIndicator type | undefined?
//      * Works except for strings,
//      * which could instead return a Set<string>.
//      * Could instead have specifically typed versions of the method.
//      */
//     getValue(key: string, typeIndicator: boolean | number | string |
//             Set<any> | Object):
//             boolean | number | string | Set<string> | Set<any> | Object | undefined {
//         let valueCrdt = this.get(key, typeIndicator);
//         if (valueCrdt === undefined) return undefined;
//         else {
//             if (valueCrdt instanceof MultiValueRegister) {
//                 let valueSet = valueCrdt.valueSet;
//                 if (valueSet.size === 1) {
//                     return valueSet.values().next().value;
//                 }
//                 else return valueSet;
//             }
//             else return valueCrdt.value;
//         }
//     }
//     /**
//      * Initializes/revives the given key with the indicated type if
//      * needed, making it present in the state
//      * @param  key           [description]
//      * @param  typeIndicator [description]
//      * @return the value Crdt.
//      */
//     init(key: string, typeIndicator: boolean | number | string |
//             Set<any> | Object) {
//         // TODO: can we generify this function pattern?
//         switch (typeof typeIndicator) {
//             case "boolean": return this.booleans.init(key);
//             case "number": return this.numbers.init(key);
//             case "string": return this.strings.init(key);
//             case "object":
//                 if (typeIndicator instanceof Set) {
//                     return this.sets.init(key);
//                 }
//                 else return this.objects.init(key);
//             default:
//                 throw new Error("Unrecognized typeIndicator type: " +
//                         (typeof typeIndicator) + " (" + typeIndicator + ")");
//         }
//     }
//     /**
//      * Sets the value at the given key to a copy of the given
//      * (non-Crdt) value, using the Crdt's .value = method.
//      * This generally has the effect of resetting the current Crdt
//      * and then performing operations to drive it to the desired
//      * value.  If you want more control over how the value is set
//      * (e.g., passing an option to JsonCrdt.getAsObject when setting
//      * an object's value), you can instead get the Crdt with
//      * this.init(key, value) and then perform operations on it
//      * directly.
//      *
//      * @param  key           [description]
//      * @param  value [description]
//      * @return The resulting value Crdt (this.get(key, value)).
//      */
//     setValue(key: string, value: boolean | number | string |
//             Set<any> | Object) {
//         this.startTransaction();
//         let valueCrdt = this.setValueInternal(key, value);
//         this.endTransaction();
//         return valueCrdt;
//     }
//
//     private setValueInternal(key: string, value: boolean | number | string |
//             Set<any> | Object) {
//         let valueCrdt = this.init(key, value);
//         valueCrdt.value = value;
//         return valueCrdt;
//     }
//
//     keysByType(typeIndicator: boolean | number | string |
//             Set<any> | Object) {
//         switch (typeof typeIndicator) {
//             case "boolean": return this.booleans.keys();
//             case "number": return this.numbers.keys();
//             case "string": return this.strings.keys();
//             case "object":
//                 if (typeIndicator instanceof Set) {
//                     return this.sets.keys();
//                 }
//                 else return this.objects.keys();
//             default:
//                 throw new Error("Unrecognized typeIndicator type: " +
//                         (typeof typeIndicator) + " (" + typeIndicator + ")");
//         }
//     }
//     /**
//      * @return Array of [key, type name] pairs
//      */
//     keys() {
//         let result: Array<[string, string]> = [];
//         for (let key of this.booleans.keys()) result.push([key, "boolean"]);
//         for (let key of this.numbers.keys()) result.push([key, "number"]);
//         for (let key of this.strings.keys()) result.push([key, "string"]);
//         for (let key of this.sets.keys()) result.push([key, "set"]);
//         for (let key of this.objects.keys()) result.push([key, "object"]);
//         return result;
//     }
//
//     // TODO: delete
//     // TODO: deleteStrong (once map supports it.  Perhaps throw
//     // error on map values only?)
//
//     static readonly ErrorOnConflict = 1;
//     static readonly PrefixTypes = 2;
//     static readonly ExpandOnConflict = 3;
//     private static checkKeyConflictRule(keyConflictRule: number) {
//         if (!(keyConflictRule === JsonCrdt.PrefixTypes ||
//                 keyConflictRule === JsonCrdt.ErrorOnConflict ||
//                 keyConflictRule === JsonCrdt.ExpandOnConflict)) {
//             throw new Error("Unrecognized keyConflictRule: " +
//                 keyConflictRule);
//         }
//     }
//     /**
//      * Returns a copy of this Crdt's value in Object form.
//      * Changing the returned value has no effect on the Crdt state.
//      * Note that set values are converted to Javascript Sets,
//      * resulting in a not-quite-JSON format object.
//      * A string MultiValueRegister is converted to a string if it has
//      * a single value; otherwise (0 or 2+ values) it
//      * is converted to a Set<string>
//      * (Array<string> if setsAsArrays=true)
//      * of all current values.
//      *
//      * @param  keyConflictRule=JsonCrdt.ExpandOnConflict
//      * Policy for handling keys of different types that have the
//      * same name.  Options:
//      * - ErrorOnConflict (default): throw an error if there is a key conflict.
//      * - PrefixTypes: prefix the type name followed by ":" to each key,
//      * e.g. "number:myKey".  Type names are "boolean", "number",
//      * "string", "set", "object".
//      * - ExpandOnConflict: if there is a conflict on
//      * a key, set its value to equal an object containing each of
//      * the conflicting values, plus a flag "jsonCrdtKeyExpanded = true".  E.g.
//      * "myKey": {"jsonCrdtKeyExpanded": true, "string": "stringValue",
//      * "number": 7}
//      * @param setsAsArrays = false If true, Set values are converted
//      * to arrays, so that the resulting Object is in regular JSON
//      * format.  This includes Set<string> values resulting from
//      * string MultiValueRegisters that have 0 or 2+ values.
//      */
//     getAsObject(keyConflictRule = JsonCrdt.ErrorOnConflict,
//             setsAsArrays = false): Object {
//         JsonCrdt.checkKeyConflictRule(keyConflictRule);
//         let object: JsonIndexType = {};
//         // Maps keys to the name of their first type
//         let keysSoFar = new Map<string, string>();
//         let conflictedKeysSoFar = new Set<String>();
//         this.getAsObjectInternal(object, keysSoFar, conflictedKeysSoFar,
//             keyConflictRule, this.booleans, "boolean",
//             value => value.value
//         );
//         this.getAsObjectInternal(object, keysSoFar, conflictedKeysSoFar,
//             keyConflictRule, this.numbers, "number",
//             value => value.value
//         );
//         this.getAsObjectInternal(object, keysSoFar, conflictedKeysSoFar,
//             keyConflictRule, this.strings, "string",
//             value => {
//                 let result = value.valueSet;
//                 if (result.size === 1) return result.values().next().value;
//                 else return (setsAsArrays? [...result.values()]: result);
//             }
//         );
//         this.getAsObjectInternal(object, keysSoFar, conflictedKeysSoFar,
//             keyConflictRule, this.sets, "set",
//             value => (setsAsArrays? [...value.value]: value.value)
//         );
//         this.getAsObjectInternal(object, keysSoFar, conflictedKeysSoFar,
//             keyConflictRule, this.objects, "object",
//             value => value.getAsObject(keyConflictRule, setsAsArrays)
//         );
//         return object;
//     }
//     private getAsObjectInternal<V extends Crdt<any>>(
//         object: JsonIndexType, keysSoFar: Map<string, string>,
//         conflictedKeysSoFar: Set<String>, keyConflictRule: number,
//         map: MapCrdt<string, V>, typeName: string,
//         valueFunc: (valueCrdt: V) => any) {
//         for (let key of map.keys()) {
//             let value = valueFunc(map.get(key) as V);
//             if (keyConflictRule === JsonCrdt.PrefixTypes) {
//                 object[typeName + ":" + key] = value;
//             }
//             else if (keysSoFar.has(key)) {
//                 // Key conflict
//                 if (keyConflictRule === JsonCrdt.ErrorOnConflict) {
//                     throw new Error("Duplicate key: " + key
//                         + " when keyConflictRule=" +
//                         "JsonCrdt.ErrorOnConflict");
//                 }
//                 else {
//                     // keyConflictRule === JsonCrdt.ExpandOnConflict
//                     if (!conflictedKeysSoFar.has(key)) {
//                         // Expand the existing value
//                         conflictedKeysSoFar.add(key);
//                         let expanded: any = {
//                             "jsonCrdtKeyExpanded": true,
//                         };
//                         expanded[keysSoFar.get(key) as string] = object[key];
//                         object[key] = expanded;
//                     }
//                     (object[key] as JsonIndexType)[typeName] = value;
//                 }
//             }
//             else {
//                 // No key conflict
//                 object[key] = value;
//                 keysSoFar.set(key, typeName);
//             }
//         }
//     }
//     /**
//      * Resets this object and then performs operations to
//      * drive its value to the given JSON-like Object.
//      * Properties that are not booleans, numbers, strings,
//      * Sets, or objects are ignored; objects besides Sets
//      * are processed recursively.
//      *
//      * TODO: for now, arrays are converted to sets.
//      *
//      * If newValue comes from a JsonCrdt's .value or getAsObject
//      * methods, note that sets/arrays of strings resulting from
//      * multi-value registers will be treated as sets, not
//      * string values.
//      *
//      * @param  newValue The value to set to.
//      * @param newValueKeyConflictRule = JsonCrdt.ErrorOnConflict
//      * If newValue was generated by getAsObject, the keyConflictRule
//      * used to generate it, so that we can undo the effect
//      * of that rule.  Options:
//      * - ErrorOnConflict (default): keys and values are used literally,
//      * with inferred types.
//      * This is appropriate for Objects not coming from a JsonCrdt's
//      * getAsObject function, in which we want to keep keys as
//      * they are.
//      * - PrefixTypes: Types are taken from prefixes on keys.  If a
//      * key does not have a type prefix, it is ignored.
//      * - ExpandOnConflict: objects with a property "jsonCrdtKeyExpanded" set
//      * to true are interpreted as the result of expanding a
//      * key due to a conflict.  If such an object does not have
//      * the expected format, any properties with unrecognized names
//      * are ignored.
//      */
//     setToObject(newValue: Object, newValueKeyConflictRule = JsonCrdt.ErrorOnConflict) {
//         this.startTransaction();
//         this.reset();
//         this.mergeObjectInternal(newValue, newValueKeyConflictRule);
//         this.endTransaction();
//     }
//     /**
//      * Perform operations to drive this Crdt's value to the
//      * given JSON-like Object's state, but without resetting
//      * the current value.  The main effect of this is to
//      * merge keys; in case of key conflicts, the values are merged
//      * in a type-specific way (TODO: details).
//      *
//      * Note this is not a merge in the sense of a state-based Crdt.
//      * Instead, it the Crdt version of merging ordinary (non-Crdt)
//      * Objects, by recursively combining their key-value pairs.
//      *
//      * TODO: for now, arrays are converted to sets.
//      *
//      * See the description of setToObject for disclaimers and
//      * otherKeyConflictRule.
//      *
//      * TODO: return list of changes?
//      * @param  other [description]
//      */
//     mergeObject(other: Object, otherKeyConflictRule = JsonCrdt.ErrorOnConflict) {
//         this.startTransaction();
//         this.mergeObjectInternal(other, otherKeyConflictRule);
//         this.endTransaction();
//     }
//     private mergeObjectInternal(other: JsonIndexType, otherKeyConflictRule = JsonCrdt.ErrorOnConflict) {
//         JsonCrdt.checkKeyConflictRule(otherKeyConflictRule);
//
//         // Extract properties as an array of [name, type, value]
//         let properties: Array<[string, string, any]> = [];
//         for (let propName in other) {
//             let propValue = other[propName];
//             let type: string;
//             if (otherKeyConflictRule === JsonCrdt.PrefixTypes) {
//                 let index = propName.indexOf(':');
//                 type = propName.slice(0, index);
//                 propName = propName.slice(index);
//                 // Multi-valued strings are treated as sets
//                 if (type === "string" && (propValue instanceof Set || propValue instanceof Array)) {
//                     type = "set";
//                 }
//             }
//             else {
//                 type = typeof propValue;
//                 if (type === "object") {
//                     if (propValue instanceof Set || propValue instanceof Array) type = "set";
//                 }
//             }
//             properties.push([propName, type, other[propName]]);
//         }
//
//         // Note properties may grow during execution due to
//         // unpacking expanded keys.
//         let originalLength = properties.length;
//         for (let i = 0; i < properties.length; i++) {
//             let propName = properties[i][0];
//             let type = properties[i][1];
//             let propValue = properties[i][2];
//             // Check for an expanded key
//             if (otherKeyConflictRule === JsonCrdt.ExpandOnConflict &&
//                     i < originalLength &&
//                     typeof propValue === "object" &&
//                     propValue["jsonCrdtKeyExpanded"] === true) {
//                 // Unpack the object onto the end of properties
//                 for (let expandedName in propValue) {
//                     if (expandedName !== "jsonCrdtKeyExpanded") {
//                         properties.push([propName, expandedName, propValue[expandedName]]);
//                     }
//                 }
//             }
//             else {
//                 // Process the property, checking that it's type
//                 // is one we expect.
//                 if (typeof propValue === type) {
//                     if (type === "object") {
//                         // object: merge
//                         (this.init(propName, {}) as JsonCrdt).mergeObjectInternal(
//                             propValue, otherKeyConflictRule
//                         );
//                     }
//                     else if (type === "boolean" || type === "number" || type === "string") {
//                         // boolean, number, string: overwrite
//                         this.setValueInternal(propName, propValue);
//                     }
//                 }
//                 else if (type === "set" && (propValue instanceof Set || propValue instanceof Array)) {
//                     // set: add all values in set
//                     let setCrdt = this.init(propName, new Set()) as AddWinsSet<any>;
//                     for (let entry of propValue) setCrdt.add(entry);
//                 }
//                 // Else skip the entry (not a recognized type).
//             }
//         }
//     }
//
//     /**
//      * Alias for this.getAsObject().
//      */
//     get value(): Object {
//         return this.getAsObject();
//     }
//     /**
//      * Alias for this.setAsObject(newValue).
//      */
//     set value(newValue: Object) {
//         this.setToObject(newValue);
//     }
// }

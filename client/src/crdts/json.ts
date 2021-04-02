import {
    Crdt,
    CompositeCrdt,
    CrdtEvent,
    CrdtEventsRecord,
  } from "./crdt_core";
import { MultiValueRegister } from "./basic_crdts";
import { MapCrdt } from "./standard";
import { DefaultElementSerializer, ElementSerializer } from "./utils";

export interface JsonEvent extends CrdtEvent {
    readonly key: string;
    readonly value: Crdt;
  }

export interface JsonEventsRecord extends CrdtEventsRecord {
    Add: JsonEvent;
    Change: JsonEvent;
    Delete: JsonEvent;
  }

class JsonInternal {
    private readonly internalNumberMap: MapCrdt<string, MultiValueRegister<Number>>;
    private readonly internalStringMap: MapCrdt<string, MultiValueRegister<string>>;

    constructor() {
        let keySerializer : ElementSerializer<string> = DefaultElementSerializer.getInstance();
        this.internalNumberMap = new MapCrdt(() => new MultiValueRegister(), keySerializer, true);
        this.internalStringMap = new MapCrdt(() => new MultiValueRegister(), keySerializer, true);
    }

    set(key : string, val : any) {
        switch (typeof val) {
            case "string":
                this.internalNumberMap.delete(key);
                this.deleteSubKeys(key);
                let mvr_str = this.internalStringMap.getForce(key);
                mvr_str.value = val;
                break;

            case "number":
                this.internalStringMap.delete(key);
                this.deleteSubKeys(key);
                let mvr_num = this.internalNumberMap.getForce(key);
                mvr_num.value = val;
                break;
        }
    }

    get(key : string) : (number | string)[] {
        let vals : any[] = [];
        vals.push(this.internalStringMap.get(key)?.valueSet);
        vals.push(this.internalNumberMap.get(key)?.valueSet);
        return vals;
    }

    deleteSubKeys(key : string) {
        for (let anyKey of this.internalStringMap.keys()) {
            if (anyKey.includes(key + ":")) {
                this.internalStringMap.delete(anyKey)
            }
        }

        for (let anyKey of this.internalNumberMap.keys()) {
            if (anyKey.includes(key + ":")) {
                this.internalNumberMap.delete(anyKey)
            }
        }
    }

    delete(key : string) {
        this.internalStringMap.delete(key);
        this.internalNumberMap.delete(key);
        this.deleteSubKeys(key);
    }

    keys(cursor : string) : string[] {
        let keys = [];
        
        for (let anyKey of this.internalStringMap.keys()) {
            keys.push(anyKey.substring(cursor.length));
        }

        for (let anyKey of this.internalNumberMap.keys()) {
            keys.push(anyKey.substring(cursor.length));
        }
        
        return keys;
    }

    values(cursor : string) : {values : (number | string)[], nestedObjs : Set<string>} {
        let nested : Set<string> = new Set();
        let vals : (number | string)[] = []

        for (let key of this.keys(cursor)) {
            if (key.includes(":")) {
                nested.add(key.substr(0, key.indexOf(":")));
            } else {
                vals.push(...this.get(key));
            }
        }

        return {values : vals, nestedObjs : nested};
    }

    hasKey(key : string) : boolean {
        if (this.internalNumberMap.get(key) || this.internalStringMap.get(key)) {
            return true;
        }
        return false;
    }
}

export class JsonCrdt extends CompositeCrdt<JsonEventsRecord> {
    private internal : JsonInternal;
    private cursor : string;

    constructor(internal ?: JsonInternal, cursor ?: string) {
        super();

        if (!internal) internal = new JsonInternal();
        this.internal = internal;

        if (!cursor) cursor = "";
        this.cursor = cursor;
    }

    get(key : string) : (number | string)[] | JsonCrdt {
        if (this.internal.hasKey(this.cursor + key)) {
            return this.internal.get(this.cursor + key);
        } else {
            return new JsonCrdt(this.internal, this.cursor + ":" + key);
        }
    }
    
    set(key : string, val : any) { this.internal.set(this.cursor + key, val) }

    delete(key : string) { this.internal.delete(this.cursor + key) }

    keys() : string[] { return this.internal.keys(this.cursor) }

    values() : (number | string | JsonCrdt)[] {
        let intermediateVals = this.internal.values(this.cursor);
        let vals : (number | string | JsonCrdt)[] = intermediateVals.values;

        for (let key of intermediateVals.nestedObjs) {
            vals.push(new JsonCrdt(this.internal, this.cursor + ":" + key));
        }

        return vals;
    }
}
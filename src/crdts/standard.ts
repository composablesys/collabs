import { CrdtRuntime, CausalTimestamp } from "../crdt_runtime_interface";
import { Resettable, DefaultResettableCrdt } from "./resettable";
import { CounterInternal, MultRegisterInternal } from "./basic_crdts";
import { Crdt } from "./crdt_core";
import { SemidirectState, SemidirectInternal } from "./semidirect";
import { GrowOnlyMapInternal, NoOpCrdtInternal, CrdtAsCrdtInternal } from "./components";

export class UnresettableIntRegisterCrdt extends Crdt<SemidirectState<number>> {
    // semidirectInstance completely describes this semidirect product
    static semidirectInstance = new SemidirectInternal<number>(
        CounterInternal.instance, MultRegisterInternal.instance,
        (m2: number, m1: number) => m2*m1, 1
    );
    constructor(id: any, runtime: CrdtRuntime, initialData?: any) {
        super(id, IntRegisterCrdt.semidirectInstance, runtime, initialData);
    }
    increment() {
        this.add(1);
    }
    decrement() {
        this.add(-1);
    }
    add(n: number) {
        this.applyOps([1,n]);
    }
    mult(n: number) {
        this.applyOps([2,n]);
    }
    get value() : number {
        return this.state.internalState;
    }
    protected translateDescriptions(descriptions: Array<[number, number]>): [string, number] {
        let description = descriptions[0];
        if (description[0] === 1) return ["add", description[1]];
        else return ["mult", description[1]];
    }
}

export class IntRegisterCrdt extends DefaultResettableCrdt<SemidirectState<number>> {
    static semidirectInstance = new SemidirectInternal<number>(
        CounterInternal.instance, MultRegisterInternal.instance,
        (m2: number, m1: number) => m2*m1, 1
    );
    constructor(id: any, runtime: CrdtRuntime,
            initialValue: number = 0, resetValue: number = 0) {
        super(id, IntRegisterCrdt.semidirectInstance, resetValue, runtime, initialValue);
    }
    increment() {
        this.add(1);
    }
    decrement() {
        this.add(-1);
    }
    add(n: number) {
        this.applyOps([1, n]);
    }
    mult(n: number) {
        this.applyOps([2, n]);
    }
    get value() : number {
        return this.originalStateResettable.internalState;
    }
    /**
     * Performs an equivalent add.  As a consequence,
     * counter.value += n and counter.value -= n work
     * as expected (converted to CRDT additions).
     */
    set value(newValue: number) {
        this.add(newValue - this.value);
    }
    protected translateDescriptionsResettable(descriptions: Array<[number, number]>): [string, number] {
        let description = descriptions[0];
        if (description[0] === 1) return ["add", description[1]];
        else return ["mult", description[1]];
    }
}

export class EnableWinsFlag extends DefaultResettableCrdt<null> {
    constructor(id: any, runtime: CrdtRuntime) {
        super(id, new NoOpCrdtInternal(() => null), null,
            runtime, undefined, true);
    }
    enable() {
        this.applyOps("e");
    }
    disable() {
        this.reset();
    }
    get enabled() : boolean {
        return !this.state.internalState.isHistoryEmpty();
    }
    set enabled(newValue: boolean) {
        if (newValue) this.enable();
        else this.disable();
    }
    // TODO: would also like to translate observed-resets to
    // disable (but only if it actually worked).  Perhaps add noop indicator out front?
    // (Need to add a no-op crdt at the top level)
    protected translateDescriptionsResettable(descriptions: Array<string>): string {
        if (descriptions.length !== 1 || descriptions[0] !== "e") {
            throw new Error("Unrecognized descriptions: " +
                JSON.stringify(descriptions))
        }
        else return "enable";
    }
}


export class DisableWinsFlag extends DefaultResettableCrdt<null> {
    constructor(id: any, runtime: CrdtRuntime) {
        super(id, new NoOpCrdtInternal(() => null), null,
            runtime, undefined, true);
    }
    enable() {
        this.reset();
    }
    disable() {
        this.applyOps("d");
    }
    get enabled() : boolean {
        return this.state.internalState.isHistoryEmpty();
    }
    set enabled(newValue: boolean) {
        if (newValue) this.enable();
        else this.disable();
    }
    // TODO: would also like to translate observed-resets to
    // enable (but only if it actually worked).  Perhaps add noop indicator out front?
    // (Need to add a no-op crdt at the top level)
    protected translateDescriptionsResettable(descriptions: Array<string>): string {
        if (descriptions.length !== 1 || descriptions[0] !== "d") {
            throw new Error("Unrecognized descriptions: " +
                JSON.stringify(descriptions))
        }
        else return "disable";
    }
}

/**
 * TODO.  Convenient representation of a Crdt-valued grow-only map.
 * Somewhere: note that initial values of properties must be
 * a function of their key only (so can't have varying types or
 * initial data).
 *
 * N is the type of member names (typically string).
 */
export class CrdtObject<N, C extends Crdt<any>> extends Crdt<Map<N, C>> implements CrdtRuntime {
    static defaultPropertyFactory = () => {
        throw new Error("Dynamically created properties are only " +
                "allowed if propertyFactory is passed to the " +
                "CrdtObject constructor");
    };
    /**
     * TODO: predefined vs dynamic property creation.  Predefined ones
     * have to be created identically on all replicas in
     * between startPredefinedPropertyCreation() and
     * endPredefinedPropertyCreation(), ideally in the constructor. They
     * are not synced (for efficiency and to save the trouble
     * of specifying propertyFactory).  Dynamic properties
     * can only be created through init.
     *
     * @param id              [description]
     * @param runtime         [description]
     * @param propertyFactory [description]
     */
    constructor(id: any, runtime: CrdtRuntime,
            propertyFactory: (name: N, internalRuntime: CrdtRuntime) => C
            = CrdtObject.defaultPropertyFactory) {
        // TODO: gc ability
        // We can't actually make our initFactory until after
        // the super() call, so we have to hack it in after.
        let crdtInternal = new GrowOnlyMapInternal<N, C>(
            new CrdtAsCrdtInternal(),
            undefined as unknown as ((key: N) => C)
        );
        super(id, crdtInternal, runtime);
        crdtInternal.initFactory = (key: N) => {
            this.inInit = true;
            let result = propertyFactory(key, this);
            this.inInit = false;
            return result;
        };
        this.inPredefinedPropertyCreation = false;
        this.inInit = false;
    }

    private inPredefinedPropertyCreation: boolean;
    startPredefinedPropertyCreation() {
        this.inPredefinedPropertyCreation = true;
    }
    endPredefinedPropertyCreation() {
        this.inPredefinedPropertyCreation = false;
    }
    private inInit: boolean;
    register(crdt: C, name: N): void {
        if (!(this.inPredefinedPropertyCreation || this.inInit)) {
            throw new Error("Properties can only be directly " +
                "registered between startPredefinedPropertyCreation() " +
                "and endPredefinedPropertyCreation().  Dynamic properties " +
                "must be created with init(name).");
        }
        if (this.state.has(name)) {
            throw new Error("Duplicate property name: " + name);
        }
        this.state.set(name, crdt);
        // Skip sending an init message about it.  Okay because of the
        // predefined initialization contract.
    }
    /**
     * @param  name [description]
     * @return      The initialized Crdt.
     */
    initProperty(name: N): C {
        let currentValue = this.state.get(name);
        if (currentValue !== undefined) return currentValue;
        else {
            this.applyOps(["init", name]);
            return this.state.get(name) as C;
        }
    }

    getProperty(name: N): C | undefined {
        return this.state.get(name);
    }
    propertyNames() {
        return this.state.keys();
    }
    propertyValues() {
        return this.state.values();
    }
    propertyEntries() {
        return this.state.entries();
    }

    send(message: any, name: N): void {
        // Convert into an applySkip message for the map value
        // at name.  Here we want to skip because
        // our replica's value has already applied the
        // operation internally.
        this.applyOps(["applySkip", name, message]);
    }

    getReplicaId() {
        return this.runtime.getReplicaId();
    }
    getNextTimestamp(): CausalTimestamp {
        return this.runtime.getNextTimestamp();
    }
}

export class AddWinsSet<T> extends CrdtObject<T, EnableWinsFlag> {
    constructor(id: any, runtime: CrdtRuntime) {
        // TODO: add gc once we have transactions
        super(id, runtime, (name: T, internalRuntime: CrdtRuntime) =>
                new EnableWinsFlag(name, internalRuntime));
    }
    add(value: T) {
        // TODO: do as transaction
        this.initProperty(value).enable();
    }
    delete(value: T) {
        if (this.has(value)) {
            (this.getProperty(value) as EnableWinsFlag).disable();
        }
    }
    deleteStrong(value: T) {
        if (this.has(value)) {
            (this.getProperty(value) as EnableWinsFlag).resetStrong();
        }
    }
    has(value: T) {
        let valueFlag = this.getProperty(value);
        if (valueFlag === undefined) return false;
        else return valueFlag.enabled;
    }
    asSet(): Set<T> {
        let result = new Set<T>();
        for (let entry of this.propertyEntries()) {
            if (entry[1].enabled) result.add(entry[0]);
        }
        return result;
    }
    values() {
        // TODO: once it's gc'd we can just use this.state.keys()
        return this.asSet().values();
    }
    // TODO: other set properties (e.g. symbol iterator)
    // TODO: resets/clear
    // TODO: capturing and translating descriptions
}

export class MapCrdt<K, C extends Crdt<any> & Resettable> extends CrdtObject<string, C> {
    private keySet: AddWinsSet<K>;
    private valueMap: CrdtObject<K, C>;
    constructor(id: any, runtime: CrdtRuntime,
            valueFactory: (key: K, internalRuntime: CrdtRuntime) => C) {
        super(id, runtime);
        this.startPredefinedPropertyCreation();
        this.keySet = new AddWinsSet("keySet", this);
        this.valueMap = new CrdtObject("valueMap", this, valueFactory);
        this.endPredefinedPropertyCreation();
    }
    /**
     * Flag indicating that we are in the body of a delete/
     * deleteStrong call, hence we should not add things
     * to keySet (as an optimization).
     */
    private inDelete = false;
    /**
     * Override CrdtObject.send so that we can capture
     * a send by a valueMap value and follow it up with
     * an add to keySet, thus reviving the value's key
     * if appropriate.
     *
     * TODO: skip adding the key if it's a reset message?
     * Not sure if this is possible in general.  But should at
     * least be possible for our own deletes.
     */
    send(message: any, name: string): void {
        super.send(message, name);
        if (!this.inDelete && name === "valueMap") {
            for (let submessage of message) {
                if (submessage[0] === "applySkip") {
                    let key = submessage[1] as K;
                    this.keySet.add(key);
                }
            }
        }
    }
    init(key: K): C {
        // TODO: transactional
        if (!this.inDelete) this.keySet.add(key);
        return this.valueMap.initProperty(key);
    }
    has(key: K) {
        return this.keySet.has(key);
    }
    get(key: K) {
        if (this.has(key)) return this.valueMap.getProperty(key);
        else return undefined;
    }
    delete(key: K) {
        if (this.has(key)) {
            // TODO: transactional
            this.inDelete = true;
            (this.get(key) as Resettable).reset();
            this.keySet.delete(key);
            this.inDelete = false;
        }
    }
    deleteStrong(key: K) {
        this.inDelete = true;
        this.init(key).resetStrong();
        this.keySet.deleteStrong(key);
        this.inDelete = false;
    }
    keys() {
        return this.keySet.values();
    }

    // TODO: other map methods (e.g. symbol iterator)
    // TODO: resets
}

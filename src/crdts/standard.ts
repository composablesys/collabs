import { CrdtRuntime, CausalTimestamp } from "../crdt_runtime_interface";
import { DefaultResettableCrdt } from "./resettable";
import { CounterInternal, MultRegisterInternal } from "./basic_crdts";
import { Crdt, CrdtInternal } from "./crdt_core";
import { SemidirectState, SemidirectInternal, DirectInternal } from "./semidirect";

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
        this.applyOp([1,n]);
    }
    mult(n: number) {
        this.applyOp([2,n]);
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
        this.applyOp([1, n]);
    }
    mult(n: number) {
        this.applyOp([2, n]);
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

/**
 * CrdtInternal which uses any string as an operation/message
 * which does nothing.  Unlike using null messages to indicate that
 * nothing happened, the noop message is an explicit non-null
 * string supplied as the operation.
 *
 * Two use cases:
 * - To unreset a state (e.g. in EnableWinsFlag below).
 * - As a "header" for sequence of operations passed to applyOps,
 * so that recipients can know what end-user operation the sequence
 * corresponds to.
 */
export class NoOpCrdtInternal<S> implements CrdtInternal<S> {
    constructor(public createFunc?: (initialData: any) => S) {}
    create(initialData?: any): S {
        if (this.createFunc) return this.createFunc(initialData);
        else throw new Error("CreateFunc not supplied");
    }
    prepare(operation: string, _state: S) {
        return operation;
    }
    /**
     * The returned description is the original operation.
     */
    effect(message: string, state: S, _replicaId: any, _timestamp: CausalTimestamp): [S, string] {
        return [state, message];
    }

    static addTo<S>(originalCrdt: CrdtInternal<S>) {
        return new DirectInternal<S>(originalCrdt,
            new NoOpCrdtInternal<S>(), 1
        );
    }
}

export class EnableWinsFlag extends DefaultResettableCrdt<null> {
    constructor(id: any, runtime: CrdtRuntime) {
        super(id, new NoOpCrdtInternal(() => null), null,
            runtime, undefined, true);
    }
    enable() {
        this.applyOp("e");
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
        this.applyOp("d");
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

export class GMapInternal<K, C extends Crdt<any>> implements CrdtInternal<Map<K, C>> {
    /**
     * [constructor description]
     * @param valueCrdtInternal [description]
     * @param shouldGc Given a value state, return whether it is safe
     * to garbage collect it, removing its key-value pair from the
     * map.  For correctness, if shouldGc(valueState) is true, then
     * valueState must be identical to valueCrdtInternal.create(valueInitialData);
     * and if shouldGc is nontrivial, then users should keep in
     * mind that state.has(key) is not reliable, since it may be
     * false even after key has been initialized because the value
     * has been garbage collected.
     */
    constructor(public readonly shouldGc: (valueState: C) => boolean = (() => false)) {
    }
    /**
     * TODO.  Needs to be set.  Allow it to be set outside constructor
     * because CrdtObject needs to call super before it can set this.
     */
    public initFactory!: (key: K) => C;
    create(_initialData?: any): Map<K, C> {
        return new Map<K, C>();
    }
    /**
     * Operations:
     * - ["apply", key, C message]: applies the C message to
     * the given key, initializing the key if needed.
     * - ["applySkip", key, C message]: applies the C message to
     * the given key, except for their sender, who is assumed
     * to have already applied the message.  This is used by
     * CrdtValuedGrowOnlyMapInternal, whose messages are
     * sometimes derived from values applying messages to
     * themselves.  TODO: in principle can optimize so we
     * don't have to send "skip" over the network.
     * - ["init", key]: initializes the given key using initFactory
     * if it is not already present in the map.
     * - ["reset"]: resets every value in the map (using
     * each value's getUniversalResetOperation()).
     */
    prepare(operation: [string, K, any], state: Map<K, C>, _replicaId: any): [string, K?, any?] {
        let key = operation[1];
        switch (operation[0]) {
            case "apply":
                return ["apply", key, operation[2]];
            case "applySkip":
                return ["applySkip", key, operation[2]];
            case "init":
                if (!state.has(key)) return ["init", key];
            case "reset": return ["reset"];
            default:
                throw new Error("Unrecognized operation: " + JSON.stringify(operation));
        }
    }
    /**
     * In addition to the message output by prepare, we have
     * messages (arising through semdirect product):
     * - ["initReset", key]: does ["init", key] followed by
     * delivering a reset message to the key.
     * - ["initResetStrong", key]: does ["init", key] followed
     * by delivering a reset-strong message to the key.
     *
     * Description format:
     * - for an apply/applySkip operation:
     * null (TODO)
     * - for an init operation: null if the key already existed,
     * otherwise ["init", key]
     * - for a reset operation: ["reset"] (TODO: descriptions from
     * reset keys)
     */
    effect(message: [string, K, any?], state: Map<K, C>,
            replicaId: any, timestamp: CausalTimestamp):
            [Map<K, C>, [string, K?, any?] | null] {
        let key = message[1];
        switch (message[0]) {
            case "applySkip":
                if (replicaId === timestamp.getSender()) {
                    // Skip applying it to the state.
                    // We can still gc, though, in case the
                    // already-applied message has made it
                    // gc-able.
                    let keyState = state.get(key);
                    if (keyState !== undefined &&
                            this.shouldGc(keyState)) {
                        state.delete(key);
                    }
                    return [state, null];
                }
                // Otherwise fall through.
            case "apply":{
                let keyState = state.get(key);
                if (keyState === undefined) {
                    keyState = this.initFactory(key);
                }
                keyState.receive(message[2], timestamp);
                if (this.shouldGc(keyState)) {
                    state.delete(key);
                }
                return [state, null];}
            case "init":
                if (state.has(key)) return [state, null];
                else {
                    let initState = this.initFactory(key);
                    if (!this.shouldGc(initState)) {
                        state.set(key, initState);
                    }
                    return [state, ["init", key]];
                }
            case "reset":
                for (let entry of state.entries()) {
                    let resetMessage = entry[1].getUniversalResetMessage();
                    if (resetMessage !== null) entry[1].receive([resetMessage], timestamp);
                    if (this.shouldGc(entry[1])) {
                        state.delete(entry[0]);
                    }
                }
                return [state, ["reset"]];
            default:
                throw new Error("Unrecognized message: " + JSON.stringify(message));
        }
    }
}


/**
 * Convenient representation of a Crdt-valued grow-only map.
 *
 * TODO: Somewhere: note that initial values of properties must be
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
        let crdtInternal = new GMapInternal<N, C>();
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
            this.applyOp(["init", name]);
            return this.state.get(name) as C;
        }
    }
    resetProperties() {
        this.applyOp(this.getUniversalResetMessage());
    }
    getUniversalResetMessage() {
        return ["reset"];
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
        this.applyOp(["applySkip", name, message]);
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
        this.startTransaction();
        this.initProperty(value).enable();
        this.endTransaction();
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
    reset() {
        this.resetProperties();
    }
    // TODO: other set properties (e.g. symbol iterator)
    // TODO: capturing and translating descriptions
}

export class MapCrdt<K, C extends Crdt<any>> extends CrdtObject<string, AddWinsSet<K> | CrdtObject<K, C>> {
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
        this.startTransaction();
        if (!this.inDelete) this.keySet.add(key);
        let result = this.valueMap.initProperty(key);
        this.endTransaction();
        return result;
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
            this.startTransaction();
            this.inDelete = true;
            (this.get(key) as C).reset();
            this.keySet.delete(key);
            this.inDelete = false;
            this.endTransaction();
        }
    }
    deleteStrong(key: K) {
        this.inDelete = true;
        this.init(key).resetStrong();
        this.keySet.deleteStrong(key);
        this.inDelete = false;
    }
    reset() {
        this.keySet.reset();
        this.valueMap.resetProperties();
    }
    keys() {
        return this.keySet.values();
    }

    // TODO: other map methods (e.g. symbol iterator)
    // TODO: resets
}

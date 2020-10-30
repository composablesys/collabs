import { CausalTimestamp } from "../network";
import { Crdt, CrdtRuntime } from "./crdt_core";
import { CounterBase } from "./basic_crdts";

// TODO: do this on the receiving end instead?  Doesn't work
// if you have counter children though.  Same for strongReset.
export interface Resettable {
    /**
     * Perform an observed-reset operation on this Crdt.  Actually,
     * any behavior is acceptable (will not violate eventual
     * consistency) so long as this method commutes with
     * concurrent operations and has no effect if timestamp
     * is prior to the timestamps of all other received messages.
     * In particular, if you don't want to implement resets, it is okay to
     * make this method a no-op, so long as users are aware that
     * reset() will have no effect.
     */
    reset(): void;
}

export function isResettable(crdt: Resettable | {}): crdt is Resettable {
    return (crdt as Resettable).reset !== undefined;
}

export interface StrongResettable {
    /**
     * Perform a strong-reset (reset-wins) operation on this Crdt.
     * Actually, any behavior is acceptable (will not violate eventual
     * consistency) so long as this method commutes with
     * concurrent operations.
     * In particular, if you don't want to implement strong resets,
     * it is okay to make this method a no-op, so long as users are
     * aware that strongReset() will have no effect.
     *
     * TODO: clarify strongReset vs reset semantics.  What is required
     * for EC?  Sensible approach seems to be that reset-strongs override
     * resets (even if a reset-strong is itself reset).
     */
    strongReset(): void;
}

export function isStrongResettable(crdt: StrongResettable | {}): crdt is StrongResettable {
    return (crdt as StrongResettable).strongReset !== undefined;
}

export interface OutOfOrderAble {
    /**
     * TODO: like receive, not receiveInternal.
     * TODO: general out-of-order, not just causally prior.
     *
     * Like receiveInternal, but timestamp is causally prior
     * to this Crdt's initialization, i.e., to all operations
     * that have been delivered so far.  This is necessary to support
     * edge cases involving map() operations on container types
     * containing this Crdt.  If this method is implemented, it
     * MUST give the same result as if message had been delivered to
     * receiveInternal before all other calls to receiveInternal
     * (and resetInternal and strongResetInternal),
     * while preserving the effects of these other calls.  If
     * it is not implemented,
     * it MUST throw an error, to prevent mapping operations being
     * called on this Crdt; else the edge cases may lead to
     * violations of eventual consistency.
     * @param timestamp [description]
     * @param message   [description]
     */
    receiveOutOfOrder(
        targetPath: string[], timestamp: CausalTimestamp,
        message: Uint8Array
    ): void
}

export function isOutOfOrderAble(crdt: OutOfOrderAble | {}): crdt is OutOfOrderAble {
    return (crdt as OutOfOrderAble).receiveOutOfOrder !== undefined;
}

// TODO: undo/redo abilities?

export interface AllAble extends Resettable, StrongResettable, OutOfOrderAble {}

interface AbilityFlag {
    /**
     * Include this field (i.e., it is !== undefined) to specify
     * the Resettable interface.
     */
    resettable?: any;
    /**
     * Include this field (i.e., it is !== undefined) to specify
     * the StrongResettable interface.
     */
    strongResettable?: any;
    /**
     * Include this field (i.e., it is !== undefined) to specify
     * the OutOfOrderAble interface..
     */
    outOfOrderAble?: any;
}

export const ABILITIES_ALL = Object.freeze({resettable: true, strongResettable: true, outOfOrderAble: true});
export const ABILITIES_NONE = Object.freeze({});

// Typescript doesn't correctly infer types when multiplie flags are passed
// if we define InterfaceOf this way:
//
// export type InterfaceOf<T extends AbilityFlag> =
//     (T extends {resettable: any}? Resettable: {}) &
//     (T extends {strongResettable: any}? StrongResettable: {}) &
//     (T extends {outOfOrderAble: any}? OutOfOrderAble: {});
//
// So we instead do it the long way below.
//
// Also, if you let x = {resettable: true}, the inferred type of x is
// {resettable: boolean}.  So later supplying x to a function
// whose return type uses InterfaceOf to check if x extends the type {resettable: true}
// doesn't work as expected (although supplying {resettable: true} as
// a function argument directly does work).  Thus instead of true vs false/undefined,
// we use any vs undefined when checking if a flag is set.  In particular,
// this means that setting a flag to false will cause it to be treated as true!
export type InterfaceOf<F extends AbilityFlag> =
    F extends {resettable: any, strongResettable: any, outOfOrderAble: any}? AllAble:
    F extends {strongResettable: any, outOfOrderAble: any}? StrongResettable & OutOfOrderAble:
    F extends {resettable: any, outOfOrderAble: any}? Resettable & OutOfOrderAble:
    F extends {resettable: any, strongResettable: any}? Resettable & StrongResettable:
    F extends {resettable: any}? Resettable:
    F extends {strongResettable: any}? StrongResettable:
    F extends {outOfOrderAble: any}? OutOfOrderAble:
    {};

// Adding StrongResettable to any Crdt, via a semidirect product.

type CrdtConstructorBasic = new (...args: any[]) => Crdt;

function AddStrongResettableInternal<TBase extends CrdtConstructorBasic>(Base: TBase) {
    return class StrongResettableBase extends Base implements StrongResettable {
        constructor(...args: any[]) {
            let parentOrRuntime = args[0] as Crdt | CrdtRuntime;
            let newParent = parentOrRuntime;// TODO: strong resetting parent
            args[0] = newParent;
            super(...args);
        }
        strongReset() {
            // TODO
        }
    }
}

export type CrdtConstructor = new (parentOrRuntime: Crdt | CrdtRuntime, id: string, ...otherArgs: any[]) => Crdt;

/**
 * Maps a CrdtConstructor to a constrained version where
 * the first two arguments must have signature
 * (parentOrRuntime: Crdt | CrdtRuntime, id: string),
 * not just a supertype of that signature.
 * This is necessary because our mixin subclasses
 * expect the first two arguments to have those types,
 * not just superclasses of those types.
 */
export type SubclassConstructorOf<TBase extends CrdtConstructor> =
    TBase extends new (parentOrRuntime: Crdt | CrdtRuntime, id: string, ...otherArgs: infer Args) => infer C?
    new (parentOrRuntime: Crdt | CrdtRuntime, id: string, ...otherArgs: Args) => C: never;

export type StrongResettableConstructor = new (...args: any[]) => StrongResettable;

/**
 * TODO
 */
export function AddStrongResettable<TBase extends CrdtConstructor>(Base: TBase): SubclassConstructorOf<TBase> & StrongResettableConstructor {
    return AddStrongResettableInternal(Base) as any;
}

// Adding all features via a history set (intended for primitive Crdts)

function AddAbilitiesViaHistoryInternal<TBase extends CrdtConstructorBasic>(Base: TBase, historyMaximalOnly: boolean) {
    return class AbleViaHistory extends Base implements AllAble {
        constructor(...args: any[]) {
            let parentOrRuntime = args[0] as Crdt | CrdtRuntime;
            let newParent = parentOrRuntime;// TODO: resetting parent, use historyMaximalOnly

            // let resetWrapperCrdt = new ResetWrapperCrdt<SemidirectState<S>>(
            //     parentOrRuntime, id + "_reset", keepOnlyMaximal
            // );
            // super(
            //     resetWrapperCrdt, id, historyTimestamps,
            //     historyDiscard1Dominated,
            //     historyDiscard2Dominated
            // );
            // this.resetWrapperCrdt = resetWrapperCrdt;
            // resetWrapperCrdt.setupReset(this);
            // resetWrapperCrdt.addEventListener(
            //     "Reset", (event: CrdtEvent) =>
            //     this.dispatchEvent({
            //         caller: this,
            //         type: event.type,
            //         timestamp: event.timestamp
            //     }), true
            // );
            args[0] = newParent;
            super(...args);
            // TODO: implement HardResettable so we can
            // wrap it in StrongResettable
        }

        reset() {
            // TODO
        }
        strongReset() {
            // TODO
        }
        receiveOutOfOrder(
            targetPath: string[], timestamp: CausalTimestamp,
            message: Uint8Array
        ) {
            // TODO
        }

        static withAbilities<F extends AbilityFlag>(
            abilityFlag: F, ...args: any[]
        ): InstanceType<TBase> & InterfaceOf<F> {
            if (
                abilityFlag.resettable === undefined &&
                abilityFlag.strongResettable === undefined &&
                abilityFlag.outOfOrderAble === undefined
            ) return new Base(args) as any;
            else return new AbleViaHistory(args) as any;
        }
    };
}

export type AbleConstructor<F extends AbilityFlag> = new (...args: any[]) => InterfaceOf<F>;
export type AllAbleConstructor = new (...args: any[]) => AllAble;

// Wrapper to constrain input types.
/**
 * TODO: usage: intended for primitive Crdts.  Stores full history.
 */
// TODO: specify that the constructor must take a parent + id
// (not just subtypes), using parameter interference to get
// the remaining constructor args nicely. (Instead of TBase.)
export function AddAbilitiesViaHistory<TBase extends CrdtConstructor>(Base: TBase, historyMaximalOnly = false):
    TBase & AllAbleConstructor & {
        withAbilities<F extends AbilityFlag>(
            abilityFlag: F, ...args: ConstructorParameters<TBase>
        ): InstanceType<TBase> & InterfaceOf<F>
    }
{
    return AddAbilitiesViaHistoryInternal(Base, historyMaximalOnly);
}

// Adding selected features to a parent Crdt

// TODO: need to make sure this works if the children have
// abilities added by resets, etc. in interjected parents.

function AddAbilitiesViaChildrenInternal<TBase extends CrdtConstructorBasic>(Base: TBase) {
    let AbleViaChildren = class AbleViaChildren extends Base {
        abilityFlag: AbilityFlag;
        constructor(...args: any[]) {
            super(...args);
            // From the type signature of the wrapper method, abilityFlag
            // is always the argument with index 2 and is not undefined.
            this.abilityFlag = args[2] as AbilityFlag;
        }
        // Override this to attempt to throw an error at runtime if
        // the children don't have the correct abilities.
        protected registerChild(child: Crdt) {
            // Check abilities
            if (this.abilityFlag.resettable !== undefined && !isResettable(child)) {
                throw new Error(
                    "this.abilityFlag.resettable is defined, so AddAbilitiesViaChildren" +
                    "requires all child Crdts to implement Resettable, but child " + child.id +
                    " does not."
                );
            }
            if (this.abilityFlag.strongResettable !== undefined && !isStrongResettable(child)) {
                throw new Error(
                    "this.abilityFlagstrongResettable is defined, so AddAbilitiesViaChildren" +
                    "requires all child Crdts to implement StrongResettable, but child " + child.id +
                    " does not."
                );
            }
            if (this.abilityFlag.outOfOrderAble !== undefined && !isOutOfOrderAble(child)) {
                throw new Error(
                    "this.abilityFlag.outOfOrderAble is defined, so AddAbilitiesViaChildren" +
                    "requires all child Crdts to implement OutOfOrderAble, but child " + child.id +
                    " does not."
                );
            }
            super.registerChild(child);
        }

        reset() {
            if (this.abilityFlag.resettable === undefined) {
                throw new Error("reset called but this.abilityFlag.resettable is undefined");
            }
            for (let child of this.children.values()) {
                if (!isResettable(child)) {
                    throw new Error(
                        "this.abilityFlag.resettable is defined, so AddAbilitiesViaChildren" +
                        "requires all child Crdts to implement Resettable, but child " + child.id +
                        " does not."
                    );
                }
                child.reset();
            }
        }

        strongReset() {
            if (this.abilityFlag.strongResettable === undefined) {
                throw new Error("strongReset called but this.abilityFlag.strongResettable is undefined");
            }
            for (let child of this.children.values()) {
                if (!isStrongResettable(child)) {
                    throw new Error(
                        "this.abilityFlag.strongResettable is defined, so AddAbilitiesViaChildren" +
                        "requires all child Crdts to implement StrongResettable, but child " + child.id +
                        " does not."
                    );
                }
                child.strongReset();
            }
        }

        receiveOutOfOrder(
            targetPath: string[], timestamp: CausalTimestamp,
            message: Uint8Array
        ) {
            // TODO: similar to normal receive.
            // What if it's a message for us, which is supposed to generate
            // child messages via runLocally?  Need to deliver it normally
            // to ourselves but ensure that the children get it delivered
            // to receiveOutOfOrder.
        }
    };
    // Return a subclass that is AllAble by default.
    return class AllAbleViaChildren extends AbleViaChildren implements AllAble {
        constructor(...args: any[]) {
            // Insert the ABILITIES_ALL flag at the flag index (index 2)
            super(args[0], args[1], ABILITIES_ALL, ...args.slice(2));
        }

        static withAbilities<F extends AbilityFlag>(
            ...args: any[]
        ): InstanceType<TBase> & InterfaceOf<F> {
            // args has the same signature as Base's constructor args,
            // but with the abilityFlag moved from index 2 to 0.
            let abilityFlag = args[0] as AbilityFlag;
            let sortedArgs = [args[1], args[2], args[0], ...args.slice(3)];
            if (
                abilityFlag.resettable === undefined &&
                abilityFlag.strongResettable === undefined &&
                abilityFlag.outOfOrderAble === undefined
            ) return new Base(sortedArgs) as any;
            else return new AbleViaChildren(sortedArgs) as any;
        }
    }
}

export type CompositeCrdtConstructor = new (parentOrRuntime: Crdt | CrdtRuntime, id: string, abilityFlag: AbilityFlag, ...otherArgs: any[]) => Crdt;
export type AddAbilitiesClass<TBase extends CompositeCrdtConstructor> =
    TBase extends new (parentOrRuntime: Crdt | CrdtRuntime, id: string, abilityFlag: AbilityFlag, ...otherArgs: infer Args) => infer C?
    new (parentOrRuntime: Crdt | CrdtRuntime, id: string, ...otherArgs: Args) => C: never;
export type WithAbilitiesType<TBase extends CompositeCrdtConstructor> =
    TBase extends new (parentOrRuntime: Crdt | CrdtRuntime, id: string, abilityFlag: AbilityFlag, ...otherArgs: infer Args) => infer C?
    <F extends AbilityFlag>(abilityFlag: F, parentOrRuntime: Crdt | CrdtRuntime, id: string, ...otherArgs: Args)
    => C & (F extends AbilityFlag? InterfaceOf<F>: AllAble): never;

// Wrapper to constrain input types.
/**
 * TODO: usage: intended for composite Crdts.  Defers to children.
 * TODO: signatures:
 * - Input class's constructor must have, as the first three arguments:
 * parentOrRuntime: Crdt | CrdtRuntime, id: string, abilityFlag: AbilityFlag.
 * - Returned class extends the input class and also implements
 * AllAble.  Its constructor is same as input's, with
 * same default values (not obvious from the type), except with abilityFlag
 * omitted (the returned object always calls super with
 * abilityFlag = ABILITIES_ALL, so that it can have all abilities).
 * The class also has a static method withAbilities:
 * - parameters: same as the input class's
 * constructor, except that abilityFlag (the third argument) is required
 * (and must be of type AbilityFlag, whereas the type constraint just forces
 * the constructor to be a supertype of AbilityFlag).
 * - output: (input class) & InterfaceOf<abilityFlag>.
 */
export function AddAbilitiesViaChildren<TBase extends CompositeCrdtConstructor>(Base: TBase):
    AddAbilitiesClass<TBase> & AllAbleConstructor & {
        withAbilities: WithAbilitiesType<TBase>
    }
{
    return AddAbilitiesViaChildrenInternal(Base) as any;
}

// Testing
let parent: Crdt = {} as Crdt; // fake

const Counter = AddAbilitiesViaHistory(CounterBase);
type Counter = CounterBase & AllAble;
let testCounter: Counter = new Counter(parent, "id");
let testPartial = Counter.withAbilities({strongResettable: true}, parent, "id", 7);

class NestedCounterBase extends Crdt {
    counter: CounterBase;
    constructor(parentOrRuntime: Crdt | CrdtRuntime, id: string, abilityFlag: AbilityFlag) {
        super(parentOrRuntime, id, null);
        this.counter = Counter.withAbilities(abilityFlag, this, "counter");
    }
}

const NestedCounter = AddAbilitiesViaChildren(NestedCounterBase);
type NestedCounter = NestedCounterBase & AllAble;
let testNested: NestedCounter = new NestedCounter(parent, "test");
let testNested2 = NestedCounter.withAbilities({resettable: true}, parent, "test");

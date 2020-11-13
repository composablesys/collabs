import { CausalTimestamp } from "../network";
import { Crdt, CrdtRuntime } from "./crdt_core";
import { StrongResetWrapperCrdt, HardResettable, ResetWrapperCrdt } from "./resettable";

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
     * TODO: it is possible some operations are not OoOAble; should
     * be clearly specified.  E.g. resets and strongResets added via
     * the mixins below.  Make a note about this on Map's foreach method:
     * reset, strongReset can't be for-each'd directly, although we can
     * easily add resetAll() and strongResetAll() ops that have the same effect.
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

export interface AbilityFlag {
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

type HardResettableCrdtConstructorBasic = new (...args: any[]) => Crdt & HardResettable;

function AddStrongResettableInternal<TBase extends HardResettableCrdtConstructorBasic>(Base: TBase) {
    return class StrongResettableBase extends Base implements StrongResettable {
        protected strongResetWrapper: StrongResetWrapperCrdt;
        constructor(...args: any[]) {
            let parentOrRuntime = args[0] as Crdt | CrdtRuntime;
            let id = args[1] as string;
            let strongResetWrapper = new StrongResetWrapperCrdt(
                parentOrRuntime, id + "_reset"
            );
            args[0] = strongResetWrapper;
            super(...args);
            this.strongResetWrapper = strongResetWrapper;
            strongResetWrapper.setupStrongReset(this);
            strongResetWrapper.addEventListener(
                "StrongReset", event => {
                    this.dispatchEvent({
                        caller: this,
                        type: event.type,
                        timestamp: event.timestamp
                    });
                    this.dispatchEvent({
                        caller: this,
                        type: "Change",
                        timestamp: event.timestamp
                    });
                }, true
            );
        }
        strongReset() {
            this.strongResetWrapper.strongReset();
        }
    }
}

export type HardResettableCrdtConstructor = new (parentOrRuntime: Crdt | CrdtRuntime, id: string, ...otherArgs: any[]) => Crdt & HardResettable;

/**
 * Maps a CrdtConstructor to a constrained version where
 * the first two arguments must have signature
 * (parentOrRuntime: Crdt | CrdtRuntime, id: string),
 * not just a supertype of that signature.
 * This is necessary because our mixin subclasses
 * expect the first two arguments to have those types,
 * not just superclasses of those types.
 */
export type SubclassConstructorOf<TBase extends HardResettableCrdtConstructor> =
    TBase extends new (parentOrRuntime: Crdt | CrdtRuntime, id: string, ...otherArgs: infer Args) => infer C?
    TBase & (new (parentOrRuntime: Crdt | CrdtRuntime, id: string, ...otherArgs: Args) => C): never;
    // We conjunct with TBase so that the result properly inherits generic
    // type parameters from the original class.  See MultiValueRegister
    // for an example of this.

/**
 * Gives the constructor arguments besides parentOrRuntime and id.
 */
export type OtherArgsOf<TBase extends CrdtConstructor> =
    TBase extends new (parentOrRuntime: Crdt | CrdtRuntime, id: string, ...otherArgs: infer Args) => unknown? Args: never;

export type StrongResettableConstructor = new (...args: any[]) => StrongResettable;

/**
 * TODO.  Can only be used on Crdt's that do not interject their parents (e.g.,
 * outputs of the other Add... methods).
 *
 * baseResettable should be true if Base already implements Resettable, in
 * which case the returned class will as well (being a subclass).
 * If baseResettable is false, then the static withAbilities method will
 * throw an error when passed a flag with resettable defined.  Likewise
 * for OutOfOrderAble.  Note that in any case, strongReset() operations
 * added by this mixin are not OutOfOrderAble.
 */
export function AddStrongResettable<TBase extends HardResettableCrdtConstructor>(
    Base: TBase
): SubclassConstructorOf<TBase> & StrongResettableConstructor & ReturnType<typeof AddStrongResettableInternal> {
    return AddStrongResettableInternal(Base) as any;
}

// Adding all features via a history set (intended for primitive Crdts)

function AddAbilitiesViaHistoryInternal<TBase extends HardResettableCrdtConstructorBasic>(Base: TBase, historyMaximalOnly: boolean) {
    let StrongResettableOnly = AddStrongResettable(Base);
    return class AbleViaHistory extends Base implements AllAble {
        protected strongResetWrapper: StrongResetWrapperCrdt;
        protected resetWrapper: ResetWrapperCrdt;
        constructor(...args: any[]) {
            let parentOrRuntime = args[0] as Crdt | CrdtRuntime;
            let id = args[1] as string;
            let strongResetWrapper = new StrongResetWrapperCrdt(
                parentOrRuntime, id + "_reset"
            );
            let resetWrapper = new ResetWrapperCrdt(
                strongResetWrapper, id + "_reset", historyMaximalOnly
            );
            args[0] = resetWrapper;
            super(...args);
            this.resetWrapper = resetWrapper;
            resetWrapper.setupReset(this);
            this.strongResetWrapper = strongResetWrapper;
            strongResetWrapper.setupStrongReset(resetWrapper);
            // TODO: events: reset and strongReset.
            // strongResetWrapper.addEventListener(
            //     "Reset", (event: CrdtEvent) =>
            //     this.dispatchEvent({
            //         caller: this,
            //         type: event.type,
            //         timestamp: event.timestamp
            //     }), true
            // );
        }

        reset() {
            this.resetWrapper.reset();
        }
        strongReset() {
            this.strongResetWrapper.strongReset();
        }
        receiveOutOfOrder(
            targetPath: string[], timestamp: CausalTimestamp,
            message: Uint8Array
        ) {
            // TODO
            throw new Error("Not implemented yet");
        }

        static withAbilities<F extends AbilityFlag>(
            abilityFlag: F, parentOrRuntime: Crdt | CrdtRuntime, id: string, ...otherArgs: any[]
        ): InstanceType<TBase> & InterfaceOf<F> {
            if (
                abilityFlag.resettable === undefined &&
                abilityFlag.outOfOrderAble === undefined
            ) {
                if (abilityFlag.strongResettable === undefined) {
                    return new Base(parentOrRuntime, id, ...otherArgs) as any;
                }
                else {
                    return new StrongResettableOnly(parentOrRuntime, id, ...otherArgs) as any;
                }
            }
            // TODO: as a minor optimization, we could avoid the StrongResettable
            // layer if we're not using it.
            else return new AbleViaHistory(parentOrRuntime, id, ...otherArgs) as any;
        }
    };
}

export type AbleConstructor<F extends AbilityFlag> = new (...args: any[]) => InterfaceOf<F>;
export type AllAbleConstructor = new (...args: any[]) => AllAble;

export type CrdtConstructor = new (parentOrRuntime: Crdt | CrdtRuntime, id: string, ...otherArgs: any[]) => Crdt;

// Wrapper to constrain input types.
/**
 * TODO: usage: intended for primitive Crdts.  Stores full history.
 */
export function AddAbilitiesViaHistory<TBase extends HardResettableCrdtConstructor>(Base: TBase, historyMaximalOnly = false):
    SubclassConstructorOf<TBase> & AllAbleConstructor & ReturnType<typeof AddAbilitiesViaHistoryInternal> & {
        withAbilities<F extends AbilityFlag>(
            abilityFlag: F, parentOrRuntime: Crdt | CrdtRuntime, id: string, ...otherArgs: OtherArgsOf<TBase>
        ): InstanceType<TBase> & InterfaceOf<F>
    }
{
    return AddAbilitiesViaHistoryInternal(Base, historyMaximalOnly) as any;
}

// Adding selected features to a parent Crdt

type CrdtConstructorBasic = new (...args: any[]) => Crdt;

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
            // Don't check OutOfOrderAble since some operations may not
            // be intended to support it.
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

        /**
         * Defers OutOfOrder receipt handling to the target Crdt.
         * Note that the target Crdt may not actually be OutOfOrderAble,
         * in which case this will throw an error.
         */
        receiveOutOfOrder(targetPath: string[], timestamp: CausalTimestamp, message: Uint8Array): void {
            let child = this.children.get(targetPath[targetPath.length - 1]);
            if (child === undefined) {
                throw new Error("Unknown child: " + targetPath[targetPath.length - 1] +
                        " in: " + JSON.stringify(targetPath) + ", children: " + JSON.stringify([...this.children.keys()]));
            }
            if (!isOutOfOrderAble(child)) {
                throw new Error(
                    "receiveOutOfOrder() called on StrongResetWrapperCrdt, but the " +
                    "original (wrapped) Crdt is not OutOfOrderAble"
                );
            }
            targetPath.length--;
            child.receiveOutOfOrder(
                targetPath, timestamp, message
            );
        }
    };
    // Return a subclass that is AllAble by default.
    return class AllAbleViaChildren extends AbleViaChildren implements AllAble {
        constructor(...args: any[]) {
            // Insert the ABILITIES_ALL flag at the flag index (index 2)
            super(args[0], args[1], ABILITIES_ALL, ...args.slice(2));
        }

        static withAbilities<F extends AbilityFlag>(
            abilityFlag: F, parentOrRuntime: Crdt | CrdtRuntime, id: string, ...otherArgs: any[]
        ): InstanceType<TBase> & InterfaceOf<F> {
            // our args have the same signature as Base's constructor args,
            // but with the abilityFlag moved from index 2 to 0.
            if (
                abilityFlag.resettable === undefined &&
                abilityFlag.strongResettable === undefined &&
                abilityFlag.outOfOrderAble === undefined
            ) return new Base(parentOrRuntime, id, abilityFlag, ...otherArgs) as any;
            else return new AbleViaChildren(parentOrRuntime, id, abilityFlag, ...otherArgs) as any;
        }
    }
}

// TODO: arg inference fix
export type CompositeCrdtConstructor = new (parentOrRuntime: Crdt | CrdtRuntime, id: string, abilityFlag: AbilityFlag, ...otherArgs: any[]) => Crdt;
export type AddAbilitiesClass<TBase extends CompositeCrdtConstructor> =
    TBase extends new (parentOrRuntime: Crdt | CrdtRuntime, id: string, abilityFlag: AbilityFlag, ...otherArgs: infer Args) => infer C?
    (new (parentOrRuntime: Crdt | CrdtRuntime, id: string, ...otherArgs: Args) => C): never;
/**
 * Gives the constructor arguments besides parentOrRuntime, id, and abilityFlag.
 */
export type OtherArgsOfComposite<TBase extends CompositeCrdtConstructor> =
    TBase extends new (parentOrRuntime: Crdt | CrdtRuntime, id: string, abilityFlag: AbilityFlag, ...otherArgs: infer Args) => unknown? Args: never;

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
 *
 * TODO: Need TBase to correctly infer type parameters on Base, but
 * then plugging in a type parameter switches back to the original constructor
 * type, without abilityFlag removed.  How to infer type parameters properly?
 * Should do the same for the other functions so that the enforced constructor
 * signatures actually work.
 */
export function AddAbilitiesViaChildren<TBase extends CompositeCrdtConstructor>(Base: TBase):
    AddAbilitiesClass<TBase> & AllAbleConstructor & {
        withAbilities<F extends AbilityFlag>(
            abilityFlag: F, parentOrRuntime: Crdt | CrdtRuntime, id: string, ...otherArgs: OtherArgsOfComposite<TBase>
        ): InstanceType<TBase> & InterfaceOf<F>
    }
{
    return AddAbilitiesViaChildrenInternal(Base) as any;
}

// // Testing
// let parent: Crdt = {} as Crdt; // fake
//
// const Counter = AddAbilitiesViaHistory(CounterBase);
// type Counter = CounterBase & AllAble;
// let testCounter: Counter = new Counter(parent, "id");
// let testPartial = Counter.withAbilities({strongResettable: true}, parent, "id", 7);
//
// class NestedCounterBase extends Crdt {
//     counter: CounterBase;
//     constructor(parentOrRuntime: Crdt | CrdtRuntime, id: string, abilityFlag: AbilityFlag) {
//         super(parentOrRuntime, id, null);
//         this.counter = Counter.withAbilities(abilityFlag, this, "counter");
//     }
// }
//
// const NestedCounter = AddAbilitiesViaChildren(NestedCounterBase);
// type NestedCounter = NestedCounterBase & AllAble;
// let testNested: NestedCounter = new NestedCounter(parent, "test");
// let testNested2 = NestedCounter.withAbilities({resettable: true}, parent, "test");

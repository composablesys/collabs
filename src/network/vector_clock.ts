import { CausalTimestamp } from '../crdt_runtime_interface';

// The vector clock designed for CRDT and runtime to ensure 
// correct causality.

/**
 * The vector clock class for ensuring casuality.
 */
export class VectorClock implements CausalTimestamp{
    /**
     * Unique ID for each replica to identify itself.
     */    
    uid : any;
    /**
     * The record map from replica ids to the number of lastest message.
     */
    vectorMap : Map<any, number>;

    /** 
     * Initialize the vector with user's own entry.
     */
    constructor(replicaId : any) {
        this.uid = replicaId;
        this.vectorMap = new Map<any, number>();
        this.vectorMap.set(this.uid, 0);
    }
    /**
     * @returns the unique ID for this replica.
     */
    getSender() : any {
        return this.uid;
    }
    /**
     * @returns the vector clock with all the entries.
     */
    asVectorClock() : Map<any, number> {
        return this.vectorMap;
    }
    /**
     * @returns the number of the counter from sender
     */
    getSenderCounter() : number {
        return this.vectorMap.get(this.uid)!;
    }
    /**
     * @returns the number of replicas invovled in this crdts.
     */
    getSize() : number {
        return this.vectorMap.size;
    }
    /**
     * Update the vector of the uid entry.
     */
    increment() : void { 
        const oldValue = this.vectorMap.get(this.uid);

        if(oldValue !== undefined){
            this.vectorMap.set(this.uid, oldValue + 1);
        }
    }
    /**
     * Check a message with a certain timestamp is ready for delivery
     * ensure correct casuality.
     * 
     * @param vc the VectorClock from other replica.
     * @returns the message is ready or not.
     */
    isready(vc : VectorClock) : boolean {
        let otherUid = vc.getSender();
        let otherVectorMap = vc.asVectorClock();

        if (this.vectorMap.has(otherUid)) { 
            if (this.vectorMap.get(otherUid) === otherVectorMap.get(otherUid)! - 1) {
                for (let id of otherVectorMap.keys()) {
                    if (id !== otherUid && !this.vectorMap.has(id)) {
                        return false;
                    } else if (id !== otherUid && (this.vectorMap.get(id)! < otherVectorMap.get(id)!)) {            
                        return false;
                    }
                }
            } else {
                return false;
            }
        } else {
            if (otherVectorMap.get(otherUid) !== 1) {
                console.log(otherVectorMap.get(otherUid))
                return false;
            }
            for (let id of otherVectorMap.keys()) {  
                if (id !== otherUid && !this.vectorMap.has(id)) {
                    return false;
                } else if (id !== otherUid && (this.vectorMap.get(id)! < otherVectorMap.get(id)!)) {
                    return false;
                }
            }
        }
        return true;
    }
    /**
     * Increment sender's entry in this vectorMap.
     * 
     * @param vc the VectorClock from other replica.
     */
    incrementSender(vc : VectorClock) : void {
        let otherUid = vc.getSender();
        let otherVectorMap = vc.asVectorClock();

        this.vectorMap.set(otherUid, otherVectorMap.get(otherUid)!);
    }
    /**
     * Merge current VectorClock with the vector clock recevied from 
     * other replica.
     * 
     * @param vc the VectorClock from other replica.
     */
    merge(vc : VectorClock) : void{
        let otherVectorMap = vc.asVectorClock();

        for (let id of otherVectorMap.keys()) {
            if (!this.vectorMap.has(id)) {
                this.vectorMap.set(id, otherVectorMap.get(id)!);
            } else {
                this.vectorMap.set(id, Math.max(this.vectorMap.get(id)!, otherVectorMap.get(id)!));
            }
        }
    }
    /**
     * 
     * @param someUid the replica's uid.
     * @param clockValue the clock number of the replica.
     */
    setEntry(someUid : any, clockValue : number) : void {
        this.vectorMap.set(someUid, clockValue);
    }
}

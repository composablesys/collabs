// The vector clock designed for CRDT and runtime to ensure 
// correct causality

/**
 * The vector clock class for ensuring casuality
 */
export class VectorClock {
    /**
     * unique ID for each replica to identify itself
     */    
    uid : any;
 
    /**
     * the record map from replica ids to the number of lastest message
     */
    vectorMap : Map<any, number>;

    /** 
     * initialize the vector with user's own entry 
     */
    constructor(replicaID : any) {
        this.uid = replicaID;
        this.vectorMap = new Map<any, number>();
        this.vectorMap.set(this.uid, 0);
    }

    /**
     * @returns the unique ID for this replica
     */
    getUid() : any {
        return this.uid;
    }

    /**
     * @returns the vector clock with all the entries
     */
    getVectorMap() : Map<any, number> {
        return this.vectorMap;
    }

    /**
     * update the vector of the uid entry
     */
    increment() : void { 
        const oldValue = this.vectorMap.get(this.uid);

        if(oldValue != null){
            this.vectorMap.set(this.uid, oldValue + 1);
        }
    }

    /**
     * 
     * @param vc the VectorClock from other replica
     * @returns the message is ready or not
     */
    isready(vc : VectorClock) : boolean {
        let ready : boolean = true;

        let otherUid = vc.getUid();
        let otherVectorMap = vc.getVectorMap();

        if (this.vectorMap.get(otherUid) != null) { 
            if (this.vectorMap.get(otherUid) === otherVectorMap.get(otherUid)! - 1) {
                for (let id of this.vectorMap.keys()) {
                    if (id != otherUid && otherVectorMap.has(id) && (this.vectorMap.get(id)! < otherVectorMap.get(id)!)) {
                        ready = false;
                    }    
                }
            } else {
                ready = false;
            }
        } else {
            for (let id of this.vectorMap.keys()) {
                if (id != otherUid && otherVectorMap.has(id) && (this.vectorMap.get(id)! < otherVectorMap.get(id)!)) {
                    ready = false;
                }    
            }
        }

        return ready;
    }

    /**
     * 
     * @param vc the VectorClock from other replica
     */
    merge(vc : VectorClock) : void{
        // let otherUid = vc.getUid();
        let otherVectorMap = vc.getVectorMap();

        for (let id of otherVectorMap.keys()) {
            if (!this.vectorMap.has(id)) {
                this.vectorMap.set(id, otherVectorMap.get(id)!);
            } else {
                this.vectorMap.set(id, Math.max(this.vectorMap.get(id)!, otherVectorMap.get(id)!));
            }
        }
    }
    
}

import * as Y from "yjs";
import { Data, uuidv4 } from "../../../util";
import { Replica } from "../../replica_benchmark";

export class YjsReplica implements Replica {
  readonly doc: Y.Doc;

  constructor(
    private readonly onsend: (msg: Data) => void,
    replicaIdRng: seedrandom.prng
  ) {
    this.doc = new Y.Doc({ guid: uuidv4(replicaIdRng) });
    // clientID is normally set with lib0/random.uint32(), so we
    // need to get a PRNG uint32 instead.
    this.doc.clientID = replicaIdRng.int32() + Math.pow(2, 31);
    this.doc.on("update", (update: Uint8Array, origin: boolean) => {
      // Yjs dispatches update events not just when this sends
      // a message, but also when it receives one for
      // the first time.  We only care when this.doc actually
      // sends the message. To check this, we use origin "true" in
      // this.transact() and "false" otherwise.
      if (origin) {
        this.onsend(update);
      }
    });
  }

  transact(doOps: () => void) {
    this.doc.transact(doOps, true);
  }

  receive(msg: Uint8Array): void {
    Y.applyUpdate(this.doc, msg, false);
  }

  save(): Data {
    return Y.encodeStateAsUpdate(this.doc);
  }

  load(saveData: Uint8Array): void {
    Y.applyUpdate(this.doc, saveData, false);
  }

  skipLoad(): void {}
}

import * as Y from "yjs";
import { Data } from "../../../util";
import { Replica } from "../../replica_benchmark";

export class YjsReplica implements Replica {
  readonly doc: Y.Doc;
  // TODO: find better approach
  private inReceive = false;

  constructor(
    private readonly onsend: (msg: Data) => void,
    replicaIdRng: seedrandom.prng
  ) {
    // TODO: use rng.
    this.doc = new Y.Doc();
    this.doc.on("update", (update: Uint8Array) => {
      // Yjs dispatches update events not just when i sends
      // a message, but also when it receives one for
      // the first time.  We only care when they actually
      // send the message.
      if (!this.inReceive) {
        this.onsend(update);
      }
    });
  }

  transact(doOps: () => void) {
    this.doc.transact(doOps);
  }

  receive(msg: Uint8Array): void {
    this.inReceive = true;
    Y.applyUpdate(this.doc, msg);
    this.inReceive = false;
  }

  save(): Data {
    return Y.encodeStateAsUpdate(this.doc);
  }

  load(saveData: Uint8Array): void {
    this.inReceive = true;
    Y.applyUpdate(this.doc, saveData);
    this.inReceive = false;
  }

  skipLoad(): void {}
}

import {
  CollabEvent,
  CollabEventsRecord,
  ManualBatchingStrategy,
  MessageMeta,
  Optional,
  pseudoRandomReplicaID,
} from "@collabs/core";
import { assert } from "chai";
import { CRDTApp, CRDTMeta, LWWCVar, PrimitiveCRDT } from "../../src";
import seedrandom = require("seedrandom");

interface MetaEvent extends CollabEvent {
  message: string;
  crdtMeta: CRDTMeta;
}

interface MetaEventsRecord extends CollabEventsRecord {
  Meta: MetaEvent;
}

class MetaInspector extends PrimitiveCRDT<MetaEventsRecord> {
  sendCRDT(
    message: string,
    requests?: {
      automatic?: boolean;
      vectorClockEntries?: Iterable<string>;
      wallClockTime?: boolean;
      lamportTimestamp?: boolean;
      all?: boolean;
    }
  ): void {
    super.sendCRDT(message, requests);
  }

  protected receiveCRDT(
    message: string | Uint8Array,
    meta: MessageMeta,
    crdtMeta: CRDTMeta
  ): void {
    this.emit("Meta", { meta, message: <string>message, crdtMeta });
  }

  save(): Uint8Array {
    return new Uint8Array();
  }
  load(_saveData: Optional<Uint8Array>): void {}
  canGC(): boolean {
    throw new Error("Method not implemented.");
  }
}

function assertMetaEvent(
  e: MetaEvent | null,
  message: string,
  sender: string,
  senderCounter: number,
  wallClockTime: number | null,
  lamportTimestamp: number | null,
  vc: [replicaID: string, entry: number][]
) {
  assert.isNotNull(e);
  assert.strictEqual(e!.message, message);
  const crdtMeta = e!.crdtMeta;
  assert.strictEqual(crdtMeta.sender, sender);
  assert.strictEqual(crdtMeta.senderCounter, senderCounter);
  assert.strictEqual(crdtMeta.wallClockTime, wallClockTime);
  assert.strictEqual(crdtMeta.lamportTimestamp, lamportTimestamp);
  for (const [replicaID, entry] of vc) {
    assert.strictEqual(crdtMeta.vectorClockGet(replicaID), entry);
  }
}

describe("CRDTMetaLayer", () => {
  for (const causalityGuaranteed of [true, false]) {
    describe(`causalityGuaranteed: ${causalityGuaranteed}`, () => {
      let alice: CRDTApp;
      let bob: CRDTApp;
      let aliceID: string;
      let bobID: string;
      let aliceMessage: Uint8Array | null = null;
      let bobMessage: Uint8Array | null = null;
      let rng: seedrandom.prng;

      beforeEach(() => {
        rng = seedrandom("42");
        alice = new CRDTApp({
          batchingStrategy: new ManualBatchingStrategy(),
          causalityGuaranteed,
          debugReplicaID: pseudoRandomReplicaID(rng),
        });
        aliceID = alice.runtime.replicaID;
        alice.on("Send", (e) => {
          aliceMessage = e.message;
        });
        bob = new CRDTApp({
          batchingStrategy: new ManualBatchingStrategy(),
          causalityGuaranteed,
          debugReplicaID: pseudoRandomReplicaID(rng),
        });
        bobID = bob.runtime.replicaID;
        bob.on("Send", (e) => {
          bobMessage = e.message;
        });
      });

      function load() {
        alice.load(Optional.empty());
        bob.load(Optional.empty());
      }

      describe("no batching", () => {
        it("delivers messages immediately", () => {
          const aliceVariable = alice.registerCollab(
            "variable",
            (init) => new LWWCVar(init, 0)
          );
          const bobVariable = bob.registerCollab(
            "variable",
            (init) => new LWWCVar(init, 0)
          );
          load();

          assert.strictEqual(aliceVariable.value, 0);
          assert.strictEqual(bobVariable.value, 0);

          aliceVariable.value = 3;
          alice.commitBatch();
          assert.isNotNull(aliceMessage);
          assert.strictEqual(aliceVariable.value, 3);
          assert.strictEqual(bobVariable.value, 0);

          bob.receive(aliceMessage!);
          assert.strictEqual(bobVariable.value, 3);
          aliceMessage = null;

          bobVariable.value = 5;
          bob.commitBatch();
          assert.isNotNull(bobMessage);
          assert.strictEqual(aliceVariable.value, 3);
          assert.strictEqual(bobVariable.value, 5);

          alice.receive(bobMessage!);
          assert.strictEqual(aliceVariable.value, 5);
          assert.strictEqual(bobVariable.value, 5);
          bobMessage = null;

          aliceVariable.value = 10;
          alice.commitBatch();
          assert.isNotNull(aliceMessage);
          bobVariable.value = 11;
          bob.commitBatch();
          assert.isNotNull(bobMessage);
          assert.strictEqual(aliceVariable.value, 10);
          assert.strictEqual(bobVariable.value, 11);

          alice.receive(bobMessage!);
          bob.receive(aliceMessage!);
          assert.strictEqual(bobVariable.value, aliceVariable.value);
        });

        describe("CRDTMeta", () => {
          let aliceInspector: MetaInspector;
          let bobInspector: MetaInspector;
          let aliceEvent: MetaEvent | null = null;
          let bobEvent: MetaEvent | null = null;

          beforeEach(() => {
            aliceInspector = alice.registerCollab(
              "inspector",
              (init) => new MetaInspector(init)
            );
            bobInspector = bob.registerCollab(
              "inspector",
              (init) => new MetaInspector(init)
            );
            aliceInspector.on("Meta", (e) => {
              aliceEvent = e;
            });
            bobInspector.on("Meta", (e) => {
              bobEvent = e;
            });

            load();
          });

          it("requests nothing", () => {
            // Own receipts.
            aliceInspector.sendCRDT("1");
            assertMetaEvent(aliceEvent, "1", aliceID, 1, null, null, [
              [aliceID, 1],
              [bobID, 0],
            ]);

            bobInspector.sendCRDT("2");
            assertMetaEvent(bobEvent, "2", bobID, 1, null, null, [
              [aliceID, 0],
              [bobID, 1],
            ]);

            // Commit batch doesn't change own receipts.
            alice.commitBatch();
            bob.commitBatch();
            assert.strictEqual(aliceEvent!.message, "1");
            assert.strictEqual(bobEvent!.message, "2");

            // Other receipts.
            alice.receive(bobMessage!);
            bob.receive(aliceMessage!);
            assertMetaEvent(aliceEvent, "2", bobID, 1, null, null, [
              [aliceID, 0],
              [bobID, 1],
            ]);
            assertMetaEvent(bobEvent, "1", aliceID, 1, null, null, [
              [aliceID, 1],
              [bobID, 0],
            ]);

            // If causalityGuaranteed, we shouldn't get extra
            // VC entries, even though there are two maximal
            // causal predecessors.
            aliceInspector.sendCRDT("3");
            assertMetaEvent(aliceEvent, "3", aliceID, 2, null, null, [
              [aliceID, 2],
              [bobID, causalityGuaranteed ? 0 : 1],
            ]);

            alice.commitBatch();
            bob.receive(aliceMessage!);
            assertMetaEvent(bobEvent, "3", aliceID, 2, null, null, [
              [aliceID, 2],
              [bobID, causalityGuaranteed ? 0 : 1],
            ]);
          });

          it("requests wallClockTime", () => {
            // Own receipts.
            aliceInspector.sendCRDT("1", { wallClockTime: true });
            assert.isNotNull(aliceEvent!.crdtMeta.wallClockTime);
            assertMetaEvent(
              aliceEvent,
              "1",
              aliceID,
              1,
              aliceEvent!.crdtMeta.wallClockTime,
              null,
              [
                [aliceID, 1],
                [bobID, 0],
              ]
            );

            // Commit batch doesn't change own receipts.
            alice.commitBatch();
            assert.strictEqual(aliceEvent!.message, "1");

            // Other receipts.
            bob.receive(aliceMessage!);
            assertMetaEvent(
              bobEvent,
              "1",
              aliceID,
              1,
              aliceEvent!.crdtMeta.wallClockTime,
              null,
              [
                [aliceID, 1],
                [bobID, 0],
              ]
            );

            // Next message doesn't still have wallClockTime.
            aliceInspector.sendCRDT("2");
            assertMetaEvent(aliceEvent, "2", aliceID, 2, null, null, [
              [aliceID, 2],
              [bobID, 0],
            ]);

            alice.commitBatch();
            bob.receive(aliceMessage!);
            assertMetaEvent(bobEvent, "2", aliceID, 2, null, null, [
              [aliceID, 2],
              [bobID, 0],
            ]);
          });

          it.skip("requests lamportTimestamp", () => {
            // TODO
          });

          it("requests VC", () => {
            aliceInspector.sendCRDT("1");
            alice.commitBatch();
            bob.receive(aliceMessage!);

            // Own receipts.
            bobInspector.sendCRDT("2", { vectorClockEntries: [aliceID] });
            assertMetaEvent(bobEvent, "2", bobID, 1, null, null, [
              [aliceID, 1],
              [bobID, 1],
            ]);

            // Commit batch doesn't change own receipts.
            bob.commitBatch();
            assert.strictEqual(bobEvent!.message, "2");

            // Other receipts.
            alice.receive(bobMessage!);
            assertMetaEvent(aliceEvent, "2", bobID, 1, null, null, [
              [aliceID, 1],
              [bobID, 1],
            ]);

            // Next message doesn't still have alice's VC entry,
            // even if !causalityGuaranteed, since it's not
            // causally maximal anymore.
            bobInspector.sendCRDT("3");
            assertMetaEvent(bobEvent, "3", bobID, 2, null, null, [
              [aliceID, 0],
              [bobID, 2],
            ]);

            bob.commitBatch();
            alice.receive(bobMessage!);
            assertMetaEvent(aliceEvent, "3", bobID, 2, null, null, [
              [aliceID, 0],
              [bobID, 2],
            ]);
          });

          it("requests all", () => {
            aliceInspector.sendCRDT("1");
            alice.commitBatch();
            bob.receive(aliceMessage!);

            // Own receipts.
            bobInspector.sendCRDT("2", { all: true });
            assert.isNotNull(bobEvent!.crdtMeta.wallClockTime);
            assertMetaEvent(
              bobEvent,
              "2",
              bobID,
              1,
              bobEvent!.crdtMeta.wallClockTime,
              1,
              [
                [aliceID, 1],
                [bobID, 1],
              ]
            );

            // Commit batch doesn't change own receipts.
            bob.commitBatch();
            assert.strictEqual(bobEvent!.message, "2");

            // Other receipts.
            alice.receive(bobMessage!);
            assertMetaEvent(
              aliceEvent,
              "2",
              bobID,
              1,
              bobEvent!.crdtMeta.wallClockTime,
              1,
              [
                [aliceID, 1],
                [bobID, 1],
              ]
            );

            // Next message doesn't still have metadata.
            bobInspector.sendCRDT("3");
            assertMetaEvent(bobEvent, "3", bobID, 2, null, null, [
              [aliceID, 0],
              [bobID, 2],
            ]);

            bob.commitBatch();
            alice.receive(bobMessage!);
            assertMetaEvent(aliceEvent, "3", bobID, 2, null, null, [
              [aliceID, 0],
              [bobID, 2],
            ]);
          });

          it("requests automatic", () => {
            aliceInspector.sendCRDT("1");
            alice.commitBatch();
            bob.receive(aliceMessage!);

            // Request all, but automatically.
            // Own receipts.
            const off = bobInspector.on("Meta", (e) => {
              void e.crdtMeta.wallClockTime;
              void e.crdtMeta.lamportTimestamp;
              e.crdtMeta.vectorClockGet(aliceID);
              // Requesting random extra VC entry is safe.
              e.crdtMeta.vectorClockGet("fakeID");
            });

            bobInspector.sendCRDT("2", { automatic: true });
            off();
            assert.isNotNull(bobEvent!.crdtMeta.wallClockTime);
            assertMetaEvent(
              bobEvent,
              "2",
              bobID,
              1,
              bobEvent!.crdtMeta.wallClockTime,
              1,
              [
                [aliceID, 1],
                [bobID, 1],
                ["fakeID", 0],
              ]
            );

            // Commit batch doesn't change own receipts.
            bob.commitBatch();
            assert.strictEqual(bobEvent!.message, "2");

            // Other receipts.
            alice.receive(bobMessage!);
            assertMetaEvent(
              aliceEvent,
              "2",
              bobID,
              1,
              bobEvent!.crdtMeta.wallClockTime,
              1,
              [
                [aliceID, 1],
                [bobID, 1],
                ["fakeID", 0],
              ]
            );

            // Next message doesn't still have metadata.
            bobInspector.sendCRDT("3");
            assertMetaEvent(bobEvent, "3", bobID, 2, null, null, [
              [aliceID, 0],
              [bobID, 2],
            ]);

            bob.commitBatch();
            alice.receive(bobMessage!);
            assertMetaEvent(aliceEvent, "3", bobID, 2, null, null, [
              [aliceID, 0],
              [bobID, 2],
            ]);
          });
        });
      });

      describe("transaction", () => {
        let aliceInspector: MetaInspector;
        let bobInspector: MetaInspector;
        let aliceEvent: MetaEvent | null = null;
        let bobEvent: MetaEvent | null = null;

        beforeEach(() => {
          aliceInspector = alice.registerCollab(
            "inspector",
            (init) => new MetaInspector(init)
          );
          bobInspector = bob.registerCollab(
            "inspector",
            (init) => new MetaInspector(init)
          );
          aliceInspector.on("Meta", (e) => {
            aliceEvent = e;
          });
          bobInspector.on("Meta", (e) => {
            bobEvent = e;
          });

          load();
        });

        it("reuses CRDTMeta", () => {
          aliceInspector.sendCRDT("1");
          assert.isNotNull(aliceEvent);
          assert.strictEqual(aliceEvent!.message, "1");
          const aliceMeta1 = aliceEvent!.crdtMeta;
          aliceEvent = null;

          for (let i = 2; i < 10; i++) {
            aliceInspector.sendCRDT(i + "");
            assert.isNotNull(aliceEvent);
            assert.strictEqual(aliceEvent!.message, i + "");
            assert.strictEqual(aliceEvent!.crdtMeta, aliceMeta1);
            // Recall that senderCounter doesn't change (stays 1).
            assertMetaEvent(aliceEvent!, i + "", aliceID, 1, null, null, [
              [aliceID, 1],
              [bobID, 0],
            ]);
            aliceEvent = null;
          }

          // Send to bob.
          // Make sure he receives all messages (1 through 9),
          // and they all have === CRDTMeta.
          alice.commitBatch();
          let events: MetaEvent[] = [];
          bobInspector.on("Meta", (e) => {
            events.push(e);
          });
          bob.receive(aliceMessage!);

          // Check events.
          let j = 1;
          let bobMeta1: CRDTMeta;
          for (const e of events) {
            assert.strictEqual(e.message, j + "");
            if (j === 1) {
              bobMeta1 = e.crdtMeta;
            } else {
              assert.strictEqual(e.crdtMeta, bobMeta1!);
            }
            assertMetaEvent(e, j + "", aliceID, 1, null, null, [
              [aliceID, 1],
              [bobID, 0],
            ]);
            j++;
          }
          assert.strictEqual(j, 10);
        });

        it("changes CRDTMeta across batches", () => {
          // First batch (pre).
          for (let i = 0; i < 10; i++) {
            aliceInspector.sendCRDT("pre" + i);
          }
          const aliceMetaPre = aliceEvent!.crdtMeta;
          alice.commitBatch();
          bob.receive(aliceMessage!);
          const bobMetaPre = bobEvent!.crdtMeta;

          // Second batch.
          aliceInspector.sendCRDT("1");
          assert.isNotNull(aliceEvent);
          assert.strictEqual(aliceEvent!.message, "1");
          const aliceMeta1 = aliceEvent!.crdtMeta;
          assert.notStrictEqual(aliceMeta1, aliceMetaPre);
          aliceEvent = null;

          for (let i = 2; i < 10; i++) {
            aliceInspector.sendCRDT(i + "");
            assert.isNotNull(aliceEvent);
            assert.strictEqual(aliceEvent!.message, i + "");
            assert.strictEqual(aliceEvent!.crdtMeta, aliceMeta1);
            // Recall that senderCounter doesn't change (stays 1).
            assertMetaEvent(aliceEvent!, i + "", aliceID, 2, null, null, [
              [aliceID, 2],
              [bobID, 0],
            ]);
            aliceEvent = null;
          }

          // Send to bob.
          // Make sure he receives all messages (1 through 9),
          // and they all have === CRDTMeta.
          alice.commitBatch();
          const events: MetaEvent[] = [];
          bobInspector.on("Meta", (e) => {
            events.push(e);
          });
          bob.receive(aliceMessage!);

          // Check events.
          let j = 1;
          let bobMeta1: CRDTMeta;
          for (const e of events) {
            assert.strictEqual(e.message, j + "");
            if (j === 1) {
              bobMeta1 = e.crdtMeta;
              assert.notStrictEqual(bobMeta1, bobMetaPre);
            } else {
              assert.strictEqual(e.crdtMeta, bobMeta1!);
            }
            assertMetaEvent(e, j + "", aliceID, 2, null, null, [
              [aliceID, 2],
              [bobID, 0],
            ]);
            j++;
          }
          assert.strictEqual(j, 10);
        });

        it("merges requests", () => {
          bobInspector.sendCRDT("pre");
          bob.commitBatch();
          alice.receive(bobMessage!);

          // First message in transaction requests
          // wallClockTime only.
          aliceInspector.sendCRDT("1", { wallClockTime: true });
          assert.isNotNull(aliceEvent!.crdtMeta.wallClockTime);
          assertMetaEvent(
            aliceEvent,
            "1",
            aliceID,
            1,
            aliceEvent!.crdtMeta.wallClockTime,
            null,
            [
              [aliceID, 1],
              [bobID, causalityGuaranteed ? 0 : 1],
            ]
          );

          // Second message in transaction requests
          // lamportTimestamp and bob's VC entry only.
          // However, wallClockTime will still be there.
          aliceInspector.sendCRDT("2", {
            lamportTimestamp: true,
            vectorClockEntries: [bobID],
          });
          assert.isNotNull(aliceEvent!.crdtMeta.wallClockTime);
          assertMetaEvent(
            aliceEvent,
            "2",
            aliceID,
            1,
            aliceEvent!.crdtMeta.wallClockTime,
            1,
            [
              [aliceID, 1],
              [bobID, 1],
            ]
          );

          // Deliver to bob. He should see the merged
          // metadata for both messages.
          alice.commitBatch();
          const events: MetaEvent[] = [];
          bobInspector.on("Meta", (e) => {
            events.push(e);
          });
          bob.receive(aliceMessage!);

          // Check events.
          let j = 1;
          for (const e of events) {
            assert.strictEqual(e.message, j + "");
            assertMetaEvent(
              e,
              j + "",
              aliceID,
              1,
              aliceEvent!.crdtMeta.wallClockTime,
              1,
              [
                [aliceID, 1],
                [bobID, 1],
              ]
            );
            j++;
          }
          assert.strictEqual(j, 3);
        });

        it("toggles automatic requests", () => {
          bobInspector.sendCRDT("pre");
          bob.commitBatch();
          alice.receive(bobMessage!);

          // Start the transaction with automatic on.
          // The first message automatically requests wallClockTime.
          {
            const off = aliceInspector.on("Meta", (e) => {
              void e.crdtMeta.wallClockTime;
              off();
            });
          }
          aliceInspector.sendCRDT("1", { automatic: true });
          assert.isNotNull(aliceEvent!.crdtMeta.wallClockTime);
          assertMetaEvent(
            aliceEvent,
            "1",
            aliceID,
            1,
            aliceEvent!.crdtMeta.wallClockTime,
            null,
            [
              [aliceID, 1],
              [bobID, causalityGuaranteed ? 0 : 1],
            ]
          );
          // The next message should have automatic off.
          // It reads lamportTimestamp but shouldn't
          // request it.
          {
            const off = aliceInspector.on("Meta", (e) => {
              void e.crdtMeta.lamportTimestamp;
              off();
            });
          }
          aliceInspector.sendCRDT("2", {});
          assert.isNull(aliceEvent!.crdtMeta.lamportTimestamp);
          assertMetaEvent(
            aliceEvent,
            "2",
            aliceID,
            1,
            aliceEvent!.crdtMeta.wallClockTime,
            null,
            [
              [aliceID, 1],
              [bobID, causalityGuaranteed ? 0 : 1],
            ]
          );
          // The next message is automatic again.
          // It requests bob's VC entry.
          {
            const off = aliceInspector.on("Meta", (e) => {
              e.crdtMeta.vectorClockGet(bobID);
              off();
            });
          }
          aliceInspector.sendCRDT("3", { automatic: true });
          assertMetaEvent(
            aliceEvent,
            "3",
            aliceID,
            1,
            aliceEvent!.crdtMeta.wallClockTime,
            null,
            [
              [aliceID, 1],
              [bobID, 1],
            ]
          );

          // Bob should see only the automatically requested
          // fields.
          alice.commitBatch();
          bob.receive(aliceMessage!);
          assertMetaEvent(
            bobEvent,
            "3",
            aliceID,
            1,
            aliceEvent!.crdtMeta.wallClockTime,
            null,
            [
              [aliceID, 1],
              [bobID, 1],
            ]
          );

          // The next batch should have automatic off.
          // It reads lamportTimestamp but shouldn't
          // request it.
          {
            const off = aliceInspector.on("Meta", (e) => {
              void e.crdtMeta.lamportTimestamp;
              off();
            });
          }
          aliceInspector.sendCRDT("4", {});
          assert.isNull(aliceEvent!.crdtMeta.lamportTimestamp);
          assertMetaEvent(aliceEvent, "4", aliceID, 2, null, null, [
            [aliceID, 2],
            [bobID, 0],
          ]);

          // Bob should see the same.
          alice.commitBatch();
          bob.receive(aliceMessage!);
          assertMetaEvent(bobEvent, "4", aliceID, 2, null, null, [
            [aliceID, 2],
            [bobID, 0],
          ]);
        });

        it("ends due to received message", () => {
          bobInspector.sendCRDT("interrupt");
          bob.commitBatch();
          // Not sent yet.

          // First transaction, two messages.
          aliceInspector.sendCRDT("1");
          assertMetaEvent(aliceEvent, "1", aliceID, 1, null, null, [
            [aliceID, 1],
            [bobID, 0],
          ]);
          const aliceMeta1 = aliceEvent!.crdtMeta;
          aliceInspector.sendCRDT("2");
          assertMetaEvent(aliceEvent, "2", aliceID, 1, null, null, [
            [aliceID, 1],
            [bobID, 0],
          ]);
          assert.strictEqual(aliceEvent!.crdtMeta, aliceMeta1);

          // Interrupt batch with received message.
          alice.receive(bobMessage!);

          // Second transaction, two messages.
          aliceInspector.sendCRDT("3", { vectorClockEntries: [bobID] });
          assertMetaEvent(aliceEvent, "3", aliceID, 2, null, null, [
            [aliceID, 2],
            [bobID, 1],
          ]);
          const aliceMeta3 = aliceEvent!.crdtMeta;
          aliceInspector.sendCRDT("4");
          assertMetaEvent(aliceEvent, "4", aliceID, 2, null, null, [
            [aliceID, 2],
            [bobID, 1],
          ]);
          assert.strictEqual(aliceEvent!.crdtMeta, aliceMeta3);

          // Bob should see the same.
          alice.commitBatch();
          const events: MetaEvent[] = [];
          bobInspector.on("Meta", (e) => {
            events.push(e);
          });
          bob.receive(aliceMessage!);

          // Check events.
          let j = 1;
          let bobMeta1!: CRDTMeta;
          let bobMeta3!: CRDTMeta;
          for (const e of events) {
            switch (j) {
              case 1:
                assertMetaEvent(e, "1", aliceID, 1, null, null, [
                  [aliceID, 1],
                  [bobID, 0],
                ]);
                bobMeta1 = e.crdtMeta;
                break;
              case 2:
                assertMetaEvent(e, "2", aliceID, 1, null, null, [
                  [aliceID, 1],
                  [bobID, 0],
                ]);
                assert.strictEqual(e.crdtMeta, bobMeta1);
                break;
              case 3:
                assertMetaEvent(e, "3", aliceID, 2, null, null, [
                  [aliceID, 2],
                  [bobID, 1],
                ]);
                bobMeta3 = bobEvent!.crdtMeta;
                break;
              case 4:
                assertMetaEvent(e, "4", aliceID, 2, null, null, [
                  [aliceID, 2],
                  [bobID, 1],
                ]);
                assert.strictEqual(bobEvent!.crdtMeta, bobMeta3);
                break;
              default:
                assert.fail(j + "");
            }
            j++;
          }
          assert.strictEqual(j, 5);
        });

        if (!causalityGuaranteed) {
          it("doesn't end due to out-of-order receipt", () => {
            bobInspector.sendCRDT("not received");
            bob.commitBatch();
            const bobMessage1 = bobMessage!;
            bobInspector.sendCRDT("interrupt");
            bob.commitBatch();

            aliceInspector.sendCRDT("1");
            assertMetaEvent(aliceEvent, "1", aliceID, 1, null, null, [
              [aliceID, 1],
              [bobID, 0],
            ]);
            const aliceMeta1 = aliceEvent!.crdtMeta;

            // Receive out-of-order message.
            alice.receive(bobMessage!);
            // Should still be in the same transaction.
            aliceInspector.sendCRDT("2");
            assertMetaEvent(aliceEvent, "2", aliceID, 1, null, null, [
              [aliceID, 1],
              [bobID, 0],
            ]);
            assert.strictEqual(aliceEvent!.crdtMeta, aliceMeta1);

            // Now receive predecessor. This should
            // deliver both messages and start a new transaction.
            alice.receive(bobMessage1);
            assertMetaEvent(aliceEvent, "interrupt", bobID, 2, null, null, [
              [aliceID, 0],
              [bobID, 2],
            ]);

            aliceInspector.sendCRDT("3");
            assertMetaEvent(aliceEvent, "3", aliceID, 2, null, null, [
              [aliceID, 2],
              [bobID, 2],
            ]);
            assert.notStrictEqual(aliceEvent!.crdtMeta, aliceMeta1);
          });
        }
      });

      describe("batch", () => {
        let aliceInspector: MetaInspector;
        let bobInspector: MetaInspector;
        let aliceEvent: MetaEvent | null = null;
        let bobEvent: MetaEvent | null = null;

        beforeEach(() => {
          aliceInspector = alice.registerCollab(
            "inspector",
            (init) => new MetaInspector(init)
          );
          bobInspector = bob.registerCollab(
            "inspector",
            (init) => new MetaInspector(init)
          );
          aliceInspector.on("Meta", (e) => {
            aliceEvent = e;
          });
          bobInspector.on("Meta", (e) => {
            bobEvent = e;
          });

          load();
        });

        it("handles multiple transactions", () => {
          const bobMessages: Uint8Array[] = [];
          for (let i = 1; i <= 5; i++) {
            // i messages in this batch/transaction.
            for (let j = 1; j <= i; j++) {
              bobInspector.sendCRDT("bob" + i + j);
            }
            bob.commitBatch();
            bobMessages.push(bobMessage!);
          }

          for (let i = 1; i <= 5; i++) {
            // Start a new transaction.
            alice.receive(bobMessages[i - 1]);
            let aliceMeta!: CRDTMeta;
            // 6 - i messages in this transaction.
            for (let j = 1; j <= 6 - i; j++) {
              aliceInspector.sendCRDT("alice" + i + j);
              assertMetaEvent(
                aliceEvent,
                "alice" + i + j,
                aliceID,
                i,
                null,
                null,
                [
                  [aliceID, i],
                  [bobID, causalityGuaranteed ? 0 : i],
                ]
              );
              if (j === 1) {
                aliceMeta = aliceEvent!.crdtMeta;
              } else {
                assert.strictEqual(aliceEvent!.crdtMeta, aliceMeta);
              }
            }
          }

          // Send all of alice's messages as one batch.
          alice.commitBatch();
          const events: MetaEvent[] = [];
          bobInspector.on("Meta", (e) => {
            events.push(e);
          });
          bob.receive(aliceMessage!);

          // Check events.
          let i = 1; // transaction number
          let j = 1; // message within transaction j
          let transactionMeta!: CRDTMeta;
          for (const e of events) {
            assertMetaEvent(e, "alice" + i + j, aliceID, i, null, null, [
              [aliceID, i],
              [bobID, causalityGuaranteed ? 0 : i],
            ]);
            if (j === 1) {
              transactionMeta = e.crdtMeta;
            } else {
              assert.strictEqual(e.crdtMeta, transactionMeta);
            }

            j++;
            if (j > 6 - i) {
              i++;
              j = 1;
            }
          }
          assert.strictEqual(i, 6);
          assert.strictEqual(j, 1);
        });

        if (!causalityGuaranteed) {
          it.skip("delivers transactions when ready", () => {
            const bobMessages: Uint8Array[] = [];
            for (let i = 1; i <= 5; i++) {
              // i messages in this batch/transaction.
              for (let j = 1; j <= i; j++) {
                bobInspector.sendCRDT("bob" + i + j);
              }
              bob.commitBatch();
              bobMessages.push(bobMessage!);
            }

            for (let i = 1; i <= 5; i++) {
              // Start a new transaction.
              alice.receive(bobMessages[i - 1]);
              // 6 - i messages in this transaction.
              for (let j = 1; j <= 6 - i; j++) {
                aliceInspector.sendCRDT("alice" + i + j);
              }
            }

            // Send all of alice's messages as one batch.
            alice.commitBatch();

            // Now deliver alice's batch to a new user,
            // charlie. As bob's messages are delivered,
            // charlie should process those together with
            // the newly-ready transaction from alice's batch.

            // Init charlie.
            const charlie = new CRDTApp({
              batchingStrategy: new ManualBatchingStrategy(),
              causalityGuaranteed,
              debugReplicaID: pseudoRandomReplicaID(rng),
            });
            const charlieID = charlie.runtime.replicaID;
            const charlieInspector = charlie.registerCollab(
              "inspector",
              (init) => new MetaInspector(init)
            );
            let charlieEvent: MetaEvent | null = null;
            charlieInspector.on("Meta", (e) => {
              charlieEvent = e;
            });
            charlie.load(Optional.empty());

            // Receive alice's batch. Nothing is ready yet.
            charlie.receive(aliceMessage!);
            assert.isNull(charlieEvent);

            // Receive bob's messages one by one.
            // Each one makes readies one of alice's transactions.
            let j = 1;
            let turn: "alice" | "bob" | "done" = "alice";
            for (let i = 1; i <= 5; i++) {
              // We expect to see i messages in the same
              // transaction from bob, then 6 - i messages
              // in the same transaction from alice.
              // TODO: move assertions out of event, so mocha sees them.
              // TODO: test seems broken: turn is never set to "bob"
              let transactionMeta!: CRDTMeta;
              const off = charlieInspector.on("Meta", (e) => {
                if (j === 1) {
                  transactionMeta = e.crdtMeta;
                } else {
                  assert.strictEqual(e.crdtMeta, transactionMeta);
                }

                if (turn === "bob") {
                  assertMetaEvent(e, "bob" + i + j, bobID, i, null, null, [
                    [bobID, i],
                    [aliceID, 0],
                  ]);

                  j++;
                  if (j > i) {
                    j = 1;
                    turn = "alice";
                  }
                } else if (turn === "alice") {
                  assertMetaEvent(e, "alice" + i + j, aliceID, i, null, null, [
                    [bobID, i],
                    [aliceID, i],
                  ]);

                  j++;
                  if (j > 6 - i) {
                    j = 1;
                    turn = "done";
                  }
                } else {
                  assert.fail("turn = done");
                }
              });
              charlie.receive(bobMessages[i - 1]);
              off();
            }
            assert.strictEqual(turn, "done");
            assert.strictEqual(j, 1);

            // Charlie's VC should now be 5, 5.
            charlieInspector.sendCRDT("charlie", {
              vectorClockEntries: [aliceID, bobID],
            });
            assertMetaEvent(charlieEvent, "charlie", charlieID, 1, null, null, [
              [charlieID, 1],
              [aliceID, 5],
              [bobID, 5],
            ]);
          });
        }
      });
    });
  }
});

// TODOs:
// - Check restriction to causally maximal entries only.
// - Check causality works in general (tested before, but worth checking now that we've changed it to causally maximal entries only).
// - Saving. In particular, causal buffer saving, and
// delivers messages afterwards once ready.
// - Redelivered messages are ignored, even when causalityGuaranteed. In particular, echoing your own messages.

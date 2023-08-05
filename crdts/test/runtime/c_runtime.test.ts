import { ReplicaIDs } from "@collabs/core";
import { assert } from "chai";
import seedrandom from "seedrandom";
import { CCounter, CRuntime } from "../../src";

describe("CRuntime", () => {
  let rng!: seedrandom.prng;

  beforeEach(() => {
    rng = seedrandom("42");
  });

  describe("replicaID", () => {
    // In these tests, we deliberately don't use rng, to test the default
    // behavior (true randomness).

    it("generates without error on Node", () => {
      new CRuntime();
    });

    it("has length 10", () => {
      assert.strictEqual(new CRuntime().replicaID.length, 10);
    });

    it("is different each time", () => {
      assert.notStrictEqual(new CRuntime().replicaID, new CRuntime().replicaID);
    });
  });

  describe("causal order", () => {
    let alice!: CRuntime;
    let bob!: CRuntime;
    let charlie!: CRuntime;
    let dave!: CRuntime;

    let _lastMessage: Uint8Array | undefined = undefined;
    function lastMessage(): Uint8Array {
      // If you get this error, you probably need to wrap your op in
      // transact(), so that it gets delivered now (instead of the
      // next microtask). Also check that you transact with the right
      // replica.
      assert.isDefined(_lastMessage, "No last message to return");
      const ans = _lastMessage!;
      _lastMessage = undefined;
      return ans;
    }

    let aliceC!: CCounter;
    let bobC!: CCounter;
    let charlieC!: CCounter;
    let daveC!: CCounter;

    beforeEach(() => {
      alice = new CRuntime({ debugReplicaID: ReplicaIDs.pseudoRandom(rng) });
      bob = new CRuntime({ debugReplicaID: ReplicaIDs.pseudoRandom(rng) });
      charlie = new CRuntime({ debugReplicaID: ReplicaIDs.pseudoRandom(rng) });
      dave = new CRuntime({ debugReplicaID: ReplicaIDs.pseudoRandom(rng) });
      for (const runtime of [alice, bob, charlie, dave]) {
        runtime.on("Send", (e) => {
          _lastMessage = e.message;
        });
      }

      aliceC = alice.registerCollab("counter", (init) => new CCounter(init));
      bobC = bob.registerCollab("counter", (init) => new CCounter(init));
      charlieC = charlie.registerCollab(
        "counter",
        (init) => new CCounter(init)
      );
      daveC = dave.registerCollab("counter", (init) => new CCounter(init));
    });

    describe("1->2", () => {
      for (const mode of <("message" | "load")[]>["message", "load"]) {
        describe(`${mode} unblocks`, () => {
          it("same senders", () => {
            alice.transact(() => {
              aliceC.add(1);
            });
            const first = lastMessage();
            const firstSave = alice.save();
            alice.transact(() => aliceC.add(1));
            const second = lastMessage();

            bob.receive(second);
            assert.strictEqual(bobC.value, 0);

            switch (mode) {
              case "message":
                bob.receive(first);
                break;
              case "load":
                bob.load(firstSave);
                break;
            }
            assert.strictEqual(bobC.value, 2);
          });

          it("different senders", () => {
            alice.transact(() => aliceC.add(1));
            const first = lastMessage();
            const firstSave = alice.save();
            charlie.receive(first);
            assert.strictEqual(charlieC.value, 1);

            charlie.transact(() => charlieC.add(1));
            assert.strictEqual(charlieC.value, 2);
            const second = lastMessage();

            bob.receive(second);
            assert.strictEqual(bobC.value, 0);

            switch (mode) {
              case "message":
                bob.receive(first);
                break;
              case "load":
                bob.load(firstSave);
                break;
            }
            assert.strictEqual(bobC.value, 2);
          });
        });
      }
    });

    describe("1,2->3", () => {
      for (const mode of <("message" | "load" | "mixed")[]>[
        "message",
        "load",
        "mixed",
      ]) {
        describe(`${mode} unblocks`, () => {
          it("same senders 1=3", () => {
            alice.transact(() => aliceC.add(1));
            const first = lastMessage();
            const firstSave = alice.save();

            bob.transact(() => bobC.add(1));
            const second = lastMessage();
            const secondSave = bob.save();

            alice.receive(second);
            alice.transact(() => aliceC.add(1));
            const third = lastMessage();

            charlie.receive(third);
            assert.strictEqual(charlieC.value, 0);

            switch (mode) {
              case "message":
                charlie.receive(first);
                assert.strictEqual(charlieC.value, 1);
                charlie.receive(second);
                break;
              case "load":
                charlie.load(firstSave);
                assert.strictEqual(charlieC.value, 1);
                charlie.load(secondSave);
                break;
              case "mixed":
                charlie.receive(first);
                assert.strictEqual(charlieC.value, 1);
                charlie.load(secondSave);
                break;
            }
            assert.strictEqual(charlieC.value, 3);
          });

          it("different senders", () => {
            alice.transact(() => aliceC.add(1));
            const first = lastMessage();
            const firstSave = alice.save();

            bob.transact(() => bobC.add(1));
            const second = lastMessage();
            const secondSave = bob.save();

            dave.receive(first);
            dave.receive(second);
            dave.transact(() => daveC.add(1));
            const third = lastMessage();

            charlie.receive(third);
            assert.strictEqual(charlieC.value, 0);

            switch (mode) {
              case "message":
                charlie.receive(first);
                assert.strictEqual(charlieC.value, 1);
                charlie.receive(second);
                break;
              case "load":
                charlie.load(firstSave);
                assert.strictEqual(charlieC.value, 1);
                charlie.load(secondSave);
                break;
              case "mixed":
                charlie.receive(first);
                assert.strictEqual(charlieC.value, 1);
                charlie.load(secondSave);
                break;
            }
            assert.strictEqual(charlieC.value, 3);
          });
        });
      }
    });

    describe("1->x1000", () => {
      // In addition to correctness, we should watch that this doesn't
      // take obscenely long (e.g. O(n^2) loop).

      for (const mode of <("message" | "load")[]>["message", "load"]) {
        describe(`${mode} unblocks`, () => {
          it("same senders", () => {
            alice.transact(() => {
              aliceC.add(1);
            });
            const first = lastMessage();
            const firstSave = alice.save();

            // Queue a bunch of messages.
            for (let i = 0; i < 1000; i++) {
              alice.transact(() => aliceC.add(1));
              bob.receive(lastMessage());
              assert.strictEqual(bobC.value, 0);
            }

            switch (mode) {
              case "message":
                bob.receive(first);
                break;
              case "load":
                bob.load(firstSave);
                break;
            }
            assert.strictEqual(bobC.value, 1001);
          });

          it("different senders", () => {
            alice.transact(() => {
              aliceC.add(1);
            });
            const first = lastMessage();
            const firstSave = alice.save();
            charlie.receive(first);

            // Queue a bunch of messages.
            for (let i = 0; i < 1000; i++) {
              charlie.transact(() => charlieC.add(1));
              bob.receive(lastMessage());
              assert.strictEqual(bobC.value, 0);
            }

            switch (mode) {
              case "message":
                bob.receive(first);
                break;
              case "load":
                bob.load(firstSave);
                break;
            }
            assert.strictEqual(bobC.value, 1001);
          });
        });
      }
    });

    describe("buffer load", () => {
      it("self-merge skips redundant", () => {
        const msgs: Uint8Array[] = [];
        for (let i = 0; i < 3; i++) {
          alice.transact(() => {
            aliceC.add(1);
          });
          msgs.push(lastMessage());
        }

        // Not ready yet, should get buffered.
        bob.receive(msgs[2]);
        bob.receive(msgs[1]);
        assert.strictEqual(bobC.value, 0);

        // Self-load bob a bunch of times. The buffer shouldn't get duplicated.
        for (let i = 0; i < 10; i++) bob.load(bob.save());
        // @ts-expect-error private access
        assert.strictEqual(bob.buffer.buffer.size, 2);

        // Try a similar thing with charlie.
        const aSave = bob.save();
        charlie.load(aSave);
        charlie.load(aSave);
        // @ts-expect-error private access
        assert.strictEqual(charlie.buffer.buffer.size, 2);

        charlie.load(bob.save());
        // @ts-expect-error private access
        assert.strictEqual(charlie.buffer.buffer.size, 2);

        for (let i = 0; i < 10; i++) charlie.load(charlie.save());
        // @ts-expect-error private access
        assert.strictEqual(charlie.buffer.buffer.size, 2);

        bob.load(charlie.save());
        // @ts-expect-error private access
        assert.strictEqual(bob.buffer.buffer.size, 2);

        assert.strictEqual(bobC.value, 0);
        assert.strictEqual(charlieC.value, 0);

        // Finally, unblock the message.
        bob.receive(msgs[0]);
        assert.strictEqual(bobC.value, 3);

        charlie.load(bob.save());
        assert.strictEqual(charlieC.value, 3);
      });
    });
  });

  describe("dependencies", () => {
    describe("remains minimal when sequential", () => {
      // Create a chain of 50 messages, each with a different sender,
      // but all sequential.
      // There should always be just one causal dependency (the last one),
      // not a set growing linearly.

      it("messages", () => {
        const messages: Uint8Array[] = [];
        for (let i = 0; i < 50; i++) {
          const runtime = new CRuntime({
            debugReplicaID: ReplicaIDs.pseudoRandom(rng),
          });
          const counter = runtime.registerCollab(
            "counter",
            (init) => new CCounter(init)
          );
          messages.forEach((message) => runtime.receive(message));
          assert.strictEqual(counter.value, i);

          runtime.on("Send", (e) => messages.push(e.message), { once: true });
          runtime.transact(() => counter.add(1));
          assert.strictEqual(messages.length, i + 1);
          assert.strictEqual(counter.value, i + 1);
        }

        // Check the last message's length.
        assert.isBelow(messages[messages.length - 1].byteLength, 100);
      });

      it("saves", () => {
        const messages: Uint8Array[] = [];
        let lastSave: Uint8Array | null = null;
        for (let i = 0; i < 50; i++) {
          const runtime = new CRuntime({
            debugReplicaID: ReplicaIDs.pseudoRandom(rng),
          });
          const counter = runtime.registerCollab(
            "counter",
            (init) => new CCounter(init)
          );
          if (i !== 0) runtime.load(lastSave!);
          assert.strictEqual(counter.value, i);

          runtime.on("Send", (e) => messages.push(e.message), { once: true });
          runtime.transact(() => counter.add(1));
          assert.strictEqual(messages.length, i + 1);
          assert.strictEqual(counter.value, i + 1);

          lastSave = runtime.save();
        }

        // Check the last message's length.
        assert.isBelow(messages[messages.length - 1].byteLength, 100);
      });

      it("trivial saves", () => {
        // This time, don't actually do any operations in the middle,
        // just save repeatedly. Still shouldn't increase dependencies.
        const messages: Uint8Array[] = [];
        let lastSave: Uint8Array | null = null;
        for (let i = 0; i < 50; i++) {
          const runtime = new CRuntime({
            debugReplicaID: ReplicaIDs.pseudoRandom(rng),
          });
          const counter = runtime.registerCollab(
            "counter",
            (init) => new CCounter(init)
          );
          if (i !== 0) runtime.load(lastSave!);
          assert.strictEqual(counter.value, i === 0 ? 0 : 1);

          if (i === 0 || i === 49) {
            runtime.on("Send", (e) => messages.push(e.message), { once: true });
            runtime.transact(() => counter.add(1));
          }
          assert.strictEqual(counter.value, i === 49 ? 2 : 1);

          lastSave = runtime.save();
        }
        assert.strictEqual(messages.length, 2);

        // Check the last message's length.
        assert.isBelow(messages[messages.length - 1].byteLength, 100);
      });
    });
  });
});

// TODO: metadata requests, CRDT meta (x3) features, transaction modes,
// redundant loads skipped without issue, buffered messages in redundant
// loads are still added to the buffer & potentially delivered

import { ReplicaIDs } from "@collabs/core";
import { assert } from "chai";
import seedrandom from "seedrandom";
import { CCounter, CRuntime, mergeMessages } from "../../src";

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

    describe("startup sim", () => {
      // Simulate a possible ws-client startup sequence: queue a bunch of
      // messages (from live updates), then get the welcome (= saved state
      // plus a bunch of messages) and check that the queue is unblocked.
      it("3 senders", () => {
        // Prepare the saved state.
        for (let i = 0; i < 100; i++) {
          const messages: Uint8Array[] = [];
          alice.transact(() => aliceC.add(1));
          messages.push(lastMessage());
          bob.transact(() => bobC.add(1));
          messages.push(lastMessage());
          charlie.transact(() => charlieC.add(1));
          messages.push(lastMessage());

          for (const message of messages) {
            for (const user of [alice, bob, charlie]) user.receive(message);
          }
        }

        assert.strictEqual(aliceC.value, 300);
        assert.strictEqual(bobC.value, 300);
        assert.strictEqual(charlieC.value, 300);
        assert.strictEqual(daveC.value, 0);
        const savedState = alice.save();

        // Prepare the further messages.
        const furtherMessages: Uint8Array[] = [];
        for (let i = 0; i < 100; i++) {
          const messages: Uint8Array[] = [];
          alice.transact(() => aliceC.add(1));
          messages.push(lastMessage());
          bob.transact(() => bobC.add(1));
          messages.push(lastMessage());
          charlie.transact(() => charlieC.add(1));
          messages.push(lastMessage());

          furtherMessages.push(...messages);

          for (const message of messages) {
            for (const user of [alice, bob, charlie]) user.receive(message);
          }
        }

        assert.strictEqual(aliceC.value, 600);
        assert.strictEqual(bobC.value, 600);
        assert.strictEqual(charlieC.value, 600);
        assert.strictEqual(daveC.value, 0);

        // Queue more messages.
        for (let i = 0; i < 100; i++) {
          const messages: Uint8Array[] = [];
          alice.transact(() => aliceC.add(1));
          messages.push(lastMessage());
          bob.transact(() => bobC.add(1));
          messages.push(lastMessage());
          charlie.transact(() => charlieC.add(1));
          messages.push(lastMessage());

          for (const message of messages) {
            // Include dave this time.
            for (const user of [alice, bob, charlie, dave]) {
              user.receive(message);
            }
          }
        }

        assert.strictEqual(aliceC.value, 900);
        assert.strictEqual(bobC.value, 900);
        assert.strictEqual(charlieC.value, 900);
        assert.strictEqual(daveC.value, 0);

        // Deliver the saved state and further messages to Dave, which should
        // unblock everything.
        dave.load(savedState);
        assert.strictEqual(daveC.value, 300);
        for (let i = 0; i < furtherMessages.length - 1; i++) {
          dave.receive(furtherMessages[i]);
          assert.strictEqual(daveC.value, 301 + i);
        }
        dave.receive(furtherMessages[furtherMessages.length - 1]);
        assert.strictEqual(daveC.value, 900);
      });
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

  describe("mergeMessages", () => {
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

      // Fill in some VC entries to start with.
      const vcMessages: Uint8Array[] = [];
      alice.transact(() => aliceC.add(7));
      vcMessages.push(lastMessage());
      bob.transact(() => bobC.add(8));
      vcMessages.push(lastMessage());
      charlie.transact(() => charlieC.add(-5));
      vcMessages.push(lastMessage());
      charlie.transact(() => charlieC.add(-10));
      vcMessages.push(lastMessage());
      for (const runtime of [alice, bob, charlie, dave]) {
        for (const vcMessage of vcMessages) runtime.receive(vcMessage);
      }
    });

    for (const order of ["sequential", "out-of-order"]) {
      it(`merges ${order} messages`, () => {
        alice.transact(() => aliceC.add(1));
        const message1 = lastMessage();
        alice.transact(() => aliceC.add(2));
        const message2 = lastMessage();
        alice.transact(() => aliceC.add(3));
        const message3 = lastMessage();

        const allMessages = [message1, message2, message3];
        if (order === "out-of-order") allMessages.reverse();
        const merged = mergeMessages(allMessages);

        bob.receive(merged);
        assert.strictEqual(bobC.value, 6);

        // Okay to receive some of the messages first.
        charlie.receive(message1);
        assert.strictEqual(charlieC.value, 1);
        charlie.receive(merged);
        assert.strictEqual(charlieC.value, 6);

        // dave receives messages normally.
        // alice, bob, and dave should still be able to collaborate.
        for (const message of allMessages) dave.receive(message);
        assert.strictEqual(daveC.value, 6);

        bob.transact(() => bobC.add(4));
        const bobMessage = lastMessage();
        dave.transact(() => daveC.add(5));
        const daveMessage = lastMessage();

        bob.receive(daveMessage);
        dave.receive(bobMessage);
        assert.strictEqual(bobC.value, 15);
        assert.strictEqual(daveC.value, 15);

        alice.receive(daveMessage);
        alice.receive(bobMessage);
        assert.strictEqual(aliceC.value, 15);
      });
    }

    it("merges different-sender messages", () => {
      alice.transact(() => aliceC.add(1));
      const message1 = lastMessage();
      charlie.transact(() => charlieC.add(2));
      const message2 = lastMessage();
      alice.transact(() => aliceC.add(3));
      const message3 = lastMessage();

      const allMessages = [message1, message2, message3];
      const merged = mergeMessages(allMessages);

      bob.receive(merged);
      assert.strictEqual(bobC.value, 6);

      // Okay to receive some of the messages first.
      charlie.receive(message1);
      assert.strictEqual(charlieC.value, 3);
      charlie.receive(merged);
      assert.strictEqual(charlieC.value, 6);

      alice.receive(merged);
      assert.strictEqual(aliceC.value, 6);

      // dave receives messages normally.
      // alice, bob, and dave should still be able to collaborate.
      for (const message of allMessages) dave.receive(message);
      assert.strictEqual(daveC.value, 6);

      bob.transact(() => bobC.add(4));
      const bobMessage = lastMessage();
      dave.transact(() => daveC.add(5));
      const daveMessage = lastMessage();

      bob.receive(daveMessage);
      dave.receive(bobMessage);
      assert.strictEqual(bobC.value, 15);
      assert.strictEqual(daveC.value, 15);

      alice.receive(daveMessage);
      alice.receive(bobMessage);
      assert.strictEqual(aliceC.value, 15);
    });

    it("merges multi-op transactions", () => {
      alice.transact(() => aliceC.add(1));
      const message1 = lastMessage();
      alice.transact(() => {
        aliceC.add(2);
        aliceC.add(10);
      });
      const message2 = lastMessage();
      alice.transact(() => aliceC.add(3));
      const message3 = lastMessage();

      const allMessages = [message1, message2, message3];
      const merged = mergeMessages(allMessages);

      bob.receive(merged);
      assert.strictEqual(bobC.value, 16);

      // Okay to receive some of the messages first.
      charlie.receive(message1);
      assert.strictEqual(charlieC.value, 1);
      charlie.receive(merged);
      assert.strictEqual(charlieC.value, 16);

      // dave receives messages normally.
      // alice, bob, and dave should still be able to collaborate.
      for (const message of allMessages) dave.receive(message);
      assert.strictEqual(daveC.value, 16);

      bob.transact(() => bobC.add(4));
      const bobMessage = lastMessage();
      dave.transact(() => daveC.add(5));
      const daveMessage = lastMessage();

      bob.receive(daveMessage);
      dave.receive(bobMessage);
      assert.strictEqual(bobC.value, 25);
      assert.strictEqual(daveC.value, 25);

      alice.receive(daveMessage);
      alice.receive(bobMessage);
      assert.strictEqual(aliceC.value, 25);
    });

    it("deduplicates vector clocks", () => {
      const replicas: CRuntime[] = [];
      const counters: CCounter[] = [];
      for (let i = 0; i < 100; i++) {
        const replica = new CRuntime({
          debugReplicaID: ReplicaIDs.pseudoRandom(rng),
        });
        replica.on("Send", (e) => {
          alice.receive(e.message);
          bob.receive(e.message);
        });
        replicas.push(replica);
        counters.push(
          replica.registerCollab("counter", (init) => new CCounter(init))
        );
      }

      const aliceMessages: Uint8Array[] = [];
      for (let count = 0; count < 3; count++) {
        // All replicas send a message to alice (& bob, so he can
        // receive alice's messages).
        for (let i = 0; i < 100; i++) {
          replicas[i].transact(() => counters[i].add(1));
        }
        // alice sends a message.
        alice.transact(() => aliceC.add(2));
        aliceMessages.push(lastMessage());
      }
      assert.strictEqual(aliceC.value, 3 * (100 + 2));

      // The original messages include 100 VC entries, each ~13 bytes.
      for (const aliceMessage of aliceMessages) {
        assert.isAtLeast(aliceMessage.byteLength, 12 * 100);
      }

      // The merged message should be not much longer than any one message.
      // In particular, the encodedVCKeys + vcValues should contribute
      // ~2 bytes per sender per message, instead of ~13.
      // We also allow 100 bytes for the CRDT message content.
      const merged = mergeMessages(aliceMessages);
      assert.isAtMost(
        merged.byteLength,
        aliceMessages[0].byteLength + 3 * 100 * 2 + 100
      );

      bob.receive(merged);
      assert.strictEqual(bobC.value, 3 * (100 + 2));
    });

    it.skip("respects causality", () => {});

    it("allows nested merges", () => {
      alice.transact(() => {
        aliceC.add(1);
        aliceC.add(2);
      });
      const outer1 = lastMessage();

      alice.transact(() => {
        aliceC.add(3);
        aliceC.add(4);
      });
      const inner1 = lastMessage();
      alice.transact(() => aliceC.add(5));
      const inner2 = lastMessage();

      for (const message of [outer1, inner1, inner2]) bob.receive(message);
      bob.transact(() => bobC.add(6));
      const outer2 = lastMessage();

      const innerMerged = mergeMessages([inner1, inner2]);
      const nestedMerged = mergeMessages([outer1, outer2, innerMerged]);

      alice.receive(nestedMerged);
      charlie.receive(nestedMerged);
      dave.receive(innerMerged);
      dave.receive(nestedMerged);

      assert.strictEqual(aliceC.value, 21);
      assert.strictEqual(bobC.value, 21);
      assert.strictEqual(charlieC.value, 21);
      assert.strictEqual(daveC.value, 21);
    });
  });
});

// TODO: metadata requests, CRDT meta (x3) features, transaction modes,
// redundant loads skipped without issue, buffered messages in redundant
// loads are still added to the buffer & potentially delivered,
// mergeMessages vs saving (saved buffered messages should be okay - trMessages stuff)

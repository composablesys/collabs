import { Collab, InitToken } from "@collabs/core";
import seedrandom from "seedrandom";
import { CRuntime, TestingRuntimes } from "../src";

export interface Source<C extends Collab, V> {
  readonly rng: seedrandom.prng;
  pre(init: InitToken): C;
  check(actual: C, expected: V): void;
  op(c: C, n: number): void;
  /**
   * Optionally, perform an on op before the trace's first op that
   * isn't checked.
   * E.g. create a value Collab used in later ops.
   */
  setupOp?: (c: C) => void;
}

class Manager<C extends Collab, V> {
  readonly gen: TestingRuntimes;
  readonly cs = new Map<CRuntime, C>();

  constructor(readonly source: Source<C, V>) {
    this.gen = new TestingRuntimes();
  }

  /**
   * Returns runtimes in order by replicaID.
   *
   * @param doSetupOp If true, do the source's setup op. Usually you'll
   * set this to true for the first call to setup() within a trace but
   * not later ones (since those should learn of the setup op from the
   * original call, not do a second concurrent setup op).
   */
  setup(count: number, doSetupOp: boolean): CRuntime[] {
    const ans: CRuntime[] = [];
    for (let i = 0; i < count; i++) {
      const runtime = this.gen.newRuntime(this.source.rng);
      const c = runtime.registerCollab("", (init) => this.source.pre(init));
      this.cs.set(runtime, c);
      ans.push(runtime);
    }
    ans.sort((a, b) => (a.replicaID < b.replicaID ? -1 : 1));

    if (doSetupOp && this.source.setupOp) {
      // Do the setupOp on a special replica and inform the others
      // by loading its saved state.
      // The ensures that its Lamport timestamp increment is always communicated
      // to all replicas. (In op-based usage, the Lamport timestamp is only
      // communicated in messages that request it, but is always communicated via
      // saved states. That can make future ops have different Lamport timestamps
      // in op-based vs state-based usage, changing the result of (arbitrary)
      // tiebreakers, which makes it harder to write trace tests. Note that CRDT
      // correctness is not affected in any case - see the comment in
      // CausalMessageBuffer.processRemoteDelivery.)
      const setupRuntime = this.gen.newRuntime(this.source.rng);
      const setupC = setupRuntime.registerCollab("", (init) =>
        this.source.pre(init)
      );
      this.source.setupOp(setupC);
      const setupSave = setupRuntime.save();
      for (const runtime of ans) runtime.load(setupSave);
    }

    return ans;
  }

  check(actual: CRuntime, expected: V): void {
    this.source.check(this.cs.get(actual)!, expected);
  }

  op(c: CRuntime, n: number): void {
    this.source.op(this.cs.get(c)!, n);
  }
}

export class Traces {
  /**
   * Check the initial value.
   */
  static initial<C extends Collab, V>(
    source: Source<C, V>,
    valueInit: V,
    doSetupOp = true
  ) {
    const manager = new Manager(source);

    // Basics
    const [alice] = manager.setup(1, doSetupOp);
    manager.check(alice, valueInit);

    this.crossSave(manager, [alice], valueInit);
  }

  /**
   * Given some runtimes that should be in the same state, check that you can
   * transfer their saves and redundantly merge saves (on the originals
   * or the transfers).
   */
  private static crossSave<C extends Collab, V>(
    manager: Manager<C, V>,
    runtimes: CRuntime[],
    value: V
  ) {
    const saves = runtimes.map((runtime) => runtime.save());

    // Transfer saves to new replicas.
    const newRuntimes = manager.setup(runtimes.length, false);
    for (let i = 0; i < runtimes.length; i++) {
      newRuntimes[i].load(saves[i]);
      manager.check(newRuntimes[i], value);
    }

    // Merge in more transferred saves on new replicas.
    for (let i = 0; i < runtimes.length; i++) {
      // Now 2 saves each.
      newRuntimes[i].load(saves[(i + 1) % saves.length]);
      manager.check(newRuntimes[i], value);
    }
    for (let j = 2; j < saves.length; j++) {
      // Give newRuntimes[0] every save.
      newRuntimes[0].load(saves[j]);
      manager.check(newRuntimes[0], value);
    }

    // Merge in own saves.
    for (let i = 0; i < runtimes.length; i++) {
      runtimes[i].load(saves[i]);
      manager.check(runtimes[i], value);
    }

    // Merge in other saves on original replicas.
    for (let i = 0; i < runtimes.length; i++) {
      runtimes[i].load(saves[(i + 1) % saves.length]);
      manager.check(runtimes[i], value);
    }
    for (let j = 2; j < saves.length; j++) {
      // Give runtimes[0] every save.
      runtimes[0].load(saves[j]);
      manager.check(runtimes[0], value);
    }
  }

  /**
   * Perform a single op.
   */
  static singleOp<C extends Collab, V>(source: Source<C, V>, value0: V) {
    const manager = new Manager(source);

    const [alice, bob] = manager.setup(2, true);

    manager.op(alice, 0);
    manager.check(alice, value0);
    manager.gen.release(alice, bob);
    manager.check(bob, value0);

    this.crossSave(manager, [alice, bob], value0);
  }

  /**
   * Perform 4 ops sequentially (including on different replicas).
   */
  static sequential<C extends Collab, V>(
    source: Source<C, V>,
    value0: V,
    value1: V,
    value2: V,
    value3: V
  ) {
    const manager = new Manager(source);
    const values = [value0, value1, value2, value3];

    // Same sender:
    {
      const [alice, bob] = manager.setup(2, true);

      for (let i = 0; i < values.length; i++) {
        manager.op(alice, i);
        manager.check(alice, values[i]);
        manager.gen.release(alice, bob);
        manager.check(bob, values[i]);
      }

      this.crossSave(manager, [alice, bob], value3);
    }

    // Alternate senders:
    {
      const [alice, bob] = manager.setup(2, true);

      for (let i = 0; i < values.length; i++) {
        const [sender, receiver] = i % 2 === 0 ? [alice, bob] : [bob, alice];
        manager.op(sender, i);
        manager.check(sender, values[i]);
        manager.gen.release(sender, receiver);
        manager.check(receiver, values[i]);
      }

      this.crossSave(manager, [alice, bob], value3);
    }

    // Transfer save halfway through:
    {
      const [alice, bob] = manager.setup(2, true);

      manager.op(alice, 0);
      manager.op(alice, 1);
      manager.check(alice, values[1]);

      bob.load(alice.save());
      manager.check(bob, values[1]);

      manager.op(bob, 2);
      manager.op(bob, 3);
      manager.check(bob, values[3]);
      manager.gen.release(bob, alice);
      manager.check(alice, values[3]);

      // Releasing old messages shouldn't do anything (stopped by runtime).
      manager.gen.release(alice, bob);
      manager.check(bob, values[3]);

      this.crossSave(manager, [alice, bob], value3);
    }

    // Transfer saves instead of sending messages:
    {
      const [alice, bob] = manager.setup(2, true);

      manager.op(alice, 0);
      bob.load(alice.save());
      manager.check(bob, values[0]);

      manager.op(bob, 1);
      manager.check(bob, values[1]);
      alice.load(bob.save());
      manager.check(alice, values[1]);

      manager.op(alice, 2);
      manager.check(alice, values[2]);
      manager.op(alice, 3);
      manager.check(alice, values[3]);

      bob.load(alice.save());
      manager.check(bob, values[3]);

      this.crossSave(manager, [alice, bob], value3);
    }
  }
  /**
   * Perform 2 ops concurrently. We always perform op 0 on a replica
   * with lesser replicaID than for op 1.
   */
  static concurrent<C extends Collab, V>(
    source: Source<C, V>,
    value0: V,
    value1: V,
    valueMerged: V
  ) {
    const manager = new Manager(source);

    // Transfer via messages:
    {
      const [alice, bob] = manager.setup(2, true);

      manager.op(alice, 0);
      manager.check(alice, value0);

      manager.op(bob, 1);
      manager.check(bob, value1);

      manager.gen.releaseAll();
      manager.check(alice, valueMerged);
      manager.check(bob, valueMerged);

      this.crossSave(manager, [alice, bob], valueMerged);
    }

    // Transfer via saves (with nontrivial merging):
    {
      const [alice, bob, charlie, dave] = manager.setup(4, true);

      manager.op(alice, 0);
      manager.check(alice, value0);

      manager.op(bob, 1);
      manager.check(bob, value1);

      const aliceSave = alice.save();
      const bobSave = bob.save();

      charlie.load(aliceSave);
      charlie.load(bobSave);
      manager.check(charlie, valueMerged);

      dave.load(bobSave);
      dave.load(aliceSave);
      manager.check(dave, valueMerged);

      alice.load(bobSave);
      manager.check(alice, valueMerged);
      bob.load(aliceSave);
      manager.check(bob, valueMerged);

      this.crossSave(manager, [alice, bob, charlie, dave], valueMerged);
    }
  }

  /**
   * Perform op 0, then ops 1 & 2 concurrently, then op 3 after both.
   * We always perform op 1 on a replica
   * with lesser replicaID than for op 2.
   */
  static diamond<C extends Collab, V>(
    source: Source<C, V>,
    value0: V,
    value1: V,
    value2: V,
    valueMerged: V,
    value3: V
  ) {
    const manager = new Manager(source);

    // Transfer via messages:
    {
      function go(
        alice: CRuntime,
        bob: CRuntime,
        charlie: CRuntime,
        dave: CRuntime
      ) {
        manager.op(alice, 0);
        manager.check(alice, value0);
        manager.gen.release(alice, bob, charlie, dave);
        manager.check(bob, value0);
        manager.check(charlie, value0);
        manager.check(dave, value0);

        manager.op(bob, 1);
        manager.check(bob, value1);

        manager.op(charlie, 2);
        manager.check(charlie, value2);

        manager.gen.release(bob, alice, charlie, dave);
        manager.gen.release(charlie, alice, bob, dave);
        manager.check(alice, valueMerged);
        manager.check(bob, valueMerged);
        manager.check(charlie, valueMerged);
        manager.check(dave, valueMerged);

        manager.op(dave, 3);
        manager.check(dave, value3);
        manager.gen.release(dave, alice, bob, charlie);
        manager.check(alice, value3);
        manager.check(bob, value3);
        manager.check(charlie, value3);
      }

      {
        // All messages by alice except for concurrent one:
        const [alice, bob] = manager.setup(2, true);
        go(alice, alice, bob, alice);
        this.crossSave(manager, [alice, bob], value3);
      }
      {
        // All messages by different replicas:
        const [alice, bob, charlie, dave] = manager.setup(4, true);
        go(alice, bob, charlie, dave);
        this.crossSave(manager, [alice, bob, charlie, dave], value3);
      }
    }

    // Transfer via saves:
    {
      function go(
        alice: CRuntime,
        bob: CRuntime,
        charlie: CRuntime,
        dave: CRuntime
      ) {
        manager.op(alice, 0);
        manager.check(alice, value0);
        const aliceSave = alice.save();
        bob.load(aliceSave);
        charlie.load(aliceSave);
        manager.check(bob, value0);
        manager.check(charlie, value0);

        manager.op(bob, 1);
        manager.check(bob, value1);

        manager.op(charlie, 2);
        manager.check(charlie, value2);

        const bobSave = bob.save();
        const charlieSave = charlie.save();
        bob.load(charlieSave);
        manager.check(bob, valueMerged);
        charlie.load(bobSave);
        manager.check(charlie, valueMerged);
        alice.load(bobSave);
        alice.load(charlieSave);
        manager.check(alice, valueMerged);
        dave.load(charlieSave);
        dave.load(bobSave);
        manager.check(dave, valueMerged);

        manager.op(dave, 3);
        manager.check(dave, value3);
        const daveSave = dave.save();
        alice.load(daveSave);
        manager.check(alice, value3);
        bob.load(daveSave);
        manager.check(bob, value3);
        charlie.load(daveSave);
        manager.check(charlie, value3);
      }

      {
        // All messages by alice except for concurrent one:
        const [alice, bob] = manager.setup(2, true);
        go(alice, alice, bob, alice);
        this.crossSave(manager, [alice, bob], value3);
      }
      {
        // All messages by different replicas:
        const [alice, bob, charlie, dave] = manager.setup(4, true);
        go(alice, bob, charlie, dave);
        this.crossSave(manager, [alice, bob, charlie, dave], value3);
      }
    }
  }

  /**
   * Perform 0-3 and 4-7 as concurrent sequences. We always perform
   * 0-3 on replicas with lower IDs than 4-7.
   */
  static partition<C extends Collab, V>(
    source: Source<C, V>,
    value3: V,
    value7: V,
    valueMerged: V
  ) {
    const manager = new Manager(source);

    // Transfer via messages:
    {
      const [alice, bob] = manager.setup(2, true);

      for (let i = 0; i < 4; i++) manager.op(alice, i);
      manager.check(alice, value3);

      for (let i = 4; i < 8; i++) manager.op(bob, i);
      manager.check(bob, value7);

      manager.gen.releaseAll();
      manager.check(alice, valueMerged);
      manager.check(bob, valueMerged);

      this.crossSave(manager, [alice, bob], valueMerged);
    }

    // Transfer via saves (with nontrivial merging):
    {
      const [alice, bob, charlie, dave] = manager.setup(4, true);

      for (let i = 0; i < 4; i++) manager.op(alice, i);
      manager.check(alice, value3);

      for (let i = 4; i < 8; i++) manager.op(bob, i);
      manager.check(bob, value7);

      const aliceSave = alice.save();
      const bobSave = bob.save();

      charlie.load(aliceSave);
      charlie.load(bobSave);
      manager.check(charlie, valueMerged);

      dave.load(bobSave);
      dave.load(aliceSave);
      manager.check(dave, valueMerged);

      alice.load(bobSave);
      manager.check(alice, valueMerged);
      bob.load(aliceSave);
      manager.check(bob, valueMerged);

      this.crossSave(manager, [alice, bob, charlie, dave], valueMerged);
    }

    // Two partitions of two replicas each:
    {
      const [alice, bob, charlie, dave] = manager.setup(4, true);

      manager.op(alice, 0);
      manager.op(alice, 1);
      manager.gen.release(alice, bob);
      manager.op(bob, 2);
      manager.op(bob, 3);
      manager.gen.release(bob, alice);
      manager.check(alice, value3);
      manager.check(bob, value3);

      manager.op(charlie, 4);
      manager.op(charlie, 5);
      manager.gen.release(charlie, dave);
      manager.op(dave, 6);
      manager.op(dave, 7);
      manager.gen.release(dave, charlie);
      manager.check(charlie, value7);
      manager.check(dave, value7);

      // Merge alice & charlie using messages.
      manager.gen.release(alice, charlie);
      manager.gen.release(bob, charlie);
      manager.check(charlie, valueMerged);
      manager.gen.release(charlie, alice);
      manager.gen.release(dave, alice);
      manager.check(alice, valueMerged);

      // Merge bob & dave using saves.
      bob.load(dave.save());
      manager.check(bob, valueMerged);
      dave.load(bob.save());
      manager.check(dave, valueMerged);
    }
  }

  // TODO: larger-scale tests: mass all-to-all concurrency, lots of
  // sequential ops, complicated causal graph, random pattern & ops.
  // Maybe have those in a separate "fuzzing" file; keep traces here
  // simple enough to debug errors easily.

  // TODO: event unit tests.
}

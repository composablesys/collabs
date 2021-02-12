import { network, crdts } from "compoventuals-client";
import framework from "../framework";
import { v4 as uuid } from "uuid";

/**
 * Variant of CrdtRuntime that sends empty messages, so that
 * we can benchmark CausalBroadcastNetwork alone.
 */
class TrivialRuntime {
  constructor(readonly network: network.CausalBroadcastNetwork) {
    this.network.register((this as unknown) as crdts.CrdtRuntime);
  }
  send() {
    let timestamp = this.network.getNextTimestamp("");
    this.network.send("", new Uint8Array(), timestamp);
  }
  receive(
    _group: string,
    _message: Uint8Array,
    _timestamp: network.CausalTimestamp
  ) {}
}

const suite = framework.newSuite("DefaultCausalBroadcastNetwork");

// Benchmark: active users sent messages in concurrent rounds.
// Params: users, active users, rounds.
for (let users = 1; users <= 16; users *= 2) {
  for (let activeUsers = 1; activeUsers <= users; activeUsers *= 2) {
    for (let rounds = 1; rounds <= 100; rounds *= 10) {
      // Not yet efficient enough to support big tests
      if (users * activeUsers * rounds > 1000) continue;
      let extraFields = {
        Users: `${users}`,
        "Active users": `${activeUsers}`,
        Rounds: `${rounds}`,
      };
      const generator = new network.TestingNetworkGenerator();
      let runtimes: TrivialRuntime[] = [];
      let setupFun = () => {
        for (let i = 0; i < users; i++) {
          runtimes[i] = new TrivialRuntime(generator.newNetwork(uuid()));
        }
        // Warmup with one message from each user, to give
        // them entries in each other's vector clocks.
        runtimes.forEach((runtime) => runtime.send());
        generator.releaseAll();
      };
      let fun = () => {
        // Have each active user send a message concurrently,
        // in rounds.
        for (let r = 0; r < rounds; r++) {
          for (let i = 0; i < activeUsers; i++) runtimes[i].send();
          generator.releaseAll();
        }
        return runtimes;
      };
      suite.benchMemory(`Round#Memory`, setupFun, fun, extraFields);
      suite.benchCpu(`Round#Cpu`, setupFun, fun, extraFields);
      suite.benchGeneral(
        `Round#SentBytes`,
        "Sent Bytes",
        setupFun,
        () => {
          let startBytes = generator.getTotalSentBytes();
          fun();
          return generator.getTotalSentBytes() - startBytes;
        },
        extraFields,
        1
      );
    }
  }
}

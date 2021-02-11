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
const generator = new network.TestingNetworkGenerator();
let runtimes: TrivialRuntime[] = [];

// Benchmark: active users sent messages in concurrent rounds.
// Params: users, active users, rounds.
for (let users = 1; users <= 128; users *= 2) {
  let setupFun = () => {
    for (let i = 0; i < users; i++) {
      runtimes[i] = new TrivialRuntime(generator.newNetwork(uuid()));
    }
    // Warmup with one message from each user, to give
    // them entries in each other's vector clocks.
    runtimes.forEach((runtime) => runtime.send());
    generator.releaseAll();
  };
  for (let activeUsers = 1; activeUsers <= users; activeUsers *= 2) {
    for (let rounds = 10; rounds <= 1000; rounds *= 10) {
      let fun = () => {
        // Have each active user send a message concurrently,
        // in rounds.
        for (let r = 0; r < rounds; r++) {
          for (let i = 0; i < activeUsers; i++) runtimes[i].send();
          generator.releaseAll();
        }
        return runtimes;
      };
      suite.benchMemory(
        `Round#Memory#${users},${activeUsers},${rounds}`,
        setupFun,
        fun
      );
      suite.benchCpu(
        `Round#Cpu#${users},${activeUsers},${rounds}`,
        setupFun,
        fun
      );
      suite.benchGeneral(
        `Round#SentBytes#${users},${activeUsers},${rounds}`,
        "Sent Bytes",
        setupFun,
        () => {
          let startBytes = generator.getTotalSentBytes();
          fun();
          return generator.getTotalSentBytes() - startBytes;
        },
        1
      );
    }
  }
}

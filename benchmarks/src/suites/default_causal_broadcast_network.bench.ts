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
  /**
   * Assuming this.network was created by TestingNetworkGenerator.netNetwork,
   * return its internal TestingNetwork.
   * @return [description]
   */
  getTestingNetwork() {
    return (this.network as network.DefaultCausalBroadcastNetwork)
      .broadcastNetwork as network.TestingNetwork;
  }
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
      let generator: network.TestingNetworkGenerator;
      let runtimes: TrivialRuntime[] = [];
      let setupFun = () => {
        generator = new network.TestingNetworkGenerator();
        for (let i = 0; i < users; i++) {
          runtimes[i] = new TrivialRuntime(generator.newNetwork(uuid()));
        }
        // Warmup with one message from each user, to give
        // them entries in each other's vector clocks.
        runtimes.forEach((runtime) => runtime.send());
        generator.releaseAll();
      };

      // 1. Each active user sends concurrently in each round.
      let funConcurrent = () => {
        // Have each active user send a message concurrently,
        // in rounds.
        for (let r = 0; r < rounds; r++) {
          for (let i = 0; i < activeUsers; i++) runtimes[i].send();
          for (let i = 0; i < activeUsers; i++)
            generator.releaseByNetwork(runtimes[i].getTestingNetwork());
        }
        return runtimes;
      };

      // 2. Each active user sends in sequence in each round.
      let funLinear = () => {
        for (let r = 0; r < rounds; r++) {
          for (let i = 0; i < activeUsers; i++) {
            runtimes[i].send();
            generator.releaseByNetwork(runtimes[i].getTestingNetwork());
          }
        }
        return runtimes;
      };

      // 3. Partition the users and active users by parity.  Each partition
      // sends in sequence for 10 rounds, then the partitions are reunited,
      // repeatedly.
      let funPartition = () => {
        for (let r = 0; r < rounds; r++) {
          for (let i = 0; i < activeUsers; i++) {
            runtimes[i].send();
            // Deliver to all users in the same partition (parity)
            for (let j = 0; j < users; j++) {
              if ((j - i) % 2 == 0) {
                generator.releaseByNetwork(
                  runtimes[i].getTestingNetwork(),
                  runtimes[j].getTestingNetwork()
                );
              }
            }
          }
          // Every 2 rounds, briefly heal the partition
          if (rounds % 10 == 0) generator.releaseAll();
        }
        return runtimes;
      };

      let funs = {
        Concurrent: funConcurrent,
        Linear: funLinear,
        Partition: funPartition,
      };

      for (let entry of Object.entries(funs)) {
        suite.benchMemory(
          `${entry[0]}#Memory`,
          setupFun,
          entry[1],
          extraFields
        );
        suite.benchCpu(`${entry[0]}#Cpu`, setupFun, entry[1], extraFields);
        suite.benchGeneral(
          `${entry[0]}#SentBytes`,
          "Sent Bytes",
          setupFun,
          () => {
            let startBytes = generator.getTotalSentBytes();
            entry[1]();
            return generator.getTotalSentBytes() - startBytes;
          },
          extraFields,
          1
        );
      }
    }
  }
}

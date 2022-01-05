# Collabs benchmarks

Macro- and micro-benchmarks for Collabs, with comparisons to [Yjs](https://docs.yjs.dev/) and [Automerge](https://github.com/automerge/).

## Benchmarks

### automerge_perf

Macrobenchmark that runs text CRDTs on a real-world text editing trace. The benchmark is from [https://github.com/automerge/automerge-perf](https://github.com/automerge/automerge-perf). The specific trace used is [https://github.com/automerge/automerge-perf/blob/master/edit-by-index/editing-trace.js](https://github.com/automerge/automerge-perf/blob/master/edit-by-index/editing-trace.js).

### todo_list

Macrobenchmark that runs nested list/object CRDTs on a simulated nested todo-list app. The simulated todo-list is a list of "todo items", each of which has a "done" boolean field, a "text" field, and a list of sub-items. The benchmark performs 10,000 random operations (inserting an item with random text, deleting an item and its sublists, etc.).

### Microbenchmarks

Runs a group of 16 replicas in the same process (with in-memory networking) performing random operations on a single CRDT. Each benchmark consists of 200 rounds; in each round, each replica sends one message, then all replica receive each others' messages from that round (so the messages within a round are all concurrent).

The standard CRDTs (present in Collabs, Yjs, and Automerge) are:

- LwwMap: a last/arbitrary-writer-wins map with 100 keys (0--99).
- LwwMapRolling: a last/arbitrary-writer-wins map where the accessed key is increased by 1 each time instead of being chosen randomly, so 16 \* 200 = 3200 keys are accessed overall.
- Register: a last/arbitrary-writer-wins register.
- TextLtr: a text CRDT with all insertions at the end of the string.
- TextRandom: a text CRDT with random insertion locations.

## Measurements

- Time: the total time taken by all replicas.
- Memory: the difference in memory usage between the end and start of the experiment. We do our best to run the garbage collector before taking each measurement.
- Network: the total bytes sent (broadcast) on the network by all replicas.
- Save time: the time taken by one replica to save the final state.
- Load time: the time taken by one (new) replica to load the final state.
- Save size: the size in bytes of the final state's save data.

## Modes

- whole: The benchmark is run to completion, with a single measurement taken at the end.
- rounds: The benchmark is interrupted each 1/10th of the way through and 10 separate measurements are taken. For times and network, the measurements are cumulative (total from beginning until now), so they generally increase linearly.

## Commands

Run without any arguments for usage instructions.

`./run_all.sh`: Runs all benchmarks, with options to run benchmarks for just Collabs (ours) or just other libraries (theirs).

`./automerge_perf.sh`: Runs all `automerge_perf` (text editing trace) benchmarks.

`./todo_list.sh`: Runs all `todo_list` (simulated nested todo-list app) benchmarks.

`./micro_collabs.sh`: Runs all microbenchmarks for Collabs.

`./micro_yjs.sh`: Runs all microbenchmarks for Automerge.

`./micro_automerge.sh`: Runs all microbenchmarks for Yjs.

`npm start`: Runs an individual benchmark. "<major test>" is one of "automerge_perf", "todo_list", "micro_collabs", "micro_yjs", or "micro_automerge". The "test args..." are specific to each major test; see the correponding `benchmark.ts` file to learn their form. Currently, all major tests assume these have the form "<test name> <measurement = time | memory | network | save> <mode = whole | rounds>".

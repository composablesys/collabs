# Collabs benchmarks

Benchmarks for [Collabs](https://collabs.readthedocs.io/), with comparisons to [Yjs](https://docs.yjs.dev/) and [Automerge](https://github.com/automerge/).

## Usage

Individual benchmarks: `npm start` (run with no args for usage info).

All working benchmarks: `./run_all.sh` (run with no args for usage info).

Benchmark subsets:

- `./run_short.sh`: Shorter sample of benchmarks.
- `./run_text_short.sh`: Runs RealText (automerge-perf text trace) for a single sender on the given implementation, for quickly benchmarking a text CRDT.

Like `npm start` but you don't have to build first (useful for testing, slow for actual scripts): `npm run debug`.

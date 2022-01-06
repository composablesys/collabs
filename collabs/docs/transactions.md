# Transactions

We use **transaction** to mean a group of operations that are applied atomically on each replica, i.e., all in a row without interruption by other operations.

> **Note:** these are not transactions in the sense of traditional ACID databases. In particular, transactions do not have preconditions that can fail them; users always perform received transactions. Strong consistency is impossible within the library, which is only eventually consistent. See also: [CAP theorem](https://en.wikipedia.org/wiki/CAP_theorem).

Any group of operations performed in the same thread become a transaction. In particular, if a method call on a composite `Collab` is implemented as a series of component operations, those operations will be part of the same transaction. That means there is no risk that a network delay will leave some user in an unintended intermediate state, in which only some of the component operations have been applied.

All operations in a transaction are sent in a single network message (a _batch_). Users receiving this message apply all operations in the message in a row without interruption, in the same thread. Note that depending on the [`BatchingStrategy`](./typedoc/interfaces/BatchingStrategy.html) passed to [`Runtime`'s constructor](./typedoc/classes/Runtime.html#constructor), batches might contain multiple transactions, which are all applied in a row. You can exert more control over transactions by changing the `BatchingStrategy`.

Transactions (more generally, batches) have some useful properties:

- For a given operation `o` and transaction `t`, `o` will be either causally greater (/lesser/concurrent) to all operations in `t`, or to none of them.
- All operations in a batch get identical [`CausalTimestamp`](./typedoc/interfaces/CausalTimestamp.html)s, except that the sender's vector clock entry increments with each operation. In particular, they all have identical wall-clock times, set according to the wall-clock time of the first operation.

One consequence of these properties is that if you set multiple `LwwCRegister`s or `LwwCMap` values in a single transaction, and a concurrent transaction also sets all of the same values, then one of the transactions will win completely: all of the resulting values will come from one transaction or the other, not a mix of the two.

<!-- TODO: optimizations (see blurb in BatchingStrategy). In particular mention name compression. Eventually that will go in internals.md, so users can predict exactly the effect of changes like shorter child names. -->

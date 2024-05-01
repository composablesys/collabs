# Updates and Sync

To synchronize different copies of a document, Collabs gives you _updates_. You and your [providers](../guide/providers.html) are responsible for moving these updates around.

This page describes Collabs's update model and rules for syncing documents. It complements the API docs for [CRuntime](../api/collabs/classes/CRuntime.html) and [AbstractDoc](../api/collabs/classes/AbstractDoc.html), which have nearly identical APIs - all methods below appear on both.

For examples of how to work with updates, see our published providers' [source code](https://github.com/composablesys/collabs).

## Terminology

A **replica** is a copy of a Collabs document: a specific in-memory instance of CRuntime. We use this term synonomously with **user** or **device**, although technically a single user or device could have multiple replicas of a document. A replica is uniquely identified by its [CRuntime.replicaID](../api/collabs/classes/CRuntime.html#replicaID) (= [AbstractDoc.replicaID](../api/collabs/classes/AbstractDoc.html#replicaID)).

An **operation** is a Collab method call that mutates its collaborative state. E.g., a call to [CText.insert](../api/collabs/classes/CText.html#insert).

A **transaction** is a sequence of operations by the same replica. These operations are grouped together so that all replicas apply them together (atomically), without interleaving other operations.

By default, all Collab operations in the same microtask are grouped into a transaction. This is network-efficient and avoids accidentally splitting up compound operations (e.g., `CText.insert` is sometimes a composition of two lower-level operations). However, you can customize this behavior using the [autoTransactions](../api/collabs/interfaces/DocOptions.html#autoTransactions) option in CRuntime's constructor and the [CRuntime.transact](../api/collabs/classes/CRuntime.html#transact) method.

_(Although we use the term "transaction", these are not ACID transactions like in a database - it is okay for concurrent transactions to mutate the same state.)_

An **update** is a Uint8Array describing a set of transactions. They come in two types:

- A **message** describes a single transaction. The replica that performed the transaction emits its message in a ["Send" event](../api/collabs/interfaces/DocEventsRecord.html#Send). Any replica can deliver this message to [CRuntime.receive](../api/collabs/classes/CRuntime.html#receive) to apply the transaction.
- A **saved state** describes all transactions up to a certain point. A user can call [CRuntime.save](../api/collabs/classes/CRuntime.html#save) at any time to get a saved state describing all transactions applied to their document so far. Any user can deliver that saved state to [CRuntime.load](../api/collabs/classes/CRuntime.html#load) to apply all of its transactions.

Messages correspond to op-based CRDTs, while saved states correspond to state-based CRDTs. Collabs implements hybrid op-based/state-based CRDTs, which is why you can mix the two kinds of updates.

## Syncing Documents

The golden rule for syncing documents is: **Two documents that have applied the same transactions will be in the same state.**

(This assumes that the documents have the same "schema" in the sense of [Using CRuntime](../guide/documents.html#using-cruntime).)

You can "apply" a transaction by applying any update that contains that transaction, whether it's a message or saved state. It's okay to apply a transaction more than once; duplicates will be ignored. For example, if you load two saved states that overlap, you'll get the "merged" result that you expect. It's also okay if some replicas apply a transaction via a message while others apply it via a saved state.

Whenever a doc applies a non-redundant update (including at the end of a local transaction), it emits an ["Update" event](../api/collabs/interfaces/DocEventsRecord.html#Update). This includes a copy of the update itself, as well as the "caller" that delivered the update (an optional argument to [receive](../api/collabs/classes/CRuntime.html#receive) and [load](../api/collabs/classes/CRuntime.html#load)).

Our providers use these "Update" events to work together: if @collabs/ws-server applies an update to the document, @collabs/indexeddb learns of it from the "Update" event and saves it in IndexedDB, just like for local operations.

Internally, messages are _not_ always applied immediately. Instead, they are buffered until after applying all [causally prior](https://en.wikipedia.org/wiki/Happened-before) transactions, to enforce [causal consistency](https://en.wikipedia.org/wiki/Causal_consistency). Saved states _are_ always applied immediately, since they have all causally prior transactions built-in.

## Patterns

### 1. State-based sync

An easy way to sync two documents is to exchange saved states:

1. Peer A calls `save()` and sends the result to peer B.
2. Peer B calls `save()` and sends the result to peer A.
3. Each peer calls `load(savedState)` on the saved state they received from the other peer.

Now they've both applied the same set of transactions - the union of their starting sets.

### 2. Ongoing sync

Another common pattern that our providers use is:

1. When you first connect to a new peer, send your current saved state.
2. In the same thread, register an "Update" event handler on your copy of the document that forwards all future updates to that peer, except for updates that you delivered yourself (`e.caller === this`).

If the peer actually receives all of your updates, then their state will be as up-to-date as yours. If they ever miss an update (e.g., the connection drops temporarily), start over at step 1, even though you know this is a bit redundant.

### 3. Message-based sync

A third pattern accomplishes the same thing as state-based sync but can be more network-efficient.

Each transaction is uniquely identified by a "causal dot" of the form `(senderID, senderCounter)`. A message's "Update" event tells you this ID for its transaction (see [MessageEvent.senderCounter](../api/collabs/interfaces/MessageEvent.html#senderCounter)), letting you store a map (transaction ID) -> (message).

Then to sync two documents:

1. Peer A sends its [CRuntime.vectorClock](../api/collabs/classes/CRuntime.html#vectorClock). This succinctly encodes all of their applied transaction IDs.
2. Peer B replies with all stored messages whose transaction IDs are missing from Peer A's vector clock. Peer B also sends their own vector clock entries that are lower than Peer A's.
3. Peer A applies the messages from Peer B. Peer A also replies with their own stored messages whose transaction IDs are missing from Peer B's vector clock.
4. Peer B applies the messages from Peer A.

As an optimization, instead of storing the full map (transaction ID) -> (message), you can just store the N most recent messages for some N. If a peer needs messages that you've evicted, fall back on sending your whole saved state.

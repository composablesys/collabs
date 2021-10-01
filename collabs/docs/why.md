# Why Make Collabs?

## Big Picture

Our ultimate goal is to make collaborative apps **easier for programmers to write and distribute**, **better for users**, and **open-source compatible**. Collabs is not a complete solution, but we hope it is a step towards this goal.

**For developers**, collaborative apps should be almost as easy to write and distribute as single-user apps. Today, any programmer can write and distribute a single-user desktop or smartphone app, and this has led to great variety. However, making an app collaborative requires programming servers and client-server sync protocols, establishing accounts and secure storage, renting servers (expensive if your app gets popular), etc. - responsibilities better handled by a whole company than by some programmers doing a side project.

**For users**, collaborative apps should give them the same data ownership and longevity as desktop apps, and they should work even when offline. These principles are excellently described in [Ink & Switch's essay on **local-first-software**](https://www.inkandswitch.com/local-first.html).

**For the open-source movement**, open-source collaborative apps should be as forkable and redistributable as open-source desktop apps. Although server-based collaborative apps can be open-source, they aren't truly forkable: deploying your own forked version requires running your own service (and expensive servers) all over again. You then have to maintain that service indefinitely if you want people to use it. This is usually not worth the effort - what if you only changed one line of code, or fixed one bug that was bothering you?

## Where Collabs Fits In

> See also: [CRDTs as a foundational technology](https://www.inkandswitch.com/local-first.html#crdts) in the Ink & Switch essay. Collabs provides the CRDTs.

A collaborative app that delegates all collaboration to Collabs's collaborative data types automatically gets two nice properties:

1. It is network-agnostic, capable of running on top of any broadcast network (especially if it is a [Container](./containers.md)).
2. All data and logic is stored on users' devices, where it can be saved and used forever, even when offline.

These properties free developers from the need to deploy dedicated servers for each collaborative app - you can instead deploy an app using just a static site, or even by handing out a single file.

Likewise, users are no longer forced to use a specific hosting service for each collaborative app that could disappear at any time or act against their interests. Instead, users can run arbitrary collaborative apps using a generic collaborative app hosting service, a decentralized network, or whatever they please - including the ability to switch networks at any time (so long as no messages are lost in transition). Plus, they can use apps, and their data within those apps, as long as they have a copy of the program.

One can imagine a desktop or smartphone program that is designed to connect arbitrary Collabs apps to arbitrary networks. This could have features like searching for and downloading apps for permanent use, choosing network providers with the option to switch at any time, automatically saving app state to disk, and seamlessly supporting offline or LAN work. We haven't created such a program, but Collabs makes it possible.

> If you start working on a program like this, we'd be excited to hear about it!

## Differences from Prior Work

While there already exist collaborative data type libraries, including network-agnostic, local-first libraries (see [Related Work](./related_work.md)), we believe Collabs is warranted because of some key features:

- **Keep your data model and type safety:** You can organize your collaborative state using reusable, strongly-typed classes.
- **Flexible and extensible:** You can create new collaborative data types, instead of just using the ones we provide. So, if a cool new CRDT algorithm appears, like a [list with move operation](https://dl.acm.org/doi/10.1145/3380787.3393677), you don't have to create a new library to use it. (Don't worry, we already implement this move operation in [`DeletingMutCList`](./typedoc/classes/DeletingMutCList.html).) Or, if our performance is inadequate for your app, you can make your own optimized data types, or even create wrappers around other libraries' better implementations.
- **Composable:** We provide composition techniques that let you create new collaborative data types from existing ones, instead of starting from scratch each time. Built-in techniques include the mutable collection types, [`CObject`](./typedoc/classes/CObject.html), and [`SemidirectProduct`](./typedoc/classes/SemidirectProduct.html), that let you create new collaborative data types from existing ones, instead of starting from scratch each time. Of course, you can also create new composition techniques, e.g., by subclassing [`Crdt`](./typedoc/classes/Crdt.html) directly.

Considered together, these features are unique among prior work. Of course, which library you should use depends on your precise programming style and app. Each library has its own characteristics, and in particular, its own data model (how you must represent your data to make it collaborative).

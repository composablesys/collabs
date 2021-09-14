# Getting Started Guide

## Template

We provide starter templates for convenience. Each template includes a basic TypeScript + Webpack + npm setup plus a Node.js server for local testing. If you bring your own configuration, you will only need the `src/` and `bin/` folders.

Your choice of template depends on how you want to deploy your app. They are similar enough that you can easily change your mind later.

### [Container starter template](TODO: github)

A Compoventuals [container](TODO) that users can run on the network of their choice. Specifically, users can run the container in any [host](TODO), including embedding it in other Compoventuals apps like (TODO: whiteboard).

Deploy using a static site or as a shareable standalone file. Ideal for FOSS apps and personal projects.

### [WebSocket app starter template](TODO: github)

A self-contained app using a network that you provide. The template uses a simple WebSocket server where everyone who visits the site is a collaborator, but you can easily replace this with your own network.

Deploy using your choice of network, e.g., your own server, an integration with an existing platform, or a peer-to-peer network. Ideal for apps that are part of an existing service, or that need to interact with their network outside of Compoventuals.

## Setup

1. Clone the template
   TODO: tabs showing git and cd commands for each template.

2. Install dependencies
   TODO: install npm itself (by installing node)
   `npm i`

3. Build and run starter app

```
npm run build
npm run start
```

Go to [https://localhost:3000/](https://localhost:3000/) (TODO: https?). You should see a simple collaborative counter. Try using it in multiple windows at once.

TODO: screenshot showing two windows.

## Walkthrough

TODO: initialization rules (elsewhere too?): same on all replicas, don't depend on time or anything like that; init children in same thread as parent (register globals in same thread as Runtime creation), since else you might get messages that you don't know how to process; don't do ops on initialization. These rules are necessary to support arbitrary types (each user has to tell library what to do with messages, since the library doesn't know).

## Deployment

TODO: deployment (which files and what to do with them). For containers, choose between single file (inline everything with Webpack) vs static site deployment (set publicPath; allow CORS for main file, so hosts can get it with AJAX; understand implications of the first file being downloaded vs rest loaded on-demand - offline support, CORS, sandboxing; github pages is a free option, check if it has right CORS). For app, link to writing your own BroadcastNetwork (e.g. integrating with your own service + accounts), plus desc of existing options (Matrix is the only practical one, then you can deploy it from a static site).

TODO: adding load/save to app; make sure container awaits load/save properly

TODO: Matrix app (as demo of switching out network), mention how you can then use Matrix API yourself.

## Next steps

TODO: next guide (types, real data model, CObject); demos

# Getting Started

```{toctree}
---
maxdepth: 1
caption: "Contents:"
---
container
app
```

## Template

We provide starter templates for convenience. Each template includes a basic TypeScript + Webpack + npm setup plus a server for local testing. If you bring your own configuration, you will only need the `src/` folder.

Your choice of template depends on how you want to deploy your app.

### [Container starter template](https://github.com/composablesys/collabs/tree/master/template-container)

A Collabs [container](./containers.md) that users can run on the network of their choice. Specifically, users can run the container in any "container host", including embedding it in other Collabs apps.

Deploy using a static site or as a shareable standalone file. Ideal for FOSS apps and personal projects.

Follow [Getting Started: Container](./container.md).

### [WebSocket app starter template](https://github.com/composablesys/collabs/tree/master/template-app)

<!-- TODO: app to something else? (Use app for any program.) -->

A self-contained app using a network that you provide. The template uses a simple WebSocket server where everyone who visits the site is a collaborator, but you can easily replace this with your own network.

Deploy using your choice of network, e.g., your own server, an integration with an existing platform, or a peer-to-peer network. Ideal for apps that are part of an existing service, integrate Collabs with a new network, or need to interact with their network outside of Collabs.

Follow [Getting Started: App](./app.md).

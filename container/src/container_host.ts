import {
  CMountPoint,
  CompositeCrdt,
  Crdt,
  CrdtEventsRecord,
} from "compoventuals";
import { isContainerSource } from "./container_source";

export interface ContainerHostEventsRecord extends CrdtEventsRecord {
  /**
   * Emitted once per instace when the container
   * is ready (i.e., its ContainerSource is imported,
   * one instance is constructed using
   * attachNewContainer, the Crdt is loaded
   * if there is a queued load operation, and any
   * queued messages have been delivered).
   *
   * This is not a CrdtEvent because it has no associated
   * timestamp.  Instead of happening when a message is
   * received, it happens asynchronously sometime after
   * the ContainerHost is constructed - likely soon
   * after.  Specifically, this is emitted in
   * the ContainerSource's dynamic import's callback,
   * which will probably be called quickly after the
   * constructor's containerSourceModuleString
   * resolves, because the dynamically
   * imported module
   * does not need to be fetched from the web.
   *
   * Since this event is associated with construction and
   * not with a particular message, it is independent of
   * loading from saveData, hence will be emitted even if
   * loading happens at some point (in contrast to typical
   * events associated to message, which are suppressed
   * during loading).
   */
  Ready: {};
}

// TODO: cache Container instances?  Or can we rely
// on the browser to mostly do that for us?
// If we never reuse ContainerSource's, should we make
// them one-use (may slightly simplify implementations)?

// TODO: expose internal Crdt / ContainerSource (with generic
// type?), in case user wants to interact it with according
// to an extended interface?  (As Optional.)
export class ContainerHost extends CompositeCrdt<ContainerHostEventsRecord> {
  private mountPoint: CMountPoint<Crdt>;

  constructor(
    domParent: HTMLElement,
    containerSourceModuleString: string | Promise<string>
  ) {
    super();

    this.mountPoint = this.addChild("", new CMountPoint());

    this.setupContainer(domParent, containerSourceModuleString);
  }

  private async setupContainer(
    domParent: HTMLElement,
    containerSourceModuleString: string | Promise<string>
  ) {
    const shadowRoot = domParent.attachShadow({ mode: "open" });
    const resolvedModuleString = await containerSourceModuleString;

    if ((window as any).compoventuals_ContainerSource !== undefined) {
      throw new Error(
        "import error: window.compoventuals_ContainerSource already in use"
      );
    }

    // Load the ContainerSource module from string.
    const importUrl =
      "data:text/javascript;charset=utf-8," +
      encodeURIComponent(resolvedModuleString);
    // We need this webpackIgnore magic comment or else webpack
    // will try to do its thing to the import statement, compiling
    // it into a __webpack_require, which is incorrect: it should
    // be compiled as-is.
    // From https://github.com/webpack/webpack/issues/4175#issuecomment-770769441
    // TODO: this will require turning on magic comment
    // support in Webpack projects using this class.
    // Also note that in our tsconfig, we had to change the
    // module to es2020 (first version supporting dynamic
    // imports) or else TypeScript will try to convert it to
    // require().  Then we had to change moduleResolution to
    // node (default for commonJS but not for es2020) to
    // fix compile errors.
    const imported = await import(/* webpackIgnore: true */ importUrl);
    // TODO: we would prefer to do it this way and use
    // output.libraryTarget: "module" in webpack.config.ts,
    // but the feature is still in dev and broken last
    // time I tried it.  If changing, also remove
    // above check for window.compoventuals_ContainerSource.
    // const containerSource = imported.default;
    // TODO: need to use unique per-instance names,
    // it's possible multiple import()s could be pending
    // at once, and then they will fight over the name.
    // Make clear in docs what name to use, how to set.
    const containerSource = (window as any).compoventuals_ContainerSource;
    delete (window as any).compoventuals_ContainerSource;

    if (!isContainerSource(containerSource)) {
      // TODO: report to caller (this is in
      // a Promise).  Also catch Promise errors.
      throw new Error(
        "containerSourceModuleString did not yield a ContainerSource: " +
          containerSource
      );
    }

    // Use containerSource.
    containerSource.attachNewContainer(shadowRoot, (topLevelCrdt) =>
      this.mountPoint.prepareMount(topLevelCrdt)
    );
    // Mount.  This loads saveData and delivers saveData,
    // if applicable.
    this.mountPoint.mount();
    // Now the hosted Crdt is ready to use.
    this.emit("Ready", {});
  }

  get isReady(): boolean {
    return this.mountPoint.isMounted;
  }

  get hostedCrdt(): Crdt | undefined {
    return this.mountPoint.mountedCrdt;
  }
}

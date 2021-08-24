import {
  CausalTimestamp,
  Crdt,
  CrdtEventsRecord,
  CrdtParent,
  isContainerSource,
} from "compoventuals";

export interface ContainerHostEventsRecord extends CrdtEventsRecord {
  /**
   * Emitted once per instace when the container
   * is loaded (i.e., its ContainerSource is loaded
   * and then one instance is constructed using
   * attachNewContainer).  That includes when loading
   * from saveData.
   *
   * This is not a CrdtEvent because it has no associated
   * timestamp.  Instead of happening when a message is
   * received, it happens asynchronously sometime after
   * the ContainerHost is constructed - likely soon
   * after.  Specifically, this is emitted in
   * the ContainerSource's dynamic import's callback,
   * which will probably be called quickly because the dynamically
   * imported module
   * does not need to be fetched from the web.
   */
  Load: {};
}

// TODO: EC guarantee is weaker than usual because we have
// to wait

// TODO: cache Container instances?  Or can we rely
// on the browser to mostly do that for us?
// If we never reuse ContainerSource's, should we make
// them one-use (may slightly simplify implementations)?

// TODO: load event
// TODO: change domParent name if it's different from the ShadowRoot.
// If it's different, it must have a ShadowRoot available.
// TODO: expose internal Crdt / ContainerSource (with generic
// type?), in case user wants to interact it with according
// to an extended interface?  (As Optional.)
export class ContainerHost
  extends Crdt<ContainerHostEventsRecord>
  implements CrdtParent
{
  // Name: ""
  private containerCrdt: Crdt | undefined = undefined;

  constructor(domParent: HTMLElement, containerSourceModuleString: string) {
    super();

    const shadowRoot = domParent.attachShadow({ mode: "open" });

    // Load the ContainerSource module from string.
    const importUrl =
      "data:text/javascript;charset=utf-8," +
      encodeURIComponent(containerSourceModuleString);
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
    import(/* webpackIgnore: true */ importUrl).then((imported) => {
      // TODO: we would prefer to do it this way and use
      // output.libraryTarget: "module" in webpack.config.ts,
      // but the feature is still in dev and broken last
      // time I tried it.
      // const containerSource = imported.default;
      const containerSource = (window as any).compoventuals_ContainerSource;
      (window as any).compoventuals_ContainerSource = undefined;
      if (!isContainerSource(containerSource)) {
        // TODO: report to caller (this is in
        // a Promise).  Also catch Promise errors.
        throw new Error(
          "containerSourceModuleString did not yield a ContainerSource: " +
            containerSource
        );
      }
      // Use containerSource.
      containerSource.attachNewContainer(shadowRoot, (topLevelCrdt) => {
        this.containerCrdt = topLevelCrdt;
        if (this.afterInit) topLevelCrdt.init("", this);
        return topLevelCrdt;
      });
      // Now we are ready to receive Crdt messages.
      this.emit("Load", {});
    });
  }

  init(name: string, parent: CrdtParent) {
    super.init(name, parent);
    // Init containerCrdt if it was set before this was called.
    if (this.containerCrdt !== undefined) {
      this.containerCrdt.init("", this);
    }
  }

  onChildInit(child: Crdt<CrdtEventsRecord>): void {
    if (child !== this.containerCrdt) {
      throw new Error("Unexpected child: " + child);
    }
  }

  protected receiveInternal(
    targetPath: string[],
    timestamp: CausalTimestamp,
    message: Uint8Array
  ): void {
    throw new Error("Method not implemented.");
  }

  getChild(name: string): Crdt<CrdtEventsRecord> {
    throw new Error("Method not implemented.");
  }

  canGc(): boolean {
    throw new Error("Method not implemented.");
  }

  save(): [
    saveData: Uint8Array,
    children: Map<string, Crdt<CrdtEventsRecord>>
  ] {
    if (this.containerCrdt !== undefined) {
      // We have no state to save; containerCrdt speaks for itself.
      return [new Uint8Array(), new Map([["", this.containerCrdt!]])];
    } else {
      // TODO: save queued messages.
      return [TODO, new Map()];
    }
  }

  load(saveData: Uint8Array): void {
    throw new Error("Method not implemented.");
  }
}

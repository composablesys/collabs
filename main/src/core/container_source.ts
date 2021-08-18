import { Crdt } from "./crdt";

// TODO: supply a unique id?
// TODO: Note shadow dom.  Replace HTMLElement with
// whatever type the shadow root has, if more specific.
// Move the shadow dom code here once we get a demo working.
export interface ContainerSource {
  /**
   * Called by an container host to request a new instance
   * of the container represented by this source.
   * It must be safe to call this method multiple times,
   * generating completely independent instances.
   *
   * @param  domParent      Put all of your HTML components
   * in here, don't edit it otherwise.
   * TODO: can we guarantee its size etc. will
   * be set before calling it here?
   * @param  crdtParentHook Call this with your top-level
   * Crdt before returning, to attach it to the Runtime.
   * @return                [description]
   */
  attachNewContainer(
    domParent: HTMLElement,
    crdtParentHook: (topLevelCrdt: Crdt) => void
  ): void;
}

import { Crdt } from "./crdt";

// TODO: supply a unique id?
// TODO: Note shadow dom.  Replace HTMLElement with
// whatever type the shadow root has, if more specific.
// Move the shadow dom code here once we get a demo working.
// Perhaps name ShadowRoot "document", to shadow the global?
// (Users can rename if they want to access the actual global.)
// Would prevent document.getElementById errors.
// Could also separate out attached element (e.g. a div)
// vs ShadowRoot itself.
export interface ContainerSource {
  /**
   * Called by an container host to request a new instance
   * of the container represented by this source.
   * It must be safe to call this method multiple times,
   * generating completely independent instances.
   *
   * @param  domParent      Put all of your HTML components
   * in here, don't edit it otherwise.  It starts blank.
   * Note that it's not an HTMLElement, but you can
   * use appendChild to put a div inside it if you like.
   * For things like getElementById, use domParent instead
   * of document, due to the shadow DOM scoping.
   * (For callers: no need to attach to the DOM before calling
   * this method, domParent.getElementById will still work
   * on elements added within this method.)
   * TODO: can we guarantee its size etc. will
   * be set before calling it here?
   * @param  crdtParentHook Call this with your top-level
   * Crdt before returning, to attach it to the Runtime.
   * Use the usual addChild idiom (returns input).
   * @return                [description]
   */
  attachNewContainer(
    domParent: ShadowRoot,
    crdtParentHook: <C extends Crdt>(topLevelCrdt: C) => C
  ): void;

  isContainerSource: true;
}

export function isContainerSource(obj: any): obj is ContainerSource {
  if (typeof obj !== "object") return false;
  return (obj as ContainerSource).isContainerSource === true;
}

import { Crdt, EventEmitter, CrdtEventsRecord } from "compoventuals";

export interface ShadowRuntime extends EventEmitter<CrdtEventsRecord> {
  /**
   * TODO
   * @param
   * @return
   */
  registerCrdt<D extends Crdt>(name: string, child: D): D;

  readonly replicaId: string;
}

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
   * TODO: parameter names.  The shadowing is cute but inaccurate.
   *
   * @param  document Put all of your HTML components
   * in here, don't edit it otherwise.  It starts blank.
   * Note that it's not an HTMLElement, but you can
   * use appendChild to put a div inside it if you like.
   * For things like getElementById, use shadowRoot instead
   * of document, due to the shadow DOM scoping  We shadow
   * document's name to prevent errors here, although you are
   * free to rename it
   * .
   * For callers: no need to attach shadowRoot's parent to
   * the DOM before calling
   * this method, shadowRoot.getElementById will still work
   * on elements added within this method.
   *
   * TODO: can we guarantee its size etc. will
   * be set before calling it here?
   * @param  runtime Use this to register top-level Crdts,
   * like when using Runtime.
   *
   * For callers: you can use either a Runtime (if this container
   * is your only Crdt content) or a CrdtShadowRoot (if you want
   * to encapsulate the container in a Crdt).
   */
  attachNewContainer(document: ShadowRoot, runtime: ShadowRuntime): void;

  isContainerSource: true;
}

export function isContainerSource(obj: any): obj is ContainerSource {
  if (typeof obj !== "object") return false;
  return (obj as ContainerSource).isContainerSource === true;
}

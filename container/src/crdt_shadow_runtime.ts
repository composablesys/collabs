import { CompositeCrdt, Crdt } from "compoventuals";
import { ShadowRuntime } from "./container_source";

export class CrdtShadowRuntime extends CompositeCrdt implements ShadowRuntime {
  /**
   * Exposes CompositeCrdt.addChild publicly.
   */
  public registerCrdt<D extends Crdt>(name: string, child: D): D {
    return super.addChild(name, child);
  }

  get replicaId(): string {
    return this.runtime.replicaId;
  }
}

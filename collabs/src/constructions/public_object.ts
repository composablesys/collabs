import { CObject } from "./object";
import { Collab, Pre } from "../core";

/**
 * A CObject that exposes its [[addChild]] method publicly,
 * so that users can set its children.
 *
 * As with an ordinary CObject, the calls to [[addChild]] must
 * be identical on all replicas, and they must be made before
 * using the Collab (loading or receiving).
 */
export class PublicCObject extends CObject {
  addChild<C extends Collab>(name: string, preChild: Pre<C>): C {
    return super.addChild(name, preChild);
  }
}

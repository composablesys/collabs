// Import CObject from a specific file, to avoid preloading
// the whole constructions directory, which sometimes causes
// circular dependency errors.
import { CObject } from "../../constructions/object";
import { Collab, Pre } from "../crdt";

// TODO: different directly? E.g. constuctions? Also, different
// name, e.g., Registry (and then also rename addChild -> registerCollab)?

/**
 * A CObject that exposes its [[addChild]] method publicly,
 * so that users can set its children.
 *
 * As with an ordinary CObject, the calls to [[addChild]] must
 * be identical on all replicas, and they must be made before
 * using the Collab (loading, sending, or receiving).
 */
export class PublicCObject extends CObject {
  addChild<C extends Collab>(name: string, preChild: Pre<C>): C {
    return super.addChild(name, preChild);
  }
}

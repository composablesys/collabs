// Import from specific files to avoid circular dependencies.
import { CObject } from "../constructions/c_object";
import { CPrimitive } from "../constructions/c_primitive";
import { Collab } from "../core";
import { MakeAbstractSet } from "./abstract_set";

export const AbstractSet_Collab = MakeAbstractSet(Collab);
export const AbstractSet_CObject = MakeAbstractSet(CObject);
export const AbstractSet_CPrimitive = MakeAbstractSet(CPrimitive);

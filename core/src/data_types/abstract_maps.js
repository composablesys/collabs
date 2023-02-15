// Import from specific files to avoid circular dependencies.
import { CObject } from "../constructions/c_object";
import { CPrimitive } from "../constructions/c_primitive";
import { Collab } from "../core";
import { MakeAbstractMap } from "./abstract_map";

export const AbstractMap_Collab = MakeAbstractMap(Collab);
export const AbstractMap_CObject = MakeAbstractMap(CObject);
export const AbstractMap_CPrimitive = MakeAbstractMap(CPrimitive);

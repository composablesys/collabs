// Import from specific files to avoid circular dependencies.
import { CObject } from "../constructions/c_object";
import { CPrimitive } from "../constructions/c_primitive";
import { Collab } from "../core";
import { MakeAbstractList } from "./abstract_list";

export const AbstractList_Collab = MakeAbstractList(Collab);
export const AbstractList_CObject = MakeAbstractList(CObject);
export const AbstractList_CPrimitive = MakeAbstractList(CPrimitive);

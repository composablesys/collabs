import {
  MakeAbstractList,
  MakeAbstractMap,
  MakeAbstractSet,
} from "@collabs/core";
import { PrimitiveCRDT } from "./primitive_crdt";

export const AbstractSet_PrimitiveCRDT = MakeAbstractSet(PrimitiveCRDT);
export const AbstractMap_PrimitiveCRDT = MakeAbstractMap(PrimitiveCRDT);
export const AbstractList_PrimitiveCRDT = MakeAbstractList(PrimitiveCRDT);

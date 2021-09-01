import { CrdtInitToken } from "../../core";
import { TextArraySerializer, TextSerializer } from "../../util";
import { PrimitiveCList } from "./primitive_list";

export class CText extends PrimitiveCList<string> {
  constructor(initToken: CrdtInitToken) {
    super(initToken, TextSerializer.instance, TextArraySerializer.instance);
  }
}

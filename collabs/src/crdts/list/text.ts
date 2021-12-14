import { InitToken } from "../../core";
import { TextArraySerializer, TextSerializer } from "../../util";
import { PrimitiveCList } from "./primitive_list";

export class CText extends PrimitiveCList<string> {
  constructor(initToken: InitToken) {
    super(initToken, TextSerializer.instance, TextArraySerializer.instance);
  }

  /**
   * @return this's string value
   */
  toString() {
    return this.join("");
  }
}

import { InitToken, TextArraySerializer, TextSerializer } from "@collabs/core";
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

import { TextArraySerializer, TextSerializer } from "../../util";
import { PrimitiveCList } from "./primitive_list";

export class CText extends PrimitiveCList<string> {
  constructor() {
    super(TextSerializer.instance, TextArraySerializer.instance);
  }
}

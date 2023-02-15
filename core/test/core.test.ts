import { assert } from "chai";
import { Bytes } from "../src";

describe("util", () => {
  describe("Bytes", () => {
    it("parse inverts stringify", () => {
      const start = new Uint8Array(5);
      start.fill(7);

      const stringified = Bytes.stringify(start);
      const parsed = Bytes.parse(stringified);

      assert.isTrue(
        Bytes.equals(start, parsed),
        `parsed != start (stringified: ${stringified}`
      );
    });
  });
});

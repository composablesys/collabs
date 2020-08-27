"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageCrdt = void 0;
const compoventuals_client_1 = require("compoventuals-client");
/**
 * onchange description is [x, y] of the pixel changed.
 * Call getPixel to learn its new value.
 *
 * Internally, stored as 1D column-major array of r,g,b MVRs.
 * TODO: could use colors directly instead.
 * r, g, b are on 0-255 scale.
 */
class ImageCrdt extends compoventuals_client_1.crdts.DefaultResetWinsCrdt {
    constructor(id, runtime, width, height) {
        let emptyOfLength = [];
        emptyOfLength.length = width * height;
        super(id, new compoventuals_client_1.crdts.ArrayCrdtInternal(new compoventuals_client_1.crdts.MultiValueRegisterInternal()), emptyOfLength, runtime, emptyOfLength);
        this.width = width;
        this.height = height;
    }
    getIndex(x, y) {
        if (!(x >= 0 && x < this.width && Number.isInteger(x) &&
            y >= 0 && y < this.height && Number.isInteger(y))) {
            throw new Error("Out of bounds: " + x + ", " + y);
        }
        return x + y * this.width;
    }
    setPixel(x, y, color) {
        this.applyOp([this.getIndex(x, y), ["set", color]]);
    }
    /**
     * Returns the color as [r, g, b].
     */
    getPixel(x, y) {
        let value = this.originalStateResetWins[this.getIndex(x, y)];
        let avg = [0, 0, 0];
        for (let entry of value.values()) {
            let color = entry[0];
            avg[0] += color[0];
            avg[1] += color[1];
            avg[2] += color[2];
        }
        if (value.size !== 0) {
            avg[0] /= value.size;
            avg[1] /= value.size;
            avg[2] /= value.size;
        }
        return avg;
    }
    translateDescriptionsResetWins(descriptions) {
        let indexChanged = descriptions[0][0];
        return [indexChanged % this.width, Math.floor(indexChanged / this.width)];
    }
}
exports.ImageCrdt = ImageCrdt;
//# sourceMappingURL=whiteboard_crdt.js.map
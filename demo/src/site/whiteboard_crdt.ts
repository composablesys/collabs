import { crdts, network } from "compoventuals-client";

/**
 * onchange description is [x, y] of the pixel changed.
 * Call getPixel to learn its new value.
 *
 * Internally, stored as 1D column-major array of r,g,b MVRs.
 * TODO: could use colors directly instead.
 * r, g, b are on 0-255 scale.
 */
export class ImageCrdt extends crdts.DefaultResetWinsCrdt<Set<[[number, number, number], any, number]>[]> {
    width: number;
    height: number;
    constructor(id: any, runtime: network.CrdtRuntime, width: number, height: number) {
        let emptyOfLength: number[] = []
        emptyOfLength.length = width * height;
        super(
            id, new crdts.ArrayCrdtInternal(
                new crdts.MultiValueRegisterInternal()
            ),
            emptyOfLength, runtime, emptyOfLength
        );
        this.width = width;
        this.height = height;
    }
    private getIndex(x: number, y: number) {
        if (
            !(x >= 0 && x < this.width && Number.isInteger(x) &&
            y >= 0 && y < this.height && Number.isInteger(y))
        ) {
            throw new Error("Out of bounds: " + x + ", " + y);
        }
        return x + y * this.width;
    }
    setPixel(x: number, y: number, color: [number, number, number]) {
        this.applyOp([this.getIndex(x, y), ["set", color]]);
    }
    /**
     * Returns the color as [r, g, b].
     */
    getPixel(x: number, y: number) {
        let value = this.originalStateResetWins[this.getIndex(x, y)];
        let avg: [number, number, number] = [0, 0, 0];
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
    protected translateDescriptionsResetWins(descriptions: Array<[number, any]>): [number, number] {
        let indexChanged = descriptions[0][0];
        return [indexChanged % this.width, Math.floor(indexChanged / this.width)];
    }
}

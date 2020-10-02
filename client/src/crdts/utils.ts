export class Utils {
    static jsonSerialize<T>(value: T): Uint8Array {
        return new TextEncoder().encode(JSON.stringify(value));
    }

    static jsonDeserialize<T>(serialized: Uint8Array): T {
        return JSON.parse(new TextDecoder().decode(serialized)) as T;
    }
}

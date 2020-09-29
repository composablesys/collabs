import * as $protobuf from "protobufjs";
/** Properties of a CounterMessage. */
export interface ICounterMessage {

    /** CounterMessage toAdd */
    toAdd: number;
}

/** Represents a CounterMessage. */
export class CounterMessage implements ICounterMessage {

    /**
     * Constructs a new CounterMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICounterMessage);

    /** CounterMessage toAdd. */
    public toAdd: number;

    /**
     * Creates a new CounterMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CounterMessage instance
     */
    public static create(properties?: ICounterMessage): CounterMessage;

    /**
     * Encodes the specified CounterMessage message. Does not implicitly {@link CounterMessage.verify|verify} messages.
     * @param message CounterMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ICounterMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CounterMessage message, length delimited. Does not implicitly {@link CounterMessage.verify|verify} messages.
     * @param message CounterMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ICounterMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CounterMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CounterMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CounterMessage;

    /**
     * Decodes a CounterMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CounterMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CounterMessage;

    /**
     * Verifies a CounterMessage message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a CounterMessage message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CounterMessage
     */
    public static fromObject(object: { [k: string]: any }): CounterMessage;

    /**
     * Creates a plain object from a CounterMessage message. Also converts values to other types if specified.
     * @param message CounterMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: CounterMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this CounterMessage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a MultRegisterMessage. */
export interface IMultRegisterMessage {

    /** MultRegisterMessage toMult */
    toMult: number;
}

/** Represents a MultRegisterMessage. */
export class MultRegisterMessage implements IMultRegisterMessage {

    /**
     * Constructs a new MultRegisterMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: IMultRegisterMessage);

    /** MultRegisterMessage toMult. */
    public toMult: number;

    /**
     * Creates a new MultRegisterMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns MultRegisterMessage instance
     */
    public static create(properties?: IMultRegisterMessage): MultRegisterMessage;

    /**
     * Encodes the specified MultRegisterMessage message. Does not implicitly {@link MultRegisterMessage.verify|verify} messages.
     * @param message MultRegisterMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IMultRegisterMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified MultRegisterMessage message, length delimited. Does not implicitly {@link MultRegisterMessage.verify|verify} messages.
     * @param message MultRegisterMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IMultRegisterMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a MultRegisterMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns MultRegisterMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MultRegisterMessage;

    /**
     * Decodes a MultRegisterMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns MultRegisterMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MultRegisterMessage;

    /**
     * Verifies a MultRegisterMessage message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a MultRegisterMessage message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns MultRegisterMessage
     */
    public static fromObject(object: { [k: string]: any }): MultRegisterMessage;

    /**
     * Creates a plain object from a MultRegisterMessage message. Also converts values to other types if specified.
     * @param message MultRegisterMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: MultRegisterMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this MultRegisterMessage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

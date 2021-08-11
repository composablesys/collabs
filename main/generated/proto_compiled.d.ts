import * as $protobuf from "protobufjs";
/** Properties of a DefaultCausalBroadcastMessage. */
export interface IDefaultCausalBroadcastMessage {

    /** DefaultCausalBroadcastMessage message */
    message: Uint8Array;

    /** DefaultCausalBroadcastMessage sender */
    sender: string;

    /** DefaultCausalBroadcastMessage senderCounter */
    senderCounter: number;

    /** DefaultCausalBroadcastMessage vectorMap */
    vectorMap?: ({ [k: string]: number }|null);

    /** DefaultCausalBroadcastMessage time */
    time: (number|Long);
}

/** Represents a DefaultCausalBroadcastMessage. */
export class DefaultCausalBroadcastMessage implements IDefaultCausalBroadcastMessage {

    /**
     * Constructs a new DefaultCausalBroadcastMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: IDefaultCausalBroadcastMessage);

    /** DefaultCausalBroadcastMessage message. */
    public message: Uint8Array;

    /** DefaultCausalBroadcastMessage sender. */
    public sender: string;

    /** DefaultCausalBroadcastMessage senderCounter. */
    public senderCounter: number;

    /** DefaultCausalBroadcastMessage vectorMap. */
    public vectorMap: { [k: string]: number };

    /** DefaultCausalBroadcastMessage time. */
    public time: (number|Long);

    /**
     * Creates a new DefaultCausalBroadcastMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns DefaultCausalBroadcastMessage instance
     */
    public static create(properties?: IDefaultCausalBroadcastMessage): DefaultCausalBroadcastMessage;

    /**
     * Encodes the specified DefaultCausalBroadcastMessage message. Does not implicitly {@link DefaultCausalBroadcastMessage.verify|verify} messages.
     * @param message DefaultCausalBroadcastMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IDefaultCausalBroadcastMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified DefaultCausalBroadcastMessage message, length delimited. Does not implicitly {@link DefaultCausalBroadcastMessage.verify|verify} messages.
     * @param message DefaultCausalBroadcastMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IDefaultCausalBroadcastMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a DefaultCausalBroadcastMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns DefaultCausalBroadcastMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DefaultCausalBroadcastMessage;

    /**
     * Decodes a DefaultCausalBroadcastMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns DefaultCausalBroadcastMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DefaultCausalBroadcastMessage;

    /**
     * Verifies a DefaultCausalBroadcastMessage message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a DefaultCausalBroadcastMessage message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns DefaultCausalBroadcastMessage
     */
    public static fromObject(object: { [k: string]: any }): DefaultCausalBroadcastMessage;

    /**
     * Creates a plain object from a DefaultCausalBroadcastMessage message. Also converts values to other types if specified.
     * @param message DefaultCausalBroadcastMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: DefaultCausalBroadcastMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this DefaultCausalBroadcastMessage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a DefaultCausalBroadcastSave. */
export interface IDefaultCausalBroadcastSave {

    /** DefaultCausalBroadcastSave vectorMap */
    vectorMap?: ({ [k: string]: number }|null);

    /** DefaultCausalBroadcastSave messageBuffer */
    messageBuffer?: (Uint8Array[]|null);

    /** DefaultCausalBroadcastSave bufferCheckIndex */
    bufferCheckIndex: number;

    /** DefaultCausalBroadcastSave broadcastNetworkSave */
    broadcastNetworkSave: Uint8Array;
}

/** Represents a DefaultCausalBroadcastSave. */
export class DefaultCausalBroadcastSave implements IDefaultCausalBroadcastSave {

    /**
     * Constructs a new DefaultCausalBroadcastSave.
     * @param [properties] Properties to set
     */
    constructor(properties?: IDefaultCausalBroadcastSave);

    /** DefaultCausalBroadcastSave vectorMap. */
    public vectorMap: { [k: string]: number };

    /** DefaultCausalBroadcastSave messageBuffer. */
    public messageBuffer: Uint8Array[];

    /** DefaultCausalBroadcastSave bufferCheckIndex. */
    public bufferCheckIndex: number;

    /** DefaultCausalBroadcastSave broadcastNetworkSave. */
    public broadcastNetworkSave: Uint8Array;

    /**
     * Creates a new DefaultCausalBroadcastSave instance using the specified properties.
     * @param [properties] Properties to set
     * @returns DefaultCausalBroadcastSave instance
     */
    public static create(properties?: IDefaultCausalBroadcastSave): DefaultCausalBroadcastSave;

    /**
     * Encodes the specified DefaultCausalBroadcastSave message. Does not implicitly {@link DefaultCausalBroadcastSave.verify|verify} messages.
     * @param message DefaultCausalBroadcastSave message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IDefaultCausalBroadcastSave, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified DefaultCausalBroadcastSave message, length delimited. Does not implicitly {@link DefaultCausalBroadcastSave.verify|verify} messages.
     * @param message DefaultCausalBroadcastSave message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IDefaultCausalBroadcastSave, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a DefaultCausalBroadcastSave message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns DefaultCausalBroadcastSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DefaultCausalBroadcastSave;

    /**
     * Decodes a DefaultCausalBroadcastSave message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns DefaultCausalBroadcastSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DefaultCausalBroadcastSave;

    /**
     * Verifies a DefaultCausalBroadcastSave message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a DefaultCausalBroadcastSave message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns DefaultCausalBroadcastSave
     */
    public static fromObject(object: { [k: string]: any }): DefaultCausalBroadcastSave;

    /**
     * Creates a plain object from a DefaultCausalBroadcastSave message. Also converts values to other types if specified.
     * @param message DefaultCausalBroadcastSave
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: DefaultCausalBroadcastSave, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this DefaultCausalBroadcastSave to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a CrdtReference. */
export interface ICrdtReference {

    /** CrdtReference pathToBase */
    pathToBase?: (Uint8Array[]|null);
}

/** Represents a CrdtReference. */
export class CrdtReference implements ICrdtReference {

    /**
     * Constructs a new CrdtReference.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICrdtReference);

    /** CrdtReference pathToBase. */
    public pathToBase: Uint8Array[];

    /**
     * Creates a new CrdtReference instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CrdtReference instance
     */
    public static create(properties?: ICrdtReference): CrdtReference;

    /**
     * Encodes the specified CrdtReference message. Does not implicitly {@link CrdtReference.verify|verify} messages.
     * @param message CrdtReference message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ICrdtReference, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CrdtReference message, length delimited. Does not implicitly {@link CrdtReference.verify|verify} messages.
     * @param message CrdtReference message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ICrdtReference, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CrdtReference message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CrdtReference
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CrdtReference;

    /**
     * Decodes a CrdtReference message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CrdtReference
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CrdtReference;

    /**
     * Verifies a CrdtReference message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a CrdtReference message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CrdtReference
     */
    public static fromObject(object: { [k: string]: any }): CrdtReference;

    /**
     * Creates a plain object from a CrdtReference message. Also converts values to other types if specified.
     * @param message CrdtReference
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: CrdtReference, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this CrdtReference to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of an ArrayMessage. */
export interface IArrayMessage {

    /** ArrayMessage elements */
    elements?: (Uint8Array[]|null);
}

/** Represents an ArrayMessage. */
export class ArrayMessage implements IArrayMessage {

    /**
     * Constructs a new ArrayMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: IArrayMessage);

    /** ArrayMessage elements. */
    public elements: Uint8Array[];

    /**
     * Creates a new ArrayMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ArrayMessage instance
     */
    public static create(properties?: IArrayMessage): ArrayMessage;

    /**
     * Encodes the specified ArrayMessage message. Does not implicitly {@link ArrayMessage.verify|verify} messages.
     * @param message ArrayMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IArrayMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ArrayMessage message, length delimited. Does not implicitly {@link ArrayMessage.verify|verify} messages.
     * @param message ArrayMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IArrayMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an ArrayMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ArrayMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ArrayMessage;

    /**
     * Decodes an ArrayMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ArrayMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ArrayMessage;

    /**
     * Verifies an ArrayMessage message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an ArrayMessage message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ArrayMessage
     */
    public static fromObject(object: { [k: string]: any }): ArrayMessage;

    /**
     * Creates a plain object from an ArrayMessage message. Also converts values to other types if specified.
     * @param message ArrayMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ArrayMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ArrayMessage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of an ObjectMessage. */
export interface IObjectMessage {

    /** ObjectMessage properties */
    properties?: ({ [k: string]: Uint8Array }|null);
}

/** Represents an ObjectMessage. */
export class ObjectMessage implements IObjectMessage {

    /**
     * Constructs a new ObjectMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: IObjectMessage);

    /** ObjectMessage properties. */
    public properties: { [k: string]: Uint8Array };

    /**
     * Creates a new ObjectMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ObjectMessage instance
     */
    public static create(properties?: IObjectMessage): ObjectMessage;

    /**
     * Encodes the specified ObjectMessage message. Does not implicitly {@link ObjectMessage.verify|verify} messages.
     * @param message ObjectMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IObjectMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ObjectMessage message, length delimited. Does not implicitly {@link ObjectMessage.verify|verify} messages.
     * @param message ObjectMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IObjectMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an ObjectMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ObjectMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ObjectMessage;

    /**
     * Decodes an ObjectMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ObjectMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ObjectMessage;

    /**
     * Verifies an ObjectMessage message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an ObjectMessage message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ObjectMessage
     */
    public static fromObject(object: { [k: string]: any }): ObjectMessage;

    /**
     * Creates a plain object from an ObjectMessage message. Also converts values to other types if specified.
     * @param message ObjectMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ObjectMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ObjectMessage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a DefaultSerializerMessage. */
export interface IDefaultSerializerMessage {

    /** DefaultSerializerMessage stringValue */
    stringValue?: (string|null);

    /** DefaultSerializerMessage numberValue */
    numberValue?: (number|null);

    /** DefaultSerializerMessage booleanValue */
    booleanValue?: (boolean|null);

    /** DefaultSerializerMessage undefinedValue */
    undefinedValue?: (boolean|null);

    /** DefaultSerializerMessage nullValue */
    nullValue?: (boolean|null);

    /** DefaultSerializerMessage crdtValue */
    crdtValue?: (ICrdtReference|null);

    /** DefaultSerializerMessage arrayValue */
    arrayValue?: (IArrayMessage|null);

    /** DefaultSerializerMessage objectValue */
    objectValue?: (IObjectMessage|null);
}

/** Represents a DefaultSerializerMessage. */
export class DefaultSerializerMessage implements IDefaultSerializerMessage {

    /**
     * Constructs a new DefaultSerializerMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: IDefaultSerializerMessage);

    /** DefaultSerializerMessage stringValue. */
    public stringValue: string;

    /** DefaultSerializerMessage numberValue. */
    public numberValue: number;

    /** DefaultSerializerMessage booleanValue. */
    public booleanValue: boolean;

    /** DefaultSerializerMessage undefinedValue. */
    public undefinedValue: boolean;

    /** DefaultSerializerMessage nullValue. */
    public nullValue: boolean;

    /** DefaultSerializerMessage crdtValue. */
    public crdtValue?: (ICrdtReference|null);

    /** DefaultSerializerMessage arrayValue. */
    public arrayValue?: (IArrayMessage|null);

    /** DefaultSerializerMessage objectValue. */
    public objectValue?: (IObjectMessage|null);

    /** DefaultSerializerMessage value. */
    public value?: ("stringValue"|"numberValue"|"booleanValue"|"undefinedValue"|"nullValue"|"crdtValue"|"arrayValue"|"objectValue");

    /**
     * Creates a new DefaultSerializerMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns DefaultSerializerMessage instance
     */
    public static create(properties?: IDefaultSerializerMessage): DefaultSerializerMessage;

    /**
     * Encodes the specified DefaultSerializerMessage message. Does not implicitly {@link DefaultSerializerMessage.verify|verify} messages.
     * @param message DefaultSerializerMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IDefaultSerializerMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified DefaultSerializerMessage message, length delimited. Does not implicitly {@link DefaultSerializerMessage.verify|verify} messages.
     * @param message DefaultSerializerMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IDefaultSerializerMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a DefaultSerializerMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns DefaultSerializerMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DefaultSerializerMessage;

    /**
     * Decodes a DefaultSerializerMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns DefaultSerializerMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DefaultSerializerMessage;

    /**
     * Verifies a DefaultSerializerMessage message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a DefaultSerializerMessage message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns DefaultSerializerMessage
     */
    public static fromObject(object: { [k: string]: any }): DefaultSerializerMessage;

    /**
     * Creates a plain object from a DefaultSerializerMessage message. Also converts values to other types if specified.
     * @param message DefaultSerializerMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: DefaultSerializerMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this DefaultSerializerMessage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a PairSerializerMessage. */
export interface IPairSerializerMessage {

    /** PairSerializerMessage one */
    one: Uint8Array;

    /** PairSerializerMessage two */
    two: Uint8Array;
}

/** Represents a PairSerializerMessage. */
export class PairSerializerMessage implements IPairSerializerMessage {

    /**
     * Constructs a new PairSerializerMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPairSerializerMessage);

    /** PairSerializerMessage one. */
    public one: Uint8Array;

    /** PairSerializerMessage two. */
    public two: Uint8Array;

    /**
     * Creates a new PairSerializerMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PairSerializerMessage instance
     */
    public static create(properties?: IPairSerializerMessage): PairSerializerMessage;

    /**
     * Encodes the specified PairSerializerMessage message. Does not implicitly {@link PairSerializerMessage.verify|verify} messages.
     * @param message PairSerializerMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPairSerializerMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified PairSerializerMessage message, length delimited. Does not implicitly {@link PairSerializerMessage.verify|verify} messages.
     * @param message PairSerializerMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPairSerializerMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a PairSerializerMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PairSerializerMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PairSerializerMessage;

    /**
     * Decodes a PairSerializerMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PairSerializerMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): PairSerializerMessage;

    /**
     * Verifies a PairSerializerMessage message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a PairSerializerMessage message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns PairSerializerMessage
     */
    public static fromObject(object: { [k: string]: any }): PairSerializerMessage;

    /**
     * Creates a plain object from a PairSerializerMessage message. Also converts values to other types if specified.
     * @param message PairSerializerMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: PairSerializerMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this PairSerializerMessage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a BitSetSerialized. */
export interface IBitSetSerialized {

    /** BitSetSerialized array */
    array: Uint8Array;

    /** BitSetSerialized length */
    length: number;
}

/** Represents a BitSetSerialized. */
export class BitSetSerialized implements IBitSetSerialized {

    /**
     * Constructs a new BitSetSerialized.
     * @param [properties] Properties to set
     */
    constructor(properties?: IBitSetSerialized);

    /** BitSetSerialized array. */
    public array: Uint8Array;

    /** BitSetSerialized length. */
    public length: number;

    /**
     * Creates a new BitSetSerialized instance using the specified properties.
     * @param [properties] Properties to set
     * @returns BitSetSerialized instance
     */
    public static create(properties?: IBitSetSerialized): BitSetSerialized;

    /**
     * Encodes the specified BitSetSerialized message. Does not implicitly {@link BitSetSerialized.verify|verify} messages.
     * @param message BitSetSerialized message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IBitSetSerialized, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified BitSetSerialized message, length delimited. Does not implicitly {@link BitSetSerialized.verify|verify} messages.
     * @param message BitSetSerialized message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IBitSetSerialized, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a BitSetSerialized message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns BitSetSerialized
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BitSetSerialized;

    /**
     * Decodes a BitSetSerialized message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns BitSetSerialized
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BitSetSerialized;

    /**
     * Verifies a BitSetSerialized message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a BitSetSerialized message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns BitSetSerialized
     */
    public static fromObject(object: { [k: string]: any }): BitSetSerialized;

    /**
     * Creates a plain object from a BitSetSerialized message. Also converts values to other types if specified.
     * @param message BitSetSerialized
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: BitSetSerialized, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this BitSetSerialized to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a DeletingMutCSetCreateMessage. */
export interface IDeletingMutCSetCreateMessage {

    /** DeletingMutCSetCreateMessage replicaUniqueNumber */
    replicaUniqueNumber: number;

    /** DeletingMutCSetCreateMessage args */
    args: Uint8Array;
}

/** Represents a DeletingMutCSetCreateMessage. */
export class DeletingMutCSetCreateMessage implements IDeletingMutCSetCreateMessage {

    /**
     * Constructs a new DeletingMutCSetCreateMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: IDeletingMutCSetCreateMessage);

    /** DeletingMutCSetCreateMessage replicaUniqueNumber. */
    public replicaUniqueNumber: number;

    /** DeletingMutCSetCreateMessage args. */
    public args: Uint8Array;

    /**
     * Creates a new DeletingMutCSetCreateMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns DeletingMutCSetCreateMessage instance
     */
    public static create(properties?: IDeletingMutCSetCreateMessage): DeletingMutCSetCreateMessage;

    /**
     * Encodes the specified DeletingMutCSetCreateMessage message. Does not implicitly {@link DeletingMutCSetCreateMessage.verify|verify} messages.
     * @param message DeletingMutCSetCreateMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IDeletingMutCSetCreateMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified DeletingMutCSetCreateMessage message, length delimited. Does not implicitly {@link DeletingMutCSetCreateMessage.verify|verify} messages.
     * @param message DeletingMutCSetCreateMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IDeletingMutCSetCreateMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a DeletingMutCSetCreateMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns DeletingMutCSetCreateMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DeletingMutCSetCreateMessage;

    /**
     * Decodes a DeletingMutCSetCreateMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns DeletingMutCSetCreateMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DeletingMutCSetCreateMessage;

    /**
     * Verifies a DeletingMutCSetCreateMessage message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a DeletingMutCSetCreateMessage message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns DeletingMutCSetCreateMessage
     */
    public static fromObject(object: { [k: string]: any }): DeletingMutCSetCreateMessage;

    /**
     * Creates a plain object from a DeletingMutCSetCreateMessage message. Also converts values to other types if specified.
     * @param message DeletingMutCSetCreateMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: DeletingMutCSetCreateMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this DeletingMutCSetCreateMessage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a DeletingMutCSetMessage. */
export interface IDeletingMutCSetMessage {

    /** DeletingMutCSetMessage add */
    add?: (IDeletingMutCSetCreateMessage|null);

    /** DeletingMutCSetMessage delete */
    "delete"?: (string|null);
}

/** Represents a DeletingMutCSetMessage. */
export class DeletingMutCSetMessage implements IDeletingMutCSetMessage {

    /**
     * Constructs a new DeletingMutCSetMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: IDeletingMutCSetMessage);

    /** DeletingMutCSetMessage add. */
    public add?: (IDeletingMutCSetCreateMessage|null);

    /** DeletingMutCSetMessage delete. */
    public delete: string;

    /** DeletingMutCSetMessage op. */
    public op?: ("add"|"delete");

    /**
     * Creates a new DeletingMutCSetMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns DeletingMutCSetMessage instance
     */
    public static create(properties?: IDeletingMutCSetMessage): DeletingMutCSetMessage;

    /**
     * Encodes the specified DeletingMutCSetMessage message. Does not implicitly {@link DeletingMutCSetMessage.verify|verify} messages.
     * @param message DeletingMutCSetMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IDeletingMutCSetMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified DeletingMutCSetMessage message, length delimited. Does not implicitly {@link DeletingMutCSetMessage.verify|verify} messages.
     * @param message DeletingMutCSetMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IDeletingMutCSetMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a DeletingMutCSetMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns DeletingMutCSetMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DeletingMutCSetMessage;

    /**
     * Decodes a DeletingMutCSetMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns DeletingMutCSetMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DeletingMutCSetMessage;

    /**
     * Verifies a DeletingMutCSetMessage message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a DeletingMutCSetMessage message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns DeletingMutCSetMessage
     */
    public static fromObject(object: { [k: string]: any }): DeletingMutCSetMessage;

    /**
     * Creates a plain object from a DeletingMutCSetMessage message. Also converts values to other types if specified.
     * @param message DeletingMutCSetMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: DeletingMutCSetMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this DeletingMutCSetMessage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a DeletingMutCSetArgs. */
export interface IDeletingMutCSetArgs {

    /** DeletingMutCSetArgs name */
    name: Uint8Array;

    /** DeletingMutCSetArgs args */
    args: Uint8Array;
}

/** Represents a DeletingMutCSetArgs. */
export class DeletingMutCSetArgs implements IDeletingMutCSetArgs {

    /**
     * Constructs a new DeletingMutCSetArgs.
     * @param [properties] Properties to set
     */
    constructor(properties?: IDeletingMutCSetArgs);

    /** DeletingMutCSetArgs name. */
    public name: Uint8Array;

    /** DeletingMutCSetArgs args. */
    public args: Uint8Array;

    /**
     * Creates a new DeletingMutCSetArgs instance using the specified properties.
     * @param [properties] Properties to set
     * @returns DeletingMutCSetArgs instance
     */
    public static create(properties?: IDeletingMutCSetArgs): DeletingMutCSetArgs;

    /**
     * Encodes the specified DeletingMutCSetArgs message. Does not implicitly {@link DeletingMutCSetArgs.verify|verify} messages.
     * @param message DeletingMutCSetArgs message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IDeletingMutCSetArgs, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified DeletingMutCSetArgs message, length delimited. Does not implicitly {@link DeletingMutCSetArgs.verify|verify} messages.
     * @param message DeletingMutCSetArgs message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IDeletingMutCSetArgs, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a DeletingMutCSetArgs message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns DeletingMutCSetArgs
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DeletingMutCSetArgs;

    /**
     * Decodes a DeletingMutCSetArgs message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns DeletingMutCSetArgs
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DeletingMutCSetArgs;

    /**
     * Verifies a DeletingMutCSetArgs message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a DeletingMutCSetArgs message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns DeletingMutCSetArgs
     */
    public static fromObject(object: { [k: string]: any }): DeletingMutCSetArgs;

    /**
     * Creates a plain object from a DeletingMutCSetArgs message. Also converts values to other types if specified.
     * @param message DeletingMutCSetArgs
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: DeletingMutCSetArgs, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this DeletingMutCSetArgs to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a DeletingMutCSetSave. */
export interface IDeletingMutCSetSave {

    /** DeletingMutCSetSave constructorArgs */
    constructorArgs?: (IDeletingMutCSetArgs[]|null);
}

/** Represents a DeletingMutCSetSave. */
export class DeletingMutCSetSave implements IDeletingMutCSetSave {

    /**
     * Constructs a new DeletingMutCSetSave.
     * @param [properties] Properties to set
     */
    constructor(properties?: IDeletingMutCSetSave);

    /** DeletingMutCSetSave constructorArgs. */
    public constructorArgs: IDeletingMutCSetArgs[];

    /**
     * Creates a new DeletingMutCSetSave instance using the specified properties.
     * @param [properties] Properties to set
     * @returns DeletingMutCSetSave instance
     */
    public static create(properties?: IDeletingMutCSetSave): DeletingMutCSetSave;

    /**
     * Encodes the specified DeletingMutCSetSave message. Does not implicitly {@link DeletingMutCSetSave.verify|verify} messages.
     * @param message DeletingMutCSetSave message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IDeletingMutCSetSave, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified DeletingMutCSetSave message, length delimited. Does not implicitly {@link DeletingMutCSetSave.verify|verify} messages.
     * @param message DeletingMutCSetSave message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IDeletingMutCSetSave, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a DeletingMutCSetSave message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns DeletingMutCSetSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DeletingMutCSetSave;

    /**
     * Decodes a DeletingMutCSetSave message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns DeletingMutCSetSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DeletingMutCSetSave;

    /**
     * Verifies a DeletingMutCSetSave message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a DeletingMutCSetSave message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns DeletingMutCSetSave
     */
    public static fromObject(object: { [k: string]: any }): DeletingMutCSetSave;

    /**
     * Creates a plain object from a DeletingMutCSetSave message. Also converts values to other types if specified.
     * @param message DeletingMutCSetSave
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: DeletingMutCSetSave, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this DeletingMutCSetSave to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a MutCSetFromMapKeyMessage. */
export interface IMutCSetFromMapKeyMessage {

    /** MutCSetFromMapKeyMessage sender */
    sender: string;

    /** MutCSetFromMapKeyMessage uniqueNumber */
    uniqueNumber: number;

    /** MutCSetFromMapKeyMessage args */
    args?: (Uint8Array|null);
}

/** Represents a MutCSetFromMapKeyMessage. */
export class MutCSetFromMapKeyMessage implements IMutCSetFromMapKeyMessage {

    /**
     * Constructs a new MutCSetFromMapKeyMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: IMutCSetFromMapKeyMessage);

    /** MutCSetFromMapKeyMessage sender. */
    public sender: string;

    /** MutCSetFromMapKeyMessage uniqueNumber. */
    public uniqueNumber: number;

    /** MutCSetFromMapKeyMessage args. */
    public args: Uint8Array;

    /**
     * Creates a new MutCSetFromMapKeyMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns MutCSetFromMapKeyMessage instance
     */
    public static create(properties?: IMutCSetFromMapKeyMessage): MutCSetFromMapKeyMessage;

    /**
     * Encodes the specified MutCSetFromMapKeyMessage message. Does not implicitly {@link MutCSetFromMapKeyMessage.verify|verify} messages.
     * @param message MutCSetFromMapKeyMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IMutCSetFromMapKeyMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified MutCSetFromMapKeyMessage message, length delimited. Does not implicitly {@link MutCSetFromMapKeyMessage.verify|verify} messages.
     * @param message MutCSetFromMapKeyMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IMutCSetFromMapKeyMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a MutCSetFromMapKeyMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns MutCSetFromMapKeyMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MutCSetFromMapKeyMessage;

    /**
     * Decodes a MutCSetFromMapKeyMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns MutCSetFromMapKeyMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MutCSetFromMapKeyMessage;

    /**
     * Verifies a MutCSetFromMapKeyMessage message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a MutCSetFromMapKeyMessage message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns MutCSetFromMapKeyMessage
     */
    public static fromObject(object: { [k: string]: any }): MutCSetFromMapKeyMessage;

    /**
     * Creates a plain object from a MutCSetFromMapKeyMessage message. Also converts values to other types if specified.
     * @param message MutCSetFromMapKeyMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: MutCSetFromMapKeyMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this MutCSetFromMapKeyMessage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a WinsCBooleanSave. */
export interface IWinsCBooleanSave {

    /** WinsCBooleanSave senders */
    senders?: (string[]|null);

    /** WinsCBooleanSave senderCounters */
    senderCounters?: (number[]|null);
}

/** Represents a WinsCBooleanSave. */
export class WinsCBooleanSave implements IWinsCBooleanSave {

    /**
     * Constructs a new WinsCBooleanSave.
     * @param [properties] Properties to set
     */
    constructor(properties?: IWinsCBooleanSave);

    /** WinsCBooleanSave senders. */
    public senders: string[];

    /** WinsCBooleanSave senderCounters. */
    public senderCounters: number[];

    /**
     * Creates a new WinsCBooleanSave instance using the specified properties.
     * @param [properties] Properties to set
     * @returns WinsCBooleanSave instance
     */
    public static create(properties?: IWinsCBooleanSave): WinsCBooleanSave;

    /**
     * Encodes the specified WinsCBooleanSave message. Does not implicitly {@link WinsCBooleanSave.verify|verify} messages.
     * @param message WinsCBooleanSave message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IWinsCBooleanSave, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified WinsCBooleanSave message, length delimited. Does not implicitly {@link WinsCBooleanSave.verify|verify} messages.
     * @param message WinsCBooleanSave message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IWinsCBooleanSave, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a WinsCBooleanSave message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns WinsCBooleanSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): WinsCBooleanSave;

    /**
     * Decodes a WinsCBooleanSave message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns WinsCBooleanSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): WinsCBooleanSave;

    /**
     * Verifies a WinsCBooleanSave message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a WinsCBooleanSave message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns WinsCBooleanSave
     */
    public static fromObject(object: { [k: string]: any }): WinsCBooleanSave;

    /**
     * Creates a plain object from a WinsCBooleanSave message. Also converts values to other types if specified.
     * @param message WinsCBooleanSave
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: WinsCBooleanSave, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this WinsCBooleanSave to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a RuntimeMessage. */
export interface IRuntimeMessage {

    /** RuntimeMessage pointerParents */
    pointerParents?: (number[]|null);

    /** RuntimeMessage pointerNames */
    pointerNames?: (Uint8Array[]|null);

    /** RuntimeMessage messageSenders */
    messageSenders?: (number[]|null);

    /** RuntimeMessage innerMessages */
    innerMessages?: (Uint8Array[]|null);
}

/** Represents a RuntimeMessage. */
export class RuntimeMessage implements IRuntimeMessage {

    /**
     * Constructs a new RuntimeMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: IRuntimeMessage);

    /** RuntimeMessage pointerParents. */
    public pointerParents: number[];

    /** RuntimeMessage pointerNames. */
    public pointerNames: Uint8Array[];

    /** RuntimeMessage messageSenders. */
    public messageSenders: number[];

    /** RuntimeMessage innerMessages. */
    public innerMessages: Uint8Array[];

    /**
     * Creates a new RuntimeMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns RuntimeMessage instance
     */
    public static create(properties?: IRuntimeMessage): RuntimeMessage;

    /**
     * Encodes the specified RuntimeMessage message. Does not implicitly {@link RuntimeMessage.verify|verify} messages.
     * @param message RuntimeMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IRuntimeMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified RuntimeMessage message, length delimited. Does not implicitly {@link RuntimeMessage.verify|verify} messages.
     * @param message RuntimeMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IRuntimeMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a RuntimeMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns RuntimeMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RuntimeMessage;

    /**
     * Decodes a RuntimeMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns RuntimeMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RuntimeMessage;

    /**
     * Verifies a RuntimeMessage message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a RuntimeMessage message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns RuntimeMessage
     */
    public static fromObject(object: { [k: string]: any }): RuntimeMessage;

    /**
     * Creates a plain object from a RuntimeMessage message. Also converts values to other types if specified.
     * @param message RuntimeMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: RuntimeMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this RuntimeMessage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a RuntimeOneSave. */
export interface IRuntimeOneSave {

    /** RuntimeOneSave parentPointer */
    parentPointer: number;

    /** RuntimeOneSave name */
    name: Uint8Array;

    /** RuntimeOneSave saveData */
    saveData: Uint8Array;
}

/** Represents a RuntimeOneSave. */
export class RuntimeOneSave implements IRuntimeOneSave {

    /**
     * Constructs a new RuntimeOneSave.
     * @param [properties] Properties to set
     */
    constructor(properties?: IRuntimeOneSave);

    /** RuntimeOneSave parentPointer. */
    public parentPointer: number;

    /** RuntimeOneSave name. */
    public name: Uint8Array;

    /** RuntimeOneSave saveData. */
    public saveData: Uint8Array;

    /**
     * Creates a new RuntimeOneSave instance using the specified properties.
     * @param [properties] Properties to set
     * @returns RuntimeOneSave instance
     */
    public static create(properties?: IRuntimeOneSave): RuntimeOneSave;

    /**
     * Encodes the specified RuntimeOneSave message. Does not implicitly {@link RuntimeOneSave.verify|verify} messages.
     * @param message RuntimeOneSave message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IRuntimeOneSave, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified RuntimeOneSave message, length delimited. Does not implicitly {@link RuntimeOneSave.verify|verify} messages.
     * @param message RuntimeOneSave message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IRuntimeOneSave, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a RuntimeOneSave message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns RuntimeOneSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RuntimeOneSave;

    /**
     * Decodes a RuntimeOneSave message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns RuntimeOneSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RuntimeOneSave;

    /**
     * Verifies a RuntimeOneSave message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a RuntimeOneSave message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns RuntimeOneSave
     */
    public static fromObject(object: { [k: string]: any }): RuntimeOneSave;

    /**
     * Creates a plain object from a RuntimeOneSave message. Also converts values to other types if specified.
     * @param message RuntimeOneSave
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: RuntimeOneSave, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this RuntimeOneSave to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a RuntimeSave. */
export interface IRuntimeSave {

    /** RuntimeSave saves */
    saves?: (IRuntimeOneSave[]|null);

    /** RuntimeSave networkSave */
    networkSave: Uint8Array;
}

/** Represents a RuntimeSave. */
export class RuntimeSave implements IRuntimeSave {

    /**
     * Constructs a new RuntimeSave.
     * @param [properties] Properties to set
     */
    constructor(properties?: IRuntimeSave);

    /** RuntimeSave saves. */
    public saves: IRuntimeOneSave[];

    /** RuntimeSave networkSave. */
    public networkSave: Uint8Array;

    /**
     * Creates a new RuntimeSave instance using the specified properties.
     * @param [properties] Properties to set
     * @returns RuntimeSave instance
     */
    public static create(properties?: IRuntimeSave): RuntimeSave;

    /**
     * Encodes the specified RuntimeSave message. Does not implicitly {@link RuntimeSave.verify|verify} messages.
     * @param message RuntimeSave message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IRuntimeSave, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified RuntimeSave message, length delimited. Does not implicitly {@link RuntimeSave.verify|verify} messages.
     * @param message RuntimeSave message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IRuntimeSave, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a RuntimeSave message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns RuntimeSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RuntimeSave;

    /**
     * Decodes a RuntimeSave message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns RuntimeSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RuntimeSave;

    /**
     * Verifies a RuntimeSave message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a RuntimeSave message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns RuntimeSave
     */
    public static fromObject(object: { [k: string]: any }): RuntimeSave;

    /**
     * Creates a plain object from a RuntimeSave message. Also converts values to other types if specified.
     * @param message RuntimeSave
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: RuntimeSave, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this RuntimeSave to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a RgaLocMessage. */
export interface IRgaLocMessage {

    /** RgaLocMessage senders */
    senders?: (string[]|null);

    /** RgaLocMessage senderIndices */
    senderIndices?: (number[]|null);

    /** RgaLocMessage uniqueNumbers */
    uniqueNumbers?: (number[]|null);
}

/** Represents a RgaLocMessage. */
export class RgaLocMessage implements IRgaLocMessage {

    /**
     * Constructs a new RgaLocMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: IRgaLocMessage);

    /** RgaLocMessage senders. */
    public senders: string[];

    /** RgaLocMessage senderIndices. */
    public senderIndices: number[];

    /** RgaLocMessage uniqueNumbers. */
    public uniqueNumbers: number[];

    /**
     * Creates a new RgaLocMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns RgaLocMessage instance
     */
    public static create(properties?: IRgaLocMessage): RgaLocMessage;

    /**
     * Encodes the specified RgaLocMessage message. Does not implicitly {@link RgaLocMessage.verify|verify} messages.
     * @param message RgaLocMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IRgaLocMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified RgaLocMessage message, length delimited. Does not implicitly {@link RgaLocMessage.verify|verify} messages.
     * @param message RgaLocMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IRgaLocMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a RgaLocMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns RgaLocMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RgaLocMessage;

    /**
     * Decodes a RgaLocMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns RgaLocMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RgaLocMessage;

    /**
     * Verifies a RgaLocMessage message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a RgaLocMessage message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns RgaLocMessage
     */
    public static fromObject(object: { [k: string]: any }): RgaLocMessage;

    /**
     * Creates a plain object from a RgaLocMessage message. Also converts values to other types if specified.
     * @param message RgaLocMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: RgaLocMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this RgaLocMessage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a RgaDenseLocalListPrepareMessage. */
export interface IRgaDenseLocalListPrepareMessage {

    /** RgaDenseLocalListPrepareMessage parent */
    parent?: (IRgaLocMessage|null);

    /** RgaDenseLocalListPrepareMessage uniqueNumberStart */
    uniqueNumberStart: number;
}

/** Represents a RgaDenseLocalListPrepareMessage. */
export class RgaDenseLocalListPrepareMessage implements IRgaDenseLocalListPrepareMessage {

    /**
     * Constructs a new RgaDenseLocalListPrepareMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: IRgaDenseLocalListPrepareMessage);

    /** RgaDenseLocalListPrepareMessage parent. */
    public parent?: (IRgaLocMessage|null);

    /** RgaDenseLocalListPrepareMessage uniqueNumberStart. */
    public uniqueNumberStart: number;

    /**
     * Creates a new RgaDenseLocalListPrepareMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns RgaDenseLocalListPrepareMessage instance
     */
    public static create(properties?: IRgaDenseLocalListPrepareMessage): RgaDenseLocalListPrepareMessage;

    /**
     * Encodes the specified RgaDenseLocalListPrepareMessage message. Does not implicitly {@link RgaDenseLocalListPrepareMessage.verify|verify} messages.
     * @param message RgaDenseLocalListPrepareMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IRgaDenseLocalListPrepareMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified RgaDenseLocalListPrepareMessage message, length delimited. Does not implicitly {@link RgaDenseLocalListPrepareMessage.verify|verify} messages.
     * @param message RgaDenseLocalListPrepareMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IRgaDenseLocalListPrepareMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a RgaDenseLocalListPrepareMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns RgaDenseLocalListPrepareMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RgaDenseLocalListPrepareMessage;

    /**
     * Decodes a RgaDenseLocalListPrepareMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns RgaDenseLocalListPrepareMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RgaDenseLocalListPrepareMessage;

    /**
     * Verifies a RgaDenseLocalListPrepareMessage message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a RgaDenseLocalListPrepareMessage message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns RgaDenseLocalListPrepareMessage
     */
    public static fromObject(object: { [k: string]: any }): RgaDenseLocalListPrepareMessage;

    /**
     * Creates a plain object from a RgaDenseLocalListPrepareMessage message. Also converts values to other types if specified.
     * @param message RgaDenseLocalListPrepareMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: RgaDenseLocalListPrepareMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this RgaDenseLocalListPrepareMessage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a RgaDenseLocalListSave. */
export interface IRgaDenseLocalListSave {

    /** RgaDenseLocalListSave senders */
    senders?: (string[]|null);

    /** RgaDenseLocalListSave parents */
    parents?: (number[]|null);

    /** RgaDenseLocalListSave senderIndices */
    senderIndices?: (number[]|null);

    /** RgaDenseLocalListSave uniqueNumbers */
    uniqueNumbers?: (number[]|null);

    /** RgaDenseLocalListSave length */
    length: number;
}

/** Represents a RgaDenseLocalListSave. */
export class RgaDenseLocalListSave implements IRgaDenseLocalListSave {

    /**
     * Constructs a new RgaDenseLocalListSave.
     * @param [properties] Properties to set
     */
    constructor(properties?: IRgaDenseLocalListSave);

    /** RgaDenseLocalListSave senders. */
    public senders: string[];

    /** RgaDenseLocalListSave parents. */
    public parents: number[];

    /** RgaDenseLocalListSave senderIndices. */
    public senderIndices: number[];

    /** RgaDenseLocalListSave uniqueNumbers. */
    public uniqueNumbers: number[];

    /** RgaDenseLocalListSave length. */
    public length: number;

    /**
     * Creates a new RgaDenseLocalListSave instance using the specified properties.
     * @param [properties] Properties to set
     * @returns RgaDenseLocalListSave instance
     */
    public static create(properties?: IRgaDenseLocalListSave): RgaDenseLocalListSave;

    /**
     * Encodes the specified RgaDenseLocalListSave message. Does not implicitly {@link RgaDenseLocalListSave.verify|verify} messages.
     * @param message RgaDenseLocalListSave message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IRgaDenseLocalListSave, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified RgaDenseLocalListSave message, length delimited. Does not implicitly {@link RgaDenseLocalListSave.verify|verify} messages.
     * @param message RgaDenseLocalListSave message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IRgaDenseLocalListSave, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a RgaDenseLocalListSave message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns RgaDenseLocalListSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RgaDenseLocalListSave;

    /**
     * Decodes a RgaDenseLocalListSave message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns RgaDenseLocalListSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RgaDenseLocalListSave;

    /**
     * Verifies a RgaDenseLocalListSave message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a RgaDenseLocalListSave message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns RgaDenseLocalListSave
     */
    public static fromObject(object: { [k: string]: any }): RgaDenseLocalListSave;

    /**
     * Creates a plain object from a RgaDenseLocalListSave message. Also converts values to other types if specified.
     * @param message RgaDenseLocalListSave
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: RgaDenseLocalListSave, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this RgaDenseLocalListSave to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a PrimitiveCListValueArrayMessage. */
export interface IPrimitiveCListValueArrayMessage {

    /** PrimitiveCListValueArrayMessage values */
    values?: (Uint8Array[]|null);
}

/** Represents a PrimitiveCListValueArrayMessage. */
export class PrimitiveCListValueArrayMessage implements IPrimitiveCListValueArrayMessage {

    /**
     * Constructs a new PrimitiveCListValueArrayMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPrimitiveCListValueArrayMessage);

    /** PrimitiveCListValueArrayMessage values. */
    public values: Uint8Array[];

    /**
     * Creates a new PrimitiveCListValueArrayMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PrimitiveCListValueArrayMessage instance
     */
    public static create(properties?: IPrimitiveCListValueArrayMessage): PrimitiveCListValueArrayMessage;

    /**
     * Encodes the specified PrimitiveCListValueArrayMessage message. Does not implicitly {@link PrimitiveCListValueArrayMessage.verify|verify} messages.
     * @param message PrimitiveCListValueArrayMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPrimitiveCListValueArrayMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified PrimitiveCListValueArrayMessage message, length delimited. Does not implicitly {@link PrimitiveCListValueArrayMessage.verify|verify} messages.
     * @param message PrimitiveCListValueArrayMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPrimitiveCListValueArrayMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a PrimitiveCListValueArrayMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PrimitiveCListValueArrayMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PrimitiveCListValueArrayMessage;

    /**
     * Decodes a PrimitiveCListValueArrayMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PrimitiveCListValueArrayMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): PrimitiveCListValueArrayMessage;

    /**
     * Verifies a PrimitiveCListValueArrayMessage message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a PrimitiveCListValueArrayMessage message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns PrimitiveCListValueArrayMessage
     */
    public static fromObject(object: { [k: string]: any }): PrimitiveCListValueArrayMessage;

    /**
     * Creates a plain object from a PrimitiveCListValueArrayMessage message. Also converts values to other types if specified.
     * @param message PrimitiveCListValueArrayMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: PrimitiveCListValueArrayMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this PrimitiveCListValueArrayMessage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a PrimitiveCListInsertMessage. */
export interface IPrimitiveCListInsertMessage {

    /** PrimitiveCListInsertMessage locMessage */
    locMessage: Uint8Array;

    /** PrimitiveCListInsertMessage value */
    value?: (Uint8Array|null);

    /** PrimitiveCListInsertMessage values */
    values?: (Uint8Array|null);

    /** PrimitiveCListInsertMessage valuesArray */
    valuesArray?: (IPrimitiveCListValueArrayMessage|null);
}

/** Represents a PrimitiveCListInsertMessage. */
export class PrimitiveCListInsertMessage implements IPrimitiveCListInsertMessage {

    /**
     * Constructs a new PrimitiveCListInsertMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPrimitiveCListInsertMessage);

    /** PrimitiveCListInsertMessage locMessage. */
    public locMessage: Uint8Array;

    /** PrimitiveCListInsertMessage value. */
    public value: Uint8Array;

    /** PrimitiveCListInsertMessage values. */
    public values: Uint8Array;

    /** PrimitiveCListInsertMessage valuesArray. */
    public valuesArray?: (IPrimitiveCListValueArrayMessage|null);

    /** PrimitiveCListInsertMessage type. */
    public type?: ("value"|"values"|"valuesArray");

    /**
     * Creates a new PrimitiveCListInsertMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PrimitiveCListInsertMessage instance
     */
    public static create(properties?: IPrimitiveCListInsertMessage): PrimitiveCListInsertMessage;

    /**
     * Encodes the specified PrimitiveCListInsertMessage message. Does not implicitly {@link PrimitiveCListInsertMessage.verify|verify} messages.
     * @param message PrimitiveCListInsertMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPrimitiveCListInsertMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified PrimitiveCListInsertMessage message, length delimited. Does not implicitly {@link PrimitiveCListInsertMessage.verify|verify} messages.
     * @param message PrimitiveCListInsertMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPrimitiveCListInsertMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a PrimitiveCListInsertMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PrimitiveCListInsertMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PrimitiveCListInsertMessage;

    /**
     * Decodes a PrimitiveCListInsertMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PrimitiveCListInsertMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): PrimitiveCListInsertMessage;

    /**
     * Verifies a PrimitiveCListInsertMessage message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a PrimitiveCListInsertMessage message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns PrimitiveCListInsertMessage
     */
    public static fromObject(object: { [k: string]: any }): PrimitiveCListInsertMessage;

    /**
     * Creates a plain object from a PrimitiveCListInsertMessage message. Also converts values to other types if specified.
     * @param message PrimitiveCListInsertMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: PrimitiveCListInsertMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this PrimitiveCListInsertMessage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a PrimitiveCListDeleteMessage. */
export interface IPrimitiveCListDeleteMessage {

    /** PrimitiveCListDeleteMessage sender */
    sender: string;

    /** PrimitiveCListDeleteMessage uniqueNumber */
    uniqueNumber: number;
}

/** Represents a PrimitiveCListDeleteMessage. */
export class PrimitiveCListDeleteMessage implements IPrimitiveCListDeleteMessage {

    /**
     * Constructs a new PrimitiveCListDeleteMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPrimitiveCListDeleteMessage);

    /** PrimitiveCListDeleteMessage sender. */
    public sender: string;

    /** PrimitiveCListDeleteMessage uniqueNumber. */
    public uniqueNumber: number;

    /**
     * Creates a new PrimitiveCListDeleteMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PrimitiveCListDeleteMessage instance
     */
    public static create(properties?: IPrimitiveCListDeleteMessage): PrimitiveCListDeleteMessage;

    /**
     * Encodes the specified PrimitiveCListDeleteMessage message. Does not implicitly {@link PrimitiveCListDeleteMessage.verify|verify} messages.
     * @param message PrimitiveCListDeleteMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPrimitiveCListDeleteMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified PrimitiveCListDeleteMessage message, length delimited. Does not implicitly {@link PrimitiveCListDeleteMessage.verify|verify} messages.
     * @param message PrimitiveCListDeleteMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPrimitiveCListDeleteMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a PrimitiveCListDeleteMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PrimitiveCListDeleteMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PrimitiveCListDeleteMessage;

    /**
     * Decodes a PrimitiveCListDeleteMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PrimitiveCListDeleteMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): PrimitiveCListDeleteMessage;

    /**
     * Verifies a PrimitiveCListDeleteMessage message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a PrimitiveCListDeleteMessage message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns PrimitiveCListDeleteMessage
     */
    public static fromObject(object: { [k: string]: any }): PrimitiveCListDeleteMessage;

    /**
     * Creates a plain object from a PrimitiveCListDeleteMessage message. Also converts values to other types if specified.
     * @param message PrimitiveCListDeleteMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: PrimitiveCListDeleteMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this PrimitiveCListDeleteMessage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a PrimitiveCListDeleteRangeMessage. */
export interface IPrimitiveCListDeleteRangeMessage {

    /** PrimitiveCListDeleteRangeMessage startLoc */
    startLoc?: (Uint8Array|null);

    /** PrimitiveCListDeleteRangeMessage endLoc */
    endLoc?: (Uint8Array|null);
}

/** Represents a PrimitiveCListDeleteRangeMessage. */
export class PrimitiveCListDeleteRangeMessage implements IPrimitiveCListDeleteRangeMessage {

    /**
     * Constructs a new PrimitiveCListDeleteRangeMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPrimitiveCListDeleteRangeMessage);

    /** PrimitiveCListDeleteRangeMessage startLoc. */
    public startLoc: Uint8Array;

    /** PrimitiveCListDeleteRangeMessage endLoc. */
    public endLoc: Uint8Array;

    /**
     * Creates a new PrimitiveCListDeleteRangeMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PrimitiveCListDeleteRangeMessage instance
     */
    public static create(properties?: IPrimitiveCListDeleteRangeMessage): PrimitiveCListDeleteRangeMessage;

    /**
     * Encodes the specified PrimitiveCListDeleteRangeMessage message. Does not implicitly {@link PrimitiveCListDeleteRangeMessage.verify|verify} messages.
     * @param message PrimitiveCListDeleteRangeMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPrimitiveCListDeleteRangeMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified PrimitiveCListDeleteRangeMessage message, length delimited. Does not implicitly {@link PrimitiveCListDeleteRangeMessage.verify|verify} messages.
     * @param message PrimitiveCListDeleteRangeMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPrimitiveCListDeleteRangeMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a PrimitiveCListDeleteRangeMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PrimitiveCListDeleteRangeMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PrimitiveCListDeleteRangeMessage;

    /**
     * Decodes a PrimitiveCListDeleteRangeMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PrimitiveCListDeleteRangeMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): PrimitiveCListDeleteRangeMessage;

    /**
     * Verifies a PrimitiveCListDeleteRangeMessage message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a PrimitiveCListDeleteRangeMessage message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns PrimitiveCListDeleteRangeMessage
     */
    public static fromObject(object: { [k: string]: any }): PrimitiveCListDeleteRangeMessage;

    /**
     * Creates a plain object from a PrimitiveCListDeleteRangeMessage message. Also converts values to other types if specified.
     * @param message PrimitiveCListDeleteRangeMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: PrimitiveCListDeleteRangeMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this PrimitiveCListDeleteRangeMessage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a PrimitiveCListMessage. */
export interface IPrimitiveCListMessage {

    /** PrimitiveCListMessage insert */
    insert?: (IPrimitiveCListInsertMessage|null);

    /** PrimitiveCListMessage delete */
    "delete"?: (IPrimitiveCListDeleteMessage|null);

    /** PrimitiveCListMessage deleteRange */
    deleteRange?: (IPrimitiveCListDeleteRangeMessage|null);
}

/** Represents a PrimitiveCListMessage. */
export class PrimitiveCListMessage implements IPrimitiveCListMessage {

    /**
     * Constructs a new PrimitiveCListMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPrimitiveCListMessage);

    /** PrimitiveCListMessage insert. */
    public insert?: (IPrimitiveCListInsertMessage|null);

    /** PrimitiveCListMessage delete. */
    public delete?: (IPrimitiveCListDeleteMessage|null);

    /** PrimitiveCListMessage deleteRange. */
    public deleteRange?: (IPrimitiveCListDeleteRangeMessage|null);

    /** PrimitiveCListMessage op. */
    public op?: ("insert"|"delete"|"deleteRange");

    /**
     * Creates a new PrimitiveCListMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PrimitiveCListMessage instance
     */
    public static create(properties?: IPrimitiveCListMessage): PrimitiveCListMessage;

    /**
     * Encodes the specified PrimitiveCListMessage message. Does not implicitly {@link PrimitiveCListMessage.verify|verify} messages.
     * @param message PrimitiveCListMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPrimitiveCListMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified PrimitiveCListMessage message, length delimited. Does not implicitly {@link PrimitiveCListMessage.verify|verify} messages.
     * @param message PrimitiveCListMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPrimitiveCListMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a PrimitiveCListMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PrimitiveCListMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PrimitiveCListMessage;

    /**
     * Decodes a PrimitiveCListMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PrimitiveCListMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): PrimitiveCListMessage;

    /**
     * Verifies a PrimitiveCListMessage message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a PrimitiveCListMessage message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns PrimitiveCListMessage
     */
    public static fromObject(object: { [k: string]: any }): PrimitiveCListMessage;

    /**
     * Creates a plain object from a PrimitiveCListMessage message. Also converts values to other types if specified.
     * @param message PrimitiveCListMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: PrimitiveCListMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this PrimitiveCListMessage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a PrimitiveCListSave. */
export interface IPrimitiveCListSave {

    /** PrimitiveCListSave locs */
    locs: Uint8Array;

    /** PrimitiveCListSave senderCounters */
    senderCounters?: (number[]|null);

    /** PrimitiveCListSave values */
    values?: (Uint8Array|null);

    /** PrimitiveCListSave valuesArray */
    valuesArray?: (IPrimitiveCListValueArrayMessage|null);
}

/** Represents a PrimitiveCListSave. */
export class PrimitiveCListSave implements IPrimitiveCListSave {

    /**
     * Constructs a new PrimitiveCListSave.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPrimitiveCListSave);

    /** PrimitiveCListSave locs. */
    public locs: Uint8Array;

    /** PrimitiveCListSave senderCounters. */
    public senderCounters: number[];

    /** PrimitiveCListSave values. */
    public values: Uint8Array;

    /** PrimitiveCListSave valuesArray. */
    public valuesArray?: (IPrimitiveCListValueArrayMessage|null);

    /** PrimitiveCListSave valueType. */
    public valueType?: ("values"|"valuesArray");

    /**
     * Creates a new PrimitiveCListSave instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PrimitiveCListSave instance
     */
    public static create(properties?: IPrimitiveCListSave): PrimitiveCListSave;

    /**
     * Encodes the specified PrimitiveCListSave message. Does not implicitly {@link PrimitiveCListSave.verify|verify} messages.
     * @param message PrimitiveCListSave message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPrimitiveCListSave, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified PrimitiveCListSave message, length delimited. Does not implicitly {@link PrimitiveCListSave.verify|verify} messages.
     * @param message PrimitiveCListSave message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPrimitiveCListSave, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a PrimitiveCListSave message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PrimitiveCListSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PrimitiveCListSave;

    /**
     * Decodes a PrimitiveCListSave message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PrimitiveCListSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): PrimitiveCListSave;

    /**
     * Verifies a PrimitiveCListSave message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a PrimitiveCListSave message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns PrimitiveCListSave
     */
    public static fromObject(object: { [k: string]: any }): PrimitiveCListSave;

    /**
     * Creates a plain object from a PrimitiveCListSave message. Also converts values to other types if specified.
     * @param message PrimitiveCListSave
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: PrimitiveCListSave, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this PrimitiveCListSave to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a TreedocLocMessage. */
export interface ITreedocLocMessage {

    /** TreedocLocMessage path */
    path: Uint8Array;

    /** TreedocLocMessage disIndices */
    disIndices?: (number[]|null);

    /** TreedocLocMessage disSendersIndex */
    disSendersIndex?: (string[]|null);

    /** TreedocLocMessage disSenders */
    disSenders?: (number[]|null);

    /** TreedocLocMessage disUniqueNumbers */
    disUniqueNumbers?: (number[]|null);
}

/** Represents a TreedocLocMessage. */
export class TreedocLocMessage implements ITreedocLocMessage {

    /**
     * Constructs a new TreedocLocMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: ITreedocLocMessage);

    /** TreedocLocMessage path. */
    public path: Uint8Array;

    /** TreedocLocMessage disIndices. */
    public disIndices: number[];

    /** TreedocLocMessage disSendersIndex. */
    public disSendersIndex: string[];

    /** TreedocLocMessage disSenders. */
    public disSenders: number[];

    /** TreedocLocMessage disUniqueNumbers. */
    public disUniqueNumbers: number[];

    /**
     * Creates a new TreedocLocMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns TreedocLocMessage instance
     */
    public static create(properties?: ITreedocLocMessage): TreedocLocMessage;

    /**
     * Encodes the specified TreedocLocMessage message. Does not implicitly {@link TreedocLocMessage.verify|verify} messages.
     * @param message TreedocLocMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ITreedocLocMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified TreedocLocMessage message, length delimited. Does not implicitly {@link TreedocLocMessage.verify|verify} messages.
     * @param message TreedocLocMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ITreedocLocMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a TreedocLocMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns TreedocLocMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): TreedocLocMessage;

    /**
     * Decodes a TreedocLocMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns TreedocLocMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): TreedocLocMessage;

    /**
     * Verifies a TreedocLocMessage message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a TreedocLocMessage message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns TreedocLocMessage
     */
    public static fromObject(object: { [k: string]: any }): TreedocLocMessage;

    /**
     * Creates a plain object from a TreedocLocMessage message. Also converts values to other types if specified.
     * @param message TreedocLocMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: TreedocLocMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this TreedocLocMessage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a TreedocLocWrapperMessage. */
export interface ITreedocLocWrapperMessage {

    /** TreedocLocWrapperMessage anchor */
    anchor: Uint8Array;

    /** TreedocLocWrapperMessage sender */
    sender: string;

    /** TreedocLocWrapperMessage uniqueNumber */
    uniqueNumber: number;
}

/** Represents a TreedocLocWrapperMessage. */
export class TreedocLocWrapperMessage implements ITreedocLocWrapperMessage {

    /**
     * Constructs a new TreedocLocWrapperMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: ITreedocLocWrapperMessage);

    /** TreedocLocWrapperMessage anchor. */
    public anchor: Uint8Array;

    /** TreedocLocWrapperMessage sender. */
    public sender: string;

    /** TreedocLocWrapperMessage uniqueNumber. */
    public uniqueNumber: number;

    /**
     * Creates a new TreedocLocWrapperMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns TreedocLocWrapperMessage instance
     */
    public static create(properties?: ITreedocLocWrapperMessage): TreedocLocWrapperMessage;

    /**
     * Encodes the specified TreedocLocWrapperMessage message. Does not implicitly {@link TreedocLocWrapperMessage.verify|verify} messages.
     * @param message TreedocLocWrapperMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ITreedocLocWrapperMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified TreedocLocWrapperMessage message, length delimited. Does not implicitly {@link TreedocLocWrapperMessage.verify|verify} messages.
     * @param message TreedocLocWrapperMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ITreedocLocWrapperMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a TreedocLocWrapperMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns TreedocLocWrapperMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): TreedocLocWrapperMessage;

    /**
     * Decodes a TreedocLocWrapperMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns TreedocLocWrapperMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): TreedocLocWrapperMessage;

    /**
     * Verifies a TreedocLocWrapperMessage message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a TreedocLocWrapperMessage message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns TreedocLocWrapperMessage
     */
    public static fromObject(object: { [k: string]: any }): TreedocLocWrapperMessage;

    /**
     * Creates a plain object from a TreedocLocWrapperMessage message. Also converts values to other types if specified.
     * @param message TreedocLocWrapperMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: TreedocLocWrapperMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this TreedocLocWrapperMessage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a TreedocDenseLocalListSave. */
export interface ITreedocDenseLocalListSave {

    /** TreedocDenseLocalListSave anchors */
    anchors?: (Uint8Array[]|null);

    /** TreedocDenseLocalListSave senders */
    senders?: (string[]|null);

    /** TreedocDenseLocalListSave anchorIndices */
    anchorIndices?: (number[]|null);

    /** TreedocDenseLocalListSave senderIndices */
    senderIndices?: (number[]|null);

    /** TreedocDenseLocalListSave uniqueNumbers */
    uniqueNumbers?: (number[]|null);
}

/** Represents a TreedocDenseLocalListSave. */
export class TreedocDenseLocalListSave implements ITreedocDenseLocalListSave {

    /**
     * Constructs a new TreedocDenseLocalListSave.
     * @param [properties] Properties to set
     */
    constructor(properties?: ITreedocDenseLocalListSave);

    /** TreedocDenseLocalListSave anchors. */
    public anchors: Uint8Array[];

    /** TreedocDenseLocalListSave senders. */
    public senders: string[];

    /** TreedocDenseLocalListSave anchorIndices. */
    public anchorIndices: number[];

    /** TreedocDenseLocalListSave senderIndices. */
    public senderIndices: number[];

    /** TreedocDenseLocalListSave uniqueNumbers. */
    public uniqueNumbers: number[];

    /**
     * Creates a new TreedocDenseLocalListSave instance using the specified properties.
     * @param [properties] Properties to set
     * @returns TreedocDenseLocalListSave instance
     */
    public static create(properties?: ITreedocDenseLocalListSave): TreedocDenseLocalListSave;

    /**
     * Encodes the specified TreedocDenseLocalListSave message. Does not implicitly {@link TreedocDenseLocalListSave.verify|verify} messages.
     * @param message TreedocDenseLocalListSave message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ITreedocDenseLocalListSave, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified TreedocDenseLocalListSave message, length delimited. Does not implicitly {@link TreedocDenseLocalListSave.verify|verify} messages.
     * @param message TreedocDenseLocalListSave message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ITreedocDenseLocalListSave, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a TreedocDenseLocalListSave message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns TreedocDenseLocalListSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): TreedocDenseLocalListSave;

    /**
     * Decodes a TreedocDenseLocalListSave message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns TreedocDenseLocalListSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): TreedocDenseLocalListSave;

    /**
     * Verifies a TreedocDenseLocalListSave message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a TreedocDenseLocalListSave message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns TreedocDenseLocalListSave
     */
    public static fromObject(object: { [k: string]: any }): TreedocDenseLocalListSave;

    /**
     * Creates a plain object from a TreedocDenseLocalListSave message. Also converts values to other types if specified.
     * @param message TreedocDenseLocalListSave
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: TreedocDenseLocalListSave, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this TreedocDenseLocalListSave to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a GrowOnlyCCounterAddMessage. */
export interface IGrowOnlyCCounterAddMessage {

    /** GrowOnlyCCounterAddMessage toAdd */
    toAdd: number;

    /** GrowOnlyCCounterAddMessage prOld */
    prOld: number;

    /** GrowOnlyCCounterAddMessage idCounter */
    idCounter: number;
}

/** Represents a GrowOnlyCCounterAddMessage. */
export class GrowOnlyCCounterAddMessage implements IGrowOnlyCCounterAddMessage {

    /**
     * Constructs a new GrowOnlyCCounterAddMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: IGrowOnlyCCounterAddMessage);

    /** GrowOnlyCCounterAddMessage toAdd. */
    public toAdd: number;

    /** GrowOnlyCCounterAddMessage prOld. */
    public prOld: number;

    /** GrowOnlyCCounterAddMessage idCounter. */
    public idCounter: number;

    /**
     * Creates a new GrowOnlyCCounterAddMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns GrowOnlyCCounterAddMessage instance
     */
    public static create(properties?: IGrowOnlyCCounterAddMessage): GrowOnlyCCounterAddMessage;

    /**
     * Encodes the specified GrowOnlyCCounterAddMessage message. Does not implicitly {@link GrowOnlyCCounterAddMessage.verify|verify} messages.
     * @param message GrowOnlyCCounterAddMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IGrowOnlyCCounterAddMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified GrowOnlyCCounterAddMessage message, length delimited. Does not implicitly {@link GrowOnlyCCounterAddMessage.verify|verify} messages.
     * @param message GrowOnlyCCounterAddMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IGrowOnlyCCounterAddMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a GrowOnlyCCounterAddMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns GrowOnlyCCounterAddMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): GrowOnlyCCounterAddMessage;

    /**
     * Decodes a GrowOnlyCCounterAddMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns GrowOnlyCCounterAddMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): GrowOnlyCCounterAddMessage;

    /**
     * Verifies a GrowOnlyCCounterAddMessage message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a GrowOnlyCCounterAddMessage message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns GrowOnlyCCounterAddMessage
     */
    public static fromObject(object: { [k: string]: any }): GrowOnlyCCounterAddMessage;

    /**
     * Creates a plain object from a GrowOnlyCCounterAddMessage message. Also converts values to other types if specified.
     * @param message GrowOnlyCCounterAddMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: GrowOnlyCCounterAddMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this GrowOnlyCCounterAddMessage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a GrowOnlyCCounterResetEntry. */
export interface IGrowOnlyCCounterResetEntry {

    /** GrowOnlyCCounterResetEntry v */
    v: number;

    /** GrowOnlyCCounterResetEntry idCounter */
    idCounter: number;
}

/** Represents a GrowOnlyCCounterResetEntry. */
export class GrowOnlyCCounterResetEntry implements IGrowOnlyCCounterResetEntry {

    /**
     * Constructs a new GrowOnlyCCounterResetEntry.
     * @param [properties] Properties to set
     */
    constructor(properties?: IGrowOnlyCCounterResetEntry);

    /** GrowOnlyCCounterResetEntry v. */
    public v: number;

    /** GrowOnlyCCounterResetEntry idCounter. */
    public idCounter: number;

    /**
     * Creates a new GrowOnlyCCounterResetEntry instance using the specified properties.
     * @param [properties] Properties to set
     * @returns GrowOnlyCCounterResetEntry instance
     */
    public static create(properties?: IGrowOnlyCCounterResetEntry): GrowOnlyCCounterResetEntry;

    /**
     * Encodes the specified GrowOnlyCCounterResetEntry message. Does not implicitly {@link GrowOnlyCCounterResetEntry.verify|verify} messages.
     * @param message GrowOnlyCCounterResetEntry message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IGrowOnlyCCounterResetEntry, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified GrowOnlyCCounterResetEntry message, length delimited. Does not implicitly {@link GrowOnlyCCounterResetEntry.verify|verify} messages.
     * @param message GrowOnlyCCounterResetEntry message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IGrowOnlyCCounterResetEntry, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a GrowOnlyCCounterResetEntry message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns GrowOnlyCCounterResetEntry
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): GrowOnlyCCounterResetEntry;

    /**
     * Decodes a GrowOnlyCCounterResetEntry message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns GrowOnlyCCounterResetEntry
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): GrowOnlyCCounterResetEntry;

    /**
     * Verifies a GrowOnlyCCounterResetEntry message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a GrowOnlyCCounterResetEntry message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns GrowOnlyCCounterResetEntry
     */
    public static fromObject(object: { [k: string]: any }): GrowOnlyCCounterResetEntry;

    /**
     * Creates a plain object from a GrowOnlyCCounterResetEntry message. Also converts values to other types if specified.
     * @param message GrowOnlyCCounterResetEntry
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: GrowOnlyCCounterResetEntry, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this GrowOnlyCCounterResetEntry to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a GrowOnlyCCounterResetMessage. */
export interface IGrowOnlyCCounterResetMessage {

    /** GrowOnlyCCounterResetMessage V */
    V?: ({ [k: string]: IGrowOnlyCCounterResetEntry }|null);
}

/** Represents a GrowOnlyCCounterResetMessage. */
export class GrowOnlyCCounterResetMessage implements IGrowOnlyCCounterResetMessage {

    /**
     * Constructs a new GrowOnlyCCounterResetMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: IGrowOnlyCCounterResetMessage);

    /** GrowOnlyCCounterResetMessage V. */
    public V: { [k: string]: IGrowOnlyCCounterResetEntry };

    /**
     * Creates a new GrowOnlyCCounterResetMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns GrowOnlyCCounterResetMessage instance
     */
    public static create(properties?: IGrowOnlyCCounterResetMessage): GrowOnlyCCounterResetMessage;

    /**
     * Encodes the specified GrowOnlyCCounterResetMessage message. Does not implicitly {@link GrowOnlyCCounterResetMessage.verify|verify} messages.
     * @param message GrowOnlyCCounterResetMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IGrowOnlyCCounterResetMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified GrowOnlyCCounterResetMessage message, length delimited. Does not implicitly {@link GrowOnlyCCounterResetMessage.verify|verify} messages.
     * @param message GrowOnlyCCounterResetMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IGrowOnlyCCounterResetMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a GrowOnlyCCounterResetMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns GrowOnlyCCounterResetMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): GrowOnlyCCounterResetMessage;

    /**
     * Decodes a GrowOnlyCCounterResetMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns GrowOnlyCCounterResetMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): GrowOnlyCCounterResetMessage;

    /**
     * Verifies a GrowOnlyCCounterResetMessage message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a GrowOnlyCCounterResetMessage message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns GrowOnlyCCounterResetMessage
     */
    public static fromObject(object: { [k: string]: any }): GrowOnlyCCounterResetMessage;

    /**
     * Creates a plain object from a GrowOnlyCCounterResetMessage message. Also converts values to other types if specified.
     * @param message GrowOnlyCCounterResetMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: GrowOnlyCCounterResetMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this GrowOnlyCCounterResetMessage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a GrowOnlyCCounterMessage. */
export interface IGrowOnlyCCounterMessage {

    /** GrowOnlyCCounterMessage add */
    add?: (IGrowOnlyCCounterAddMessage|null);

    /** GrowOnlyCCounterMessage reset */
    reset?: (IGrowOnlyCCounterResetMessage|null);
}

/** Represents a GrowOnlyCCounterMessage. */
export class GrowOnlyCCounterMessage implements IGrowOnlyCCounterMessage {

    /**
     * Constructs a new GrowOnlyCCounterMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: IGrowOnlyCCounterMessage);

    /** GrowOnlyCCounterMessage add. */
    public add?: (IGrowOnlyCCounterAddMessage|null);

    /** GrowOnlyCCounterMessage reset. */
    public reset?: (IGrowOnlyCCounterResetMessage|null);

    /** GrowOnlyCCounterMessage data. */
    public data?: ("add"|"reset");

    /**
     * Creates a new GrowOnlyCCounterMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns GrowOnlyCCounterMessage instance
     */
    public static create(properties?: IGrowOnlyCCounterMessage): GrowOnlyCCounterMessage;

    /**
     * Encodes the specified GrowOnlyCCounterMessage message. Does not implicitly {@link GrowOnlyCCounterMessage.verify|verify} messages.
     * @param message GrowOnlyCCounterMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IGrowOnlyCCounterMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified GrowOnlyCCounterMessage message, length delimited. Does not implicitly {@link GrowOnlyCCounterMessage.verify|verify} messages.
     * @param message GrowOnlyCCounterMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IGrowOnlyCCounterMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a GrowOnlyCCounterMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns GrowOnlyCCounterMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): GrowOnlyCCounterMessage;

    /**
     * Decodes a GrowOnlyCCounterMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns GrowOnlyCCounterMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): GrowOnlyCCounterMessage;

    /**
     * Verifies a GrowOnlyCCounterMessage message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a GrowOnlyCCounterMessage message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns GrowOnlyCCounterMessage
     */
    public static fromObject(object: { [k: string]: any }): GrowOnlyCCounterMessage;

    /**
     * Creates a plain object from a GrowOnlyCCounterMessage message. Also converts values to other types if specified.
     * @param message GrowOnlyCCounterMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: GrowOnlyCCounterMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this GrowOnlyCCounterMessage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a GrowOnlyCCounterSaveEntry. */
export interface IGrowOnlyCCounterSaveEntry {

    /** GrowOnlyCCounterSaveEntry p */
    p: number;

    /** GrowOnlyCCounterSaveEntry n */
    n: number;

    /** GrowOnlyCCounterSaveEntry idCounter */
    idCounter: number;
}

/** Represents a GrowOnlyCCounterSaveEntry. */
export class GrowOnlyCCounterSaveEntry implements IGrowOnlyCCounterSaveEntry {

    /**
     * Constructs a new GrowOnlyCCounterSaveEntry.
     * @param [properties] Properties to set
     */
    constructor(properties?: IGrowOnlyCCounterSaveEntry);

    /** GrowOnlyCCounterSaveEntry p. */
    public p: number;

    /** GrowOnlyCCounterSaveEntry n. */
    public n: number;

    /** GrowOnlyCCounterSaveEntry idCounter. */
    public idCounter: number;

    /**
     * Creates a new GrowOnlyCCounterSaveEntry instance using the specified properties.
     * @param [properties] Properties to set
     * @returns GrowOnlyCCounterSaveEntry instance
     */
    public static create(properties?: IGrowOnlyCCounterSaveEntry): GrowOnlyCCounterSaveEntry;

    /**
     * Encodes the specified GrowOnlyCCounterSaveEntry message. Does not implicitly {@link GrowOnlyCCounterSaveEntry.verify|verify} messages.
     * @param message GrowOnlyCCounterSaveEntry message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IGrowOnlyCCounterSaveEntry, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified GrowOnlyCCounterSaveEntry message, length delimited. Does not implicitly {@link GrowOnlyCCounterSaveEntry.verify|verify} messages.
     * @param message GrowOnlyCCounterSaveEntry message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IGrowOnlyCCounterSaveEntry, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a GrowOnlyCCounterSaveEntry message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns GrowOnlyCCounterSaveEntry
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): GrowOnlyCCounterSaveEntry;

    /**
     * Decodes a GrowOnlyCCounterSaveEntry message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns GrowOnlyCCounterSaveEntry
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): GrowOnlyCCounterSaveEntry;

    /**
     * Verifies a GrowOnlyCCounterSaveEntry message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a GrowOnlyCCounterSaveEntry message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns GrowOnlyCCounterSaveEntry
     */
    public static fromObject(object: { [k: string]: any }): GrowOnlyCCounterSaveEntry;

    /**
     * Creates a plain object from a GrowOnlyCCounterSaveEntry message. Also converts values to other types if specified.
     * @param message GrowOnlyCCounterSaveEntry
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: GrowOnlyCCounterSaveEntry, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this GrowOnlyCCounterSaveEntry to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a GrowOnlyCCounterSave. */
export interface IGrowOnlyCCounterSave {

    /** GrowOnlyCCounterSave M */
    M?: ({ [k: string]: IGrowOnlyCCounterSaveEntry }|null);
}

/** Represents a GrowOnlyCCounterSave. */
export class GrowOnlyCCounterSave implements IGrowOnlyCCounterSave {

    /**
     * Constructs a new GrowOnlyCCounterSave.
     * @param [properties] Properties to set
     */
    constructor(properties?: IGrowOnlyCCounterSave);

    /** GrowOnlyCCounterSave M. */
    public M: { [k: string]: IGrowOnlyCCounterSaveEntry };

    /**
     * Creates a new GrowOnlyCCounterSave instance using the specified properties.
     * @param [properties] Properties to set
     * @returns GrowOnlyCCounterSave instance
     */
    public static create(properties?: IGrowOnlyCCounterSave): GrowOnlyCCounterSave;

    /**
     * Encodes the specified GrowOnlyCCounterSave message. Does not implicitly {@link GrowOnlyCCounterSave.verify|verify} messages.
     * @param message GrowOnlyCCounterSave message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IGrowOnlyCCounterSave, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified GrowOnlyCCounterSave message, length delimited. Does not implicitly {@link GrowOnlyCCounterSave.verify|verify} messages.
     * @param message GrowOnlyCCounterSave message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IGrowOnlyCCounterSave, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a GrowOnlyCCounterSave message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns GrowOnlyCCounterSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): GrowOnlyCCounterSave;

    /**
     * Decodes a GrowOnlyCCounterSave message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns GrowOnlyCCounterSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): GrowOnlyCCounterSave;

    /**
     * Verifies a GrowOnlyCCounterSave message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a GrowOnlyCCounterSave message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns GrowOnlyCCounterSave
     */
    public static fromObject(object: { [k: string]: any }): GrowOnlyCCounterSave;

    /**
     * Creates a plain object from a GrowOnlyCCounterSave message. Also converts values to other types if specified.
     * @param message GrowOnlyCCounterSave
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: GrowOnlyCCounterSave, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this GrowOnlyCCounterSave to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a CNumberComponentMessage. */
export interface ICNumberComponentMessage {

    /** CNumberComponentMessage arg */
    arg: number;
}

/** Represents a CNumberComponentMessage. */
export class CNumberComponentMessage implements ICNumberComponentMessage {

    /**
     * Constructs a new CNumberComponentMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICNumberComponentMessage);

    /** CNumberComponentMessage arg. */
    public arg: number;

    /**
     * Creates a new CNumberComponentMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CNumberComponentMessage instance
     */
    public static create(properties?: ICNumberComponentMessage): CNumberComponentMessage;

    /**
     * Encodes the specified CNumberComponentMessage message. Does not implicitly {@link CNumberComponentMessage.verify|verify} messages.
     * @param message CNumberComponentMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ICNumberComponentMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CNumberComponentMessage message, length delimited. Does not implicitly {@link CNumberComponentMessage.verify|verify} messages.
     * @param message CNumberComponentMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ICNumberComponentMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CNumberComponentMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CNumberComponentMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CNumberComponentMessage;

    /**
     * Decodes a CNumberComponentMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CNumberComponentMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CNumberComponentMessage;

    /**
     * Verifies a CNumberComponentMessage message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a CNumberComponentMessage message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CNumberComponentMessage
     */
    public static fromObject(object: { [k: string]: any }): CNumberComponentMessage;

    /**
     * Creates a plain object from a CNumberComponentMessage message. Also converts values to other types if specified.
     * @param message CNumberComponentMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: CNumberComponentMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this CNumberComponentMessage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of an AggregateArgsCRegisterMessage. */
export interface IAggregateArgsCRegisterMessage {

    /** AggregateArgsCRegisterMessage setArgs */
    setArgs?: (Uint8Array|null);

    /** AggregateArgsCRegisterMessage reset */
    reset?: (boolean|null);
}

/** Represents an AggregateArgsCRegisterMessage. */
export class AggregateArgsCRegisterMessage implements IAggregateArgsCRegisterMessage {

    /**
     * Constructs a new AggregateArgsCRegisterMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: IAggregateArgsCRegisterMessage);

    /** AggregateArgsCRegisterMessage setArgs. */
    public setArgs: Uint8Array;

    /** AggregateArgsCRegisterMessage reset. */
    public reset: boolean;

    /** AggregateArgsCRegisterMessage data. */
    public data?: ("setArgs"|"reset");

    /**
     * Creates a new AggregateArgsCRegisterMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns AggregateArgsCRegisterMessage instance
     */
    public static create(properties?: IAggregateArgsCRegisterMessage): AggregateArgsCRegisterMessage;

    /**
     * Encodes the specified AggregateArgsCRegisterMessage message. Does not implicitly {@link AggregateArgsCRegisterMessage.verify|verify} messages.
     * @param message AggregateArgsCRegisterMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IAggregateArgsCRegisterMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified AggregateArgsCRegisterMessage message, length delimited. Does not implicitly {@link AggregateArgsCRegisterMessage.verify|verify} messages.
     * @param message AggregateArgsCRegisterMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IAggregateArgsCRegisterMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an AggregateArgsCRegisterMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns AggregateArgsCRegisterMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AggregateArgsCRegisterMessage;

    /**
     * Decodes an AggregateArgsCRegisterMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns AggregateArgsCRegisterMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AggregateArgsCRegisterMessage;

    /**
     * Verifies an AggregateArgsCRegisterMessage message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an AggregateArgsCRegisterMessage message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns AggregateArgsCRegisterMessage
     */
    public static fromObject(object: { [k: string]: any }): AggregateArgsCRegisterMessage;

    /**
     * Creates a plain object from an AggregateArgsCRegisterMessage message. Also converts values to other types if specified.
     * @param message AggregateArgsCRegisterMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: AggregateArgsCRegisterMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this AggregateArgsCRegisterMessage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of an AggregateArgsCRegisterEntrySave. */
export interface IAggregateArgsCRegisterEntrySave {

    /** AggregateArgsCRegisterEntrySave setArgs */
    setArgs: Uint8Array;

    /** AggregateArgsCRegisterEntrySave sender */
    sender: string;

    /** AggregateArgsCRegisterEntrySave senderCounter */
    senderCounter: number;

    /** AggregateArgsCRegisterEntrySave time */
    time: number;
}

/** Represents an AggregateArgsCRegisterEntrySave. */
export class AggregateArgsCRegisterEntrySave implements IAggregateArgsCRegisterEntrySave {

    /**
     * Constructs a new AggregateArgsCRegisterEntrySave.
     * @param [properties] Properties to set
     */
    constructor(properties?: IAggregateArgsCRegisterEntrySave);

    /** AggregateArgsCRegisterEntrySave setArgs. */
    public setArgs: Uint8Array;

    /** AggregateArgsCRegisterEntrySave sender. */
    public sender: string;

    /** AggregateArgsCRegisterEntrySave senderCounter. */
    public senderCounter: number;

    /** AggregateArgsCRegisterEntrySave time. */
    public time: number;

    /**
     * Creates a new AggregateArgsCRegisterEntrySave instance using the specified properties.
     * @param [properties] Properties to set
     * @returns AggregateArgsCRegisterEntrySave instance
     */
    public static create(properties?: IAggregateArgsCRegisterEntrySave): AggregateArgsCRegisterEntrySave;

    /**
     * Encodes the specified AggregateArgsCRegisterEntrySave message. Does not implicitly {@link AggregateArgsCRegisterEntrySave.verify|verify} messages.
     * @param message AggregateArgsCRegisterEntrySave message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IAggregateArgsCRegisterEntrySave, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified AggregateArgsCRegisterEntrySave message, length delimited. Does not implicitly {@link AggregateArgsCRegisterEntrySave.verify|verify} messages.
     * @param message AggregateArgsCRegisterEntrySave message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IAggregateArgsCRegisterEntrySave, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an AggregateArgsCRegisterEntrySave message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns AggregateArgsCRegisterEntrySave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AggregateArgsCRegisterEntrySave;

    /**
     * Decodes an AggregateArgsCRegisterEntrySave message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns AggregateArgsCRegisterEntrySave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AggregateArgsCRegisterEntrySave;

    /**
     * Verifies an AggregateArgsCRegisterEntrySave message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an AggregateArgsCRegisterEntrySave message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns AggregateArgsCRegisterEntrySave
     */
    public static fromObject(object: { [k: string]: any }): AggregateArgsCRegisterEntrySave;

    /**
     * Creates a plain object from an AggregateArgsCRegisterEntrySave message. Also converts values to other types if specified.
     * @param message AggregateArgsCRegisterEntrySave
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: AggregateArgsCRegisterEntrySave, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this AggregateArgsCRegisterEntrySave to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of an AggregateArgsCRegisterSave. */
export interface IAggregateArgsCRegisterSave {

    /** AggregateArgsCRegisterSave entries */
    entries?: (IAggregateArgsCRegisterEntrySave[]|null);
}

/** Represents an AggregateArgsCRegisterSave. */
export class AggregateArgsCRegisterSave implements IAggregateArgsCRegisterSave {

    /**
     * Constructs a new AggregateArgsCRegisterSave.
     * @param [properties] Properties to set
     */
    constructor(properties?: IAggregateArgsCRegisterSave);

    /** AggregateArgsCRegisterSave entries. */
    public entries: IAggregateArgsCRegisterEntrySave[];

    /**
     * Creates a new AggregateArgsCRegisterSave instance using the specified properties.
     * @param [properties] Properties to set
     * @returns AggregateArgsCRegisterSave instance
     */
    public static create(properties?: IAggregateArgsCRegisterSave): AggregateArgsCRegisterSave;

    /**
     * Encodes the specified AggregateArgsCRegisterSave message. Does not implicitly {@link AggregateArgsCRegisterSave.verify|verify} messages.
     * @param message AggregateArgsCRegisterSave message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IAggregateArgsCRegisterSave, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified AggregateArgsCRegisterSave message, length delimited. Does not implicitly {@link AggregateArgsCRegisterSave.verify|verify} messages.
     * @param message AggregateArgsCRegisterSave message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IAggregateArgsCRegisterSave, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an AggregateArgsCRegisterSave message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns AggregateArgsCRegisterSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AggregateArgsCRegisterSave;

    /**
     * Decodes an AggregateArgsCRegisterSave message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns AggregateArgsCRegisterSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AggregateArgsCRegisterSave;

    /**
     * Verifies an AggregateArgsCRegisterSave message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an AggregateArgsCRegisterSave message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns AggregateArgsCRegisterSave
     */
    public static fromObject(object: { [k: string]: any }): AggregateArgsCRegisterSave;

    /**
     * Creates a plain object from an AggregateArgsCRegisterSave message. Also converts values to other types if specified.
     * @param message AggregateArgsCRegisterSave
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: AggregateArgsCRegisterSave, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this AggregateArgsCRegisterSave to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a SequentialMapMessage. */
export interface ISequentialMapMessage {

    /** SequentialMapMessage operation */
    operation: SequentialMapMessage.Operation;

    /** SequentialMapMessage key */
    key: Uint8Array;

    /** SequentialMapMessage value */
    value?: (Uint8Array|null);
}

/** Represents a SequentialMapMessage. */
export class SequentialMapMessage implements ISequentialMapMessage {

    /**
     * Constructs a new SequentialMapMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISequentialMapMessage);

    /** SequentialMapMessage operation. */
    public operation: SequentialMapMessage.Operation;

    /** SequentialMapMessage key. */
    public key: Uint8Array;

    /** SequentialMapMessage value. */
    public value: Uint8Array;

    /**
     * Creates a new SequentialMapMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns SequentialMapMessage instance
     */
    public static create(properties?: ISequentialMapMessage): SequentialMapMessage;

    /**
     * Encodes the specified SequentialMapMessage message. Does not implicitly {@link SequentialMapMessage.verify|verify} messages.
     * @param message SequentialMapMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISequentialMapMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified SequentialMapMessage message, length delimited. Does not implicitly {@link SequentialMapMessage.verify|verify} messages.
     * @param message SequentialMapMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISequentialMapMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a SequentialMapMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns SequentialMapMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SequentialMapMessage;

    /**
     * Decodes a SequentialMapMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns SequentialMapMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SequentialMapMessage;

    /**
     * Verifies a SequentialMapMessage message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a SequentialMapMessage message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns SequentialMapMessage
     */
    public static fromObject(object: { [k: string]: any }): SequentialMapMessage;

    /**
     * Creates a plain object from a SequentialMapMessage message. Also converts values to other types if specified.
     * @param message SequentialMapMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: SequentialMapMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this SequentialMapMessage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace SequentialMapMessage {

    /** Operation enum. */
    enum Operation {
        SET = 0,
        DELETE = 1
    }
}

/** Properties of a SequentialMapEntry. */
export interface ISequentialMapEntry {

    /** SequentialMapEntry key */
    key: Uint8Array;

    /** SequentialMapEntry value */
    value: Uint8Array;
}

/** Represents a SequentialMapEntry. */
export class SequentialMapEntry implements ISequentialMapEntry {

    /**
     * Constructs a new SequentialMapEntry.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISequentialMapEntry);

    /** SequentialMapEntry key. */
    public key: Uint8Array;

    /** SequentialMapEntry value. */
    public value: Uint8Array;

    /**
     * Creates a new SequentialMapEntry instance using the specified properties.
     * @param [properties] Properties to set
     * @returns SequentialMapEntry instance
     */
    public static create(properties?: ISequentialMapEntry): SequentialMapEntry;

    /**
     * Encodes the specified SequentialMapEntry message. Does not implicitly {@link SequentialMapEntry.verify|verify} messages.
     * @param message SequentialMapEntry message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISequentialMapEntry, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified SequentialMapEntry message, length delimited. Does not implicitly {@link SequentialMapEntry.verify|verify} messages.
     * @param message SequentialMapEntry message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISequentialMapEntry, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a SequentialMapEntry message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns SequentialMapEntry
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SequentialMapEntry;

    /**
     * Decodes a SequentialMapEntry message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns SequentialMapEntry
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SequentialMapEntry;

    /**
     * Verifies a SequentialMapEntry message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a SequentialMapEntry message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns SequentialMapEntry
     */
    public static fromObject(object: { [k: string]: any }): SequentialMapEntry;

    /**
     * Creates a plain object from a SequentialMapEntry message. Also converts values to other types if specified.
     * @param message SequentialMapEntry
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: SequentialMapEntry, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this SequentialMapEntry to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a SequentialMapSave. */
export interface ISequentialMapSave {

    /** SequentialMapSave entries */
    entries?: (ISequentialMapEntry[]|null);
}

/** Represents a SequentialMapSave. */
export class SequentialMapSave implements ISequentialMapSave {

    /**
     * Constructs a new SequentialMapSave.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISequentialMapSave);

    /** SequentialMapSave entries. */
    public entries: ISequentialMapEntry[];

    /**
     * Creates a new SequentialMapSave instance using the specified properties.
     * @param [properties] Properties to set
     * @returns SequentialMapSave instance
     */
    public static create(properties?: ISequentialMapSave): SequentialMapSave;

    /**
     * Encodes the specified SequentialMapSave message. Does not implicitly {@link SequentialMapSave.verify|verify} messages.
     * @param message SequentialMapSave message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISequentialMapSave, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified SequentialMapSave message, length delimited. Does not implicitly {@link SequentialMapSave.verify|verify} messages.
     * @param message SequentialMapSave message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISequentialMapSave, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a SequentialMapSave message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns SequentialMapSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SequentialMapSave;

    /**
     * Decodes a SequentialMapSave message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns SequentialMapSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SequentialMapSave;

    /**
     * Verifies a SequentialMapSave message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a SequentialMapSave message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns SequentialMapSave
     */
    public static fromObject(object: { [k: string]: any }): SequentialMapSave;

    /**
     * Creates a plain object from a SequentialMapSave message. Also converts values to other types if specified.
     * @param message SequentialMapSave
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: SequentialMapSave, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this SequentialMapSave to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a SemidirectProductRevStoredMessage. */
export interface ISemidirectProductRevStoredMessage {

    /** SemidirectProductRevStoredMessage senderCounter */
    senderCounter: number;

    /** SemidirectProductRevStoredMessage receiptCounter */
    receiptCounter: number;

    /** SemidirectProductRevStoredMessage targetPath */
    targetPath?: (string[]|null);

    /** SemidirectProductRevStoredMessage timestamp */
    timestamp?: (Uint8Array|null);

    /** SemidirectProductRevStoredMessage message */
    message: Uint8Array;
}

/** Represents a SemidirectProductRevStoredMessage. */
export class SemidirectProductRevStoredMessage implements ISemidirectProductRevStoredMessage {

    /**
     * Constructs a new SemidirectProductRevStoredMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISemidirectProductRevStoredMessage);

    /** SemidirectProductRevStoredMessage senderCounter. */
    public senderCounter: number;

    /** SemidirectProductRevStoredMessage receiptCounter. */
    public receiptCounter: number;

    /** SemidirectProductRevStoredMessage targetPath. */
    public targetPath: string[];

    /** SemidirectProductRevStoredMessage timestamp. */
    public timestamp: Uint8Array;

    /** SemidirectProductRevStoredMessage message. */
    public message: Uint8Array;

    /**
     * Creates a new SemidirectProductRevStoredMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns SemidirectProductRevStoredMessage instance
     */
    public static create(properties?: ISemidirectProductRevStoredMessage): SemidirectProductRevStoredMessage;

    /**
     * Encodes the specified SemidirectProductRevStoredMessage message. Does not implicitly {@link SemidirectProductRevStoredMessage.verify|verify} messages.
     * @param message SemidirectProductRevStoredMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISemidirectProductRevStoredMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified SemidirectProductRevStoredMessage message, length delimited. Does not implicitly {@link SemidirectProductRevStoredMessage.verify|verify} messages.
     * @param message SemidirectProductRevStoredMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISemidirectProductRevStoredMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a SemidirectProductRevStoredMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns SemidirectProductRevStoredMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SemidirectProductRevStoredMessage;

    /**
     * Decodes a SemidirectProductRevStoredMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns SemidirectProductRevStoredMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SemidirectProductRevStoredMessage;

    /**
     * Verifies a SemidirectProductRevStoredMessage message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a SemidirectProductRevStoredMessage message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns SemidirectProductRevStoredMessage
     */
    public static fromObject(object: { [k: string]: any }): SemidirectProductRevStoredMessage;

    /**
     * Creates a plain object from a SemidirectProductRevStoredMessage message. Also converts values to other types if specified.
     * @param message SemidirectProductRevStoredMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: SemidirectProductRevStoredMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this SemidirectProductRevStoredMessage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a SemidirectProductRevSenderHistory. */
export interface ISemidirectProductRevSenderHistory {

    /** SemidirectProductRevSenderHistory messages */
    messages?: (ISemidirectProductStoredMessage[]|null);
}

/** Represents a SemidirectProductRevSenderHistory. */
export class SemidirectProductRevSenderHistory implements ISemidirectProductRevSenderHistory {

    /**
     * Constructs a new SemidirectProductRevSenderHistory.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISemidirectProductRevSenderHistory);

    /** SemidirectProductRevSenderHistory messages. */
    public messages: ISemidirectProductStoredMessage[];

    /**
     * Creates a new SemidirectProductRevSenderHistory instance using the specified properties.
     * @param [properties] Properties to set
     * @returns SemidirectProductRevSenderHistory instance
     */
    public static create(properties?: ISemidirectProductRevSenderHistory): SemidirectProductRevSenderHistory;

    /**
     * Encodes the specified SemidirectProductRevSenderHistory message. Does not implicitly {@link SemidirectProductRevSenderHistory.verify|verify} messages.
     * @param message SemidirectProductRevSenderHistory message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISemidirectProductRevSenderHistory, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified SemidirectProductRevSenderHistory message, length delimited. Does not implicitly {@link SemidirectProductRevSenderHistory.verify|verify} messages.
     * @param message SemidirectProductRevSenderHistory message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISemidirectProductRevSenderHistory, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a SemidirectProductRevSenderHistory message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns SemidirectProductRevSenderHistory
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SemidirectProductRevSenderHistory;

    /**
     * Decodes a SemidirectProductRevSenderHistory message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns SemidirectProductRevSenderHistory
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SemidirectProductRevSenderHistory;

    /**
     * Verifies a SemidirectProductRevSenderHistory message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a SemidirectProductRevSenderHistory message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns SemidirectProductRevSenderHistory
     */
    public static fromObject(object: { [k: string]: any }): SemidirectProductRevSenderHistory;

    /**
     * Creates a plain object from a SemidirectProductRevSenderHistory message. Also converts values to other types if specified.
     * @param message SemidirectProductRevSenderHistory
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: SemidirectProductRevSenderHistory, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this SemidirectProductRevSenderHistory to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a SemidirectProductRevSave. */
export interface ISemidirectProductRevSave {

    /** SemidirectProductRevSave receiptCounter */
    receiptCounter: number;

    /** SemidirectProductRevSave history */
    history?: ({ [k: string]: ISemidirectProductSenderHistory }|null);

    /** SemidirectProductRevSave messageEvents */
    messageEvents?: ({ [k: string]: string }|null);

    /** SemidirectProductRevSave subclassSave */
    subclassSave: Uint8Array;
}

/** Represents a SemidirectProductRevSave. */
export class SemidirectProductRevSave implements ISemidirectProductRevSave {

    /**
     * Constructs a new SemidirectProductRevSave.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISemidirectProductRevSave);

    /** SemidirectProductRevSave receiptCounter. */
    public receiptCounter: number;

    /** SemidirectProductRevSave history. */
    public history: { [k: string]: ISemidirectProductSenderHistory };

    /** SemidirectProductRevSave messageEvents. */
    public messageEvents: { [k: string]: string };

    /** SemidirectProductRevSave subclassSave. */
    public subclassSave: Uint8Array;

    /**
     * Creates a new SemidirectProductRevSave instance using the specified properties.
     * @param [properties] Properties to set
     * @returns SemidirectProductRevSave instance
     */
    public static create(properties?: ISemidirectProductRevSave): SemidirectProductRevSave;

    /**
     * Encodes the specified SemidirectProductRevSave message. Does not implicitly {@link SemidirectProductRevSave.verify|verify} messages.
     * @param message SemidirectProductRevSave message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISemidirectProductRevSave, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified SemidirectProductRevSave message, length delimited. Does not implicitly {@link SemidirectProductRevSave.verify|verify} messages.
     * @param message SemidirectProductRevSave message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISemidirectProductRevSave, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a SemidirectProductRevSave message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns SemidirectProductRevSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SemidirectProductRevSave;

    /**
     * Decodes a SemidirectProductRevSave message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns SemidirectProductRevSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SemidirectProductRevSave;

    /**
     * Verifies a SemidirectProductRevSave message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a SemidirectProductRevSave message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns SemidirectProductRevSave
     */
    public static fromObject(object: { [k: string]: any }): SemidirectProductRevSave;

    /**
     * Creates a plain object from a SemidirectProductRevSave message. Also converts values to other types if specified.
     * @param message SemidirectProductRevSave
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: SemidirectProductRevSave, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this SemidirectProductRevSave to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a SemidirectProductStoredMessage. */
export interface ISemidirectProductStoredMessage {

    /** SemidirectProductStoredMessage senderCounter */
    senderCounter: number;

    /** SemidirectProductStoredMessage receiptCounter */
    receiptCounter: number;

    /** SemidirectProductStoredMessage targetPath */
    targetPath?: (string[]|null);

    /** SemidirectProductStoredMessage timestamp */
    timestamp?: (Uint8Array|null);

    /** SemidirectProductStoredMessage message */
    message: Uint8Array;
}

/** Represents a SemidirectProductStoredMessage. */
export class SemidirectProductStoredMessage implements ISemidirectProductStoredMessage {

    /**
     * Constructs a new SemidirectProductStoredMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISemidirectProductStoredMessage);

    /** SemidirectProductStoredMessage senderCounter. */
    public senderCounter: number;

    /** SemidirectProductStoredMessage receiptCounter. */
    public receiptCounter: number;

    /** SemidirectProductStoredMessage targetPath. */
    public targetPath: string[];

    /** SemidirectProductStoredMessage timestamp. */
    public timestamp: Uint8Array;

    /** SemidirectProductStoredMessage message. */
    public message: Uint8Array;

    /**
     * Creates a new SemidirectProductStoredMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns SemidirectProductStoredMessage instance
     */
    public static create(properties?: ISemidirectProductStoredMessage): SemidirectProductStoredMessage;

    /**
     * Encodes the specified SemidirectProductStoredMessage message. Does not implicitly {@link SemidirectProductStoredMessage.verify|verify} messages.
     * @param message SemidirectProductStoredMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISemidirectProductStoredMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified SemidirectProductStoredMessage message, length delimited. Does not implicitly {@link SemidirectProductStoredMessage.verify|verify} messages.
     * @param message SemidirectProductStoredMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISemidirectProductStoredMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a SemidirectProductStoredMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns SemidirectProductStoredMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SemidirectProductStoredMessage;

    /**
     * Decodes a SemidirectProductStoredMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns SemidirectProductStoredMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SemidirectProductStoredMessage;

    /**
     * Verifies a SemidirectProductStoredMessage message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a SemidirectProductStoredMessage message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns SemidirectProductStoredMessage
     */
    public static fromObject(object: { [k: string]: any }): SemidirectProductStoredMessage;

    /**
     * Creates a plain object from a SemidirectProductStoredMessage message. Also converts values to other types if specified.
     * @param message SemidirectProductStoredMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: SemidirectProductStoredMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this SemidirectProductStoredMessage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a SemidirectProductSenderHistory. */
export interface ISemidirectProductSenderHistory {

    /** SemidirectProductSenderHistory messages */
    messages?: (ISemidirectProductStoredMessage[]|null);
}

/** Represents a SemidirectProductSenderHistory. */
export class SemidirectProductSenderHistory implements ISemidirectProductSenderHistory {

    /**
     * Constructs a new SemidirectProductSenderHistory.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISemidirectProductSenderHistory);

    /** SemidirectProductSenderHistory messages. */
    public messages: ISemidirectProductStoredMessage[];

    /**
     * Creates a new SemidirectProductSenderHistory instance using the specified properties.
     * @param [properties] Properties to set
     * @returns SemidirectProductSenderHistory instance
     */
    public static create(properties?: ISemidirectProductSenderHistory): SemidirectProductSenderHistory;

    /**
     * Encodes the specified SemidirectProductSenderHistory message. Does not implicitly {@link SemidirectProductSenderHistory.verify|verify} messages.
     * @param message SemidirectProductSenderHistory message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISemidirectProductSenderHistory, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified SemidirectProductSenderHistory message, length delimited. Does not implicitly {@link SemidirectProductSenderHistory.verify|verify} messages.
     * @param message SemidirectProductSenderHistory message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISemidirectProductSenderHistory, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a SemidirectProductSenderHistory message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns SemidirectProductSenderHistory
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SemidirectProductSenderHistory;

    /**
     * Decodes a SemidirectProductSenderHistory message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns SemidirectProductSenderHistory
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SemidirectProductSenderHistory;

    /**
     * Verifies a SemidirectProductSenderHistory message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a SemidirectProductSenderHistory message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns SemidirectProductSenderHistory
     */
    public static fromObject(object: { [k: string]: any }): SemidirectProductSenderHistory;

    /**
     * Creates a plain object from a SemidirectProductSenderHistory message. Also converts values to other types if specified.
     * @param message SemidirectProductSenderHistory
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: SemidirectProductSenderHistory, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this SemidirectProductSenderHistory to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a SemidirectProductSave. */
export interface ISemidirectProductSave {

    /** SemidirectProductSave receiptCounter */
    receiptCounter: number;

    /** SemidirectProductSave history */
    history?: ({ [k: string]: ISemidirectProductSenderHistory }|null);
}

/** Represents a SemidirectProductSave. */
export class SemidirectProductSave implements ISemidirectProductSave {

    /**
     * Constructs a new SemidirectProductSave.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISemidirectProductSave);

    /** SemidirectProductSave receiptCounter. */
    public receiptCounter: number;

    /** SemidirectProductSave history. */
    public history: { [k: string]: ISemidirectProductSenderHistory };

    /**
     * Creates a new SemidirectProductSave instance using the specified properties.
     * @param [properties] Properties to set
     * @returns SemidirectProductSave instance
     */
    public static create(properties?: ISemidirectProductSave): SemidirectProductSave;

    /**
     * Encodes the specified SemidirectProductSave message. Does not implicitly {@link SemidirectProductSave.verify|verify} messages.
     * @param message SemidirectProductSave message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISemidirectProductSave, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified SemidirectProductSave message, length delimited. Does not implicitly {@link SemidirectProductSave.verify|verify} messages.
     * @param message SemidirectProductSave message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISemidirectProductSave, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a SemidirectProductSave message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns SemidirectProductSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SemidirectProductSave;

    /**
     * Decodes a SemidirectProductSave message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns SemidirectProductSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SemidirectProductSave;

    /**
     * Verifies a SemidirectProductSave message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a SemidirectProductSave message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns SemidirectProductSave
     */
    public static fromObject(object: { [k: string]: any }): SemidirectProductSave;

    /**
     * Creates a plain object from a SemidirectProductSave message. Also converts values to other types if specified.
     * @param message SemidirectProductSave
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: SemidirectProductSave, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this SemidirectProductSave to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

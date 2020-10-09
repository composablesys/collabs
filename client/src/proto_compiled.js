/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.GMapMessage = (function() {

    /**
     * Properties of a GMapMessage.
     * @exports IGMapMessage
     * @interface IGMapMessage
     * @property {Uint8Array} keyToInit GMapMessage keyToInit
     */

    /**
     * Constructs a new GMapMessage.
     * @exports GMapMessage
     * @classdesc Represents a GMapMessage.
     * @implements IGMapMessage
     * @constructor
     * @param {IGMapMessage=} [properties] Properties to set
     */
    function GMapMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GMapMessage keyToInit.
     * @member {Uint8Array} keyToInit
     * @memberof GMapMessage
     * @instance
     */
    GMapMessage.prototype.keyToInit = $util.newBuffer([]);

    /**
     * Creates a new GMapMessage instance using the specified properties.
     * @function create
     * @memberof GMapMessage
     * @static
     * @param {IGMapMessage=} [properties] Properties to set
     * @returns {GMapMessage} GMapMessage instance
     */
    GMapMessage.create = function create(properties) {
        return new GMapMessage(properties);
    };

    /**
     * Encodes the specified GMapMessage message. Does not implicitly {@link GMapMessage.verify|verify} messages.
     * @function encode
     * @memberof GMapMessage
     * @static
     * @param {IGMapMessage} message GMapMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GMapMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.keyToInit);
        return writer;
    };

    /**
     * Encodes the specified GMapMessage message, length delimited. Does not implicitly {@link GMapMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof GMapMessage
     * @static
     * @param {IGMapMessage} message GMapMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GMapMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GMapMessage message from the specified reader or buffer.
     * @function decode
     * @memberof GMapMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GMapMessage} GMapMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GMapMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.GMapMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.keyToInit = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("keyToInit"))
            throw $util.ProtocolError("missing required 'keyToInit'", { instance: message });
        return message;
    };

    /**
     * Decodes a GMapMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof GMapMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GMapMessage} GMapMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GMapMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GMapMessage message.
     * @function verify
     * @memberof GMapMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    GMapMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!(message.keyToInit && typeof message.keyToInit.length === "number" || $util.isString(message.keyToInit)))
            return "keyToInit: buffer expected";
        return null;
    };

    /**
     * Creates a GMapMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof GMapMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {GMapMessage} GMapMessage
     */
    GMapMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.GMapMessage)
            return object;
        var message = new $root.GMapMessage();
        if (object.keyToInit != null)
            if (typeof object.keyToInit === "string")
                $util.base64.decode(object.keyToInit, message.keyToInit = $util.newBuffer($util.base64.length(object.keyToInit)), 0);
            else if (object.keyToInit.length)
                message.keyToInit = object.keyToInit;
        return message;
    };

    /**
     * Creates a plain object from a GMapMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof GMapMessage
     * @static
     * @param {GMapMessage} message GMapMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    GMapMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            if (options.bytes === String)
                object.keyToInit = "";
            else {
                object.keyToInit = [];
                if (options.bytes !== Array)
                    object.keyToInit = $util.newBuffer(object.keyToInit);
            }
        if (message.keyToInit != null && message.hasOwnProperty("keyToInit"))
            object.keyToInit = options.bytes === String ? $util.base64.encode(message.keyToInit, 0, message.keyToInit.length) : options.bytes === Array ? Array.prototype.slice.call(message.keyToInit) : message.keyToInit;
        return object;
    };

    /**
     * Converts this GMapMessage to JSON.
     * @function toJSON
     * @memberof GMapMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    GMapMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return GMapMessage;
})();

$root.RuntimeGeneratorMessage = (function() {

    /**
     * Properties of a RuntimeGeneratorMessage.
     * @exports IRuntimeGeneratorMessage
     * @interface IRuntimeGeneratorMessage
     * @property {Uint8Array} message RuntimeGeneratorMessage message
     * @property {string} uniqueId RuntimeGeneratorMessage uniqueId
     */

    /**
     * Constructs a new RuntimeGeneratorMessage.
     * @exports RuntimeGeneratorMessage
     * @classdesc Represents a RuntimeGeneratorMessage.
     * @implements IRuntimeGeneratorMessage
     * @constructor
     * @param {IRuntimeGeneratorMessage=} [properties] Properties to set
     */
    function RuntimeGeneratorMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * RuntimeGeneratorMessage message.
     * @member {Uint8Array} message
     * @memberof RuntimeGeneratorMessage
     * @instance
     */
    RuntimeGeneratorMessage.prototype.message = $util.newBuffer([]);

    /**
     * RuntimeGeneratorMessage uniqueId.
     * @member {string} uniqueId
     * @memberof RuntimeGeneratorMessage
     * @instance
     */
    RuntimeGeneratorMessage.prototype.uniqueId = "";

    /**
     * Creates a new RuntimeGeneratorMessage instance using the specified properties.
     * @function create
     * @memberof RuntimeGeneratorMessage
     * @static
     * @param {IRuntimeGeneratorMessage=} [properties] Properties to set
     * @returns {RuntimeGeneratorMessage} RuntimeGeneratorMessage instance
     */
    RuntimeGeneratorMessage.create = function create(properties) {
        return new RuntimeGeneratorMessage(properties);
    };

    /**
     * Encodes the specified RuntimeGeneratorMessage message. Does not implicitly {@link RuntimeGeneratorMessage.verify|verify} messages.
     * @function encode
     * @memberof RuntimeGeneratorMessage
     * @static
     * @param {IRuntimeGeneratorMessage} message RuntimeGeneratorMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RuntimeGeneratorMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.message);
        writer.uint32(/* id 2, wireType 2 =*/18).string(message.uniqueId);
        return writer;
    };

    /**
     * Encodes the specified RuntimeGeneratorMessage message, length delimited. Does not implicitly {@link RuntimeGeneratorMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RuntimeGeneratorMessage
     * @static
     * @param {IRuntimeGeneratorMessage} message RuntimeGeneratorMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RuntimeGeneratorMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RuntimeGeneratorMessage message from the specified reader or buffer.
     * @function decode
     * @memberof RuntimeGeneratorMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RuntimeGeneratorMessage} RuntimeGeneratorMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RuntimeGeneratorMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.RuntimeGeneratorMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.message = reader.bytes();
                break;
            case 2:
                message.uniqueId = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("message"))
            throw $util.ProtocolError("missing required 'message'", { instance: message });
        if (!message.hasOwnProperty("uniqueId"))
            throw $util.ProtocolError("missing required 'uniqueId'", { instance: message });
        return message;
    };

    /**
     * Decodes a RuntimeGeneratorMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RuntimeGeneratorMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RuntimeGeneratorMessage} RuntimeGeneratorMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RuntimeGeneratorMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a RuntimeGeneratorMessage message.
     * @function verify
     * @memberof RuntimeGeneratorMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RuntimeGeneratorMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!(message.message && typeof message.message.length === "number" || $util.isString(message.message)))
            return "message: buffer expected";
        if (!$util.isString(message.uniqueId))
            return "uniqueId: string expected";
        return null;
    };

    /**
     * Creates a RuntimeGeneratorMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof RuntimeGeneratorMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {RuntimeGeneratorMessage} RuntimeGeneratorMessage
     */
    RuntimeGeneratorMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.RuntimeGeneratorMessage)
            return object;
        var message = new $root.RuntimeGeneratorMessage();
        if (object.message != null)
            if (typeof object.message === "string")
                $util.base64.decode(object.message, message.message = $util.newBuffer($util.base64.length(object.message)), 0);
            else if (object.message.length)
                message.message = object.message;
        if (object.uniqueId != null)
            message.uniqueId = String(object.uniqueId);
        return message;
    };

    /**
     * Creates a plain object from a RuntimeGeneratorMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof RuntimeGeneratorMessage
     * @static
     * @param {RuntimeGeneratorMessage} message RuntimeGeneratorMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RuntimeGeneratorMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if (options.bytes === String)
                object.message = "";
            else {
                object.message = [];
                if (options.bytes !== Array)
                    object.message = $util.newBuffer(object.message);
            }
            object.uniqueId = "";
        }
        if (message.message != null && message.hasOwnProperty("message"))
            object.message = options.bytes === String ? $util.base64.encode(message.message, 0, message.message.length) : options.bytes === Array ? Array.prototype.slice.call(message.message) : message.message;
        if (message.uniqueId != null && message.hasOwnProperty("uniqueId"))
            object.uniqueId = message.uniqueId;
        return object;
    };

    /**
     * Converts this RuntimeGeneratorMessage to JSON.
     * @function toJSON
     * @memberof RuntimeGeneratorMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RuntimeGeneratorMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return RuntimeGeneratorMessage;
})();

$root.CrdtReference = (function() {

    /**
     * Properties of a CrdtReference.
     * @exports ICrdtReference
     * @interface ICrdtReference
     * @property {string} rootId CrdtReference rootId
     * @property {Array.<string>|null} [pathToRoot] CrdtReference pathToRoot
     */

    /**
     * Constructs a new CrdtReference.
     * @exports CrdtReference
     * @classdesc Represents a CrdtReference.
     * @implements ICrdtReference
     * @constructor
     * @param {ICrdtReference=} [properties] Properties to set
     */
    function CrdtReference(properties) {
        this.pathToRoot = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CrdtReference rootId.
     * @member {string} rootId
     * @memberof CrdtReference
     * @instance
     */
    CrdtReference.prototype.rootId = "";

    /**
     * CrdtReference pathToRoot.
     * @member {Array.<string>} pathToRoot
     * @memberof CrdtReference
     * @instance
     */
    CrdtReference.prototype.pathToRoot = $util.emptyArray;

    /**
     * Creates a new CrdtReference instance using the specified properties.
     * @function create
     * @memberof CrdtReference
     * @static
     * @param {ICrdtReference=} [properties] Properties to set
     * @returns {CrdtReference} CrdtReference instance
     */
    CrdtReference.create = function create(properties) {
        return new CrdtReference(properties);
    };

    /**
     * Encodes the specified CrdtReference message. Does not implicitly {@link CrdtReference.verify|verify} messages.
     * @function encode
     * @memberof CrdtReference
     * @static
     * @param {ICrdtReference} message CrdtReference message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CrdtReference.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 2 =*/10).string(message.rootId);
        if (message.pathToRoot != null && message.pathToRoot.length)
            for (var i = 0; i < message.pathToRoot.length; ++i)
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.pathToRoot[i]);
        return writer;
    };

    /**
     * Encodes the specified CrdtReference message, length delimited. Does not implicitly {@link CrdtReference.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CrdtReference
     * @static
     * @param {ICrdtReference} message CrdtReference message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CrdtReference.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CrdtReference message from the specified reader or buffer.
     * @function decode
     * @memberof CrdtReference
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CrdtReference} CrdtReference
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CrdtReference.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.CrdtReference();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.rootId = reader.string();
                break;
            case 2:
                if (!(message.pathToRoot && message.pathToRoot.length))
                    message.pathToRoot = [];
                message.pathToRoot.push(reader.string());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("rootId"))
            throw $util.ProtocolError("missing required 'rootId'", { instance: message });
        return message;
    };

    /**
     * Decodes a CrdtReference message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CrdtReference
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CrdtReference} CrdtReference
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CrdtReference.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CrdtReference message.
     * @function verify
     * @memberof CrdtReference
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CrdtReference.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isString(message.rootId))
            return "rootId: string expected";
        if (message.pathToRoot != null && message.hasOwnProperty("pathToRoot")) {
            if (!Array.isArray(message.pathToRoot))
                return "pathToRoot: array expected";
            for (var i = 0; i < message.pathToRoot.length; ++i)
                if (!$util.isString(message.pathToRoot[i]))
                    return "pathToRoot: string[] expected";
        }
        return null;
    };

    /**
     * Creates a CrdtReference message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CrdtReference
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CrdtReference} CrdtReference
     */
    CrdtReference.fromObject = function fromObject(object) {
        if (object instanceof $root.CrdtReference)
            return object;
        var message = new $root.CrdtReference();
        if (object.rootId != null)
            message.rootId = String(object.rootId);
        if (object.pathToRoot) {
            if (!Array.isArray(object.pathToRoot))
                throw TypeError(".CrdtReference.pathToRoot: array expected");
            message.pathToRoot = [];
            for (var i = 0; i < object.pathToRoot.length; ++i)
                message.pathToRoot[i] = String(object.pathToRoot[i]);
        }
        return message;
    };

    /**
     * Creates a plain object from a CrdtReference message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CrdtReference
     * @static
     * @param {CrdtReference} message CrdtReference
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CrdtReference.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.pathToRoot = [];
        if (options.defaults)
            object.rootId = "";
        if (message.rootId != null && message.hasOwnProperty("rootId"))
            object.rootId = message.rootId;
        if (message.pathToRoot && message.pathToRoot.length) {
            object.pathToRoot = [];
            for (var j = 0; j < message.pathToRoot.length; ++j)
                object.pathToRoot[j] = message.pathToRoot[j];
        }
        return object;
    };

    /**
     * Converts this CrdtReference to JSON.
     * @function toJSON
     * @memberof CrdtReference
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CrdtReference.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return CrdtReference;
})();

$root.DefaultSerializerMessage = (function() {

    /**
     * Properties of a DefaultSerializerMessage.
     * @exports IDefaultSerializerMessage
     * @interface IDefaultSerializerMessage
     * @property {string|null} [stringValue] DefaultSerializerMessage stringValue
     * @property {number|null} [numberValue] DefaultSerializerMessage numberValue
     * @property {ICrdtReference|null} [crdtValue] DefaultSerializerMessage crdtValue
     */

    /**
     * Constructs a new DefaultSerializerMessage.
     * @exports DefaultSerializerMessage
     * @classdesc Represents a DefaultSerializerMessage.
     * @implements IDefaultSerializerMessage
     * @constructor
     * @param {IDefaultSerializerMessage=} [properties] Properties to set
     */
    function DefaultSerializerMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * DefaultSerializerMessage stringValue.
     * @member {string} stringValue
     * @memberof DefaultSerializerMessage
     * @instance
     */
    DefaultSerializerMessage.prototype.stringValue = "";

    /**
     * DefaultSerializerMessage numberValue.
     * @member {number} numberValue
     * @memberof DefaultSerializerMessage
     * @instance
     */
    DefaultSerializerMessage.prototype.numberValue = 0;

    /**
     * DefaultSerializerMessage crdtValue.
     * @member {ICrdtReference|null|undefined} crdtValue
     * @memberof DefaultSerializerMessage
     * @instance
     */
    DefaultSerializerMessage.prototype.crdtValue = null;

    // OneOf field names bound to virtual getters and setters
    var $oneOfFields;

    /**
     * DefaultSerializerMessage value.
     * @member {"stringValue"|"numberValue"|"crdtValue"|undefined} value
     * @memberof DefaultSerializerMessage
     * @instance
     */
    Object.defineProperty(DefaultSerializerMessage.prototype, "value", {
        get: $util.oneOfGetter($oneOfFields = ["stringValue", "numberValue", "crdtValue"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new DefaultSerializerMessage instance using the specified properties.
     * @function create
     * @memberof DefaultSerializerMessage
     * @static
     * @param {IDefaultSerializerMessage=} [properties] Properties to set
     * @returns {DefaultSerializerMessage} DefaultSerializerMessage instance
     */
    DefaultSerializerMessage.create = function create(properties) {
        return new DefaultSerializerMessage(properties);
    };

    /**
     * Encodes the specified DefaultSerializerMessage message. Does not implicitly {@link DefaultSerializerMessage.verify|verify} messages.
     * @function encode
     * @memberof DefaultSerializerMessage
     * @static
     * @param {IDefaultSerializerMessage} message DefaultSerializerMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DefaultSerializerMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.stringValue != null && Object.hasOwnProperty.call(message, "stringValue"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.stringValue);
        if (message.numberValue != null && Object.hasOwnProperty.call(message, "numberValue"))
            writer.uint32(/* id 2, wireType 1 =*/17).double(message.numberValue);
        if (message.crdtValue != null && Object.hasOwnProperty.call(message, "crdtValue"))
            $root.CrdtReference.encode(message.crdtValue, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified DefaultSerializerMessage message, length delimited. Does not implicitly {@link DefaultSerializerMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof DefaultSerializerMessage
     * @static
     * @param {IDefaultSerializerMessage} message DefaultSerializerMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DefaultSerializerMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a DefaultSerializerMessage message from the specified reader or buffer.
     * @function decode
     * @memberof DefaultSerializerMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {DefaultSerializerMessage} DefaultSerializerMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DefaultSerializerMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.DefaultSerializerMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.stringValue = reader.string();
                break;
            case 2:
                message.numberValue = reader.double();
                break;
            case 3:
                message.crdtValue = $root.CrdtReference.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a DefaultSerializerMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof DefaultSerializerMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {DefaultSerializerMessage} DefaultSerializerMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DefaultSerializerMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a DefaultSerializerMessage message.
     * @function verify
     * @memberof DefaultSerializerMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    DefaultSerializerMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        var properties = {};
        if (message.stringValue != null && message.hasOwnProperty("stringValue")) {
            properties.value = 1;
            if (!$util.isString(message.stringValue))
                return "stringValue: string expected";
        }
        if (message.numberValue != null && message.hasOwnProperty("numberValue")) {
            if (properties.value === 1)
                return "value: multiple values";
            properties.value = 1;
            if (typeof message.numberValue !== "number")
                return "numberValue: number expected";
        }
        if (message.crdtValue != null && message.hasOwnProperty("crdtValue")) {
            if (properties.value === 1)
                return "value: multiple values";
            properties.value = 1;
            {
                var error = $root.CrdtReference.verify(message.crdtValue);
                if (error)
                    return "crdtValue." + error;
            }
        }
        return null;
    };

    /**
     * Creates a DefaultSerializerMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof DefaultSerializerMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {DefaultSerializerMessage} DefaultSerializerMessage
     */
    DefaultSerializerMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.DefaultSerializerMessage)
            return object;
        var message = new $root.DefaultSerializerMessage();
        if (object.stringValue != null)
            message.stringValue = String(object.stringValue);
        if (object.numberValue != null)
            message.numberValue = Number(object.numberValue);
        if (object.crdtValue != null) {
            if (typeof object.crdtValue !== "object")
                throw TypeError(".DefaultSerializerMessage.crdtValue: object expected");
            message.crdtValue = $root.CrdtReference.fromObject(object.crdtValue);
        }
        return message;
    };

    /**
     * Creates a plain object from a DefaultSerializerMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof DefaultSerializerMessage
     * @static
     * @param {DefaultSerializerMessage} message DefaultSerializerMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    DefaultSerializerMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (message.stringValue != null && message.hasOwnProperty("stringValue")) {
            object.stringValue = message.stringValue;
            if (options.oneofs)
                object.value = "stringValue";
        }
        if (message.numberValue != null && message.hasOwnProperty("numberValue")) {
            object.numberValue = options.json && !isFinite(message.numberValue) ? String(message.numberValue) : message.numberValue;
            if (options.oneofs)
                object.value = "numberValue";
        }
        if (message.crdtValue != null && message.hasOwnProperty("crdtValue")) {
            object.crdtValue = $root.CrdtReference.toObject(message.crdtValue, options);
            if (options.oneofs)
                object.value = "crdtValue";
        }
        return object;
    };

    /**
     * Converts this DefaultSerializerMessage to JSON.
     * @function toJSON
     * @memberof DefaultSerializerMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    DefaultSerializerMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return DefaultSerializerMessage;
})();

$root.CounterMessage = (function() {

    /**
     * Properties of a CounterMessage.
     * @exports ICounterMessage
     * @interface ICounterMessage
     * @property {number} toAdd CounterMessage toAdd
     */

    /**
     * Constructs a new CounterMessage.
     * @exports CounterMessage
     * @classdesc Represents a CounterMessage.
     * @implements ICounterMessage
     * @constructor
     * @param {ICounterMessage=} [properties] Properties to set
     */
    function CounterMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CounterMessage toAdd.
     * @member {number} toAdd
     * @memberof CounterMessage
     * @instance
     */
    CounterMessage.prototype.toAdd = 0;

    /**
     * Creates a new CounterMessage instance using the specified properties.
     * @function create
     * @memberof CounterMessage
     * @static
     * @param {ICounterMessage=} [properties] Properties to set
     * @returns {CounterMessage} CounterMessage instance
     */
    CounterMessage.create = function create(properties) {
        return new CounterMessage(properties);
    };

    /**
     * Encodes the specified CounterMessage message. Does not implicitly {@link CounterMessage.verify|verify} messages.
     * @function encode
     * @memberof CounterMessage
     * @static
     * @param {ICounterMessage} message CounterMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CounterMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 1 =*/9).double(message.toAdd);
        return writer;
    };

    /**
     * Encodes the specified CounterMessage message, length delimited. Does not implicitly {@link CounterMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CounterMessage
     * @static
     * @param {ICounterMessage} message CounterMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CounterMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CounterMessage message from the specified reader or buffer.
     * @function decode
     * @memberof CounterMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CounterMessage} CounterMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CounterMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.CounterMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.toAdd = reader.double();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("toAdd"))
            throw $util.ProtocolError("missing required 'toAdd'", { instance: message });
        return message;
    };

    /**
     * Decodes a CounterMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CounterMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CounterMessage} CounterMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CounterMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CounterMessage message.
     * @function verify
     * @memberof CounterMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CounterMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (typeof message.toAdd !== "number")
            return "toAdd: number expected";
        return null;
    };

    /**
     * Creates a CounterMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CounterMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CounterMessage} CounterMessage
     */
    CounterMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.CounterMessage)
            return object;
        var message = new $root.CounterMessage();
        if (object.toAdd != null)
            message.toAdd = Number(object.toAdd);
        return message;
    };

    /**
     * Creates a plain object from a CounterMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CounterMessage
     * @static
     * @param {CounterMessage} message CounterMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CounterMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.toAdd = 0;
        if (message.toAdd != null && message.hasOwnProperty("toAdd"))
            object.toAdd = options.json && !isFinite(message.toAdd) ? String(message.toAdd) : message.toAdd;
        return object;
    };

    /**
     * Converts this CounterMessage to JSON.
     * @function toJSON
     * @memberof CounterMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CounterMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return CounterMessage;
})();

$root.MultRegisterMessage = (function() {

    /**
     * Properties of a MultRegisterMessage.
     * @exports IMultRegisterMessage
     * @interface IMultRegisterMessage
     * @property {number} toMult MultRegisterMessage toMult
     */

    /**
     * Constructs a new MultRegisterMessage.
     * @exports MultRegisterMessage
     * @classdesc Represents a MultRegisterMessage.
     * @implements IMultRegisterMessage
     * @constructor
     * @param {IMultRegisterMessage=} [properties] Properties to set
     */
    function MultRegisterMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MultRegisterMessage toMult.
     * @member {number} toMult
     * @memberof MultRegisterMessage
     * @instance
     */
    MultRegisterMessage.prototype.toMult = 0;

    /**
     * Creates a new MultRegisterMessage instance using the specified properties.
     * @function create
     * @memberof MultRegisterMessage
     * @static
     * @param {IMultRegisterMessage=} [properties] Properties to set
     * @returns {MultRegisterMessage} MultRegisterMessage instance
     */
    MultRegisterMessage.create = function create(properties) {
        return new MultRegisterMessage(properties);
    };

    /**
     * Encodes the specified MultRegisterMessage message. Does not implicitly {@link MultRegisterMessage.verify|verify} messages.
     * @function encode
     * @memberof MultRegisterMessage
     * @static
     * @param {IMultRegisterMessage} message MultRegisterMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MultRegisterMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 1 =*/9).double(message.toMult);
        return writer;
    };

    /**
     * Encodes the specified MultRegisterMessage message, length delimited. Does not implicitly {@link MultRegisterMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MultRegisterMessage
     * @static
     * @param {IMultRegisterMessage} message MultRegisterMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MultRegisterMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MultRegisterMessage message from the specified reader or buffer.
     * @function decode
     * @memberof MultRegisterMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MultRegisterMessage} MultRegisterMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MultRegisterMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MultRegisterMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.toMult = reader.double();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("toMult"))
            throw $util.ProtocolError("missing required 'toMult'", { instance: message });
        return message;
    };

    /**
     * Decodes a MultRegisterMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MultRegisterMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MultRegisterMessage} MultRegisterMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MultRegisterMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MultRegisterMessage message.
     * @function verify
     * @memberof MultRegisterMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MultRegisterMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (typeof message.toMult !== "number")
            return "toMult: number expected";
        return null;
    };

    /**
     * Creates a MultRegisterMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MultRegisterMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MultRegisterMessage} MultRegisterMessage
     */
    MultRegisterMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.MultRegisterMessage)
            return object;
        var message = new $root.MultRegisterMessage();
        if (object.toMult != null)
            message.toMult = Number(object.toMult);
        return message;
    };

    /**
     * Creates a plain object from a MultRegisterMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MultRegisterMessage
     * @static
     * @param {MultRegisterMessage} message MultRegisterMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MultRegisterMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.toMult = 0;
        if (message.toMult != null && message.hasOwnProperty("toMult"))
            object.toMult = options.json && !isFinite(message.toMult) ? String(message.toMult) : message.toMult;
        return object;
    };

    /**
     * Converts this MultRegisterMessage to JSON.
     * @function toJSON
     * @memberof MultRegisterMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MultRegisterMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MultRegisterMessage;
})();

$root.GSetMessage = (function() {

    /**
     * Properties of a GSetMessage.
     * @exports IGSetMessage
     * @interface IGSetMessage
     * @property {Uint8Array} toAdd GSetMessage toAdd
     */

    /**
     * Constructs a new GSetMessage.
     * @exports GSetMessage
     * @classdesc Represents a GSetMessage.
     * @implements IGSetMessage
     * @constructor
     * @param {IGSetMessage=} [properties] Properties to set
     */
    function GSetMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GSetMessage toAdd.
     * @member {Uint8Array} toAdd
     * @memberof GSetMessage
     * @instance
     */
    GSetMessage.prototype.toAdd = $util.newBuffer([]);

    /**
     * Creates a new GSetMessage instance using the specified properties.
     * @function create
     * @memberof GSetMessage
     * @static
     * @param {IGSetMessage=} [properties] Properties to set
     * @returns {GSetMessage} GSetMessage instance
     */
    GSetMessage.create = function create(properties) {
        return new GSetMessage(properties);
    };

    /**
     * Encodes the specified GSetMessage message. Does not implicitly {@link GSetMessage.verify|verify} messages.
     * @function encode
     * @memberof GSetMessage
     * @static
     * @param {IGSetMessage} message GSetMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GSetMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.toAdd);
        return writer;
    };

    /**
     * Encodes the specified GSetMessage message, length delimited. Does not implicitly {@link GSetMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof GSetMessage
     * @static
     * @param {IGSetMessage} message GSetMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GSetMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GSetMessage message from the specified reader or buffer.
     * @function decode
     * @memberof GSetMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GSetMessage} GSetMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GSetMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.GSetMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.toAdd = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("toAdd"))
            throw $util.ProtocolError("missing required 'toAdd'", { instance: message });
        return message;
    };

    /**
     * Decodes a GSetMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof GSetMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GSetMessage} GSetMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GSetMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GSetMessage message.
     * @function verify
     * @memberof GSetMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    GSetMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!(message.toAdd && typeof message.toAdd.length === "number" || $util.isString(message.toAdd)))
            return "toAdd: buffer expected";
        return null;
    };

    /**
     * Creates a GSetMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof GSetMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {GSetMessage} GSetMessage
     */
    GSetMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.GSetMessage)
            return object;
        var message = new $root.GSetMessage();
        if (object.toAdd != null)
            if (typeof object.toAdd === "string")
                $util.base64.decode(object.toAdd, message.toAdd = $util.newBuffer($util.base64.length(object.toAdd)), 0);
            else if (object.toAdd.length)
                message.toAdd = object.toAdd;
        return message;
    };

    /**
     * Creates a plain object from a GSetMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof GSetMessage
     * @static
     * @param {GSetMessage} message GSetMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    GSetMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            if (options.bytes === String)
                object.toAdd = "";
            else {
                object.toAdd = [];
                if (options.bytes !== Array)
                    object.toAdd = $util.newBuffer(object.toAdd);
            }
        if (message.toAdd != null && message.hasOwnProperty("toAdd"))
            object.toAdd = options.bytes === String ? $util.base64.encode(message.toAdd, 0, message.toAdd.length) : options.bytes === Array ? Array.prototype.slice.call(message.toAdd) : message.toAdd;
        return object;
    };

    /**
     * Converts this GSetMessage to JSON.
     * @function toJSON
     * @memberof GSetMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    GSetMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return GSetMessage;
})();

$root.MvrMessage = (function() {

    /**
     * Properties of a MvrMessage.
     * @exports IMvrMessage
     * @interface IMvrMessage
     * @property {Uint8Array} value MvrMessage value
     */

    /**
     * Constructs a new MvrMessage.
     * @exports MvrMessage
     * @classdesc Represents a MvrMessage.
     * @implements IMvrMessage
     * @constructor
     * @param {IMvrMessage=} [properties] Properties to set
     */
    function MvrMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MvrMessage value.
     * @member {Uint8Array} value
     * @memberof MvrMessage
     * @instance
     */
    MvrMessage.prototype.value = $util.newBuffer([]);

    /**
     * Creates a new MvrMessage instance using the specified properties.
     * @function create
     * @memberof MvrMessage
     * @static
     * @param {IMvrMessage=} [properties] Properties to set
     * @returns {MvrMessage} MvrMessage instance
     */
    MvrMessage.create = function create(properties) {
        return new MvrMessage(properties);
    };

    /**
     * Encodes the specified MvrMessage message. Does not implicitly {@link MvrMessage.verify|verify} messages.
     * @function encode
     * @memberof MvrMessage
     * @static
     * @param {IMvrMessage} message MvrMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MvrMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.value);
        return writer;
    };

    /**
     * Encodes the specified MvrMessage message, length delimited. Does not implicitly {@link MvrMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MvrMessage
     * @static
     * @param {IMvrMessage} message MvrMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MvrMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MvrMessage message from the specified reader or buffer.
     * @function decode
     * @memberof MvrMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MvrMessage} MvrMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MvrMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MvrMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.value = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("value"))
            throw $util.ProtocolError("missing required 'value'", { instance: message });
        return message;
    };

    /**
     * Decodes a MvrMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MvrMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MvrMessage} MvrMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MvrMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MvrMessage message.
     * @function verify
     * @memberof MvrMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MvrMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!(message.value && typeof message.value.length === "number" || $util.isString(message.value)))
            return "value: buffer expected";
        return null;
    };

    /**
     * Creates a MvrMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MvrMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MvrMessage} MvrMessage
     */
    MvrMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.MvrMessage)
            return object;
        var message = new $root.MvrMessage();
        if (object.value != null)
            if (typeof object.value === "string")
                $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0);
            else if (object.value.length)
                message.value = object.value;
        return message;
    };

    /**
     * Creates a plain object from a MvrMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MvrMessage
     * @static
     * @param {MvrMessage} message MvrMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MvrMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            if (options.bytes === String)
                object.value = "";
            else {
                object.value = [];
                if (options.bytes !== Array)
                    object.value = $util.newBuffer(object.value);
            }
        if (message.value != null && message.hasOwnProperty("value"))
            object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value;
        return object;
    };

    /**
     * Converts this MvrMessage to JSON.
     * @function toJSON
     * @memberof MvrMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MvrMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MvrMessage;
})();

$root.LwwMessage = (function() {

    /**
     * Properties of a LwwMessage.
     * @exports ILwwMessage
     * @interface ILwwMessage
     * @property {Uint8Array} value LwwMessage value
     * @property {number} time LwwMessage time
     */

    /**
     * Constructs a new LwwMessage.
     * @exports LwwMessage
     * @classdesc Represents a LwwMessage.
     * @implements ILwwMessage
     * @constructor
     * @param {ILwwMessage=} [properties] Properties to set
     */
    function LwwMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * LwwMessage value.
     * @member {Uint8Array} value
     * @memberof LwwMessage
     * @instance
     */
    LwwMessage.prototype.value = $util.newBuffer([]);

    /**
     * LwwMessage time.
     * @member {number} time
     * @memberof LwwMessage
     * @instance
     */
    LwwMessage.prototype.time = 0;

    /**
     * Creates a new LwwMessage instance using the specified properties.
     * @function create
     * @memberof LwwMessage
     * @static
     * @param {ILwwMessage=} [properties] Properties to set
     * @returns {LwwMessage} LwwMessage instance
     */
    LwwMessage.create = function create(properties) {
        return new LwwMessage(properties);
    };

    /**
     * Encodes the specified LwwMessage message. Does not implicitly {@link LwwMessage.verify|verify} messages.
     * @function encode
     * @memberof LwwMessage
     * @static
     * @param {ILwwMessage} message LwwMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    LwwMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.value);
        writer.uint32(/* id 2, wireType 1 =*/17).double(message.time);
        return writer;
    };

    /**
     * Encodes the specified LwwMessage message, length delimited. Does not implicitly {@link LwwMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof LwwMessage
     * @static
     * @param {ILwwMessage} message LwwMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    LwwMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a LwwMessage message from the specified reader or buffer.
     * @function decode
     * @memberof LwwMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {LwwMessage} LwwMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    LwwMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.LwwMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.value = reader.bytes();
                break;
            case 2:
                message.time = reader.double();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("value"))
            throw $util.ProtocolError("missing required 'value'", { instance: message });
        if (!message.hasOwnProperty("time"))
            throw $util.ProtocolError("missing required 'time'", { instance: message });
        return message;
    };

    /**
     * Decodes a LwwMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof LwwMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {LwwMessage} LwwMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    LwwMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a LwwMessage message.
     * @function verify
     * @memberof LwwMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    LwwMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!(message.value && typeof message.value.length === "number" || $util.isString(message.value)))
            return "value: buffer expected";
        if (typeof message.time !== "number")
            return "time: number expected";
        return null;
    };

    /**
     * Creates a LwwMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof LwwMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {LwwMessage} LwwMessage
     */
    LwwMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.LwwMessage)
            return object;
        var message = new $root.LwwMessage();
        if (object.value != null)
            if (typeof object.value === "string")
                $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0);
            else if (object.value.length)
                message.value = object.value;
        if (object.time != null)
            message.time = Number(object.time);
        return message;
    };

    /**
     * Creates a plain object from a LwwMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof LwwMessage
     * @static
     * @param {LwwMessage} message LwwMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    LwwMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if (options.bytes === String)
                object.value = "";
            else {
                object.value = [];
                if (options.bytes !== Array)
                    object.value = $util.newBuffer(object.value);
            }
            object.time = 0;
        }
        if (message.value != null && message.hasOwnProperty("value"))
            object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value;
        if (message.time != null && message.hasOwnProperty("time"))
            object.time = options.json && !isFinite(message.time) ? String(message.time) : message.time;
        return object;
    };

    /**
     * Converts this LwwMessage to JSON.
     * @function toJSON
     * @memberof LwwMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    LwwMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return LwwMessage;
})();

$root.CrdtRuntimeMessage = (function() {

    /**
     * Properties of a CrdtRuntimeMessage.
     * @exports ICrdtRuntimeMessage
     * @interface ICrdtRuntimeMessage
     * @property {Uint8Array} innerMessage CrdtRuntimeMessage innerMessage
     * @property {Array.<string>|null} [pathToRoot] CrdtRuntimeMessage pathToRoot
     */

    /**
     * Constructs a new CrdtRuntimeMessage.
     * @exports CrdtRuntimeMessage
     * @classdesc Represents a CrdtRuntimeMessage.
     * @implements ICrdtRuntimeMessage
     * @constructor
     * @param {ICrdtRuntimeMessage=} [properties] Properties to set
     */
    function CrdtRuntimeMessage(properties) {
        this.pathToRoot = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CrdtRuntimeMessage innerMessage.
     * @member {Uint8Array} innerMessage
     * @memberof CrdtRuntimeMessage
     * @instance
     */
    CrdtRuntimeMessage.prototype.innerMessage = $util.newBuffer([]);

    /**
     * CrdtRuntimeMessage pathToRoot.
     * @member {Array.<string>} pathToRoot
     * @memberof CrdtRuntimeMessage
     * @instance
     */
    CrdtRuntimeMessage.prototype.pathToRoot = $util.emptyArray;

    /**
     * Creates a new CrdtRuntimeMessage instance using the specified properties.
     * @function create
     * @memberof CrdtRuntimeMessage
     * @static
     * @param {ICrdtRuntimeMessage=} [properties] Properties to set
     * @returns {CrdtRuntimeMessage} CrdtRuntimeMessage instance
     */
    CrdtRuntimeMessage.create = function create(properties) {
        return new CrdtRuntimeMessage(properties);
    };

    /**
     * Encodes the specified CrdtRuntimeMessage message. Does not implicitly {@link CrdtRuntimeMessage.verify|verify} messages.
     * @function encode
     * @memberof CrdtRuntimeMessage
     * @static
     * @param {ICrdtRuntimeMessage} message CrdtRuntimeMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CrdtRuntimeMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.innerMessage);
        if (message.pathToRoot != null && message.pathToRoot.length)
            for (var i = 0; i < message.pathToRoot.length; ++i)
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.pathToRoot[i]);
        return writer;
    };

    /**
     * Encodes the specified CrdtRuntimeMessage message, length delimited. Does not implicitly {@link CrdtRuntimeMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CrdtRuntimeMessage
     * @static
     * @param {ICrdtRuntimeMessage} message CrdtRuntimeMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CrdtRuntimeMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CrdtRuntimeMessage message from the specified reader or buffer.
     * @function decode
     * @memberof CrdtRuntimeMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CrdtRuntimeMessage} CrdtRuntimeMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CrdtRuntimeMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.CrdtRuntimeMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.innerMessage = reader.bytes();
                break;
            case 2:
                if (!(message.pathToRoot && message.pathToRoot.length))
                    message.pathToRoot = [];
                message.pathToRoot.push(reader.string());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("innerMessage"))
            throw $util.ProtocolError("missing required 'innerMessage'", { instance: message });
        return message;
    };

    /**
     * Decodes a CrdtRuntimeMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CrdtRuntimeMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CrdtRuntimeMessage} CrdtRuntimeMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CrdtRuntimeMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CrdtRuntimeMessage message.
     * @function verify
     * @memberof CrdtRuntimeMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CrdtRuntimeMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!(message.innerMessage && typeof message.innerMessage.length === "number" || $util.isString(message.innerMessage)))
            return "innerMessage: buffer expected";
        if (message.pathToRoot != null && message.hasOwnProperty("pathToRoot")) {
            if (!Array.isArray(message.pathToRoot))
                return "pathToRoot: array expected";
            for (var i = 0; i < message.pathToRoot.length; ++i)
                if (!$util.isString(message.pathToRoot[i]))
                    return "pathToRoot: string[] expected";
        }
        return null;
    };

    /**
     * Creates a CrdtRuntimeMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CrdtRuntimeMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CrdtRuntimeMessage} CrdtRuntimeMessage
     */
    CrdtRuntimeMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.CrdtRuntimeMessage)
            return object;
        var message = new $root.CrdtRuntimeMessage();
        if (object.innerMessage != null)
            if (typeof object.innerMessage === "string")
                $util.base64.decode(object.innerMessage, message.innerMessage = $util.newBuffer($util.base64.length(object.innerMessage)), 0);
            else if (object.innerMessage.length)
                message.innerMessage = object.innerMessage;
        if (object.pathToRoot) {
            if (!Array.isArray(object.pathToRoot))
                throw TypeError(".CrdtRuntimeMessage.pathToRoot: array expected");
            message.pathToRoot = [];
            for (var i = 0; i < object.pathToRoot.length; ++i)
                message.pathToRoot[i] = String(object.pathToRoot[i]);
        }
        return message;
    };

    /**
     * Creates a plain object from a CrdtRuntimeMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CrdtRuntimeMessage
     * @static
     * @param {CrdtRuntimeMessage} message CrdtRuntimeMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CrdtRuntimeMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.pathToRoot = [];
        if (options.defaults)
            if (options.bytes === String)
                object.innerMessage = "";
            else {
                object.innerMessage = [];
                if (options.bytes !== Array)
                    object.innerMessage = $util.newBuffer(object.innerMessage);
            }
        if (message.innerMessage != null && message.hasOwnProperty("innerMessage"))
            object.innerMessage = options.bytes === String ? $util.base64.encode(message.innerMessage, 0, message.innerMessage.length) : options.bytes === Array ? Array.prototype.slice.call(message.innerMessage) : message.innerMessage;
        if (message.pathToRoot && message.pathToRoot.length) {
            object.pathToRoot = [];
            for (var j = 0; j < message.pathToRoot.length; ++j)
                object.pathToRoot[j] = message.pathToRoot[j];
        }
        return object;
    };

    /**
     * Converts this CrdtRuntimeMessage to JSON.
     * @function toJSON
     * @memberof CrdtRuntimeMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CrdtRuntimeMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return CrdtRuntimeMessage;
})();

module.exports = $root;

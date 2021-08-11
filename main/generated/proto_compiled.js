/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.DefaultCausalBroadcastMessage = (function() {

    /**
     * Properties of a DefaultCausalBroadcastMessage.
     * @exports IDefaultCausalBroadcastMessage
     * @interface IDefaultCausalBroadcastMessage
     * @property {Uint8Array} message DefaultCausalBroadcastMessage message
     * @property {string} sender DefaultCausalBroadcastMessage sender
     * @property {number} senderCounter DefaultCausalBroadcastMessage senderCounter
     * @property {Object.<string,number>|null} [vectorMap] DefaultCausalBroadcastMessage vectorMap
     * @property {number|Long} time DefaultCausalBroadcastMessage time
     */

    /**
     * Constructs a new DefaultCausalBroadcastMessage.
     * @exports DefaultCausalBroadcastMessage
     * @classdesc Represents a DefaultCausalBroadcastMessage.
     * @implements IDefaultCausalBroadcastMessage
     * @constructor
     * @param {IDefaultCausalBroadcastMessage=} [properties] Properties to set
     */
    function DefaultCausalBroadcastMessage(properties) {
        this.vectorMap = {};
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * DefaultCausalBroadcastMessage message.
     * @member {Uint8Array} message
     * @memberof DefaultCausalBroadcastMessage
     * @instance
     */
    DefaultCausalBroadcastMessage.prototype.message = $util.newBuffer([]);

    /**
     * DefaultCausalBroadcastMessage sender.
     * @member {string} sender
     * @memberof DefaultCausalBroadcastMessage
     * @instance
     */
    DefaultCausalBroadcastMessage.prototype.sender = "";

    /**
     * DefaultCausalBroadcastMessage senderCounter.
     * @member {number} senderCounter
     * @memberof DefaultCausalBroadcastMessage
     * @instance
     */
    DefaultCausalBroadcastMessage.prototype.senderCounter = 0;

    /**
     * DefaultCausalBroadcastMessage vectorMap.
     * @member {Object.<string,number>} vectorMap
     * @memberof DefaultCausalBroadcastMessage
     * @instance
     */
    DefaultCausalBroadcastMessage.prototype.vectorMap = $util.emptyObject;

    /**
     * DefaultCausalBroadcastMessage time.
     * @member {number|Long} time
     * @memberof DefaultCausalBroadcastMessage
     * @instance
     */
    DefaultCausalBroadcastMessage.prototype.time = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * Creates a new DefaultCausalBroadcastMessage instance using the specified properties.
     * @function create
     * @memberof DefaultCausalBroadcastMessage
     * @static
     * @param {IDefaultCausalBroadcastMessage=} [properties] Properties to set
     * @returns {DefaultCausalBroadcastMessage} DefaultCausalBroadcastMessage instance
     */
    DefaultCausalBroadcastMessage.create = function create(properties) {
        return new DefaultCausalBroadcastMessage(properties);
    };

    /**
     * Encodes the specified DefaultCausalBroadcastMessage message. Does not implicitly {@link DefaultCausalBroadcastMessage.verify|verify} messages.
     * @function encode
     * @memberof DefaultCausalBroadcastMessage
     * @static
     * @param {IDefaultCausalBroadcastMessage} message DefaultCausalBroadcastMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DefaultCausalBroadcastMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.message);
        writer.uint32(/* id 2, wireType 2 =*/18).string(message.sender);
        writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.senderCounter);
        if (message.vectorMap != null && Object.hasOwnProperty.call(message, "vectorMap"))
            for (var keys = Object.keys(message.vectorMap), i = 0; i < keys.length; ++i)
                writer.uint32(/* id 4, wireType 2 =*/34).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 0 =*/16).uint32(message.vectorMap[keys[i]]).ldelim();
        writer.uint32(/* id 5, wireType 0 =*/40).uint64(message.time);
        return writer;
    };

    /**
     * Encodes the specified DefaultCausalBroadcastMessage message, length delimited. Does not implicitly {@link DefaultCausalBroadcastMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof DefaultCausalBroadcastMessage
     * @static
     * @param {IDefaultCausalBroadcastMessage} message DefaultCausalBroadcastMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DefaultCausalBroadcastMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a DefaultCausalBroadcastMessage message from the specified reader or buffer.
     * @function decode
     * @memberof DefaultCausalBroadcastMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {DefaultCausalBroadcastMessage} DefaultCausalBroadcastMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DefaultCausalBroadcastMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.DefaultCausalBroadcastMessage(), key, value;
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.message = reader.bytes();
                break;
            case 2:
                message.sender = reader.string();
                break;
            case 3:
                message.senderCounter = reader.uint32();
                break;
            case 4:
                if (message.vectorMap === $util.emptyObject)
                    message.vectorMap = {};
                var end2 = reader.uint32() + reader.pos;
                key = "";
                value = 0;
                while (reader.pos < end2) {
                    var tag2 = reader.uint32();
                    switch (tag2 >>> 3) {
                    case 1:
                        key = reader.string();
                        break;
                    case 2:
                        value = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag2 & 7);
                        break;
                    }
                }
                message.vectorMap[key] = value;
                break;
            case 5:
                message.time = reader.uint64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("message"))
            throw $util.ProtocolError("missing required 'message'", { instance: message });
        if (!message.hasOwnProperty("sender"))
            throw $util.ProtocolError("missing required 'sender'", { instance: message });
        if (!message.hasOwnProperty("senderCounter"))
            throw $util.ProtocolError("missing required 'senderCounter'", { instance: message });
        if (!message.hasOwnProperty("time"))
            throw $util.ProtocolError("missing required 'time'", { instance: message });
        return message;
    };

    /**
     * Decodes a DefaultCausalBroadcastMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof DefaultCausalBroadcastMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {DefaultCausalBroadcastMessage} DefaultCausalBroadcastMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DefaultCausalBroadcastMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a DefaultCausalBroadcastMessage message.
     * @function verify
     * @memberof DefaultCausalBroadcastMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    DefaultCausalBroadcastMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!(message.message && typeof message.message.length === "number" || $util.isString(message.message)))
            return "message: buffer expected";
        if (!$util.isString(message.sender))
            return "sender: string expected";
        if (!$util.isInteger(message.senderCounter))
            return "senderCounter: integer expected";
        if (message.vectorMap != null && message.hasOwnProperty("vectorMap")) {
            if (!$util.isObject(message.vectorMap))
                return "vectorMap: object expected";
            var key = Object.keys(message.vectorMap);
            for (var i = 0; i < key.length; ++i)
                if (!$util.isInteger(message.vectorMap[key[i]]))
                    return "vectorMap: integer{k:string} expected";
        }
        if (!$util.isInteger(message.time) && !(message.time && $util.isInteger(message.time.low) && $util.isInteger(message.time.high)))
            return "time: integer|Long expected";
        return null;
    };

    /**
     * Creates a DefaultCausalBroadcastMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof DefaultCausalBroadcastMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {DefaultCausalBroadcastMessage} DefaultCausalBroadcastMessage
     */
    DefaultCausalBroadcastMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.DefaultCausalBroadcastMessage)
            return object;
        var message = new $root.DefaultCausalBroadcastMessage();
        if (object.message != null)
            if (typeof object.message === "string")
                $util.base64.decode(object.message, message.message = $util.newBuffer($util.base64.length(object.message)), 0);
            else if (object.message.length)
                message.message = object.message;
        if (object.sender != null)
            message.sender = String(object.sender);
        if (object.senderCounter != null)
            message.senderCounter = object.senderCounter >>> 0;
        if (object.vectorMap) {
            if (typeof object.vectorMap !== "object")
                throw TypeError(".DefaultCausalBroadcastMessage.vectorMap: object expected");
            message.vectorMap = {};
            for (var keys = Object.keys(object.vectorMap), i = 0; i < keys.length; ++i)
                message.vectorMap[keys[i]] = object.vectorMap[keys[i]] >>> 0;
        }
        if (object.time != null)
            if ($util.Long)
                (message.time = $util.Long.fromValue(object.time)).unsigned = true;
            else if (typeof object.time === "string")
                message.time = parseInt(object.time, 10);
            else if (typeof object.time === "number")
                message.time = object.time;
            else if (typeof object.time === "object")
                message.time = new $util.LongBits(object.time.low >>> 0, object.time.high >>> 0).toNumber(true);
        return message;
    };

    /**
     * Creates a plain object from a DefaultCausalBroadcastMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof DefaultCausalBroadcastMessage
     * @static
     * @param {DefaultCausalBroadcastMessage} message DefaultCausalBroadcastMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    DefaultCausalBroadcastMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.objects || options.defaults)
            object.vectorMap = {};
        if (options.defaults) {
            if (options.bytes === String)
                object.message = "";
            else {
                object.message = [];
                if (options.bytes !== Array)
                    object.message = $util.newBuffer(object.message);
            }
            object.sender = "";
            object.senderCounter = 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.time = options.longs === String ? "0" : 0;
        }
        if (message.message != null && message.hasOwnProperty("message"))
            object.message = options.bytes === String ? $util.base64.encode(message.message, 0, message.message.length) : options.bytes === Array ? Array.prototype.slice.call(message.message) : message.message;
        if (message.sender != null && message.hasOwnProperty("sender"))
            object.sender = message.sender;
        if (message.senderCounter != null && message.hasOwnProperty("senderCounter"))
            object.senderCounter = message.senderCounter;
        var keys2;
        if (message.vectorMap && (keys2 = Object.keys(message.vectorMap)).length) {
            object.vectorMap = {};
            for (var j = 0; j < keys2.length; ++j)
                object.vectorMap[keys2[j]] = message.vectorMap[keys2[j]];
        }
        if (message.time != null && message.hasOwnProperty("time"))
            if (typeof message.time === "number")
                object.time = options.longs === String ? String(message.time) : message.time;
            else
                object.time = options.longs === String ? $util.Long.prototype.toString.call(message.time) : options.longs === Number ? new $util.LongBits(message.time.low >>> 0, message.time.high >>> 0).toNumber(true) : message.time;
        return object;
    };

    /**
     * Converts this DefaultCausalBroadcastMessage to JSON.
     * @function toJSON
     * @memberof DefaultCausalBroadcastMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    DefaultCausalBroadcastMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return DefaultCausalBroadcastMessage;
})();

$root.DefaultCausalBroadcastSave = (function() {

    /**
     * Properties of a DefaultCausalBroadcastSave.
     * @exports IDefaultCausalBroadcastSave
     * @interface IDefaultCausalBroadcastSave
     * @property {Object.<string,number>|null} [vectorMap] DefaultCausalBroadcastSave vectorMap
     * @property {Array.<Uint8Array>|null} [messageBuffer] DefaultCausalBroadcastSave messageBuffer
     * @property {number} bufferCheckIndex DefaultCausalBroadcastSave bufferCheckIndex
     * @property {Uint8Array} broadcastNetworkSave DefaultCausalBroadcastSave broadcastNetworkSave
     */

    /**
     * Constructs a new DefaultCausalBroadcastSave.
     * @exports DefaultCausalBroadcastSave
     * @classdesc Represents a DefaultCausalBroadcastSave.
     * @implements IDefaultCausalBroadcastSave
     * @constructor
     * @param {IDefaultCausalBroadcastSave=} [properties] Properties to set
     */
    function DefaultCausalBroadcastSave(properties) {
        this.vectorMap = {};
        this.messageBuffer = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * DefaultCausalBroadcastSave vectorMap.
     * @member {Object.<string,number>} vectorMap
     * @memberof DefaultCausalBroadcastSave
     * @instance
     */
    DefaultCausalBroadcastSave.prototype.vectorMap = $util.emptyObject;

    /**
     * DefaultCausalBroadcastSave messageBuffer.
     * @member {Array.<Uint8Array>} messageBuffer
     * @memberof DefaultCausalBroadcastSave
     * @instance
     */
    DefaultCausalBroadcastSave.prototype.messageBuffer = $util.emptyArray;

    /**
     * DefaultCausalBroadcastSave bufferCheckIndex.
     * @member {number} bufferCheckIndex
     * @memberof DefaultCausalBroadcastSave
     * @instance
     */
    DefaultCausalBroadcastSave.prototype.bufferCheckIndex = 0;

    /**
     * DefaultCausalBroadcastSave broadcastNetworkSave.
     * @member {Uint8Array} broadcastNetworkSave
     * @memberof DefaultCausalBroadcastSave
     * @instance
     */
    DefaultCausalBroadcastSave.prototype.broadcastNetworkSave = $util.newBuffer([]);

    /**
     * Creates a new DefaultCausalBroadcastSave instance using the specified properties.
     * @function create
     * @memberof DefaultCausalBroadcastSave
     * @static
     * @param {IDefaultCausalBroadcastSave=} [properties] Properties to set
     * @returns {DefaultCausalBroadcastSave} DefaultCausalBroadcastSave instance
     */
    DefaultCausalBroadcastSave.create = function create(properties) {
        return new DefaultCausalBroadcastSave(properties);
    };

    /**
     * Encodes the specified DefaultCausalBroadcastSave message. Does not implicitly {@link DefaultCausalBroadcastSave.verify|verify} messages.
     * @function encode
     * @memberof DefaultCausalBroadcastSave
     * @static
     * @param {IDefaultCausalBroadcastSave} message DefaultCausalBroadcastSave message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DefaultCausalBroadcastSave.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.vectorMap != null && Object.hasOwnProperty.call(message, "vectorMap"))
            for (var keys = Object.keys(message.vectorMap), i = 0; i < keys.length; ++i)
                writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 0 =*/16).uint32(message.vectorMap[keys[i]]).ldelim();
        if (message.messageBuffer != null && message.messageBuffer.length)
            for (var i = 0; i < message.messageBuffer.length; ++i)
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.messageBuffer[i]);
        writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.bufferCheckIndex);
        writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.broadcastNetworkSave);
        return writer;
    };

    /**
     * Encodes the specified DefaultCausalBroadcastSave message, length delimited. Does not implicitly {@link DefaultCausalBroadcastSave.verify|verify} messages.
     * @function encodeDelimited
     * @memberof DefaultCausalBroadcastSave
     * @static
     * @param {IDefaultCausalBroadcastSave} message DefaultCausalBroadcastSave message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DefaultCausalBroadcastSave.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a DefaultCausalBroadcastSave message from the specified reader or buffer.
     * @function decode
     * @memberof DefaultCausalBroadcastSave
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {DefaultCausalBroadcastSave} DefaultCausalBroadcastSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DefaultCausalBroadcastSave.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.DefaultCausalBroadcastSave(), key, value;
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (message.vectorMap === $util.emptyObject)
                    message.vectorMap = {};
                var end2 = reader.uint32() + reader.pos;
                key = "";
                value = 0;
                while (reader.pos < end2) {
                    var tag2 = reader.uint32();
                    switch (tag2 >>> 3) {
                    case 1:
                        key = reader.string();
                        break;
                    case 2:
                        value = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag2 & 7);
                        break;
                    }
                }
                message.vectorMap[key] = value;
                break;
            case 2:
                if (!(message.messageBuffer && message.messageBuffer.length))
                    message.messageBuffer = [];
                message.messageBuffer.push(reader.bytes());
                break;
            case 3:
                message.bufferCheckIndex = reader.uint32();
                break;
            case 4:
                message.broadcastNetworkSave = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("bufferCheckIndex"))
            throw $util.ProtocolError("missing required 'bufferCheckIndex'", { instance: message });
        if (!message.hasOwnProperty("broadcastNetworkSave"))
            throw $util.ProtocolError("missing required 'broadcastNetworkSave'", { instance: message });
        return message;
    };

    /**
     * Decodes a DefaultCausalBroadcastSave message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof DefaultCausalBroadcastSave
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {DefaultCausalBroadcastSave} DefaultCausalBroadcastSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DefaultCausalBroadcastSave.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a DefaultCausalBroadcastSave message.
     * @function verify
     * @memberof DefaultCausalBroadcastSave
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    DefaultCausalBroadcastSave.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.vectorMap != null && message.hasOwnProperty("vectorMap")) {
            if (!$util.isObject(message.vectorMap))
                return "vectorMap: object expected";
            var key = Object.keys(message.vectorMap);
            for (var i = 0; i < key.length; ++i)
                if (!$util.isInteger(message.vectorMap[key[i]]))
                    return "vectorMap: integer{k:string} expected";
        }
        if (message.messageBuffer != null && message.hasOwnProperty("messageBuffer")) {
            if (!Array.isArray(message.messageBuffer))
                return "messageBuffer: array expected";
            for (var i = 0; i < message.messageBuffer.length; ++i)
                if (!(message.messageBuffer[i] && typeof message.messageBuffer[i].length === "number" || $util.isString(message.messageBuffer[i])))
                    return "messageBuffer: buffer[] expected";
        }
        if (!$util.isInteger(message.bufferCheckIndex))
            return "bufferCheckIndex: integer expected";
        if (!(message.broadcastNetworkSave && typeof message.broadcastNetworkSave.length === "number" || $util.isString(message.broadcastNetworkSave)))
            return "broadcastNetworkSave: buffer expected";
        return null;
    };

    /**
     * Creates a DefaultCausalBroadcastSave message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof DefaultCausalBroadcastSave
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {DefaultCausalBroadcastSave} DefaultCausalBroadcastSave
     */
    DefaultCausalBroadcastSave.fromObject = function fromObject(object) {
        if (object instanceof $root.DefaultCausalBroadcastSave)
            return object;
        var message = new $root.DefaultCausalBroadcastSave();
        if (object.vectorMap) {
            if (typeof object.vectorMap !== "object")
                throw TypeError(".DefaultCausalBroadcastSave.vectorMap: object expected");
            message.vectorMap = {};
            for (var keys = Object.keys(object.vectorMap), i = 0; i < keys.length; ++i)
                message.vectorMap[keys[i]] = object.vectorMap[keys[i]] >>> 0;
        }
        if (object.messageBuffer) {
            if (!Array.isArray(object.messageBuffer))
                throw TypeError(".DefaultCausalBroadcastSave.messageBuffer: array expected");
            message.messageBuffer = [];
            for (var i = 0; i < object.messageBuffer.length; ++i)
                if (typeof object.messageBuffer[i] === "string")
                    $util.base64.decode(object.messageBuffer[i], message.messageBuffer[i] = $util.newBuffer($util.base64.length(object.messageBuffer[i])), 0);
                else if (object.messageBuffer[i].length)
                    message.messageBuffer[i] = object.messageBuffer[i];
        }
        if (object.bufferCheckIndex != null)
            message.bufferCheckIndex = object.bufferCheckIndex >>> 0;
        if (object.broadcastNetworkSave != null)
            if (typeof object.broadcastNetworkSave === "string")
                $util.base64.decode(object.broadcastNetworkSave, message.broadcastNetworkSave = $util.newBuffer($util.base64.length(object.broadcastNetworkSave)), 0);
            else if (object.broadcastNetworkSave.length)
                message.broadcastNetworkSave = object.broadcastNetworkSave;
        return message;
    };

    /**
     * Creates a plain object from a DefaultCausalBroadcastSave message. Also converts values to other types if specified.
     * @function toObject
     * @memberof DefaultCausalBroadcastSave
     * @static
     * @param {DefaultCausalBroadcastSave} message DefaultCausalBroadcastSave
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    DefaultCausalBroadcastSave.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.messageBuffer = [];
        if (options.objects || options.defaults)
            object.vectorMap = {};
        if (options.defaults) {
            object.bufferCheckIndex = 0;
            if (options.bytes === String)
                object.broadcastNetworkSave = "";
            else {
                object.broadcastNetworkSave = [];
                if (options.bytes !== Array)
                    object.broadcastNetworkSave = $util.newBuffer(object.broadcastNetworkSave);
            }
        }
        var keys2;
        if (message.vectorMap && (keys2 = Object.keys(message.vectorMap)).length) {
            object.vectorMap = {};
            for (var j = 0; j < keys2.length; ++j)
                object.vectorMap[keys2[j]] = message.vectorMap[keys2[j]];
        }
        if (message.messageBuffer && message.messageBuffer.length) {
            object.messageBuffer = [];
            for (var j = 0; j < message.messageBuffer.length; ++j)
                object.messageBuffer[j] = options.bytes === String ? $util.base64.encode(message.messageBuffer[j], 0, message.messageBuffer[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.messageBuffer[j]) : message.messageBuffer[j];
        }
        if (message.bufferCheckIndex != null && message.hasOwnProperty("bufferCheckIndex"))
            object.bufferCheckIndex = message.bufferCheckIndex;
        if (message.broadcastNetworkSave != null && message.hasOwnProperty("broadcastNetworkSave"))
            object.broadcastNetworkSave = options.bytes === String ? $util.base64.encode(message.broadcastNetworkSave, 0, message.broadcastNetworkSave.length) : options.bytes === Array ? Array.prototype.slice.call(message.broadcastNetworkSave) : message.broadcastNetworkSave;
        return object;
    };

    /**
     * Converts this DefaultCausalBroadcastSave to JSON.
     * @function toJSON
     * @memberof DefaultCausalBroadcastSave
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    DefaultCausalBroadcastSave.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return DefaultCausalBroadcastSave;
})();

$root.CrdtReference = (function() {

    /**
     * Properties of a CrdtReference.
     * @exports ICrdtReference
     * @interface ICrdtReference
     * @property {Array.<Uint8Array>|null} [pathToBase] CrdtReference pathToBase
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
        this.pathToBase = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CrdtReference pathToBase.
     * @member {Array.<Uint8Array>} pathToBase
     * @memberof CrdtReference
     * @instance
     */
    CrdtReference.prototype.pathToBase = $util.emptyArray;

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
        if (message.pathToBase != null && message.pathToBase.length)
            for (var i = 0; i < message.pathToBase.length; ++i)
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.pathToBase[i]);
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
                if (!(message.pathToBase && message.pathToBase.length))
                    message.pathToBase = [];
                message.pathToBase.push(reader.bytes());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
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
        if (message.pathToBase != null && message.hasOwnProperty("pathToBase")) {
            if (!Array.isArray(message.pathToBase))
                return "pathToBase: array expected";
            for (var i = 0; i < message.pathToBase.length; ++i)
                if (!(message.pathToBase[i] && typeof message.pathToBase[i].length === "number" || $util.isString(message.pathToBase[i])))
                    return "pathToBase: buffer[] expected";
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
        if (object.pathToBase) {
            if (!Array.isArray(object.pathToBase))
                throw TypeError(".CrdtReference.pathToBase: array expected");
            message.pathToBase = [];
            for (var i = 0; i < object.pathToBase.length; ++i)
                if (typeof object.pathToBase[i] === "string")
                    $util.base64.decode(object.pathToBase[i], message.pathToBase[i] = $util.newBuffer($util.base64.length(object.pathToBase[i])), 0);
                else if (object.pathToBase[i].length)
                    message.pathToBase[i] = object.pathToBase[i];
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
            object.pathToBase = [];
        if (message.pathToBase && message.pathToBase.length) {
            object.pathToBase = [];
            for (var j = 0; j < message.pathToBase.length; ++j)
                object.pathToBase[j] = options.bytes === String ? $util.base64.encode(message.pathToBase[j], 0, message.pathToBase[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.pathToBase[j]) : message.pathToBase[j];
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

$root.ArrayMessage = (function() {

    /**
     * Properties of an ArrayMessage.
     * @exports IArrayMessage
     * @interface IArrayMessage
     * @property {Array.<Uint8Array>|null} [elements] ArrayMessage elements
     */

    /**
     * Constructs a new ArrayMessage.
     * @exports ArrayMessage
     * @classdesc Represents an ArrayMessage.
     * @implements IArrayMessage
     * @constructor
     * @param {IArrayMessage=} [properties] Properties to set
     */
    function ArrayMessage(properties) {
        this.elements = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ArrayMessage elements.
     * @member {Array.<Uint8Array>} elements
     * @memberof ArrayMessage
     * @instance
     */
    ArrayMessage.prototype.elements = $util.emptyArray;

    /**
     * Creates a new ArrayMessage instance using the specified properties.
     * @function create
     * @memberof ArrayMessage
     * @static
     * @param {IArrayMessage=} [properties] Properties to set
     * @returns {ArrayMessage} ArrayMessage instance
     */
    ArrayMessage.create = function create(properties) {
        return new ArrayMessage(properties);
    };

    /**
     * Encodes the specified ArrayMessage message. Does not implicitly {@link ArrayMessage.verify|verify} messages.
     * @function encode
     * @memberof ArrayMessage
     * @static
     * @param {IArrayMessage} message ArrayMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ArrayMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.elements != null && message.elements.length)
            for (var i = 0; i < message.elements.length; ++i)
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.elements[i]);
        return writer;
    };

    /**
     * Encodes the specified ArrayMessage message, length delimited. Does not implicitly {@link ArrayMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ArrayMessage
     * @static
     * @param {IArrayMessage} message ArrayMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ArrayMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an ArrayMessage message from the specified reader or buffer.
     * @function decode
     * @memberof ArrayMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ArrayMessage} ArrayMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ArrayMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ArrayMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.elements && message.elements.length))
                    message.elements = [];
                message.elements.push(reader.bytes());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an ArrayMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ArrayMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ArrayMessage} ArrayMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ArrayMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an ArrayMessage message.
     * @function verify
     * @memberof ArrayMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ArrayMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.elements != null && message.hasOwnProperty("elements")) {
            if (!Array.isArray(message.elements))
                return "elements: array expected";
            for (var i = 0; i < message.elements.length; ++i)
                if (!(message.elements[i] && typeof message.elements[i].length === "number" || $util.isString(message.elements[i])))
                    return "elements: buffer[] expected";
        }
        return null;
    };

    /**
     * Creates an ArrayMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ArrayMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ArrayMessage} ArrayMessage
     */
    ArrayMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.ArrayMessage)
            return object;
        var message = new $root.ArrayMessage();
        if (object.elements) {
            if (!Array.isArray(object.elements))
                throw TypeError(".ArrayMessage.elements: array expected");
            message.elements = [];
            for (var i = 0; i < object.elements.length; ++i)
                if (typeof object.elements[i] === "string")
                    $util.base64.decode(object.elements[i], message.elements[i] = $util.newBuffer($util.base64.length(object.elements[i])), 0);
                else if (object.elements[i].length)
                    message.elements[i] = object.elements[i];
        }
        return message;
    };

    /**
     * Creates a plain object from an ArrayMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ArrayMessage
     * @static
     * @param {ArrayMessage} message ArrayMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ArrayMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.elements = [];
        if (message.elements && message.elements.length) {
            object.elements = [];
            for (var j = 0; j < message.elements.length; ++j)
                object.elements[j] = options.bytes === String ? $util.base64.encode(message.elements[j], 0, message.elements[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.elements[j]) : message.elements[j];
        }
        return object;
    };

    /**
     * Converts this ArrayMessage to JSON.
     * @function toJSON
     * @memberof ArrayMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ArrayMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ArrayMessage;
})();

$root.ObjectMessage = (function() {

    /**
     * Properties of an ObjectMessage.
     * @exports IObjectMessage
     * @interface IObjectMessage
     * @property {Object.<string,Uint8Array>|null} [properties] ObjectMessage properties
     */

    /**
     * Constructs a new ObjectMessage.
     * @exports ObjectMessage
     * @classdesc Represents an ObjectMessage.
     * @implements IObjectMessage
     * @constructor
     * @param {IObjectMessage=} [properties] Properties to set
     */
    function ObjectMessage(properties) {
        this.properties = {};
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ObjectMessage properties.
     * @member {Object.<string,Uint8Array>} properties
     * @memberof ObjectMessage
     * @instance
     */
    ObjectMessage.prototype.properties = $util.emptyObject;

    /**
     * Creates a new ObjectMessage instance using the specified properties.
     * @function create
     * @memberof ObjectMessage
     * @static
     * @param {IObjectMessage=} [properties] Properties to set
     * @returns {ObjectMessage} ObjectMessage instance
     */
    ObjectMessage.create = function create(properties) {
        return new ObjectMessage(properties);
    };

    /**
     * Encodes the specified ObjectMessage message. Does not implicitly {@link ObjectMessage.verify|verify} messages.
     * @function encode
     * @memberof ObjectMessage
     * @static
     * @param {IObjectMessage} message ObjectMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ObjectMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.properties != null && Object.hasOwnProperty.call(message, "properties"))
            for (var keys = Object.keys(message.properties), i = 0; i < keys.length; ++i)
                writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).bytes(message.properties[keys[i]]).ldelim();
        return writer;
    };

    /**
     * Encodes the specified ObjectMessage message, length delimited. Does not implicitly {@link ObjectMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ObjectMessage
     * @static
     * @param {IObjectMessage} message ObjectMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ObjectMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an ObjectMessage message from the specified reader or buffer.
     * @function decode
     * @memberof ObjectMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ObjectMessage} ObjectMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ObjectMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ObjectMessage(), key, value;
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (message.properties === $util.emptyObject)
                    message.properties = {};
                var end2 = reader.uint32() + reader.pos;
                key = "";
                value = [];
                while (reader.pos < end2) {
                    var tag2 = reader.uint32();
                    switch (tag2 >>> 3) {
                    case 1:
                        key = reader.string();
                        break;
                    case 2:
                        value = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag2 & 7);
                        break;
                    }
                }
                message.properties[key] = value;
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an ObjectMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ObjectMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ObjectMessage} ObjectMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ObjectMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an ObjectMessage message.
     * @function verify
     * @memberof ObjectMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ObjectMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.properties != null && message.hasOwnProperty("properties")) {
            if (!$util.isObject(message.properties))
                return "properties: object expected";
            var key = Object.keys(message.properties);
            for (var i = 0; i < key.length; ++i)
                if (!(message.properties[key[i]] && typeof message.properties[key[i]].length === "number" || $util.isString(message.properties[key[i]])))
                    return "properties: buffer{k:string} expected";
        }
        return null;
    };

    /**
     * Creates an ObjectMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ObjectMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ObjectMessage} ObjectMessage
     */
    ObjectMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.ObjectMessage)
            return object;
        var message = new $root.ObjectMessage();
        if (object.properties) {
            if (typeof object.properties !== "object")
                throw TypeError(".ObjectMessage.properties: object expected");
            message.properties = {};
            for (var keys = Object.keys(object.properties), i = 0; i < keys.length; ++i)
                if (typeof object.properties[keys[i]] === "string")
                    $util.base64.decode(object.properties[keys[i]], message.properties[keys[i]] = $util.newBuffer($util.base64.length(object.properties[keys[i]])), 0);
                else if (object.properties[keys[i]].length)
                    message.properties[keys[i]] = object.properties[keys[i]];
        }
        return message;
    };

    /**
     * Creates a plain object from an ObjectMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ObjectMessage
     * @static
     * @param {ObjectMessage} message ObjectMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ObjectMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.objects || options.defaults)
            object.properties = {};
        var keys2;
        if (message.properties && (keys2 = Object.keys(message.properties)).length) {
            object.properties = {};
            for (var j = 0; j < keys2.length; ++j)
                object.properties[keys2[j]] = options.bytes === String ? $util.base64.encode(message.properties[keys2[j]], 0, message.properties[keys2[j]].length) : options.bytes === Array ? Array.prototype.slice.call(message.properties[keys2[j]]) : message.properties[keys2[j]];
        }
        return object;
    };

    /**
     * Converts this ObjectMessage to JSON.
     * @function toJSON
     * @memberof ObjectMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ObjectMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ObjectMessage;
})();

$root.DefaultSerializerMessage = (function() {

    /**
     * Properties of a DefaultSerializerMessage.
     * @exports IDefaultSerializerMessage
     * @interface IDefaultSerializerMessage
     * @property {string|null} [stringValue] DefaultSerializerMessage stringValue
     * @property {number|null} [numberValue] DefaultSerializerMessage numberValue
     * @property {boolean|null} [booleanValue] DefaultSerializerMessage booleanValue
     * @property {boolean|null} [undefinedValue] DefaultSerializerMessage undefinedValue
     * @property {boolean|null} [nullValue] DefaultSerializerMessage nullValue
     * @property {ICrdtReference|null} [crdtValue] DefaultSerializerMessage crdtValue
     * @property {IArrayMessage|null} [arrayValue] DefaultSerializerMessage arrayValue
     * @property {IObjectMessage|null} [objectValue] DefaultSerializerMessage objectValue
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
     * DefaultSerializerMessage booleanValue.
     * @member {boolean} booleanValue
     * @memberof DefaultSerializerMessage
     * @instance
     */
    DefaultSerializerMessage.prototype.booleanValue = false;

    /**
     * DefaultSerializerMessage undefinedValue.
     * @member {boolean} undefinedValue
     * @memberof DefaultSerializerMessage
     * @instance
     */
    DefaultSerializerMessage.prototype.undefinedValue = false;

    /**
     * DefaultSerializerMessage nullValue.
     * @member {boolean} nullValue
     * @memberof DefaultSerializerMessage
     * @instance
     */
    DefaultSerializerMessage.prototype.nullValue = false;

    /**
     * DefaultSerializerMessage crdtValue.
     * @member {ICrdtReference|null|undefined} crdtValue
     * @memberof DefaultSerializerMessage
     * @instance
     */
    DefaultSerializerMessage.prototype.crdtValue = null;

    /**
     * DefaultSerializerMessage arrayValue.
     * @member {IArrayMessage|null|undefined} arrayValue
     * @memberof DefaultSerializerMessage
     * @instance
     */
    DefaultSerializerMessage.prototype.arrayValue = null;

    /**
     * DefaultSerializerMessage objectValue.
     * @member {IObjectMessage|null|undefined} objectValue
     * @memberof DefaultSerializerMessage
     * @instance
     */
    DefaultSerializerMessage.prototype.objectValue = null;

    // OneOf field names bound to virtual getters and setters
    var $oneOfFields;

    /**
     * DefaultSerializerMessage value.
     * @member {"stringValue"|"numberValue"|"booleanValue"|"undefinedValue"|"nullValue"|"crdtValue"|"arrayValue"|"objectValue"|undefined} value
     * @memberof DefaultSerializerMessage
     * @instance
     */
    Object.defineProperty(DefaultSerializerMessage.prototype, "value", {
        get: $util.oneOfGetter($oneOfFields = ["stringValue", "numberValue", "booleanValue", "undefinedValue", "nullValue", "crdtValue", "arrayValue", "objectValue"]),
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
        if (message.booleanValue != null && Object.hasOwnProperty.call(message, "booleanValue"))
            writer.uint32(/* id 3, wireType 0 =*/24).bool(message.booleanValue);
        if (message.undefinedValue != null && Object.hasOwnProperty.call(message, "undefinedValue"))
            writer.uint32(/* id 4, wireType 0 =*/32).bool(message.undefinedValue);
        if (message.nullValue != null && Object.hasOwnProperty.call(message, "nullValue"))
            writer.uint32(/* id 5, wireType 0 =*/40).bool(message.nullValue);
        if (message.crdtValue != null && Object.hasOwnProperty.call(message, "crdtValue"))
            $root.CrdtReference.encode(message.crdtValue, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
        if (message.arrayValue != null && Object.hasOwnProperty.call(message, "arrayValue"))
            $root.ArrayMessage.encode(message.arrayValue, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
        if (message.objectValue != null && Object.hasOwnProperty.call(message, "objectValue"))
            $root.ObjectMessage.encode(message.objectValue, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
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
                message.booleanValue = reader.bool();
                break;
            case 4:
                message.undefinedValue = reader.bool();
                break;
            case 5:
                message.nullValue = reader.bool();
                break;
            case 6:
                message.crdtValue = $root.CrdtReference.decode(reader, reader.uint32());
                break;
            case 7:
                message.arrayValue = $root.ArrayMessage.decode(reader, reader.uint32());
                break;
            case 8:
                message.objectValue = $root.ObjectMessage.decode(reader, reader.uint32());
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
        if (message.booleanValue != null && message.hasOwnProperty("booleanValue")) {
            if (properties.value === 1)
                return "value: multiple values";
            properties.value = 1;
            if (typeof message.booleanValue !== "boolean")
                return "booleanValue: boolean expected";
        }
        if (message.undefinedValue != null && message.hasOwnProperty("undefinedValue")) {
            if (properties.value === 1)
                return "value: multiple values";
            properties.value = 1;
            if (typeof message.undefinedValue !== "boolean")
                return "undefinedValue: boolean expected";
        }
        if (message.nullValue != null && message.hasOwnProperty("nullValue")) {
            if (properties.value === 1)
                return "value: multiple values";
            properties.value = 1;
            if (typeof message.nullValue !== "boolean")
                return "nullValue: boolean expected";
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
        if (message.arrayValue != null && message.hasOwnProperty("arrayValue")) {
            if (properties.value === 1)
                return "value: multiple values";
            properties.value = 1;
            {
                var error = $root.ArrayMessage.verify(message.arrayValue);
                if (error)
                    return "arrayValue." + error;
            }
        }
        if (message.objectValue != null && message.hasOwnProperty("objectValue")) {
            if (properties.value === 1)
                return "value: multiple values";
            properties.value = 1;
            {
                var error = $root.ObjectMessage.verify(message.objectValue);
                if (error)
                    return "objectValue." + error;
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
        if (object.booleanValue != null)
            message.booleanValue = Boolean(object.booleanValue);
        if (object.undefinedValue != null)
            message.undefinedValue = Boolean(object.undefinedValue);
        if (object.nullValue != null)
            message.nullValue = Boolean(object.nullValue);
        if (object.crdtValue != null) {
            if (typeof object.crdtValue !== "object")
                throw TypeError(".DefaultSerializerMessage.crdtValue: object expected");
            message.crdtValue = $root.CrdtReference.fromObject(object.crdtValue);
        }
        if (object.arrayValue != null) {
            if (typeof object.arrayValue !== "object")
                throw TypeError(".DefaultSerializerMessage.arrayValue: object expected");
            message.arrayValue = $root.ArrayMessage.fromObject(object.arrayValue);
        }
        if (object.objectValue != null) {
            if (typeof object.objectValue !== "object")
                throw TypeError(".DefaultSerializerMessage.objectValue: object expected");
            message.objectValue = $root.ObjectMessage.fromObject(object.objectValue);
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
        if (message.booleanValue != null && message.hasOwnProperty("booleanValue")) {
            object.booleanValue = message.booleanValue;
            if (options.oneofs)
                object.value = "booleanValue";
        }
        if (message.undefinedValue != null && message.hasOwnProperty("undefinedValue")) {
            object.undefinedValue = message.undefinedValue;
            if (options.oneofs)
                object.value = "undefinedValue";
        }
        if (message.nullValue != null && message.hasOwnProperty("nullValue")) {
            object.nullValue = message.nullValue;
            if (options.oneofs)
                object.value = "nullValue";
        }
        if (message.crdtValue != null && message.hasOwnProperty("crdtValue")) {
            object.crdtValue = $root.CrdtReference.toObject(message.crdtValue, options);
            if (options.oneofs)
                object.value = "crdtValue";
        }
        if (message.arrayValue != null && message.hasOwnProperty("arrayValue")) {
            object.arrayValue = $root.ArrayMessage.toObject(message.arrayValue, options);
            if (options.oneofs)
                object.value = "arrayValue";
        }
        if (message.objectValue != null && message.hasOwnProperty("objectValue")) {
            object.objectValue = $root.ObjectMessage.toObject(message.objectValue, options);
            if (options.oneofs)
                object.value = "objectValue";
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

$root.PairSerializerMessage = (function() {

    /**
     * Properties of a PairSerializerMessage.
     * @exports IPairSerializerMessage
     * @interface IPairSerializerMessage
     * @property {Uint8Array} one PairSerializerMessage one
     * @property {Uint8Array} two PairSerializerMessage two
     */

    /**
     * Constructs a new PairSerializerMessage.
     * @exports PairSerializerMessage
     * @classdesc Represents a PairSerializerMessage.
     * @implements IPairSerializerMessage
     * @constructor
     * @param {IPairSerializerMessage=} [properties] Properties to set
     */
    function PairSerializerMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * PairSerializerMessage one.
     * @member {Uint8Array} one
     * @memberof PairSerializerMessage
     * @instance
     */
    PairSerializerMessage.prototype.one = $util.newBuffer([]);

    /**
     * PairSerializerMessage two.
     * @member {Uint8Array} two
     * @memberof PairSerializerMessage
     * @instance
     */
    PairSerializerMessage.prototype.two = $util.newBuffer([]);

    /**
     * Creates a new PairSerializerMessage instance using the specified properties.
     * @function create
     * @memberof PairSerializerMessage
     * @static
     * @param {IPairSerializerMessage=} [properties] Properties to set
     * @returns {PairSerializerMessage} PairSerializerMessage instance
     */
    PairSerializerMessage.create = function create(properties) {
        return new PairSerializerMessage(properties);
    };

    /**
     * Encodes the specified PairSerializerMessage message. Does not implicitly {@link PairSerializerMessage.verify|verify} messages.
     * @function encode
     * @memberof PairSerializerMessage
     * @static
     * @param {IPairSerializerMessage} message PairSerializerMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PairSerializerMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.one);
        writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.two);
        return writer;
    };

    /**
     * Encodes the specified PairSerializerMessage message, length delimited. Does not implicitly {@link PairSerializerMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof PairSerializerMessage
     * @static
     * @param {IPairSerializerMessage} message PairSerializerMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PairSerializerMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a PairSerializerMessage message from the specified reader or buffer.
     * @function decode
     * @memberof PairSerializerMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {PairSerializerMessage} PairSerializerMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PairSerializerMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PairSerializerMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.one = reader.bytes();
                break;
            case 2:
                message.two = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("one"))
            throw $util.ProtocolError("missing required 'one'", { instance: message });
        if (!message.hasOwnProperty("two"))
            throw $util.ProtocolError("missing required 'two'", { instance: message });
        return message;
    };

    /**
     * Decodes a PairSerializerMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof PairSerializerMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {PairSerializerMessage} PairSerializerMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PairSerializerMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a PairSerializerMessage message.
     * @function verify
     * @memberof PairSerializerMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    PairSerializerMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!(message.one && typeof message.one.length === "number" || $util.isString(message.one)))
            return "one: buffer expected";
        if (!(message.two && typeof message.two.length === "number" || $util.isString(message.two)))
            return "two: buffer expected";
        return null;
    };

    /**
     * Creates a PairSerializerMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PairSerializerMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {PairSerializerMessage} PairSerializerMessage
     */
    PairSerializerMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.PairSerializerMessage)
            return object;
        var message = new $root.PairSerializerMessage();
        if (object.one != null)
            if (typeof object.one === "string")
                $util.base64.decode(object.one, message.one = $util.newBuffer($util.base64.length(object.one)), 0);
            else if (object.one.length)
                message.one = object.one;
        if (object.two != null)
            if (typeof object.two === "string")
                $util.base64.decode(object.two, message.two = $util.newBuffer($util.base64.length(object.two)), 0);
            else if (object.two.length)
                message.two = object.two;
        return message;
    };

    /**
     * Creates a plain object from a PairSerializerMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PairSerializerMessage
     * @static
     * @param {PairSerializerMessage} message PairSerializerMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PairSerializerMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if (options.bytes === String)
                object.one = "";
            else {
                object.one = [];
                if (options.bytes !== Array)
                    object.one = $util.newBuffer(object.one);
            }
            if (options.bytes === String)
                object.two = "";
            else {
                object.two = [];
                if (options.bytes !== Array)
                    object.two = $util.newBuffer(object.two);
            }
        }
        if (message.one != null && message.hasOwnProperty("one"))
            object.one = options.bytes === String ? $util.base64.encode(message.one, 0, message.one.length) : options.bytes === Array ? Array.prototype.slice.call(message.one) : message.one;
        if (message.two != null && message.hasOwnProperty("two"))
            object.two = options.bytes === String ? $util.base64.encode(message.two, 0, message.two.length) : options.bytes === Array ? Array.prototype.slice.call(message.two) : message.two;
        return object;
    };

    /**
     * Converts this PairSerializerMessage to JSON.
     * @function toJSON
     * @memberof PairSerializerMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PairSerializerMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return PairSerializerMessage;
})();

$root.BitSetSerialized = (function() {

    /**
     * Properties of a BitSetSerialized.
     * @exports IBitSetSerialized
     * @interface IBitSetSerialized
     * @property {Uint8Array} array BitSetSerialized array
     * @property {number} length BitSetSerialized length
     */

    /**
     * Constructs a new BitSetSerialized.
     * @exports BitSetSerialized
     * @classdesc Represents a BitSetSerialized.
     * @implements IBitSetSerialized
     * @constructor
     * @param {IBitSetSerialized=} [properties] Properties to set
     */
    function BitSetSerialized(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * BitSetSerialized array.
     * @member {Uint8Array} array
     * @memberof BitSetSerialized
     * @instance
     */
    BitSetSerialized.prototype.array = $util.newBuffer([]);

    /**
     * BitSetSerialized length.
     * @member {number} length
     * @memberof BitSetSerialized
     * @instance
     */
    BitSetSerialized.prototype.length = 0;

    /**
     * Creates a new BitSetSerialized instance using the specified properties.
     * @function create
     * @memberof BitSetSerialized
     * @static
     * @param {IBitSetSerialized=} [properties] Properties to set
     * @returns {BitSetSerialized} BitSetSerialized instance
     */
    BitSetSerialized.create = function create(properties) {
        return new BitSetSerialized(properties);
    };

    /**
     * Encodes the specified BitSetSerialized message. Does not implicitly {@link BitSetSerialized.verify|verify} messages.
     * @function encode
     * @memberof BitSetSerialized
     * @static
     * @param {IBitSetSerialized} message BitSetSerialized message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    BitSetSerialized.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.array);
        writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.length);
        return writer;
    };

    /**
     * Encodes the specified BitSetSerialized message, length delimited. Does not implicitly {@link BitSetSerialized.verify|verify} messages.
     * @function encodeDelimited
     * @memberof BitSetSerialized
     * @static
     * @param {IBitSetSerialized} message BitSetSerialized message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    BitSetSerialized.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a BitSetSerialized message from the specified reader or buffer.
     * @function decode
     * @memberof BitSetSerialized
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {BitSetSerialized} BitSetSerialized
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    BitSetSerialized.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.BitSetSerialized();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.array = reader.bytes();
                break;
            case 2:
                message.length = reader.uint32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("array"))
            throw $util.ProtocolError("missing required 'array'", { instance: message });
        if (!message.hasOwnProperty("length"))
            throw $util.ProtocolError("missing required 'length'", { instance: message });
        return message;
    };

    /**
     * Decodes a BitSetSerialized message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof BitSetSerialized
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {BitSetSerialized} BitSetSerialized
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    BitSetSerialized.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a BitSetSerialized message.
     * @function verify
     * @memberof BitSetSerialized
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    BitSetSerialized.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!(message.array && typeof message.array.length === "number" || $util.isString(message.array)))
            return "array: buffer expected";
        if (!$util.isInteger(message.length))
            return "length: integer expected";
        return null;
    };

    /**
     * Creates a BitSetSerialized message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof BitSetSerialized
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {BitSetSerialized} BitSetSerialized
     */
    BitSetSerialized.fromObject = function fromObject(object) {
        if (object instanceof $root.BitSetSerialized)
            return object;
        var message = new $root.BitSetSerialized();
        if (object.array != null)
            if (typeof object.array === "string")
                $util.base64.decode(object.array, message.array = $util.newBuffer($util.base64.length(object.array)), 0);
            else if (object.array.length)
                message.array = object.array;
        if (object.length != null)
            message.length = object.length >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a BitSetSerialized message. Also converts values to other types if specified.
     * @function toObject
     * @memberof BitSetSerialized
     * @static
     * @param {BitSetSerialized} message BitSetSerialized
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    BitSetSerialized.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if (options.bytes === String)
                object.array = "";
            else {
                object.array = [];
                if (options.bytes !== Array)
                    object.array = $util.newBuffer(object.array);
            }
            object.length = 0;
        }
        if (message.array != null && message.hasOwnProperty("array"))
            object.array = options.bytes === String ? $util.base64.encode(message.array, 0, message.array.length) : options.bytes === Array ? Array.prototype.slice.call(message.array) : message.array;
        if (message.length != null && message.hasOwnProperty("length"))
            object.length = message.length;
        return object;
    };

    /**
     * Converts this BitSetSerialized to JSON.
     * @function toJSON
     * @memberof BitSetSerialized
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    BitSetSerialized.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return BitSetSerialized;
})();

$root.DeletingMutCSetCreateMessage = (function() {

    /**
     * Properties of a DeletingMutCSetCreateMessage.
     * @exports IDeletingMutCSetCreateMessage
     * @interface IDeletingMutCSetCreateMessage
     * @property {number} replicaUniqueNumber DeletingMutCSetCreateMessage replicaUniqueNumber
     * @property {Uint8Array} args DeletingMutCSetCreateMessage args
     */

    /**
     * Constructs a new DeletingMutCSetCreateMessage.
     * @exports DeletingMutCSetCreateMessage
     * @classdesc Represents a DeletingMutCSetCreateMessage.
     * @implements IDeletingMutCSetCreateMessage
     * @constructor
     * @param {IDeletingMutCSetCreateMessage=} [properties] Properties to set
     */
    function DeletingMutCSetCreateMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * DeletingMutCSetCreateMessage replicaUniqueNumber.
     * @member {number} replicaUniqueNumber
     * @memberof DeletingMutCSetCreateMessage
     * @instance
     */
    DeletingMutCSetCreateMessage.prototype.replicaUniqueNumber = 0;

    /**
     * DeletingMutCSetCreateMessage args.
     * @member {Uint8Array} args
     * @memberof DeletingMutCSetCreateMessage
     * @instance
     */
    DeletingMutCSetCreateMessage.prototype.args = $util.newBuffer([]);

    /**
     * Creates a new DeletingMutCSetCreateMessage instance using the specified properties.
     * @function create
     * @memberof DeletingMutCSetCreateMessage
     * @static
     * @param {IDeletingMutCSetCreateMessage=} [properties] Properties to set
     * @returns {DeletingMutCSetCreateMessage} DeletingMutCSetCreateMessage instance
     */
    DeletingMutCSetCreateMessage.create = function create(properties) {
        return new DeletingMutCSetCreateMessage(properties);
    };

    /**
     * Encodes the specified DeletingMutCSetCreateMessage message. Does not implicitly {@link DeletingMutCSetCreateMessage.verify|verify} messages.
     * @function encode
     * @memberof DeletingMutCSetCreateMessage
     * @static
     * @param {IDeletingMutCSetCreateMessage} message DeletingMutCSetCreateMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DeletingMutCSetCreateMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.replicaUniqueNumber);
        writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.args);
        return writer;
    };

    /**
     * Encodes the specified DeletingMutCSetCreateMessage message, length delimited. Does not implicitly {@link DeletingMutCSetCreateMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof DeletingMutCSetCreateMessage
     * @static
     * @param {IDeletingMutCSetCreateMessage} message DeletingMutCSetCreateMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DeletingMutCSetCreateMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a DeletingMutCSetCreateMessage message from the specified reader or buffer.
     * @function decode
     * @memberof DeletingMutCSetCreateMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {DeletingMutCSetCreateMessage} DeletingMutCSetCreateMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DeletingMutCSetCreateMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.DeletingMutCSetCreateMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.replicaUniqueNumber = reader.uint32();
                break;
            case 2:
                message.args = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("replicaUniqueNumber"))
            throw $util.ProtocolError("missing required 'replicaUniqueNumber'", { instance: message });
        if (!message.hasOwnProperty("args"))
            throw $util.ProtocolError("missing required 'args'", { instance: message });
        return message;
    };

    /**
     * Decodes a DeletingMutCSetCreateMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof DeletingMutCSetCreateMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {DeletingMutCSetCreateMessage} DeletingMutCSetCreateMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DeletingMutCSetCreateMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a DeletingMutCSetCreateMessage message.
     * @function verify
     * @memberof DeletingMutCSetCreateMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    DeletingMutCSetCreateMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.replicaUniqueNumber))
            return "replicaUniqueNumber: integer expected";
        if (!(message.args && typeof message.args.length === "number" || $util.isString(message.args)))
            return "args: buffer expected";
        return null;
    };

    /**
     * Creates a DeletingMutCSetCreateMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof DeletingMutCSetCreateMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {DeletingMutCSetCreateMessage} DeletingMutCSetCreateMessage
     */
    DeletingMutCSetCreateMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.DeletingMutCSetCreateMessage)
            return object;
        var message = new $root.DeletingMutCSetCreateMessage();
        if (object.replicaUniqueNumber != null)
            message.replicaUniqueNumber = object.replicaUniqueNumber >>> 0;
        if (object.args != null)
            if (typeof object.args === "string")
                $util.base64.decode(object.args, message.args = $util.newBuffer($util.base64.length(object.args)), 0);
            else if (object.args.length)
                message.args = object.args;
        return message;
    };

    /**
     * Creates a plain object from a DeletingMutCSetCreateMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof DeletingMutCSetCreateMessage
     * @static
     * @param {DeletingMutCSetCreateMessage} message DeletingMutCSetCreateMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    DeletingMutCSetCreateMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.replicaUniqueNumber = 0;
            if (options.bytes === String)
                object.args = "";
            else {
                object.args = [];
                if (options.bytes !== Array)
                    object.args = $util.newBuffer(object.args);
            }
        }
        if (message.replicaUniqueNumber != null && message.hasOwnProperty("replicaUniqueNumber"))
            object.replicaUniqueNumber = message.replicaUniqueNumber;
        if (message.args != null && message.hasOwnProperty("args"))
            object.args = options.bytes === String ? $util.base64.encode(message.args, 0, message.args.length) : options.bytes === Array ? Array.prototype.slice.call(message.args) : message.args;
        return object;
    };

    /**
     * Converts this DeletingMutCSetCreateMessage to JSON.
     * @function toJSON
     * @memberof DeletingMutCSetCreateMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    DeletingMutCSetCreateMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return DeletingMutCSetCreateMessage;
})();

$root.DeletingMutCSetMessage = (function() {

    /**
     * Properties of a DeletingMutCSetMessage.
     * @exports IDeletingMutCSetMessage
     * @interface IDeletingMutCSetMessage
     * @property {IDeletingMutCSetCreateMessage|null} [add] DeletingMutCSetMessage add
     * @property {string|null} ["delete"] DeletingMutCSetMessage delete
     */

    /**
     * Constructs a new DeletingMutCSetMessage.
     * @exports DeletingMutCSetMessage
     * @classdesc Represents a DeletingMutCSetMessage.
     * @implements IDeletingMutCSetMessage
     * @constructor
     * @param {IDeletingMutCSetMessage=} [properties] Properties to set
     */
    function DeletingMutCSetMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * DeletingMutCSetMessage add.
     * @member {IDeletingMutCSetCreateMessage|null|undefined} add
     * @memberof DeletingMutCSetMessage
     * @instance
     */
    DeletingMutCSetMessage.prototype.add = null;

    /**
     * DeletingMutCSetMessage delete.
     * @member {string} delete
     * @memberof DeletingMutCSetMessage
     * @instance
     */
    DeletingMutCSetMessage.prototype["delete"] = "";

    // OneOf field names bound to virtual getters and setters
    var $oneOfFields;

    /**
     * DeletingMutCSetMessage op.
     * @member {"add"|"delete"|undefined} op
     * @memberof DeletingMutCSetMessage
     * @instance
     */
    Object.defineProperty(DeletingMutCSetMessage.prototype, "op", {
        get: $util.oneOfGetter($oneOfFields = ["add", "delete"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new DeletingMutCSetMessage instance using the specified properties.
     * @function create
     * @memberof DeletingMutCSetMessage
     * @static
     * @param {IDeletingMutCSetMessage=} [properties] Properties to set
     * @returns {DeletingMutCSetMessage} DeletingMutCSetMessage instance
     */
    DeletingMutCSetMessage.create = function create(properties) {
        return new DeletingMutCSetMessage(properties);
    };

    /**
     * Encodes the specified DeletingMutCSetMessage message. Does not implicitly {@link DeletingMutCSetMessage.verify|verify} messages.
     * @function encode
     * @memberof DeletingMutCSetMessage
     * @static
     * @param {IDeletingMutCSetMessage} message DeletingMutCSetMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DeletingMutCSetMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.add != null && Object.hasOwnProperty.call(message, "add"))
            $root.DeletingMutCSetCreateMessage.encode(message.add, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message["delete"] != null && Object.hasOwnProperty.call(message, "delete"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message["delete"]);
        return writer;
    };

    /**
     * Encodes the specified DeletingMutCSetMessage message, length delimited. Does not implicitly {@link DeletingMutCSetMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof DeletingMutCSetMessage
     * @static
     * @param {IDeletingMutCSetMessage} message DeletingMutCSetMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DeletingMutCSetMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a DeletingMutCSetMessage message from the specified reader or buffer.
     * @function decode
     * @memberof DeletingMutCSetMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {DeletingMutCSetMessage} DeletingMutCSetMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DeletingMutCSetMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.DeletingMutCSetMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.add = $root.DeletingMutCSetCreateMessage.decode(reader, reader.uint32());
                break;
            case 2:
                message["delete"] = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a DeletingMutCSetMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof DeletingMutCSetMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {DeletingMutCSetMessage} DeletingMutCSetMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DeletingMutCSetMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a DeletingMutCSetMessage message.
     * @function verify
     * @memberof DeletingMutCSetMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    DeletingMutCSetMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        var properties = {};
        if (message.add != null && message.hasOwnProperty("add")) {
            properties.op = 1;
            {
                var error = $root.DeletingMutCSetCreateMessage.verify(message.add);
                if (error)
                    return "add." + error;
            }
        }
        if (message["delete"] != null && message.hasOwnProperty("delete")) {
            if (properties.op === 1)
                return "op: multiple values";
            properties.op = 1;
            if (!$util.isString(message["delete"]))
                return "delete: string expected";
        }
        return null;
    };

    /**
     * Creates a DeletingMutCSetMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof DeletingMutCSetMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {DeletingMutCSetMessage} DeletingMutCSetMessage
     */
    DeletingMutCSetMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.DeletingMutCSetMessage)
            return object;
        var message = new $root.DeletingMutCSetMessage();
        if (object.add != null) {
            if (typeof object.add !== "object")
                throw TypeError(".DeletingMutCSetMessage.add: object expected");
            message.add = $root.DeletingMutCSetCreateMessage.fromObject(object.add);
        }
        if (object["delete"] != null)
            message["delete"] = String(object["delete"]);
        return message;
    };

    /**
     * Creates a plain object from a DeletingMutCSetMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof DeletingMutCSetMessage
     * @static
     * @param {DeletingMutCSetMessage} message DeletingMutCSetMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    DeletingMutCSetMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (message.add != null && message.hasOwnProperty("add")) {
            object.add = $root.DeletingMutCSetCreateMessage.toObject(message.add, options);
            if (options.oneofs)
                object.op = "add";
        }
        if (message["delete"] != null && message.hasOwnProperty("delete")) {
            object["delete"] = message["delete"];
            if (options.oneofs)
                object.op = "delete";
        }
        return object;
    };

    /**
     * Converts this DeletingMutCSetMessage to JSON.
     * @function toJSON
     * @memberof DeletingMutCSetMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    DeletingMutCSetMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return DeletingMutCSetMessage;
})();

$root.DeletingMutCSetArgs = (function() {

    /**
     * Properties of a DeletingMutCSetArgs.
     * @exports IDeletingMutCSetArgs
     * @interface IDeletingMutCSetArgs
     * @property {Uint8Array} name DeletingMutCSetArgs name
     * @property {Uint8Array} args DeletingMutCSetArgs args
     */

    /**
     * Constructs a new DeletingMutCSetArgs.
     * @exports DeletingMutCSetArgs
     * @classdesc Represents a DeletingMutCSetArgs.
     * @implements IDeletingMutCSetArgs
     * @constructor
     * @param {IDeletingMutCSetArgs=} [properties] Properties to set
     */
    function DeletingMutCSetArgs(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * DeletingMutCSetArgs name.
     * @member {Uint8Array} name
     * @memberof DeletingMutCSetArgs
     * @instance
     */
    DeletingMutCSetArgs.prototype.name = $util.newBuffer([]);

    /**
     * DeletingMutCSetArgs args.
     * @member {Uint8Array} args
     * @memberof DeletingMutCSetArgs
     * @instance
     */
    DeletingMutCSetArgs.prototype.args = $util.newBuffer([]);

    /**
     * Creates a new DeletingMutCSetArgs instance using the specified properties.
     * @function create
     * @memberof DeletingMutCSetArgs
     * @static
     * @param {IDeletingMutCSetArgs=} [properties] Properties to set
     * @returns {DeletingMutCSetArgs} DeletingMutCSetArgs instance
     */
    DeletingMutCSetArgs.create = function create(properties) {
        return new DeletingMutCSetArgs(properties);
    };

    /**
     * Encodes the specified DeletingMutCSetArgs message. Does not implicitly {@link DeletingMutCSetArgs.verify|verify} messages.
     * @function encode
     * @memberof DeletingMutCSetArgs
     * @static
     * @param {IDeletingMutCSetArgs} message DeletingMutCSetArgs message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DeletingMutCSetArgs.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.name);
        writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.args);
        return writer;
    };

    /**
     * Encodes the specified DeletingMutCSetArgs message, length delimited. Does not implicitly {@link DeletingMutCSetArgs.verify|verify} messages.
     * @function encodeDelimited
     * @memberof DeletingMutCSetArgs
     * @static
     * @param {IDeletingMutCSetArgs} message DeletingMutCSetArgs message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DeletingMutCSetArgs.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a DeletingMutCSetArgs message from the specified reader or buffer.
     * @function decode
     * @memberof DeletingMutCSetArgs
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {DeletingMutCSetArgs} DeletingMutCSetArgs
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DeletingMutCSetArgs.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.DeletingMutCSetArgs();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.name = reader.bytes();
                break;
            case 2:
                message.args = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("name"))
            throw $util.ProtocolError("missing required 'name'", { instance: message });
        if (!message.hasOwnProperty("args"))
            throw $util.ProtocolError("missing required 'args'", { instance: message });
        return message;
    };

    /**
     * Decodes a DeletingMutCSetArgs message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof DeletingMutCSetArgs
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {DeletingMutCSetArgs} DeletingMutCSetArgs
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DeletingMutCSetArgs.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a DeletingMutCSetArgs message.
     * @function verify
     * @memberof DeletingMutCSetArgs
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    DeletingMutCSetArgs.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!(message.name && typeof message.name.length === "number" || $util.isString(message.name)))
            return "name: buffer expected";
        if (!(message.args && typeof message.args.length === "number" || $util.isString(message.args)))
            return "args: buffer expected";
        return null;
    };

    /**
     * Creates a DeletingMutCSetArgs message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof DeletingMutCSetArgs
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {DeletingMutCSetArgs} DeletingMutCSetArgs
     */
    DeletingMutCSetArgs.fromObject = function fromObject(object) {
        if (object instanceof $root.DeletingMutCSetArgs)
            return object;
        var message = new $root.DeletingMutCSetArgs();
        if (object.name != null)
            if (typeof object.name === "string")
                $util.base64.decode(object.name, message.name = $util.newBuffer($util.base64.length(object.name)), 0);
            else if (object.name.length)
                message.name = object.name;
        if (object.args != null)
            if (typeof object.args === "string")
                $util.base64.decode(object.args, message.args = $util.newBuffer($util.base64.length(object.args)), 0);
            else if (object.args.length)
                message.args = object.args;
        return message;
    };

    /**
     * Creates a plain object from a DeletingMutCSetArgs message. Also converts values to other types if specified.
     * @function toObject
     * @memberof DeletingMutCSetArgs
     * @static
     * @param {DeletingMutCSetArgs} message DeletingMutCSetArgs
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    DeletingMutCSetArgs.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if (options.bytes === String)
                object.name = "";
            else {
                object.name = [];
                if (options.bytes !== Array)
                    object.name = $util.newBuffer(object.name);
            }
            if (options.bytes === String)
                object.args = "";
            else {
                object.args = [];
                if (options.bytes !== Array)
                    object.args = $util.newBuffer(object.args);
            }
        }
        if (message.name != null && message.hasOwnProperty("name"))
            object.name = options.bytes === String ? $util.base64.encode(message.name, 0, message.name.length) : options.bytes === Array ? Array.prototype.slice.call(message.name) : message.name;
        if (message.args != null && message.hasOwnProperty("args"))
            object.args = options.bytes === String ? $util.base64.encode(message.args, 0, message.args.length) : options.bytes === Array ? Array.prototype.slice.call(message.args) : message.args;
        return object;
    };

    /**
     * Converts this DeletingMutCSetArgs to JSON.
     * @function toJSON
     * @memberof DeletingMutCSetArgs
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    DeletingMutCSetArgs.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return DeletingMutCSetArgs;
})();

$root.DeletingMutCSetSave = (function() {

    /**
     * Properties of a DeletingMutCSetSave.
     * @exports IDeletingMutCSetSave
     * @interface IDeletingMutCSetSave
     * @property {Array.<IDeletingMutCSetArgs>|null} [constructorArgs] DeletingMutCSetSave constructorArgs
     */

    /**
     * Constructs a new DeletingMutCSetSave.
     * @exports DeletingMutCSetSave
     * @classdesc Represents a DeletingMutCSetSave.
     * @implements IDeletingMutCSetSave
     * @constructor
     * @param {IDeletingMutCSetSave=} [properties] Properties to set
     */
    function DeletingMutCSetSave(properties) {
        this.constructorArgs = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * DeletingMutCSetSave constructorArgs.
     * @member {Array.<IDeletingMutCSetArgs>} constructorArgs
     * @memberof DeletingMutCSetSave
     * @instance
     */
    DeletingMutCSetSave.prototype.constructorArgs = $util.emptyArray;

    /**
     * Creates a new DeletingMutCSetSave instance using the specified properties.
     * @function create
     * @memberof DeletingMutCSetSave
     * @static
     * @param {IDeletingMutCSetSave=} [properties] Properties to set
     * @returns {DeletingMutCSetSave} DeletingMutCSetSave instance
     */
    DeletingMutCSetSave.create = function create(properties) {
        return new DeletingMutCSetSave(properties);
    };

    /**
     * Encodes the specified DeletingMutCSetSave message. Does not implicitly {@link DeletingMutCSetSave.verify|verify} messages.
     * @function encode
     * @memberof DeletingMutCSetSave
     * @static
     * @param {IDeletingMutCSetSave} message DeletingMutCSetSave message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DeletingMutCSetSave.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.constructorArgs != null && message.constructorArgs.length)
            for (var i = 0; i < message.constructorArgs.length; ++i)
                $root.DeletingMutCSetArgs.encode(message.constructorArgs[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified DeletingMutCSetSave message, length delimited. Does not implicitly {@link DeletingMutCSetSave.verify|verify} messages.
     * @function encodeDelimited
     * @memberof DeletingMutCSetSave
     * @static
     * @param {IDeletingMutCSetSave} message DeletingMutCSetSave message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DeletingMutCSetSave.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a DeletingMutCSetSave message from the specified reader or buffer.
     * @function decode
     * @memberof DeletingMutCSetSave
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {DeletingMutCSetSave} DeletingMutCSetSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DeletingMutCSetSave.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.DeletingMutCSetSave();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.constructorArgs && message.constructorArgs.length))
                    message.constructorArgs = [];
                message.constructorArgs.push($root.DeletingMutCSetArgs.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a DeletingMutCSetSave message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof DeletingMutCSetSave
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {DeletingMutCSetSave} DeletingMutCSetSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DeletingMutCSetSave.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a DeletingMutCSetSave message.
     * @function verify
     * @memberof DeletingMutCSetSave
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    DeletingMutCSetSave.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.constructorArgs != null && message.hasOwnProperty("constructorArgs")) {
            if (!Array.isArray(message.constructorArgs))
                return "constructorArgs: array expected";
            for (var i = 0; i < message.constructorArgs.length; ++i) {
                var error = $root.DeletingMutCSetArgs.verify(message.constructorArgs[i]);
                if (error)
                    return "constructorArgs." + error;
            }
        }
        return null;
    };

    /**
     * Creates a DeletingMutCSetSave message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof DeletingMutCSetSave
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {DeletingMutCSetSave} DeletingMutCSetSave
     */
    DeletingMutCSetSave.fromObject = function fromObject(object) {
        if (object instanceof $root.DeletingMutCSetSave)
            return object;
        var message = new $root.DeletingMutCSetSave();
        if (object.constructorArgs) {
            if (!Array.isArray(object.constructorArgs))
                throw TypeError(".DeletingMutCSetSave.constructorArgs: array expected");
            message.constructorArgs = [];
            for (var i = 0; i < object.constructorArgs.length; ++i) {
                if (typeof object.constructorArgs[i] !== "object")
                    throw TypeError(".DeletingMutCSetSave.constructorArgs: object expected");
                message.constructorArgs[i] = $root.DeletingMutCSetArgs.fromObject(object.constructorArgs[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a DeletingMutCSetSave message. Also converts values to other types if specified.
     * @function toObject
     * @memberof DeletingMutCSetSave
     * @static
     * @param {DeletingMutCSetSave} message DeletingMutCSetSave
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    DeletingMutCSetSave.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.constructorArgs = [];
        if (message.constructorArgs && message.constructorArgs.length) {
            object.constructorArgs = [];
            for (var j = 0; j < message.constructorArgs.length; ++j)
                object.constructorArgs[j] = $root.DeletingMutCSetArgs.toObject(message.constructorArgs[j], options);
        }
        return object;
    };

    /**
     * Converts this DeletingMutCSetSave to JSON.
     * @function toJSON
     * @memberof DeletingMutCSetSave
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    DeletingMutCSetSave.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return DeletingMutCSetSave;
})();

$root.MutCSetFromMapKeyMessage = (function() {

    /**
     * Properties of a MutCSetFromMapKeyMessage.
     * @exports IMutCSetFromMapKeyMessage
     * @interface IMutCSetFromMapKeyMessage
     * @property {string} sender MutCSetFromMapKeyMessage sender
     * @property {number} uniqueNumber MutCSetFromMapKeyMessage uniqueNumber
     * @property {Uint8Array|null} [args] MutCSetFromMapKeyMessage args
     */

    /**
     * Constructs a new MutCSetFromMapKeyMessage.
     * @exports MutCSetFromMapKeyMessage
     * @classdesc Represents a MutCSetFromMapKeyMessage.
     * @implements IMutCSetFromMapKeyMessage
     * @constructor
     * @param {IMutCSetFromMapKeyMessage=} [properties] Properties to set
     */
    function MutCSetFromMapKeyMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MutCSetFromMapKeyMessage sender.
     * @member {string} sender
     * @memberof MutCSetFromMapKeyMessage
     * @instance
     */
    MutCSetFromMapKeyMessage.prototype.sender = "";

    /**
     * MutCSetFromMapKeyMessage uniqueNumber.
     * @member {number} uniqueNumber
     * @memberof MutCSetFromMapKeyMessage
     * @instance
     */
    MutCSetFromMapKeyMessage.prototype.uniqueNumber = 0;

    /**
     * MutCSetFromMapKeyMessage args.
     * @member {Uint8Array} args
     * @memberof MutCSetFromMapKeyMessage
     * @instance
     */
    MutCSetFromMapKeyMessage.prototype.args = $util.newBuffer([]);

    /**
     * Creates a new MutCSetFromMapKeyMessage instance using the specified properties.
     * @function create
     * @memberof MutCSetFromMapKeyMessage
     * @static
     * @param {IMutCSetFromMapKeyMessage=} [properties] Properties to set
     * @returns {MutCSetFromMapKeyMessage} MutCSetFromMapKeyMessage instance
     */
    MutCSetFromMapKeyMessage.create = function create(properties) {
        return new MutCSetFromMapKeyMessage(properties);
    };

    /**
     * Encodes the specified MutCSetFromMapKeyMessage message. Does not implicitly {@link MutCSetFromMapKeyMessage.verify|verify} messages.
     * @function encode
     * @memberof MutCSetFromMapKeyMessage
     * @static
     * @param {IMutCSetFromMapKeyMessage} message MutCSetFromMapKeyMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MutCSetFromMapKeyMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 2 =*/10).string(message.sender);
        writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.uniqueNumber);
        if (message.args != null && Object.hasOwnProperty.call(message, "args"))
            writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.args);
        return writer;
    };

    /**
     * Encodes the specified MutCSetFromMapKeyMessage message, length delimited. Does not implicitly {@link MutCSetFromMapKeyMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MutCSetFromMapKeyMessage
     * @static
     * @param {IMutCSetFromMapKeyMessage} message MutCSetFromMapKeyMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MutCSetFromMapKeyMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MutCSetFromMapKeyMessage message from the specified reader or buffer.
     * @function decode
     * @memberof MutCSetFromMapKeyMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MutCSetFromMapKeyMessage} MutCSetFromMapKeyMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MutCSetFromMapKeyMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MutCSetFromMapKeyMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.sender = reader.string();
                break;
            case 2:
                message.uniqueNumber = reader.uint32();
                break;
            case 3:
                message.args = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("sender"))
            throw $util.ProtocolError("missing required 'sender'", { instance: message });
        if (!message.hasOwnProperty("uniqueNumber"))
            throw $util.ProtocolError("missing required 'uniqueNumber'", { instance: message });
        return message;
    };

    /**
     * Decodes a MutCSetFromMapKeyMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MutCSetFromMapKeyMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MutCSetFromMapKeyMessage} MutCSetFromMapKeyMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MutCSetFromMapKeyMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MutCSetFromMapKeyMessage message.
     * @function verify
     * @memberof MutCSetFromMapKeyMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MutCSetFromMapKeyMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isString(message.sender))
            return "sender: string expected";
        if (!$util.isInteger(message.uniqueNumber))
            return "uniqueNumber: integer expected";
        if (message.args != null && message.hasOwnProperty("args"))
            if (!(message.args && typeof message.args.length === "number" || $util.isString(message.args)))
                return "args: buffer expected";
        return null;
    };

    /**
     * Creates a MutCSetFromMapKeyMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MutCSetFromMapKeyMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MutCSetFromMapKeyMessage} MutCSetFromMapKeyMessage
     */
    MutCSetFromMapKeyMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.MutCSetFromMapKeyMessage)
            return object;
        var message = new $root.MutCSetFromMapKeyMessage();
        if (object.sender != null)
            message.sender = String(object.sender);
        if (object.uniqueNumber != null)
            message.uniqueNumber = object.uniqueNumber >>> 0;
        if (object.args != null)
            if (typeof object.args === "string")
                $util.base64.decode(object.args, message.args = $util.newBuffer($util.base64.length(object.args)), 0);
            else if (object.args.length)
                message.args = object.args;
        return message;
    };

    /**
     * Creates a plain object from a MutCSetFromMapKeyMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MutCSetFromMapKeyMessage
     * @static
     * @param {MutCSetFromMapKeyMessage} message MutCSetFromMapKeyMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MutCSetFromMapKeyMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.sender = "";
            object.uniqueNumber = 0;
            if (options.bytes === String)
                object.args = "";
            else {
                object.args = [];
                if (options.bytes !== Array)
                    object.args = $util.newBuffer(object.args);
            }
        }
        if (message.sender != null && message.hasOwnProperty("sender"))
            object.sender = message.sender;
        if (message.uniqueNumber != null && message.hasOwnProperty("uniqueNumber"))
            object.uniqueNumber = message.uniqueNumber;
        if (message.args != null && message.hasOwnProperty("args"))
            object.args = options.bytes === String ? $util.base64.encode(message.args, 0, message.args.length) : options.bytes === Array ? Array.prototype.slice.call(message.args) : message.args;
        return object;
    };

    /**
     * Converts this MutCSetFromMapKeyMessage to JSON.
     * @function toJSON
     * @memberof MutCSetFromMapKeyMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MutCSetFromMapKeyMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MutCSetFromMapKeyMessage;
})();

$root.WinsCBooleanSave = (function() {

    /**
     * Properties of a WinsCBooleanSave.
     * @exports IWinsCBooleanSave
     * @interface IWinsCBooleanSave
     * @property {Array.<string>|null} [senders] WinsCBooleanSave senders
     * @property {Array.<number>|null} [senderCounters] WinsCBooleanSave senderCounters
     */

    /**
     * Constructs a new WinsCBooleanSave.
     * @exports WinsCBooleanSave
     * @classdesc Represents a WinsCBooleanSave.
     * @implements IWinsCBooleanSave
     * @constructor
     * @param {IWinsCBooleanSave=} [properties] Properties to set
     */
    function WinsCBooleanSave(properties) {
        this.senders = [];
        this.senderCounters = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * WinsCBooleanSave senders.
     * @member {Array.<string>} senders
     * @memberof WinsCBooleanSave
     * @instance
     */
    WinsCBooleanSave.prototype.senders = $util.emptyArray;

    /**
     * WinsCBooleanSave senderCounters.
     * @member {Array.<number>} senderCounters
     * @memberof WinsCBooleanSave
     * @instance
     */
    WinsCBooleanSave.prototype.senderCounters = $util.emptyArray;

    /**
     * Creates a new WinsCBooleanSave instance using the specified properties.
     * @function create
     * @memberof WinsCBooleanSave
     * @static
     * @param {IWinsCBooleanSave=} [properties] Properties to set
     * @returns {WinsCBooleanSave} WinsCBooleanSave instance
     */
    WinsCBooleanSave.create = function create(properties) {
        return new WinsCBooleanSave(properties);
    };

    /**
     * Encodes the specified WinsCBooleanSave message. Does not implicitly {@link WinsCBooleanSave.verify|verify} messages.
     * @function encode
     * @memberof WinsCBooleanSave
     * @static
     * @param {IWinsCBooleanSave} message WinsCBooleanSave message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    WinsCBooleanSave.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.senders != null && message.senders.length)
            for (var i = 0; i < message.senders.length; ++i)
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.senders[i]);
        if (message.senderCounters != null && message.senderCounters.length) {
            writer.uint32(/* id 2, wireType 2 =*/18).fork();
            for (var i = 0; i < message.senderCounters.length; ++i)
                writer.uint32(message.senderCounters[i]);
            writer.ldelim();
        }
        return writer;
    };

    /**
     * Encodes the specified WinsCBooleanSave message, length delimited. Does not implicitly {@link WinsCBooleanSave.verify|verify} messages.
     * @function encodeDelimited
     * @memberof WinsCBooleanSave
     * @static
     * @param {IWinsCBooleanSave} message WinsCBooleanSave message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    WinsCBooleanSave.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a WinsCBooleanSave message from the specified reader or buffer.
     * @function decode
     * @memberof WinsCBooleanSave
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {WinsCBooleanSave} WinsCBooleanSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    WinsCBooleanSave.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.WinsCBooleanSave();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.senders && message.senders.length))
                    message.senders = [];
                message.senders.push(reader.string());
                break;
            case 2:
                if (!(message.senderCounters && message.senderCounters.length))
                    message.senderCounters = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.senderCounters.push(reader.uint32());
                } else
                    message.senderCounters.push(reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a WinsCBooleanSave message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof WinsCBooleanSave
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {WinsCBooleanSave} WinsCBooleanSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    WinsCBooleanSave.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a WinsCBooleanSave message.
     * @function verify
     * @memberof WinsCBooleanSave
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    WinsCBooleanSave.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.senders != null && message.hasOwnProperty("senders")) {
            if (!Array.isArray(message.senders))
                return "senders: array expected";
            for (var i = 0; i < message.senders.length; ++i)
                if (!$util.isString(message.senders[i]))
                    return "senders: string[] expected";
        }
        if (message.senderCounters != null && message.hasOwnProperty("senderCounters")) {
            if (!Array.isArray(message.senderCounters))
                return "senderCounters: array expected";
            for (var i = 0; i < message.senderCounters.length; ++i)
                if (!$util.isInteger(message.senderCounters[i]))
                    return "senderCounters: integer[] expected";
        }
        return null;
    };

    /**
     * Creates a WinsCBooleanSave message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof WinsCBooleanSave
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {WinsCBooleanSave} WinsCBooleanSave
     */
    WinsCBooleanSave.fromObject = function fromObject(object) {
        if (object instanceof $root.WinsCBooleanSave)
            return object;
        var message = new $root.WinsCBooleanSave();
        if (object.senders) {
            if (!Array.isArray(object.senders))
                throw TypeError(".WinsCBooleanSave.senders: array expected");
            message.senders = [];
            for (var i = 0; i < object.senders.length; ++i)
                message.senders[i] = String(object.senders[i]);
        }
        if (object.senderCounters) {
            if (!Array.isArray(object.senderCounters))
                throw TypeError(".WinsCBooleanSave.senderCounters: array expected");
            message.senderCounters = [];
            for (var i = 0; i < object.senderCounters.length; ++i)
                message.senderCounters[i] = object.senderCounters[i] >>> 0;
        }
        return message;
    };

    /**
     * Creates a plain object from a WinsCBooleanSave message. Also converts values to other types if specified.
     * @function toObject
     * @memberof WinsCBooleanSave
     * @static
     * @param {WinsCBooleanSave} message WinsCBooleanSave
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    WinsCBooleanSave.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults) {
            object.senders = [];
            object.senderCounters = [];
        }
        if (message.senders && message.senders.length) {
            object.senders = [];
            for (var j = 0; j < message.senders.length; ++j)
                object.senders[j] = message.senders[j];
        }
        if (message.senderCounters && message.senderCounters.length) {
            object.senderCounters = [];
            for (var j = 0; j < message.senderCounters.length; ++j)
                object.senderCounters[j] = message.senderCounters[j];
        }
        return object;
    };

    /**
     * Converts this WinsCBooleanSave to JSON.
     * @function toJSON
     * @memberof WinsCBooleanSave
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    WinsCBooleanSave.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return WinsCBooleanSave;
})();

$root.RuntimeMessage = (function() {

    /**
     * Properties of a RuntimeMessage.
     * @exports IRuntimeMessage
     * @interface IRuntimeMessage
     * @property {Array.<number>|null} [pointerParents] RuntimeMessage pointerParents
     * @property {Array.<Uint8Array>|null} [pointerNames] RuntimeMessage pointerNames
     * @property {Array.<number>|null} [messageSenders] RuntimeMessage messageSenders
     * @property {Array.<Uint8Array>|null} [innerMessages] RuntimeMessage innerMessages
     */

    /**
     * Constructs a new RuntimeMessage.
     * @exports RuntimeMessage
     * @classdesc Represents a RuntimeMessage.
     * @implements IRuntimeMessage
     * @constructor
     * @param {IRuntimeMessage=} [properties] Properties to set
     */
    function RuntimeMessage(properties) {
        this.pointerParents = [];
        this.pointerNames = [];
        this.messageSenders = [];
        this.innerMessages = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * RuntimeMessage pointerParents.
     * @member {Array.<number>} pointerParents
     * @memberof RuntimeMessage
     * @instance
     */
    RuntimeMessage.prototype.pointerParents = $util.emptyArray;

    /**
     * RuntimeMessage pointerNames.
     * @member {Array.<Uint8Array>} pointerNames
     * @memberof RuntimeMessage
     * @instance
     */
    RuntimeMessage.prototype.pointerNames = $util.emptyArray;

    /**
     * RuntimeMessage messageSenders.
     * @member {Array.<number>} messageSenders
     * @memberof RuntimeMessage
     * @instance
     */
    RuntimeMessage.prototype.messageSenders = $util.emptyArray;

    /**
     * RuntimeMessage innerMessages.
     * @member {Array.<Uint8Array>} innerMessages
     * @memberof RuntimeMessage
     * @instance
     */
    RuntimeMessage.prototype.innerMessages = $util.emptyArray;

    /**
     * Creates a new RuntimeMessage instance using the specified properties.
     * @function create
     * @memberof RuntimeMessage
     * @static
     * @param {IRuntimeMessage=} [properties] Properties to set
     * @returns {RuntimeMessage} RuntimeMessage instance
     */
    RuntimeMessage.create = function create(properties) {
        return new RuntimeMessage(properties);
    };

    /**
     * Encodes the specified RuntimeMessage message. Does not implicitly {@link RuntimeMessage.verify|verify} messages.
     * @function encode
     * @memberof RuntimeMessage
     * @static
     * @param {IRuntimeMessage} message RuntimeMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RuntimeMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.pointerParents != null && message.pointerParents.length) {
            writer.uint32(/* id 1, wireType 2 =*/10).fork();
            for (var i = 0; i < message.pointerParents.length; ++i)
                writer.uint32(message.pointerParents[i]);
            writer.ldelim();
        }
        if (message.pointerNames != null && message.pointerNames.length)
            for (var i = 0; i < message.pointerNames.length; ++i)
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.pointerNames[i]);
        if (message.messageSenders != null && message.messageSenders.length) {
            writer.uint32(/* id 3, wireType 2 =*/26).fork();
            for (var i = 0; i < message.messageSenders.length; ++i)
                writer.uint32(message.messageSenders[i]);
            writer.ldelim();
        }
        if (message.innerMessages != null && message.innerMessages.length)
            for (var i = 0; i < message.innerMessages.length; ++i)
                writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.innerMessages[i]);
        return writer;
    };

    /**
     * Encodes the specified RuntimeMessage message, length delimited. Does not implicitly {@link RuntimeMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RuntimeMessage
     * @static
     * @param {IRuntimeMessage} message RuntimeMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RuntimeMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RuntimeMessage message from the specified reader or buffer.
     * @function decode
     * @memberof RuntimeMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RuntimeMessage} RuntimeMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RuntimeMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.RuntimeMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.pointerParents && message.pointerParents.length))
                    message.pointerParents = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.pointerParents.push(reader.uint32());
                } else
                    message.pointerParents.push(reader.uint32());
                break;
            case 2:
                if (!(message.pointerNames && message.pointerNames.length))
                    message.pointerNames = [];
                message.pointerNames.push(reader.bytes());
                break;
            case 3:
                if (!(message.messageSenders && message.messageSenders.length))
                    message.messageSenders = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.messageSenders.push(reader.uint32());
                } else
                    message.messageSenders.push(reader.uint32());
                break;
            case 4:
                if (!(message.innerMessages && message.innerMessages.length))
                    message.innerMessages = [];
                message.innerMessages.push(reader.bytes());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a RuntimeMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RuntimeMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RuntimeMessage} RuntimeMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RuntimeMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a RuntimeMessage message.
     * @function verify
     * @memberof RuntimeMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RuntimeMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.pointerParents != null && message.hasOwnProperty("pointerParents")) {
            if (!Array.isArray(message.pointerParents))
                return "pointerParents: array expected";
            for (var i = 0; i < message.pointerParents.length; ++i)
                if (!$util.isInteger(message.pointerParents[i]))
                    return "pointerParents: integer[] expected";
        }
        if (message.pointerNames != null && message.hasOwnProperty("pointerNames")) {
            if (!Array.isArray(message.pointerNames))
                return "pointerNames: array expected";
            for (var i = 0; i < message.pointerNames.length; ++i)
                if (!(message.pointerNames[i] && typeof message.pointerNames[i].length === "number" || $util.isString(message.pointerNames[i])))
                    return "pointerNames: buffer[] expected";
        }
        if (message.messageSenders != null && message.hasOwnProperty("messageSenders")) {
            if (!Array.isArray(message.messageSenders))
                return "messageSenders: array expected";
            for (var i = 0; i < message.messageSenders.length; ++i)
                if (!$util.isInteger(message.messageSenders[i]))
                    return "messageSenders: integer[] expected";
        }
        if (message.innerMessages != null && message.hasOwnProperty("innerMessages")) {
            if (!Array.isArray(message.innerMessages))
                return "innerMessages: array expected";
            for (var i = 0; i < message.innerMessages.length; ++i)
                if (!(message.innerMessages[i] && typeof message.innerMessages[i].length === "number" || $util.isString(message.innerMessages[i])))
                    return "innerMessages: buffer[] expected";
        }
        return null;
    };

    /**
     * Creates a RuntimeMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof RuntimeMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {RuntimeMessage} RuntimeMessage
     */
    RuntimeMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.RuntimeMessage)
            return object;
        var message = new $root.RuntimeMessage();
        if (object.pointerParents) {
            if (!Array.isArray(object.pointerParents))
                throw TypeError(".RuntimeMessage.pointerParents: array expected");
            message.pointerParents = [];
            for (var i = 0; i < object.pointerParents.length; ++i)
                message.pointerParents[i] = object.pointerParents[i] >>> 0;
        }
        if (object.pointerNames) {
            if (!Array.isArray(object.pointerNames))
                throw TypeError(".RuntimeMessage.pointerNames: array expected");
            message.pointerNames = [];
            for (var i = 0; i < object.pointerNames.length; ++i)
                if (typeof object.pointerNames[i] === "string")
                    $util.base64.decode(object.pointerNames[i], message.pointerNames[i] = $util.newBuffer($util.base64.length(object.pointerNames[i])), 0);
                else if (object.pointerNames[i].length)
                    message.pointerNames[i] = object.pointerNames[i];
        }
        if (object.messageSenders) {
            if (!Array.isArray(object.messageSenders))
                throw TypeError(".RuntimeMessage.messageSenders: array expected");
            message.messageSenders = [];
            for (var i = 0; i < object.messageSenders.length; ++i)
                message.messageSenders[i] = object.messageSenders[i] >>> 0;
        }
        if (object.innerMessages) {
            if (!Array.isArray(object.innerMessages))
                throw TypeError(".RuntimeMessage.innerMessages: array expected");
            message.innerMessages = [];
            for (var i = 0; i < object.innerMessages.length; ++i)
                if (typeof object.innerMessages[i] === "string")
                    $util.base64.decode(object.innerMessages[i], message.innerMessages[i] = $util.newBuffer($util.base64.length(object.innerMessages[i])), 0);
                else if (object.innerMessages[i].length)
                    message.innerMessages[i] = object.innerMessages[i];
        }
        return message;
    };

    /**
     * Creates a plain object from a RuntimeMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof RuntimeMessage
     * @static
     * @param {RuntimeMessage} message RuntimeMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RuntimeMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults) {
            object.pointerParents = [];
            object.pointerNames = [];
            object.messageSenders = [];
            object.innerMessages = [];
        }
        if (message.pointerParents && message.pointerParents.length) {
            object.pointerParents = [];
            for (var j = 0; j < message.pointerParents.length; ++j)
                object.pointerParents[j] = message.pointerParents[j];
        }
        if (message.pointerNames && message.pointerNames.length) {
            object.pointerNames = [];
            for (var j = 0; j < message.pointerNames.length; ++j)
                object.pointerNames[j] = options.bytes === String ? $util.base64.encode(message.pointerNames[j], 0, message.pointerNames[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.pointerNames[j]) : message.pointerNames[j];
        }
        if (message.messageSenders && message.messageSenders.length) {
            object.messageSenders = [];
            for (var j = 0; j < message.messageSenders.length; ++j)
                object.messageSenders[j] = message.messageSenders[j];
        }
        if (message.innerMessages && message.innerMessages.length) {
            object.innerMessages = [];
            for (var j = 0; j < message.innerMessages.length; ++j)
                object.innerMessages[j] = options.bytes === String ? $util.base64.encode(message.innerMessages[j], 0, message.innerMessages[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.innerMessages[j]) : message.innerMessages[j];
        }
        return object;
    };

    /**
     * Converts this RuntimeMessage to JSON.
     * @function toJSON
     * @memberof RuntimeMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RuntimeMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return RuntimeMessage;
})();

$root.RuntimeOneSave = (function() {

    /**
     * Properties of a RuntimeOneSave.
     * @exports IRuntimeOneSave
     * @interface IRuntimeOneSave
     * @property {number} parentPointer RuntimeOneSave parentPointer
     * @property {Uint8Array} name RuntimeOneSave name
     * @property {Uint8Array} saveData RuntimeOneSave saveData
     */

    /**
     * Constructs a new RuntimeOneSave.
     * @exports RuntimeOneSave
     * @classdesc Represents a RuntimeOneSave.
     * @implements IRuntimeOneSave
     * @constructor
     * @param {IRuntimeOneSave=} [properties] Properties to set
     */
    function RuntimeOneSave(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * RuntimeOneSave parentPointer.
     * @member {number} parentPointer
     * @memberof RuntimeOneSave
     * @instance
     */
    RuntimeOneSave.prototype.parentPointer = 0;

    /**
     * RuntimeOneSave name.
     * @member {Uint8Array} name
     * @memberof RuntimeOneSave
     * @instance
     */
    RuntimeOneSave.prototype.name = $util.newBuffer([]);

    /**
     * RuntimeOneSave saveData.
     * @member {Uint8Array} saveData
     * @memberof RuntimeOneSave
     * @instance
     */
    RuntimeOneSave.prototype.saveData = $util.newBuffer([]);

    /**
     * Creates a new RuntimeOneSave instance using the specified properties.
     * @function create
     * @memberof RuntimeOneSave
     * @static
     * @param {IRuntimeOneSave=} [properties] Properties to set
     * @returns {RuntimeOneSave} RuntimeOneSave instance
     */
    RuntimeOneSave.create = function create(properties) {
        return new RuntimeOneSave(properties);
    };

    /**
     * Encodes the specified RuntimeOneSave message. Does not implicitly {@link RuntimeOneSave.verify|verify} messages.
     * @function encode
     * @memberof RuntimeOneSave
     * @static
     * @param {IRuntimeOneSave} message RuntimeOneSave message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RuntimeOneSave.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.parentPointer);
        writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.name);
        writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.saveData);
        return writer;
    };

    /**
     * Encodes the specified RuntimeOneSave message, length delimited. Does not implicitly {@link RuntimeOneSave.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RuntimeOneSave
     * @static
     * @param {IRuntimeOneSave} message RuntimeOneSave message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RuntimeOneSave.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RuntimeOneSave message from the specified reader or buffer.
     * @function decode
     * @memberof RuntimeOneSave
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RuntimeOneSave} RuntimeOneSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RuntimeOneSave.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.RuntimeOneSave();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.parentPointer = reader.uint32();
                break;
            case 2:
                message.name = reader.bytes();
                break;
            case 3:
                message.saveData = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("parentPointer"))
            throw $util.ProtocolError("missing required 'parentPointer'", { instance: message });
        if (!message.hasOwnProperty("name"))
            throw $util.ProtocolError("missing required 'name'", { instance: message });
        if (!message.hasOwnProperty("saveData"))
            throw $util.ProtocolError("missing required 'saveData'", { instance: message });
        return message;
    };

    /**
     * Decodes a RuntimeOneSave message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RuntimeOneSave
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RuntimeOneSave} RuntimeOneSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RuntimeOneSave.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a RuntimeOneSave message.
     * @function verify
     * @memberof RuntimeOneSave
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RuntimeOneSave.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.parentPointer))
            return "parentPointer: integer expected";
        if (!(message.name && typeof message.name.length === "number" || $util.isString(message.name)))
            return "name: buffer expected";
        if (!(message.saveData && typeof message.saveData.length === "number" || $util.isString(message.saveData)))
            return "saveData: buffer expected";
        return null;
    };

    /**
     * Creates a RuntimeOneSave message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof RuntimeOneSave
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {RuntimeOneSave} RuntimeOneSave
     */
    RuntimeOneSave.fromObject = function fromObject(object) {
        if (object instanceof $root.RuntimeOneSave)
            return object;
        var message = new $root.RuntimeOneSave();
        if (object.parentPointer != null)
            message.parentPointer = object.parentPointer >>> 0;
        if (object.name != null)
            if (typeof object.name === "string")
                $util.base64.decode(object.name, message.name = $util.newBuffer($util.base64.length(object.name)), 0);
            else if (object.name.length)
                message.name = object.name;
        if (object.saveData != null)
            if (typeof object.saveData === "string")
                $util.base64.decode(object.saveData, message.saveData = $util.newBuffer($util.base64.length(object.saveData)), 0);
            else if (object.saveData.length)
                message.saveData = object.saveData;
        return message;
    };

    /**
     * Creates a plain object from a RuntimeOneSave message. Also converts values to other types if specified.
     * @function toObject
     * @memberof RuntimeOneSave
     * @static
     * @param {RuntimeOneSave} message RuntimeOneSave
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RuntimeOneSave.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.parentPointer = 0;
            if (options.bytes === String)
                object.name = "";
            else {
                object.name = [];
                if (options.bytes !== Array)
                    object.name = $util.newBuffer(object.name);
            }
            if (options.bytes === String)
                object.saveData = "";
            else {
                object.saveData = [];
                if (options.bytes !== Array)
                    object.saveData = $util.newBuffer(object.saveData);
            }
        }
        if (message.parentPointer != null && message.hasOwnProperty("parentPointer"))
            object.parentPointer = message.parentPointer;
        if (message.name != null && message.hasOwnProperty("name"))
            object.name = options.bytes === String ? $util.base64.encode(message.name, 0, message.name.length) : options.bytes === Array ? Array.prototype.slice.call(message.name) : message.name;
        if (message.saveData != null && message.hasOwnProperty("saveData"))
            object.saveData = options.bytes === String ? $util.base64.encode(message.saveData, 0, message.saveData.length) : options.bytes === Array ? Array.prototype.slice.call(message.saveData) : message.saveData;
        return object;
    };

    /**
     * Converts this RuntimeOneSave to JSON.
     * @function toJSON
     * @memberof RuntimeOneSave
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RuntimeOneSave.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return RuntimeOneSave;
})();

$root.RuntimeSave = (function() {

    /**
     * Properties of a RuntimeSave.
     * @exports IRuntimeSave
     * @interface IRuntimeSave
     * @property {Array.<IRuntimeOneSave>|null} [saves] RuntimeSave saves
     * @property {Uint8Array} networkSave RuntimeSave networkSave
     */

    /**
     * Constructs a new RuntimeSave.
     * @exports RuntimeSave
     * @classdesc Represents a RuntimeSave.
     * @implements IRuntimeSave
     * @constructor
     * @param {IRuntimeSave=} [properties] Properties to set
     */
    function RuntimeSave(properties) {
        this.saves = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * RuntimeSave saves.
     * @member {Array.<IRuntimeOneSave>} saves
     * @memberof RuntimeSave
     * @instance
     */
    RuntimeSave.prototype.saves = $util.emptyArray;

    /**
     * RuntimeSave networkSave.
     * @member {Uint8Array} networkSave
     * @memberof RuntimeSave
     * @instance
     */
    RuntimeSave.prototype.networkSave = $util.newBuffer([]);

    /**
     * Creates a new RuntimeSave instance using the specified properties.
     * @function create
     * @memberof RuntimeSave
     * @static
     * @param {IRuntimeSave=} [properties] Properties to set
     * @returns {RuntimeSave} RuntimeSave instance
     */
    RuntimeSave.create = function create(properties) {
        return new RuntimeSave(properties);
    };

    /**
     * Encodes the specified RuntimeSave message. Does not implicitly {@link RuntimeSave.verify|verify} messages.
     * @function encode
     * @memberof RuntimeSave
     * @static
     * @param {IRuntimeSave} message RuntimeSave message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RuntimeSave.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.saves != null && message.saves.length)
            for (var i = 0; i < message.saves.length; ++i)
                $root.RuntimeOneSave.encode(message.saves[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.networkSave);
        return writer;
    };

    /**
     * Encodes the specified RuntimeSave message, length delimited. Does not implicitly {@link RuntimeSave.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RuntimeSave
     * @static
     * @param {IRuntimeSave} message RuntimeSave message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RuntimeSave.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RuntimeSave message from the specified reader or buffer.
     * @function decode
     * @memberof RuntimeSave
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RuntimeSave} RuntimeSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RuntimeSave.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.RuntimeSave();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.saves && message.saves.length))
                    message.saves = [];
                message.saves.push($root.RuntimeOneSave.decode(reader, reader.uint32()));
                break;
            case 2:
                message.networkSave = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("networkSave"))
            throw $util.ProtocolError("missing required 'networkSave'", { instance: message });
        return message;
    };

    /**
     * Decodes a RuntimeSave message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RuntimeSave
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RuntimeSave} RuntimeSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RuntimeSave.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a RuntimeSave message.
     * @function verify
     * @memberof RuntimeSave
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RuntimeSave.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.saves != null && message.hasOwnProperty("saves")) {
            if (!Array.isArray(message.saves))
                return "saves: array expected";
            for (var i = 0; i < message.saves.length; ++i) {
                var error = $root.RuntimeOneSave.verify(message.saves[i]);
                if (error)
                    return "saves." + error;
            }
        }
        if (!(message.networkSave && typeof message.networkSave.length === "number" || $util.isString(message.networkSave)))
            return "networkSave: buffer expected";
        return null;
    };

    /**
     * Creates a RuntimeSave message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof RuntimeSave
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {RuntimeSave} RuntimeSave
     */
    RuntimeSave.fromObject = function fromObject(object) {
        if (object instanceof $root.RuntimeSave)
            return object;
        var message = new $root.RuntimeSave();
        if (object.saves) {
            if (!Array.isArray(object.saves))
                throw TypeError(".RuntimeSave.saves: array expected");
            message.saves = [];
            for (var i = 0; i < object.saves.length; ++i) {
                if (typeof object.saves[i] !== "object")
                    throw TypeError(".RuntimeSave.saves: object expected");
                message.saves[i] = $root.RuntimeOneSave.fromObject(object.saves[i]);
            }
        }
        if (object.networkSave != null)
            if (typeof object.networkSave === "string")
                $util.base64.decode(object.networkSave, message.networkSave = $util.newBuffer($util.base64.length(object.networkSave)), 0);
            else if (object.networkSave.length)
                message.networkSave = object.networkSave;
        return message;
    };

    /**
     * Creates a plain object from a RuntimeSave message. Also converts values to other types if specified.
     * @function toObject
     * @memberof RuntimeSave
     * @static
     * @param {RuntimeSave} message RuntimeSave
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RuntimeSave.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.saves = [];
        if (options.defaults)
            if (options.bytes === String)
                object.networkSave = "";
            else {
                object.networkSave = [];
                if (options.bytes !== Array)
                    object.networkSave = $util.newBuffer(object.networkSave);
            }
        if (message.saves && message.saves.length) {
            object.saves = [];
            for (var j = 0; j < message.saves.length; ++j)
                object.saves[j] = $root.RuntimeOneSave.toObject(message.saves[j], options);
        }
        if (message.networkSave != null && message.hasOwnProperty("networkSave"))
            object.networkSave = options.bytes === String ? $util.base64.encode(message.networkSave, 0, message.networkSave.length) : options.bytes === Array ? Array.prototype.slice.call(message.networkSave) : message.networkSave;
        return object;
    };

    /**
     * Converts this RuntimeSave to JSON.
     * @function toJSON
     * @memberof RuntimeSave
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RuntimeSave.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return RuntimeSave;
})();

$root.RgaLocMessage = (function() {

    /**
     * Properties of a RgaLocMessage.
     * @exports IRgaLocMessage
     * @interface IRgaLocMessage
     * @property {Array.<string>|null} [senders] RgaLocMessage senders
     * @property {Array.<number>|null} [senderIndices] RgaLocMessage senderIndices
     * @property {Array.<number>|null} [uniqueNumbers] RgaLocMessage uniqueNumbers
     */

    /**
     * Constructs a new RgaLocMessage.
     * @exports RgaLocMessage
     * @classdesc Represents a RgaLocMessage.
     * @implements IRgaLocMessage
     * @constructor
     * @param {IRgaLocMessage=} [properties] Properties to set
     */
    function RgaLocMessage(properties) {
        this.senders = [];
        this.senderIndices = [];
        this.uniqueNumbers = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * RgaLocMessage senders.
     * @member {Array.<string>} senders
     * @memberof RgaLocMessage
     * @instance
     */
    RgaLocMessage.prototype.senders = $util.emptyArray;

    /**
     * RgaLocMessage senderIndices.
     * @member {Array.<number>} senderIndices
     * @memberof RgaLocMessage
     * @instance
     */
    RgaLocMessage.prototype.senderIndices = $util.emptyArray;

    /**
     * RgaLocMessage uniqueNumbers.
     * @member {Array.<number>} uniqueNumbers
     * @memberof RgaLocMessage
     * @instance
     */
    RgaLocMessage.prototype.uniqueNumbers = $util.emptyArray;

    /**
     * Creates a new RgaLocMessage instance using the specified properties.
     * @function create
     * @memberof RgaLocMessage
     * @static
     * @param {IRgaLocMessage=} [properties] Properties to set
     * @returns {RgaLocMessage} RgaLocMessage instance
     */
    RgaLocMessage.create = function create(properties) {
        return new RgaLocMessage(properties);
    };

    /**
     * Encodes the specified RgaLocMessage message. Does not implicitly {@link RgaLocMessage.verify|verify} messages.
     * @function encode
     * @memberof RgaLocMessage
     * @static
     * @param {IRgaLocMessage} message RgaLocMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RgaLocMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.senders != null && message.senders.length)
            for (var i = 0; i < message.senders.length; ++i)
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.senders[i]);
        if (message.senderIndices != null && message.senderIndices.length) {
            writer.uint32(/* id 2, wireType 2 =*/18).fork();
            for (var i = 0; i < message.senderIndices.length; ++i)
                writer.uint32(message.senderIndices[i]);
            writer.ldelim();
        }
        if (message.uniqueNumbers != null && message.uniqueNumbers.length) {
            writer.uint32(/* id 3, wireType 2 =*/26).fork();
            for (var i = 0; i < message.uniqueNumbers.length; ++i)
                writer.sint32(message.uniqueNumbers[i]);
            writer.ldelim();
        }
        return writer;
    };

    /**
     * Encodes the specified RgaLocMessage message, length delimited. Does not implicitly {@link RgaLocMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RgaLocMessage
     * @static
     * @param {IRgaLocMessage} message RgaLocMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RgaLocMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RgaLocMessage message from the specified reader or buffer.
     * @function decode
     * @memberof RgaLocMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RgaLocMessage} RgaLocMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RgaLocMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.RgaLocMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.senders && message.senders.length))
                    message.senders = [];
                message.senders.push(reader.string());
                break;
            case 2:
                if (!(message.senderIndices && message.senderIndices.length))
                    message.senderIndices = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.senderIndices.push(reader.uint32());
                } else
                    message.senderIndices.push(reader.uint32());
                break;
            case 3:
                if (!(message.uniqueNumbers && message.uniqueNumbers.length))
                    message.uniqueNumbers = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.uniqueNumbers.push(reader.sint32());
                } else
                    message.uniqueNumbers.push(reader.sint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a RgaLocMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RgaLocMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RgaLocMessage} RgaLocMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RgaLocMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a RgaLocMessage message.
     * @function verify
     * @memberof RgaLocMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RgaLocMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.senders != null && message.hasOwnProperty("senders")) {
            if (!Array.isArray(message.senders))
                return "senders: array expected";
            for (var i = 0; i < message.senders.length; ++i)
                if (!$util.isString(message.senders[i]))
                    return "senders: string[] expected";
        }
        if (message.senderIndices != null && message.hasOwnProperty("senderIndices")) {
            if (!Array.isArray(message.senderIndices))
                return "senderIndices: array expected";
            for (var i = 0; i < message.senderIndices.length; ++i)
                if (!$util.isInteger(message.senderIndices[i]))
                    return "senderIndices: integer[] expected";
        }
        if (message.uniqueNumbers != null && message.hasOwnProperty("uniqueNumbers")) {
            if (!Array.isArray(message.uniqueNumbers))
                return "uniqueNumbers: array expected";
            for (var i = 0; i < message.uniqueNumbers.length; ++i)
                if (!$util.isInteger(message.uniqueNumbers[i]))
                    return "uniqueNumbers: integer[] expected";
        }
        return null;
    };

    /**
     * Creates a RgaLocMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof RgaLocMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {RgaLocMessage} RgaLocMessage
     */
    RgaLocMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.RgaLocMessage)
            return object;
        var message = new $root.RgaLocMessage();
        if (object.senders) {
            if (!Array.isArray(object.senders))
                throw TypeError(".RgaLocMessage.senders: array expected");
            message.senders = [];
            for (var i = 0; i < object.senders.length; ++i)
                message.senders[i] = String(object.senders[i]);
        }
        if (object.senderIndices) {
            if (!Array.isArray(object.senderIndices))
                throw TypeError(".RgaLocMessage.senderIndices: array expected");
            message.senderIndices = [];
            for (var i = 0; i < object.senderIndices.length; ++i)
                message.senderIndices[i] = object.senderIndices[i] >>> 0;
        }
        if (object.uniqueNumbers) {
            if (!Array.isArray(object.uniqueNumbers))
                throw TypeError(".RgaLocMessage.uniqueNumbers: array expected");
            message.uniqueNumbers = [];
            for (var i = 0; i < object.uniqueNumbers.length; ++i)
                message.uniqueNumbers[i] = object.uniqueNumbers[i] | 0;
        }
        return message;
    };

    /**
     * Creates a plain object from a RgaLocMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof RgaLocMessage
     * @static
     * @param {RgaLocMessage} message RgaLocMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RgaLocMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults) {
            object.senders = [];
            object.senderIndices = [];
            object.uniqueNumbers = [];
        }
        if (message.senders && message.senders.length) {
            object.senders = [];
            for (var j = 0; j < message.senders.length; ++j)
                object.senders[j] = message.senders[j];
        }
        if (message.senderIndices && message.senderIndices.length) {
            object.senderIndices = [];
            for (var j = 0; j < message.senderIndices.length; ++j)
                object.senderIndices[j] = message.senderIndices[j];
        }
        if (message.uniqueNumbers && message.uniqueNumbers.length) {
            object.uniqueNumbers = [];
            for (var j = 0; j < message.uniqueNumbers.length; ++j)
                object.uniqueNumbers[j] = message.uniqueNumbers[j];
        }
        return object;
    };

    /**
     * Converts this RgaLocMessage to JSON.
     * @function toJSON
     * @memberof RgaLocMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RgaLocMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return RgaLocMessage;
})();

$root.RgaDenseLocalListPrepareMessage = (function() {

    /**
     * Properties of a RgaDenseLocalListPrepareMessage.
     * @exports IRgaDenseLocalListPrepareMessage
     * @interface IRgaDenseLocalListPrepareMessage
     * @property {IRgaLocMessage|null} [parent] RgaDenseLocalListPrepareMessage parent
     * @property {number} uniqueNumberStart RgaDenseLocalListPrepareMessage uniqueNumberStart
     */

    /**
     * Constructs a new RgaDenseLocalListPrepareMessage.
     * @exports RgaDenseLocalListPrepareMessage
     * @classdesc Represents a RgaDenseLocalListPrepareMessage.
     * @implements IRgaDenseLocalListPrepareMessage
     * @constructor
     * @param {IRgaDenseLocalListPrepareMessage=} [properties] Properties to set
     */
    function RgaDenseLocalListPrepareMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * RgaDenseLocalListPrepareMessage parent.
     * @member {IRgaLocMessage|null|undefined} parent
     * @memberof RgaDenseLocalListPrepareMessage
     * @instance
     */
    RgaDenseLocalListPrepareMessage.prototype.parent = null;

    /**
     * RgaDenseLocalListPrepareMessage uniqueNumberStart.
     * @member {number} uniqueNumberStart
     * @memberof RgaDenseLocalListPrepareMessage
     * @instance
     */
    RgaDenseLocalListPrepareMessage.prototype.uniqueNumberStart = 0;

    /**
     * Creates a new RgaDenseLocalListPrepareMessage instance using the specified properties.
     * @function create
     * @memberof RgaDenseLocalListPrepareMessage
     * @static
     * @param {IRgaDenseLocalListPrepareMessage=} [properties] Properties to set
     * @returns {RgaDenseLocalListPrepareMessage} RgaDenseLocalListPrepareMessage instance
     */
    RgaDenseLocalListPrepareMessage.create = function create(properties) {
        return new RgaDenseLocalListPrepareMessage(properties);
    };

    /**
     * Encodes the specified RgaDenseLocalListPrepareMessage message. Does not implicitly {@link RgaDenseLocalListPrepareMessage.verify|verify} messages.
     * @function encode
     * @memberof RgaDenseLocalListPrepareMessage
     * @static
     * @param {IRgaDenseLocalListPrepareMessage} message RgaDenseLocalListPrepareMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RgaDenseLocalListPrepareMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.parent != null && Object.hasOwnProperty.call(message, "parent"))
            $root.RgaLocMessage.encode(message.parent, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        writer.uint32(/* id 2, wireType 0 =*/16).sint32(message.uniqueNumberStart);
        return writer;
    };

    /**
     * Encodes the specified RgaDenseLocalListPrepareMessage message, length delimited. Does not implicitly {@link RgaDenseLocalListPrepareMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RgaDenseLocalListPrepareMessage
     * @static
     * @param {IRgaDenseLocalListPrepareMessage} message RgaDenseLocalListPrepareMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RgaDenseLocalListPrepareMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RgaDenseLocalListPrepareMessage message from the specified reader or buffer.
     * @function decode
     * @memberof RgaDenseLocalListPrepareMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RgaDenseLocalListPrepareMessage} RgaDenseLocalListPrepareMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RgaDenseLocalListPrepareMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.RgaDenseLocalListPrepareMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.parent = $root.RgaLocMessage.decode(reader, reader.uint32());
                break;
            case 2:
                message.uniqueNumberStart = reader.sint32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("uniqueNumberStart"))
            throw $util.ProtocolError("missing required 'uniqueNumberStart'", { instance: message });
        return message;
    };

    /**
     * Decodes a RgaDenseLocalListPrepareMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RgaDenseLocalListPrepareMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RgaDenseLocalListPrepareMessage} RgaDenseLocalListPrepareMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RgaDenseLocalListPrepareMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a RgaDenseLocalListPrepareMessage message.
     * @function verify
     * @memberof RgaDenseLocalListPrepareMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RgaDenseLocalListPrepareMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.parent != null && message.hasOwnProperty("parent")) {
            var error = $root.RgaLocMessage.verify(message.parent);
            if (error)
                return "parent." + error;
        }
        if (!$util.isInteger(message.uniqueNumberStart))
            return "uniqueNumberStart: integer expected";
        return null;
    };

    /**
     * Creates a RgaDenseLocalListPrepareMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof RgaDenseLocalListPrepareMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {RgaDenseLocalListPrepareMessage} RgaDenseLocalListPrepareMessage
     */
    RgaDenseLocalListPrepareMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.RgaDenseLocalListPrepareMessage)
            return object;
        var message = new $root.RgaDenseLocalListPrepareMessage();
        if (object.parent != null) {
            if (typeof object.parent !== "object")
                throw TypeError(".RgaDenseLocalListPrepareMessage.parent: object expected");
            message.parent = $root.RgaLocMessage.fromObject(object.parent);
        }
        if (object.uniqueNumberStart != null)
            message.uniqueNumberStart = object.uniqueNumberStart | 0;
        return message;
    };

    /**
     * Creates a plain object from a RgaDenseLocalListPrepareMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof RgaDenseLocalListPrepareMessage
     * @static
     * @param {RgaDenseLocalListPrepareMessage} message RgaDenseLocalListPrepareMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RgaDenseLocalListPrepareMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.parent = null;
            object.uniqueNumberStart = 0;
        }
        if (message.parent != null && message.hasOwnProperty("parent"))
            object.parent = $root.RgaLocMessage.toObject(message.parent, options);
        if (message.uniqueNumberStart != null && message.hasOwnProperty("uniqueNumberStart"))
            object.uniqueNumberStart = message.uniqueNumberStart;
        return object;
    };

    /**
     * Converts this RgaDenseLocalListPrepareMessage to JSON.
     * @function toJSON
     * @memberof RgaDenseLocalListPrepareMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RgaDenseLocalListPrepareMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return RgaDenseLocalListPrepareMessage;
})();

$root.RgaDenseLocalListSave = (function() {

    /**
     * Properties of a RgaDenseLocalListSave.
     * @exports IRgaDenseLocalListSave
     * @interface IRgaDenseLocalListSave
     * @property {Array.<string>|null} [senders] RgaDenseLocalListSave senders
     * @property {Array.<number>|null} [parents] RgaDenseLocalListSave parents
     * @property {Array.<number>|null} [senderIndices] RgaDenseLocalListSave senderIndices
     * @property {Array.<number>|null} [uniqueNumbers] RgaDenseLocalListSave uniqueNumbers
     * @property {number} length RgaDenseLocalListSave length
     */

    /**
     * Constructs a new RgaDenseLocalListSave.
     * @exports RgaDenseLocalListSave
     * @classdesc Represents a RgaDenseLocalListSave.
     * @implements IRgaDenseLocalListSave
     * @constructor
     * @param {IRgaDenseLocalListSave=} [properties] Properties to set
     */
    function RgaDenseLocalListSave(properties) {
        this.senders = [];
        this.parents = [];
        this.senderIndices = [];
        this.uniqueNumbers = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * RgaDenseLocalListSave senders.
     * @member {Array.<string>} senders
     * @memberof RgaDenseLocalListSave
     * @instance
     */
    RgaDenseLocalListSave.prototype.senders = $util.emptyArray;

    /**
     * RgaDenseLocalListSave parents.
     * @member {Array.<number>} parents
     * @memberof RgaDenseLocalListSave
     * @instance
     */
    RgaDenseLocalListSave.prototype.parents = $util.emptyArray;

    /**
     * RgaDenseLocalListSave senderIndices.
     * @member {Array.<number>} senderIndices
     * @memberof RgaDenseLocalListSave
     * @instance
     */
    RgaDenseLocalListSave.prototype.senderIndices = $util.emptyArray;

    /**
     * RgaDenseLocalListSave uniqueNumbers.
     * @member {Array.<number>} uniqueNumbers
     * @memberof RgaDenseLocalListSave
     * @instance
     */
    RgaDenseLocalListSave.prototype.uniqueNumbers = $util.emptyArray;

    /**
     * RgaDenseLocalListSave length.
     * @member {number} length
     * @memberof RgaDenseLocalListSave
     * @instance
     */
    RgaDenseLocalListSave.prototype.length = 0;

    /**
     * Creates a new RgaDenseLocalListSave instance using the specified properties.
     * @function create
     * @memberof RgaDenseLocalListSave
     * @static
     * @param {IRgaDenseLocalListSave=} [properties] Properties to set
     * @returns {RgaDenseLocalListSave} RgaDenseLocalListSave instance
     */
    RgaDenseLocalListSave.create = function create(properties) {
        return new RgaDenseLocalListSave(properties);
    };

    /**
     * Encodes the specified RgaDenseLocalListSave message. Does not implicitly {@link RgaDenseLocalListSave.verify|verify} messages.
     * @function encode
     * @memberof RgaDenseLocalListSave
     * @static
     * @param {IRgaDenseLocalListSave} message RgaDenseLocalListSave message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RgaDenseLocalListSave.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.senders != null && message.senders.length)
            for (var i = 0; i < message.senders.length; ++i)
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.senders[i]);
        if (message.parents != null && message.parents.length) {
            writer.uint32(/* id 2, wireType 2 =*/18).fork();
            for (var i = 0; i < message.parents.length; ++i)
                writer.uint32(message.parents[i]);
            writer.ldelim();
        }
        if (message.senderIndices != null && message.senderIndices.length) {
            writer.uint32(/* id 3, wireType 2 =*/26).fork();
            for (var i = 0; i < message.senderIndices.length; ++i)
                writer.uint32(message.senderIndices[i]);
            writer.ldelim();
        }
        if (message.uniqueNumbers != null && message.uniqueNumbers.length) {
            writer.uint32(/* id 4, wireType 2 =*/34).fork();
            for (var i = 0; i < message.uniqueNumbers.length; ++i)
                writer.sint32(message.uniqueNumbers[i]);
            writer.ldelim();
        }
        writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.length);
        return writer;
    };

    /**
     * Encodes the specified RgaDenseLocalListSave message, length delimited. Does not implicitly {@link RgaDenseLocalListSave.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RgaDenseLocalListSave
     * @static
     * @param {IRgaDenseLocalListSave} message RgaDenseLocalListSave message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RgaDenseLocalListSave.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RgaDenseLocalListSave message from the specified reader or buffer.
     * @function decode
     * @memberof RgaDenseLocalListSave
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RgaDenseLocalListSave} RgaDenseLocalListSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RgaDenseLocalListSave.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.RgaDenseLocalListSave();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.senders && message.senders.length))
                    message.senders = [];
                message.senders.push(reader.string());
                break;
            case 2:
                if (!(message.parents && message.parents.length))
                    message.parents = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.parents.push(reader.uint32());
                } else
                    message.parents.push(reader.uint32());
                break;
            case 3:
                if (!(message.senderIndices && message.senderIndices.length))
                    message.senderIndices = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.senderIndices.push(reader.uint32());
                } else
                    message.senderIndices.push(reader.uint32());
                break;
            case 4:
                if (!(message.uniqueNumbers && message.uniqueNumbers.length))
                    message.uniqueNumbers = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.uniqueNumbers.push(reader.sint32());
                } else
                    message.uniqueNumbers.push(reader.sint32());
                break;
            case 5:
                message.length = reader.uint32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("length"))
            throw $util.ProtocolError("missing required 'length'", { instance: message });
        return message;
    };

    /**
     * Decodes a RgaDenseLocalListSave message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RgaDenseLocalListSave
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RgaDenseLocalListSave} RgaDenseLocalListSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RgaDenseLocalListSave.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a RgaDenseLocalListSave message.
     * @function verify
     * @memberof RgaDenseLocalListSave
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RgaDenseLocalListSave.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.senders != null && message.hasOwnProperty("senders")) {
            if (!Array.isArray(message.senders))
                return "senders: array expected";
            for (var i = 0; i < message.senders.length; ++i)
                if (!$util.isString(message.senders[i]))
                    return "senders: string[] expected";
        }
        if (message.parents != null && message.hasOwnProperty("parents")) {
            if (!Array.isArray(message.parents))
                return "parents: array expected";
            for (var i = 0; i < message.parents.length; ++i)
                if (!$util.isInteger(message.parents[i]))
                    return "parents: integer[] expected";
        }
        if (message.senderIndices != null && message.hasOwnProperty("senderIndices")) {
            if (!Array.isArray(message.senderIndices))
                return "senderIndices: array expected";
            for (var i = 0; i < message.senderIndices.length; ++i)
                if (!$util.isInteger(message.senderIndices[i]))
                    return "senderIndices: integer[] expected";
        }
        if (message.uniqueNumbers != null && message.hasOwnProperty("uniqueNumbers")) {
            if (!Array.isArray(message.uniqueNumbers))
                return "uniqueNumbers: array expected";
            for (var i = 0; i < message.uniqueNumbers.length; ++i)
                if (!$util.isInteger(message.uniqueNumbers[i]))
                    return "uniqueNumbers: integer[] expected";
        }
        if (!$util.isInteger(message.length))
            return "length: integer expected";
        return null;
    };

    /**
     * Creates a RgaDenseLocalListSave message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof RgaDenseLocalListSave
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {RgaDenseLocalListSave} RgaDenseLocalListSave
     */
    RgaDenseLocalListSave.fromObject = function fromObject(object) {
        if (object instanceof $root.RgaDenseLocalListSave)
            return object;
        var message = new $root.RgaDenseLocalListSave();
        if (object.senders) {
            if (!Array.isArray(object.senders))
                throw TypeError(".RgaDenseLocalListSave.senders: array expected");
            message.senders = [];
            for (var i = 0; i < object.senders.length; ++i)
                message.senders[i] = String(object.senders[i]);
        }
        if (object.parents) {
            if (!Array.isArray(object.parents))
                throw TypeError(".RgaDenseLocalListSave.parents: array expected");
            message.parents = [];
            for (var i = 0; i < object.parents.length; ++i)
                message.parents[i] = object.parents[i] >>> 0;
        }
        if (object.senderIndices) {
            if (!Array.isArray(object.senderIndices))
                throw TypeError(".RgaDenseLocalListSave.senderIndices: array expected");
            message.senderIndices = [];
            for (var i = 0; i < object.senderIndices.length; ++i)
                message.senderIndices[i] = object.senderIndices[i] >>> 0;
        }
        if (object.uniqueNumbers) {
            if (!Array.isArray(object.uniqueNumbers))
                throw TypeError(".RgaDenseLocalListSave.uniqueNumbers: array expected");
            message.uniqueNumbers = [];
            for (var i = 0; i < object.uniqueNumbers.length; ++i)
                message.uniqueNumbers[i] = object.uniqueNumbers[i] | 0;
        }
        if (object.length != null)
            message.length = object.length >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a RgaDenseLocalListSave message. Also converts values to other types if specified.
     * @function toObject
     * @memberof RgaDenseLocalListSave
     * @static
     * @param {RgaDenseLocalListSave} message RgaDenseLocalListSave
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RgaDenseLocalListSave.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults) {
            object.senders = [];
            object.parents = [];
            object.senderIndices = [];
            object.uniqueNumbers = [];
        }
        if (options.defaults)
            object.length = 0;
        if (message.senders && message.senders.length) {
            object.senders = [];
            for (var j = 0; j < message.senders.length; ++j)
                object.senders[j] = message.senders[j];
        }
        if (message.parents && message.parents.length) {
            object.parents = [];
            for (var j = 0; j < message.parents.length; ++j)
                object.parents[j] = message.parents[j];
        }
        if (message.senderIndices && message.senderIndices.length) {
            object.senderIndices = [];
            for (var j = 0; j < message.senderIndices.length; ++j)
                object.senderIndices[j] = message.senderIndices[j];
        }
        if (message.uniqueNumbers && message.uniqueNumbers.length) {
            object.uniqueNumbers = [];
            for (var j = 0; j < message.uniqueNumbers.length; ++j)
                object.uniqueNumbers[j] = message.uniqueNumbers[j];
        }
        if (message.length != null && message.hasOwnProperty("length"))
            object.length = message.length;
        return object;
    };

    /**
     * Converts this RgaDenseLocalListSave to JSON.
     * @function toJSON
     * @memberof RgaDenseLocalListSave
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RgaDenseLocalListSave.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return RgaDenseLocalListSave;
})();

$root.PrimitiveCListValueArrayMessage = (function() {

    /**
     * Properties of a PrimitiveCListValueArrayMessage.
     * @exports IPrimitiveCListValueArrayMessage
     * @interface IPrimitiveCListValueArrayMessage
     * @property {Array.<Uint8Array>|null} [values] PrimitiveCListValueArrayMessage values
     */

    /**
     * Constructs a new PrimitiveCListValueArrayMessage.
     * @exports PrimitiveCListValueArrayMessage
     * @classdesc Represents a PrimitiveCListValueArrayMessage.
     * @implements IPrimitiveCListValueArrayMessage
     * @constructor
     * @param {IPrimitiveCListValueArrayMessage=} [properties] Properties to set
     */
    function PrimitiveCListValueArrayMessage(properties) {
        this.values = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * PrimitiveCListValueArrayMessage values.
     * @member {Array.<Uint8Array>} values
     * @memberof PrimitiveCListValueArrayMessage
     * @instance
     */
    PrimitiveCListValueArrayMessage.prototype.values = $util.emptyArray;

    /**
     * Creates a new PrimitiveCListValueArrayMessage instance using the specified properties.
     * @function create
     * @memberof PrimitiveCListValueArrayMessage
     * @static
     * @param {IPrimitiveCListValueArrayMessage=} [properties] Properties to set
     * @returns {PrimitiveCListValueArrayMessage} PrimitiveCListValueArrayMessage instance
     */
    PrimitiveCListValueArrayMessage.create = function create(properties) {
        return new PrimitiveCListValueArrayMessage(properties);
    };

    /**
     * Encodes the specified PrimitiveCListValueArrayMessage message. Does not implicitly {@link PrimitiveCListValueArrayMessage.verify|verify} messages.
     * @function encode
     * @memberof PrimitiveCListValueArrayMessage
     * @static
     * @param {IPrimitiveCListValueArrayMessage} message PrimitiveCListValueArrayMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PrimitiveCListValueArrayMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.values != null && message.values.length)
            for (var i = 0; i < message.values.length; ++i)
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.values[i]);
        return writer;
    };

    /**
     * Encodes the specified PrimitiveCListValueArrayMessage message, length delimited. Does not implicitly {@link PrimitiveCListValueArrayMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof PrimitiveCListValueArrayMessage
     * @static
     * @param {IPrimitiveCListValueArrayMessage} message PrimitiveCListValueArrayMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PrimitiveCListValueArrayMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a PrimitiveCListValueArrayMessage message from the specified reader or buffer.
     * @function decode
     * @memberof PrimitiveCListValueArrayMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {PrimitiveCListValueArrayMessage} PrimitiveCListValueArrayMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PrimitiveCListValueArrayMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PrimitiveCListValueArrayMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.values && message.values.length))
                    message.values = [];
                message.values.push(reader.bytes());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a PrimitiveCListValueArrayMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof PrimitiveCListValueArrayMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {PrimitiveCListValueArrayMessage} PrimitiveCListValueArrayMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PrimitiveCListValueArrayMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a PrimitiveCListValueArrayMessage message.
     * @function verify
     * @memberof PrimitiveCListValueArrayMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    PrimitiveCListValueArrayMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.values != null && message.hasOwnProperty("values")) {
            if (!Array.isArray(message.values))
                return "values: array expected";
            for (var i = 0; i < message.values.length; ++i)
                if (!(message.values[i] && typeof message.values[i].length === "number" || $util.isString(message.values[i])))
                    return "values: buffer[] expected";
        }
        return null;
    };

    /**
     * Creates a PrimitiveCListValueArrayMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PrimitiveCListValueArrayMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {PrimitiveCListValueArrayMessage} PrimitiveCListValueArrayMessage
     */
    PrimitiveCListValueArrayMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.PrimitiveCListValueArrayMessage)
            return object;
        var message = new $root.PrimitiveCListValueArrayMessage();
        if (object.values) {
            if (!Array.isArray(object.values))
                throw TypeError(".PrimitiveCListValueArrayMessage.values: array expected");
            message.values = [];
            for (var i = 0; i < object.values.length; ++i)
                if (typeof object.values[i] === "string")
                    $util.base64.decode(object.values[i], message.values[i] = $util.newBuffer($util.base64.length(object.values[i])), 0);
                else if (object.values[i].length)
                    message.values[i] = object.values[i];
        }
        return message;
    };

    /**
     * Creates a plain object from a PrimitiveCListValueArrayMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PrimitiveCListValueArrayMessage
     * @static
     * @param {PrimitiveCListValueArrayMessage} message PrimitiveCListValueArrayMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PrimitiveCListValueArrayMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.values = [];
        if (message.values && message.values.length) {
            object.values = [];
            for (var j = 0; j < message.values.length; ++j)
                object.values[j] = options.bytes === String ? $util.base64.encode(message.values[j], 0, message.values[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.values[j]) : message.values[j];
        }
        return object;
    };

    /**
     * Converts this PrimitiveCListValueArrayMessage to JSON.
     * @function toJSON
     * @memberof PrimitiveCListValueArrayMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PrimitiveCListValueArrayMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return PrimitiveCListValueArrayMessage;
})();

$root.PrimitiveCListInsertMessage = (function() {

    /**
     * Properties of a PrimitiveCListInsertMessage.
     * @exports IPrimitiveCListInsertMessage
     * @interface IPrimitiveCListInsertMessage
     * @property {Uint8Array} locMessage PrimitiveCListInsertMessage locMessage
     * @property {Uint8Array|null} [value] PrimitiveCListInsertMessage value
     * @property {Uint8Array|null} [values] PrimitiveCListInsertMessage values
     * @property {IPrimitiveCListValueArrayMessage|null} [valuesArray] PrimitiveCListInsertMessage valuesArray
     */

    /**
     * Constructs a new PrimitiveCListInsertMessage.
     * @exports PrimitiveCListInsertMessage
     * @classdesc Represents a PrimitiveCListInsertMessage.
     * @implements IPrimitiveCListInsertMessage
     * @constructor
     * @param {IPrimitiveCListInsertMessage=} [properties] Properties to set
     */
    function PrimitiveCListInsertMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * PrimitiveCListInsertMessage locMessage.
     * @member {Uint8Array} locMessage
     * @memberof PrimitiveCListInsertMessage
     * @instance
     */
    PrimitiveCListInsertMessage.prototype.locMessage = $util.newBuffer([]);

    /**
     * PrimitiveCListInsertMessage value.
     * @member {Uint8Array} value
     * @memberof PrimitiveCListInsertMessage
     * @instance
     */
    PrimitiveCListInsertMessage.prototype.value = $util.newBuffer([]);

    /**
     * PrimitiveCListInsertMessage values.
     * @member {Uint8Array} values
     * @memberof PrimitiveCListInsertMessage
     * @instance
     */
    PrimitiveCListInsertMessage.prototype.values = $util.newBuffer([]);

    /**
     * PrimitiveCListInsertMessage valuesArray.
     * @member {IPrimitiveCListValueArrayMessage|null|undefined} valuesArray
     * @memberof PrimitiveCListInsertMessage
     * @instance
     */
    PrimitiveCListInsertMessage.prototype.valuesArray = null;

    // OneOf field names bound to virtual getters and setters
    var $oneOfFields;

    /**
     * PrimitiveCListInsertMessage type.
     * @member {"value"|"values"|"valuesArray"|undefined} type
     * @memberof PrimitiveCListInsertMessage
     * @instance
     */
    Object.defineProperty(PrimitiveCListInsertMessage.prototype, "type", {
        get: $util.oneOfGetter($oneOfFields = ["value", "values", "valuesArray"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new PrimitiveCListInsertMessage instance using the specified properties.
     * @function create
     * @memberof PrimitiveCListInsertMessage
     * @static
     * @param {IPrimitiveCListInsertMessage=} [properties] Properties to set
     * @returns {PrimitiveCListInsertMessage} PrimitiveCListInsertMessage instance
     */
    PrimitiveCListInsertMessage.create = function create(properties) {
        return new PrimitiveCListInsertMessage(properties);
    };

    /**
     * Encodes the specified PrimitiveCListInsertMessage message. Does not implicitly {@link PrimitiveCListInsertMessage.verify|verify} messages.
     * @function encode
     * @memberof PrimitiveCListInsertMessage
     * @static
     * @param {IPrimitiveCListInsertMessage} message PrimitiveCListInsertMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PrimitiveCListInsertMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.locMessage);
        if (message.value != null && Object.hasOwnProperty.call(message, "value"))
            writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.value);
        if (message.values != null && Object.hasOwnProperty.call(message, "values"))
            writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.values);
        if (message.valuesArray != null && Object.hasOwnProperty.call(message, "valuesArray"))
            $root.PrimitiveCListValueArrayMessage.encode(message.valuesArray, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified PrimitiveCListInsertMessage message, length delimited. Does not implicitly {@link PrimitiveCListInsertMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof PrimitiveCListInsertMessage
     * @static
     * @param {IPrimitiveCListInsertMessage} message PrimitiveCListInsertMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PrimitiveCListInsertMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a PrimitiveCListInsertMessage message from the specified reader or buffer.
     * @function decode
     * @memberof PrimitiveCListInsertMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {PrimitiveCListInsertMessage} PrimitiveCListInsertMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PrimitiveCListInsertMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PrimitiveCListInsertMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.locMessage = reader.bytes();
                break;
            case 2:
                message.value = reader.bytes();
                break;
            case 3:
                message.values = reader.bytes();
                break;
            case 4:
                message.valuesArray = $root.PrimitiveCListValueArrayMessage.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("locMessage"))
            throw $util.ProtocolError("missing required 'locMessage'", { instance: message });
        return message;
    };

    /**
     * Decodes a PrimitiveCListInsertMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof PrimitiveCListInsertMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {PrimitiveCListInsertMessage} PrimitiveCListInsertMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PrimitiveCListInsertMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a PrimitiveCListInsertMessage message.
     * @function verify
     * @memberof PrimitiveCListInsertMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    PrimitiveCListInsertMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        var properties = {};
        if (!(message.locMessage && typeof message.locMessage.length === "number" || $util.isString(message.locMessage)))
            return "locMessage: buffer expected";
        if (message.value != null && message.hasOwnProperty("value")) {
            properties.type = 1;
            if (!(message.value && typeof message.value.length === "number" || $util.isString(message.value)))
                return "value: buffer expected";
        }
        if (message.values != null && message.hasOwnProperty("values")) {
            if (properties.type === 1)
                return "type: multiple values";
            properties.type = 1;
            if (!(message.values && typeof message.values.length === "number" || $util.isString(message.values)))
                return "values: buffer expected";
        }
        if (message.valuesArray != null && message.hasOwnProperty("valuesArray")) {
            if (properties.type === 1)
                return "type: multiple values";
            properties.type = 1;
            {
                var error = $root.PrimitiveCListValueArrayMessage.verify(message.valuesArray);
                if (error)
                    return "valuesArray." + error;
            }
        }
        return null;
    };

    /**
     * Creates a PrimitiveCListInsertMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PrimitiveCListInsertMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {PrimitiveCListInsertMessage} PrimitiveCListInsertMessage
     */
    PrimitiveCListInsertMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.PrimitiveCListInsertMessage)
            return object;
        var message = new $root.PrimitiveCListInsertMessage();
        if (object.locMessage != null)
            if (typeof object.locMessage === "string")
                $util.base64.decode(object.locMessage, message.locMessage = $util.newBuffer($util.base64.length(object.locMessage)), 0);
            else if (object.locMessage.length)
                message.locMessage = object.locMessage;
        if (object.value != null)
            if (typeof object.value === "string")
                $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0);
            else if (object.value.length)
                message.value = object.value;
        if (object.values != null)
            if (typeof object.values === "string")
                $util.base64.decode(object.values, message.values = $util.newBuffer($util.base64.length(object.values)), 0);
            else if (object.values.length)
                message.values = object.values;
        if (object.valuesArray != null) {
            if (typeof object.valuesArray !== "object")
                throw TypeError(".PrimitiveCListInsertMessage.valuesArray: object expected");
            message.valuesArray = $root.PrimitiveCListValueArrayMessage.fromObject(object.valuesArray);
        }
        return message;
    };

    /**
     * Creates a plain object from a PrimitiveCListInsertMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PrimitiveCListInsertMessage
     * @static
     * @param {PrimitiveCListInsertMessage} message PrimitiveCListInsertMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PrimitiveCListInsertMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            if (options.bytes === String)
                object.locMessage = "";
            else {
                object.locMessage = [];
                if (options.bytes !== Array)
                    object.locMessage = $util.newBuffer(object.locMessage);
            }
        if (message.locMessage != null && message.hasOwnProperty("locMessage"))
            object.locMessage = options.bytes === String ? $util.base64.encode(message.locMessage, 0, message.locMessage.length) : options.bytes === Array ? Array.prototype.slice.call(message.locMessage) : message.locMessage;
        if (message.value != null && message.hasOwnProperty("value")) {
            object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value;
            if (options.oneofs)
                object.type = "value";
        }
        if (message.values != null && message.hasOwnProperty("values")) {
            object.values = options.bytes === String ? $util.base64.encode(message.values, 0, message.values.length) : options.bytes === Array ? Array.prototype.slice.call(message.values) : message.values;
            if (options.oneofs)
                object.type = "values";
        }
        if (message.valuesArray != null && message.hasOwnProperty("valuesArray")) {
            object.valuesArray = $root.PrimitiveCListValueArrayMessage.toObject(message.valuesArray, options);
            if (options.oneofs)
                object.type = "valuesArray";
        }
        return object;
    };

    /**
     * Converts this PrimitiveCListInsertMessage to JSON.
     * @function toJSON
     * @memberof PrimitiveCListInsertMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PrimitiveCListInsertMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return PrimitiveCListInsertMessage;
})();

$root.PrimitiveCListDeleteMessage = (function() {

    /**
     * Properties of a PrimitiveCListDeleteMessage.
     * @exports IPrimitiveCListDeleteMessage
     * @interface IPrimitiveCListDeleteMessage
     * @property {string} sender PrimitiveCListDeleteMessage sender
     * @property {number} uniqueNumber PrimitiveCListDeleteMessage uniqueNumber
     */

    /**
     * Constructs a new PrimitiveCListDeleteMessage.
     * @exports PrimitiveCListDeleteMessage
     * @classdesc Represents a PrimitiveCListDeleteMessage.
     * @implements IPrimitiveCListDeleteMessage
     * @constructor
     * @param {IPrimitiveCListDeleteMessage=} [properties] Properties to set
     */
    function PrimitiveCListDeleteMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * PrimitiveCListDeleteMessage sender.
     * @member {string} sender
     * @memberof PrimitiveCListDeleteMessage
     * @instance
     */
    PrimitiveCListDeleteMessage.prototype.sender = "";

    /**
     * PrimitiveCListDeleteMessage uniqueNumber.
     * @member {number} uniqueNumber
     * @memberof PrimitiveCListDeleteMessage
     * @instance
     */
    PrimitiveCListDeleteMessage.prototype.uniqueNumber = 0;

    /**
     * Creates a new PrimitiveCListDeleteMessage instance using the specified properties.
     * @function create
     * @memberof PrimitiveCListDeleteMessage
     * @static
     * @param {IPrimitiveCListDeleteMessage=} [properties] Properties to set
     * @returns {PrimitiveCListDeleteMessage} PrimitiveCListDeleteMessage instance
     */
    PrimitiveCListDeleteMessage.create = function create(properties) {
        return new PrimitiveCListDeleteMessage(properties);
    };

    /**
     * Encodes the specified PrimitiveCListDeleteMessage message. Does not implicitly {@link PrimitiveCListDeleteMessage.verify|verify} messages.
     * @function encode
     * @memberof PrimitiveCListDeleteMessage
     * @static
     * @param {IPrimitiveCListDeleteMessage} message PrimitiveCListDeleteMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PrimitiveCListDeleteMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 2 =*/10).string(message.sender);
        writer.uint32(/* id 2, wireType 0 =*/16).sint32(message.uniqueNumber);
        return writer;
    };

    /**
     * Encodes the specified PrimitiveCListDeleteMessage message, length delimited. Does not implicitly {@link PrimitiveCListDeleteMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof PrimitiveCListDeleteMessage
     * @static
     * @param {IPrimitiveCListDeleteMessage} message PrimitiveCListDeleteMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PrimitiveCListDeleteMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a PrimitiveCListDeleteMessage message from the specified reader or buffer.
     * @function decode
     * @memberof PrimitiveCListDeleteMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {PrimitiveCListDeleteMessage} PrimitiveCListDeleteMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PrimitiveCListDeleteMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PrimitiveCListDeleteMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.sender = reader.string();
                break;
            case 2:
                message.uniqueNumber = reader.sint32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("sender"))
            throw $util.ProtocolError("missing required 'sender'", { instance: message });
        if (!message.hasOwnProperty("uniqueNumber"))
            throw $util.ProtocolError("missing required 'uniqueNumber'", { instance: message });
        return message;
    };

    /**
     * Decodes a PrimitiveCListDeleteMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof PrimitiveCListDeleteMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {PrimitiveCListDeleteMessage} PrimitiveCListDeleteMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PrimitiveCListDeleteMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a PrimitiveCListDeleteMessage message.
     * @function verify
     * @memberof PrimitiveCListDeleteMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    PrimitiveCListDeleteMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isString(message.sender))
            return "sender: string expected";
        if (!$util.isInteger(message.uniqueNumber))
            return "uniqueNumber: integer expected";
        return null;
    };

    /**
     * Creates a PrimitiveCListDeleteMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PrimitiveCListDeleteMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {PrimitiveCListDeleteMessage} PrimitiveCListDeleteMessage
     */
    PrimitiveCListDeleteMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.PrimitiveCListDeleteMessage)
            return object;
        var message = new $root.PrimitiveCListDeleteMessage();
        if (object.sender != null)
            message.sender = String(object.sender);
        if (object.uniqueNumber != null)
            message.uniqueNumber = object.uniqueNumber | 0;
        return message;
    };

    /**
     * Creates a plain object from a PrimitiveCListDeleteMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PrimitiveCListDeleteMessage
     * @static
     * @param {PrimitiveCListDeleteMessage} message PrimitiveCListDeleteMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PrimitiveCListDeleteMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.sender = "";
            object.uniqueNumber = 0;
        }
        if (message.sender != null && message.hasOwnProperty("sender"))
            object.sender = message.sender;
        if (message.uniqueNumber != null && message.hasOwnProperty("uniqueNumber"))
            object.uniqueNumber = message.uniqueNumber;
        return object;
    };

    /**
     * Converts this PrimitiveCListDeleteMessage to JSON.
     * @function toJSON
     * @memberof PrimitiveCListDeleteMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PrimitiveCListDeleteMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return PrimitiveCListDeleteMessage;
})();

$root.PrimitiveCListDeleteRangeMessage = (function() {

    /**
     * Properties of a PrimitiveCListDeleteRangeMessage.
     * @exports IPrimitiveCListDeleteRangeMessage
     * @interface IPrimitiveCListDeleteRangeMessage
     * @property {Uint8Array|null} [startLoc] PrimitiveCListDeleteRangeMessage startLoc
     * @property {Uint8Array|null} [endLoc] PrimitiveCListDeleteRangeMessage endLoc
     */

    /**
     * Constructs a new PrimitiveCListDeleteRangeMessage.
     * @exports PrimitiveCListDeleteRangeMessage
     * @classdesc Represents a PrimitiveCListDeleteRangeMessage.
     * @implements IPrimitiveCListDeleteRangeMessage
     * @constructor
     * @param {IPrimitiveCListDeleteRangeMessage=} [properties] Properties to set
     */
    function PrimitiveCListDeleteRangeMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * PrimitiveCListDeleteRangeMessage startLoc.
     * @member {Uint8Array} startLoc
     * @memberof PrimitiveCListDeleteRangeMessage
     * @instance
     */
    PrimitiveCListDeleteRangeMessage.prototype.startLoc = $util.newBuffer([]);

    /**
     * PrimitiveCListDeleteRangeMessage endLoc.
     * @member {Uint8Array} endLoc
     * @memberof PrimitiveCListDeleteRangeMessage
     * @instance
     */
    PrimitiveCListDeleteRangeMessage.prototype.endLoc = $util.newBuffer([]);

    /**
     * Creates a new PrimitiveCListDeleteRangeMessage instance using the specified properties.
     * @function create
     * @memberof PrimitiveCListDeleteRangeMessage
     * @static
     * @param {IPrimitiveCListDeleteRangeMessage=} [properties] Properties to set
     * @returns {PrimitiveCListDeleteRangeMessage} PrimitiveCListDeleteRangeMessage instance
     */
    PrimitiveCListDeleteRangeMessage.create = function create(properties) {
        return new PrimitiveCListDeleteRangeMessage(properties);
    };

    /**
     * Encodes the specified PrimitiveCListDeleteRangeMessage message. Does not implicitly {@link PrimitiveCListDeleteRangeMessage.verify|verify} messages.
     * @function encode
     * @memberof PrimitiveCListDeleteRangeMessage
     * @static
     * @param {IPrimitiveCListDeleteRangeMessage} message PrimitiveCListDeleteRangeMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PrimitiveCListDeleteRangeMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.startLoc != null && Object.hasOwnProperty.call(message, "startLoc"))
            writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.startLoc);
        if (message.endLoc != null && Object.hasOwnProperty.call(message, "endLoc"))
            writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.endLoc);
        return writer;
    };

    /**
     * Encodes the specified PrimitiveCListDeleteRangeMessage message, length delimited. Does not implicitly {@link PrimitiveCListDeleteRangeMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof PrimitiveCListDeleteRangeMessage
     * @static
     * @param {IPrimitiveCListDeleteRangeMessage} message PrimitiveCListDeleteRangeMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PrimitiveCListDeleteRangeMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a PrimitiveCListDeleteRangeMessage message from the specified reader or buffer.
     * @function decode
     * @memberof PrimitiveCListDeleteRangeMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {PrimitiveCListDeleteRangeMessage} PrimitiveCListDeleteRangeMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PrimitiveCListDeleteRangeMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PrimitiveCListDeleteRangeMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.startLoc = reader.bytes();
                break;
            case 2:
                message.endLoc = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a PrimitiveCListDeleteRangeMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof PrimitiveCListDeleteRangeMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {PrimitiveCListDeleteRangeMessage} PrimitiveCListDeleteRangeMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PrimitiveCListDeleteRangeMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a PrimitiveCListDeleteRangeMessage message.
     * @function verify
     * @memberof PrimitiveCListDeleteRangeMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    PrimitiveCListDeleteRangeMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.startLoc != null && message.hasOwnProperty("startLoc"))
            if (!(message.startLoc && typeof message.startLoc.length === "number" || $util.isString(message.startLoc)))
                return "startLoc: buffer expected";
        if (message.endLoc != null && message.hasOwnProperty("endLoc"))
            if (!(message.endLoc && typeof message.endLoc.length === "number" || $util.isString(message.endLoc)))
                return "endLoc: buffer expected";
        return null;
    };

    /**
     * Creates a PrimitiveCListDeleteRangeMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PrimitiveCListDeleteRangeMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {PrimitiveCListDeleteRangeMessage} PrimitiveCListDeleteRangeMessage
     */
    PrimitiveCListDeleteRangeMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.PrimitiveCListDeleteRangeMessage)
            return object;
        var message = new $root.PrimitiveCListDeleteRangeMessage();
        if (object.startLoc != null)
            if (typeof object.startLoc === "string")
                $util.base64.decode(object.startLoc, message.startLoc = $util.newBuffer($util.base64.length(object.startLoc)), 0);
            else if (object.startLoc.length)
                message.startLoc = object.startLoc;
        if (object.endLoc != null)
            if (typeof object.endLoc === "string")
                $util.base64.decode(object.endLoc, message.endLoc = $util.newBuffer($util.base64.length(object.endLoc)), 0);
            else if (object.endLoc.length)
                message.endLoc = object.endLoc;
        return message;
    };

    /**
     * Creates a plain object from a PrimitiveCListDeleteRangeMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PrimitiveCListDeleteRangeMessage
     * @static
     * @param {PrimitiveCListDeleteRangeMessage} message PrimitiveCListDeleteRangeMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PrimitiveCListDeleteRangeMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if (options.bytes === String)
                object.startLoc = "";
            else {
                object.startLoc = [];
                if (options.bytes !== Array)
                    object.startLoc = $util.newBuffer(object.startLoc);
            }
            if (options.bytes === String)
                object.endLoc = "";
            else {
                object.endLoc = [];
                if (options.bytes !== Array)
                    object.endLoc = $util.newBuffer(object.endLoc);
            }
        }
        if (message.startLoc != null && message.hasOwnProperty("startLoc"))
            object.startLoc = options.bytes === String ? $util.base64.encode(message.startLoc, 0, message.startLoc.length) : options.bytes === Array ? Array.prototype.slice.call(message.startLoc) : message.startLoc;
        if (message.endLoc != null && message.hasOwnProperty("endLoc"))
            object.endLoc = options.bytes === String ? $util.base64.encode(message.endLoc, 0, message.endLoc.length) : options.bytes === Array ? Array.prototype.slice.call(message.endLoc) : message.endLoc;
        return object;
    };

    /**
     * Converts this PrimitiveCListDeleteRangeMessage to JSON.
     * @function toJSON
     * @memberof PrimitiveCListDeleteRangeMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PrimitiveCListDeleteRangeMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return PrimitiveCListDeleteRangeMessage;
})();

$root.PrimitiveCListMessage = (function() {

    /**
     * Properties of a PrimitiveCListMessage.
     * @exports IPrimitiveCListMessage
     * @interface IPrimitiveCListMessage
     * @property {IPrimitiveCListInsertMessage|null} [insert] PrimitiveCListMessage insert
     * @property {IPrimitiveCListDeleteMessage|null} ["delete"] PrimitiveCListMessage delete
     * @property {IPrimitiveCListDeleteRangeMessage|null} [deleteRange] PrimitiveCListMessage deleteRange
     */

    /**
     * Constructs a new PrimitiveCListMessage.
     * @exports PrimitiveCListMessage
     * @classdesc Represents a PrimitiveCListMessage.
     * @implements IPrimitiveCListMessage
     * @constructor
     * @param {IPrimitiveCListMessage=} [properties] Properties to set
     */
    function PrimitiveCListMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * PrimitiveCListMessage insert.
     * @member {IPrimitiveCListInsertMessage|null|undefined} insert
     * @memberof PrimitiveCListMessage
     * @instance
     */
    PrimitiveCListMessage.prototype.insert = null;

    /**
     * PrimitiveCListMessage delete.
     * @member {IPrimitiveCListDeleteMessage|null|undefined} delete
     * @memberof PrimitiveCListMessage
     * @instance
     */
    PrimitiveCListMessage.prototype["delete"] = null;

    /**
     * PrimitiveCListMessage deleteRange.
     * @member {IPrimitiveCListDeleteRangeMessage|null|undefined} deleteRange
     * @memberof PrimitiveCListMessage
     * @instance
     */
    PrimitiveCListMessage.prototype.deleteRange = null;

    // OneOf field names bound to virtual getters and setters
    var $oneOfFields;

    /**
     * PrimitiveCListMessage op.
     * @member {"insert"|"delete"|"deleteRange"|undefined} op
     * @memberof PrimitiveCListMessage
     * @instance
     */
    Object.defineProperty(PrimitiveCListMessage.prototype, "op", {
        get: $util.oneOfGetter($oneOfFields = ["insert", "delete", "deleteRange"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new PrimitiveCListMessage instance using the specified properties.
     * @function create
     * @memberof PrimitiveCListMessage
     * @static
     * @param {IPrimitiveCListMessage=} [properties] Properties to set
     * @returns {PrimitiveCListMessage} PrimitiveCListMessage instance
     */
    PrimitiveCListMessage.create = function create(properties) {
        return new PrimitiveCListMessage(properties);
    };

    /**
     * Encodes the specified PrimitiveCListMessage message. Does not implicitly {@link PrimitiveCListMessage.verify|verify} messages.
     * @function encode
     * @memberof PrimitiveCListMessage
     * @static
     * @param {IPrimitiveCListMessage} message PrimitiveCListMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PrimitiveCListMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.insert != null && Object.hasOwnProperty.call(message, "insert"))
            $root.PrimitiveCListInsertMessage.encode(message.insert, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message["delete"] != null && Object.hasOwnProperty.call(message, "delete"))
            $root.PrimitiveCListDeleteMessage.encode(message["delete"], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.deleteRange != null && Object.hasOwnProperty.call(message, "deleteRange"))
            $root.PrimitiveCListDeleteRangeMessage.encode(message.deleteRange, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified PrimitiveCListMessage message, length delimited. Does not implicitly {@link PrimitiveCListMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof PrimitiveCListMessage
     * @static
     * @param {IPrimitiveCListMessage} message PrimitiveCListMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PrimitiveCListMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a PrimitiveCListMessage message from the specified reader or buffer.
     * @function decode
     * @memberof PrimitiveCListMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {PrimitiveCListMessage} PrimitiveCListMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PrimitiveCListMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PrimitiveCListMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.insert = $root.PrimitiveCListInsertMessage.decode(reader, reader.uint32());
                break;
            case 2:
                message["delete"] = $root.PrimitiveCListDeleteMessage.decode(reader, reader.uint32());
                break;
            case 3:
                message.deleteRange = $root.PrimitiveCListDeleteRangeMessage.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a PrimitiveCListMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof PrimitiveCListMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {PrimitiveCListMessage} PrimitiveCListMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PrimitiveCListMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a PrimitiveCListMessage message.
     * @function verify
     * @memberof PrimitiveCListMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    PrimitiveCListMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        var properties = {};
        if (message.insert != null && message.hasOwnProperty("insert")) {
            properties.op = 1;
            {
                var error = $root.PrimitiveCListInsertMessage.verify(message.insert);
                if (error)
                    return "insert." + error;
            }
        }
        if (message["delete"] != null && message.hasOwnProperty("delete")) {
            if (properties.op === 1)
                return "op: multiple values";
            properties.op = 1;
            {
                var error = $root.PrimitiveCListDeleteMessage.verify(message["delete"]);
                if (error)
                    return "delete." + error;
            }
        }
        if (message.deleteRange != null && message.hasOwnProperty("deleteRange")) {
            if (properties.op === 1)
                return "op: multiple values";
            properties.op = 1;
            {
                var error = $root.PrimitiveCListDeleteRangeMessage.verify(message.deleteRange);
                if (error)
                    return "deleteRange." + error;
            }
        }
        return null;
    };

    /**
     * Creates a PrimitiveCListMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PrimitiveCListMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {PrimitiveCListMessage} PrimitiveCListMessage
     */
    PrimitiveCListMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.PrimitiveCListMessage)
            return object;
        var message = new $root.PrimitiveCListMessage();
        if (object.insert != null) {
            if (typeof object.insert !== "object")
                throw TypeError(".PrimitiveCListMessage.insert: object expected");
            message.insert = $root.PrimitiveCListInsertMessage.fromObject(object.insert);
        }
        if (object["delete"] != null) {
            if (typeof object["delete"] !== "object")
                throw TypeError(".PrimitiveCListMessage.delete: object expected");
            message["delete"] = $root.PrimitiveCListDeleteMessage.fromObject(object["delete"]);
        }
        if (object.deleteRange != null) {
            if (typeof object.deleteRange !== "object")
                throw TypeError(".PrimitiveCListMessage.deleteRange: object expected");
            message.deleteRange = $root.PrimitiveCListDeleteRangeMessage.fromObject(object.deleteRange);
        }
        return message;
    };

    /**
     * Creates a plain object from a PrimitiveCListMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PrimitiveCListMessage
     * @static
     * @param {PrimitiveCListMessage} message PrimitiveCListMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PrimitiveCListMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (message.insert != null && message.hasOwnProperty("insert")) {
            object.insert = $root.PrimitiveCListInsertMessage.toObject(message.insert, options);
            if (options.oneofs)
                object.op = "insert";
        }
        if (message["delete"] != null && message.hasOwnProperty("delete")) {
            object["delete"] = $root.PrimitiveCListDeleteMessage.toObject(message["delete"], options);
            if (options.oneofs)
                object.op = "delete";
        }
        if (message.deleteRange != null && message.hasOwnProperty("deleteRange")) {
            object.deleteRange = $root.PrimitiveCListDeleteRangeMessage.toObject(message.deleteRange, options);
            if (options.oneofs)
                object.op = "deleteRange";
        }
        return object;
    };

    /**
     * Converts this PrimitiveCListMessage to JSON.
     * @function toJSON
     * @memberof PrimitiveCListMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PrimitiveCListMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return PrimitiveCListMessage;
})();

$root.PrimitiveCListSave = (function() {

    /**
     * Properties of a PrimitiveCListSave.
     * @exports IPrimitiveCListSave
     * @interface IPrimitiveCListSave
     * @property {Uint8Array} locs PrimitiveCListSave locs
     * @property {Array.<number>|null} [senderCounters] PrimitiveCListSave senderCounters
     * @property {Uint8Array|null} [values] PrimitiveCListSave values
     * @property {IPrimitiveCListValueArrayMessage|null} [valuesArray] PrimitiveCListSave valuesArray
     */

    /**
     * Constructs a new PrimitiveCListSave.
     * @exports PrimitiveCListSave
     * @classdesc Represents a PrimitiveCListSave.
     * @implements IPrimitiveCListSave
     * @constructor
     * @param {IPrimitiveCListSave=} [properties] Properties to set
     */
    function PrimitiveCListSave(properties) {
        this.senderCounters = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * PrimitiveCListSave locs.
     * @member {Uint8Array} locs
     * @memberof PrimitiveCListSave
     * @instance
     */
    PrimitiveCListSave.prototype.locs = $util.newBuffer([]);

    /**
     * PrimitiveCListSave senderCounters.
     * @member {Array.<number>} senderCounters
     * @memberof PrimitiveCListSave
     * @instance
     */
    PrimitiveCListSave.prototype.senderCounters = $util.emptyArray;

    /**
     * PrimitiveCListSave values.
     * @member {Uint8Array} values
     * @memberof PrimitiveCListSave
     * @instance
     */
    PrimitiveCListSave.prototype.values = $util.newBuffer([]);

    /**
     * PrimitiveCListSave valuesArray.
     * @member {IPrimitiveCListValueArrayMessage|null|undefined} valuesArray
     * @memberof PrimitiveCListSave
     * @instance
     */
    PrimitiveCListSave.prototype.valuesArray = null;

    // OneOf field names bound to virtual getters and setters
    var $oneOfFields;

    /**
     * PrimitiveCListSave valueType.
     * @member {"values"|"valuesArray"|undefined} valueType
     * @memberof PrimitiveCListSave
     * @instance
     */
    Object.defineProperty(PrimitiveCListSave.prototype, "valueType", {
        get: $util.oneOfGetter($oneOfFields = ["values", "valuesArray"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new PrimitiveCListSave instance using the specified properties.
     * @function create
     * @memberof PrimitiveCListSave
     * @static
     * @param {IPrimitiveCListSave=} [properties] Properties to set
     * @returns {PrimitiveCListSave} PrimitiveCListSave instance
     */
    PrimitiveCListSave.create = function create(properties) {
        return new PrimitiveCListSave(properties);
    };

    /**
     * Encodes the specified PrimitiveCListSave message. Does not implicitly {@link PrimitiveCListSave.verify|verify} messages.
     * @function encode
     * @memberof PrimitiveCListSave
     * @static
     * @param {IPrimitiveCListSave} message PrimitiveCListSave message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PrimitiveCListSave.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.locs);
        if (message.senderCounters != null && message.senderCounters.length) {
            writer.uint32(/* id 2, wireType 2 =*/18).fork();
            for (var i = 0; i < message.senderCounters.length; ++i)
                writer.uint32(message.senderCounters[i]);
            writer.ldelim();
        }
        if (message.values != null && Object.hasOwnProperty.call(message, "values"))
            writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.values);
        if (message.valuesArray != null && Object.hasOwnProperty.call(message, "valuesArray"))
            $root.PrimitiveCListValueArrayMessage.encode(message.valuesArray, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified PrimitiveCListSave message, length delimited. Does not implicitly {@link PrimitiveCListSave.verify|verify} messages.
     * @function encodeDelimited
     * @memberof PrimitiveCListSave
     * @static
     * @param {IPrimitiveCListSave} message PrimitiveCListSave message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PrimitiveCListSave.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a PrimitiveCListSave message from the specified reader or buffer.
     * @function decode
     * @memberof PrimitiveCListSave
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {PrimitiveCListSave} PrimitiveCListSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PrimitiveCListSave.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PrimitiveCListSave();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.locs = reader.bytes();
                break;
            case 2:
                if (!(message.senderCounters && message.senderCounters.length))
                    message.senderCounters = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.senderCounters.push(reader.uint32());
                } else
                    message.senderCounters.push(reader.uint32());
                break;
            case 3:
                message.values = reader.bytes();
                break;
            case 4:
                message.valuesArray = $root.PrimitiveCListValueArrayMessage.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("locs"))
            throw $util.ProtocolError("missing required 'locs'", { instance: message });
        return message;
    };

    /**
     * Decodes a PrimitiveCListSave message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof PrimitiveCListSave
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {PrimitiveCListSave} PrimitiveCListSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PrimitiveCListSave.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a PrimitiveCListSave message.
     * @function verify
     * @memberof PrimitiveCListSave
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    PrimitiveCListSave.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        var properties = {};
        if (!(message.locs && typeof message.locs.length === "number" || $util.isString(message.locs)))
            return "locs: buffer expected";
        if (message.senderCounters != null && message.hasOwnProperty("senderCounters")) {
            if (!Array.isArray(message.senderCounters))
                return "senderCounters: array expected";
            for (var i = 0; i < message.senderCounters.length; ++i)
                if (!$util.isInteger(message.senderCounters[i]))
                    return "senderCounters: integer[] expected";
        }
        if (message.values != null && message.hasOwnProperty("values")) {
            properties.valueType = 1;
            if (!(message.values && typeof message.values.length === "number" || $util.isString(message.values)))
                return "values: buffer expected";
        }
        if (message.valuesArray != null && message.hasOwnProperty("valuesArray")) {
            if (properties.valueType === 1)
                return "valueType: multiple values";
            properties.valueType = 1;
            {
                var error = $root.PrimitiveCListValueArrayMessage.verify(message.valuesArray);
                if (error)
                    return "valuesArray." + error;
            }
        }
        return null;
    };

    /**
     * Creates a PrimitiveCListSave message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PrimitiveCListSave
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {PrimitiveCListSave} PrimitiveCListSave
     */
    PrimitiveCListSave.fromObject = function fromObject(object) {
        if (object instanceof $root.PrimitiveCListSave)
            return object;
        var message = new $root.PrimitiveCListSave();
        if (object.locs != null)
            if (typeof object.locs === "string")
                $util.base64.decode(object.locs, message.locs = $util.newBuffer($util.base64.length(object.locs)), 0);
            else if (object.locs.length)
                message.locs = object.locs;
        if (object.senderCounters) {
            if (!Array.isArray(object.senderCounters))
                throw TypeError(".PrimitiveCListSave.senderCounters: array expected");
            message.senderCounters = [];
            for (var i = 0; i < object.senderCounters.length; ++i)
                message.senderCounters[i] = object.senderCounters[i] >>> 0;
        }
        if (object.values != null)
            if (typeof object.values === "string")
                $util.base64.decode(object.values, message.values = $util.newBuffer($util.base64.length(object.values)), 0);
            else if (object.values.length)
                message.values = object.values;
        if (object.valuesArray != null) {
            if (typeof object.valuesArray !== "object")
                throw TypeError(".PrimitiveCListSave.valuesArray: object expected");
            message.valuesArray = $root.PrimitiveCListValueArrayMessage.fromObject(object.valuesArray);
        }
        return message;
    };

    /**
     * Creates a plain object from a PrimitiveCListSave message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PrimitiveCListSave
     * @static
     * @param {PrimitiveCListSave} message PrimitiveCListSave
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PrimitiveCListSave.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.senderCounters = [];
        if (options.defaults)
            if (options.bytes === String)
                object.locs = "";
            else {
                object.locs = [];
                if (options.bytes !== Array)
                    object.locs = $util.newBuffer(object.locs);
            }
        if (message.locs != null && message.hasOwnProperty("locs"))
            object.locs = options.bytes === String ? $util.base64.encode(message.locs, 0, message.locs.length) : options.bytes === Array ? Array.prototype.slice.call(message.locs) : message.locs;
        if (message.senderCounters && message.senderCounters.length) {
            object.senderCounters = [];
            for (var j = 0; j < message.senderCounters.length; ++j)
                object.senderCounters[j] = message.senderCounters[j];
        }
        if (message.values != null && message.hasOwnProperty("values")) {
            object.values = options.bytes === String ? $util.base64.encode(message.values, 0, message.values.length) : options.bytes === Array ? Array.prototype.slice.call(message.values) : message.values;
            if (options.oneofs)
                object.valueType = "values";
        }
        if (message.valuesArray != null && message.hasOwnProperty("valuesArray")) {
            object.valuesArray = $root.PrimitiveCListValueArrayMessage.toObject(message.valuesArray, options);
            if (options.oneofs)
                object.valueType = "valuesArray";
        }
        return object;
    };

    /**
     * Converts this PrimitiveCListSave to JSON.
     * @function toJSON
     * @memberof PrimitiveCListSave
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PrimitiveCListSave.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return PrimitiveCListSave;
})();

$root.TreedocLocMessage = (function() {

    /**
     * Properties of a TreedocLocMessage.
     * @exports ITreedocLocMessage
     * @interface ITreedocLocMessage
     * @property {Uint8Array} path TreedocLocMessage path
     * @property {Array.<number>|null} [disIndices] TreedocLocMessage disIndices
     * @property {Array.<string>|null} [disSendersIndex] TreedocLocMessage disSendersIndex
     * @property {Array.<number>|null} [disSenders] TreedocLocMessage disSenders
     * @property {Array.<number>|null} [disUniqueNumbers] TreedocLocMessage disUniqueNumbers
     */

    /**
     * Constructs a new TreedocLocMessage.
     * @exports TreedocLocMessage
     * @classdesc Represents a TreedocLocMessage.
     * @implements ITreedocLocMessage
     * @constructor
     * @param {ITreedocLocMessage=} [properties] Properties to set
     */
    function TreedocLocMessage(properties) {
        this.disIndices = [];
        this.disSendersIndex = [];
        this.disSenders = [];
        this.disUniqueNumbers = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * TreedocLocMessage path.
     * @member {Uint8Array} path
     * @memberof TreedocLocMessage
     * @instance
     */
    TreedocLocMessage.prototype.path = $util.newBuffer([]);

    /**
     * TreedocLocMessage disIndices.
     * @member {Array.<number>} disIndices
     * @memberof TreedocLocMessage
     * @instance
     */
    TreedocLocMessage.prototype.disIndices = $util.emptyArray;

    /**
     * TreedocLocMessage disSendersIndex.
     * @member {Array.<string>} disSendersIndex
     * @memberof TreedocLocMessage
     * @instance
     */
    TreedocLocMessage.prototype.disSendersIndex = $util.emptyArray;

    /**
     * TreedocLocMessage disSenders.
     * @member {Array.<number>} disSenders
     * @memberof TreedocLocMessage
     * @instance
     */
    TreedocLocMessage.prototype.disSenders = $util.emptyArray;

    /**
     * TreedocLocMessage disUniqueNumbers.
     * @member {Array.<number>} disUniqueNumbers
     * @memberof TreedocLocMessage
     * @instance
     */
    TreedocLocMessage.prototype.disUniqueNumbers = $util.emptyArray;

    /**
     * Creates a new TreedocLocMessage instance using the specified properties.
     * @function create
     * @memberof TreedocLocMessage
     * @static
     * @param {ITreedocLocMessage=} [properties] Properties to set
     * @returns {TreedocLocMessage} TreedocLocMessage instance
     */
    TreedocLocMessage.create = function create(properties) {
        return new TreedocLocMessage(properties);
    };

    /**
     * Encodes the specified TreedocLocMessage message. Does not implicitly {@link TreedocLocMessage.verify|verify} messages.
     * @function encode
     * @memberof TreedocLocMessage
     * @static
     * @param {ITreedocLocMessage} message TreedocLocMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    TreedocLocMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.path);
        if (message.disIndices != null && message.disIndices.length) {
            writer.uint32(/* id 2, wireType 2 =*/18).fork();
            for (var i = 0; i < message.disIndices.length; ++i)
                writer.uint32(message.disIndices[i]);
            writer.ldelim();
        }
        if (message.disSendersIndex != null && message.disSendersIndex.length)
            for (var i = 0; i < message.disSendersIndex.length; ++i)
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.disSendersIndex[i]);
        if (message.disSenders != null && message.disSenders.length) {
            writer.uint32(/* id 4, wireType 2 =*/34).fork();
            for (var i = 0; i < message.disSenders.length; ++i)
                writer.uint32(message.disSenders[i]);
            writer.ldelim();
        }
        if (message.disUniqueNumbers != null && message.disUniqueNumbers.length) {
            writer.uint32(/* id 5, wireType 2 =*/42).fork();
            for (var i = 0; i < message.disUniqueNumbers.length; ++i)
                writer.sint32(message.disUniqueNumbers[i]);
            writer.ldelim();
        }
        return writer;
    };

    /**
     * Encodes the specified TreedocLocMessage message, length delimited. Does not implicitly {@link TreedocLocMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof TreedocLocMessage
     * @static
     * @param {ITreedocLocMessage} message TreedocLocMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    TreedocLocMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a TreedocLocMessage message from the specified reader or buffer.
     * @function decode
     * @memberof TreedocLocMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {TreedocLocMessage} TreedocLocMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    TreedocLocMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.TreedocLocMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.path = reader.bytes();
                break;
            case 2:
                if (!(message.disIndices && message.disIndices.length))
                    message.disIndices = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.disIndices.push(reader.uint32());
                } else
                    message.disIndices.push(reader.uint32());
                break;
            case 3:
                if (!(message.disSendersIndex && message.disSendersIndex.length))
                    message.disSendersIndex = [];
                message.disSendersIndex.push(reader.string());
                break;
            case 4:
                if (!(message.disSenders && message.disSenders.length))
                    message.disSenders = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.disSenders.push(reader.uint32());
                } else
                    message.disSenders.push(reader.uint32());
                break;
            case 5:
                if (!(message.disUniqueNumbers && message.disUniqueNumbers.length))
                    message.disUniqueNumbers = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.disUniqueNumbers.push(reader.sint32());
                } else
                    message.disUniqueNumbers.push(reader.sint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("path"))
            throw $util.ProtocolError("missing required 'path'", { instance: message });
        return message;
    };

    /**
     * Decodes a TreedocLocMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof TreedocLocMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {TreedocLocMessage} TreedocLocMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    TreedocLocMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a TreedocLocMessage message.
     * @function verify
     * @memberof TreedocLocMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    TreedocLocMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!(message.path && typeof message.path.length === "number" || $util.isString(message.path)))
            return "path: buffer expected";
        if (message.disIndices != null && message.hasOwnProperty("disIndices")) {
            if (!Array.isArray(message.disIndices))
                return "disIndices: array expected";
            for (var i = 0; i < message.disIndices.length; ++i)
                if (!$util.isInteger(message.disIndices[i]))
                    return "disIndices: integer[] expected";
        }
        if (message.disSendersIndex != null && message.hasOwnProperty("disSendersIndex")) {
            if (!Array.isArray(message.disSendersIndex))
                return "disSendersIndex: array expected";
            for (var i = 0; i < message.disSendersIndex.length; ++i)
                if (!$util.isString(message.disSendersIndex[i]))
                    return "disSendersIndex: string[] expected";
        }
        if (message.disSenders != null && message.hasOwnProperty("disSenders")) {
            if (!Array.isArray(message.disSenders))
                return "disSenders: array expected";
            for (var i = 0; i < message.disSenders.length; ++i)
                if (!$util.isInteger(message.disSenders[i]))
                    return "disSenders: integer[] expected";
        }
        if (message.disUniqueNumbers != null && message.hasOwnProperty("disUniqueNumbers")) {
            if (!Array.isArray(message.disUniqueNumbers))
                return "disUniqueNumbers: array expected";
            for (var i = 0; i < message.disUniqueNumbers.length; ++i)
                if (!$util.isInteger(message.disUniqueNumbers[i]))
                    return "disUniqueNumbers: integer[] expected";
        }
        return null;
    };

    /**
     * Creates a TreedocLocMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof TreedocLocMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {TreedocLocMessage} TreedocLocMessage
     */
    TreedocLocMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.TreedocLocMessage)
            return object;
        var message = new $root.TreedocLocMessage();
        if (object.path != null)
            if (typeof object.path === "string")
                $util.base64.decode(object.path, message.path = $util.newBuffer($util.base64.length(object.path)), 0);
            else if (object.path.length)
                message.path = object.path;
        if (object.disIndices) {
            if (!Array.isArray(object.disIndices))
                throw TypeError(".TreedocLocMessage.disIndices: array expected");
            message.disIndices = [];
            for (var i = 0; i < object.disIndices.length; ++i)
                message.disIndices[i] = object.disIndices[i] >>> 0;
        }
        if (object.disSendersIndex) {
            if (!Array.isArray(object.disSendersIndex))
                throw TypeError(".TreedocLocMessage.disSendersIndex: array expected");
            message.disSendersIndex = [];
            for (var i = 0; i < object.disSendersIndex.length; ++i)
                message.disSendersIndex[i] = String(object.disSendersIndex[i]);
        }
        if (object.disSenders) {
            if (!Array.isArray(object.disSenders))
                throw TypeError(".TreedocLocMessage.disSenders: array expected");
            message.disSenders = [];
            for (var i = 0; i < object.disSenders.length; ++i)
                message.disSenders[i] = object.disSenders[i] >>> 0;
        }
        if (object.disUniqueNumbers) {
            if (!Array.isArray(object.disUniqueNumbers))
                throw TypeError(".TreedocLocMessage.disUniqueNumbers: array expected");
            message.disUniqueNumbers = [];
            for (var i = 0; i < object.disUniqueNumbers.length; ++i)
                message.disUniqueNumbers[i] = object.disUniqueNumbers[i] | 0;
        }
        return message;
    };

    /**
     * Creates a plain object from a TreedocLocMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof TreedocLocMessage
     * @static
     * @param {TreedocLocMessage} message TreedocLocMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    TreedocLocMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults) {
            object.disIndices = [];
            object.disSendersIndex = [];
            object.disSenders = [];
            object.disUniqueNumbers = [];
        }
        if (options.defaults)
            if (options.bytes === String)
                object.path = "";
            else {
                object.path = [];
                if (options.bytes !== Array)
                    object.path = $util.newBuffer(object.path);
            }
        if (message.path != null && message.hasOwnProperty("path"))
            object.path = options.bytes === String ? $util.base64.encode(message.path, 0, message.path.length) : options.bytes === Array ? Array.prototype.slice.call(message.path) : message.path;
        if (message.disIndices && message.disIndices.length) {
            object.disIndices = [];
            for (var j = 0; j < message.disIndices.length; ++j)
                object.disIndices[j] = message.disIndices[j];
        }
        if (message.disSendersIndex && message.disSendersIndex.length) {
            object.disSendersIndex = [];
            for (var j = 0; j < message.disSendersIndex.length; ++j)
                object.disSendersIndex[j] = message.disSendersIndex[j];
        }
        if (message.disSenders && message.disSenders.length) {
            object.disSenders = [];
            for (var j = 0; j < message.disSenders.length; ++j)
                object.disSenders[j] = message.disSenders[j];
        }
        if (message.disUniqueNumbers && message.disUniqueNumbers.length) {
            object.disUniqueNumbers = [];
            for (var j = 0; j < message.disUniqueNumbers.length; ++j)
                object.disUniqueNumbers[j] = message.disUniqueNumbers[j];
        }
        return object;
    };

    /**
     * Converts this TreedocLocMessage to JSON.
     * @function toJSON
     * @memberof TreedocLocMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    TreedocLocMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return TreedocLocMessage;
})();

$root.TreedocLocWrapperMessage = (function() {

    /**
     * Properties of a TreedocLocWrapperMessage.
     * @exports ITreedocLocWrapperMessage
     * @interface ITreedocLocWrapperMessage
     * @property {Uint8Array} anchor TreedocLocWrapperMessage anchor
     * @property {string} sender TreedocLocWrapperMessage sender
     * @property {number} uniqueNumber TreedocLocWrapperMessage uniqueNumber
     */

    /**
     * Constructs a new TreedocLocWrapperMessage.
     * @exports TreedocLocWrapperMessage
     * @classdesc Represents a TreedocLocWrapperMessage.
     * @implements ITreedocLocWrapperMessage
     * @constructor
     * @param {ITreedocLocWrapperMessage=} [properties] Properties to set
     */
    function TreedocLocWrapperMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * TreedocLocWrapperMessage anchor.
     * @member {Uint8Array} anchor
     * @memberof TreedocLocWrapperMessage
     * @instance
     */
    TreedocLocWrapperMessage.prototype.anchor = $util.newBuffer([]);

    /**
     * TreedocLocWrapperMessage sender.
     * @member {string} sender
     * @memberof TreedocLocWrapperMessage
     * @instance
     */
    TreedocLocWrapperMessage.prototype.sender = "";

    /**
     * TreedocLocWrapperMessage uniqueNumber.
     * @member {number} uniqueNumber
     * @memberof TreedocLocWrapperMessage
     * @instance
     */
    TreedocLocWrapperMessage.prototype.uniqueNumber = 0;

    /**
     * Creates a new TreedocLocWrapperMessage instance using the specified properties.
     * @function create
     * @memberof TreedocLocWrapperMessage
     * @static
     * @param {ITreedocLocWrapperMessage=} [properties] Properties to set
     * @returns {TreedocLocWrapperMessage} TreedocLocWrapperMessage instance
     */
    TreedocLocWrapperMessage.create = function create(properties) {
        return new TreedocLocWrapperMessage(properties);
    };

    /**
     * Encodes the specified TreedocLocWrapperMessage message. Does not implicitly {@link TreedocLocWrapperMessage.verify|verify} messages.
     * @function encode
     * @memberof TreedocLocWrapperMessage
     * @static
     * @param {ITreedocLocWrapperMessage} message TreedocLocWrapperMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    TreedocLocWrapperMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.anchor);
        writer.uint32(/* id 2, wireType 2 =*/18).string(message.sender);
        writer.uint32(/* id 3, wireType 0 =*/24).sint32(message.uniqueNumber);
        return writer;
    };

    /**
     * Encodes the specified TreedocLocWrapperMessage message, length delimited. Does not implicitly {@link TreedocLocWrapperMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof TreedocLocWrapperMessage
     * @static
     * @param {ITreedocLocWrapperMessage} message TreedocLocWrapperMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    TreedocLocWrapperMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a TreedocLocWrapperMessage message from the specified reader or buffer.
     * @function decode
     * @memberof TreedocLocWrapperMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {TreedocLocWrapperMessage} TreedocLocWrapperMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    TreedocLocWrapperMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.TreedocLocWrapperMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.anchor = reader.bytes();
                break;
            case 2:
                message.sender = reader.string();
                break;
            case 3:
                message.uniqueNumber = reader.sint32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("anchor"))
            throw $util.ProtocolError("missing required 'anchor'", { instance: message });
        if (!message.hasOwnProperty("sender"))
            throw $util.ProtocolError("missing required 'sender'", { instance: message });
        if (!message.hasOwnProperty("uniqueNumber"))
            throw $util.ProtocolError("missing required 'uniqueNumber'", { instance: message });
        return message;
    };

    /**
     * Decodes a TreedocLocWrapperMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof TreedocLocWrapperMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {TreedocLocWrapperMessage} TreedocLocWrapperMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    TreedocLocWrapperMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a TreedocLocWrapperMessage message.
     * @function verify
     * @memberof TreedocLocWrapperMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    TreedocLocWrapperMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!(message.anchor && typeof message.anchor.length === "number" || $util.isString(message.anchor)))
            return "anchor: buffer expected";
        if (!$util.isString(message.sender))
            return "sender: string expected";
        if (!$util.isInteger(message.uniqueNumber))
            return "uniqueNumber: integer expected";
        return null;
    };

    /**
     * Creates a TreedocLocWrapperMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof TreedocLocWrapperMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {TreedocLocWrapperMessage} TreedocLocWrapperMessage
     */
    TreedocLocWrapperMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.TreedocLocWrapperMessage)
            return object;
        var message = new $root.TreedocLocWrapperMessage();
        if (object.anchor != null)
            if (typeof object.anchor === "string")
                $util.base64.decode(object.anchor, message.anchor = $util.newBuffer($util.base64.length(object.anchor)), 0);
            else if (object.anchor.length)
                message.anchor = object.anchor;
        if (object.sender != null)
            message.sender = String(object.sender);
        if (object.uniqueNumber != null)
            message.uniqueNumber = object.uniqueNumber | 0;
        return message;
    };

    /**
     * Creates a plain object from a TreedocLocWrapperMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof TreedocLocWrapperMessage
     * @static
     * @param {TreedocLocWrapperMessage} message TreedocLocWrapperMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    TreedocLocWrapperMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if (options.bytes === String)
                object.anchor = "";
            else {
                object.anchor = [];
                if (options.bytes !== Array)
                    object.anchor = $util.newBuffer(object.anchor);
            }
            object.sender = "";
            object.uniqueNumber = 0;
        }
        if (message.anchor != null && message.hasOwnProperty("anchor"))
            object.anchor = options.bytes === String ? $util.base64.encode(message.anchor, 0, message.anchor.length) : options.bytes === Array ? Array.prototype.slice.call(message.anchor) : message.anchor;
        if (message.sender != null && message.hasOwnProperty("sender"))
            object.sender = message.sender;
        if (message.uniqueNumber != null && message.hasOwnProperty("uniqueNumber"))
            object.uniqueNumber = message.uniqueNumber;
        return object;
    };

    /**
     * Converts this TreedocLocWrapperMessage to JSON.
     * @function toJSON
     * @memberof TreedocLocWrapperMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    TreedocLocWrapperMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return TreedocLocWrapperMessage;
})();

$root.TreedocDenseLocalListSave = (function() {

    /**
     * Properties of a TreedocDenseLocalListSave.
     * @exports ITreedocDenseLocalListSave
     * @interface ITreedocDenseLocalListSave
     * @property {Array.<Uint8Array>|null} [anchors] TreedocDenseLocalListSave anchors
     * @property {Array.<string>|null} [senders] TreedocDenseLocalListSave senders
     * @property {Array.<number>|null} [anchorIndices] TreedocDenseLocalListSave anchorIndices
     * @property {Array.<number>|null} [senderIndices] TreedocDenseLocalListSave senderIndices
     * @property {Array.<number>|null} [uniqueNumbers] TreedocDenseLocalListSave uniqueNumbers
     */

    /**
     * Constructs a new TreedocDenseLocalListSave.
     * @exports TreedocDenseLocalListSave
     * @classdesc Represents a TreedocDenseLocalListSave.
     * @implements ITreedocDenseLocalListSave
     * @constructor
     * @param {ITreedocDenseLocalListSave=} [properties] Properties to set
     */
    function TreedocDenseLocalListSave(properties) {
        this.anchors = [];
        this.senders = [];
        this.anchorIndices = [];
        this.senderIndices = [];
        this.uniqueNumbers = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * TreedocDenseLocalListSave anchors.
     * @member {Array.<Uint8Array>} anchors
     * @memberof TreedocDenseLocalListSave
     * @instance
     */
    TreedocDenseLocalListSave.prototype.anchors = $util.emptyArray;

    /**
     * TreedocDenseLocalListSave senders.
     * @member {Array.<string>} senders
     * @memberof TreedocDenseLocalListSave
     * @instance
     */
    TreedocDenseLocalListSave.prototype.senders = $util.emptyArray;

    /**
     * TreedocDenseLocalListSave anchorIndices.
     * @member {Array.<number>} anchorIndices
     * @memberof TreedocDenseLocalListSave
     * @instance
     */
    TreedocDenseLocalListSave.prototype.anchorIndices = $util.emptyArray;

    /**
     * TreedocDenseLocalListSave senderIndices.
     * @member {Array.<number>} senderIndices
     * @memberof TreedocDenseLocalListSave
     * @instance
     */
    TreedocDenseLocalListSave.prototype.senderIndices = $util.emptyArray;

    /**
     * TreedocDenseLocalListSave uniqueNumbers.
     * @member {Array.<number>} uniqueNumbers
     * @memberof TreedocDenseLocalListSave
     * @instance
     */
    TreedocDenseLocalListSave.prototype.uniqueNumbers = $util.emptyArray;

    /**
     * Creates a new TreedocDenseLocalListSave instance using the specified properties.
     * @function create
     * @memberof TreedocDenseLocalListSave
     * @static
     * @param {ITreedocDenseLocalListSave=} [properties] Properties to set
     * @returns {TreedocDenseLocalListSave} TreedocDenseLocalListSave instance
     */
    TreedocDenseLocalListSave.create = function create(properties) {
        return new TreedocDenseLocalListSave(properties);
    };

    /**
     * Encodes the specified TreedocDenseLocalListSave message. Does not implicitly {@link TreedocDenseLocalListSave.verify|verify} messages.
     * @function encode
     * @memberof TreedocDenseLocalListSave
     * @static
     * @param {ITreedocDenseLocalListSave} message TreedocDenseLocalListSave message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    TreedocDenseLocalListSave.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.anchors != null && message.anchors.length)
            for (var i = 0; i < message.anchors.length; ++i)
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.anchors[i]);
        if (message.senders != null && message.senders.length)
            for (var i = 0; i < message.senders.length; ++i)
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.senders[i]);
        if (message.anchorIndices != null && message.anchorIndices.length) {
            writer.uint32(/* id 3, wireType 2 =*/26).fork();
            for (var i = 0; i < message.anchorIndices.length; ++i)
                writer.uint32(message.anchorIndices[i]);
            writer.ldelim();
        }
        if (message.senderIndices != null && message.senderIndices.length) {
            writer.uint32(/* id 4, wireType 2 =*/34).fork();
            for (var i = 0; i < message.senderIndices.length; ++i)
                writer.uint32(message.senderIndices[i]);
            writer.ldelim();
        }
        if (message.uniqueNumbers != null && message.uniqueNumbers.length) {
            writer.uint32(/* id 5, wireType 2 =*/42).fork();
            for (var i = 0; i < message.uniqueNumbers.length; ++i)
                writer.sint32(message.uniqueNumbers[i]);
            writer.ldelim();
        }
        return writer;
    };

    /**
     * Encodes the specified TreedocDenseLocalListSave message, length delimited. Does not implicitly {@link TreedocDenseLocalListSave.verify|verify} messages.
     * @function encodeDelimited
     * @memberof TreedocDenseLocalListSave
     * @static
     * @param {ITreedocDenseLocalListSave} message TreedocDenseLocalListSave message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    TreedocDenseLocalListSave.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a TreedocDenseLocalListSave message from the specified reader or buffer.
     * @function decode
     * @memberof TreedocDenseLocalListSave
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {TreedocDenseLocalListSave} TreedocDenseLocalListSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    TreedocDenseLocalListSave.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.TreedocDenseLocalListSave();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.anchors && message.anchors.length))
                    message.anchors = [];
                message.anchors.push(reader.bytes());
                break;
            case 2:
                if (!(message.senders && message.senders.length))
                    message.senders = [];
                message.senders.push(reader.string());
                break;
            case 3:
                if (!(message.anchorIndices && message.anchorIndices.length))
                    message.anchorIndices = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.anchorIndices.push(reader.uint32());
                } else
                    message.anchorIndices.push(reader.uint32());
                break;
            case 4:
                if (!(message.senderIndices && message.senderIndices.length))
                    message.senderIndices = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.senderIndices.push(reader.uint32());
                } else
                    message.senderIndices.push(reader.uint32());
                break;
            case 5:
                if (!(message.uniqueNumbers && message.uniqueNumbers.length))
                    message.uniqueNumbers = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.uniqueNumbers.push(reader.sint32());
                } else
                    message.uniqueNumbers.push(reader.sint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a TreedocDenseLocalListSave message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof TreedocDenseLocalListSave
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {TreedocDenseLocalListSave} TreedocDenseLocalListSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    TreedocDenseLocalListSave.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a TreedocDenseLocalListSave message.
     * @function verify
     * @memberof TreedocDenseLocalListSave
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    TreedocDenseLocalListSave.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.anchors != null && message.hasOwnProperty("anchors")) {
            if (!Array.isArray(message.anchors))
                return "anchors: array expected";
            for (var i = 0; i < message.anchors.length; ++i)
                if (!(message.anchors[i] && typeof message.anchors[i].length === "number" || $util.isString(message.anchors[i])))
                    return "anchors: buffer[] expected";
        }
        if (message.senders != null && message.hasOwnProperty("senders")) {
            if (!Array.isArray(message.senders))
                return "senders: array expected";
            for (var i = 0; i < message.senders.length; ++i)
                if (!$util.isString(message.senders[i]))
                    return "senders: string[] expected";
        }
        if (message.anchorIndices != null && message.hasOwnProperty("anchorIndices")) {
            if (!Array.isArray(message.anchorIndices))
                return "anchorIndices: array expected";
            for (var i = 0; i < message.anchorIndices.length; ++i)
                if (!$util.isInteger(message.anchorIndices[i]))
                    return "anchorIndices: integer[] expected";
        }
        if (message.senderIndices != null && message.hasOwnProperty("senderIndices")) {
            if (!Array.isArray(message.senderIndices))
                return "senderIndices: array expected";
            for (var i = 0; i < message.senderIndices.length; ++i)
                if (!$util.isInteger(message.senderIndices[i]))
                    return "senderIndices: integer[] expected";
        }
        if (message.uniqueNumbers != null && message.hasOwnProperty("uniqueNumbers")) {
            if (!Array.isArray(message.uniqueNumbers))
                return "uniqueNumbers: array expected";
            for (var i = 0; i < message.uniqueNumbers.length; ++i)
                if (!$util.isInteger(message.uniqueNumbers[i]))
                    return "uniqueNumbers: integer[] expected";
        }
        return null;
    };

    /**
     * Creates a TreedocDenseLocalListSave message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof TreedocDenseLocalListSave
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {TreedocDenseLocalListSave} TreedocDenseLocalListSave
     */
    TreedocDenseLocalListSave.fromObject = function fromObject(object) {
        if (object instanceof $root.TreedocDenseLocalListSave)
            return object;
        var message = new $root.TreedocDenseLocalListSave();
        if (object.anchors) {
            if (!Array.isArray(object.anchors))
                throw TypeError(".TreedocDenseLocalListSave.anchors: array expected");
            message.anchors = [];
            for (var i = 0; i < object.anchors.length; ++i)
                if (typeof object.anchors[i] === "string")
                    $util.base64.decode(object.anchors[i], message.anchors[i] = $util.newBuffer($util.base64.length(object.anchors[i])), 0);
                else if (object.anchors[i].length)
                    message.anchors[i] = object.anchors[i];
        }
        if (object.senders) {
            if (!Array.isArray(object.senders))
                throw TypeError(".TreedocDenseLocalListSave.senders: array expected");
            message.senders = [];
            for (var i = 0; i < object.senders.length; ++i)
                message.senders[i] = String(object.senders[i]);
        }
        if (object.anchorIndices) {
            if (!Array.isArray(object.anchorIndices))
                throw TypeError(".TreedocDenseLocalListSave.anchorIndices: array expected");
            message.anchorIndices = [];
            for (var i = 0; i < object.anchorIndices.length; ++i)
                message.anchorIndices[i] = object.anchorIndices[i] >>> 0;
        }
        if (object.senderIndices) {
            if (!Array.isArray(object.senderIndices))
                throw TypeError(".TreedocDenseLocalListSave.senderIndices: array expected");
            message.senderIndices = [];
            for (var i = 0; i < object.senderIndices.length; ++i)
                message.senderIndices[i] = object.senderIndices[i] >>> 0;
        }
        if (object.uniqueNumbers) {
            if (!Array.isArray(object.uniqueNumbers))
                throw TypeError(".TreedocDenseLocalListSave.uniqueNumbers: array expected");
            message.uniqueNumbers = [];
            for (var i = 0; i < object.uniqueNumbers.length; ++i)
                message.uniqueNumbers[i] = object.uniqueNumbers[i] | 0;
        }
        return message;
    };

    /**
     * Creates a plain object from a TreedocDenseLocalListSave message. Also converts values to other types if specified.
     * @function toObject
     * @memberof TreedocDenseLocalListSave
     * @static
     * @param {TreedocDenseLocalListSave} message TreedocDenseLocalListSave
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    TreedocDenseLocalListSave.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults) {
            object.anchors = [];
            object.senders = [];
            object.anchorIndices = [];
            object.senderIndices = [];
            object.uniqueNumbers = [];
        }
        if (message.anchors && message.anchors.length) {
            object.anchors = [];
            for (var j = 0; j < message.anchors.length; ++j)
                object.anchors[j] = options.bytes === String ? $util.base64.encode(message.anchors[j], 0, message.anchors[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.anchors[j]) : message.anchors[j];
        }
        if (message.senders && message.senders.length) {
            object.senders = [];
            for (var j = 0; j < message.senders.length; ++j)
                object.senders[j] = message.senders[j];
        }
        if (message.anchorIndices && message.anchorIndices.length) {
            object.anchorIndices = [];
            for (var j = 0; j < message.anchorIndices.length; ++j)
                object.anchorIndices[j] = message.anchorIndices[j];
        }
        if (message.senderIndices && message.senderIndices.length) {
            object.senderIndices = [];
            for (var j = 0; j < message.senderIndices.length; ++j)
                object.senderIndices[j] = message.senderIndices[j];
        }
        if (message.uniqueNumbers && message.uniqueNumbers.length) {
            object.uniqueNumbers = [];
            for (var j = 0; j < message.uniqueNumbers.length; ++j)
                object.uniqueNumbers[j] = message.uniqueNumbers[j];
        }
        return object;
    };

    /**
     * Converts this TreedocDenseLocalListSave to JSON.
     * @function toJSON
     * @memberof TreedocDenseLocalListSave
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    TreedocDenseLocalListSave.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return TreedocDenseLocalListSave;
})();

$root.GrowOnlyCCounterAddMessage = (function() {

    /**
     * Properties of a GrowOnlyCCounterAddMessage.
     * @exports IGrowOnlyCCounterAddMessage
     * @interface IGrowOnlyCCounterAddMessage
     * @property {number} toAdd GrowOnlyCCounterAddMessage toAdd
     * @property {number} prOld GrowOnlyCCounterAddMessage prOld
     * @property {number} idCounter GrowOnlyCCounterAddMessage idCounter
     */

    /**
     * Constructs a new GrowOnlyCCounterAddMessage.
     * @exports GrowOnlyCCounterAddMessage
     * @classdesc Represents a GrowOnlyCCounterAddMessage.
     * @implements IGrowOnlyCCounterAddMessage
     * @constructor
     * @param {IGrowOnlyCCounterAddMessage=} [properties] Properties to set
     */
    function GrowOnlyCCounterAddMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GrowOnlyCCounterAddMessage toAdd.
     * @member {number} toAdd
     * @memberof GrowOnlyCCounterAddMessage
     * @instance
     */
    GrowOnlyCCounterAddMessage.prototype.toAdd = 0;

    /**
     * GrowOnlyCCounterAddMessage prOld.
     * @member {number} prOld
     * @memberof GrowOnlyCCounterAddMessage
     * @instance
     */
    GrowOnlyCCounterAddMessage.prototype.prOld = 0;

    /**
     * GrowOnlyCCounterAddMessage idCounter.
     * @member {number} idCounter
     * @memberof GrowOnlyCCounterAddMessage
     * @instance
     */
    GrowOnlyCCounterAddMessage.prototype.idCounter = 0;

    /**
     * Creates a new GrowOnlyCCounterAddMessage instance using the specified properties.
     * @function create
     * @memberof GrowOnlyCCounterAddMessage
     * @static
     * @param {IGrowOnlyCCounterAddMessage=} [properties] Properties to set
     * @returns {GrowOnlyCCounterAddMessage} GrowOnlyCCounterAddMessage instance
     */
    GrowOnlyCCounterAddMessage.create = function create(properties) {
        return new GrowOnlyCCounterAddMessage(properties);
    };

    /**
     * Encodes the specified GrowOnlyCCounterAddMessage message. Does not implicitly {@link GrowOnlyCCounterAddMessage.verify|verify} messages.
     * @function encode
     * @memberof GrowOnlyCCounterAddMessage
     * @static
     * @param {IGrowOnlyCCounterAddMessage} message GrowOnlyCCounterAddMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GrowOnlyCCounterAddMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.toAdd);
        writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.prOld);
        writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.idCounter);
        return writer;
    };

    /**
     * Encodes the specified GrowOnlyCCounterAddMessage message, length delimited. Does not implicitly {@link GrowOnlyCCounterAddMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof GrowOnlyCCounterAddMessage
     * @static
     * @param {IGrowOnlyCCounterAddMessage} message GrowOnlyCCounterAddMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GrowOnlyCCounterAddMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GrowOnlyCCounterAddMessage message from the specified reader or buffer.
     * @function decode
     * @memberof GrowOnlyCCounterAddMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GrowOnlyCCounterAddMessage} GrowOnlyCCounterAddMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GrowOnlyCCounterAddMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.GrowOnlyCCounterAddMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.toAdd = reader.uint32();
                break;
            case 2:
                message.prOld = reader.uint32();
                break;
            case 3:
                message.idCounter = reader.uint32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("toAdd"))
            throw $util.ProtocolError("missing required 'toAdd'", { instance: message });
        if (!message.hasOwnProperty("prOld"))
            throw $util.ProtocolError("missing required 'prOld'", { instance: message });
        if (!message.hasOwnProperty("idCounter"))
            throw $util.ProtocolError("missing required 'idCounter'", { instance: message });
        return message;
    };

    /**
     * Decodes a GrowOnlyCCounterAddMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof GrowOnlyCCounterAddMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GrowOnlyCCounterAddMessage} GrowOnlyCCounterAddMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GrowOnlyCCounterAddMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GrowOnlyCCounterAddMessage message.
     * @function verify
     * @memberof GrowOnlyCCounterAddMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    GrowOnlyCCounterAddMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.toAdd))
            return "toAdd: integer expected";
        if (!$util.isInteger(message.prOld))
            return "prOld: integer expected";
        if (!$util.isInteger(message.idCounter))
            return "idCounter: integer expected";
        return null;
    };

    /**
     * Creates a GrowOnlyCCounterAddMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof GrowOnlyCCounterAddMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {GrowOnlyCCounterAddMessage} GrowOnlyCCounterAddMessage
     */
    GrowOnlyCCounterAddMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.GrowOnlyCCounterAddMessage)
            return object;
        var message = new $root.GrowOnlyCCounterAddMessage();
        if (object.toAdd != null)
            message.toAdd = object.toAdd >>> 0;
        if (object.prOld != null)
            message.prOld = object.prOld >>> 0;
        if (object.idCounter != null)
            message.idCounter = object.idCounter >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a GrowOnlyCCounterAddMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof GrowOnlyCCounterAddMessage
     * @static
     * @param {GrowOnlyCCounterAddMessage} message GrowOnlyCCounterAddMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    GrowOnlyCCounterAddMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.toAdd = 0;
            object.prOld = 0;
            object.idCounter = 0;
        }
        if (message.toAdd != null && message.hasOwnProperty("toAdd"))
            object.toAdd = message.toAdd;
        if (message.prOld != null && message.hasOwnProperty("prOld"))
            object.prOld = message.prOld;
        if (message.idCounter != null && message.hasOwnProperty("idCounter"))
            object.idCounter = message.idCounter;
        return object;
    };

    /**
     * Converts this GrowOnlyCCounterAddMessage to JSON.
     * @function toJSON
     * @memberof GrowOnlyCCounterAddMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    GrowOnlyCCounterAddMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return GrowOnlyCCounterAddMessage;
})();

$root.GrowOnlyCCounterResetEntry = (function() {

    /**
     * Properties of a GrowOnlyCCounterResetEntry.
     * @exports IGrowOnlyCCounterResetEntry
     * @interface IGrowOnlyCCounterResetEntry
     * @property {number} v GrowOnlyCCounterResetEntry v
     * @property {number} idCounter GrowOnlyCCounterResetEntry idCounter
     */

    /**
     * Constructs a new GrowOnlyCCounterResetEntry.
     * @exports GrowOnlyCCounterResetEntry
     * @classdesc Represents a GrowOnlyCCounterResetEntry.
     * @implements IGrowOnlyCCounterResetEntry
     * @constructor
     * @param {IGrowOnlyCCounterResetEntry=} [properties] Properties to set
     */
    function GrowOnlyCCounterResetEntry(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GrowOnlyCCounterResetEntry v.
     * @member {number} v
     * @memberof GrowOnlyCCounterResetEntry
     * @instance
     */
    GrowOnlyCCounterResetEntry.prototype.v = 0;

    /**
     * GrowOnlyCCounterResetEntry idCounter.
     * @member {number} idCounter
     * @memberof GrowOnlyCCounterResetEntry
     * @instance
     */
    GrowOnlyCCounterResetEntry.prototype.idCounter = 0;

    /**
     * Creates a new GrowOnlyCCounterResetEntry instance using the specified properties.
     * @function create
     * @memberof GrowOnlyCCounterResetEntry
     * @static
     * @param {IGrowOnlyCCounterResetEntry=} [properties] Properties to set
     * @returns {GrowOnlyCCounterResetEntry} GrowOnlyCCounterResetEntry instance
     */
    GrowOnlyCCounterResetEntry.create = function create(properties) {
        return new GrowOnlyCCounterResetEntry(properties);
    };

    /**
     * Encodes the specified GrowOnlyCCounterResetEntry message. Does not implicitly {@link GrowOnlyCCounterResetEntry.verify|verify} messages.
     * @function encode
     * @memberof GrowOnlyCCounterResetEntry
     * @static
     * @param {IGrowOnlyCCounterResetEntry} message GrowOnlyCCounterResetEntry message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GrowOnlyCCounterResetEntry.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.v);
        writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.idCounter);
        return writer;
    };

    /**
     * Encodes the specified GrowOnlyCCounterResetEntry message, length delimited. Does not implicitly {@link GrowOnlyCCounterResetEntry.verify|verify} messages.
     * @function encodeDelimited
     * @memberof GrowOnlyCCounterResetEntry
     * @static
     * @param {IGrowOnlyCCounterResetEntry} message GrowOnlyCCounterResetEntry message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GrowOnlyCCounterResetEntry.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GrowOnlyCCounterResetEntry message from the specified reader or buffer.
     * @function decode
     * @memberof GrowOnlyCCounterResetEntry
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GrowOnlyCCounterResetEntry} GrowOnlyCCounterResetEntry
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GrowOnlyCCounterResetEntry.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.GrowOnlyCCounterResetEntry();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.v = reader.uint32();
                break;
            case 2:
                message.idCounter = reader.uint32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("v"))
            throw $util.ProtocolError("missing required 'v'", { instance: message });
        if (!message.hasOwnProperty("idCounter"))
            throw $util.ProtocolError("missing required 'idCounter'", { instance: message });
        return message;
    };

    /**
     * Decodes a GrowOnlyCCounterResetEntry message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof GrowOnlyCCounterResetEntry
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GrowOnlyCCounterResetEntry} GrowOnlyCCounterResetEntry
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GrowOnlyCCounterResetEntry.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GrowOnlyCCounterResetEntry message.
     * @function verify
     * @memberof GrowOnlyCCounterResetEntry
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    GrowOnlyCCounterResetEntry.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.v))
            return "v: integer expected";
        if (!$util.isInteger(message.idCounter))
            return "idCounter: integer expected";
        return null;
    };

    /**
     * Creates a GrowOnlyCCounterResetEntry message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof GrowOnlyCCounterResetEntry
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {GrowOnlyCCounterResetEntry} GrowOnlyCCounterResetEntry
     */
    GrowOnlyCCounterResetEntry.fromObject = function fromObject(object) {
        if (object instanceof $root.GrowOnlyCCounterResetEntry)
            return object;
        var message = new $root.GrowOnlyCCounterResetEntry();
        if (object.v != null)
            message.v = object.v >>> 0;
        if (object.idCounter != null)
            message.idCounter = object.idCounter >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a GrowOnlyCCounterResetEntry message. Also converts values to other types if specified.
     * @function toObject
     * @memberof GrowOnlyCCounterResetEntry
     * @static
     * @param {GrowOnlyCCounterResetEntry} message GrowOnlyCCounterResetEntry
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    GrowOnlyCCounterResetEntry.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.v = 0;
            object.idCounter = 0;
        }
        if (message.v != null && message.hasOwnProperty("v"))
            object.v = message.v;
        if (message.idCounter != null && message.hasOwnProperty("idCounter"))
            object.idCounter = message.idCounter;
        return object;
    };

    /**
     * Converts this GrowOnlyCCounterResetEntry to JSON.
     * @function toJSON
     * @memberof GrowOnlyCCounterResetEntry
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    GrowOnlyCCounterResetEntry.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return GrowOnlyCCounterResetEntry;
})();

$root.GrowOnlyCCounterResetMessage = (function() {

    /**
     * Properties of a GrowOnlyCCounterResetMessage.
     * @exports IGrowOnlyCCounterResetMessage
     * @interface IGrowOnlyCCounterResetMessage
     * @property {Object.<string,IGrowOnlyCCounterResetEntry>|null} [V] GrowOnlyCCounterResetMessage V
     */

    /**
     * Constructs a new GrowOnlyCCounterResetMessage.
     * @exports GrowOnlyCCounterResetMessage
     * @classdesc Represents a GrowOnlyCCounterResetMessage.
     * @implements IGrowOnlyCCounterResetMessage
     * @constructor
     * @param {IGrowOnlyCCounterResetMessage=} [properties] Properties to set
     */
    function GrowOnlyCCounterResetMessage(properties) {
        this.V = {};
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GrowOnlyCCounterResetMessage V.
     * @member {Object.<string,IGrowOnlyCCounterResetEntry>} V
     * @memberof GrowOnlyCCounterResetMessage
     * @instance
     */
    GrowOnlyCCounterResetMessage.prototype.V = $util.emptyObject;

    /**
     * Creates a new GrowOnlyCCounterResetMessage instance using the specified properties.
     * @function create
     * @memberof GrowOnlyCCounterResetMessage
     * @static
     * @param {IGrowOnlyCCounterResetMessage=} [properties] Properties to set
     * @returns {GrowOnlyCCounterResetMessage} GrowOnlyCCounterResetMessage instance
     */
    GrowOnlyCCounterResetMessage.create = function create(properties) {
        return new GrowOnlyCCounterResetMessage(properties);
    };

    /**
     * Encodes the specified GrowOnlyCCounterResetMessage message. Does not implicitly {@link GrowOnlyCCounterResetMessage.verify|verify} messages.
     * @function encode
     * @memberof GrowOnlyCCounterResetMessage
     * @static
     * @param {IGrowOnlyCCounterResetMessage} message GrowOnlyCCounterResetMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GrowOnlyCCounterResetMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.V != null && Object.hasOwnProperty.call(message, "V"))
            for (var keys = Object.keys(message.V), i = 0; i < keys.length; ++i) {
                writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                $root.GrowOnlyCCounterResetEntry.encode(message.V[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
            }
        return writer;
    };

    /**
     * Encodes the specified GrowOnlyCCounterResetMessage message, length delimited. Does not implicitly {@link GrowOnlyCCounterResetMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof GrowOnlyCCounterResetMessage
     * @static
     * @param {IGrowOnlyCCounterResetMessage} message GrowOnlyCCounterResetMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GrowOnlyCCounterResetMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GrowOnlyCCounterResetMessage message from the specified reader or buffer.
     * @function decode
     * @memberof GrowOnlyCCounterResetMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GrowOnlyCCounterResetMessage} GrowOnlyCCounterResetMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GrowOnlyCCounterResetMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.GrowOnlyCCounterResetMessage(), key, value;
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (message.V === $util.emptyObject)
                    message.V = {};
                var end2 = reader.uint32() + reader.pos;
                key = "";
                value = null;
                while (reader.pos < end2) {
                    var tag2 = reader.uint32();
                    switch (tag2 >>> 3) {
                    case 1:
                        key = reader.string();
                        break;
                    case 2:
                        value = $root.GrowOnlyCCounterResetEntry.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag2 & 7);
                        break;
                    }
                }
                message.V[key] = value;
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a GrowOnlyCCounterResetMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof GrowOnlyCCounterResetMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GrowOnlyCCounterResetMessage} GrowOnlyCCounterResetMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GrowOnlyCCounterResetMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GrowOnlyCCounterResetMessage message.
     * @function verify
     * @memberof GrowOnlyCCounterResetMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    GrowOnlyCCounterResetMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.V != null && message.hasOwnProperty("V")) {
            if (!$util.isObject(message.V))
                return "V: object expected";
            var key = Object.keys(message.V);
            for (var i = 0; i < key.length; ++i) {
                var error = $root.GrowOnlyCCounterResetEntry.verify(message.V[key[i]]);
                if (error)
                    return "V." + error;
            }
        }
        return null;
    };

    /**
     * Creates a GrowOnlyCCounterResetMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof GrowOnlyCCounterResetMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {GrowOnlyCCounterResetMessage} GrowOnlyCCounterResetMessage
     */
    GrowOnlyCCounterResetMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.GrowOnlyCCounterResetMessage)
            return object;
        var message = new $root.GrowOnlyCCounterResetMessage();
        if (object.V) {
            if (typeof object.V !== "object")
                throw TypeError(".GrowOnlyCCounterResetMessage.V: object expected");
            message.V = {};
            for (var keys = Object.keys(object.V), i = 0; i < keys.length; ++i) {
                if (typeof object.V[keys[i]] !== "object")
                    throw TypeError(".GrowOnlyCCounterResetMessage.V: object expected");
                message.V[keys[i]] = $root.GrowOnlyCCounterResetEntry.fromObject(object.V[keys[i]]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a GrowOnlyCCounterResetMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof GrowOnlyCCounterResetMessage
     * @static
     * @param {GrowOnlyCCounterResetMessage} message GrowOnlyCCounterResetMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    GrowOnlyCCounterResetMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.objects || options.defaults)
            object.V = {};
        var keys2;
        if (message.V && (keys2 = Object.keys(message.V)).length) {
            object.V = {};
            for (var j = 0; j < keys2.length; ++j)
                object.V[keys2[j]] = $root.GrowOnlyCCounterResetEntry.toObject(message.V[keys2[j]], options);
        }
        return object;
    };

    /**
     * Converts this GrowOnlyCCounterResetMessage to JSON.
     * @function toJSON
     * @memberof GrowOnlyCCounterResetMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    GrowOnlyCCounterResetMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return GrowOnlyCCounterResetMessage;
})();

$root.GrowOnlyCCounterMessage = (function() {

    /**
     * Properties of a GrowOnlyCCounterMessage.
     * @exports IGrowOnlyCCounterMessage
     * @interface IGrowOnlyCCounterMessage
     * @property {IGrowOnlyCCounterAddMessage|null} [add] GrowOnlyCCounterMessage add
     * @property {IGrowOnlyCCounterResetMessage|null} [reset] GrowOnlyCCounterMessage reset
     */

    /**
     * Constructs a new GrowOnlyCCounterMessage.
     * @exports GrowOnlyCCounterMessage
     * @classdesc Represents a GrowOnlyCCounterMessage.
     * @implements IGrowOnlyCCounterMessage
     * @constructor
     * @param {IGrowOnlyCCounterMessage=} [properties] Properties to set
     */
    function GrowOnlyCCounterMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GrowOnlyCCounterMessage add.
     * @member {IGrowOnlyCCounterAddMessage|null|undefined} add
     * @memberof GrowOnlyCCounterMessage
     * @instance
     */
    GrowOnlyCCounterMessage.prototype.add = null;

    /**
     * GrowOnlyCCounterMessage reset.
     * @member {IGrowOnlyCCounterResetMessage|null|undefined} reset
     * @memberof GrowOnlyCCounterMessage
     * @instance
     */
    GrowOnlyCCounterMessage.prototype.reset = null;

    // OneOf field names bound to virtual getters and setters
    var $oneOfFields;

    /**
     * GrowOnlyCCounterMessage data.
     * @member {"add"|"reset"|undefined} data
     * @memberof GrowOnlyCCounterMessage
     * @instance
     */
    Object.defineProperty(GrowOnlyCCounterMessage.prototype, "data", {
        get: $util.oneOfGetter($oneOfFields = ["add", "reset"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new GrowOnlyCCounterMessage instance using the specified properties.
     * @function create
     * @memberof GrowOnlyCCounterMessage
     * @static
     * @param {IGrowOnlyCCounterMessage=} [properties] Properties to set
     * @returns {GrowOnlyCCounterMessage} GrowOnlyCCounterMessage instance
     */
    GrowOnlyCCounterMessage.create = function create(properties) {
        return new GrowOnlyCCounterMessage(properties);
    };

    /**
     * Encodes the specified GrowOnlyCCounterMessage message. Does not implicitly {@link GrowOnlyCCounterMessage.verify|verify} messages.
     * @function encode
     * @memberof GrowOnlyCCounterMessage
     * @static
     * @param {IGrowOnlyCCounterMessage} message GrowOnlyCCounterMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GrowOnlyCCounterMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.add != null && Object.hasOwnProperty.call(message, "add"))
            $root.GrowOnlyCCounterAddMessage.encode(message.add, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.reset != null && Object.hasOwnProperty.call(message, "reset"))
            $root.GrowOnlyCCounterResetMessage.encode(message.reset, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified GrowOnlyCCounterMessage message, length delimited. Does not implicitly {@link GrowOnlyCCounterMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof GrowOnlyCCounterMessage
     * @static
     * @param {IGrowOnlyCCounterMessage} message GrowOnlyCCounterMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GrowOnlyCCounterMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GrowOnlyCCounterMessage message from the specified reader or buffer.
     * @function decode
     * @memberof GrowOnlyCCounterMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GrowOnlyCCounterMessage} GrowOnlyCCounterMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GrowOnlyCCounterMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.GrowOnlyCCounterMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.add = $root.GrowOnlyCCounterAddMessage.decode(reader, reader.uint32());
                break;
            case 2:
                message.reset = $root.GrowOnlyCCounterResetMessage.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a GrowOnlyCCounterMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof GrowOnlyCCounterMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GrowOnlyCCounterMessage} GrowOnlyCCounterMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GrowOnlyCCounterMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GrowOnlyCCounterMessage message.
     * @function verify
     * @memberof GrowOnlyCCounterMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    GrowOnlyCCounterMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        var properties = {};
        if (message.add != null && message.hasOwnProperty("add")) {
            properties.data = 1;
            {
                var error = $root.GrowOnlyCCounterAddMessage.verify(message.add);
                if (error)
                    return "add." + error;
            }
        }
        if (message.reset != null && message.hasOwnProperty("reset")) {
            if (properties.data === 1)
                return "data: multiple values";
            properties.data = 1;
            {
                var error = $root.GrowOnlyCCounterResetMessage.verify(message.reset);
                if (error)
                    return "reset." + error;
            }
        }
        return null;
    };

    /**
     * Creates a GrowOnlyCCounterMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof GrowOnlyCCounterMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {GrowOnlyCCounterMessage} GrowOnlyCCounterMessage
     */
    GrowOnlyCCounterMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.GrowOnlyCCounterMessage)
            return object;
        var message = new $root.GrowOnlyCCounterMessage();
        if (object.add != null) {
            if (typeof object.add !== "object")
                throw TypeError(".GrowOnlyCCounterMessage.add: object expected");
            message.add = $root.GrowOnlyCCounterAddMessage.fromObject(object.add);
        }
        if (object.reset != null) {
            if (typeof object.reset !== "object")
                throw TypeError(".GrowOnlyCCounterMessage.reset: object expected");
            message.reset = $root.GrowOnlyCCounterResetMessage.fromObject(object.reset);
        }
        return message;
    };

    /**
     * Creates a plain object from a GrowOnlyCCounterMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof GrowOnlyCCounterMessage
     * @static
     * @param {GrowOnlyCCounterMessage} message GrowOnlyCCounterMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    GrowOnlyCCounterMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (message.add != null && message.hasOwnProperty("add")) {
            object.add = $root.GrowOnlyCCounterAddMessage.toObject(message.add, options);
            if (options.oneofs)
                object.data = "add";
        }
        if (message.reset != null && message.hasOwnProperty("reset")) {
            object.reset = $root.GrowOnlyCCounterResetMessage.toObject(message.reset, options);
            if (options.oneofs)
                object.data = "reset";
        }
        return object;
    };

    /**
     * Converts this GrowOnlyCCounterMessage to JSON.
     * @function toJSON
     * @memberof GrowOnlyCCounterMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    GrowOnlyCCounterMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return GrowOnlyCCounterMessage;
})();

$root.GrowOnlyCCounterSaveEntry = (function() {

    /**
     * Properties of a GrowOnlyCCounterSaveEntry.
     * @exports IGrowOnlyCCounterSaveEntry
     * @interface IGrowOnlyCCounterSaveEntry
     * @property {number} p GrowOnlyCCounterSaveEntry p
     * @property {number} n GrowOnlyCCounterSaveEntry n
     * @property {number} idCounter GrowOnlyCCounterSaveEntry idCounter
     */

    /**
     * Constructs a new GrowOnlyCCounterSaveEntry.
     * @exports GrowOnlyCCounterSaveEntry
     * @classdesc Represents a GrowOnlyCCounterSaveEntry.
     * @implements IGrowOnlyCCounterSaveEntry
     * @constructor
     * @param {IGrowOnlyCCounterSaveEntry=} [properties] Properties to set
     */
    function GrowOnlyCCounterSaveEntry(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GrowOnlyCCounterSaveEntry p.
     * @member {number} p
     * @memberof GrowOnlyCCounterSaveEntry
     * @instance
     */
    GrowOnlyCCounterSaveEntry.prototype.p = 0;

    /**
     * GrowOnlyCCounterSaveEntry n.
     * @member {number} n
     * @memberof GrowOnlyCCounterSaveEntry
     * @instance
     */
    GrowOnlyCCounterSaveEntry.prototype.n = 0;

    /**
     * GrowOnlyCCounterSaveEntry idCounter.
     * @member {number} idCounter
     * @memberof GrowOnlyCCounterSaveEntry
     * @instance
     */
    GrowOnlyCCounterSaveEntry.prototype.idCounter = 0;

    /**
     * Creates a new GrowOnlyCCounterSaveEntry instance using the specified properties.
     * @function create
     * @memberof GrowOnlyCCounterSaveEntry
     * @static
     * @param {IGrowOnlyCCounterSaveEntry=} [properties] Properties to set
     * @returns {GrowOnlyCCounterSaveEntry} GrowOnlyCCounterSaveEntry instance
     */
    GrowOnlyCCounterSaveEntry.create = function create(properties) {
        return new GrowOnlyCCounterSaveEntry(properties);
    };

    /**
     * Encodes the specified GrowOnlyCCounterSaveEntry message. Does not implicitly {@link GrowOnlyCCounterSaveEntry.verify|verify} messages.
     * @function encode
     * @memberof GrowOnlyCCounterSaveEntry
     * @static
     * @param {IGrowOnlyCCounterSaveEntry} message GrowOnlyCCounterSaveEntry message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GrowOnlyCCounterSaveEntry.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.p);
        writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.n);
        writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.idCounter);
        return writer;
    };

    /**
     * Encodes the specified GrowOnlyCCounterSaveEntry message, length delimited. Does not implicitly {@link GrowOnlyCCounterSaveEntry.verify|verify} messages.
     * @function encodeDelimited
     * @memberof GrowOnlyCCounterSaveEntry
     * @static
     * @param {IGrowOnlyCCounterSaveEntry} message GrowOnlyCCounterSaveEntry message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GrowOnlyCCounterSaveEntry.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GrowOnlyCCounterSaveEntry message from the specified reader or buffer.
     * @function decode
     * @memberof GrowOnlyCCounterSaveEntry
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GrowOnlyCCounterSaveEntry} GrowOnlyCCounterSaveEntry
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GrowOnlyCCounterSaveEntry.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.GrowOnlyCCounterSaveEntry();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.p = reader.uint32();
                break;
            case 2:
                message.n = reader.uint32();
                break;
            case 3:
                message.idCounter = reader.uint32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("p"))
            throw $util.ProtocolError("missing required 'p'", { instance: message });
        if (!message.hasOwnProperty("n"))
            throw $util.ProtocolError("missing required 'n'", { instance: message });
        if (!message.hasOwnProperty("idCounter"))
            throw $util.ProtocolError("missing required 'idCounter'", { instance: message });
        return message;
    };

    /**
     * Decodes a GrowOnlyCCounterSaveEntry message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof GrowOnlyCCounterSaveEntry
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GrowOnlyCCounterSaveEntry} GrowOnlyCCounterSaveEntry
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GrowOnlyCCounterSaveEntry.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GrowOnlyCCounterSaveEntry message.
     * @function verify
     * @memberof GrowOnlyCCounterSaveEntry
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    GrowOnlyCCounterSaveEntry.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.p))
            return "p: integer expected";
        if (!$util.isInteger(message.n))
            return "n: integer expected";
        if (!$util.isInteger(message.idCounter))
            return "idCounter: integer expected";
        return null;
    };

    /**
     * Creates a GrowOnlyCCounterSaveEntry message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof GrowOnlyCCounterSaveEntry
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {GrowOnlyCCounterSaveEntry} GrowOnlyCCounterSaveEntry
     */
    GrowOnlyCCounterSaveEntry.fromObject = function fromObject(object) {
        if (object instanceof $root.GrowOnlyCCounterSaveEntry)
            return object;
        var message = new $root.GrowOnlyCCounterSaveEntry();
        if (object.p != null)
            message.p = object.p >>> 0;
        if (object.n != null)
            message.n = object.n >>> 0;
        if (object.idCounter != null)
            message.idCounter = object.idCounter >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a GrowOnlyCCounterSaveEntry message. Also converts values to other types if specified.
     * @function toObject
     * @memberof GrowOnlyCCounterSaveEntry
     * @static
     * @param {GrowOnlyCCounterSaveEntry} message GrowOnlyCCounterSaveEntry
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    GrowOnlyCCounterSaveEntry.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.p = 0;
            object.n = 0;
            object.idCounter = 0;
        }
        if (message.p != null && message.hasOwnProperty("p"))
            object.p = message.p;
        if (message.n != null && message.hasOwnProperty("n"))
            object.n = message.n;
        if (message.idCounter != null && message.hasOwnProperty("idCounter"))
            object.idCounter = message.idCounter;
        return object;
    };

    /**
     * Converts this GrowOnlyCCounterSaveEntry to JSON.
     * @function toJSON
     * @memberof GrowOnlyCCounterSaveEntry
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    GrowOnlyCCounterSaveEntry.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return GrowOnlyCCounterSaveEntry;
})();

$root.GrowOnlyCCounterSave = (function() {

    /**
     * Properties of a GrowOnlyCCounterSave.
     * @exports IGrowOnlyCCounterSave
     * @interface IGrowOnlyCCounterSave
     * @property {Object.<string,IGrowOnlyCCounterSaveEntry>|null} [M] GrowOnlyCCounterSave M
     */

    /**
     * Constructs a new GrowOnlyCCounterSave.
     * @exports GrowOnlyCCounterSave
     * @classdesc Represents a GrowOnlyCCounterSave.
     * @implements IGrowOnlyCCounterSave
     * @constructor
     * @param {IGrowOnlyCCounterSave=} [properties] Properties to set
     */
    function GrowOnlyCCounterSave(properties) {
        this.M = {};
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GrowOnlyCCounterSave M.
     * @member {Object.<string,IGrowOnlyCCounterSaveEntry>} M
     * @memberof GrowOnlyCCounterSave
     * @instance
     */
    GrowOnlyCCounterSave.prototype.M = $util.emptyObject;

    /**
     * Creates a new GrowOnlyCCounterSave instance using the specified properties.
     * @function create
     * @memberof GrowOnlyCCounterSave
     * @static
     * @param {IGrowOnlyCCounterSave=} [properties] Properties to set
     * @returns {GrowOnlyCCounterSave} GrowOnlyCCounterSave instance
     */
    GrowOnlyCCounterSave.create = function create(properties) {
        return new GrowOnlyCCounterSave(properties);
    };

    /**
     * Encodes the specified GrowOnlyCCounterSave message. Does not implicitly {@link GrowOnlyCCounterSave.verify|verify} messages.
     * @function encode
     * @memberof GrowOnlyCCounterSave
     * @static
     * @param {IGrowOnlyCCounterSave} message GrowOnlyCCounterSave message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GrowOnlyCCounterSave.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.M != null && Object.hasOwnProperty.call(message, "M"))
            for (var keys = Object.keys(message.M), i = 0; i < keys.length; ++i) {
                writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                $root.GrowOnlyCCounterSaveEntry.encode(message.M[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
            }
        return writer;
    };

    /**
     * Encodes the specified GrowOnlyCCounterSave message, length delimited. Does not implicitly {@link GrowOnlyCCounterSave.verify|verify} messages.
     * @function encodeDelimited
     * @memberof GrowOnlyCCounterSave
     * @static
     * @param {IGrowOnlyCCounterSave} message GrowOnlyCCounterSave message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GrowOnlyCCounterSave.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GrowOnlyCCounterSave message from the specified reader or buffer.
     * @function decode
     * @memberof GrowOnlyCCounterSave
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GrowOnlyCCounterSave} GrowOnlyCCounterSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GrowOnlyCCounterSave.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.GrowOnlyCCounterSave(), key, value;
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (message.M === $util.emptyObject)
                    message.M = {};
                var end2 = reader.uint32() + reader.pos;
                key = "";
                value = null;
                while (reader.pos < end2) {
                    var tag2 = reader.uint32();
                    switch (tag2 >>> 3) {
                    case 1:
                        key = reader.string();
                        break;
                    case 2:
                        value = $root.GrowOnlyCCounterSaveEntry.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag2 & 7);
                        break;
                    }
                }
                message.M[key] = value;
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a GrowOnlyCCounterSave message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof GrowOnlyCCounterSave
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GrowOnlyCCounterSave} GrowOnlyCCounterSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GrowOnlyCCounterSave.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GrowOnlyCCounterSave message.
     * @function verify
     * @memberof GrowOnlyCCounterSave
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    GrowOnlyCCounterSave.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.M != null && message.hasOwnProperty("M")) {
            if (!$util.isObject(message.M))
                return "M: object expected";
            var key = Object.keys(message.M);
            for (var i = 0; i < key.length; ++i) {
                var error = $root.GrowOnlyCCounterSaveEntry.verify(message.M[key[i]]);
                if (error)
                    return "M." + error;
            }
        }
        return null;
    };

    /**
     * Creates a GrowOnlyCCounterSave message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof GrowOnlyCCounterSave
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {GrowOnlyCCounterSave} GrowOnlyCCounterSave
     */
    GrowOnlyCCounterSave.fromObject = function fromObject(object) {
        if (object instanceof $root.GrowOnlyCCounterSave)
            return object;
        var message = new $root.GrowOnlyCCounterSave();
        if (object.M) {
            if (typeof object.M !== "object")
                throw TypeError(".GrowOnlyCCounterSave.M: object expected");
            message.M = {};
            for (var keys = Object.keys(object.M), i = 0; i < keys.length; ++i) {
                if (typeof object.M[keys[i]] !== "object")
                    throw TypeError(".GrowOnlyCCounterSave.M: object expected");
                message.M[keys[i]] = $root.GrowOnlyCCounterSaveEntry.fromObject(object.M[keys[i]]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a GrowOnlyCCounterSave message. Also converts values to other types if specified.
     * @function toObject
     * @memberof GrowOnlyCCounterSave
     * @static
     * @param {GrowOnlyCCounterSave} message GrowOnlyCCounterSave
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    GrowOnlyCCounterSave.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.objects || options.defaults)
            object.M = {};
        var keys2;
        if (message.M && (keys2 = Object.keys(message.M)).length) {
            object.M = {};
            for (var j = 0; j < keys2.length; ++j)
                object.M[keys2[j]] = $root.GrowOnlyCCounterSaveEntry.toObject(message.M[keys2[j]], options);
        }
        return object;
    };

    /**
     * Converts this GrowOnlyCCounterSave to JSON.
     * @function toJSON
     * @memberof GrowOnlyCCounterSave
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    GrowOnlyCCounterSave.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return GrowOnlyCCounterSave;
})();

$root.CNumberComponentMessage = (function() {

    /**
     * Properties of a CNumberComponentMessage.
     * @exports ICNumberComponentMessage
     * @interface ICNumberComponentMessage
     * @property {number} arg CNumberComponentMessage arg
     */

    /**
     * Constructs a new CNumberComponentMessage.
     * @exports CNumberComponentMessage
     * @classdesc Represents a CNumberComponentMessage.
     * @implements ICNumberComponentMessage
     * @constructor
     * @param {ICNumberComponentMessage=} [properties] Properties to set
     */
    function CNumberComponentMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CNumberComponentMessage arg.
     * @member {number} arg
     * @memberof CNumberComponentMessage
     * @instance
     */
    CNumberComponentMessage.prototype.arg = 0;

    /**
     * Creates a new CNumberComponentMessage instance using the specified properties.
     * @function create
     * @memberof CNumberComponentMessage
     * @static
     * @param {ICNumberComponentMessage=} [properties] Properties to set
     * @returns {CNumberComponentMessage} CNumberComponentMessage instance
     */
    CNumberComponentMessage.create = function create(properties) {
        return new CNumberComponentMessage(properties);
    };

    /**
     * Encodes the specified CNumberComponentMessage message. Does not implicitly {@link CNumberComponentMessage.verify|verify} messages.
     * @function encode
     * @memberof CNumberComponentMessage
     * @static
     * @param {ICNumberComponentMessage} message CNumberComponentMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CNumberComponentMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 1 =*/9).double(message.arg);
        return writer;
    };

    /**
     * Encodes the specified CNumberComponentMessage message, length delimited. Does not implicitly {@link CNumberComponentMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CNumberComponentMessage
     * @static
     * @param {ICNumberComponentMessage} message CNumberComponentMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CNumberComponentMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CNumberComponentMessage message from the specified reader or buffer.
     * @function decode
     * @memberof CNumberComponentMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CNumberComponentMessage} CNumberComponentMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CNumberComponentMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.CNumberComponentMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.arg = reader.double();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("arg"))
            throw $util.ProtocolError("missing required 'arg'", { instance: message });
        return message;
    };

    /**
     * Decodes a CNumberComponentMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CNumberComponentMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CNumberComponentMessage} CNumberComponentMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CNumberComponentMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CNumberComponentMessage message.
     * @function verify
     * @memberof CNumberComponentMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CNumberComponentMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (typeof message.arg !== "number")
            return "arg: number expected";
        return null;
    };

    /**
     * Creates a CNumberComponentMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CNumberComponentMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CNumberComponentMessage} CNumberComponentMessage
     */
    CNumberComponentMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.CNumberComponentMessage)
            return object;
        var message = new $root.CNumberComponentMessage();
        if (object.arg != null)
            message.arg = Number(object.arg);
        return message;
    };

    /**
     * Creates a plain object from a CNumberComponentMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CNumberComponentMessage
     * @static
     * @param {CNumberComponentMessage} message CNumberComponentMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CNumberComponentMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.arg = 0;
        if (message.arg != null && message.hasOwnProperty("arg"))
            object.arg = options.json && !isFinite(message.arg) ? String(message.arg) : message.arg;
        return object;
    };

    /**
     * Converts this CNumberComponentMessage to JSON.
     * @function toJSON
     * @memberof CNumberComponentMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CNumberComponentMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return CNumberComponentMessage;
})();

$root.AggregateArgsCRegisterMessage = (function() {

    /**
     * Properties of an AggregateArgsCRegisterMessage.
     * @exports IAggregateArgsCRegisterMessage
     * @interface IAggregateArgsCRegisterMessage
     * @property {Uint8Array|null} [setArgs] AggregateArgsCRegisterMessage setArgs
     * @property {boolean|null} [reset] AggregateArgsCRegisterMessage reset
     */

    /**
     * Constructs a new AggregateArgsCRegisterMessage.
     * @exports AggregateArgsCRegisterMessage
     * @classdesc Represents an AggregateArgsCRegisterMessage.
     * @implements IAggregateArgsCRegisterMessage
     * @constructor
     * @param {IAggregateArgsCRegisterMessage=} [properties] Properties to set
     */
    function AggregateArgsCRegisterMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * AggregateArgsCRegisterMessage setArgs.
     * @member {Uint8Array} setArgs
     * @memberof AggregateArgsCRegisterMessage
     * @instance
     */
    AggregateArgsCRegisterMessage.prototype.setArgs = $util.newBuffer([]);

    /**
     * AggregateArgsCRegisterMessage reset.
     * @member {boolean} reset
     * @memberof AggregateArgsCRegisterMessage
     * @instance
     */
    AggregateArgsCRegisterMessage.prototype.reset = false;

    // OneOf field names bound to virtual getters and setters
    var $oneOfFields;

    /**
     * AggregateArgsCRegisterMessage data.
     * @member {"setArgs"|"reset"|undefined} data
     * @memberof AggregateArgsCRegisterMessage
     * @instance
     */
    Object.defineProperty(AggregateArgsCRegisterMessage.prototype, "data", {
        get: $util.oneOfGetter($oneOfFields = ["setArgs", "reset"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new AggregateArgsCRegisterMessage instance using the specified properties.
     * @function create
     * @memberof AggregateArgsCRegisterMessage
     * @static
     * @param {IAggregateArgsCRegisterMessage=} [properties] Properties to set
     * @returns {AggregateArgsCRegisterMessage} AggregateArgsCRegisterMessage instance
     */
    AggregateArgsCRegisterMessage.create = function create(properties) {
        return new AggregateArgsCRegisterMessage(properties);
    };

    /**
     * Encodes the specified AggregateArgsCRegisterMessage message. Does not implicitly {@link AggregateArgsCRegisterMessage.verify|verify} messages.
     * @function encode
     * @memberof AggregateArgsCRegisterMessage
     * @static
     * @param {IAggregateArgsCRegisterMessage} message AggregateArgsCRegisterMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AggregateArgsCRegisterMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.setArgs != null && Object.hasOwnProperty.call(message, "setArgs"))
            writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.setArgs);
        if (message.reset != null && Object.hasOwnProperty.call(message, "reset"))
            writer.uint32(/* id 2, wireType 0 =*/16).bool(message.reset);
        return writer;
    };

    /**
     * Encodes the specified AggregateArgsCRegisterMessage message, length delimited. Does not implicitly {@link AggregateArgsCRegisterMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof AggregateArgsCRegisterMessage
     * @static
     * @param {IAggregateArgsCRegisterMessage} message AggregateArgsCRegisterMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AggregateArgsCRegisterMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an AggregateArgsCRegisterMessage message from the specified reader or buffer.
     * @function decode
     * @memberof AggregateArgsCRegisterMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {AggregateArgsCRegisterMessage} AggregateArgsCRegisterMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AggregateArgsCRegisterMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.AggregateArgsCRegisterMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.setArgs = reader.bytes();
                break;
            case 2:
                message.reset = reader.bool();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an AggregateArgsCRegisterMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof AggregateArgsCRegisterMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {AggregateArgsCRegisterMessage} AggregateArgsCRegisterMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AggregateArgsCRegisterMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an AggregateArgsCRegisterMessage message.
     * @function verify
     * @memberof AggregateArgsCRegisterMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    AggregateArgsCRegisterMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        var properties = {};
        if (message.setArgs != null && message.hasOwnProperty("setArgs")) {
            properties.data = 1;
            if (!(message.setArgs && typeof message.setArgs.length === "number" || $util.isString(message.setArgs)))
                return "setArgs: buffer expected";
        }
        if (message.reset != null && message.hasOwnProperty("reset")) {
            if (properties.data === 1)
                return "data: multiple values";
            properties.data = 1;
            if (typeof message.reset !== "boolean")
                return "reset: boolean expected";
        }
        return null;
    };

    /**
     * Creates an AggregateArgsCRegisterMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof AggregateArgsCRegisterMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {AggregateArgsCRegisterMessage} AggregateArgsCRegisterMessage
     */
    AggregateArgsCRegisterMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.AggregateArgsCRegisterMessage)
            return object;
        var message = new $root.AggregateArgsCRegisterMessage();
        if (object.setArgs != null)
            if (typeof object.setArgs === "string")
                $util.base64.decode(object.setArgs, message.setArgs = $util.newBuffer($util.base64.length(object.setArgs)), 0);
            else if (object.setArgs.length)
                message.setArgs = object.setArgs;
        if (object.reset != null)
            message.reset = Boolean(object.reset);
        return message;
    };

    /**
     * Creates a plain object from an AggregateArgsCRegisterMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof AggregateArgsCRegisterMessage
     * @static
     * @param {AggregateArgsCRegisterMessage} message AggregateArgsCRegisterMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    AggregateArgsCRegisterMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (message.setArgs != null && message.hasOwnProperty("setArgs")) {
            object.setArgs = options.bytes === String ? $util.base64.encode(message.setArgs, 0, message.setArgs.length) : options.bytes === Array ? Array.prototype.slice.call(message.setArgs) : message.setArgs;
            if (options.oneofs)
                object.data = "setArgs";
        }
        if (message.reset != null && message.hasOwnProperty("reset")) {
            object.reset = message.reset;
            if (options.oneofs)
                object.data = "reset";
        }
        return object;
    };

    /**
     * Converts this AggregateArgsCRegisterMessage to JSON.
     * @function toJSON
     * @memberof AggregateArgsCRegisterMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    AggregateArgsCRegisterMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return AggregateArgsCRegisterMessage;
})();

$root.AggregateArgsCRegisterEntrySave = (function() {

    /**
     * Properties of an AggregateArgsCRegisterEntrySave.
     * @exports IAggregateArgsCRegisterEntrySave
     * @interface IAggregateArgsCRegisterEntrySave
     * @property {Uint8Array} setArgs AggregateArgsCRegisterEntrySave setArgs
     * @property {string} sender AggregateArgsCRegisterEntrySave sender
     * @property {number} senderCounter AggregateArgsCRegisterEntrySave senderCounter
     * @property {number} time AggregateArgsCRegisterEntrySave time
     */

    /**
     * Constructs a new AggregateArgsCRegisterEntrySave.
     * @exports AggregateArgsCRegisterEntrySave
     * @classdesc Represents an AggregateArgsCRegisterEntrySave.
     * @implements IAggregateArgsCRegisterEntrySave
     * @constructor
     * @param {IAggregateArgsCRegisterEntrySave=} [properties] Properties to set
     */
    function AggregateArgsCRegisterEntrySave(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * AggregateArgsCRegisterEntrySave setArgs.
     * @member {Uint8Array} setArgs
     * @memberof AggregateArgsCRegisterEntrySave
     * @instance
     */
    AggregateArgsCRegisterEntrySave.prototype.setArgs = $util.newBuffer([]);

    /**
     * AggregateArgsCRegisterEntrySave sender.
     * @member {string} sender
     * @memberof AggregateArgsCRegisterEntrySave
     * @instance
     */
    AggregateArgsCRegisterEntrySave.prototype.sender = "";

    /**
     * AggregateArgsCRegisterEntrySave senderCounter.
     * @member {number} senderCounter
     * @memberof AggregateArgsCRegisterEntrySave
     * @instance
     */
    AggregateArgsCRegisterEntrySave.prototype.senderCounter = 0;

    /**
     * AggregateArgsCRegisterEntrySave time.
     * @member {number} time
     * @memberof AggregateArgsCRegisterEntrySave
     * @instance
     */
    AggregateArgsCRegisterEntrySave.prototype.time = 0;

    /**
     * Creates a new AggregateArgsCRegisterEntrySave instance using the specified properties.
     * @function create
     * @memberof AggregateArgsCRegisterEntrySave
     * @static
     * @param {IAggregateArgsCRegisterEntrySave=} [properties] Properties to set
     * @returns {AggregateArgsCRegisterEntrySave} AggregateArgsCRegisterEntrySave instance
     */
    AggregateArgsCRegisterEntrySave.create = function create(properties) {
        return new AggregateArgsCRegisterEntrySave(properties);
    };

    /**
     * Encodes the specified AggregateArgsCRegisterEntrySave message. Does not implicitly {@link AggregateArgsCRegisterEntrySave.verify|verify} messages.
     * @function encode
     * @memberof AggregateArgsCRegisterEntrySave
     * @static
     * @param {IAggregateArgsCRegisterEntrySave} message AggregateArgsCRegisterEntrySave message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AggregateArgsCRegisterEntrySave.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.setArgs);
        writer.uint32(/* id 2, wireType 2 =*/18).string(message.sender);
        writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.senderCounter);
        writer.uint32(/* id 4, wireType 1 =*/33).double(message.time);
        return writer;
    };

    /**
     * Encodes the specified AggregateArgsCRegisterEntrySave message, length delimited. Does not implicitly {@link AggregateArgsCRegisterEntrySave.verify|verify} messages.
     * @function encodeDelimited
     * @memberof AggregateArgsCRegisterEntrySave
     * @static
     * @param {IAggregateArgsCRegisterEntrySave} message AggregateArgsCRegisterEntrySave message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AggregateArgsCRegisterEntrySave.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an AggregateArgsCRegisterEntrySave message from the specified reader or buffer.
     * @function decode
     * @memberof AggregateArgsCRegisterEntrySave
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {AggregateArgsCRegisterEntrySave} AggregateArgsCRegisterEntrySave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AggregateArgsCRegisterEntrySave.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.AggregateArgsCRegisterEntrySave();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.setArgs = reader.bytes();
                break;
            case 2:
                message.sender = reader.string();
                break;
            case 3:
                message.senderCounter = reader.uint32();
                break;
            case 4:
                message.time = reader.double();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("setArgs"))
            throw $util.ProtocolError("missing required 'setArgs'", { instance: message });
        if (!message.hasOwnProperty("sender"))
            throw $util.ProtocolError("missing required 'sender'", { instance: message });
        if (!message.hasOwnProperty("senderCounter"))
            throw $util.ProtocolError("missing required 'senderCounter'", { instance: message });
        if (!message.hasOwnProperty("time"))
            throw $util.ProtocolError("missing required 'time'", { instance: message });
        return message;
    };

    /**
     * Decodes an AggregateArgsCRegisterEntrySave message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof AggregateArgsCRegisterEntrySave
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {AggregateArgsCRegisterEntrySave} AggregateArgsCRegisterEntrySave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AggregateArgsCRegisterEntrySave.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an AggregateArgsCRegisterEntrySave message.
     * @function verify
     * @memberof AggregateArgsCRegisterEntrySave
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    AggregateArgsCRegisterEntrySave.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!(message.setArgs && typeof message.setArgs.length === "number" || $util.isString(message.setArgs)))
            return "setArgs: buffer expected";
        if (!$util.isString(message.sender))
            return "sender: string expected";
        if (!$util.isInteger(message.senderCounter))
            return "senderCounter: integer expected";
        if (typeof message.time !== "number")
            return "time: number expected";
        return null;
    };

    /**
     * Creates an AggregateArgsCRegisterEntrySave message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof AggregateArgsCRegisterEntrySave
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {AggregateArgsCRegisterEntrySave} AggregateArgsCRegisterEntrySave
     */
    AggregateArgsCRegisterEntrySave.fromObject = function fromObject(object) {
        if (object instanceof $root.AggregateArgsCRegisterEntrySave)
            return object;
        var message = new $root.AggregateArgsCRegisterEntrySave();
        if (object.setArgs != null)
            if (typeof object.setArgs === "string")
                $util.base64.decode(object.setArgs, message.setArgs = $util.newBuffer($util.base64.length(object.setArgs)), 0);
            else if (object.setArgs.length)
                message.setArgs = object.setArgs;
        if (object.sender != null)
            message.sender = String(object.sender);
        if (object.senderCounter != null)
            message.senderCounter = object.senderCounter >>> 0;
        if (object.time != null)
            message.time = Number(object.time);
        return message;
    };

    /**
     * Creates a plain object from an AggregateArgsCRegisterEntrySave message. Also converts values to other types if specified.
     * @function toObject
     * @memberof AggregateArgsCRegisterEntrySave
     * @static
     * @param {AggregateArgsCRegisterEntrySave} message AggregateArgsCRegisterEntrySave
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    AggregateArgsCRegisterEntrySave.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if (options.bytes === String)
                object.setArgs = "";
            else {
                object.setArgs = [];
                if (options.bytes !== Array)
                    object.setArgs = $util.newBuffer(object.setArgs);
            }
            object.sender = "";
            object.senderCounter = 0;
            object.time = 0;
        }
        if (message.setArgs != null && message.hasOwnProperty("setArgs"))
            object.setArgs = options.bytes === String ? $util.base64.encode(message.setArgs, 0, message.setArgs.length) : options.bytes === Array ? Array.prototype.slice.call(message.setArgs) : message.setArgs;
        if (message.sender != null && message.hasOwnProperty("sender"))
            object.sender = message.sender;
        if (message.senderCounter != null && message.hasOwnProperty("senderCounter"))
            object.senderCounter = message.senderCounter;
        if (message.time != null && message.hasOwnProperty("time"))
            object.time = options.json && !isFinite(message.time) ? String(message.time) : message.time;
        return object;
    };

    /**
     * Converts this AggregateArgsCRegisterEntrySave to JSON.
     * @function toJSON
     * @memberof AggregateArgsCRegisterEntrySave
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    AggregateArgsCRegisterEntrySave.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return AggregateArgsCRegisterEntrySave;
})();

$root.AggregateArgsCRegisterSave = (function() {

    /**
     * Properties of an AggregateArgsCRegisterSave.
     * @exports IAggregateArgsCRegisterSave
     * @interface IAggregateArgsCRegisterSave
     * @property {Array.<IAggregateArgsCRegisterEntrySave>|null} [entries] AggregateArgsCRegisterSave entries
     */

    /**
     * Constructs a new AggregateArgsCRegisterSave.
     * @exports AggregateArgsCRegisterSave
     * @classdesc Represents an AggregateArgsCRegisterSave.
     * @implements IAggregateArgsCRegisterSave
     * @constructor
     * @param {IAggregateArgsCRegisterSave=} [properties] Properties to set
     */
    function AggregateArgsCRegisterSave(properties) {
        this.entries = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * AggregateArgsCRegisterSave entries.
     * @member {Array.<IAggregateArgsCRegisterEntrySave>} entries
     * @memberof AggregateArgsCRegisterSave
     * @instance
     */
    AggregateArgsCRegisterSave.prototype.entries = $util.emptyArray;

    /**
     * Creates a new AggregateArgsCRegisterSave instance using the specified properties.
     * @function create
     * @memberof AggregateArgsCRegisterSave
     * @static
     * @param {IAggregateArgsCRegisterSave=} [properties] Properties to set
     * @returns {AggregateArgsCRegisterSave} AggregateArgsCRegisterSave instance
     */
    AggregateArgsCRegisterSave.create = function create(properties) {
        return new AggregateArgsCRegisterSave(properties);
    };

    /**
     * Encodes the specified AggregateArgsCRegisterSave message. Does not implicitly {@link AggregateArgsCRegisterSave.verify|verify} messages.
     * @function encode
     * @memberof AggregateArgsCRegisterSave
     * @static
     * @param {IAggregateArgsCRegisterSave} message AggregateArgsCRegisterSave message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AggregateArgsCRegisterSave.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.entries != null && message.entries.length)
            for (var i = 0; i < message.entries.length; ++i)
                $root.AggregateArgsCRegisterEntrySave.encode(message.entries[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified AggregateArgsCRegisterSave message, length delimited. Does not implicitly {@link AggregateArgsCRegisterSave.verify|verify} messages.
     * @function encodeDelimited
     * @memberof AggregateArgsCRegisterSave
     * @static
     * @param {IAggregateArgsCRegisterSave} message AggregateArgsCRegisterSave message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AggregateArgsCRegisterSave.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an AggregateArgsCRegisterSave message from the specified reader or buffer.
     * @function decode
     * @memberof AggregateArgsCRegisterSave
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {AggregateArgsCRegisterSave} AggregateArgsCRegisterSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AggregateArgsCRegisterSave.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.AggregateArgsCRegisterSave();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.entries && message.entries.length))
                    message.entries = [];
                message.entries.push($root.AggregateArgsCRegisterEntrySave.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an AggregateArgsCRegisterSave message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof AggregateArgsCRegisterSave
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {AggregateArgsCRegisterSave} AggregateArgsCRegisterSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AggregateArgsCRegisterSave.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an AggregateArgsCRegisterSave message.
     * @function verify
     * @memberof AggregateArgsCRegisterSave
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    AggregateArgsCRegisterSave.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.entries != null && message.hasOwnProperty("entries")) {
            if (!Array.isArray(message.entries))
                return "entries: array expected";
            for (var i = 0; i < message.entries.length; ++i) {
                var error = $root.AggregateArgsCRegisterEntrySave.verify(message.entries[i]);
                if (error)
                    return "entries." + error;
            }
        }
        return null;
    };

    /**
     * Creates an AggregateArgsCRegisterSave message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof AggregateArgsCRegisterSave
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {AggregateArgsCRegisterSave} AggregateArgsCRegisterSave
     */
    AggregateArgsCRegisterSave.fromObject = function fromObject(object) {
        if (object instanceof $root.AggregateArgsCRegisterSave)
            return object;
        var message = new $root.AggregateArgsCRegisterSave();
        if (object.entries) {
            if (!Array.isArray(object.entries))
                throw TypeError(".AggregateArgsCRegisterSave.entries: array expected");
            message.entries = [];
            for (var i = 0; i < object.entries.length; ++i) {
                if (typeof object.entries[i] !== "object")
                    throw TypeError(".AggregateArgsCRegisterSave.entries: object expected");
                message.entries[i] = $root.AggregateArgsCRegisterEntrySave.fromObject(object.entries[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from an AggregateArgsCRegisterSave message. Also converts values to other types if specified.
     * @function toObject
     * @memberof AggregateArgsCRegisterSave
     * @static
     * @param {AggregateArgsCRegisterSave} message AggregateArgsCRegisterSave
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    AggregateArgsCRegisterSave.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.entries = [];
        if (message.entries && message.entries.length) {
            object.entries = [];
            for (var j = 0; j < message.entries.length; ++j)
                object.entries[j] = $root.AggregateArgsCRegisterEntrySave.toObject(message.entries[j], options);
        }
        return object;
    };

    /**
     * Converts this AggregateArgsCRegisterSave to JSON.
     * @function toJSON
     * @memberof AggregateArgsCRegisterSave
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    AggregateArgsCRegisterSave.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return AggregateArgsCRegisterSave;
})();

$root.SequentialMapMessage = (function() {

    /**
     * Properties of a SequentialMapMessage.
     * @exports ISequentialMapMessage
     * @interface ISequentialMapMessage
     * @property {SequentialMapMessage.Operation} operation SequentialMapMessage operation
     * @property {Uint8Array} key SequentialMapMessage key
     * @property {Uint8Array|null} [value] SequentialMapMessage value
     */

    /**
     * Constructs a new SequentialMapMessage.
     * @exports SequentialMapMessage
     * @classdesc Represents a SequentialMapMessage.
     * @implements ISequentialMapMessage
     * @constructor
     * @param {ISequentialMapMessage=} [properties] Properties to set
     */
    function SequentialMapMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * SequentialMapMessage operation.
     * @member {SequentialMapMessage.Operation} operation
     * @memberof SequentialMapMessage
     * @instance
     */
    SequentialMapMessage.prototype.operation = 0;

    /**
     * SequentialMapMessage key.
     * @member {Uint8Array} key
     * @memberof SequentialMapMessage
     * @instance
     */
    SequentialMapMessage.prototype.key = $util.newBuffer([]);

    /**
     * SequentialMapMessage value.
     * @member {Uint8Array} value
     * @memberof SequentialMapMessage
     * @instance
     */
    SequentialMapMessage.prototype.value = $util.newBuffer([]);

    /**
     * Creates a new SequentialMapMessage instance using the specified properties.
     * @function create
     * @memberof SequentialMapMessage
     * @static
     * @param {ISequentialMapMessage=} [properties] Properties to set
     * @returns {SequentialMapMessage} SequentialMapMessage instance
     */
    SequentialMapMessage.create = function create(properties) {
        return new SequentialMapMessage(properties);
    };

    /**
     * Encodes the specified SequentialMapMessage message. Does not implicitly {@link SequentialMapMessage.verify|verify} messages.
     * @function encode
     * @memberof SequentialMapMessage
     * @static
     * @param {ISequentialMapMessage} message SequentialMapMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SequentialMapMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 0, wireType 0 =*/0).int32(message.operation);
        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.key);
        if (message.value != null && Object.hasOwnProperty.call(message, "value"))
            writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.value);
        return writer;
    };

    /**
     * Encodes the specified SequentialMapMessage message, length delimited. Does not implicitly {@link SequentialMapMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SequentialMapMessage
     * @static
     * @param {ISequentialMapMessage} message SequentialMapMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SequentialMapMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SequentialMapMessage message from the specified reader or buffer.
     * @function decode
     * @memberof SequentialMapMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SequentialMapMessage} SequentialMapMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SequentialMapMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SequentialMapMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 0:
                message.operation = reader.int32();
                break;
            case 1:
                message.key = reader.bytes();
                break;
            case 2:
                message.value = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("operation"))
            throw $util.ProtocolError("missing required 'operation'", { instance: message });
        if (!message.hasOwnProperty("key"))
            throw $util.ProtocolError("missing required 'key'", { instance: message });
        return message;
    };

    /**
     * Decodes a SequentialMapMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SequentialMapMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SequentialMapMessage} SequentialMapMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SequentialMapMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SequentialMapMessage message.
     * @function verify
     * @memberof SequentialMapMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SequentialMapMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        switch (message.operation) {
        default:
            return "operation: enum value expected";
        case 0:
        case 1:
            break;
        }
        if (!(message.key && typeof message.key.length === "number" || $util.isString(message.key)))
            return "key: buffer expected";
        if (message.value != null && message.hasOwnProperty("value"))
            if (!(message.value && typeof message.value.length === "number" || $util.isString(message.value)))
                return "value: buffer expected";
        return null;
    };

    /**
     * Creates a SequentialMapMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SequentialMapMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SequentialMapMessage} SequentialMapMessage
     */
    SequentialMapMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.SequentialMapMessage)
            return object;
        var message = new $root.SequentialMapMessage();
        switch (object.operation) {
        case "SET":
        case 0:
            message.operation = 0;
            break;
        case "DELETE":
        case 1:
            message.operation = 1;
            break;
        }
        if (object.key != null)
            if (typeof object.key === "string")
                $util.base64.decode(object.key, message.key = $util.newBuffer($util.base64.length(object.key)), 0);
            else if (object.key.length)
                message.key = object.key;
        if (object.value != null)
            if (typeof object.value === "string")
                $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0);
            else if (object.value.length)
                message.value = object.value;
        return message;
    };

    /**
     * Creates a plain object from a SequentialMapMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SequentialMapMessage
     * @static
     * @param {SequentialMapMessage} message SequentialMapMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SequentialMapMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.operation = options.enums === String ? "SET" : 0;
            if (options.bytes === String)
                object.key = "";
            else {
                object.key = [];
                if (options.bytes !== Array)
                    object.key = $util.newBuffer(object.key);
            }
            if (options.bytes === String)
                object.value = "";
            else {
                object.value = [];
                if (options.bytes !== Array)
                    object.value = $util.newBuffer(object.value);
            }
        }
        if (message.operation != null && message.hasOwnProperty("operation"))
            object.operation = options.enums === String ? $root.SequentialMapMessage.Operation[message.operation] : message.operation;
        if (message.key != null && message.hasOwnProperty("key"))
            object.key = options.bytes === String ? $util.base64.encode(message.key, 0, message.key.length) : options.bytes === Array ? Array.prototype.slice.call(message.key) : message.key;
        if (message.value != null && message.hasOwnProperty("value"))
            object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value;
        return object;
    };

    /**
     * Converts this SequentialMapMessage to JSON.
     * @function toJSON
     * @memberof SequentialMapMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SequentialMapMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Operation enum.
     * @name SequentialMapMessage.Operation
     * @enum {number}
     * @property {number} SET=0 SET value
     * @property {number} DELETE=1 DELETE value
     */
    SequentialMapMessage.Operation = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "SET"] = 0;
        values[valuesById[1] = "DELETE"] = 1;
        return values;
    })();

    return SequentialMapMessage;
})();

$root.SequentialMapEntry = (function() {

    /**
     * Properties of a SequentialMapEntry.
     * @exports ISequentialMapEntry
     * @interface ISequentialMapEntry
     * @property {Uint8Array} key SequentialMapEntry key
     * @property {Uint8Array} value SequentialMapEntry value
     */

    /**
     * Constructs a new SequentialMapEntry.
     * @exports SequentialMapEntry
     * @classdesc Represents a SequentialMapEntry.
     * @implements ISequentialMapEntry
     * @constructor
     * @param {ISequentialMapEntry=} [properties] Properties to set
     */
    function SequentialMapEntry(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * SequentialMapEntry key.
     * @member {Uint8Array} key
     * @memberof SequentialMapEntry
     * @instance
     */
    SequentialMapEntry.prototype.key = $util.newBuffer([]);

    /**
     * SequentialMapEntry value.
     * @member {Uint8Array} value
     * @memberof SequentialMapEntry
     * @instance
     */
    SequentialMapEntry.prototype.value = $util.newBuffer([]);

    /**
     * Creates a new SequentialMapEntry instance using the specified properties.
     * @function create
     * @memberof SequentialMapEntry
     * @static
     * @param {ISequentialMapEntry=} [properties] Properties to set
     * @returns {SequentialMapEntry} SequentialMapEntry instance
     */
    SequentialMapEntry.create = function create(properties) {
        return new SequentialMapEntry(properties);
    };

    /**
     * Encodes the specified SequentialMapEntry message. Does not implicitly {@link SequentialMapEntry.verify|verify} messages.
     * @function encode
     * @memberof SequentialMapEntry
     * @static
     * @param {ISequentialMapEntry} message SequentialMapEntry message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SequentialMapEntry.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.key);
        writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.value);
        return writer;
    };

    /**
     * Encodes the specified SequentialMapEntry message, length delimited. Does not implicitly {@link SequentialMapEntry.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SequentialMapEntry
     * @static
     * @param {ISequentialMapEntry} message SequentialMapEntry message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SequentialMapEntry.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SequentialMapEntry message from the specified reader or buffer.
     * @function decode
     * @memberof SequentialMapEntry
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SequentialMapEntry} SequentialMapEntry
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SequentialMapEntry.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SequentialMapEntry();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.key = reader.bytes();
                break;
            case 2:
                message.value = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("key"))
            throw $util.ProtocolError("missing required 'key'", { instance: message });
        if (!message.hasOwnProperty("value"))
            throw $util.ProtocolError("missing required 'value'", { instance: message });
        return message;
    };

    /**
     * Decodes a SequentialMapEntry message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SequentialMapEntry
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SequentialMapEntry} SequentialMapEntry
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SequentialMapEntry.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SequentialMapEntry message.
     * @function verify
     * @memberof SequentialMapEntry
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SequentialMapEntry.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!(message.key && typeof message.key.length === "number" || $util.isString(message.key)))
            return "key: buffer expected";
        if (!(message.value && typeof message.value.length === "number" || $util.isString(message.value)))
            return "value: buffer expected";
        return null;
    };

    /**
     * Creates a SequentialMapEntry message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SequentialMapEntry
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SequentialMapEntry} SequentialMapEntry
     */
    SequentialMapEntry.fromObject = function fromObject(object) {
        if (object instanceof $root.SequentialMapEntry)
            return object;
        var message = new $root.SequentialMapEntry();
        if (object.key != null)
            if (typeof object.key === "string")
                $util.base64.decode(object.key, message.key = $util.newBuffer($util.base64.length(object.key)), 0);
            else if (object.key.length)
                message.key = object.key;
        if (object.value != null)
            if (typeof object.value === "string")
                $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0);
            else if (object.value.length)
                message.value = object.value;
        return message;
    };

    /**
     * Creates a plain object from a SequentialMapEntry message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SequentialMapEntry
     * @static
     * @param {SequentialMapEntry} message SequentialMapEntry
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SequentialMapEntry.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if (options.bytes === String)
                object.key = "";
            else {
                object.key = [];
                if (options.bytes !== Array)
                    object.key = $util.newBuffer(object.key);
            }
            if (options.bytes === String)
                object.value = "";
            else {
                object.value = [];
                if (options.bytes !== Array)
                    object.value = $util.newBuffer(object.value);
            }
        }
        if (message.key != null && message.hasOwnProperty("key"))
            object.key = options.bytes === String ? $util.base64.encode(message.key, 0, message.key.length) : options.bytes === Array ? Array.prototype.slice.call(message.key) : message.key;
        if (message.value != null && message.hasOwnProperty("value"))
            object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value;
        return object;
    };

    /**
     * Converts this SequentialMapEntry to JSON.
     * @function toJSON
     * @memberof SequentialMapEntry
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SequentialMapEntry.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return SequentialMapEntry;
})();

$root.SequentialMapSave = (function() {

    /**
     * Properties of a SequentialMapSave.
     * @exports ISequentialMapSave
     * @interface ISequentialMapSave
     * @property {Array.<ISequentialMapEntry>|null} [entries] SequentialMapSave entries
     */

    /**
     * Constructs a new SequentialMapSave.
     * @exports SequentialMapSave
     * @classdesc Represents a SequentialMapSave.
     * @implements ISequentialMapSave
     * @constructor
     * @param {ISequentialMapSave=} [properties] Properties to set
     */
    function SequentialMapSave(properties) {
        this.entries = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * SequentialMapSave entries.
     * @member {Array.<ISequentialMapEntry>} entries
     * @memberof SequentialMapSave
     * @instance
     */
    SequentialMapSave.prototype.entries = $util.emptyArray;

    /**
     * Creates a new SequentialMapSave instance using the specified properties.
     * @function create
     * @memberof SequentialMapSave
     * @static
     * @param {ISequentialMapSave=} [properties] Properties to set
     * @returns {SequentialMapSave} SequentialMapSave instance
     */
    SequentialMapSave.create = function create(properties) {
        return new SequentialMapSave(properties);
    };

    /**
     * Encodes the specified SequentialMapSave message. Does not implicitly {@link SequentialMapSave.verify|verify} messages.
     * @function encode
     * @memberof SequentialMapSave
     * @static
     * @param {ISequentialMapSave} message SequentialMapSave message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SequentialMapSave.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.entries != null && message.entries.length)
            for (var i = 0; i < message.entries.length; ++i)
                $root.SequentialMapEntry.encode(message.entries[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified SequentialMapSave message, length delimited. Does not implicitly {@link SequentialMapSave.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SequentialMapSave
     * @static
     * @param {ISequentialMapSave} message SequentialMapSave message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SequentialMapSave.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SequentialMapSave message from the specified reader or buffer.
     * @function decode
     * @memberof SequentialMapSave
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SequentialMapSave} SequentialMapSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SequentialMapSave.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SequentialMapSave();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.entries && message.entries.length))
                    message.entries = [];
                message.entries.push($root.SequentialMapEntry.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a SequentialMapSave message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SequentialMapSave
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SequentialMapSave} SequentialMapSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SequentialMapSave.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SequentialMapSave message.
     * @function verify
     * @memberof SequentialMapSave
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SequentialMapSave.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.entries != null && message.hasOwnProperty("entries")) {
            if (!Array.isArray(message.entries))
                return "entries: array expected";
            for (var i = 0; i < message.entries.length; ++i) {
                var error = $root.SequentialMapEntry.verify(message.entries[i]);
                if (error)
                    return "entries." + error;
            }
        }
        return null;
    };

    /**
     * Creates a SequentialMapSave message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SequentialMapSave
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SequentialMapSave} SequentialMapSave
     */
    SequentialMapSave.fromObject = function fromObject(object) {
        if (object instanceof $root.SequentialMapSave)
            return object;
        var message = new $root.SequentialMapSave();
        if (object.entries) {
            if (!Array.isArray(object.entries))
                throw TypeError(".SequentialMapSave.entries: array expected");
            message.entries = [];
            for (var i = 0; i < object.entries.length; ++i) {
                if (typeof object.entries[i] !== "object")
                    throw TypeError(".SequentialMapSave.entries: object expected");
                message.entries[i] = $root.SequentialMapEntry.fromObject(object.entries[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a SequentialMapSave message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SequentialMapSave
     * @static
     * @param {SequentialMapSave} message SequentialMapSave
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SequentialMapSave.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.entries = [];
        if (message.entries && message.entries.length) {
            object.entries = [];
            for (var j = 0; j < message.entries.length; ++j)
                object.entries[j] = $root.SequentialMapEntry.toObject(message.entries[j], options);
        }
        return object;
    };

    /**
     * Converts this SequentialMapSave to JSON.
     * @function toJSON
     * @memberof SequentialMapSave
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SequentialMapSave.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return SequentialMapSave;
})();

$root.SemidirectProductRevStoredMessage = (function() {

    /**
     * Properties of a SemidirectProductRevStoredMessage.
     * @exports ISemidirectProductRevStoredMessage
     * @interface ISemidirectProductRevStoredMessage
     * @property {number} senderCounter SemidirectProductRevStoredMessage senderCounter
     * @property {number} receiptCounter SemidirectProductRevStoredMessage receiptCounter
     * @property {Array.<string>|null} [targetPath] SemidirectProductRevStoredMessage targetPath
     * @property {Uint8Array|null} [timestamp] SemidirectProductRevStoredMessage timestamp
     * @property {Uint8Array} message SemidirectProductRevStoredMessage message
     */

    /**
     * Constructs a new SemidirectProductRevStoredMessage.
     * @exports SemidirectProductRevStoredMessage
     * @classdesc Represents a SemidirectProductRevStoredMessage.
     * @implements ISemidirectProductRevStoredMessage
     * @constructor
     * @param {ISemidirectProductRevStoredMessage=} [properties] Properties to set
     */
    function SemidirectProductRevStoredMessage(properties) {
        this.targetPath = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * SemidirectProductRevStoredMessage senderCounter.
     * @member {number} senderCounter
     * @memberof SemidirectProductRevStoredMessage
     * @instance
     */
    SemidirectProductRevStoredMessage.prototype.senderCounter = 0;

    /**
     * SemidirectProductRevStoredMessage receiptCounter.
     * @member {number} receiptCounter
     * @memberof SemidirectProductRevStoredMessage
     * @instance
     */
    SemidirectProductRevStoredMessage.prototype.receiptCounter = 0;

    /**
     * SemidirectProductRevStoredMessage targetPath.
     * @member {Array.<string>} targetPath
     * @memberof SemidirectProductRevStoredMessage
     * @instance
     */
    SemidirectProductRevStoredMessage.prototype.targetPath = $util.emptyArray;

    /**
     * SemidirectProductRevStoredMessage timestamp.
     * @member {Uint8Array} timestamp
     * @memberof SemidirectProductRevStoredMessage
     * @instance
     */
    SemidirectProductRevStoredMessage.prototype.timestamp = $util.newBuffer([]);

    /**
     * SemidirectProductRevStoredMessage message.
     * @member {Uint8Array} message
     * @memberof SemidirectProductRevStoredMessage
     * @instance
     */
    SemidirectProductRevStoredMessage.prototype.message = $util.newBuffer([]);

    /**
     * Creates a new SemidirectProductRevStoredMessage instance using the specified properties.
     * @function create
     * @memberof SemidirectProductRevStoredMessage
     * @static
     * @param {ISemidirectProductRevStoredMessage=} [properties] Properties to set
     * @returns {SemidirectProductRevStoredMessage} SemidirectProductRevStoredMessage instance
     */
    SemidirectProductRevStoredMessage.create = function create(properties) {
        return new SemidirectProductRevStoredMessage(properties);
    };

    /**
     * Encodes the specified SemidirectProductRevStoredMessage message. Does not implicitly {@link SemidirectProductRevStoredMessage.verify|verify} messages.
     * @function encode
     * @memberof SemidirectProductRevStoredMessage
     * @static
     * @param {ISemidirectProductRevStoredMessage} message SemidirectProductRevStoredMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SemidirectProductRevStoredMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.senderCounter);
        writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.receiptCounter);
        if (message.targetPath != null && message.targetPath.length)
            for (var i = 0; i < message.targetPath.length; ++i)
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.targetPath[i]);
        if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
            writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.timestamp);
        writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.message);
        return writer;
    };

    /**
     * Encodes the specified SemidirectProductRevStoredMessage message, length delimited. Does not implicitly {@link SemidirectProductRevStoredMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SemidirectProductRevStoredMessage
     * @static
     * @param {ISemidirectProductRevStoredMessage} message SemidirectProductRevStoredMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SemidirectProductRevStoredMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SemidirectProductRevStoredMessage message from the specified reader or buffer.
     * @function decode
     * @memberof SemidirectProductRevStoredMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SemidirectProductRevStoredMessage} SemidirectProductRevStoredMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SemidirectProductRevStoredMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SemidirectProductRevStoredMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.senderCounter = reader.uint32();
                break;
            case 2:
                message.receiptCounter = reader.uint32();
                break;
            case 3:
                if (!(message.targetPath && message.targetPath.length))
                    message.targetPath = [];
                message.targetPath.push(reader.string());
                break;
            case 4:
                message.timestamp = reader.bytes();
                break;
            case 5:
                message.message = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("senderCounter"))
            throw $util.ProtocolError("missing required 'senderCounter'", { instance: message });
        if (!message.hasOwnProperty("receiptCounter"))
            throw $util.ProtocolError("missing required 'receiptCounter'", { instance: message });
        if (!message.hasOwnProperty("message"))
            throw $util.ProtocolError("missing required 'message'", { instance: message });
        return message;
    };

    /**
     * Decodes a SemidirectProductRevStoredMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SemidirectProductRevStoredMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SemidirectProductRevStoredMessage} SemidirectProductRevStoredMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SemidirectProductRevStoredMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SemidirectProductRevStoredMessage message.
     * @function verify
     * @memberof SemidirectProductRevStoredMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SemidirectProductRevStoredMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.senderCounter))
            return "senderCounter: integer expected";
        if (!$util.isInteger(message.receiptCounter))
            return "receiptCounter: integer expected";
        if (message.targetPath != null && message.hasOwnProperty("targetPath")) {
            if (!Array.isArray(message.targetPath))
                return "targetPath: array expected";
            for (var i = 0; i < message.targetPath.length; ++i)
                if (!$util.isString(message.targetPath[i]))
                    return "targetPath: string[] expected";
        }
        if (message.timestamp != null && message.hasOwnProperty("timestamp"))
            if (!(message.timestamp && typeof message.timestamp.length === "number" || $util.isString(message.timestamp)))
                return "timestamp: buffer expected";
        if (!(message.message && typeof message.message.length === "number" || $util.isString(message.message)))
            return "message: buffer expected";
        return null;
    };

    /**
     * Creates a SemidirectProductRevStoredMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SemidirectProductRevStoredMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SemidirectProductRevStoredMessage} SemidirectProductRevStoredMessage
     */
    SemidirectProductRevStoredMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.SemidirectProductRevStoredMessage)
            return object;
        var message = new $root.SemidirectProductRevStoredMessage();
        if (object.senderCounter != null)
            message.senderCounter = object.senderCounter >>> 0;
        if (object.receiptCounter != null)
            message.receiptCounter = object.receiptCounter >>> 0;
        if (object.targetPath) {
            if (!Array.isArray(object.targetPath))
                throw TypeError(".SemidirectProductRevStoredMessage.targetPath: array expected");
            message.targetPath = [];
            for (var i = 0; i < object.targetPath.length; ++i)
                message.targetPath[i] = String(object.targetPath[i]);
        }
        if (object.timestamp != null)
            if (typeof object.timestamp === "string")
                $util.base64.decode(object.timestamp, message.timestamp = $util.newBuffer($util.base64.length(object.timestamp)), 0);
            else if (object.timestamp.length)
                message.timestamp = object.timestamp;
        if (object.message != null)
            if (typeof object.message === "string")
                $util.base64.decode(object.message, message.message = $util.newBuffer($util.base64.length(object.message)), 0);
            else if (object.message.length)
                message.message = object.message;
        return message;
    };

    /**
     * Creates a plain object from a SemidirectProductRevStoredMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SemidirectProductRevStoredMessage
     * @static
     * @param {SemidirectProductRevStoredMessage} message SemidirectProductRevStoredMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SemidirectProductRevStoredMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.targetPath = [];
        if (options.defaults) {
            object.senderCounter = 0;
            object.receiptCounter = 0;
            if (options.bytes === String)
                object.timestamp = "";
            else {
                object.timestamp = [];
                if (options.bytes !== Array)
                    object.timestamp = $util.newBuffer(object.timestamp);
            }
            if (options.bytes === String)
                object.message = "";
            else {
                object.message = [];
                if (options.bytes !== Array)
                    object.message = $util.newBuffer(object.message);
            }
        }
        if (message.senderCounter != null && message.hasOwnProperty("senderCounter"))
            object.senderCounter = message.senderCounter;
        if (message.receiptCounter != null && message.hasOwnProperty("receiptCounter"))
            object.receiptCounter = message.receiptCounter;
        if (message.targetPath && message.targetPath.length) {
            object.targetPath = [];
            for (var j = 0; j < message.targetPath.length; ++j)
                object.targetPath[j] = message.targetPath[j];
        }
        if (message.timestamp != null && message.hasOwnProperty("timestamp"))
            object.timestamp = options.bytes === String ? $util.base64.encode(message.timestamp, 0, message.timestamp.length) : options.bytes === Array ? Array.prototype.slice.call(message.timestamp) : message.timestamp;
        if (message.message != null && message.hasOwnProperty("message"))
            object.message = options.bytes === String ? $util.base64.encode(message.message, 0, message.message.length) : options.bytes === Array ? Array.prototype.slice.call(message.message) : message.message;
        return object;
    };

    /**
     * Converts this SemidirectProductRevStoredMessage to JSON.
     * @function toJSON
     * @memberof SemidirectProductRevStoredMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SemidirectProductRevStoredMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return SemidirectProductRevStoredMessage;
})();

$root.SemidirectProductRevSenderHistory = (function() {

    /**
     * Properties of a SemidirectProductRevSenderHistory.
     * @exports ISemidirectProductRevSenderHistory
     * @interface ISemidirectProductRevSenderHistory
     * @property {Array.<ISemidirectProductStoredMessage>|null} [messages] SemidirectProductRevSenderHistory messages
     */

    /**
     * Constructs a new SemidirectProductRevSenderHistory.
     * @exports SemidirectProductRevSenderHistory
     * @classdesc Represents a SemidirectProductRevSenderHistory.
     * @implements ISemidirectProductRevSenderHistory
     * @constructor
     * @param {ISemidirectProductRevSenderHistory=} [properties] Properties to set
     */
    function SemidirectProductRevSenderHistory(properties) {
        this.messages = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * SemidirectProductRevSenderHistory messages.
     * @member {Array.<ISemidirectProductStoredMessage>} messages
     * @memberof SemidirectProductRevSenderHistory
     * @instance
     */
    SemidirectProductRevSenderHistory.prototype.messages = $util.emptyArray;

    /**
     * Creates a new SemidirectProductRevSenderHistory instance using the specified properties.
     * @function create
     * @memberof SemidirectProductRevSenderHistory
     * @static
     * @param {ISemidirectProductRevSenderHistory=} [properties] Properties to set
     * @returns {SemidirectProductRevSenderHistory} SemidirectProductRevSenderHistory instance
     */
    SemidirectProductRevSenderHistory.create = function create(properties) {
        return new SemidirectProductRevSenderHistory(properties);
    };

    /**
     * Encodes the specified SemidirectProductRevSenderHistory message. Does not implicitly {@link SemidirectProductRevSenderHistory.verify|verify} messages.
     * @function encode
     * @memberof SemidirectProductRevSenderHistory
     * @static
     * @param {ISemidirectProductRevSenderHistory} message SemidirectProductRevSenderHistory message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SemidirectProductRevSenderHistory.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.messages != null && message.messages.length)
            for (var i = 0; i < message.messages.length; ++i)
                $root.SemidirectProductStoredMessage.encode(message.messages[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified SemidirectProductRevSenderHistory message, length delimited. Does not implicitly {@link SemidirectProductRevSenderHistory.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SemidirectProductRevSenderHistory
     * @static
     * @param {ISemidirectProductRevSenderHistory} message SemidirectProductRevSenderHistory message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SemidirectProductRevSenderHistory.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SemidirectProductRevSenderHistory message from the specified reader or buffer.
     * @function decode
     * @memberof SemidirectProductRevSenderHistory
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SemidirectProductRevSenderHistory} SemidirectProductRevSenderHistory
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SemidirectProductRevSenderHistory.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SemidirectProductRevSenderHistory();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.messages && message.messages.length))
                    message.messages = [];
                message.messages.push($root.SemidirectProductStoredMessage.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a SemidirectProductRevSenderHistory message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SemidirectProductRevSenderHistory
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SemidirectProductRevSenderHistory} SemidirectProductRevSenderHistory
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SemidirectProductRevSenderHistory.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SemidirectProductRevSenderHistory message.
     * @function verify
     * @memberof SemidirectProductRevSenderHistory
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SemidirectProductRevSenderHistory.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.messages != null && message.hasOwnProperty("messages")) {
            if (!Array.isArray(message.messages))
                return "messages: array expected";
            for (var i = 0; i < message.messages.length; ++i) {
                var error = $root.SemidirectProductStoredMessage.verify(message.messages[i]);
                if (error)
                    return "messages." + error;
            }
        }
        return null;
    };

    /**
     * Creates a SemidirectProductRevSenderHistory message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SemidirectProductRevSenderHistory
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SemidirectProductRevSenderHistory} SemidirectProductRevSenderHistory
     */
    SemidirectProductRevSenderHistory.fromObject = function fromObject(object) {
        if (object instanceof $root.SemidirectProductRevSenderHistory)
            return object;
        var message = new $root.SemidirectProductRevSenderHistory();
        if (object.messages) {
            if (!Array.isArray(object.messages))
                throw TypeError(".SemidirectProductRevSenderHistory.messages: array expected");
            message.messages = [];
            for (var i = 0; i < object.messages.length; ++i) {
                if (typeof object.messages[i] !== "object")
                    throw TypeError(".SemidirectProductRevSenderHistory.messages: object expected");
                message.messages[i] = $root.SemidirectProductStoredMessage.fromObject(object.messages[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a SemidirectProductRevSenderHistory message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SemidirectProductRevSenderHistory
     * @static
     * @param {SemidirectProductRevSenderHistory} message SemidirectProductRevSenderHistory
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SemidirectProductRevSenderHistory.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.messages = [];
        if (message.messages && message.messages.length) {
            object.messages = [];
            for (var j = 0; j < message.messages.length; ++j)
                object.messages[j] = $root.SemidirectProductStoredMessage.toObject(message.messages[j], options);
        }
        return object;
    };

    /**
     * Converts this SemidirectProductRevSenderHistory to JSON.
     * @function toJSON
     * @memberof SemidirectProductRevSenderHistory
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SemidirectProductRevSenderHistory.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return SemidirectProductRevSenderHistory;
})();

$root.SemidirectProductRevSave = (function() {

    /**
     * Properties of a SemidirectProductRevSave.
     * @exports ISemidirectProductRevSave
     * @interface ISemidirectProductRevSave
     * @property {number} receiptCounter SemidirectProductRevSave receiptCounter
     * @property {Object.<string,ISemidirectProductSenderHistory>|null} [history] SemidirectProductRevSave history
     * @property {Object.<string,string>|null} [messageEvents] SemidirectProductRevSave messageEvents
     * @property {Uint8Array} subclassSave SemidirectProductRevSave subclassSave
     */

    /**
     * Constructs a new SemidirectProductRevSave.
     * @exports SemidirectProductRevSave
     * @classdesc Represents a SemidirectProductRevSave.
     * @implements ISemidirectProductRevSave
     * @constructor
     * @param {ISemidirectProductRevSave=} [properties] Properties to set
     */
    function SemidirectProductRevSave(properties) {
        this.history = {};
        this.messageEvents = {};
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * SemidirectProductRevSave receiptCounter.
     * @member {number} receiptCounter
     * @memberof SemidirectProductRevSave
     * @instance
     */
    SemidirectProductRevSave.prototype.receiptCounter = 0;

    /**
     * SemidirectProductRevSave history.
     * @member {Object.<string,ISemidirectProductSenderHistory>} history
     * @memberof SemidirectProductRevSave
     * @instance
     */
    SemidirectProductRevSave.prototype.history = $util.emptyObject;

    /**
     * SemidirectProductRevSave messageEvents.
     * @member {Object.<string,string>} messageEvents
     * @memberof SemidirectProductRevSave
     * @instance
     */
    SemidirectProductRevSave.prototype.messageEvents = $util.emptyObject;

    /**
     * SemidirectProductRevSave subclassSave.
     * @member {Uint8Array} subclassSave
     * @memberof SemidirectProductRevSave
     * @instance
     */
    SemidirectProductRevSave.prototype.subclassSave = $util.newBuffer([]);

    /**
     * Creates a new SemidirectProductRevSave instance using the specified properties.
     * @function create
     * @memberof SemidirectProductRevSave
     * @static
     * @param {ISemidirectProductRevSave=} [properties] Properties to set
     * @returns {SemidirectProductRevSave} SemidirectProductRevSave instance
     */
    SemidirectProductRevSave.create = function create(properties) {
        return new SemidirectProductRevSave(properties);
    };

    /**
     * Encodes the specified SemidirectProductRevSave message. Does not implicitly {@link SemidirectProductRevSave.verify|verify} messages.
     * @function encode
     * @memberof SemidirectProductRevSave
     * @static
     * @param {ISemidirectProductRevSave} message SemidirectProductRevSave message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SemidirectProductRevSave.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.receiptCounter);
        if (message.history != null && Object.hasOwnProperty.call(message, "history"))
            for (var keys = Object.keys(message.history), i = 0; i < keys.length; ++i) {
                writer.uint32(/* id 2, wireType 2 =*/18).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                $root.SemidirectProductSenderHistory.encode(message.history[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
            }
        if (message.messageEvents != null && Object.hasOwnProperty.call(message, "messageEvents"))
            for (var keys = Object.keys(message.messageEvents), i = 0; i < keys.length; ++i)
                writer.uint32(/* id 3, wireType 2 =*/26).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.messageEvents[keys[i]]).ldelim();
        writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.subclassSave);
        return writer;
    };

    /**
     * Encodes the specified SemidirectProductRevSave message, length delimited. Does not implicitly {@link SemidirectProductRevSave.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SemidirectProductRevSave
     * @static
     * @param {ISemidirectProductRevSave} message SemidirectProductRevSave message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SemidirectProductRevSave.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SemidirectProductRevSave message from the specified reader or buffer.
     * @function decode
     * @memberof SemidirectProductRevSave
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SemidirectProductRevSave} SemidirectProductRevSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SemidirectProductRevSave.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SemidirectProductRevSave(), key, value;
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.receiptCounter = reader.uint32();
                break;
            case 2:
                if (message.history === $util.emptyObject)
                    message.history = {};
                var end2 = reader.uint32() + reader.pos;
                key = "";
                value = null;
                while (reader.pos < end2) {
                    var tag2 = reader.uint32();
                    switch (tag2 >>> 3) {
                    case 1:
                        key = reader.string();
                        break;
                    case 2:
                        value = $root.SemidirectProductSenderHistory.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag2 & 7);
                        break;
                    }
                }
                message.history[key] = value;
                break;
            case 3:
                if (message.messageEvents === $util.emptyObject)
                    message.messageEvents = {};
                var end2 = reader.uint32() + reader.pos;
                key = "";
                value = "";
                while (reader.pos < end2) {
                    var tag2 = reader.uint32();
                    switch (tag2 >>> 3) {
                    case 1:
                        key = reader.string();
                        break;
                    case 2:
                        value = reader.string();
                        break;
                    default:
                        reader.skipType(tag2 & 7);
                        break;
                    }
                }
                message.messageEvents[key] = value;
                break;
            case 4:
                message.subclassSave = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("receiptCounter"))
            throw $util.ProtocolError("missing required 'receiptCounter'", { instance: message });
        if (!message.hasOwnProperty("subclassSave"))
            throw $util.ProtocolError("missing required 'subclassSave'", { instance: message });
        return message;
    };

    /**
     * Decodes a SemidirectProductRevSave message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SemidirectProductRevSave
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SemidirectProductRevSave} SemidirectProductRevSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SemidirectProductRevSave.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SemidirectProductRevSave message.
     * @function verify
     * @memberof SemidirectProductRevSave
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SemidirectProductRevSave.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.receiptCounter))
            return "receiptCounter: integer expected";
        if (message.history != null && message.hasOwnProperty("history")) {
            if (!$util.isObject(message.history))
                return "history: object expected";
            var key = Object.keys(message.history);
            for (var i = 0; i < key.length; ++i) {
                var error = $root.SemidirectProductSenderHistory.verify(message.history[key[i]]);
                if (error)
                    return "history." + error;
            }
        }
        if (message.messageEvents != null && message.hasOwnProperty("messageEvents")) {
            if (!$util.isObject(message.messageEvents))
                return "messageEvents: object expected";
            var key = Object.keys(message.messageEvents);
            for (var i = 0; i < key.length; ++i)
                if (!$util.isString(message.messageEvents[key[i]]))
                    return "messageEvents: string{k:string} expected";
        }
        if (!(message.subclassSave && typeof message.subclassSave.length === "number" || $util.isString(message.subclassSave)))
            return "subclassSave: buffer expected";
        return null;
    };

    /**
     * Creates a SemidirectProductRevSave message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SemidirectProductRevSave
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SemidirectProductRevSave} SemidirectProductRevSave
     */
    SemidirectProductRevSave.fromObject = function fromObject(object) {
        if (object instanceof $root.SemidirectProductRevSave)
            return object;
        var message = new $root.SemidirectProductRevSave();
        if (object.receiptCounter != null)
            message.receiptCounter = object.receiptCounter >>> 0;
        if (object.history) {
            if (typeof object.history !== "object")
                throw TypeError(".SemidirectProductRevSave.history: object expected");
            message.history = {};
            for (var keys = Object.keys(object.history), i = 0; i < keys.length; ++i) {
                if (typeof object.history[keys[i]] !== "object")
                    throw TypeError(".SemidirectProductRevSave.history: object expected");
                message.history[keys[i]] = $root.SemidirectProductSenderHistory.fromObject(object.history[keys[i]]);
            }
        }
        if (object.messageEvents) {
            if (typeof object.messageEvents !== "object")
                throw TypeError(".SemidirectProductRevSave.messageEvents: object expected");
            message.messageEvents = {};
            for (var keys = Object.keys(object.messageEvents), i = 0; i < keys.length; ++i)
                message.messageEvents[keys[i]] = String(object.messageEvents[keys[i]]);
        }
        if (object.subclassSave != null)
            if (typeof object.subclassSave === "string")
                $util.base64.decode(object.subclassSave, message.subclassSave = $util.newBuffer($util.base64.length(object.subclassSave)), 0);
            else if (object.subclassSave.length)
                message.subclassSave = object.subclassSave;
        return message;
    };

    /**
     * Creates a plain object from a SemidirectProductRevSave message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SemidirectProductRevSave
     * @static
     * @param {SemidirectProductRevSave} message SemidirectProductRevSave
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SemidirectProductRevSave.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.objects || options.defaults) {
            object.history = {};
            object.messageEvents = {};
        }
        if (options.defaults) {
            object.receiptCounter = 0;
            if (options.bytes === String)
                object.subclassSave = "";
            else {
                object.subclassSave = [];
                if (options.bytes !== Array)
                    object.subclassSave = $util.newBuffer(object.subclassSave);
            }
        }
        if (message.receiptCounter != null && message.hasOwnProperty("receiptCounter"))
            object.receiptCounter = message.receiptCounter;
        var keys2;
        if (message.history && (keys2 = Object.keys(message.history)).length) {
            object.history = {};
            for (var j = 0; j < keys2.length; ++j)
                object.history[keys2[j]] = $root.SemidirectProductSenderHistory.toObject(message.history[keys2[j]], options);
        }
        if (message.messageEvents && (keys2 = Object.keys(message.messageEvents)).length) {
            object.messageEvents = {};
            for (var j = 0; j < keys2.length; ++j)
                object.messageEvents[keys2[j]] = message.messageEvents[keys2[j]];
        }
        if (message.subclassSave != null && message.hasOwnProperty("subclassSave"))
            object.subclassSave = options.bytes === String ? $util.base64.encode(message.subclassSave, 0, message.subclassSave.length) : options.bytes === Array ? Array.prototype.slice.call(message.subclassSave) : message.subclassSave;
        return object;
    };

    /**
     * Converts this SemidirectProductRevSave to JSON.
     * @function toJSON
     * @memberof SemidirectProductRevSave
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SemidirectProductRevSave.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return SemidirectProductRevSave;
})();

$root.SemidirectProductStoredMessage = (function() {

    /**
     * Properties of a SemidirectProductStoredMessage.
     * @exports ISemidirectProductStoredMessage
     * @interface ISemidirectProductStoredMessage
     * @property {number} senderCounter SemidirectProductStoredMessage senderCounter
     * @property {number} receiptCounter SemidirectProductStoredMessage receiptCounter
     * @property {Array.<string>|null} [targetPath] SemidirectProductStoredMessage targetPath
     * @property {Uint8Array|null} [timestamp] SemidirectProductStoredMessage timestamp
     * @property {Uint8Array} message SemidirectProductStoredMessage message
     */

    /**
     * Constructs a new SemidirectProductStoredMessage.
     * @exports SemidirectProductStoredMessage
     * @classdesc Represents a SemidirectProductStoredMessage.
     * @implements ISemidirectProductStoredMessage
     * @constructor
     * @param {ISemidirectProductStoredMessage=} [properties] Properties to set
     */
    function SemidirectProductStoredMessage(properties) {
        this.targetPath = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * SemidirectProductStoredMessage senderCounter.
     * @member {number} senderCounter
     * @memberof SemidirectProductStoredMessage
     * @instance
     */
    SemidirectProductStoredMessage.prototype.senderCounter = 0;

    /**
     * SemidirectProductStoredMessage receiptCounter.
     * @member {number} receiptCounter
     * @memberof SemidirectProductStoredMessage
     * @instance
     */
    SemidirectProductStoredMessage.prototype.receiptCounter = 0;

    /**
     * SemidirectProductStoredMessage targetPath.
     * @member {Array.<string>} targetPath
     * @memberof SemidirectProductStoredMessage
     * @instance
     */
    SemidirectProductStoredMessage.prototype.targetPath = $util.emptyArray;

    /**
     * SemidirectProductStoredMessage timestamp.
     * @member {Uint8Array} timestamp
     * @memberof SemidirectProductStoredMessage
     * @instance
     */
    SemidirectProductStoredMessage.prototype.timestamp = $util.newBuffer([]);

    /**
     * SemidirectProductStoredMessage message.
     * @member {Uint8Array} message
     * @memberof SemidirectProductStoredMessage
     * @instance
     */
    SemidirectProductStoredMessage.prototype.message = $util.newBuffer([]);

    /**
     * Creates a new SemidirectProductStoredMessage instance using the specified properties.
     * @function create
     * @memberof SemidirectProductStoredMessage
     * @static
     * @param {ISemidirectProductStoredMessage=} [properties] Properties to set
     * @returns {SemidirectProductStoredMessage} SemidirectProductStoredMessage instance
     */
    SemidirectProductStoredMessage.create = function create(properties) {
        return new SemidirectProductStoredMessage(properties);
    };

    /**
     * Encodes the specified SemidirectProductStoredMessage message. Does not implicitly {@link SemidirectProductStoredMessage.verify|verify} messages.
     * @function encode
     * @memberof SemidirectProductStoredMessage
     * @static
     * @param {ISemidirectProductStoredMessage} message SemidirectProductStoredMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SemidirectProductStoredMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.senderCounter);
        writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.receiptCounter);
        if (message.targetPath != null && message.targetPath.length)
            for (var i = 0; i < message.targetPath.length; ++i)
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.targetPath[i]);
        if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
            writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.timestamp);
        writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.message);
        return writer;
    };

    /**
     * Encodes the specified SemidirectProductStoredMessage message, length delimited. Does not implicitly {@link SemidirectProductStoredMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SemidirectProductStoredMessage
     * @static
     * @param {ISemidirectProductStoredMessage} message SemidirectProductStoredMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SemidirectProductStoredMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SemidirectProductStoredMessage message from the specified reader or buffer.
     * @function decode
     * @memberof SemidirectProductStoredMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SemidirectProductStoredMessage} SemidirectProductStoredMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SemidirectProductStoredMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SemidirectProductStoredMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.senderCounter = reader.uint32();
                break;
            case 2:
                message.receiptCounter = reader.uint32();
                break;
            case 3:
                if (!(message.targetPath && message.targetPath.length))
                    message.targetPath = [];
                message.targetPath.push(reader.string());
                break;
            case 4:
                message.timestamp = reader.bytes();
                break;
            case 5:
                message.message = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("senderCounter"))
            throw $util.ProtocolError("missing required 'senderCounter'", { instance: message });
        if (!message.hasOwnProperty("receiptCounter"))
            throw $util.ProtocolError("missing required 'receiptCounter'", { instance: message });
        if (!message.hasOwnProperty("message"))
            throw $util.ProtocolError("missing required 'message'", { instance: message });
        return message;
    };

    /**
     * Decodes a SemidirectProductStoredMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SemidirectProductStoredMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SemidirectProductStoredMessage} SemidirectProductStoredMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SemidirectProductStoredMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SemidirectProductStoredMessage message.
     * @function verify
     * @memberof SemidirectProductStoredMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SemidirectProductStoredMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.senderCounter))
            return "senderCounter: integer expected";
        if (!$util.isInteger(message.receiptCounter))
            return "receiptCounter: integer expected";
        if (message.targetPath != null && message.hasOwnProperty("targetPath")) {
            if (!Array.isArray(message.targetPath))
                return "targetPath: array expected";
            for (var i = 0; i < message.targetPath.length; ++i)
                if (!$util.isString(message.targetPath[i]))
                    return "targetPath: string[] expected";
        }
        if (message.timestamp != null && message.hasOwnProperty("timestamp"))
            if (!(message.timestamp && typeof message.timestamp.length === "number" || $util.isString(message.timestamp)))
                return "timestamp: buffer expected";
        if (!(message.message && typeof message.message.length === "number" || $util.isString(message.message)))
            return "message: buffer expected";
        return null;
    };

    /**
     * Creates a SemidirectProductStoredMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SemidirectProductStoredMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SemidirectProductStoredMessage} SemidirectProductStoredMessage
     */
    SemidirectProductStoredMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.SemidirectProductStoredMessage)
            return object;
        var message = new $root.SemidirectProductStoredMessage();
        if (object.senderCounter != null)
            message.senderCounter = object.senderCounter >>> 0;
        if (object.receiptCounter != null)
            message.receiptCounter = object.receiptCounter >>> 0;
        if (object.targetPath) {
            if (!Array.isArray(object.targetPath))
                throw TypeError(".SemidirectProductStoredMessage.targetPath: array expected");
            message.targetPath = [];
            for (var i = 0; i < object.targetPath.length; ++i)
                message.targetPath[i] = String(object.targetPath[i]);
        }
        if (object.timestamp != null)
            if (typeof object.timestamp === "string")
                $util.base64.decode(object.timestamp, message.timestamp = $util.newBuffer($util.base64.length(object.timestamp)), 0);
            else if (object.timestamp.length)
                message.timestamp = object.timestamp;
        if (object.message != null)
            if (typeof object.message === "string")
                $util.base64.decode(object.message, message.message = $util.newBuffer($util.base64.length(object.message)), 0);
            else if (object.message.length)
                message.message = object.message;
        return message;
    };

    /**
     * Creates a plain object from a SemidirectProductStoredMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SemidirectProductStoredMessage
     * @static
     * @param {SemidirectProductStoredMessage} message SemidirectProductStoredMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SemidirectProductStoredMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.targetPath = [];
        if (options.defaults) {
            object.senderCounter = 0;
            object.receiptCounter = 0;
            if (options.bytes === String)
                object.timestamp = "";
            else {
                object.timestamp = [];
                if (options.bytes !== Array)
                    object.timestamp = $util.newBuffer(object.timestamp);
            }
            if (options.bytes === String)
                object.message = "";
            else {
                object.message = [];
                if (options.bytes !== Array)
                    object.message = $util.newBuffer(object.message);
            }
        }
        if (message.senderCounter != null && message.hasOwnProperty("senderCounter"))
            object.senderCounter = message.senderCounter;
        if (message.receiptCounter != null && message.hasOwnProperty("receiptCounter"))
            object.receiptCounter = message.receiptCounter;
        if (message.targetPath && message.targetPath.length) {
            object.targetPath = [];
            for (var j = 0; j < message.targetPath.length; ++j)
                object.targetPath[j] = message.targetPath[j];
        }
        if (message.timestamp != null && message.hasOwnProperty("timestamp"))
            object.timestamp = options.bytes === String ? $util.base64.encode(message.timestamp, 0, message.timestamp.length) : options.bytes === Array ? Array.prototype.slice.call(message.timestamp) : message.timestamp;
        if (message.message != null && message.hasOwnProperty("message"))
            object.message = options.bytes === String ? $util.base64.encode(message.message, 0, message.message.length) : options.bytes === Array ? Array.prototype.slice.call(message.message) : message.message;
        return object;
    };

    /**
     * Converts this SemidirectProductStoredMessage to JSON.
     * @function toJSON
     * @memberof SemidirectProductStoredMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SemidirectProductStoredMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return SemidirectProductStoredMessage;
})();

$root.SemidirectProductSenderHistory = (function() {

    /**
     * Properties of a SemidirectProductSenderHistory.
     * @exports ISemidirectProductSenderHistory
     * @interface ISemidirectProductSenderHistory
     * @property {Array.<ISemidirectProductStoredMessage>|null} [messages] SemidirectProductSenderHistory messages
     */

    /**
     * Constructs a new SemidirectProductSenderHistory.
     * @exports SemidirectProductSenderHistory
     * @classdesc Represents a SemidirectProductSenderHistory.
     * @implements ISemidirectProductSenderHistory
     * @constructor
     * @param {ISemidirectProductSenderHistory=} [properties] Properties to set
     */
    function SemidirectProductSenderHistory(properties) {
        this.messages = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * SemidirectProductSenderHistory messages.
     * @member {Array.<ISemidirectProductStoredMessage>} messages
     * @memberof SemidirectProductSenderHistory
     * @instance
     */
    SemidirectProductSenderHistory.prototype.messages = $util.emptyArray;

    /**
     * Creates a new SemidirectProductSenderHistory instance using the specified properties.
     * @function create
     * @memberof SemidirectProductSenderHistory
     * @static
     * @param {ISemidirectProductSenderHistory=} [properties] Properties to set
     * @returns {SemidirectProductSenderHistory} SemidirectProductSenderHistory instance
     */
    SemidirectProductSenderHistory.create = function create(properties) {
        return new SemidirectProductSenderHistory(properties);
    };

    /**
     * Encodes the specified SemidirectProductSenderHistory message. Does not implicitly {@link SemidirectProductSenderHistory.verify|verify} messages.
     * @function encode
     * @memberof SemidirectProductSenderHistory
     * @static
     * @param {ISemidirectProductSenderHistory} message SemidirectProductSenderHistory message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SemidirectProductSenderHistory.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.messages != null && message.messages.length)
            for (var i = 0; i < message.messages.length; ++i)
                $root.SemidirectProductStoredMessage.encode(message.messages[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified SemidirectProductSenderHistory message, length delimited. Does not implicitly {@link SemidirectProductSenderHistory.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SemidirectProductSenderHistory
     * @static
     * @param {ISemidirectProductSenderHistory} message SemidirectProductSenderHistory message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SemidirectProductSenderHistory.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SemidirectProductSenderHistory message from the specified reader or buffer.
     * @function decode
     * @memberof SemidirectProductSenderHistory
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SemidirectProductSenderHistory} SemidirectProductSenderHistory
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SemidirectProductSenderHistory.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SemidirectProductSenderHistory();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.messages && message.messages.length))
                    message.messages = [];
                message.messages.push($root.SemidirectProductStoredMessage.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a SemidirectProductSenderHistory message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SemidirectProductSenderHistory
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SemidirectProductSenderHistory} SemidirectProductSenderHistory
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SemidirectProductSenderHistory.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SemidirectProductSenderHistory message.
     * @function verify
     * @memberof SemidirectProductSenderHistory
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SemidirectProductSenderHistory.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.messages != null && message.hasOwnProperty("messages")) {
            if (!Array.isArray(message.messages))
                return "messages: array expected";
            for (var i = 0; i < message.messages.length; ++i) {
                var error = $root.SemidirectProductStoredMessage.verify(message.messages[i]);
                if (error)
                    return "messages." + error;
            }
        }
        return null;
    };

    /**
     * Creates a SemidirectProductSenderHistory message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SemidirectProductSenderHistory
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SemidirectProductSenderHistory} SemidirectProductSenderHistory
     */
    SemidirectProductSenderHistory.fromObject = function fromObject(object) {
        if (object instanceof $root.SemidirectProductSenderHistory)
            return object;
        var message = new $root.SemidirectProductSenderHistory();
        if (object.messages) {
            if (!Array.isArray(object.messages))
                throw TypeError(".SemidirectProductSenderHistory.messages: array expected");
            message.messages = [];
            for (var i = 0; i < object.messages.length; ++i) {
                if (typeof object.messages[i] !== "object")
                    throw TypeError(".SemidirectProductSenderHistory.messages: object expected");
                message.messages[i] = $root.SemidirectProductStoredMessage.fromObject(object.messages[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a SemidirectProductSenderHistory message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SemidirectProductSenderHistory
     * @static
     * @param {SemidirectProductSenderHistory} message SemidirectProductSenderHistory
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SemidirectProductSenderHistory.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.messages = [];
        if (message.messages && message.messages.length) {
            object.messages = [];
            for (var j = 0; j < message.messages.length; ++j)
                object.messages[j] = $root.SemidirectProductStoredMessage.toObject(message.messages[j], options);
        }
        return object;
    };

    /**
     * Converts this SemidirectProductSenderHistory to JSON.
     * @function toJSON
     * @memberof SemidirectProductSenderHistory
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SemidirectProductSenderHistory.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return SemidirectProductSenderHistory;
})();

$root.SemidirectProductSave = (function() {

    /**
     * Properties of a SemidirectProductSave.
     * @exports ISemidirectProductSave
     * @interface ISemidirectProductSave
     * @property {number} receiptCounter SemidirectProductSave receiptCounter
     * @property {Object.<string,ISemidirectProductSenderHistory>|null} [history] SemidirectProductSave history
     */

    /**
     * Constructs a new SemidirectProductSave.
     * @exports SemidirectProductSave
     * @classdesc Represents a SemidirectProductSave.
     * @implements ISemidirectProductSave
     * @constructor
     * @param {ISemidirectProductSave=} [properties] Properties to set
     */
    function SemidirectProductSave(properties) {
        this.history = {};
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * SemidirectProductSave receiptCounter.
     * @member {number} receiptCounter
     * @memberof SemidirectProductSave
     * @instance
     */
    SemidirectProductSave.prototype.receiptCounter = 0;

    /**
     * SemidirectProductSave history.
     * @member {Object.<string,ISemidirectProductSenderHistory>} history
     * @memberof SemidirectProductSave
     * @instance
     */
    SemidirectProductSave.prototype.history = $util.emptyObject;

    /**
     * Creates a new SemidirectProductSave instance using the specified properties.
     * @function create
     * @memberof SemidirectProductSave
     * @static
     * @param {ISemidirectProductSave=} [properties] Properties to set
     * @returns {SemidirectProductSave} SemidirectProductSave instance
     */
    SemidirectProductSave.create = function create(properties) {
        return new SemidirectProductSave(properties);
    };

    /**
     * Encodes the specified SemidirectProductSave message. Does not implicitly {@link SemidirectProductSave.verify|verify} messages.
     * @function encode
     * @memberof SemidirectProductSave
     * @static
     * @param {ISemidirectProductSave} message SemidirectProductSave message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SemidirectProductSave.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.receiptCounter);
        if (message.history != null && Object.hasOwnProperty.call(message, "history"))
            for (var keys = Object.keys(message.history), i = 0; i < keys.length; ++i) {
                writer.uint32(/* id 2, wireType 2 =*/18).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                $root.SemidirectProductSenderHistory.encode(message.history[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
            }
        return writer;
    };

    /**
     * Encodes the specified SemidirectProductSave message, length delimited. Does not implicitly {@link SemidirectProductSave.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SemidirectProductSave
     * @static
     * @param {ISemidirectProductSave} message SemidirectProductSave message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SemidirectProductSave.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SemidirectProductSave message from the specified reader or buffer.
     * @function decode
     * @memberof SemidirectProductSave
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SemidirectProductSave} SemidirectProductSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SemidirectProductSave.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SemidirectProductSave(), key, value;
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.receiptCounter = reader.uint32();
                break;
            case 2:
                if (message.history === $util.emptyObject)
                    message.history = {};
                var end2 = reader.uint32() + reader.pos;
                key = "";
                value = null;
                while (reader.pos < end2) {
                    var tag2 = reader.uint32();
                    switch (tag2 >>> 3) {
                    case 1:
                        key = reader.string();
                        break;
                    case 2:
                        value = $root.SemidirectProductSenderHistory.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag2 & 7);
                        break;
                    }
                }
                message.history[key] = value;
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("receiptCounter"))
            throw $util.ProtocolError("missing required 'receiptCounter'", { instance: message });
        return message;
    };

    /**
     * Decodes a SemidirectProductSave message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SemidirectProductSave
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SemidirectProductSave} SemidirectProductSave
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SemidirectProductSave.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SemidirectProductSave message.
     * @function verify
     * @memberof SemidirectProductSave
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SemidirectProductSave.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.receiptCounter))
            return "receiptCounter: integer expected";
        if (message.history != null && message.hasOwnProperty("history")) {
            if (!$util.isObject(message.history))
                return "history: object expected";
            var key = Object.keys(message.history);
            for (var i = 0; i < key.length; ++i) {
                var error = $root.SemidirectProductSenderHistory.verify(message.history[key[i]]);
                if (error)
                    return "history." + error;
            }
        }
        return null;
    };

    /**
     * Creates a SemidirectProductSave message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SemidirectProductSave
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SemidirectProductSave} SemidirectProductSave
     */
    SemidirectProductSave.fromObject = function fromObject(object) {
        if (object instanceof $root.SemidirectProductSave)
            return object;
        var message = new $root.SemidirectProductSave();
        if (object.receiptCounter != null)
            message.receiptCounter = object.receiptCounter >>> 0;
        if (object.history) {
            if (typeof object.history !== "object")
                throw TypeError(".SemidirectProductSave.history: object expected");
            message.history = {};
            for (var keys = Object.keys(object.history), i = 0; i < keys.length; ++i) {
                if (typeof object.history[keys[i]] !== "object")
                    throw TypeError(".SemidirectProductSave.history: object expected");
                message.history[keys[i]] = $root.SemidirectProductSenderHistory.fromObject(object.history[keys[i]]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a SemidirectProductSave message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SemidirectProductSave
     * @static
     * @param {SemidirectProductSave} message SemidirectProductSave
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SemidirectProductSave.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.objects || options.defaults)
            object.history = {};
        if (options.defaults)
            object.receiptCounter = 0;
        if (message.receiptCounter != null && message.hasOwnProperty("receiptCounter"))
            object.receiptCounter = message.receiptCounter;
        var keys2;
        if (message.history && (keys2 = Object.keys(message.history)).length) {
            object.history = {};
            for (var j = 0; j < keys2.length; ++j)
                object.history[keys2[j]] = $root.SemidirectProductSenderHistory.toObject(message.history[keys2[j]], options);
        }
        return object;
    };

    /**
     * Converts this SemidirectProductSave to JSON.
     * @function toJSON
     * @memberof SemidirectProductSave
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SemidirectProductSave.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return SemidirectProductSave;
})();

module.exports = $root;

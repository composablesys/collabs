/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

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

module.exports = $root;

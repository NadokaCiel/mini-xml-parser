import { readFileSync, writeFileSync } from 'fs';
import { join, relative, resolve, dirname } from 'path';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var replaceMappings = {
    "wx:if": "a:if",
    "wx:elif": "a:elif",
    "wx:else": "a:else",
    "wx:for": "a:for",
    "wx:for-index": "a:for-index",
    "wx:for-item": "a:for-item",
    "wx:key": "a:key",
    "bind:tap": "onTap",
    "catch:tap": "catchTap",
    "bind:longtap": "longTap",
    "catch:longtap": "longTap",
    "bind:touchstart": "touchstart",
    "catch:touchstart": "touchstart",
    "bind:touchmove": "touchmove",
    "catch:touchmove": "touchmove",
    "bind:touchend": "touchend",
    "catch:touchend": "touchend",
    "bind:touchcancel": "touchcancel",
    "catch:touchcancel": "touchcancel",
};

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}

var unicode = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUndefinedCodePoint = exports.isControlCodePoint = exports.getSurrogatePairCodePoint = exports.isSurrogatePair = exports.isSurrogate = exports.SEQUENCES = exports.CODE_POINTS = exports.REPLACEMENT_CHARACTER = void 0;
const UNDEFINED_CODE_POINTS = new Set([
    65534, 65535, 131070, 131071, 196606, 196607, 262142, 262143, 327678, 327679, 393214,
    393215, 458750, 458751, 524286, 524287, 589822, 589823, 655358, 655359, 720894,
    720895, 786430, 786431, 851966, 851967, 917502, 917503, 983038, 983039, 1048574,
    1048575, 1114110, 1114111,
]);
exports.REPLACEMENT_CHARACTER = '\uFFFD';
(function (CODE_POINTS) {
    CODE_POINTS[CODE_POINTS["EOF"] = -1] = "EOF";
    CODE_POINTS[CODE_POINTS["NULL"] = 0] = "NULL";
    CODE_POINTS[CODE_POINTS["TABULATION"] = 9] = "TABULATION";
    CODE_POINTS[CODE_POINTS["CARRIAGE_RETURN"] = 13] = "CARRIAGE_RETURN";
    CODE_POINTS[CODE_POINTS["LINE_FEED"] = 10] = "LINE_FEED";
    CODE_POINTS[CODE_POINTS["FORM_FEED"] = 12] = "FORM_FEED";
    CODE_POINTS[CODE_POINTS["SPACE"] = 32] = "SPACE";
    CODE_POINTS[CODE_POINTS["EXCLAMATION_MARK"] = 33] = "EXCLAMATION_MARK";
    CODE_POINTS[CODE_POINTS["QUOTATION_MARK"] = 34] = "QUOTATION_MARK";
    CODE_POINTS[CODE_POINTS["NUMBER_SIGN"] = 35] = "NUMBER_SIGN";
    CODE_POINTS[CODE_POINTS["AMPERSAND"] = 38] = "AMPERSAND";
    CODE_POINTS[CODE_POINTS["APOSTROPHE"] = 39] = "APOSTROPHE";
    CODE_POINTS[CODE_POINTS["HYPHEN_MINUS"] = 45] = "HYPHEN_MINUS";
    CODE_POINTS[CODE_POINTS["SOLIDUS"] = 47] = "SOLIDUS";
    CODE_POINTS[CODE_POINTS["DIGIT_0"] = 48] = "DIGIT_0";
    CODE_POINTS[CODE_POINTS["DIGIT_9"] = 57] = "DIGIT_9";
    CODE_POINTS[CODE_POINTS["SEMICOLON"] = 59] = "SEMICOLON";
    CODE_POINTS[CODE_POINTS["LESS_THAN_SIGN"] = 60] = "LESS_THAN_SIGN";
    CODE_POINTS[CODE_POINTS["EQUALS_SIGN"] = 61] = "EQUALS_SIGN";
    CODE_POINTS[CODE_POINTS["GREATER_THAN_SIGN"] = 62] = "GREATER_THAN_SIGN";
    CODE_POINTS[CODE_POINTS["QUESTION_MARK"] = 63] = "QUESTION_MARK";
    CODE_POINTS[CODE_POINTS["LATIN_CAPITAL_A"] = 65] = "LATIN_CAPITAL_A";
    CODE_POINTS[CODE_POINTS["LATIN_CAPITAL_F"] = 70] = "LATIN_CAPITAL_F";
    CODE_POINTS[CODE_POINTS["LATIN_CAPITAL_X"] = 88] = "LATIN_CAPITAL_X";
    CODE_POINTS[CODE_POINTS["LATIN_CAPITAL_Z"] = 90] = "LATIN_CAPITAL_Z";
    CODE_POINTS[CODE_POINTS["RIGHT_SQUARE_BRACKET"] = 93] = "RIGHT_SQUARE_BRACKET";
    CODE_POINTS[CODE_POINTS["GRAVE_ACCENT"] = 96] = "GRAVE_ACCENT";
    CODE_POINTS[CODE_POINTS["LATIN_SMALL_A"] = 97] = "LATIN_SMALL_A";
    CODE_POINTS[CODE_POINTS["LATIN_SMALL_F"] = 102] = "LATIN_SMALL_F";
    CODE_POINTS[CODE_POINTS["LATIN_SMALL_X"] = 120] = "LATIN_SMALL_X";
    CODE_POINTS[CODE_POINTS["LATIN_SMALL_Z"] = 122] = "LATIN_SMALL_Z";
    CODE_POINTS[CODE_POINTS["REPLACEMENT_CHARACTER"] = 65533] = "REPLACEMENT_CHARACTER";
})(exports.CODE_POINTS || (exports.CODE_POINTS = {}));
exports.SEQUENCES = {
    DASH_DASH: '--',
    CDATA_START: '[CDATA[',
    DOCTYPE: 'doctype',
    SCRIPT: 'script',
    PUBLIC: 'public',
    SYSTEM: 'system',
};
//Surrogates
function isSurrogate(cp) {
    return cp >= 55296 && cp <= 57343;
}
exports.isSurrogate = isSurrogate;
function isSurrogatePair(cp) {
    return cp >= 56320 && cp <= 57343;
}
exports.isSurrogatePair = isSurrogatePair;
function getSurrogatePairCodePoint(cp1, cp2) {
    return (cp1 - 55296) * 1024 + 9216 + cp2;
}
exports.getSurrogatePairCodePoint = getSurrogatePairCodePoint;
//NOTE: excluding NULL and ASCII whitespace
function isControlCodePoint(cp) {
    return ((cp !== 0x20 && cp !== 0x0a && cp !== 0x0d && cp !== 0x09 && cp !== 0x0c && cp >= 0x01 && cp <= 0x1f) ||
        (cp >= 0x7f && cp <= 0x9f));
}
exports.isControlCodePoint = isControlCodePoint;
function isUndefinedCodePoint(cp) {
    return (cp >= 64976 && cp <= 65007) || UNDEFINED_CODE_POINTS.has(cp);
}
exports.isUndefinedCodePoint = isUndefinedCodePoint;

});

var errorCodes = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERR = void 0;
(function (ERR) {
    ERR["controlCharacterInInputStream"] = "control-character-in-input-stream";
    ERR["noncharacterInInputStream"] = "noncharacter-in-input-stream";
    ERR["surrogateInInputStream"] = "surrogate-in-input-stream";
    ERR["nonVoidHtmlElementStartTagWithTrailingSolidus"] = "non-void-html-element-start-tag-with-trailing-solidus";
    ERR["endTagWithAttributes"] = "end-tag-with-attributes";
    ERR["endTagWithTrailingSolidus"] = "end-tag-with-trailing-solidus";
    ERR["unexpectedSolidusInTag"] = "unexpected-solidus-in-tag";
    ERR["unexpectedNullCharacter"] = "unexpected-null-character";
    ERR["unexpectedQuestionMarkInsteadOfTagName"] = "unexpected-question-mark-instead-of-tag-name";
    ERR["invalidFirstCharacterOfTagName"] = "invalid-first-character-of-tag-name";
    ERR["unexpectedEqualsSignBeforeAttributeName"] = "unexpected-equals-sign-before-attribute-name";
    ERR["missingEndTagName"] = "missing-end-tag-name";
    ERR["unexpectedCharacterInAttributeName"] = "unexpected-character-in-attribute-name";
    ERR["unknownNamedCharacterReference"] = "unknown-named-character-reference";
    ERR["missingSemicolonAfterCharacterReference"] = "missing-semicolon-after-character-reference";
    ERR["unexpectedCharacterAfterDoctypeSystemIdentifier"] = "unexpected-character-after-doctype-system-identifier";
    ERR["unexpectedCharacterInUnquotedAttributeValue"] = "unexpected-character-in-unquoted-attribute-value";
    ERR["eofBeforeTagName"] = "eof-before-tag-name";
    ERR["eofInTag"] = "eof-in-tag";
    ERR["missingAttributeValue"] = "missing-attribute-value";
    ERR["missingWhitespaceBetweenAttributes"] = "missing-whitespace-between-attributes";
    ERR["missingWhitespaceAfterDoctypePublicKeyword"] = "missing-whitespace-after-doctype-public-keyword";
    ERR["missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers"] = "missing-whitespace-between-doctype-public-and-system-identifiers";
    ERR["missingWhitespaceAfterDoctypeSystemKeyword"] = "missing-whitespace-after-doctype-system-keyword";
    ERR["missingQuoteBeforeDoctypePublicIdentifier"] = "missing-quote-before-doctype-public-identifier";
    ERR["missingQuoteBeforeDoctypeSystemIdentifier"] = "missing-quote-before-doctype-system-identifier";
    ERR["missingDoctypePublicIdentifier"] = "missing-doctype-public-identifier";
    ERR["missingDoctypeSystemIdentifier"] = "missing-doctype-system-identifier";
    ERR["abruptDoctypePublicIdentifier"] = "abrupt-doctype-public-identifier";
    ERR["abruptDoctypeSystemIdentifier"] = "abrupt-doctype-system-identifier";
    ERR["cdataInHtmlContent"] = "cdata-in-html-content";
    ERR["incorrectlyOpenedComment"] = "incorrectly-opened-comment";
    ERR["eofInScriptHtmlCommentLikeText"] = "eof-in-script-html-comment-like-text";
    ERR["eofInDoctype"] = "eof-in-doctype";
    ERR["nestedComment"] = "nested-comment";
    ERR["abruptClosingOfEmptyComment"] = "abrupt-closing-of-empty-comment";
    ERR["eofInComment"] = "eof-in-comment";
    ERR["incorrectlyClosedComment"] = "incorrectly-closed-comment";
    ERR["eofInCdata"] = "eof-in-cdata";
    ERR["absenceOfDigitsInNumericCharacterReference"] = "absence-of-digits-in-numeric-character-reference";
    ERR["nullCharacterReference"] = "null-character-reference";
    ERR["surrogateCharacterReference"] = "surrogate-character-reference";
    ERR["characterReferenceOutsideUnicodeRange"] = "character-reference-outside-unicode-range";
    ERR["controlCharacterReference"] = "control-character-reference";
    ERR["noncharacterCharacterReference"] = "noncharacter-character-reference";
    ERR["missingWhitespaceBeforeDoctypeName"] = "missing-whitespace-before-doctype-name";
    ERR["missingDoctypeName"] = "missing-doctype-name";
    ERR["invalidCharacterSequenceAfterDoctypeName"] = "invalid-character-sequence-after-doctype-name";
    ERR["duplicateAttribute"] = "duplicate-attribute";
    ERR["nonConformingDoctype"] = "non-conforming-doctype";
    ERR["missingDoctype"] = "missing-doctype";
    ERR["misplacedDoctype"] = "misplaced-doctype";
    ERR["endTagWithoutMatchingOpenElement"] = "end-tag-without-matching-open-element";
    ERR["closingOfElementWithOpenChildElements"] = "closing-of-element-with-open-child-elements";
    ERR["disallowedContentInNoscriptInHead"] = "disallowed-content-in-noscript-in-head";
    ERR["openElementsLeftAfterEof"] = "open-elements-left-after-eof";
    ERR["abandonedHeadElementChild"] = "abandoned-head-element-child";
    ERR["misplacedStartTagForHeadElement"] = "misplaced-start-tag-for-head-element";
    ERR["nestedNoscriptInHead"] = "nested-noscript-in-head";
    ERR["eofInElementThatCanContainOnlyText"] = "eof-in-element-that-can-contain-only-text";
})(exports.ERR || (exports.ERR = {}));

});

var preprocessor = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.Preprocessor = void 0;


//Const
const DEFAULT_BUFFER_WATERLINE = 1 << 16;
//Preprocessor
//NOTE: HTML input preprocessing
//(see: http://www.whatwg.org/specs/web-apps/current-work/multipage/parsing.html#preprocessing-the-input-stream)
class Preprocessor {
    constructor(handler) {
        this.handler = handler;
        this.html = '';
        this.pos = -1;
        // NOTE: Initial `lastGapPos` is -2, to ensure `col` on initialisation is 0
        this.lastGapPos = -2;
        this.gapStack = [];
        this.skipNextNewLine = false;
        this.lastChunkWritten = false;
        this.endOfChunkHit = false;
        this.bufferWaterline = DEFAULT_BUFFER_WATERLINE;
        this.isEol = false;
        this.lineStartPos = 0;
        this.droppedBufferSize = 0;
        this.line = 1;
        //NOTE: avoid reporting errors twice on advance/retreat
        this.lastErrOffset = -1;
    }
    /** The column on the current line. If we just saw a gap (eg. a surrogate pair), return the index before. */
    get col() {
        return this.pos - this.lineStartPos + Number(this.lastGapPos !== this.pos);
    }
    get offset() {
        return this.droppedBufferSize + this.pos;
    }
    getError(code) {
        const { line, col, offset } = this;
        return {
            code,
            startLine: line,
            endLine: line,
            startCol: col,
            endCol: col,
            startOffset: offset,
            endOffset: offset,
        };
    }
    _err(code) {
        if (this.handler.onParseError && this.lastErrOffset !== this.offset) {
            this.lastErrOffset = this.offset;
            this.handler.onParseError(this.getError(code));
        }
    }
    _addGap() {
        this.gapStack.push(this.lastGapPos);
        this.lastGapPos = this.pos;
    }
    _processSurrogate(cp) {
        //NOTE: try to peek a surrogate pair
        if (this.pos !== this.html.length - 1) {
            const nextCp = this.html.charCodeAt(this.pos + 1);
            if ((0, unicode.isSurrogatePair)(nextCp)) {
                //NOTE: we have a surrogate pair. Peek pair character and recalculate code point.
                this.pos++;
                //NOTE: add a gap that should be avoided during retreat
                this._addGap();
                return (0, unicode.getSurrogatePairCodePoint)(cp, nextCp);
            }
        }
        //NOTE: we are at the end of a chunk, therefore we can't infer the surrogate pair yet.
        else if (!this.lastChunkWritten) {
            this.endOfChunkHit = true;
            return unicode.CODE_POINTS.EOF;
        }
        //NOTE: isolated surrogate
        this._err(errorCodes.ERR.surrogateInInputStream);
        return cp;
    }
    willDropParsedChunk() {
        return this.pos > this.bufferWaterline;
    }
    dropParsedChunk() {
        if (this.willDropParsedChunk()) {
            this.html = this.html.substring(this.pos);
            this.lineStartPos -= this.pos;
            this.droppedBufferSize += this.pos;
            this.pos = 0;
            this.lastGapPos = -2;
            this.gapStack.length = 0;
        }
    }
    write(chunk, isLastChunk) {
        if (this.html.length > 0) {
            this.html += chunk;
        }
        else {
            this.html = chunk;
        }
        this.endOfChunkHit = false;
        this.lastChunkWritten = isLastChunk;
    }
    insertHtmlAtCurrentPos(chunk) {
        this.html = this.html.substring(0, this.pos + 1) + chunk + this.html.substring(this.pos + 1);
        this.endOfChunkHit = false;
    }
    startsWith(pattern, caseSensitive) {
        // Check if our buffer has enough characters
        if (this.pos + pattern.length > this.html.length) {
            this.endOfChunkHit = !this.lastChunkWritten;
            return false;
        }
        if (caseSensitive) {
            return this.html.startsWith(pattern, this.pos);
        }
        for (let i = 0; i < pattern.length; i++) {
            const cp = this.html.charCodeAt(this.pos + i) | 0x20;
            if (cp !== pattern.charCodeAt(i)) {
                return false;
            }
        }
        return true;
    }
    peek(offset) {
        const pos = this.pos + offset;
        if (pos >= this.html.length) {
            this.endOfChunkHit = !this.lastChunkWritten;
            return unicode.CODE_POINTS.EOF;
        }
        return this.html.charCodeAt(pos);
    }
    advance() {
        this.pos++;
        //NOTE: LF should be in the last column of the line
        if (this.isEol) {
            this.isEol = false;
            this.line++;
            this.lineStartPos = this.pos;
        }
        if (this.pos >= this.html.length) {
            this.endOfChunkHit = !this.lastChunkWritten;
            return unicode.CODE_POINTS.EOF;
        }
        let cp = this.html.charCodeAt(this.pos);
        //NOTE: all U+000D CARRIAGE RETURN (CR) characters must be converted to U+000A LINE FEED (LF) characters
        if (cp === unicode.CODE_POINTS.CARRIAGE_RETURN) {
            this.isEol = true;
            this.skipNextNewLine = true;
            return unicode.CODE_POINTS.LINE_FEED;
        }
        //NOTE: any U+000A LINE FEED (LF) characters that immediately follow a U+000D CARRIAGE RETURN (CR) character
        //must be ignored.
        if (cp === unicode.CODE_POINTS.LINE_FEED) {
            this.isEol = true;
            if (this.skipNextNewLine) {
                // `line` will be bumped again in the recursive call.
                this.line--;
                this.skipNextNewLine = false;
                this._addGap();
                return this.advance();
            }
        }
        this.skipNextNewLine = false;
        if ((0, unicode.isSurrogate)(cp)) {
            cp = this._processSurrogate(cp);
        }
        //OPTIMIZATION: first check if code point is in the common allowed
        //range (ASCII alphanumeric, whitespaces, big chunk of BMP)
        //before going into detailed performance cost validation.
        const isCommonValidRange = this.handler.onParseError === null ||
            (cp > 0x1f && cp < 0x7f) ||
            cp === unicode.CODE_POINTS.LINE_FEED ||
            cp === unicode.CODE_POINTS.CARRIAGE_RETURN ||
            (cp > 0x9f && cp < 64976);
        if (!isCommonValidRange) {
            this._checkForProblematicCharacters(cp);
        }
        return cp;
    }
    _checkForProblematicCharacters(cp) {
        if ((0, unicode.isControlCodePoint)(cp)) {
            this._err(errorCodes.ERR.controlCharacterInInputStream);
        }
        else if ((0, unicode.isUndefinedCodePoint)(cp)) {
            this._err(errorCodes.ERR.noncharacterInInputStream);
        }
    }
    retreat(count) {
        this.pos -= count;
        while (this.pos < this.lastGapPos) {
            this.lastGapPos = this.gapStack.pop();
            this.pos--;
        }
        this.isEol = false;
    }
}
exports.Preprocessor = Preprocessor;

});

var token = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenAttr = exports.TokenType = void 0;
(function (TokenType) {
    TokenType[TokenType["CHARACTER"] = 0] = "CHARACTER";
    TokenType[TokenType["NULL_CHARACTER"] = 1] = "NULL_CHARACTER";
    TokenType[TokenType["WHITESPACE_CHARACTER"] = 2] = "WHITESPACE_CHARACTER";
    TokenType[TokenType["START_TAG"] = 3] = "START_TAG";
    TokenType[TokenType["END_TAG"] = 4] = "END_TAG";
    TokenType[TokenType["COMMENT"] = 5] = "COMMENT";
    TokenType[TokenType["DOCTYPE"] = 6] = "DOCTYPE";
    TokenType[TokenType["EOF"] = 7] = "EOF";
    TokenType[TokenType["HIBERNATION"] = 8] = "HIBERNATION";
})(exports.TokenType || (exports.TokenType = {}));
function getTokenAttr(token, attrName) {
    for (let i = token.attrs.length - 1; i >= 0; i--) {
        if (token.attrs[i].name === attrName) {
            return token.attrs[i].value;
        }
    }
    return null;
}
exports.getTokenAttr = getTokenAttr;

});

// Generated using scripts/write-decode-map.ts
// prettier-ignore
var _default$2 = new Uint16Array([7489, 60, 213, 305, 650, 1181, 1403, 1488, 1653, 1758, 1954, 2006, 2063, 2634, 2705, 3489, 3693, 3849, 3878, 4298, 4648, 4833, 5141, 5277, 5315, 5343, 5413, 0, 0, 0, 0, 0, 0, 5483, 5837, 6541, 7186, 7645, 8062, 8288, 8624, 8845, 9152, 9211, 9282, 10276, 10514, 11528, 11848, 12238, 12310, 12986, 13881, 14252, 14590, 14888, 14961, 15072, 15150, 2048, 69, 77, 97, 98, 99, 102, 103, 108, 109, 110, 111, 112, 114, 115, 116, 117, 92, 98, 102, 109, 115, 127, 132, 139, 144, 149, 152, 166, 179, 185, 200, 207, 108, 105, 103, 32827, 198, 16582, 80, 32827, 38, 16422, 99, 117, 116, 101, 32827, 193, 16577, 114, 101, 118, 101, 59, 16642, 256, 105, 121, 120, 125, 114, 99, 32827, 194, 16578, 59, 17424, 114, 59, 49152, 55349, 56580, 114, 97, 118, 101, 32827, 192, 16576, 112, 104, 97, 59, 17297, 97, 99, 114, 59, 16640, 100, 59, 27219, 256, 103, 112, 157, 161, 111, 110, 59, 16644, 102, 59, 49152, 55349, 56632, 112, 108, 121, 70, 117, 110, 99, 116, 105, 111, 110, 59, 24673, 105, 110, 103, 32827, 197, 16581, 256, 99, 115, 190, 195, 114, 59, 49152, 55349, 56476, 105, 103, 110, 59, 25172, 105, 108, 100, 101, 32827, 195, 16579, 109, 108, 32827, 196, 16580, 1024, 97, 99, 101, 102, 111, 114, 115, 117, 229, 251, 254, 279, 284, 290, 295, 298, 256, 99, 114, 234, 242, 107, 115, 108, 97, 115, 104, 59, 25110, 374, 246, 248, 59, 27367, 101, 100, 59, 25350, 121, 59, 17425, 384, 99, 114, 116, 261, 267, 276, 97, 117, 115, 101, 59, 25141, 110, 111, 117, 108, 108, 105, 115, 59, 24876, 97, 59, 17298, 114, 59, 49152, 55349, 56581, 112, 102, 59, 49152, 55349, 56633, 101, 118, 101, 59, 17112, 99, 242, 275, 109, 112, 101, 113, 59, 25166, 1792, 72, 79, 97, 99, 100, 101, 102, 104, 105, 108, 111, 114, 115, 117, 333, 337, 342, 384, 414, 418, 437, 439, 442, 476, 533, 627, 632, 638, 99, 121, 59, 17447, 80, 89, 32827, 169, 16553, 384, 99, 112, 121, 349, 354, 378, 117, 116, 101, 59, 16646, 256, 59, 105, 359, 360, 25298, 116, 97, 108, 68, 105, 102, 102, 101, 114, 101, 110, 116, 105, 97, 108, 68, 59, 24901, 108, 101, 121, 115, 59, 24877, 512, 97, 101, 105, 111, 393, 398, 404, 408, 114, 111, 110, 59, 16652, 100, 105, 108, 32827, 199, 16583, 114, 99, 59, 16648, 110, 105, 110, 116, 59, 25136, 111, 116, 59, 16650, 256, 100, 110, 423, 429, 105, 108, 108, 97, 59, 16568, 116, 101, 114, 68, 111, 116, 59, 16567, 242, 383, 105, 59, 17319, 114, 99, 108, 101, 512, 68, 77, 80, 84, 455, 459, 465, 470, 111, 116, 59, 25241, 105, 110, 117, 115, 59, 25238, 108, 117, 115, 59, 25237, 105, 109, 101, 115, 59, 25239, 111, 256, 99, 115, 482, 504, 107, 119, 105, 115, 101, 67, 111, 110, 116, 111, 117, 114, 73, 110, 116, 101, 103, 114, 97, 108, 59, 25138, 101, 67, 117, 114, 108, 121, 256, 68, 81, 515, 527, 111, 117, 98, 108, 101, 81, 117, 111, 116, 101, 59, 24605, 117, 111, 116, 101, 59, 24601, 512, 108, 110, 112, 117, 542, 552, 583, 597, 111, 110, 256, 59, 101, 549, 550, 25143, 59, 27252, 384, 103, 105, 116, 559, 566, 570, 114, 117, 101, 110, 116, 59, 25185, 110, 116, 59, 25135, 111, 117, 114, 73, 110, 116, 101, 103, 114, 97, 108, 59, 25134, 256, 102, 114, 588, 590, 59, 24834, 111, 100, 117, 99, 116, 59, 25104, 110, 116, 101, 114, 67, 108, 111, 99, 107, 119, 105, 115, 101, 67, 111, 110, 116, 111, 117, 114, 73, 110, 116, 101, 103, 114, 97, 108, 59, 25139, 111, 115, 115, 59, 27183, 99, 114, 59, 49152, 55349, 56478, 112, 256, 59, 67, 644, 645, 25299, 97, 112, 59, 25165, 1408, 68, 74, 83, 90, 97, 99, 101, 102, 105, 111, 115, 672, 684, 688, 692, 696, 715, 727, 737, 742, 819, 1165, 256, 59, 111, 377, 677, 116, 114, 97, 104, 100, 59, 26897, 99, 121, 59, 17410, 99, 121, 59, 17413, 99, 121, 59, 17423, 384, 103, 114, 115, 703, 708, 711, 103, 101, 114, 59, 24609, 114, 59, 24993, 104, 118, 59, 27364, 256, 97, 121, 720, 725, 114, 111, 110, 59, 16654, 59, 17428, 108, 256, 59, 116, 733, 734, 25095, 97, 59, 17300, 114, 59, 49152, 55349, 56583, 256, 97, 102, 747, 807, 256, 99, 109, 752, 802, 114, 105, 116, 105, 99, 97, 108, 512, 65, 68, 71, 84, 768, 774, 790, 796, 99, 117, 116, 101, 59, 16564, 111, 372, 779, 781, 59, 17113, 98, 108, 101, 65, 99, 117, 116, 101, 59, 17117, 114, 97, 118, 101, 59, 16480, 105, 108, 100, 101, 59, 17116, 111, 110, 100, 59, 25284, 102, 101, 114, 101, 110, 116, 105, 97, 108, 68, 59, 24902, 1136, 829, 0, 0, 0, 834, 852, 0, 1029, 102, 59, 49152, 55349, 56635, 384, 59, 68, 69, 840, 841, 845, 16552, 111, 116, 59, 24796, 113, 117, 97, 108, 59, 25168, 98, 108, 101, 768, 67, 68, 76, 82, 85, 86, 867, 882, 898, 975, 994, 1016, 111, 110, 116, 111, 117, 114, 73, 110, 116, 101, 103, 114, 97, 236, 569, 111, 628, 889, 0, 0, 891, 187, 841, 110, 65, 114, 114, 111, 119, 59, 25043, 256, 101, 111, 903, 932, 102, 116, 384, 65, 82, 84, 912, 918, 929, 114, 114, 111, 119, 59, 25040, 105, 103, 104, 116, 65, 114, 114, 111, 119, 59, 25044, 101, 229, 714, 110, 103, 256, 76, 82, 939, 964, 101, 102, 116, 256, 65, 82, 947, 953, 114, 114, 111, 119, 59, 26616, 105, 103, 104, 116, 65, 114, 114, 111, 119, 59, 26618, 105, 103, 104, 116, 65, 114, 114, 111, 119, 59, 26617, 105, 103, 104, 116, 256, 65, 84, 984, 990, 114, 114, 111, 119, 59, 25042, 101, 101, 59, 25256, 112, 577, 1001, 0, 0, 1007, 114, 114, 111, 119, 59, 25041, 111, 119, 110, 65, 114, 114, 111, 119, 59, 25045, 101, 114, 116, 105, 99, 97, 108, 66, 97, 114, 59, 25125, 110, 768, 65, 66, 76, 82, 84, 97, 1042, 1066, 1072, 1118, 1151, 892, 114, 114, 111, 119, 384, 59, 66, 85, 1053, 1054, 1058, 24979, 97, 114, 59, 26899, 112, 65, 114, 114, 111, 119, 59, 25077, 114, 101, 118, 101, 59, 17169, 101, 102, 116, 722, 1082, 0, 1094, 0, 1104, 105, 103, 104, 116, 86, 101, 99, 116, 111, 114, 59, 26960, 101, 101, 86, 101, 99, 116, 111, 114, 59, 26974, 101, 99, 116, 111, 114, 256, 59, 66, 1113, 1114, 25021, 97, 114, 59, 26966, 105, 103, 104, 116, 468, 1127, 0, 1137, 101, 101, 86, 101, 99, 116, 111, 114, 59, 26975, 101, 99, 116, 111, 114, 256, 59, 66, 1146, 1147, 25025, 97, 114, 59, 26967, 101, 101, 256, 59, 65, 1158, 1159, 25252, 114, 114, 111, 119, 59, 24999, 256, 99, 116, 1170, 1175, 114, 59, 49152, 55349, 56479, 114, 111, 107, 59, 16656, 2048, 78, 84, 97, 99, 100, 102, 103, 108, 109, 111, 112, 113, 115, 116, 117, 120, 1213, 1216, 1220, 1227, 1246, 1250, 1255, 1262, 1269, 1313, 1327, 1334, 1362, 1373, 1376, 1381, 71, 59, 16714, 72, 32827, 208, 16592, 99, 117, 116, 101, 32827, 201, 16585, 384, 97, 105, 121, 1234, 1239, 1244, 114, 111, 110, 59, 16666, 114, 99, 32827, 202, 16586, 59, 17453, 111, 116, 59, 16662, 114, 59, 49152, 55349, 56584, 114, 97, 118, 101, 32827, 200, 16584, 101, 109, 101, 110, 116, 59, 25096, 256, 97, 112, 1274, 1278, 99, 114, 59, 16658, 116, 121, 595, 1286, 0, 0, 1298, 109, 97, 108, 108, 83, 113, 117, 97, 114, 101, 59, 26107, 101, 114, 121, 83, 109, 97, 108, 108, 83, 113, 117, 97, 114, 101, 59, 26027, 256, 103, 112, 1318, 1322, 111, 110, 59, 16664, 102, 59, 49152, 55349, 56636, 115, 105, 108, 111, 110, 59, 17301, 117, 256, 97, 105, 1340, 1353, 108, 256, 59, 84, 1346, 1347, 27253, 105, 108, 100, 101, 59, 25154, 108, 105, 98, 114, 105, 117, 109, 59, 25036, 256, 99, 105, 1367, 1370, 114, 59, 24880, 109, 59, 27251, 97, 59, 17303, 109, 108, 32827, 203, 16587, 256, 105, 112, 1386, 1391, 115, 116, 115, 59, 25091, 111, 110, 101, 110, 116, 105, 97, 108, 69, 59, 24903, 640, 99, 102, 105, 111, 115, 1413, 1416, 1421, 1458, 1484, 121, 59, 17444, 114, 59, 49152, 55349, 56585, 108, 108, 101, 100, 595, 1431, 0, 0, 1443, 109, 97, 108, 108, 83, 113, 117, 97, 114, 101, 59, 26108, 101, 114, 121, 83, 109, 97, 108, 108, 83, 113, 117, 97, 114, 101, 59, 26026, 880, 1466, 0, 1471, 0, 0, 1476, 102, 59, 49152, 55349, 56637, 65, 108, 108, 59, 25088, 114, 105, 101, 114, 116, 114, 102, 59, 24881, 99, 242, 1483, 1536, 74, 84, 97, 98, 99, 100, 102, 103, 111, 114, 115, 116, 1512, 1516, 1519, 1530, 1536, 1554, 1558, 1563, 1565, 1571, 1644, 1650, 99, 121, 59, 17411, 32827, 62, 16446, 109, 109, 97, 256, 59, 100, 1527, 1528, 17299, 59, 17372, 114, 101, 118, 101, 59, 16670, 384, 101, 105, 121, 1543, 1548, 1552, 100, 105, 108, 59, 16674, 114, 99, 59, 16668, 59, 17427, 111, 116, 59, 16672, 114, 59, 49152, 55349, 56586, 59, 25305, 112, 102, 59, 49152, 55349, 56638, 101, 97, 116, 101, 114, 768, 69, 70, 71, 76, 83, 84, 1589, 1604, 1614, 1622, 1627, 1638, 113, 117, 97, 108, 256, 59, 76, 1598, 1599, 25189, 101, 115, 115, 59, 25307, 117, 108, 108, 69, 113, 117, 97, 108, 59, 25191, 114, 101, 97, 116, 101, 114, 59, 27298, 101, 115, 115, 59, 25207, 108, 97, 110, 116, 69, 113, 117, 97, 108, 59, 27262, 105, 108, 100, 101, 59, 25203, 99, 114, 59, 49152, 55349, 56482, 59, 25195, 1024, 65, 97, 99, 102, 105, 111, 115, 117, 1669, 1675, 1686, 1691, 1694, 1706, 1726, 1738, 82, 68, 99, 121, 59, 17450, 256, 99, 116, 1680, 1684, 101, 107, 59, 17095, 59, 16478, 105, 114, 99, 59, 16676, 114, 59, 24844, 108, 98, 101, 114, 116, 83, 112, 97, 99, 101, 59, 24843, 496, 1711, 0, 1714, 102, 59, 24845, 105, 122, 111, 110, 116, 97, 108, 76, 105, 110, 101, 59, 25856, 256, 99, 116, 1731, 1733, 242, 1705, 114, 111, 107, 59, 16678, 109, 112, 324, 1744, 1752, 111, 119, 110, 72, 117, 109, 240, 303, 113, 117, 97, 108, 59, 25167, 1792, 69, 74, 79, 97, 99, 100, 102, 103, 109, 110, 111, 115, 116, 117, 1786, 1790, 1795, 1799, 1806, 1818, 1822, 1825, 1832, 1860, 1912, 1931, 1935, 1941, 99, 121, 59, 17429, 108, 105, 103, 59, 16690, 99, 121, 59, 17409, 99, 117, 116, 101, 32827, 205, 16589, 256, 105, 121, 1811, 1816, 114, 99, 32827, 206, 16590, 59, 17432, 111, 116, 59, 16688, 114, 59, 24849, 114, 97, 118, 101, 32827, 204, 16588, 384, 59, 97, 112, 1824, 1839, 1855, 256, 99, 103, 1844, 1847, 114, 59, 16682, 105, 110, 97, 114, 121, 73, 59, 24904, 108, 105, 101, 243, 989, 500, 1865, 0, 1890, 256, 59, 101, 1869, 1870, 25132, 256, 103, 114, 1875, 1880, 114, 97, 108, 59, 25131, 115, 101, 99, 116, 105, 111, 110, 59, 25282, 105, 115, 105, 98, 108, 101, 256, 67, 84, 1900, 1906, 111, 109, 109, 97, 59, 24675, 105, 109, 101, 115, 59, 24674, 384, 103, 112, 116, 1919, 1923, 1928, 111, 110, 59, 16686, 102, 59, 49152, 55349, 56640, 97, 59, 17305, 99, 114, 59, 24848, 105, 108, 100, 101, 59, 16680, 491, 1946, 0, 1950, 99, 121, 59, 17414, 108, 32827, 207, 16591, 640, 99, 102, 111, 115, 117, 1964, 1975, 1980, 1986, 2000, 256, 105, 121, 1969, 1973, 114, 99, 59, 16692, 59, 17433, 114, 59, 49152, 55349, 56589, 112, 102, 59, 49152, 55349, 56641, 483, 1991, 0, 1996, 114, 59, 49152, 55349, 56485, 114, 99, 121, 59, 17416, 107, 99, 121, 59, 17412, 896, 72, 74, 97, 99, 102, 111, 115, 2020, 2024, 2028, 2033, 2045, 2050, 2056, 99, 121, 59, 17445, 99, 121, 59, 17420, 112, 112, 97, 59, 17306, 256, 101, 121, 2038, 2043, 100, 105, 108, 59, 16694, 59, 17434, 114, 59, 49152, 55349, 56590, 112, 102, 59, 49152, 55349, 56642, 99, 114, 59, 49152, 55349, 56486, 1408, 74, 84, 97, 99, 101, 102, 108, 109, 111, 115, 116, 2085, 2089, 2092, 2128, 2147, 2483, 2488, 2503, 2509, 2615, 2631, 99, 121, 59, 17417, 32827, 60, 16444, 640, 99, 109, 110, 112, 114, 2103, 2108, 2113, 2116, 2125, 117, 116, 101, 59, 16697, 98, 100, 97, 59, 17307, 103, 59, 26602, 108, 97, 99, 101, 116, 114, 102, 59, 24850, 114, 59, 24990, 384, 97, 101, 121, 2135, 2140, 2145, 114, 111, 110, 59, 16701, 100, 105, 108, 59, 16699, 59, 17435, 256, 102, 115, 2152, 2416, 116, 1280, 65, 67, 68, 70, 82, 84, 85, 86, 97, 114, 2174, 2217, 2225, 2272, 2278, 2300, 2351, 2395, 912, 2410, 256, 110, 114, 2179, 2191, 103, 108, 101, 66, 114, 97, 99, 107, 101, 116, 59, 26600, 114, 111, 119, 384, 59, 66, 82, 2201, 2202, 2206, 24976, 97, 114, 59, 25060, 105, 103, 104, 116, 65, 114, 114, 111, 119, 59, 25030, 101, 105, 108, 105, 110, 103, 59, 25352, 111, 501, 2231, 0, 2243, 98, 108, 101, 66, 114, 97, 99, 107, 101, 116, 59, 26598, 110, 468, 2248, 0, 2258, 101, 101, 86, 101, 99, 116, 111, 114, 59, 26977, 101, 99, 116, 111, 114, 256, 59, 66, 2267, 2268, 25027, 97, 114, 59, 26969, 108, 111, 111, 114, 59, 25354, 105, 103, 104, 116, 256, 65, 86, 2287, 2293, 114, 114, 111, 119, 59, 24980, 101, 99, 116, 111, 114, 59, 26958, 256, 101, 114, 2305, 2327, 101, 384, 59, 65, 86, 2313, 2314, 2320, 25251, 114, 114, 111, 119, 59, 24996, 101, 99, 116, 111, 114, 59, 26970, 105, 97, 110, 103, 108, 101, 384, 59, 66, 69, 2340, 2341, 2345, 25266, 97, 114, 59, 27087, 113, 117, 97, 108, 59, 25268, 112, 384, 68, 84, 86, 2359, 2370, 2380, 111, 119, 110, 86, 101, 99, 116, 111, 114, 59, 26961, 101, 101, 86, 101, 99, 116, 111, 114, 59, 26976, 101, 99, 116, 111, 114, 256, 59, 66, 2390, 2391, 25023, 97, 114, 59, 26968, 101, 99, 116, 111, 114, 256, 59, 66, 2405, 2406, 25020, 97, 114, 59, 26962, 105, 103, 104, 116, 225, 924, 115, 768, 69, 70, 71, 76, 83, 84, 2430, 2443, 2453, 2461, 2466, 2477, 113, 117, 97, 108, 71, 114, 101, 97, 116, 101, 114, 59, 25306, 117, 108, 108, 69, 113, 117, 97, 108, 59, 25190, 114, 101, 97, 116, 101, 114, 59, 25206, 101, 115, 115, 59, 27297, 108, 97, 110, 116, 69, 113, 117, 97, 108, 59, 27261, 105, 108, 100, 101, 59, 25202, 114, 59, 49152, 55349, 56591, 256, 59, 101, 2493, 2494, 25304, 102, 116, 97, 114, 114, 111, 119, 59, 25050, 105, 100, 111, 116, 59, 16703, 384, 110, 112, 119, 2516, 2582, 2587, 103, 512, 76, 82, 108, 114, 2526, 2551, 2562, 2576, 101, 102, 116, 256, 65, 82, 2534, 2540, 114, 114, 111, 119, 59, 26613, 105, 103, 104, 116, 65, 114, 114, 111, 119, 59, 26615, 105, 103, 104, 116, 65, 114, 114, 111, 119, 59, 26614, 101, 102, 116, 256, 97, 114, 947, 2570, 105, 103, 104, 116, 225, 959, 105, 103, 104, 116, 225, 970, 102, 59, 49152, 55349, 56643, 101, 114, 256, 76, 82, 2594, 2604, 101, 102, 116, 65, 114, 114, 111, 119, 59, 24985, 105, 103, 104, 116, 65, 114, 114, 111, 119, 59, 24984, 384, 99, 104, 116, 2622, 2624, 2626, 242, 2124, 59, 25008, 114, 111, 107, 59, 16705, 59, 25194, 1024, 97, 99, 101, 102, 105, 111, 115, 117, 2650, 2653, 2656, 2679, 2684, 2693, 2699, 2702, 112, 59, 26885, 121, 59, 17436, 256, 100, 108, 2661, 2671, 105, 117, 109, 83, 112, 97, 99, 101, 59, 24671, 108, 105, 110, 116, 114, 102, 59, 24883, 114, 59, 49152, 55349, 56592, 110, 117, 115, 80, 108, 117, 115, 59, 25107, 112, 102, 59, 49152, 55349, 56644, 99, 242, 2678, 59, 17308, 1152, 74, 97, 99, 101, 102, 111, 115, 116, 117, 2723, 2727, 2733, 2752, 2836, 2841, 3473, 3479, 3486, 99, 121, 59, 17418, 99, 117, 116, 101, 59, 16707, 384, 97, 101, 121, 2740, 2745, 2750, 114, 111, 110, 59, 16711, 100, 105, 108, 59, 16709, 59, 17437, 384, 103, 115, 119, 2759, 2800, 2830, 97, 116, 105, 118, 101, 384, 77, 84, 86, 2771, 2783, 2792, 101, 100, 105, 117, 109, 83, 112, 97, 99, 101, 59, 24587, 104, 105, 256, 99, 110, 2790, 2776, 235, 2777, 101, 114, 121, 84, 104, 105, 238, 2777, 116, 101, 100, 256, 71, 76, 2808, 2822, 114, 101, 97, 116, 101, 114, 71, 114, 101, 97, 116, 101, 242, 1651, 101, 115, 115, 76, 101, 115, 243, 2632, 76, 105, 110, 101, 59, 16394, 114, 59, 49152, 55349, 56593, 512, 66, 110, 112, 116, 2850, 2856, 2871, 2874, 114, 101, 97, 107, 59, 24672, 66, 114, 101, 97, 107, 105, 110, 103, 83, 112, 97, 99, 101, 59, 16544, 102, 59, 24853, 1664, 59, 67, 68, 69, 71, 72, 76, 78, 80, 82, 83, 84, 86, 2901, 2902, 2922, 2940, 2977, 3051, 3076, 3166, 3204, 3238, 3288, 3425, 3461, 27372, 256, 111, 117, 2907, 2916, 110, 103, 114, 117, 101, 110, 116, 59, 25186, 112, 67, 97, 112, 59, 25197, 111, 117, 98, 108, 101, 86, 101, 114, 116, 105, 99, 97, 108, 66, 97, 114, 59, 25126, 384, 108, 113, 120, 2947, 2954, 2971, 101, 109, 101, 110, 116, 59, 25097, 117, 97, 108, 256, 59, 84, 2962, 2963, 25184, 105, 108, 100, 101, 59, 49152, 8770, 824, 105, 115, 116, 115, 59, 25092, 114, 101, 97, 116, 101, 114, 896, 59, 69, 70, 71, 76, 83, 84, 2998, 2999, 3005, 3017, 3027, 3032, 3045, 25199, 113, 117, 97, 108, 59, 25201, 117, 108, 108, 69, 113, 117, 97, 108, 59, 49152, 8807, 824, 114, 101, 97, 116, 101, 114, 59, 49152, 8811, 824, 101, 115, 115, 59, 25209, 108, 97, 110, 116, 69, 113, 117, 97, 108, 59, 49152, 10878, 824, 105, 108, 100, 101, 59, 25205, 117, 109, 112, 324, 3058, 3069, 111, 119, 110, 72, 117, 109, 112, 59, 49152, 8782, 824, 113, 117, 97, 108, 59, 49152, 8783, 824, 101, 256, 102, 115, 3082, 3111, 116, 84, 114, 105, 97, 110, 103, 108, 101, 384, 59, 66, 69, 3098, 3099, 3105, 25322, 97, 114, 59, 49152, 10703, 824, 113, 117, 97, 108, 59, 25324, 115, 768, 59, 69, 71, 76, 83, 84, 3125, 3126, 3132, 3140, 3147, 3160, 25198, 113, 117, 97, 108, 59, 25200, 114, 101, 97, 116, 101, 114, 59, 25208, 101, 115, 115, 59, 49152, 8810, 824, 108, 97, 110, 116, 69, 113, 117, 97, 108, 59, 49152, 10877, 824, 105, 108, 100, 101, 59, 25204, 101, 115, 116, 101, 100, 256, 71, 76, 3176, 3193, 114, 101, 97, 116, 101, 114, 71, 114, 101, 97, 116, 101, 114, 59, 49152, 10914, 824, 101, 115, 115, 76, 101, 115, 115, 59, 49152, 10913, 824, 114, 101, 99, 101, 100, 101, 115, 384, 59, 69, 83, 3218, 3219, 3227, 25216, 113, 117, 97, 108, 59, 49152, 10927, 824, 108, 97, 110, 116, 69, 113, 117, 97, 108, 59, 25312, 256, 101, 105, 3243, 3257, 118, 101, 114, 115, 101, 69, 108, 101, 109, 101, 110, 116, 59, 25100, 103, 104, 116, 84, 114, 105, 97, 110, 103, 108, 101, 384, 59, 66, 69, 3275, 3276, 3282, 25323, 97, 114, 59, 49152, 10704, 824, 113, 117, 97, 108, 59, 25325, 256, 113, 117, 3293, 3340, 117, 97, 114, 101, 83, 117, 256, 98, 112, 3304, 3321, 115, 101, 116, 256, 59, 69, 3312, 3315, 49152, 8847, 824, 113, 117, 97, 108, 59, 25314, 101, 114, 115, 101, 116, 256, 59, 69, 3331, 3334, 49152, 8848, 824, 113, 117, 97, 108, 59, 25315, 384, 98, 99, 112, 3347, 3364, 3406, 115, 101, 116, 256, 59, 69, 3355, 3358, 49152, 8834, 8402, 113, 117, 97, 108, 59, 25224, 99, 101, 101, 100, 115, 512, 59, 69, 83, 84, 3378, 3379, 3387, 3398, 25217, 113, 117, 97, 108, 59, 49152, 10928, 824, 108, 97, 110, 116, 69, 113, 117, 97, 108, 59, 25313, 105, 108, 100, 101, 59, 49152, 8831, 824, 101, 114, 115, 101, 116, 256, 59, 69, 3416, 3419, 49152, 8835, 8402, 113, 117, 97, 108, 59, 25225, 105, 108, 100, 101, 512, 59, 69, 70, 84, 3438, 3439, 3445, 3455, 25153, 113, 117, 97, 108, 59, 25156, 117, 108, 108, 69, 113, 117, 97, 108, 59, 25159, 105, 108, 100, 101, 59, 25161, 101, 114, 116, 105, 99, 97, 108, 66, 97, 114, 59, 25124, 99, 114, 59, 49152, 55349, 56489, 105, 108, 100, 101, 32827, 209, 16593, 59, 17309, 1792, 69, 97, 99, 100, 102, 103, 109, 111, 112, 114, 115, 116, 117, 118, 3517, 3522, 3529, 3541, 3547, 3552, 3559, 3580, 3586, 3616, 3618, 3634, 3647, 3652, 108, 105, 103, 59, 16722, 99, 117, 116, 101, 32827, 211, 16595, 256, 105, 121, 3534, 3539, 114, 99, 32827, 212, 16596, 59, 17438, 98, 108, 97, 99, 59, 16720, 114, 59, 49152, 55349, 56594, 114, 97, 118, 101, 32827, 210, 16594, 384, 97, 101, 105, 3566, 3570, 3574, 99, 114, 59, 16716, 103, 97, 59, 17321, 99, 114, 111, 110, 59, 17311, 112, 102, 59, 49152, 55349, 56646, 101, 110, 67, 117, 114, 108, 121, 256, 68, 81, 3598, 3610, 111, 117, 98, 108, 101, 81, 117, 111, 116, 101, 59, 24604, 117, 111, 116, 101, 59, 24600, 59, 27220, 256, 99, 108, 3623, 3628, 114, 59, 49152, 55349, 56490, 97, 115, 104, 32827, 216, 16600, 105, 364, 3639, 3644, 100, 101, 32827, 213, 16597, 101, 115, 59, 27191, 109, 108, 32827, 214, 16598, 101, 114, 256, 66, 80, 3659, 3680, 256, 97, 114, 3664, 3667, 114, 59, 24638, 97, 99, 256, 101, 107, 3674, 3676, 59, 25566, 101, 116, 59, 25524, 97, 114, 101, 110, 116, 104, 101, 115, 105, 115, 59, 25564, 1152, 97, 99, 102, 104, 105, 108, 111, 114, 115, 3711, 3719, 3722, 3727, 3730, 3732, 3741, 3760, 3836, 114, 116, 105, 97, 108, 68, 59, 25090, 121, 59, 17439, 114, 59, 49152, 55349, 56595, 105, 59, 17318, 59, 17312, 117, 115, 77, 105, 110, 117, 115, 59, 16561, 256, 105, 112, 3746, 3757, 110, 99, 97, 114, 101, 112, 108, 97, 110, 229, 1693, 102, 59, 24857, 512, 59, 101, 105, 111, 3769, 3770, 3808, 3812, 27323, 99, 101, 100, 101, 115, 512, 59, 69, 83, 84, 3784, 3785, 3791, 3802, 25210, 113, 117, 97, 108, 59, 27311, 108, 97, 110, 116, 69, 113, 117, 97, 108, 59, 25212, 105, 108, 100, 101, 59, 25214, 109, 101, 59, 24627, 256, 100, 112, 3817, 3822, 117, 99, 116, 59, 25103, 111, 114, 116, 105, 111, 110, 256, 59, 97, 549, 3833, 108, 59, 25117, 256, 99, 105, 3841, 3846, 114, 59, 49152, 55349, 56491, 59, 17320, 512, 85, 102, 111, 115, 3857, 3862, 3867, 3871, 79, 84, 32827, 34, 16418, 114, 59, 49152, 55349, 56596, 112, 102, 59, 24858, 99, 114, 59, 49152, 55349, 56492, 1536, 66, 69, 97, 99, 101, 102, 104, 105, 111, 114, 115, 117, 3902, 3907, 3911, 3936, 3955, 4007, 4010, 4013, 4246, 4265, 4276, 4286, 97, 114, 114, 59, 26896, 71, 32827, 174, 16558, 384, 99, 110, 114, 3918, 3923, 3926, 117, 116, 101, 59, 16724, 103, 59, 26603, 114, 256, 59, 116, 3932, 3933, 24992, 108, 59, 26902, 384, 97, 101, 121, 3943, 3948, 3953, 114, 111, 110, 59, 16728, 100, 105, 108, 59, 16726, 59, 17440, 256, 59, 118, 3960, 3961, 24860, 101, 114, 115, 101, 256, 69, 85, 3970, 3993, 256, 108, 113, 3975, 3982, 101, 109, 101, 110, 116, 59, 25099, 117, 105, 108, 105, 98, 114, 105, 117, 109, 59, 25035, 112, 69, 113, 117, 105, 108, 105, 98, 114, 105, 117, 109, 59, 26991, 114, 187, 3961, 111, 59, 17313, 103, 104, 116, 1024, 65, 67, 68, 70, 84, 85, 86, 97, 4033, 4075, 4083, 4130, 4136, 4187, 4231, 984, 256, 110, 114, 4038, 4050, 103, 108, 101, 66, 114, 97, 99, 107, 101, 116, 59, 26601, 114, 111, 119, 384, 59, 66, 76, 4060, 4061, 4065, 24978, 97, 114, 59, 25061, 101, 102, 116, 65, 114, 114, 111, 119, 59, 25028, 101, 105, 108, 105, 110, 103, 59, 25353, 111, 501, 4089, 0, 4101, 98, 108, 101, 66, 114, 97, 99, 107, 101, 116, 59, 26599, 110, 468, 4106, 0, 4116, 101, 101, 86, 101, 99, 116, 111, 114, 59, 26973, 101, 99, 116, 111, 114, 256, 59, 66, 4125, 4126, 25026, 97, 114, 59, 26965, 108, 111, 111, 114, 59, 25355, 256, 101, 114, 4141, 4163, 101, 384, 59, 65, 86, 4149, 4150, 4156, 25250, 114, 114, 111, 119, 59, 24998, 101, 99, 116, 111, 114, 59, 26971, 105, 97, 110, 103, 108, 101, 384, 59, 66, 69, 4176, 4177, 4181, 25267, 97, 114, 59, 27088, 113, 117, 97, 108, 59, 25269, 112, 384, 68, 84, 86, 4195, 4206, 4216, 111, 119, 110, 86, 101, 99, 116, 111, 114, 59, 26959, 101, 101, 86, 101, 99, 116, 111, 114, 59, 26972, 101, 99, 116, 111, 114, 256, 59, 66, 4226, 4227, 25022, 97, 114, 59, 26964, 101, 99, 116, 111, 114, 256, 59, 66, 4241, 4242, 25024, 97, 114, 59, 26963, 256, 112, 117, 4251, 4254, 102, 59, 24861, 110, 100, 73, 109, 112, 108, 105, 101, 115, 59, 26992, 105, 103, 104, 116, 97, 114, 114, 111, 119, 59, 25051, 256, 99, 104, 4281, 4284, 114, 59, 24859, 59, 25009, 108, 101, 68, 101, 108, 97, 121, 101, 100, 59, 27124, 1664, 72, 79, 97, 99, 102, 104, 105, 109, 111, 113, 115, 116, 117, 4324, 4337, 4343, 4349, 4377, 4382, 4433, 4438, 4449, 4455, 4533, 4539, 4543, 256, 67, 99, 4329, 4334, 72, 99, 121, 59, 17449, 121, 59, 17448, 70, 84, 99, 121, 59, 17452, 99, 117, 116, 101, 59, 16730, 640, 59, 97, 101, 105, 121, 4360, 4361, 4366, 4371, 4375, 27324, 114, 111, 110, 59, 16736, 100, 105, 108, 59, 16734, 114, 99, 59, 16732, 59, 17441, 114, 59, 49152, 55349, 56598, 111, 114, 116, 512, 68, 76, 82, 85, 4394, 4404, 4414, 4425, 111, 119, 110, 65, 114, 114, 111, 119, 187, 1054, 101, 102, 116, 65, 114, 114, 111, 119, 187, 2202, 105, 103, 104, 116, 65, 114, 114, 111, 119, 187, 4061, 112, 65, 114, 114, 111, 119, 59, 24977, 103, 109, 97, 59, 17315, 97, 108, 108, 67, 105, 114, 99, 108, 101, 59, 25112, 112, 102, 59, 49152, 55349, 56650, 626, 4461, 0, 0, 4464, 116, 59, 25114, 97, 114, 101, 512, 59, 73, 83, 85, 4475, 4476, 4489, 4527, 26017, 110, 116, 101, 114, 115, 101, 99, 116, 105, 111, 110, 59, 25235, 117, 256, 98, 112, 4495, 4510, 115, 101, 116, 256, 59, 69, 4503, 4504, 25231, 113, 117, 97, 108, 59, 25233, 101, 114, 115, 101, 116, 256, 59, 69, 4520, 4521, 25232, 113, 117, 97, 108, 59, 25234, 110, 105, 111, 110, 59, 25236, 99, 114, 59, 49152, 55349, 56494, 97, 114, 59, 25286, 512, 98, 99, 109, 112, 4552, 4571, 4617, 4619, 256, 59, 115, 4557, 4558, 25296, 101, 116, 256, 59, 69, 4557, 4565, 113, 117, 97, 108, 59, 25222, 256, 99, 104, 4576, 4613, 101, 101, 100, 115, 512, 59, 69, 83, 84, 4589, 4590, 4596, 4607, 25211, 113, 117, 97, 108, 59, 27312, 108, 97, 110, 116, 69, 113, 117, 97, 108, 59, 25213, 105, 108, 100, 101, 59, 25215, 84, 104, 225, 3980, 59, 25105, 384, 59, 101, 115, 4626, 4627, 4643, 25297, 114, 115, 101, 116, 256, 59, 69, 4636, 4637, 25219, 113, 117, 97, 108, 59, 25223, 101, 116, 187, 4627, 1408, 72, 82, 83, 97, 99, 102, 104, 105, 111, 114, 115, 4670, 4676, 4681, 4693, 4702, 4721, 4726, 4767, 4802, 4808, 4817, 79, 82, 78, 32827, 222, 16606, 65, 68, 69, 59, 24866, 256, 72, 99, 4686, 4690, 99, 121, 59, 17419, 121, 59, 17446, 256, 98, 117, 4698, 4700, 59, 16393, 59, 17316, 384, 97, 101, 121, 4709, 4714, 4719, 114, 111, 110, 59, 16740, 100, 105, 108, 59, 16738, 59, 17442, 114, 59, 49152, 55349, 56599, 256, 101, 105, 4731, 4745, 498, 4736, 0, 4743, 101, 102, 111, 114, 101, 59, 25140, 97, 59, 17304, 256, 99, 110, 4750, 4760, 107, 83, 112, 97, 99, 101, 59, 49152, 8287, 8202, 83, 112, 97, 99, 101, 59, 24585, 108, 100, 101, 512, 59, 69, 70, 84, 4779, 4780, 4786, 4796, 25148, 113, 117, 97, 108, 59, 25155, 117, 108, 108, 69, 113, 117, 97, 108, 59, 25157, 105, 108, 100, 101, 59, 25160, 112, 102, 59, 49152, 55349, 56651, 105, 112, 108, 101, 68, 111, 116, 59, 24795, 256, 99, 116, 4822, 4827, 114, 59, 49152, 55349, 56495, 114, 111, 107, 59, 16742, 2785, 4855, 4878, 4890, 4902, 0, 4908, 4913, 0, 0, 0, 0, 0, 4920, 4925, 4983, 4997, 0, 5119, 5124, 5130, 5136, 256, 99, 114, 4859, 4865, 117, 116, 101, 32827, 218, 16602, 114, 256, 59, 111, 4871, 4872, 24991, 99, 105, 114, 59, 26953, 114, 483, 4883, 0, 4886, 121, 59, 17422, 118, 101, 59, 16748, 256, 105, 121, 4894, 4899, 114, 99, 32827, 219, 16603, 59, 17443, 98, 108, 97, 99, 59, 16752, 114, 59, 49152, 55349, 56600, 114, 97, 118, 101, 32827, 217, 16601, 97, 99, 114, 59, 16746, 256, 100, 105, 4929, 4969, 101, 114, 256, 66, 80, 4936, 4957, 256, 97, 114, 4941, 4944, 114, 59, 16479, 97, 99, 256, 101, 107, 4951, 4953, 59, 25567, 101, 116, 59, 25525, 97, 114, 101, 110, 116, 104, 101, 115, 105, 115, 59, 25565, 111, 110, 256, 59, 80, 4976, 4977, 25283, 108, 117, 115, 59, 25230, 256, 103, 112, 4987, 4991, 111, 110, 59, 16754, 102, 59, 49152, 55349, 56652, 1024, 65, 68, 69, 84, 97, 100, 112, 115, 5013, 5038, 5048, 5060, 1000, 5074, 5079, 5107, 114, 114, 111, 119, 384, 59, 66, 68, 4432, 5024, 5028, 97, 114, 59, 26898, 111, 119, 110, 65, 114, 114, 111, 119, 59, 25029, 111, 119, 110, 65, 114, 114, 111, 119, 59, 24981, 113, 117, 105, 108, 105, 98, 114, 105, 117, 109, 59, 26990, 101, 101, 256, 59, 65, 5067, 5068, 25253, 114, 114, 111, 119, 59, 24997, 111, 119, 110, 225, 1011, 101, 114, 256, 76, 82, 5086, 5096, 101, 102, 116, 65, 114, 114, 111, 119, 59, 24982, 105, 103, 104, 116, 65, 114, 114, 111, 119, 59, 24983, 105, 256, 59, 108, 5113, 5114, 17362, 111, 110, 59, 17317, 105, 110, 103, 59, 16750, 99, 114, 59, 49152, 55349, 56496, 105, 108, 100, 101, 59, 16744, 109, 108, 32827, 220, 16604, 1152, 68, 98, 99, 100, 101, 102, 111, 115, 118, 5159, 5164, 5168, 5171, 5182, 5253, 5258, 5264, 5270, 97, 115, 104, 59, 25259, 97, 114, 59, 27371, 121, 59, 17426, 97, 115, 104, 256, 59, 108, 5179, 5180, 25257, 59, 27366, 256, 101, 114, 5187, 5189, 59, 25281, 384, 98, 116, 121, 5196, 5200, 5242, 97, 114, 59, 24598, 256, 59, 105, 5199, 5205, 99, 97, 108, 512, 66, 76, 83, 84, 5217, 5221, 5226, 5236, 97, 114, 59, 25123, 105, 110, 101, 59, 16508, 101, 112, 97, 114, 97, 116, 111, 114, 59, 26456, 105, 108, 100, 101, 59, 25152, 84, 104, 105, 110, 83, 112, 97, 99, 101, 59, 24586, 114, 59, 49152, 55349, 56601, 112, 102, 59, 49152, 55349, 56653, 99, 114, 59, 49152, 55349, 56497, 100, 97, 115, 104, 59, 25258, 640, 99, 101, 102, 111, 115, 5287, 5292, 5297, 5302, 5308, 105, 114, 99, 59, 16756, 100, 103, 101, 59, 25280, 114, 59, 49152, 55349, 56602, 112, 102, 59, 49152, 55349, 56654, 99, 114, 59, 49152, 55349, 56498, 512, 102, 105, 111, 115, 5323, 5328, 5330, 5336, 114, 59, 49152, 55349, 56603, 59, 17310, 112, 102, 59, 49152, 55349, 56655, 99, 114, 59, 49152, 55349, 56499, 1152, 65, 73, 85, 97, 99, 102, 111, 115, 117, 5361, 5365, 5369, 5373, 5380, 5391, 5396, 5402, 5408, 99, 121, 59, 17455, 99, 121, 59, 17415, 99, 121, 59, 17454, 99, 117, 116, 101, 32827, 221, 16605, 256, 105, 121, 5385, 5389, 114, 99, 59, 16758, 59, 17451, 114, 59, 49152, 55349, 56604, 112, 102, 59, 49152, 55349, 56656, 99, 114, 59, 49152, 55349, 56500, 109, 108, 59, 16760, 1024, 72, 97, 99, 100, 101, 102, 111, 115, 5429, 5433, 5439, 5451, 5455, 5469, 5472, 5476, 99, 121, 59, 17430, 99, 117, 116, 101, 59, 16761, 256, 97, 121, 5444, 5449, 114, 111, 110, 59, 16765, 59, 17431, 111, 116, 59, 16763, 498, 5460, 0, 5467, 111, 87, 105, 100, 116, 232, 2777, 97, 59, 17302, 114, 59, 24872, 112, 102, 59, 24868, 99, 114, 59, 49152, 55349, 56501, 3041, 5507, 5514, 5520, 0, 5552, 5558, 5567, 0, 0, 0, 0, 5574, 5595, 5611, 5727, 5741, 0, 5781, 5787, 5810, 5817, 0, 5822, 99, 117, 116, 101, 32827, 225, 16609, 114, 101, 118, 101, 59, 16643, 768, 59, 69, 100, 105, 117, 121, 5532, 5533, 5537, 5539, 5544, 5549, 25150, 59, 49152, 8766, 819, 59, 25151, 114, 99, 32827, 226, 16610, 116, 101, 32955, 180, 774, 59, 17456, 108, 105, 103, 32827, 230, 16614, 256, 59, 114, 178, 5562, 59, 49152, 55349, 56606, 114, 97, 118, 101, 32827, 224, 16608, 256, 101, 112, 5578, 5590, 256, 102, 112, 5583, 5588, 115, 121, 109, 59, 24885, 232, 5587, 104, 97, 59, 17329, 256, 97, 112, 5599, 99, 256, 99, 108, 5604, 5607, 114, 59, 16641, 103, 59, 27199, 612, 5616, 0, 0, 5642, 640, 59, 97, 100, 115, 118, 5626, 5627, 5631, 5633, 5639, 25127, 110, 100, 59, 27221, 59, 27228, 108, 111, 112, 101, 59, 27224, 59, 27226, 896, 59, 101, 108, 109, 114, 115, 122, 5656, 5657, 5659, 5662, 5695, 5711, 5721, 25120, 59, 27044, 101, 187, 5657, 115, 100, 256, 59, 97, 5669, 5670, 25121, 1121, 5680, 5682, 5684, 5686, 5688, 5690, 5692, 5694, 59, 27048, 59, 27049, 59, 27050, 59, 27051, 59, 27052, 59, 27053, 59, 27054, 59, 27055, 116, 256, 59, 118, 5701, 5702, 25119, 98, 256, 59, 100, 5708, 5709, 25278, 59, 27037, 256, 112, 116, 5716, 5719, 104, 59, 25122, 187, 185, 97, 114, 114, 59, 25468, 256, 103, 112, 5731, 5735, 111, 110, 59, 16645, 102, 59, 49152, 55349, 56658, 896, 59, 69, 97, 101, 105, 111, 112, 4801, 5755, 5757, 5762, 5764, 5767, 5770, 59, 27248, 99, 105, 114, 59, 27247, 59, 25162, 100, 59, 25163, 115, 59, 16423, 114, 111, 120, 256, 59, 101, 4801, 5778, 241, 5763, 105, 110, 103, 32827, 229, 16613, 384, 99, 116, 121, 5793, 5798, 5800, 114, 59, 49152, 55349, 56502, 59, 16426, 109, 112, 256, 59, 101, 4801, 5807, 241, 648, 105, 108, 100, 101, 32827, 227, 16611, 109, 108, 32827, 228, 16612, 256, 99, 105, 5826, 5832, 111, 110, 105, 110, 244, 626, 110, 116, 59, 27153, 2048, 78, 97, 98, 99, 100, 101, 102, 105, 107, 108, 110, 111, 112, 114, 115, 117, 5869, 5873, 5936, 5948, 5955, 5960, 6008, 6013, 6112, 6118, 6201, 6224, 5901, 6461, 6472, 6512, 111, 116, 59, 27373, 256, 99, 114, 5878, 5918, 107, 512, 99, 101, 112, 115, 5888, 5893, 5901, 5907, 111, 110, 103, 59, 25164, 112, 115, 105, 108, 111, 110, 59, 17398, 114, 105, 109, 101, 59, 24629, 105, 109, 256, 59, 101, 5914, 5915, 25149, 113, 59, 25293, 374, 5922, 5926, 101, 101, 59, 25277, 101, 100, 256, 59, 103, 5932, 5933, 25349, 101, 187, 5933, 114, 107, 256, 59, 116, 4956, 5943, 98, 114, 107, 59, 25526, 256, 111, 121, 5889, 5953, 59, 17457, 113, 117, 111, 59, 24606, 640, 99, 109, 112, 114, 116, 5971, 5979, 5985, 5988, 5992, 97, 117, 115, 256, 59, 101, 266, 265, 112, 116, 121, 118, 59, 27056, 115, 233, 5900, 110, 111, 245, 275, 384, 97, 104, 119, 5999, 6001, 6003, 59, 17330, 59, 24886, 101, 101, 110, 59, 25196, 114, 59, 49152, 55349, 56607, 103, 896, 99, 111, 115, 116, 117, 118, 119, 6029, 6045, 6067, 6081, 6101, 6107, 6110, 384, 97, 105, 117, 6036, 6038, 6042, 240, 1888, 114, 99, 59, 26095, 112, 187, 4977, 384, 100, 112, 116, 6052, 6056, 6061, 111, 116, 59, 27136, 108, 117, 115, 59, 27137, 105, 109, 101, 115, 59, 27138, 625, 6073, 0, 0, 6078, 99, 117, 112, 59, 27142, 97, 114, 59, 26117, 114, 105, 97, 110, 103, 108, 101, 256, 100, 117, 6093, 6098, 111, 119, 110, 59, 26045, 112, 59, 26035, 112, 108, 117, 115, 59, 27140, 101, 229, 5188, 229, 5293, 97, 114, 111, 119, 59, 26893, 384, 97, 107, 111, 6125, 6182, 6197, 256, 99, 110, 6130, 6179, 107, 384, 108, 115, 116, 6138, 1451, 6146, 111, 122, 101, 110, 103, 101, 59, 27115, 114, 105, 97, 110, 103, 108, 101, 512, 59, 100, 108, 114, 6162, 6163, 6168, 6173, 26036, 111, 119, 110, 59, 26046, 101, 102, 116, 59, 26050, 105, 103, 104, 116, 59, 26040, 107, 59, 25635, 433, 6187, 0, 6195, 434, 6191, 0, 6193, 59, 26002, 59, 26001, 52, 59, 26003, 99, 107, 59, 25992, 256, 101, 111, 6206, 6221, 256, 59, 113, 6211, 6214, 49152, 61, 8421, 117, 105, 118, 59, 49152, 8801, 8421, 116, 59, 25360, 512, 112, 116, 119, 120, 6233, 6238, 6247, 6252, 102, 59, 49152, 55349, 56659, 256, 59, 116, 5067, 6243, 111, 109, 187, 5068, 116, 105, 101, 59, 25288, 1536, 68, 72, 85, 86, 98, 100, 104, 109, 112, 116, 117, 118, 6277, 6294, 6314, 6331, 6359, 6363, 6380, 6399, 6405, 6410, 6416, 6433, 512, 76, 82, 108, 114, 6286, 6288, 6290, 6292, 59, 25943, 59, 25940, 59, 25942, 59, 25939, 640, 59, 68, 85, 100, 117, 6305, 6306, 6308, 6310, 6312, 25936, 59, 25958, 59, 25961, 59, 25956, 59, 25959, 512, 76, 82, 108, 114, 6323, 6325, 6327, 6329, 59, 25949, 59, 25946, 59, 25948, 59, 25945, 896, 59, 72, 76, 82, 104, 108, 114, 6346, 6347, 6349, 6351, 6353, 6355, 6357, 25937, 59, 25964, 59, 25955, 59, 25952, 59, 25963, 59, 25954, 59, 25951, 111, 120, 59, 27081, 512, 76, 82, 108, 114, 6372, 6374, 6376, 6378, 59, 25941, 59, 25938, 59, 25872, 59, 25868, 640, 59, 68, 85, 100, 117, 1725, 6391, 6393, 6395, 6397, 59, 25957, 59, 25960, 59, 25900, 59, 25908, 105, 110, 117, 115, 59, 25247, 108, 117, 115, 59, 25246, 105, 109, 101, 115, 59, 25248, 512, 76, 82, 108, 114, 6425, 6427, 6429, 6431, 59, 25947, 59, 25944, 59, 25880, 59, 25876, 896, 59, 72, 76, 82, 104, 108, 114, 6448, 6449, 6451, 6453, 6455, 6457, 6459, 25858, 59, 25962, 59, 25953, 59, 25950, 59, 25916, 59, 25892, 59, 25884, 256, 101, 118, 291, 6466, 98, 97, 114, 32827, 166, 16550, 512, 99, 101, 105, 111, 6481, 6486, 6490, 6496, 114, 59, 49152, 55349, 56503, 109, 105, 59, 24655, 109, 256, 59, 101, 5914, 5916, 108, 384, 59, 98, 104, 6504, 6505, 6507, 16476, 59, 27077, 115, 117, 98, 59, 26568, 364, 6516, 6526, 108, 256, 59, 101, 6521, 6522, 24610, 116, 187, 6522, 112, 384, 59, 69, 101, 303, 6533, 6535, 59, 27310, 256, 59, 113, 1756, 1755, 3297, 6567, 0, 6632, 6673, 6677, 6706, 0, 6711, 6736, 0, 0, 6836, 0, 0, 6849, 0, 0, 6945, 6958, 6989, 6994, 0, 7165, 0, 7180, 384, 99, 112, 114, 6573, 6578, 6621, 117, 116, 101, 59, 16647, 768, 59, 97, 98, 99, 100, 115, 6591, 6592, 6596, 6602, 6613, 6617, 25129, 110, 100, 59, 27204, 114, 99, 117, 112, 59, 27209, 256, 97, 117, 6607, 6610, 112, 59, 27211, 112, 59, 27207, 111, 116, 59, 27200, 59, 49152, 8745, 65024, 256, 101, 111, 6626, 6629, 116, 59, 24641, 238, 1683, 512, 97, 101, 105, 117, 6640, 6651, 6657, 6661, 496, 6645, 0, 6648, 115, 59, 27213, 111, 110, 59, 16653, 100, 105, 108, 32827, 231, 16615, 114, 99, 59, 16649, 112, 115, 256, 59, 115, 6668, 6669, 27212, 109, 59, 27216, 111, 116, 59, 16651, 384, 100, 109, 110, 6683, 6688, 6694, 105, 108, 32955, 184, 429, 112, 116, 121, 118, 59, 27058, 116, 33024, 162, 59, 101, 6701, 6702, 16546, 114, 228, 434, 114, 59, 49152, 55349, 56608, 384, 99, 101, 105, 6717, 6720, 6733, 121, 59, 17479, 99, 107, 256, 59, 109, 6727, 6728, 26387, 97, 114, 107, 187, 6728, 59, 17351, 114, 896, 59, 69, 99, 101, 102, 109, 115, 6751, 6752, 6754, 6763, 6820, 6826, 6830, 26059, 59, 27075, 384, 59, 101, 108, 6761, 6762, 6765, 17094, 113, 59, 25175, 101, 609, 6772, 0, 0, 6792, 114, 114, 111, 119, 256, 108, 114, 6780, 6785, 101, 102, 116, 59, 25018, 105, 103, 104, 116, 59, 25019, 640, 82, 83, 97, 99, 100, 6802, 6804, 6806, 6810, 6815, 187, 3911, 59, 25800, 115, 116, 59, 25243, 105, 114, 99, 59, 25242, 97, 115, 104, 59, 25245, 110, 105, 110, 116, 59, 27152, 105, 100, 59, 27375, 99, 105, 114, 59, 27074, 117, 98, 115, 256, 59, 117, 6843, 6844, 26211, 105, 116, 187, 6844, 748, 6855, 6868, 6906, 0, 6922, 111, 110, 256, 59, 101, 6861, 6862, 16442, 256, 59, 113, 199, 198, 621, 6873, 0, 0, 6882, 97, 256, 59, 116, 6878, 6879, 16428, 59, 16448, 384, 59, 102, 108, 6888, 6889, 6891, 25089, 238, 4448, 101, 256, 109, 120, 6897, 6902, 101, 110, 116, 187, 6889, 101, 243, 589, 487, 6910, 0, 6919, 256, 59, 100, 4795, 6914, 111, 116, 59, 27245, 110, 244, 582, 384, 102, 114, 121, 6928, 6932, 6935, 59, 49152, 55349, 56660, 111, 228, 596, 33024, 169, 59, 115, 341, 6941, 114, 59, 24855, 256, 97, 111, 6949, 6953, 114, 114, 59, 25013, 115, 115, 59, 26391, 256, 99, 117, 6962, 6967, 114, 59, 49152, 55349, 56504, 256, 98, 112, 6972, 6980, 256, 59, 101, 6977, 6978, 27343, 59, 27345, 256, 59, 101, 6985, 6986, 27344, 59, 27346, 100, 111, 116, 59, 25327, 896, 100, 101, 108, 112, 114, 118, 119, 7008, 7020, 7031, 7042, 7084, 7124, 7161, 97, 114, 114, 256, 108, 114, 7016, 7018, 59, 26936, 59, 26933, 624, 7026, 0, 0, 7029, 114, 59, 25310, 99, 59, 25311, 97, 114, 114, 256, 59, 112, 7039, 7040, 25014, 59, 26941, 768, 59, 98, 99, 100, 111, 115, 7055, 7056, 7062, 7073, 7077, 7080, 25130, 114, 99, 97, 112, 59, 27208, 256, 97, 117, 7067, 7070, 112, 59, 27206, 112, 59, 27210, 111, 116, 59, 25229, 114, 59, 27205, 59, 49152, 8746, 65024, 512, 97, 108, 114, 118, 7093, 7103, 7134, 7139, 114, 114, 256, 59, 109, 7100, 7101, 25015, 59, 26940, 121, 384, 101, 118, 119, 7111, 7124, 7128, 113, 624, 7118, 0, 0, 7122, 114, 101, 227, 7027, 117, 227, 7029, 101, 101, 59, 25294, 101, 100, 103, 101, 59, 25295, 101, 110, 32827, 164, 16548, 101, 97, 114, 114, 111, 119, 256, 108, 114, 7150, 7155, 101, 102, 116, 187, 7040, 105, 103, 104, 116, 187, 7101, 101, 228, 7133, 256, 99, 105, 7169, 7175, 111, 110, 105, 110, 244, 503, 110, 116, 59, 25137, 108, 99, 116, 121, 59, 25389, 2432, 65, 72, 97, 98, 99, 100, 101, 102, 104, 105, 106, 108, 111, 114, 115, 116, 117, 119, 122, 7224, 7227, 7231, 7261, 7273, 7285, 7306, 7326, 7340, 7351, 7419, 7423, 7437, 7547, 7569, 7595, 7611, 7622, 7629, 114, 242, 897, 97, 114, 59, 26981, 512, 103, 108, 114, 115, 7240, 7245, 7250, 7252, 103, 101, 114, 59, 24608, 101, 116, 104, 59, 24888, 242, 4403, 104, 256, 59, 118, 7258, 7259, 24592, 187, 2314, 363, 7265, 7271, 97, 114, 111, 119, 59, 26895, 97, 227, 789, 256, 97, 121, 7278, 7283, 114, 111, 110, 59, 16655, 59, 17460, 384, 59, 97, 111, 818, 7292, 7300, 256, 103, 114, 703, 7297, 114, 59, 25034, 116, 115, 101, 113, 59, 27255, 384, 103, 108, 109, 7313, 7316, 7320, 32827, 176, 16560, 116, 97, 59, 17332, 112, 116, 121, 118, 59, 27057, 256, 105, 114, 7331, 7336, 115, 104, 116, 59, 27007, 59, 49152, 55349, 56609, 97, 114, 256, 108, 114, 7347, 7349, 187, 2268, 187, 4126, 640, 97, 101, 103, 115, 118, 7362, 888, 7382, 7388, 7392, 109, 384, 59, 111, 115, 806, 7370, 7380, 110, 100, 256, 59, 115, 806, 7377, 117, 105, 116, 59, 26214, 97, 109, 109, 97, 59, 17373, 105, 110, 59, 25330, 384, 59, 105, 111, 7399, 7400, 7416, 16631, 100, 101, 33024, 247, 59, 111, 7399, 7408, 110, 116, 105, 109, 101, 115, 59, 25287, 110, 248, 7415, 99, 121, 59, 17490, 99, 623, 7430, 0, 0, 7434, 114, 110, 59, 25374, 111, 112, 59, 25357, 640, 108, 112, 116, 117, 119, 7448, 7453, 7458, 7497, 7509, 108, 97, 114, 59, 16420, 102, 59, 49152, 55349, 56661, 640, 59, 101, 109, 112, 115, 779, 7469, 7479, 7485, 7490, 113, 256, 59, 100, 850, 7475, 111, 116, 59, 25169, 105, 110, 117, 115, 59, 25144, 108, 117, 115, 59, 25108, 113, 117, 97, 114, 101, 59, 25249, 98, 108, 101, 98, 97, 114, 119, 101, 100, 103, 229, 250, 110, 384, 97, 100, 104, 4398, 7517, 7527, 111, 119, 110, 97, 114, 114, 111, 119, 243, 7299, 97, 114, 112, 111, 111, 110, 256, 108, 114, 7538, 7542, 101, 102, 244, 7348, 105, 103, 104, 244, 7350, 354, 7551, 7557, 107, 97, 114, 111, 247, 3906, 623, 7562, 0, 0, 7566, 114, 110, 59, 25375, 111, 112, 59, 25356, 384, 99, 111, 116, 7576, 7587, 7590, 256, 114, 121, 7581, 7585, 59, 49152, 55349, 56505, 59, 17493, 108, 59, 27126, 114, 111, 107, 59, 16657, 256, 100, 114, 7600, 7604, 111, 116, 59, 25329, 105, 256, 59, 102, 7610, 6166, 26047, 256, 97, 104, 7616, 7619, 114, 242, 1065, 97, 242, 4006, 97, 110, 103, 108, 101, 59, 27046, 256, 99, 105, 7634, 7637, 121, 59, 17503, 103, 114, 97, 114, 114, 59, 26623, 2304, 68, 97, 99, 100, 101, 102, 103, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 120, 7681, 7689, 7705, 7736, 1400, 7740, 7753, 7777, 7806, 7845, 7855, 7869, 7905, 7978, 7991, 8004, 8014, 8026, 256, 68, 111, 7686, 7476, 111, 244, 7305, 256, 99, 115, 7694, 7700, 117, 116, 101, 32827, 233, 16617, 116, 101, 114, 59, 27246, 512, 97, 105, 111, 121, 7714, 7719, 7729, 7734, 114, 111, 110, 59, 16667, 114, 256, 59, 99, 7725, 7726, 25174, 32827, 234, 16618, 108, 111, 110, 59, 25173, 59, 17485, 111, 116, 59, 16663, 256, 68, 114, 7745, 7749, 111, 116, 59, 25170, 59, 49152, 55349, 56610, 384, 59, 114, 115, 7760, 7761, 7767, 27290, 97, 118, 101, 32827, 232, 16616, 256, 59, 100, 7772, 7773, 27286, 111, 116, 59, 27288, 512, 59, 105, 108, 115, 7786, 7787, 7794, 7796, 27289, 110, 116, 101, 114, 115, 59, 25575, 59, 24851, 256, 59, 100, 7801, 7802, 27285, 111, 116, 59, 27287, 384, 97, 112, 115, 7813, 7817, 7831, 99, 114, 59, 16659, 116, 121, 384, 59, 115, 118, 7826, 7827, 7829, 25093, 101, 116, 187, 7827, 112, 256, 49, 59, 7837, 7844, 307, 7841, 7843, 59, 24580, 59, 24581, 24579, 256, 103, 115, 7850, 7852, 59, 16715, 112, 59, 24578, 256, 103, 112, 7860, 7864, 111, 110, 59, 16665, 102, 59, 49152, 55349, 56662, 384, 97, 108, 115, 7876, 7886, 7890, 114, 256, 59, 115, 7882, 7883, 25301, 108, 59, 27107, 117, 115, 59, 27249, 105, 384, 59, 108, 118, 7898, 7899, 7903, 17333, 111, 110, 187, 7899, 59, 17397, 512, 99, 115, 117, 118, 7914, 7923, 7947, 7971, 256, 105, 111, 7919, 7729, 114, 99, 187, 7726, 617, 7929, 0, 0, 7931, 237, 1352, 97, 110, 116, 256, 103, 108, 7938, 7942, 116, 114, 187, 7773, 101, 115, 115, 187, 7802, 384, 97, 101, 105, 7954, 7958, 7962, 108, 115, 59, 16445, 115, 116, 59, 25183, 118, 256, 59, 68, 565, 7968, 68, 59, 27256, 112, 97, 114, 115, 108, 59, 27109, 256, 68, 97, 7983, 7987, 111, 116, 59, 25171, 114, 114, 59, 26993, 384, 99, 100, 105, 7998, 8001, 7928, 114, 59, 24879, 111, 244, 850, 256, 97, 104, 8009, 8011, 59, 17335, 32827, 240, 16624, 256, 109, 114, 8019, 8023, 108, 32827, 235, 16619, 111, 59, 24748, 384, 99, 105, 112, 8033, 8036, 8039, 108, 59, 16417, 115, 244, 1390, 256, 101, 111, 8044, 8052, 99, 116, 97, 116, 105, 111, 238, 1369, 110, 101, 110, 116, 105, 97, 108, 229, 1401, 2529, 8082, 0, 8094, 0, 8097, 8103, 0, 0, 8134, 8140, 0, 8147, 0, 8166, 8170, 8192, 0, 8200, 8282, 108, 108, 105, 110, 103, 100, 111, 116, 115, 101, 241, 7748, 121, 59, 17476, 109, 97, 108, 101, 59, 26176, 384, 105, 108, 114, 8109, 8115, 8129, 108, 105, 103, 59, 32768, 64259, 617, 8121, 0, 0, 8125, 103, 59, 32768, 64256, 105, 103, 59, 32768, 64260, 59, 49152, 55349, 56611, 108, 105, 103, 59, 32768, 64257, 108, 105, 103, 59, 49152, 102, 106, 384, 97, 108, 116, 8153, 8156, 8161, 116, 59, 26221, 105, 103, 59, 32768, 64258, 110, 115, 59, 26033, 111, 102, 59, 16786, 496, 8174, 0, 8179, 102, 59, 49152, 55349, 56663, 256, 97, 107, 1471, 8183, 256, 59, 118, 8188, 8189, 25300, 59, 27353, 97, 114, 116, 105, 110, 116, 59, 27149, 256, 97, 111, 8204, 8277, 256, 99, 115, 8209, 8274, 945, 8218, 8240, 8248, 8261, 8264, 0, 8272, 946, 8226, 8229, 8231, 8234, 8236, 0, 8238, 32827, 189, 16573, 59, 24915, 32827, 188, 16572, 59, 24917, 59, 24921, 59, 24923, 435, 8244, 0, 8246, 59, 24916, 59, 24918, 692, 8254, 8257, 0, 0, 8259, 32827, 190, 16574, 59, 24919, 59, 24924, 53, 59, 24920, 438, 8268, 0, 8270, 59, 24922, 59, 24925, 56, 59, 24926, 108, 59, 24644, 119, 110, 59, 25378, 99, 114, 59, 49152, 55349, 56507, 2176, 69, 97, 98, 99, 100, 101, 102, 103, 105, 106, 108, 110, 111, 114, 115, 116, 118, 8322, 8329, 8351, 8357, 8368, 8372, 8432, 8437, 8442, 8447, 8451, 8466, 8504, 791, 8510, 8530, 8606, 256, 59, 108, 1613, 8327, 59, 27276, 384, 99, 109, 112, 8336, 8341, 8349, 117, 116, 101, 59, 16885, 109, 97, 256, 59, 100, 8348, 7386, 17331, 59, 27270, 114, 101, 118, 101, 59, 16671, 256, 105, 121, 8362, 8366, 114, 99, 59, 16669, 59, 17459, 111, 116, 59, 16673, 512, 59, 108, 113, 115, 1598, 1602, 8381, 8393, 384, 59, 113, 115, 1598, 1612, 8388, 108, 97, 110, 244, 1637, 512, 59, 99, 100, 108, 1637, 8402, 8405, 8421, 99, 59, 27305, 111, 116, 256, 59, 111, 8412, 8413, 27264, 256, 59, 108, 8418, 8419, 27266, 59, 27268, 256, 59, 101, 8426, 8429, 49152, 8923, 65024, 115, 59, 27284, 114, 59, 49152, 55349, 56612, 256, 59, 103, 1651, 1563, 109, 101, 108, 59, 24887, 99, 121, 59, 17491, 512, 59, 69, 97, 106, 1626, 8460, 8462, 8464, 59, 27282, 59, 27301, 59, 27300, 512, 69, 97, 101, 115, 8475, 8477, 8489, 8500, 59, 25193, 112, 256, 59, 112, 8483, 8484, 27274, 114, 111, 120, 187, 8484, 256, 59, 113, 8494, 8495, 27272, 256, 59, 113, 8494, 8475, 105, 109, 59, 25319, 112, 102, 59, 49152, 55349, 56664, 256, 99, 105, 8515, 8518, 114, 59, 24842, 109, 384, 59, 101, 108, 1643, 8526, 8528, 59, 27278, 59, 27280, 33536, 62, 59, 99, 100, 108, 113, 114, 1518, 8544, 8554, 8558, 8563, 8569, 256, 99, 105, 8549, 8551, 59, 27303, 114, 59, 27258, 111, 116, 59, 25303, 80, 97, 114, 59, 27029, 117, 101, 115, 116, 59, 27260, 640, 97, 100, 101, 108, 115, 8580, 8554, 8592, 1622, 8603, 496, 8585, 0, 8590, 112, 114, 111, 248, 8350, 114, 59, 27000, 113, 256, 108, 113, 1599, 8598, 108, 101, 115, 243, 8328, 105, 237, 1643, 256, 101, 110, 8611, 8621, 114, 116, 110, 101, 113, 113, 59, 49152, 8809, 65024, 197, 8618, 1280, 65, 97, 98, 99, 101, 102, 107, 111, 115, 121, 8644, 8647, 8689, 8693, 8698, 8728, 8733, 8751, 8808, 8829, 114, 242, 928, 512, 105, 108, 109, 114, 8656, 8660, 8663, 8667, 114, 115, 240, 5252, 102, 187, 8228, 105, 108, 244, 1705, 256, 100, 114, 8672, 8676, 99, 121, 59, 17482, 384, 59, 99, 119, 2292, 8683, 8687, 105, 114, 59, 26952, 59, 25005, 97, 114, 59, 24847, 105, 114, 99, 59, 16677, 384, 97, 108, 114, 8705, 8718, 8723, 114, 116, 115, 256, 59, 117, 8713, 8714, 26213, 105, 116, 187, 8714, 108, 105, 112, 59, 24614, 99, 111, 110, 59, 25273, 114, 59, 49152, 55349, 56613, 115, 256, 101, 119, 8739, 8745, 97, 114, 111, 119, 59, 26917, 97, 114, 111, 119, 59, 26918, 640, 97, 109, 111, 112, 114, 8762, 8766, 8771, 8798, 8803, 114, 114, 59, 25087, 116, 104, 116, 59, 25147, 107, 256, 108, 114, 8777, 8787, 101, 102, 116, 97, 114, 114, 111, 119, 59, 25001, 105, 103, 104, 116, 97, 114, 114, 111, 119, 59, 25002, 102, 59, 49152, 55349, 56665, 98, 97, 114, 59, 24597, 384, 99, 108, 116, 8815, 8820, 8824, 114, 59, 49152, 55349, 56509, 97, 115, 232, 8692, 114, 111, 107, 59, 16679, 256, 98, 112, 8834, 8839, 117, 108, 108, 59, 24643, 104, 101, 110, 187, 7259, 2785, 8867, 0, 8874, 0, 8888, 8901, 8910, 0, 8917, 8947, 0, 0, 8952, 8994, 9063, 9058, 9087, 0, 9094, 9130, 9140, 99, 117, 116, 101, 32827, 237, 16621, 384, 59, 105, 121, 1905, 8880, 8885, 114, 99, 32827, 238, 16622, 59, 17464, 256, 99, 120, 8892, 8895, 121, 59, 17461, 99, 108, 32827, 161, 16545, 256, 102, 114, 927, 8905, 59, 49152, 55349, 56614, 114, 97, 118, 101, 32827, 236, 16620, 512, 59, 105, 110, 111, 1854, 8925, 8937, 8942, 256, 105, 110, 8930, 8934, 110, 116, 59, 27148, 116, 59, 25133, 102, 105, 110, 59, 27100, 116, 97, 59, 24873, 108, 105, 103, 59, 16691, 384, 97, 111, 112, 8958, 8986, 8989, 384, 99, 103, 116, 8965, 8968, 8983, 114, 59, 16683, 384, 101, 108, 112, 1823, 8975, 8979, 105, 110, 229, 1934, 97, 114, 244, 1824, 104, 59, 16689, 102, 59, 25271, 101, 100, 59, 16821, 640, 59, 99, 102, 111, 116, 1268, 9004, 9009, 9021, 9025, 97, 114, 101, 59, 24837, 105, 110, 256, 59, 116, 9016, 9017, 25118, 105, 101, 59, 27101, 100, 111, 244, 8985, 640, 59, 99, 101, 108, 112, 1879, 9036, 9040, 9051, 9057, 97, 108, 59, 25274, 256, 103, 114, 9045, 9049, 101, 114, 243, 5475, 227, 9037, 97, 114, 104, 107, 59, 27159, 114, 111, 100, 59, 27196, 512, 99, 103, 112, 116, 9071, 9074, 9078, 9083, 121, 59, 17489, 111, 110, 59, 16687, 102, 59, 49152, 55349, 56666, 97, 59, 17337, 117, 101, 115, 116, 32827, 191, 16575, 256, 99, 105, 9098, 9103, 114, 59, 49152, 55349, 56510, 110, 640, 59, 69, 100, 115, 118, 1268, 9115, 9117, 9121, 1267, 59, 25337, 111, 116, 59, 25333, 256, 59, 118, 9126, 9127, 25332, 59, 25331, 256, 59, 105, 1911, 9134, 108, 100, 101, 59, 16681, 491, 9144, 0, 9148, 99, 121, 59, 17494, 108, 32827, 239, 16623, 768, 99, 102, 109, 111, 115, 117, 9164, 9175, 9180, 9185, 9191, 9205, 256, 105, 121, 9169, 9173, 114, 99, 59, 16693, 59, 17465, 114, 59, 49152, 55349, 56615, 97, 116, 104, 59, 16951, 112, 102, 59, 49152, 55349, 56667, 483, 9196, 0, 9201, 114, 59, 49152, 55349, 56511, 114, 99, 121, 59, 17496, 107, 99, 121, 59, 17492, 1024, 97, 99, 102, 103, 104, 106, 111, 115, 9227, 9238, 9250, 9255, 9261, 9265, 9269, 9275, 112, 112, 97, 256, 59, 118, 9235, 9236, 17338, 59, 17392, 256, 101, 121, 9243, 9248, 100, 105, 108, 59, 16695, 59, 17466, 114, 59, 49152, 55349, 56616, 114, 101, 101, 110, 59, 16696, 99, 121, 59, 17477, 99, 121, 59, 17500, 112, 102, 59, 49152, 55349, 56668, 99, 114, 59, 49152, 55349, 56512, 2944, 65, 66, 69, 72, 97, 98, 99, 100, 101, 102, 103, 104, 106, 108, 109, 110, 111, 112, 114, 115, 116, 117, 118, 9328, 9345, 9350, 9357, 9361, 9486, 9533, 9562, 9600, 9806, 9822, 9829, 9849, 9853, 9882, 9906, 9944, 10077, 10088, 10123, 10176, 10241, 10258, 384, 97, 114, 116, 9335, 9338, 9340, 114, 242, 2502, 242, 917, 97, 105, 108, 59, 26907, 97, 114, 114, 59, 26894, 256, 59, 103, 2452, 9355, 59, 27275, 97, 114, 59, 26978, 2403, 9381, 0, 9386, 0, 9393, 0, 0, 0, 0, 0, 9397, 9402, 0, 9414, 9416, 9421, 0, 9465, 117, 116, 101, 59, 16698, 109, 112, 116, 121, 118, 59, 27060, 114, 97, 238, 2124, 98, 100, 97, 59, 17339, 103, 384, 59, 100, 108, 2190, 9409, 9411, 59, 27025, 229, 2190, 59, 27269, 117, 111, 32827, 171, 16555, 114, 1024, 59, 98, 102, 104, 108, 112, 115, 116, 2201, 9438, 9446, 9449, 9451, 9454, 9457, 9461, 256, 59, 102, 2205, 9443, 115, 59, 26911, 115, 59, 26909, 235, 8786, 112, 59, 25003, 108, 59, 26937, 105, 109, 59, 26995, 108, 59, 24994, 384, 59, 97, 101, 9471, 9472, 9476, 27307, 105, 108, 59, 26905, 256, 59, 115, 9481, 9482, 27309, 59, 49152, 10925, 65024, 384, 97, 98, 114, 9493, 9497, 9501, 114, 114, 59, 26892, 114, 107, 59, 26482, 256, 97, 107, 9506, 9516, 99, 256, 101, 107, 9512, 9514, 59, 16507, 59, 16475, 256, 101, 115, 9521, 9523, 59, 27019, 108, 256, 100, 117, 9529, 9531, 59, 27023, 59, 27021, 512, 97, 101, 117, 121, 9542, 9547, 9558, 9560, 114, 111, 110, 59, 16702, 256, 100, 105, 9552, 9556, 105, 108, 59, 16700, 236, 2224, 226, 9513, 59, 17467, 512, 99, 113, 114, 115, 9571, 9574, 9581, 9597, 97, 59, 26934, 117, 111, 256, 59, 114, 3609, 5958, 256, 100, 117, 9586, 9591, 104, 97, 114, 59, 26983, 115, 104, 97, 114, 59, 26955, 104, 59, 25010, 640, 59, 102, 103, 113, 115, 9611, 9612, 2441, 9715, 9727, 25188, 116, 640, 97, 104, 108, 114, 116, 9624, 9636, 9655, 9666, 9704, 114, 114, 111, 119, 256, 59, 116, 2201, 9633, 97, 233, 9462, 97, 114, 112, 111, 111, 110, 256, 100, 117, 9647, 9652, 111, 119, 110, 187, 1114, 112, 187, 2406, 101, 102, 116, 97, 114, 114, 111, 119, 115, 59, 25031, 105, 103, 104, 116, 384, 97, 104, 115, 9677, 9686, 9694, 114, 114, 111, 119, 256, 59, 115, 2292, 2215, 97, 114, 112, 111, 111, 110, 243, 3992, 113, 117, 105, 103, 97, 114, 114, 111, 247, 8688, 104, 114, 101, 101, 116, 105, 109, 101, 115, 59, 25291, 384, 59, 113, 115, 9611, 2451, 9722, 108, 97, 110, 244, 2476, 640, 59, 99, 100, 103, 115, 2476, 9738, 9741, 9757, 9768, 99, 59, 27304, 111, 116, 256, 59, 111, 9748, 9749, 27263, 256, 59, 114, 9754, 9755, 27265, 59, 27267, 256, 59, 101, 9762, 9765, 49152, 8922, 65024, 115, 59, 27283, 640, 97, 100, 101, 103, 115, 9779, 9785, 9789, 9801, 9803, 112, 112, 114, 111, 248, 9414, 111, 116, 59, 25302, 113, 256, 103, 113, 9795, 9797, 244, 2441, 103, 116, 242, 9356, 244, 2459, 105, 237, 2482, 384, 105, 108, 114, 9813, 2273, 9818, 115, 104, 116, 59, 27004, 59, 49152, 55349, 56617, 256, 59, 69, 2460, 9827, 59, 27281, 353, 9833, 9846, 114, 256, 100, 117, 9650, 9838, 256, 59, 108, 2405, 9843, 59, 26986, 108, 107, 59, 25988, 99, 121, 59, 17497, 640, 59, 97, 99, 104, 116, 2632, 9864, 9867, 9873, 9878, 114, 242, 9665, 111, 114, 110, 101, 242, 7432, 97, 114, 100, 59, 26987, 114, 105, 59, 26106, 256, 105, 111, 9887, 9892, 100, 111, 116, 59, 16704, 117, 115, 116, 256, 59, 97, 9900, 9901, 25520, 99, 104, 101, 187, 9901, 512, 69, 97, 101, 115, 9915, 9917, 9929, 9940, 59, 25192, 112, 256, 59, 112, 9923, 9924, 27273, 114, 111, 120, 187, 9924, 256, 59, 113, 9934, 9935, 27271, 256, 59, 113, 9934, 9915, 105, 109, 59, 25318, 1024, 97, 98, 110, 111, 112, 116, 119, 122, 9961, 9972, 9975, 10010, 10031, 10049, 10055, 10064, 256, 110, 114, 9966, 9969, 103, 59, 26604, 114, 59, 25085, 114, 235, 2241, 103, 384, 108, 109, 114, 9983, 9997, 10004, 101, 102, 116, 256, 97, 114, 2534, 9991, 105, 103, 104, 116, 225, 2546, 97, 112, 115, 116, 111, 59, 26620, 105, 103, 104, 116, 225, 2557, 112, 97, 114, 114, 111, 119, 256, 108, 114, 10021, 10025, 101, 102, 244, 9453, 105, 103, 104, 116, 59, 25004, 384, 97, 102, 108, 10038, 10041, 10045, 114, 59, 27013, 59, 49152, 55349, 56669, 117, 115, 59, 27181, 105, 109, 101, 115, 59, 27188, 353, 10059, 10063, 115, 116, 59, 25111, 225, 4942, 384, 59, 101, 102, 10071, 10072, 6144, 26058, 110, 103, 101, 187, 10072, 97, 114, 256, 59, 108, 10084, 10085, 16424, 116, 59, 27027, 640, 97, 99, 104, 109, 116, 10099, 10102, 10108, 10117, 10119, 114, 242, 2216, 111, 114, 110, 101, 242, 7564, 97, 114, 256, 59, 100, 3992, 10115, 59, 26989, 59, 24590, 114, 105, 59, 25279, 768, 97, 99, 104, 105, 113, 116, 10136, 10141, 2624, 10146, 10158, 10171, 113, 117, 111, 59, 24633, 114, 59, 49152, 55349, 56513, 109, 384, 59, 101, 103, 2482, 10154, 10156, 59, 27277, 59, 27279, 256, 98, 117, 9514, 10163, 111, 256, 59, 114, 3615, 10169, 59, 24602, 114, 111, 107, 59, 16706, 33792, 60, 59, 99, 100, 104, 105, 108, 113, 114, 2091, 10194, 9785, 10204, 10208, 10213, 10218, 10224, 256, 99, 105, 10199, 10201, 59, 27302, 114, 59, 27257, 114, 101, 229, 9714, 109, 101, 115, 59, 25289, 97, 114, 114, 59, 26998, 117, 101, 115, 116, 59, 27259, 256, 80, 105, 10229, 10233, 97, 114, 59, 27030, 384, 59, 101, 102, 10240, 2349, 6171, 26051, 114, 256, 100, 117, 10247, 10253, 115, 104, 97, 114, 59, 26954, 104, 97, 114, 59, 26982, 256, 101, 110, 10263, 10273, 114, 116, 110, 101, 113, 113, 59, 49152, 8808, 65024, 197, 10270, 1792, 68, 97, 99, 100, 101, 102, 104, 105, 108, 110, 111, 112, 115, 117, 10304, 10309, 10370, 10382, 10387, 10400, 10405, 10408, 10458, 10466, 10468, 2691, 10483, 10498, 68, 111, 116, 59, 25146, 512, 99, 108, 112, 114, 10318, 10322, 10339, 10365, 114, 32827, 175, 16559, 256, 101, 116, 10327, 10329, 59, 26178, 256, 59, 101, 10334, 10335, 26400, 115, 101, 187, 10335, 256, 59, 115, 4155, 10344, 116, 111, 512, 59, 100, 108, 117, 4155, 10355, 10359, 10363, 111, 119, 238, 1164, 101, 102, 244, 2319, 240, 5073, 107, 101, 114, 59, 26030, 256, 111, 121, 10375, 10380, 109, 109, 97, 59, 27177, 59, 17468, 97, 115, 104, 59, 24596, 97, 115, 117, 114, 101, 100, 97, 110, 103, 108, 101, 187, 5670, 114, 59, 49152, 55349, 56618, 111, 59, 24871, 384, 99, 100, 110, 10415, 10420, 10441, 114, 111, 32827, 181, 16565, 512, 59, 97, 99, 100, 5220, 10429, 10432, 10436, 115, 244, 5799, 105, 114, 59, 27376, 111, 116, 32955, 183, 437, 117, 115, 384, 59, 98, 100, 10450, 6403, 10451, 25106, 256, 59, 117, 7484, 10456, 59, 27178, 355, 10462, 10465, 112, 59, 27355, 242, 8722, 240, 2689, 256, 100, 112, 10473, 10478, 101, 108, 115, 59, 25255, 102, 59, 49152, 55349, 56670, 256, 99, 116, 10488, 10493, 114, 59, 49152, 55349, 56514, 112, 111, 115, 187, 5533, 384, 59, 108, 109, 10505, 10506, 10509, 17340, 116, 105, 109, 97, 112, 59, 25272, 3072, 71, 76, 82, 86, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 108, 109, 111, 112, 114, 115, 116, 117, 118, 119, 10562, 10579, 10622, 10633, 10648, 10714, 10729, 10773, 10778, 10840, 10845, 10883, 10901, 10916, 10920, 11012, 11015, 11076, 11135, 11182, 11316, 11367, 11388, 11497, 256, 103, 116, 10567, 10571, 59, 49152, 8921, 824, 256, 59, 118, 10576, 3023, 49152, 8811, 8402, 384, 101, 108, 116, 10586, 10610, 10614, 102, 116, 256, 97, 114, 10593, 10599, 114, 114, 111, 119, 59, 25037, 105, 103, 104, 116, 97, 114, 114, 111, 119, 59, 25038, 59, 49152, 8920, 824, 256, 59, 118, 10619, 3143, 49152, 8810, 8402, 105, 103, 104, 116, 97, 114, 114, 111, 119, 59, 25039, 256, 68, 100, 10638, 10643, 97, 115, 104, 59, 25263, 97, 115, 104, 59, 25262, 640, 98, 99, 110, 112, 116, 10659, 10663, 10668, 10673, 10700, 108, 97, 187, 734, 117, 116, 101, 59, 16708, 103, 59, 49152, 8736, 8402, 640, 59, 69, 105, 111, 112, 3460, 10684, 10688, 10693, 10696, 59, 49152, 10864, 824, 100, 59, 49152, 8779, 824, 115, 59, 16713, 114, 111, 248, 3460, 117, 114, 256, 59, 97, 10707, 10708, 26222, 108, 256, 59, 115, 10707, 2872, 499, 10719, 0, 10723, 112, 32955, 160, 2871, 109, 112, 256, 59, 101, 3065, 3072, 640, 97, 101, 111, 117, 121, 10740, 10750, 10755, 10768, 10771, 496, 10745, 0, 10747, 59, 27203, 111, 110, 59, 16712, 100, 105, 108, 59, 16710, 110, 103, 256, 59, 100, 3454, 10762, 111, 116, 59, 49152, 10861, 824, 112, 59, 27202, 59, 17469, 97, 115, 104, 59, 24595, 896, 59, 65, 97, 100, 113, 115, 120, 2962, 10793, 10797, 10811, 10817, 10821, 10832, 114, 114, 59, 25047, 114, 256, 104, 114, 10803, 10806, 107, 59, 26916, 256, 59, 111, 5106, 5104, 111, 116, 59, 49152, 8784, 824, 117, 105, 246, 2915, 256, 101, 105, 10826, 10830, 97, 114, 59, 26920, 237, 2968, 105, 115, 116, 256, 59, 115, 2976, 2975, 114, 59, 49152, 55349, 56619, 512, 69, 101, 115, 116, 3013, 10854, 10873, 10876, 384, 59, 113, 115, 3004, 10861, 3041, 384, 59, 113, 115, 3004, 3013, 10868, 108, 97, 110, 244, 3042, 105, 237, 3050, 256, 59, 114, 2998, 10881, 187, 2999, 384, 65, 97, 112, 10890, 10893, 10897, 114, 242, 10609, 114, 114, 59, 25006, 97, 114, 59, 27378, 384, 59, 115, 118, 3981, 10908, 3980, 256, 59, 100, 10913, 10914, 25340, 59, 25338, 99, 121, 59, 17498, 896, 65, 69, 97, 100, 101, 115, 116, 10935, 10938, 10942, 10946, 10949, 10998, 11001, 114, 242, 10598, 59, 49152, 8806, 824, 114, 114, 59, 24986, 114, 59, 24613, 512, 59, 102, 113, 115, 3131, 10958, 10979, 10991, 116, 256, 97, 114, 10964, 10969, 114, 114, 111, 247, 10945, 105, 103, 104, 116, 97, 114, 114, 111, 247, 10896, 384, 59, 113, 115, 3131, 10938, 10986, 108, 97, 110, 244, 3157, 256, 59, 115, 3157, 10996, 187, 3126, 105, 237, 3165, 256, 59, 114, 3125, 11006, 105, 256, 59, 101, 3098, 3109, 105, 228, 3472, 256, 112, 116, 11020, 11025, 102, 59, 49152, 55349, 56671, 33152, 172, 59, 105, 110, 11033, 11034, 11062, 16556, 110, 512, 59, 69, 100, 118, 2953, 11044, 11048, 11054, 59, 49152, 8953, 824, 111, 116, 59, 49152, 8949, 824, 481, 2953, 11059, 11061, 59, 25335, 59, 25334, 105, 256, 59, 118, 3256, 11068, 481, 3256, 11073, 11075, 59, 25342, 59, 25341, 384, 97, 111, 114, 11083, 11107, 11113, 114, 512, 59, 97, 115, 116, 2939, 11093, 11098, 11103, 108, 108, 101, 236, 2939, 108, 59, 49152, 11005, 8421, 59, 49152, 8706, 824, 108, 105, 110, 116, 59, 27156, 384, 59, 99, 101, 3218, 11120, 11123, 117, 229, 3237, 256, 59, 99, 3224, 11128, 256, 59, 101, 3218, 11133, 241, 3224, 512, 65, 97, 105, 116, 11144, 11147, 11165, 11175, 114, 242, 10632, 114, 114, 384, 59, 99, 119, 11156, 11157, 11161, 24987, 59, 49152, 10547, 824, 59, 49152, 8605, 824, 103, 104, 116, 97, 114, 114, 111, 119, 187, 11157, 114, 105, 256, 59, 101, 3275, 3286, 896, 99, 104, 105, 109, 112, 113, 117, 11197, 11213, 11225, 11012, 2936, 11236, 11247, 512, 59, 99, 101, 114, 3378, 11206, 3383, 11209, 117, 229, 3397, 59, 49152, 55349, 56515, 111, 114, 116, 621, 11013, 0, 0, 11222, 97, 114, 225, 11094, 109, 256, 59, 101, 3438, 11231, 256, 59, 113, 3444, 3443, 115, 117, 256, 98, 112, 11243, 11245, 229, 3320, 229, 3339, 384, 98, 99, 112, 11254, 11281, 11289, 512, 59, 69, 101, 115, 11263, 11264, 3362, 11268, 25220, 59, 49152, 10949, 824, 101, 116, 256, 59, 101, 3355, 11275, 113, 256, 59, 113, 3363, 11264, 99, 256, 59, 101, 3378, 11287, 241, 3384, 512, 59, 69, 101, 115, 11298, 11299, 3423, 11303, 25221, 59, 49152, 10950, 824, 101, 116, 256, 59, 101, 3416, 11310, 113, 256, 59, 113, 3424, 11299, 512, 103, 105, 108, 114, 11325, 11327, 11333, 11335, 236, 3031, 108, 100, 101, 32827, 241, 16625, 231, 3139, 105, 97, 110, 103, 108, 101, 256, 108, 114, 11346, 11356, 101, 102, 116, 256, 59, 101, 3098, 11354, 241, 3110, 105, 103, 104, 116, 256, 59, 101, 3275, 11365, 241, 3287, 256, 59, 109, 11372, 11373, 17341, 384, 59, 101, 115, 11380, 11381, 11385, 16419, 114, 111, 59, 24854, 112, 59, 24583, 1152, 68, 72, 97, 100, 103, 105, 108, 114, 115, 11407, 11412, 11417, 11422, 11427, 11440, 11446, 11475, 11491, 97, 115, 104, 59, 25261, 97, 114, 114, 59, 26884, 112, 59, 49152, 8781, 8402, 97, 115, 104, 59, 25260, 256, 101, 116, 11432, 11436, 59, 49152, 8805, 8402, 59, 49152, 62, 8402, 110, 102, 105, 110, 59, 27102, 384, 65, 101, 116, 11453, 11457, 11461, 114, 114, 59, 26882, 59, 49152, 8804, 8402, 256, 59, 114, 11466, 11469, 49152, 60, 8402, 105, 101, 59, 49152, 8884, 8402, 256, 65, 116, 11480, 11484, 114, 114, 59, 26883, 114, 105, 101, 59, 49152, 8885, 8402, 105, 109, 59, 49152, 8764, 8402, 384, 65, 97, 110, 11504, 11508, 11522, 114, 114, 59, 25046, 114, 256, 104, 114, 11514, 11517, 107, 59, 26915, 256, 59, 111, 5095, 5093, 101, 97, 114, 59, 26919, 4691, 6805, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11565, 0, 11576, 11592, 11616, 11621, 11634, 11652, 6919, 0, 0, 11661, 11691, 0, 11720, 11726, 0, 11740, 11801, 11819, 11838, 11843, 256, 99, 115, 11569, 6807, 117, 116, 101, 32827, 243, 16627, 256, 105, 121, 11580, 11589, 114, 256, 59, 99, 6814, 11586, 32827, 244, 16628, 59, 17470, 640, 97, 98, 105, 111, 115, 6816, 11602, 11607, 456, 11610, 108, 97, 99, 59, 16721, 118, 59, 27192, 111, 108, 100, 59, 27068, 108, 105, 103, 59, 16723, 256, 99, 114, 11625, 11629, 105, 114, 59, 27071, 59, 49152, 55349, 56620, 879, 11641, 0, 0, 11644, 0, 11650, 110, 59, 17115, 97, 118, 101, 32827, 242, 16626, 59, 27073, 256, 98, 109, 11656, 3572, 97, 114, 59, 27061, 512, 97, 99, 105, 116, 11669, 11672, 11685, 11688, 114, 242, 6784, 256, 105, 114, 11677, 11680, 114, 59, 27070, 111, 115, 115, 59, 27067, 110, 229, 3666, 59, 27072, 384, 97, 101, 105, 11697, 11701, 11705, 99, 114, 59, 16717, 103, 97, 59, 17353, 384, 99, 100, 110, 11712, 11717, 461, 114, 111, 110, 59, 17343, 59, 27062, 112, 102, 59, 49152, 55349, 56672, 384, 97, 101, 108, 11732, 11735, 466, 114, 59, 27063, 114, 112, 59, 27065, 896, 59, 97, 100, 105, 111, 115, 118, 11754, 11755, 11758, 11784, 11789, 11792, 11798, 25128, 114, 242, 6790, 512, 59, 101, 102, 109, 11767, 11768, 11778, 11781, 27229, 114, 256, 59, 111, 11774, 11775, 24884, 102, 187, 11775, 32827, 170, 16554, 32827, 186, 16570, 103, 111, 102, 59, 25270, 114, 59, 27222, 108, 111, 112, 101, 59, 27223, 59, 27227, 384, 99, 108, 111, 11807, 11809, 11815, 242, 11777, 97, 115, 104, 32827, 248, 16632, 108, 59, 25240, 105, 364, 11823, 11828, 100, 101, 32827, 245, 16629, 101, 115, 256, 59, 97, 475, 11834, 115, 59, 27190, 109, 108, 32827, 246, 16630, 98, 97, 114, 59, 25405, 2785, 11870, 0, 11901, 0, 11904, 11933, 0, 11938, 11961, 0, 0, 11979, 3740, 0, 12051, 0, 0, 12075, 12220, 0, 12232, 114, 512, 59, 97, 115, 116, 1027, 11879, 11890, 3717, 33024, 182, 59, 108, 11885, 11886, 16566, 108, 101, 236, 1027, 617, 11896, 0, 0, 11899, 109, 59, 27379, 59, 27389, 121, 59, 17471, 114, 640, 99, 105, 109, 112, 116, 11915, 11919, 11923, 6245, 11927, 110, 116, 59, 16421, 111, 100, 59, 16430, 105, 108, 59, 24624, 101, 110, 107, 59, 24625, 114, 59, 49152, 55349, 56621, 384, 105, 109, 111, 11944, 11952, 11956, 256, 59, 118, 11949, 11950, 17350, 59, 17365, 109, 97, 244, 2678, 110, 101, 59, 26126, 384, 59, 116, 118, 11967, 11968, 11976, 17344, 99, 104, 102, 111, 114, 107, 187, 8189, 59, 17366, 256, 97, 117, 11983, 11999, 110, 256, 99, 107, 11989, 11997, 107, 256, 59, 104, 8692, 11995, 59, 24846, 246, 8692, 115, 1152, 59, 97, 98, 99, 100, 101, 109, 115, 116, 12019, 12020, 6408, 12025, 12029, 12036, 12038, 12042, 12046, 16427, 99, 105, 114, 59, 27171, 105, 114, 59, 27170, 256, 111, 117, 7488, 12034, 59, 27173, 59, 27250, 110, 32955, 177, 3741, 105, 109, 59, 27174, 119, 111, 59, 27175, 384, 105, 112, 117, 12057, 12064, 12069, 110, 116, 105, 110, 116, 59, 27157, 102, 59, 49152, 55349, 56673, 110, 100, 32827, 163, 16547, 1280, 59, 69, 97, 99, 101, 105, 110, 111, 115, 117, 3784, 12095, 12097, 12100, 12103, 12161, 12169, 12178, 12158, 12214, 59, 27315, 112, 59, 27319, 117, 229, 3801, 256, 59, 99, 3790, 12108, 768, 59, 97, 99, 101, 110, 115, 3784, 12121, 12127, 12134, 12136, 12158, 112, 112, 114, 111, 248, 12099, 117, 114, 108, 121, 101, 241, 3801, 241, 3790, 384, 97, 101, 115, 12143, 12150, 12154, 112, 112, 114, 111, 120, 59, 27321, 113, 113, 59, 27317, 105, 109, 59, 25320, 105, 237, 3807, 109, 101, 256, 59, 115, 12168, 3758, 24626, 384, 69, 97, 115, 12152, 12176, 12154, 240, 12149, 384, 100, 102, 112, 3820, 12185, 12207, 384, 97, 108, 115, 12192, 12197, 12202, 108, 97, 114, 59, 25390, 105, 110, 101, 59, 25362, 117, 114, 102, 59, 25363, 256, 59, 116, 3835, 12212, 239, 3835, 114, 101, 108, 59, 25264, 256, 99, 105, 12224, 12229, 114, 59, 49152, 55349, 56517, 59, 17352, 110, 99, 115, 112, 59, 24584, 768, 102, 105, 111, 112, 115, 117, 12250, 8930, 12255, 12261, 12267, 12273, 114, 59, 49152, 55349, 56622, 112, 102, 59, 49152, 55349, 56674, 114, 105, 109, 101, 59, 24663, 99, 114, 59, 49152, 55349, 56518, 384, 97, 101, 111, 12280, 12297, 12307, 116, 256, 101, 105, 12286, 12293, 114, 110, 105, 111, 110, 243, 1712, 110, 116, 59, 27158, 115, 116, 256, 59, 101, 12304, 12305, 16447, 241, 7961, 244, 3860, 2688, 65, 66, 72, 97, 98, 99, 100, 101, 102, 104, 105, 108, 109, 110, 111, 112, 114, 115, 116, 117, 120, 12352, 12369, 12373, 12377, 12512, 12558, 12587, 12615, 12642, 12658, 12686, 12806, 12821, 12836, 12841, 12888, 12910, 12914, 12944, 12976, 12983, 384, 97, 114, 116, 12359, 12362, 12364, 114, 242, 4275, 242, 989, 97, 105, 108, 59, 26908, 97, 114, 242, 7269, 97, 114, 59, 26980, 896, 99, 100, 101, 110, 113, 114, 116, 12392, 12405, 12408, 12415, 12431, 12436, 12492, 256, 101, 117, 12397, 12401, 59, 49152, 8765, 817, 116, 101, 59, 16725, 105, 227, 4462, 109, 112, 116, 121, 118, 59, 27059, 103, 512, 59, 100, 101, 108, 4049, 12425, 12427, 12429, 59, 27026, 59, 27045, 229, 4049, 117, 111, 32827, 187, 16571, 114, 1408, 59, 97, 98, 99, 102, 104, 108, 112, 115, 116, 119, 4060, 12460, 12463, 12471, 12473, 12476, 12478, 12480, 12483, 12487, 12490, 112, 59, 26997, 256, 59, 102, 4064, 12468, 115, 59, 26912, 59, 26931, 115, 59, 26910, 235, 8797, 240, 10030, 108, 59, 26949, 105, 109, 59, 26996, 108, 59, 24995, 59, 24989, 256, 97, 105, 12497, 12501, 105, 108, 59, 26906, 111, 256, 59, 110, 12507, 12508, 25142, 97, 108, 243, 3870, 384, 97, 98, 114, 12519, 12522, 12526, 114, 242, 6117, 114, 107, 59, 26483, 256, 97, 107, 12531, 12541, 99, 256, 101, 107, 12537, 12539, 59, 16509, 59, 16477, 256, 101, 115, 12546, 12548, 59, 27020, 108, 256, 100, 117, 12554, 12556, 59, 27022, 59, 27024, 512, 97, 101, 117, 121, 12567, 12572, 12583, 12585, 114, 111, 110, 59, 16729, 256, 100, 105, 12577, 12581, 105, 108, 59, 16727, 236, 4082, 226, 12538, 59, 17472, 512, 99, 108, 113, 115, 12596, 12599, 12605, 12612, 97, 59, 26935, 100, 104, 97, 114, 59, 26985, 117, 111, 256, 59, 114, 526, 525, 104, 59, 25011, 384, 97, 99, 103, 12622, 12639, 3908, 108, 512, 59, 105, 112, 115, 3960, 12632, 12635, 4252, 110, 229, 4283, 97, 114, 244, 4009, 116, 59, 26029, 384, 105, 108, 114, 12649, 4131, 12654, 115, 104, 116, 59, 27005, 59, 49152, 55349, 56623, 256, 97, 111, 12663, 12678, 114, 256, 100, 117, 12669, 12671, 187, 1147, 256, 59, 108, 4241, 12676, 59, 26988, 256, 59, 118, 12683, 12684, 17345, 59, 17393, 384, 103, 110, 115, 12693, 12793, 12796, 104, 116, 768, 97, 104, 108, 114, 115, 116, 12708, 12720, 12738, 12760, 12772, 12782, 114, 114, 111, 119, 256, 59, 116, 4060, 12717, 97, 233, 12488, 97, 114, 112, 111, 111, 110, 256, 100, 117, 12731, 12735, 111, 119, 238, 12670, 112, 187, 4242, 101, 102, 116, 256, 97, 104, 12746, 12752, 114, 114, 111, 119, 243, 4074, 97, 114, 112, 111, 111, 110, 243, 1361, 105, 103, 104, 116, 97, 114, 114, 111, 119, 115, 59, 25033, 113, 117, 105, 103, 97, 114, 114, 111, 247, 12491, 104, 114, 101, 101, 116, 105, 109, 101, 115, 59, 25292, 103, 59, 17114, 105, 110, 103, 100, 111, 116, 115, 101, 241, 7986, 384, 97, 104, 109, 12813, 12816, 12819, 114, 242, 4074, 97, 242, 1361, 59, 24591, 111, 117, 115, 116, 256, 59, 97, 12830, 12831, 25521, 99, 104, 101, 187, 12831, 109, 105, 100, 59, 27374, 512, 97, 98, 112, 116, 12850, 12861, 12864, 12882, 256, 110, 114, 12855, 12858, 103, 59, 26605, 114, 59, 25086, 114, 235, 4099, 384, 97, 102, 108, 12871, 12874, 12878, 114, 59, 27014, 59, 49152, 55349, 56675, 117, 115, 59, 27182, 105, 109, 101, 115, 59, 27189, 256, 97, 112, 12893, 12903, 114, 256, 59, 103, 12899, 12900, 16425, 116, 59, 27028, 111, 108, 105, 110, 116, 59, 27154, 97, 114, 242, 12771, 512, 97, 99, 104, 113, 12923, 12928, 4284, 12933, 113, 117, 111, 59, 24634, 114, 59, 49152, 55349, 56519, 256, 98, 117, 12539, 12938, 111, 256, 59, 114, 532, 531, 384, 104, 105, 114, 12951, 12955, 12960, 114, 101, 229, 12792, 109, 101, 115, 59, 25290, 105, 512, 59, 101, 102, 108, 12970, 4185, 6177, 12971, 26041, 116, 114, 105, 59, 27086, 108, 117, 104, 97, 114, 59, 26984, 59, 24862, 3425, 13013, 13019, 13023, 13100, 13112, 13169, 0, 13178, 13220, 0, 0, 13292, 13296, 0, 13352, 13384, 13402, 13485, 13489, 13514, 13553, 0, 13846, 0, 0, 13875, 99, 117, 116, 101, 59, 16731, 113, 117, 239, 10170, 1280, 59, 69, 97, 99, 101, 105, 110, 112, 115, 121, 4589, 13043, 13045, 13055, 13058, 13067, 13071, 13087, 13094, 13097, 59, 27316, 496, 13050, 0, 13052, 59, 27320, 111, 110, 59, 16737, 117, 229, 4606, 256, 59, 100, 4595, 13063, 105, 108, 59, 16735, 114, 99, 59, 16733, 384, 69, 97, 115, 13078, 13080, 13083, 59, 27318, 112, 59, 27322, 105, 109, 59, 25321, 111, 108, 105, 110, 116, 59, 27155, 105, 237, 4612, 59, 17473, 111, 116, 384, 59, 98, 101, 13108, 7495, 13109, 25285, 59, 27238, 896, 65, 97, 99, 109, 115, 116, 120, 13126, 13130, 13143, 13147, 13150, 13155, 13165, 114, 114, 59, 25048, 114, 256, 104, 114, 13136, 13138, 235, 8744, 256, 59, 111, 2614, 2612, 116, 32827, 167, 16551, 105, 59, 16443, 119, 97, 114, 59, 26921, 109, 256, 105, 110, 13161, 240, 110, 117, 243, 241, 116, 59, 26422, 114, 256, 59, 111, 13174, 8277, 49152, 55349, 56624, 512, 97, 99, 111, 121, 13186, 13190, 13201, 13216, 114, 112, 59, 26223, 256, 104, 121, 13195, 13199, 99, 121, 59, 17481, 59, 17480, 114, 116, 621, 13209, 0, 0, 13212, 105, 228, 5220, 97, 114, 97, 236, 11887, 32827, 173, 16557, 256, 103, 109, 13224, 13236, 109, 97, 384, 59, 102, 118, 13233, 13234, 13234, 17347, 59, 17346, 1024, 59, 100, 101, 103, 108, 110, 112, 114, 4779, 13253, 13257, 13262, 13270, 13278, 13281, 13286, 111, 116, 59, 27242, 256, 59, 113, 4785, 4784, 256, 59, 69, 13267, 13268, 27294, 59, 27296, 256, 59, 69, 13275, 13276, 27293, 59, 27295, 101, 59, 25158, 108, 117, 115, 59, 27172, 97, 114, 114, 59, 26994, 97, 114, 242, 4413, 512, 97, 101, 105, 116, 13304, 13320, 13327, 13335, 256, 108, 115, 13309, 13316, 108, 115, 101, 116, 109, 233, 13162, 104, 112, 59, 27187, 112, 97, 114, 115, 108, 59, 27108, 256, 100, 108, 5219, 13332, 101, 59, 25379, 256, 59, 101, 13340, 13341, 27306, 256, 59, 115, 13346, 13347, 27308, 59, 49152, 10924, 65024, 384, 102, 108, 112, 13358, 13363, 13378, 116, 99, 121, 59, 17484, 256, 59, 98, 13368, 13369, 16431, 256, 59, 97, 13374, 13375, 27076, 114, 59, 25407, 102, 59, 49152, 55349, 56676, 97, 256, 100, 114, 13389, 1026, 101, 115, 256, 59, 117, 13396, 13397, 26208, 105, 116, 187, 13397, 384, 99, 115, 117, 13408, 13433, 13471, 256, 97, 117, 13413, 13423, 112, 256, 59, 115, 4488, 13419, 59, 49152, 8851, 65024, 112, 256, 59, 115, 4532, 13429, 59, 49152, 8852, 65024, 117, 256, 98, 112, 13439, 13455, 384, 59, 101, 115, 4503, 4508, 13446, 101, 116, 256, 59, 101, 4503, 13453, 241, 4509, 384, 59, 101, 115, 4520, 4525, 13462, 101, 116, 256, 59, 101, 4520, 13469, 241, 4526, 384, 59, 97, 102, 4475, 13478, 1456, 114, 357, 13483, 1457, 187, 4476, 97, 114, 242, 4424, 512, 99, 101, 109, 116, 13497, 13502, 13506, 13509, 114, 59, 49152, 55349, 56520, 116, 109, 238, 241, 105, 236, 13333, 97, 114, 230, 4542, 256, 97, 114, 13518, 13525, 114, 256, 59, 102, 13524, 6079, 26118, 256, 97, 110, 13530, 13549, 105, 103, 104, 116, 256, 101, 112, 13539, 13546, 112, 115, 105, 108, 111, 238, 7904, 104, 233, 11951, 115, 187, 10322, 640, 98, 99, 109, 110, 112, 13563, 13662, 4617, 13707, 13710, 1152, 59, 69, 100, 101, 109, 110, 112, 114, 115, 13582, 13583, 13585, 13589, 13598, 13603, 13612, 13617, 13622, 25218, 59, 27333, 111, 116, 59, 27325, 256, 59, 100, 4570, 13594, 111, 116, 59, 27331, 117, 108, 116, 59, 27329, 256, 69, 101, 13608, 13610, 59, 27339, 59, 25226, 108, 117, 115, 59, 27327, 97, 114, 114, 59, 27001, 384, 101, 105, 117, 13629, 13650, 13653, 116, 384, 59, 101, 110, 13582, 13637, 13643, 113, 256, 59, 113, 4570, 13583, 101, 113, 256, 59, 113, 13611, 13608, 109, 59, 27335, 256, 98, 112, 13658, 13660, 59, 27349, 59, 27347, 99, 768, 59, 97, 99, 101, 110, 115, 4589, 13676, 13682, 13689, 13691, 13094, 112, 112, 114, 111, 248, 13050, 117, 114, 108, 121, 101, 241, 4606, 241, 4595, 384, 97, 101, 115, 13698, 13704, 13083, 112, 112, 114, 111, 248, 13082, 113, 241, 13079, 103, 59, 26218, 1664, 49, 50, 51, 59, 69, 100, 101, 104, 108, 109, 110, 112, 115, 13737, 13740, 13743, 4636, 13746, 13748, 13760, 13769, 13781, 13786, 13791, 13800, 13805, 32827, 185, 16569, 32827, 178, 16562, 32827, 179, 16563, 59, 27334, 256, 111, 115, 13753, 13756, 116, 59, 27326, 117, 98, 59, 27352, 256, 59, 100, 4642, 13765, 111, 116, 59, 27332, 115, 256, 111, 117, 13775, 13778, 108, 59, 26569, 98, 59, 27351, 97, 114, 114, 59, 27003, 117, 108, 116, 59, 27330, 256, 69, 101, 13796, 13798, 59, 27340, 59, 25227, 108, 117, 115, 59, 27328, 384, 101, 105, 117, 13812, 13833, 13836, 116, 384, 59, 101, 110, 4636, 13820, 13826, 113, 256, 59, 113, 4642, 13746, 101, 113, 256, 59, 113, 13799, 13796, 109, 59, 27336, 256, 98, 112, 13841, 13843, 59, 27348, 59, 27350, 384, 65, 97, 110, 13852, 13856, 13869, 114, 114, 59, 25049, 114, 256, 104, 114, 13862, 13864, 235, 8750, 256, 59, 111, 2603, 2601, 119, 97, 114, 59, 26922, 108, 105, 103, 32827, 223, 16607, 3041, 13905, 13917, 13920, 4814, 13939, 13945, 0, 13950, 14018, 0, 0, 0, 0, 0, 14043, 14083, 0, 14089, 14188, 0, 0, 0, 14215, 626, 13910, 0, 0, 13915, 103, 101, 116, 59, 25366, 59, 17348, 114, 235, 3679, 384, 97, 101, 121, 13926, 13931, 13936, 114, 111, 110, 59, 16741, 100, 105, 108, 59, 16739, 59, 17474, 108, 114, 101, 99, 59, 25365, 114, 59, 49152, 55349, 56625, 512, 101, 105, 107, 111, 13958, 13981, 14005, 14012, 498, 13963, 0, 13969, 101, 256, 52, 102, 4740, 4737, 97, 384, 59, 115, 118, 13976, 13977, 13979, 17336, 121, 109, 59, 17361, 256, 99, 110, 13986, 14002, 107, 256, 97, 115, 13992, 13998, 112, 112, 114, 111, 248, 4801, 105, 109, 187, 4780, 115, 240, 4766, 256, 97, 115, 14010, 13998, 240, 4801, 114, 110, 32827, 254, 16638, 492, 799, 14022, 8935, 101, 115, 33152, 215, 59, 98, 100, 14031, 14032, 14040, 16599, 256, 59, 97, 6415, 14037, 114, 59, 27185, 59, 27184, 384, 101, 112, 115, 14049, 14051, 14080, 225, 10829, 512, 59, 98, 99, 102, 1158, 14060, 14064, 14068, 111, 116, 59, 25398, 105, 114, 59, 27377, 256, 59, 111, 14073, 14076, 49152, 55349, 56677, 114, 107, 59, 27354, 225, 13154, 114, 105, 109, 101, 59, 24628, 384, 97, 105, 112, 14095, 14098, 14180, 100, 229, 4680, 896, 97, 100, 101, 109, 112, 115, 116, 14113, 14157, 14144, 14161, 14167, 14172, 14175, 110, 103, 108, 101, 640, 59, 100, 108, 113, 114, 14128, 14129, 14134, 14144, 14146, 26037, 111, 119, 110, 187, 7611, 101, 102, 116, 256, 59, 101, 10240, 14142, 241, 2350, 59, 25180, 105, 103, 104, 116, 256, 59, 101, 12970, 14155, 241, 4186, 111, 116, 59, 26092, 105, 110, 117, 115, 59, 27194, 108, 117, 115, 59, 27193, 98, 59, 27085, 105, 109, 101, 59, 27195, 101, 122, 105, 117, 109, 59, 25570, 384, 99, 104, 116, 14194, 14205, 14209, 256, 114, 121, 14199, 14203, 59, 49152, 55349, 56521, 59, 17478, 99, 121, 59, 17499, 114, 111, 107, 59, 16743, 256, 105, 111, 14219, 14222, 120, 244, 6007, 104, 101, 97, 100, 256, 108, 114, 14231, 14240, 101, 102, 116, 97, 114, 114, 111, 247, 2127, 105, 103, 104, 116, 97, 114, 114, 111, 119, 187, 3933, 2304, 65, 72, 97, 98, 99, 100, 102, 103, 104, 108, 109, 111, 112, 114, 115, 116, 117, 119, 14288, 14291, 14295, 14308, 14320, 14332, 14350, 14364, 14371, 14388, 14417, 14429, 14443, 14505, 14540, 14546, 14570, 14582, 114, 242, 1005, 97, 114, 59, 26979, 256, 99, 114, 14300, 14306, 117, 116, 101, 32827, 250, 16634, 242, 4432, 114, 483, 14314, 0, 14317, 121, 59, 17502, 118, 101, 59, 16749, 256, 105, 121, 14325, 14330, 114, 99, 32827, 251, 16635, 59, 17475, 384, 97, 98, 104, 14339, 14342, 14347, 114, 242, 5037, 108, 97, 99, 59, 16753, 97, 242, 5059, 256, 105, 114, 14355, 14360, 115, 104, 116, 59, 27006, 59, 49152, 55349, 56626, 114, 97, 118, 101, 32827, 249, 16633, 353, 14375, 14385, 114, 256, 108, 114, 14380, 14382, 187, 2391, 187, 4227, 108, 107, 59, 25984, 256, 99, 116, 14393, 14413, 623, 14399, 0, 0, 14410, 114, 110, 256, 59, 101, 14405, 14406, 25372, 114, 187, 14406, 111, 112, 59, 25359, 114, 105, 59, 26104, 256, 97, 108, 14422, 14426, 99, 114, 59, 16747, 32955, 168, 841, 256, 103, 112, 14434, 14438, 111, 110, 59, 16755, 102, 59, 49152, 55349, 56678, 768, 97, 100, 104, 108, 115, 117, 4427, 14456, 14461, 4978, 14481, 14496, 111, 119, 110, 225, 5043, 97, 114, 112, 111, 111, 110, 256, 108, 114, 14472, 14476, 101, 102, 244, 14381, 105, 103, 104, 244, 14383, 105, 384, 59, 104, 108, 14489, 14490, 14492, 17349, 187, 5114, 111, 110, 187, 14490, 112, 97, 114, 114, 111, 119, 115, 59, 25032, 384, 99, 105, 116, 14512, 14532, 14536, 623, 14518, 0, 0, 14529, 114, 110, 256, 59, 101, 14524, 14525, 25373, 114, 187, 14525, 111, 112, 59, 25358, 110, 103, 59, 16751, 114, 105, 59, 26105, 99, 114, 59, 49152, 55349, 56522, 384, 100, 105, 114, 14553, 14557, 14562, 111, 116, 59, 25328, 108, 100, 101, 59, 16745, 105, 256, 59, 102, 14128, 14568, 187, 6163, 256, 97, 109, 14575, 14578, 114, 242, 14504, 108, 32827, 252, 16636, 97, 110, 103, 108, 101, 59, 27047, 1920, 65, 66, 68, 97, 99, 100, 101, 102, 108, 110, 111, 112, 114, 115, 122, 14620, 14623, 14633, 14637, 14773, 14776, 14781, 14815, 14820, 14824, 14835, 14841, 14845, 14849, 14880, 114, 242, 1015, 97, 114, 256, 59, 118, 14630, 14631, 27368, 59, 27369, 97, 115, 232, 993, 256, 110, 114, 14642, 14647, 103, 114, 116, 59, 27036, 896, 101, 107, 110, 112, 114, 115, 116, 13539, 14662, 14667, 14674, 14685, 14692, 14742, 97, 112, 112, 225, 9237, 111, 116, 104, 105, 110, 231, 7830, 384, 104, 105, 114, 13547, 11976, 14681, 111, 112, 244, 12213, 256, 59, 104, 5047, 14690, 239, 12685, 256, 105, 117, 14697, 14701, 103, 109, 225, 13235, 256, 98, 112, 14706, 14724, 115, 101, 116, 110, 101, 113, 256, 59, 113, 14717, 14720, 49152, 8842, 65024, 59, 49152, 10955, 65024, 115, 101, 116, 110, 101, 113, 256, 59, 113, 14735, 14738, 49152, 8843, 65024, 59, 49152, 10956, 65024, 256, 104, 114, 14747, 14751, 101, 116, 225, 13980, 105, 97, 110, 103, 108, 101, 256, 108, 114, 14762, 14767, 101, 102, 116, 187, 2341, 105, 103, 104, 116, 187, 4177, 121, 59, 17458, 97, 115, 104, 187, 4150, 384, 101, 108, 114, 14788, 14802, 14807, 384, 59, 98, 101, 11754, 14795, 14799, 97, 114, 59, 25275, 113, 59, 25178, 108, 105, 112, 59, 25326, 256, 98, 116, 14812, 5224, 97, 242, 5225, 114, 59, 49152, 55349, 56627, 116, 114, 233, 14766, 115, 117, 256, 98, 112, 14831, 14833, 187, 3356, 187, 3417, 112, 102, 59, 49152, 55349, 56679, 114, 111, 240, 3835, 116, 114, 233, 14772, 256, 99, 117, 14854, 14859, 114, 59, 49152, 55349, 56523, 256, 98, 112, 14864, 14872, 110, 256, 69, 101, 14720, 14870, 187, 14718, 110, 256, 69, 101, 14738, 14878, 187, 14736, 105, 103, 122, 97, 103, 59, 27034, 896, 99, 101, 102, 111, 112, 114, 115, 14902, 14907, 14934, 14939, 14932, 14945, 14954, 105, 114, 99, 59, 16757, 256, 100, 105, 14912, 14929, 256, 98, 103, 14917, 14921, 97, 114, 59, 27231, 101, 256, 59, 113, 5626, 14927, 59, 25177, 101, 114, 112, 59, 24856, 114, 59, 49152, 55349, 56628, 112, 102, 59, 49152, 55349, 56680, 256, 59, 101, 5241, 14950, 97, 116, 232, 5241, 99, 114, 59, 49152, 55349, 56524, 2787, 6030, 14983, 0, 14987, 0, 14992, 15003, 0, 0, 15005, 15016, 15019, 15023, 0, 0, 15043, 15054, 0, 15064, 6108, 6111, 116, 114, 233, 6097, 114, 59, 49152, 55349, 56629, 256, 65, 97, 14996, 14999, 114, 242, 963, 114, 242, 2550, 59, 17342, 256, 65, 97, 15009, 15012, 114, 242, 952, 114, 242, 2539, 97, 240, 10003, 105, 115, 59, 25339, 384, 100, 112, 116, 6052, 15029, 15038, 256, 102, 108, 15034, 6057, 59, 49152, 55349, 56681, 105, 109, 229, 6066, 256, 65, 97, 15047, 15050, 114, 242, 974, 114, 242, 2561, 256, 99, 113, 15058, 6072, 114, 59, 49152, 55349, 56525, 256, 112, 116, 6102, 15068, 114, 233, 6100, 1024, 97, 99, 101, 102, 105, 111, 115, 117, 15088, 15101, 15112, 15116, 15121, 15125, 15131, 15137, 99, 256, 117, 121, 15094, 15099, 116, 101, 32827, 253, 16637, 59, 17487, 256, 105, 121, 15106, 15110, 114, 99, 59, 16759, 59, 17483, 110, 32827, 165, 16549, 114, 59, 49152, 55349, 56630, 99, 121, 59, 17495, 112, 102, 59, 49152, 55349, 56682, 99, 114, 59, 49152, 55349, 56526, 256, 99, 109, 15142, 15145, 121, 59, 17486, 108, 32827, 255, 16639, 1280, 97, 99, 100, 101, 102, 104, 105, 111, 115, 119, 15170, 15176, 15188, 15192, 15204, 15209, 15213, 15220, 15226, 15232, 99, 117, 116, 101, 59, 16762, 256, 97, 121, 15181, 15186, 114, 111, 110, 59, 16766, 59, 17463, 111, 116, 59, 16764, 256, 101, 116, 15197, 15201, 116, 114, 230, 5471, 97, 59, 17334, 114, 59, 49152, 55349, 56631, 99, 121, 59, 17462, 103, 114, 97, 114, 114, 59, 25053, 112, 102, 59, 49152, 55349, 56683, 99, 114, 59, 49152, 55349, 56527, 256, 106, 110, 15237, 15239, 59, 24589, 106, 59, 24588]);


var decodeDataHtml = /*#__PURE__*/Object.defineProperty({
	default: _default$2
}, '__esModule', {value: true});

// Generated using scripts/write-decode-map.ts
// prettier-ignore
var _default$1 = new Uint16Array([512, 97, 103, 108, 113, 9, 21, 24, 27, 621, 15, 0, 0, 18, 112, 59, 16422, 111, 115, 59, 16423, 116, 59, 16446, 116, 59, 16444, 117, 111, 116, 59, 16418]);


var decodeDataXml = /*#__PURE__*/Object.defineProperty({
	default: _default$1
}, '__esModule', {value: true});

var decode_codepoint = createCommonjsModule(function (module, exports) {
// Adapted from https://github.com/mathiasbynens/he/blob/36afe179392226cf1b6ccdb16ebbb7a5a844d93a/src/he.js#L106-L134
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceCodePoint = exports.fromCodePoint = void 0;
var decodeMap = new Map([
    [0, 65533],
    [128, 8364],
    [130, 8218],
    [131, 402],
    [132, 8222],
    [133, 8230],
    [134, 8224],
    [135, 8225],
    [136, 710],
    [137, 8240],
    [138, 352],
    [139, 8249],
    [140, 338],
    [142, 381],
    [145, 8216],
    [146, 8217],
    [147, 8220],
    [148, 8221],
    [149, 8226],
    [150, 8211],
    [151, 8212],
    [152, 732],
    [153, 8482],
    [154, 353],
    [155, 8250],
    [156, 339],
    [158, 382],
    [159, 376],
]);
exports.fromCodePoint = 
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, node/no-unsupported-features/es-builtins
(_a = String.fromCodePoint) !== null && _a !== void 0 ? _a : function (codePoint) {
    var output = "";
    if (codePoint > 0xffff) {
        codePoint -= 0x10000;
        output += String.fromCharCode(((codePoint >>> 10) & 0x3ff) | 0xd800);
        codePoint = 0xdc00 | (codePoint & 0x3ff);
    }
    output += String.fromCharCode(codePoint);
    return output;
};
function replaceCodePoint(codePoint) {
    var _a;
    if ((codePoint >= 0xd800 && codePoint <= 0xdfff) || codePoint > 0x10ffff) {
        return 0xfffd;
    }
    return (_a = decodeMap.get(codePoint)) !== null && _a !== void 0 ? _a : codePoint;
}
exports.replaceCodePoint = replaceCodePoint;
function decodeCodePoint(codePoint) {
    return (0, exports.fromCodePoint)(replaceCodePoint(codePoint));
}
exports.default = decodeCodePoint;

});

var require$$0 = decodeDataHtml;

var require$$1 = decodeDataXml;

var decode_codepoint_js_2 = decode_codepoint;

var decode = createCommonjsModule(function (module, exports) {
var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeXML = exports.decodeHTMLStrict = exports.decodeHTML = exports.determineBranch = exports.BinTrieFlags = exports.fromCodePoint = exports.replaceCodePoint = exports.decodeCodePoint = exports.xmlDecodeTree = exports.htmlDecodeTree = void 0;
var decode_data_html_js_1 = __importDefault(require$$0);
exports.htmlDecodeTree = decode_data_html_js_1.default;
var decode_data_xml_js_1 = __importDefault(require$$1);
exports.xmlDecodeTree = decode_data_xml_js_1.default;
var decode_codepoint_js_1 = __importDefault(decode_codepoint_js_2);
exports.decodeCodePoint = decode_codepoint_js_1.default;

Object.defineProperty(exports, "replaceCodePoint", { enumerable: true, get: function () { return decode_codepoint_js_2.replaceCodePoint; } });
Object.defineProperty(exports, "fromCodePoint", { enumerable: true, get: function () { return decode_codepoint_js_2.fromCodePoint; } });
var CharCodes;
(function (CharCodes) {
    CharCodes[CharCodes["NUM"] = 35] = "NUM";
    CharCodes[CharCodes["SEMI"] = 59] = "SEMI";
    CharCodes[CharCodes["ZERO"] = 48] = "ZERO";
    CharCodes[CharCodes["NINE"] = 57] = "NINE";
    CharCodes[CharCodes["LOWER_A"] = 97] = "LOWER_A";
    CharCodes[CharCodes["LOWER_F"] = 102] = "LOWER_F";
    CharCodes[CharCodes["LOWER_X"] = 120] = "LOWER_X";
    /** Bit that needs to be set to convert an upper case ASCII character to lower case */
    CharCodes[CharCodes["To_LOWER_BIT"] = 32] = "To_LOWER_BIT";
})(CharCodes || (CharCodes = {}));
var BinTrieFlags;
(function (BinTrieFlags) {
    BinTrieFlags[BinTrieFlags["VALUE_LENGTH"] = 49152] = "VALUE_LENGTH";
    BinTrieFlags[BinTrieFlags["BRANCH_LENGTH"] = 16256] = "BRANCH_LENGTH";
    BinTrieFlags[BinTrieFlags["JUMP_TABLE"] = 127] = "JUMP_TABLE";
})(BinTrieFlags = exports.BinTrieFlags || (exports.BinTrieFlags = {}));
function getDecoder(decodeTree) {
    return function decodeHTMLBinary(str, strict) {
        var ret = "";
        var lastIdx = 0;
        var strIdx = 0;
        while ((strIdx = str.indexOf("&", strIdx)) >= 0) {
            ret += str.slice(lastIdx, strIdx);
            lastIdx = strIdx;
            // Skip the "&"
            strIdx += 1;
            // If we have a numeric entity, handle this separately.
            if (str.charCodeAt(strIdx) === CharCodes.NUM) {
                // Skip the leading "&#". For hex entities, also skip the leading "x".
                var start = strIdx + 1;
                var base = 10;
                var cp = str.charCodeAt(start);
                if ((cp | CharCodes.To_LOWER_BIT) === CharCodes.LOWER_X) {
                    base = 16;
                    strIdx += 1;
                    start += 1;
                }
                do
                    cp = str.charCodeAt(++strIdx);
                while ((cp >= CharCodes.ZERO && cp <= CharCodes.NINE) ||
                    (base === 16 &&
                        (cp | CharCodes.To_LOWER_BIT) >= CharCodes.LOWER_A &&
                        (cp | CharCodes.To_LOWER_BIT) <= CharCodes.LOWER_F));
                if (start !== strIdx) {
                    var entity = str.substring(start, strIdx);
                    var parsed = parseInt(entity, base);
                    if (str.charCodeAt(strIdx) === CharCodes.SEMI) {
                        strIdx += 1;
                    }
                    else if (strict) {
                        continue;
                    }
                    ret += (0, decode_codepoint_js_1.default)(parsed);
                    lastIdx = strIdx;
                }
                continue;
            }
            var resultIdx = 0;
            var excess = 1;
            var treeIdx = 0;
            var current = decodeTree[treeIdx];
            for (; strIdx < str.length; strIdx++, excess++) {
                treeIdx = determineBranch(decodeTree, current, treeIdx + 1, str.charCodeAt(strIdx));
                if (treeIdx < 0)
                    break;
                current = decodeTree[treeIdx];
                var masked = current & BinTrieFlags.VALUE_LENGTH;
                // If the branch is a value, store it and continue
                if (masked) {
                    // If we have a legacy entity while parsing strictly, just skip the number of bytes
                    if (!strict || str.charCodeAt(strIdx) === CharCodes.SEMI) {
                        resultIdx = treeIdx;
                        excess = 0;
                    }
                    // The mask is the number of bytes of the value, including the current byte.
                    var valueLength = (masked >> 14) - 1;
                    if (valueLength === 0)
                        break;
                    treeIdx += valueLength;
                }
            }
            if (resultIdx !== 0) {
                var valueLength = (decodeTree[resultIdx] & BinTrieFlags.VALUE_LENGTH) >> 14;
                ret +=
                    valueLength === 1
                        ? String.fromCharCode(decodeTree[resultIdx] & ~BinTrieFlags.VALUE_LENGTH)
                        : valueLength === 2
                            ? String.fromCharCode(decodeTree[resultIdx + 1])
                            : String.fromCharCode(decodeTree[resultIdx + 1], decodeTree[resultIdx + 2]);
                lastIdx = strIdx - excess + 1;
            }
        }
        return ret + str.slice(lastIdx);
    };
}
function determineBranch(decodeTree, current, nodeIdx, char) {
    var branchCount = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
    var jumpOffset = current & BinTrieFlags.JUMP_TABLE;
    // Case 1: Single branch encoded in jump offset
    if (branchCount === 0) {
        return jumpOffset !== 0 && char === jumpOffset ? nodeIdx : -1;
    }
    // Case 2: Multiple branches encoded in jump table
    if (jumpOffset) {
        var value = char - jumpOffset;
        return value < 0 || value >= branchCount
            ? -1
            : decodeTree[nodeIdx + value] - 1;
    }
    // Case 3: Multiple branches encoded in dictionary
    // Binary search for the character.
    var lo = nodeIdx;
    var hi = lo + branchCount - 1;
    while (lo <= hi) {
        var mid = (lo + hi) >>> 1;
        var midVal = decodeTree[mid];
        if (midVal < char) {
            lo = mid + 1;
        }
        else if (midVal > char) {
            hi = mid - 1;
        }
        else {
            return decodeTree[mid + branchCount];
        }
    }
    return -1;
}
exports.determineBranch = determineBranch;
var htmlDecoder = getDecoder(decode_data_html_js_1.default);
var xmlDecoder = getDecoder(decode_data_xml_js_1.default);
/**
 * Decodes an HTML string, allowing for entities not terminated by a semi-colon.
 *
 * @param str The string to decode.
 * @returns The decoded string.
 */
function decodeHTML(str) {
    return htmlDecoder(str, false);
}
exports.decodeHTML = decodeHTML;
/**
 * Decodes an HTML string, requiring all entities to be terminated by a semi-colon.
 *
 * @param str The string to decode.
 * @returns The decoded string.
 */
function decodeHTMLStrict(str) {
    return htmlDecoder(str, true);
}
exports.decodeHTMLStrict = decodeHTMLStrict;
/**
 * Decodes an XML string, requiring all entities to be terminated by a semi-colon.
 *
 * @param str The string to decode.
 * @returns The decoded string.
 */
function decodeXML(str) {
    return xmlDecoder(str, true);
}
exports.decodeXML = decodeXML;

});

var html = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasUnescapedText = exports.isNumberedHeader = exports.SPECIAL_ELEMENTS = exports.getTagID = exports.TAG_ID = exports.TAG_NAMES = exports.DOCUMENT_MODE = exports.ATTRS = exports.NS = void 0;
/** All valid namespaces in HTML. */
var NS;
(function (NS) {
    NS["HTML"] = "http://www.w3.org/1999/xhtml";
    NS["MATHML"] = "http://www.w3.org/1998/Math/MathML";
    NS["SVG"] = "http://www.w3.org/2000/svg";
    NS["XLINK"] = "http://www.w3.org/1999/xlink";
    NS["XML"] = "http://www.w3.org/XML/1998/namespace";
    NS["XMLNS"] = "http://www.w3.org/2000/xmlns/";
})(NS = exports.NS || (exports.NS = {}));
(function (ATTRS) {
    ATTRS["TYPE"] = "type";
    ATTRS["ACTION"] = "action";
    ATTRS["ENCODING"] = "encoding";
    ATTRS["PROMPT"] = "prompt";
    ATTRS["NAME"] = "name";
    ATTRS["COLOR"] = "color";
    ATTRS["FACE"] = "face";
    ATTRS["SIZE"] = "size";
})(exports.ATTRS || (exports.ATTRS = {}));
(function (DOCUMENT_MODE) {
    DOCUMENT_MODE["NO_QUIRKS"] = "no-quirks";
    DOCUMENT_MODE["QUIRKS"] = "quirks";
    DOCUMENT_MODE["LIMITED_QUIRKS"] = "limited-quirks";
})(exports.DOCUMENT_MODE || (exports.DOCUMENT_MODE = {}));
var TAG_NAMES;
(function (TAG_NAMES) {
    TAG_NAMES["A"] = "a";
    TAG_NAMES["ADDRESS"] = "address";
    TAG_NAMES["ANNOTATION_XML"] = "annotation-xml";
    TAG_NAMES["APPLET"] = "applet";
    TAG_NAMES["AREA"] = "area";
    TAG_NAMES["ARTICLE"] = "article";
    TAG_NAMES["ASIDE"] = "aside";
    TAG_NAMES["B"] = "b";
    TAG_NAMES["BASE"] = "base";
    TAG_NAMES["BASEFONT"] = "basefont";
    TAG_NAMES["BGSOUND"] = "bgsound";
    TAG_NAMES["BIG"] = "big";
    TAG_NAMES["BLOCKQUOTE"] = "blockquote";
    TAG_NAMES["BODY"] = "body";
    TAG_NAMES["BR"] = "br";
    TAG_NAMES["BUTTON"] = "button";
    TAG_NAMES["CAPTION"] = "caption";
    TAG_NAMES["CENTER"] = "center";
    TAG_NAMES["CODE"] = "code";
    TAG_NAMES["COL"] = "col";
    TAG_NAMES["COLGROUP"] = "colgroup";
    TAG_NAMES["DD"] = "dd";
    TAG_NAMES["DESC"] = "desc";
    TAG_NAMES["DETAILS"] = "details";
    TAG_NAMES["DIALOG"] = "dialog";
    TAG_NAMES["DIR"] = "dir";
    TAG_NAMES["DIV"] = "div";
    TAG_NAMES["DL"] = "dl";
    TAG_NAMES["DT"] = "dt";
    TAG_NAMES["EM"] = "em";
    TAG_NAMES["EMBED"] = "embed";
    TAG_NAMES["FIELDSET"] = "fieldset";
    TAG_NAMES["FIGCAPTION"] = "figcaption";
    TAG_NAMES["FIGURE"] = "figure";
    TAG_NAMES["FONT"] = "font";
    TAG_NAMES["FOOTER"] = "footer";
    TAG_NAMES["FOREIGN_OBJECT"] = "foreignObject";
    TAG_NAMES["FORM"] = "form";
    TAG_NAMES["FRAME"] = "frame";
    TAG_NAMES["FRAMESET"] = "frameset";
    TAG_NAMES["H1"] = "h1";
    TAG_NAMES["H2"] = "h2";
    TAG_NAMES["H3"] = "h3";
    TAG_NAMES["H4"] = "h4";
    TAG_NAMES["H5"] = "h5";
    TAG_NAMES["H6"] = "h6";
    TAG_NAMES["HEAD"] = "head";
    TAG_NAMES["HEADER"] = "header";
    TAG_NAMES["HGROUP"] = "hgroup";
    TAG_NAMES["HR"] = "hr";
    TAG_NAMES["HTML"] = "html";
    TAG_NAMES["I"] = "i";
    TAG_NAMES["IMG"] = "img";
    TAG_NAMES["IMAGE"] = "image";
    TAG_NAMES["INPUT"] = "input";
    TAG_NAMES["IFRAME"] = "iframe";
    TAG_NAMES["KEYGEN"] = "keygen";
    TAG_NAMES["LABEL"] = "label";
    TAG_NAMES["LI"] = "li";
    TAG_NAMES["LINK"] = "link";
    TAG_NAMES["LISTING"] = "listing";
    TAG_NAMES["MAIN"] = "main";
    TAG_NAMES["MALIGNMARK"] = "malignmark";
    TAG_NAMES["MARQUEE"] = "marquee";
    TAG_NAMES["MATH"] = "math";
    TAG_NAMES["MENU"] = "menu";
    TAG_NAMES["META"] = "meta";
    TAG_NAMES["MGLYPH"] = "mglyph";
    TAG_NAMES["MI"] = "mi";
    TAG_NAMES["MO"] = "mo";
    TAG_NAMES["MN"] = "mn";
    TAG_NAMES["MS"] = "ms";
    TAG_NAMES["MTEXT"] = "mtext";
    TAG_NAMES["NAV"] = "nav";
    TAG_NAMES["NOBR"] = "nobr";
    TAG_NAMES["NOFRAMES"] = "noframes";
    TAG_NAMES["NOEMBED"] = "noembed";
    TAG_NAMES["NOSCRIPT"] = "noscript";
    TAG_NAMES["OBJECT"] = "object";
    TAG_NAMES["OL"] = "ol";
    TAG_NAMES["OPTGROUP"] = "optgroup";
    TAG_NAMES["OPTION"] = "option";
    TAG_NAMES["P"] = "p";
    TAG_NAMES["PARAM"] = "param";
    TAG_NAMES["PLAINTEXT"] = "plaintext";
    TAG_NAMES["PRE"] = "pre";
    TAG_NAMES["RB"] = "rb";
    TAG_NAMES["RP"] = "rp";
    TAG_NAMES["RT"] = "rt";
    TAG_NAMES["RTC"] = "rtc";
    TAG_NAMES["RUBY"] = "ruby";
    TAG_NAMES["S"] = "s";
    TAG_NAMES["SCRIPT"] = "script";
    TAG_NAMES["SECTION"] = "section";
    TAG_NAMES["SELECT"] = "select";
    TAG_NAMES["SOURCE"] = "source";
    TAG_NAMES["SMALL"] = "small";
    TAG_NAMES["SPAN"] = "span";
    TAG_NAMES["STRIKE"] = "strike";
    TAG_NAMES["STRONG"] = "strong";
    TAG_NAMES["STYLE"] = "style";
    TAG_NAMES["SUB"] = "sub";
    TAG_NAMES["SUMMARY"] = "summary";
    TAG_NAMES["SUP"] = "sup";
    TAG_NAMES["TABLE"] = "table";
    TAG_NAMES["TBODY"] = "tbody";
    TAG_NAMES["TEMPLATE"] = "template";
    TAG_NAMES["TEXTAREA"] = "textarea";
    TAG_NAMES["TFOOT"] = "tfoot";
    TAG_NAMES["TD"] = "td";
    TAG_NAMES["TH"] = "th";
    TAG_NAMES["THEAD"] = "thead";
    TAG_NAMES["TITLE"] = "title";
    TAG_NAMES["TR"] = "tr";
    TAG_NAMES["TRACK"] = "track";
    TAG_NAMES["TT"] = "tt";
    TAG_NAMES["U"] = "u";
    TAG_NAMES["UL"] = "ul";
    TAG_NAMES["SVG"] = "svg";
    TAG_NAMES["VAR"] = "var";
    TAG_NAMES["WBR"] = "wbr";
    TAG_NAMES["XMP"] = "xmp";
})(TAG_NAMES = exports.TAG_NAMES || (exports.TAG_NAMES = {}));
/**
 * Tag IDs are numeric IDs for known tag names.
 *
 * We use tag IDs to improve the performance of tag name comparisons.
 */
var TAG_ID;
(function (TAG_ID) {
    TAG_ID[TAG_ID["UNKNOWN"] = 0] = "UNKNOWN";
    TAG_ID[TAG_ID["A"] = 1] = "A";
    TAG_ID[TAG_ID["ADDRESS"] = 2] = "ADDRESS";
    TAG_ID[TAG_ID["ANNOTATION_XML"] = 3] = "ANNOTATION_XML";
    TAG_ID[TAG_ID["APPLET"] = 4] = "APPLET";
    TAG_ID[TAG_ID["AREA"] = 5] = "AREA";
    TAG_ID[TAG_ID["ARTICLE"] = 6] = "ARTICLE";
    TAG_ID[TAG_ID["ASIDE"] = 7] = "ASIDE";
    TAG_ID[TAG_ID["B"] = 8] = "B";
    TAG_ID[TAG_ID["BASE"] = 9] = "BASE";
    TAG_ID[TAG_ID["BASEFONT"] = 10] = "BASEFONT";
    TAG_ID[TAG_ID["BGSOUND"] = 11] = "BGSOUND";
    TAG_ID[TAG_ID["BIG"] = 12] = "BIG";
    TAG_ID[TAG_ID["BLOCKQUOTE"] = 13] = "BLOCKQUOTE";
    TAG_ID[TAG_ID["BODY"] = 14] = "BODY";
    TAG_ID[TAG_ID["BR"] = 15] = "BR";
    TAG_ID[TAG_ID["BUTTON"] = 16] = "BUTTON";
    TAG_ID[TAG_ID["CAPTION"] = 17] = "CAPTION";
    TAG_ID[TAG_ID["CENTER"] = 18] = "CENTER";
    TAG_ID[TAG_ID["CODE"] = 19] = "CODE";
    TAG_ID[TAG_ID["COL"] = 20] = "COL";
    TAG_ID[TAG_ID["COLGROUP"] = 21] = "COLGROUP";
    TAG_ID[TAG_ID["DD"] = 22] = "DD";
    TAG_ID[TAG_ID["DESC"] = 23] = "DESC";
    TAG_ID[TAG_ID["DETAILS"] = 24] = "DETAILS";
    TAG_ID[TAG_ID["DIALOG"] = 25] = "DIALOG";
    TAG_ID[TAG_ID["DIR"] = 26] = "DIR";
    TAG_ID[TAG_ID["DIV"] = 27] = "DIV";
    TAG_ID[TAG_ID["DL"] = 28] = "DL";
    TAG_ID[TAG_ID["DT"] = 29] = "DT";
    TAG_ID[TAG_ID["EM"] = 30] = "EM";
    TAG_ID[TAG_ID["EMBED"] = 31] = "EMBED";
    TAG_ID[TAG_ID["FIELDSET"] = 32] = "FIELDSET";
    TAG_ID[TAG_ID["FIGCAPTION"] = 33] = "FIGCAPTION";
    TAG_ID[TAG_ID["FIGURE"] = 34] = "FIGURE";
    TAG_ID[TAG_ID["FONT"] = 35] = "FONT";
    TAG_ID[TAG_ID["FOOTER"] = 36] = "FOOTER";
    TAG_ID[TAG_ID["FOREIGN_OBJECT"] = 37] = "FOREIGN_OBJECT";
    TAG_ID[TAG_ID["FORM"] = 38] = "FORM";
    TAG_ID[TAG_ID["FRAME"] = 39] = "FRAME";
    TAG_ID[TAG_ID["FRAMESET"] = 40] = "FRAMESET";
    TAG_ID[TAG_ID["H1"] = 41] = "H1";
    TAG_ID[TAG_ID["H2"] = 42] = "H2";
    TAG_ID[TAG_ID["H3"] = 43] = "H3";
    TAG_ID[TAG_ID["H4"] = 44] = "H4";
    TAG_ID[TAG_ID["H5"] = 45] = "H5";
    TAG_ID[TAG_ID["H6"] = 46] = "H6";
    TAG_ID[TAG_ID["HEAD"] = 47] = "HEAD";
    TAG_ID[TAG_ID["HEADER"] = 48] = "HEADER";
    TAG_ID[TAG_ID["HGROUP"] = 49] = "HGROUP";
    TAG_ID[TAG_ID["HR"] = 50] = "HR";
    TAG_ID[TAG_ID["HTML"] = 51] = "HTML";
    TAG_ID[TAG_ID["I"] = 52] = "I";
    TAG_ID[TAG_ID["IMG"] = 53] = "IMG";
    TAG_ID[TAG_ID["IMAGE"] = 54] = "IMAGE";
    TAG_ID[TAG_ID["INPUT"] = 55] = "INPUT";
    TAG_ID[TAG_ID["IFRAME"] = 56] = "IFRAME";
    TAG_ID[TAG_ID["KEYGEN"] = 57] = "KEYGEN";
    TAG_ID[TAG_ID["LABEL"] = 58] = "LABEL";
    TAG_ID[TAG_ID["LI"] = 59] = "LI";
    TAG_ID[TAG_ID["LINK"] = 60] = "LINK";
    TAG_ID[TAG_ID["LISTING"] = 61] = "LISTING";
    TAG_ID[TAG_ID["MAIN"] = 62] = "MAIN";
    TAG_ID[TAG_ID["MALIGNMARK"] = 63] = "MALIGNMARK";
    TAG_ID[TAG_ID["MARQUEE"] = 64] = "MARQUEE";
    TAG_ID[TAG_ID["MATH"] = 65] = "MATH";
    TAG_ID[TAG_ID["MENU"] = 66] = "MENU";
    TAG_ID[TAG_ID["META"] = 67] = "META";
    TAG_ID[TAG_ID["MGLYPH"] = 68] = "MGLYPH";
    TAG_ID[TAG_ID["MI"] = 69] = "MI";
    TAG_ID[TAG_ID["MO"] = 70] = "MO";
    TAG_ID[TAG_ID["MN"] = 71] = "MN";
    TAG_ID[TAG_ID["MS"] = 72] = "MS";
    TAG_ID[TAG_ID["MTEXT"] = 73] = "MTEXT";
    TAG_ID[TAG_ID["NAV"] = 74] = "NAV";
    TAG_ID[TAG_ID["NOBR"] = 75] = "NOBR";
    TAG_ID[TAG_ID["NOFRAMES"] = 76] = "NOFRAMES";
    TAG_ID[TAG_ID["NOEMBED"] = 77] = "NOEMBED";
    TAG_ID[TAG_ID["NOSCRIPT"] = 78] = "NOSCRIPT";
    TAG_ID[TAG_ID["OBJECT"] = 79] = "OBJECT";
    TAG_ID[TAG_ID["OL"] = 80] = "OL";
    TAG_ID[TAG_ID["OPTGROUP"] = 81] = "OPTGROUP";
    TAG_ID[TAG_ID["OPTION"] = 82] = "OPTION";
    TAG_ID[TAG_ID["P"] = 83] = "P";
    TAG_ID[TAG_ID["PARAM"] = 84] = "PARAM";
    TAG_ID[TAG_ID["PLAINTEXT"] = 85] = "PLAINTEXT";
    TAG_ID[TAG_ID["PRE"] = 86] = "PRE";
    TAG_ID[TAG_ID["RB"] = 87] = "RB";
    TAG_ID[TAG_ID["RP"] = 88] = "RP";
    TAG_ID[TAG_ID["RT"] = 89] = "RT";
    TAG_ID[TAG_ID["RTC"] = 90] = "RTC";
    TAG_ID[TAG_ID["RUBY"] = 91] = "RUBY";
    TAG_ID[TAG_ID["S"] = 92] = "S";
    TAG_ID[TAG_ID["SCRIPT"] = 93] = "SCRIPT";
    TAG_ID[TAG_ID["SECTION"] = 94] = "SECTION";
    TAG_ID[TAG_ID["SELECT"] = 95] = "SELECT";
    TAG_ID[TAG_ID["SOURCE"] = 96] = "SOURCE";
    TAG_ID[TAG_ID["SMALL"] = 97] = "SMALL";
    TAG_ID[TAG_ID["SPAN"] = 98] = "SPAN";
    TAG_ID[TAG_ID["STRIKE"] = 99] = "STRIKE";
    TAG_ID[TAG_ID["STRONG"] = 100] = "STRONG";
    TAG_ID[TAG_ID["STYLE"] = 101] = "STYLE";
    TAG_ID[TAG_ID["SUB"] = 102] = "SUB";
    TAG_ID[TAG_ID["SUMMARY"] = 103] = "SUMMARY";
    TAG_ID[TAG_ID["SUP"] = 104] = "SUP";
    TAG_ID[TAG_ID["TABLE"] = 105] = "TABLE";
    TAG_ID[TAG_ID["TBODY"] = 106] = "TBODY";
    TAG_ID[TAG_ID["TEMPLATE"] = 107] = "TEMPLATE";
    TAG_ID[TAG_ID["TEXTAREA"] = 108] = "TEXTAREA";
    TAG_ID[TAG_ID["TFOOT"] = 109] = "TFOOT";
    TAG_ID[TAG_ID["TD"] = 110] = "TD";
    TAG_ID[TAG_ID["TH"] = 111] = "TH";
    TAG_ID[TAG_ID["THEAD"] = 112] = "THEAD";
    TAG_ID[TAG_ID["TITLE"] = 113] = "TITLE";
    TAG_ID[TAG_ID["TR"] = 114] = "TR";
    TAG_ID[TAG_ID["TRACK"] = 115] = "TRACK";
    TAG_ID[TAG_ID["TT"] = 116] = "TT";
    TAG_ID[TAG_ID["U"] = 117] = "U";
    TAG_ID[TAG_ID["UL"] = 118] = "UL";
    TAG_ID[TAG_ID["SVG"] = 119] = "SVG";
    TAG_ID[TAG_ID["VAR"] = 120] = "VAR";
    TAG_ID[TAG_ID["WBR"] = 121] = "WBR";
    TAG_ID[TAG_ID["XMP"] = 122] = "XMP";
})(TAG_ID = exports.TAG_ID || (exports.TAG_ID = {}));
const TAG_NAME_TO_ID = new Map([
    [TAG_NAMES.A, TAG_ID.A],
    [TAG_NAMES.ADDRESS, TAG_ID.ADDRESS],
    [TAG_NAMES.ANNOTATION_XML, TAG_ID.ANNOTATION_XML],
    [TAG_NAMES.APPLET, TAG_ID.APPLET],
    [TAG_NAMES.AREA, TAG_ID.AREA],
    [TAG_NAMES.ARTICLE, TAG_ID.ARTICLE],
    [TAG_NAMES.ASIDE, TAG_ID.ASIDE],
    [TAG_NAMES.B, TAG_ID.B],
    [TAG_NAMES.BASE, TAG_ID.BASE],
    [TAG_NAMES.BASEFONT, TAG_ID.BASEFONT],
    [TAG_NAMES.BGSOUND, TAG_ID.BGSOUND],
    [TAG_NAMES.BIG, TAG_ID.BIG],
    [TAG_NAMES.BLOCKQUOTE, TAG_ID.BLOCKQUOTE],
    [TAG_NAMES.BODY, TAG_ID.BODY],
    [TAG_NAMES.BR, TAG_ID.BR],
    [TAG_NAMES.BUTTON, TAG_ID.BUTTON],
    [TAG_NAMES.CAPTION, TAG_ID.CAPTION],
    [TAG_NAMES.CENTER, TAG_ID.CENTER],
    [TAG_NAMES.CODE, TAG_ID.CODE],
    [TAG_NAMES.COL, TAG_ID.COL],
    [TAG_NAMES.COLGROUP, TAG_ID.COLGROUP],
    [TAG_NAMES.DD, TAG_ID.DD],
    [TAG_NAMES.DESC, TAG_ID.DESC],
    [TAG_NAMES.DETAILS, TAG_ID.DETAILS],
    [TAG_NAMES.DIALOG, TAG_ID.DIALOG],
    [TAG_NAMES.DIR, TAG_ID.DIR],
    [TAG_NAMES.DIV, TAG_ID.DIV],
    [TAG_NAMES.DL, TAG_ID.DL],
    [TAG_NAMES.DT, TAG_ID.DT],
    [TAG_NAMES.EM, TAG_ID.EM],
    [TAG_NAMES.EMBED, TAG_ID.EMBED],
    [TAG_NAMES.FIELDSET, TAG_ID.FIELDSET],
    [TAG_NAMES.FIGCAPTION, TAG_ID.FIGCAPTION],
    [TAG_NAMES.FIGURE, TAG_ID.FIGURE],
    [TAG_NAMES.FONT, TAG_ID.FONT],
    [TAG_NAMES.FOOTER, TAG_ID.FOOTER],
    [TAG_NAMES.FOREIGN_OBJECT, TAG_ID.FOREIGN_OBJECT],
    [TAG_NAMES.FORM, TAG_ID.FORM],
    [TAG_NAMES.FRAME, TAG_ID.FRAME],
    [TAG_NAMES.FRAMESET, TAG_ID.FRAMESET],
    [TAG_NAMES.H1, TAG_ID.H1],
    [TAG_NAMES.H2, TAG_ID.H2],
    [TAG_NAMES.H3, TAG_ID.H3],
    [TAG_NAMES.H4, TAG_ID.H4],
    [TAG_NAMES.H5, TAG_ID.H5],
    [TAG_NAMES.H6, TAG_ID.H6],
    [TAG_NAMES.HEAD, TAG_ID.HEAD],
    [TAG_NAMES.HEADER, TAG_ID.HEADER],
    [TAG_NAMES.HGROUP, TAG_ID.HGROUP],
    [TAG_NAMES.HR, TAG_ID.HR],
    [TAG_NAMES.HTML, TAG_ID.HTML],
    [TAG_NAMES.I, TAG_ID.I],
    [TAG_NAMES.IMG, TAG_ID.IMG],
    [TAG_NAMES.IMAGE, TAG_ID.IMAGE],
    [TAG_NAMES.INPUT, TAG_ID.INPUT],
    [TAG_NAMES.IFRAME, TAG_ID.IFRAME],
    [TAG_NAMES.KEYGEN, TAG_ID.KEYGEN],
    [TAG_NAMES.LABEL, TAG_ID.LABEL],
    [TAG_NAMES.LI, TAG_ID.LI],
    [TAG_NAMES.LINK, TAG_ID.LINK],
    [TAG_NAMES.LISTING, TAG_ID.LISTING],
    [TAG_NAMES.MAIN, TAG_ID.MAIN],
    [TAG_NAMES.MALIGNMARK, TAG_ID.MALIGNMARK],
    [TAG_NAMES.MARQUEE, TAG_ID.MARQUEE],
    [TAG_NAMES.MATH, TAG_ID.MATH],
    [TAG_NAMES.MENU, TAG_ID.MENU],
    [TAG_NAMES.META, TAG_ID.META],
    [TAG_NAMES.MGLYPH, TAG_ID.MGLYPH],
    [TAG_NAMES.MI, TAG_ID.MI],
    [TAG_NAMES.MO, TAG_ID.MO],
    [TAG_NAMES.MN, TAG_ID.MN],
    [TAG_NAMES.MS, TAG_ID.MS],
    [TAG_NAMES.MTEXT, TAG_ID.MTEXT],
    [TAG_NAMES.NAV, TAG_ID.NAV],
    [TAG_NAMES.NOBR, TAG_ID.NOBR],
    [TAG_NAMES.NOFRAMES, TAG_ID.NOFRAMES],
    [TAG_NAMES.NOEMBED, TAG_ID.NOEMBED],
    [TAG_NAMES.NOSCRIPT, TAG_ID.NOSCRIPT],
    [TAG_NAMES.OBJECT, TAG_ID.OBJECT],
    [TAG_NAMES.OL, TAG_ID.OL],
    [TAG_NAMES.OPTGROUP, TAG_ID.OPTGROUP],
    [TAG_NAMES.OPTION, TAG_ID.OPTION],
    [TAG_NAMES.P, TAG_ID.P],
    [TAG_NAMES.PARAM, TAG_ID.PARAM],
    [TAG_NAMES.PLAINTEXT, TAG_ID.PLAINTEXT],
    [TAG_NAMES.PRE, TAG_ID.PRE],
    [TAG_NAMES.RB, TAG_ID.RB],
    [TAG_NAMES.RP, TAG_ID.RP],
    [TAG_NAMES.RT, TAG_ID.RT],
    [TAG_NAMES.RTC, TAG_ID.RTC],
    [TAG_NAMES.RUBY, TAG_ID.RUBY],
    [TAG_NAMES.S, TAG_ID.S],
    [TAG_NAMES.SCRIPT, TAG_ID.SCRIPT],
    [TAG_NAMES.SECTION, TAG_ID.SECTION],
    [TAG_NAMES.SELECT, TAG_ID.SELECT],
    [TAG_NAMES.SOURCE, TAG_ID.SOURCE],
    [TAG_NAMES.SMALL, TAG_ID.SMALL],
    [TAG_NAMES.SPAN, TAG_ID.SPAN],
    [TAG_NAMES.STRIKE, TAG_ID.STRIKE],
    [TAG_NAMES.STRONG, TAG_ID.STRONG],
    [TAG_NAMES.STYLE, TAG_ID.STYLE],
    [TAG_NAMES.SUB, TAG_ID.SUB],
    [TAG_NAMES.SUMMARY, TAG_ID.SUMMARY],
    [TAG_NAMES.SUP, TAG_ID.SUP],
    [TAG_NAMES.TABLE, TAG_ID.TABLE],
    [TAG_NAMES.TBODY, TAG_ID.TBODY],
    [TAG_NAMES.TEMPLATE, TAG_ID.TEMPLATE],
    [TAG_NAMES.TEXTAREA, TAG_ID.TEXTAREA],
    [TAG_NAMES.TFOOT, TAG_ID.TFOOT],
    [TAG_NAMES.TD, TAG_ID.TD],
    [TAG_NAMES.TH, TAG_ID.TH],
    [TAG_NAMES.THEAD, TAG_ID.THEAD],
    [TAG_NAMES.TITLE, TAG_ID.TITLE],
    [TAG_NAMES.TR, TAG_ID.TR],
    [TAG_NAMES.TRACK, TAG_ID.TRACK],
    [TAG_NAMES.TT, TAG_ID.TT],
    [TAG_NAMES.U, TAG_ID.U],
    [TAG_NAMES.UL, TAG_ID.UL],
    [TAG_NAMES.SVG, TAG_ID.SVG],
    [TAG_NAMES.VAR, TAG_ID.VAR],
    [TAG_NAMES.WBR, TAG_ID.WBR],
    [TAG_NAMES.XMP, TAG_ID.XMP],
]);
function getTagID(tagName) {
    var _a;
    return (_a = TAG_NAME_TO_ID.get(tagName)) !== null && _a !== void 0 ? _a : TAG_ID.UNKNOWN;
}
exports.getTagID = getTagID;
const $ = TAG_ID;
exports.SPECIAL_ELEMENTS = {
    [NS.HTML]: new Set([
        $.ADDRESS,
        $.APPLET,
        $.AREA,
        $.ARTICLE,
        $.ASIDE,
        $.BASE,
        $.BASEFONT,
        $.BGSOUND,
        $.BLOCKQUOTE,
        $.BODY,
        $.BR,
        $.BUTTON,
        $.CAPTION,
        $.CENTER,
        $.COL,
        $.COLGROUP,
        $.DD,
        $.DETAILS,
        $.DIR,
        $.DIV,
        $.DL,
        $.DT,
        $.EMBED,
        $.FIELDSET,
        $.FIGCAPTION,
        $.FIGURE,
        $.FOOTER,
        $.FORM,
        $.FRAME,
        $.FRAMESET,
        $.H1,
        $.H2,
        $.H3,
        $.H4,
        $.H5,
        $.H6,
        $.HEAD,
        $.HEADER,
        $.HGROUP,
        $.HR,
        $.HTML,
        $.IFRAME,
        $.IMG,
        $.INPUT,
        $.LI,
        $.LINK,
        $.LISTING,
        $.MAIN,
        $.MARQUEE,
        $.MENU,
        $.META,
        $.NAV,
        $.NOEMBED,
        $.NOFRAMES,
        $.NOSCRIPT,
        $.OBJECT,
        $.OL,
        $.P,
        $.PARAM,
        $.PLAINTEXT,
        $.PRE,
        $.SCRIPT,
        $.SECTION,
        $.SELECT,
        $.SOURCE,
        $.STYLE,
        $.SUMMARY,
        $.TABLE,
        $.TBODY,
        $.TD,
        $.TEMPLATE,
        $.TEXTAREA,
        $.TFOOT,
        $.TH,
        $.THEAD,
        $.TITLE,
        $.TR,
        $.TRACK,
        $.UL,
        $.WBR,
        $.XMP,
    ]),
    [NS.MATHML]: new Set([$.MI, $.MO, $.MN, $.MS, $.MTEXT, $.ANNOTATION_XML]),
    [NS.SVG]: new Set([$.TITLE, $.FOREIGN_OBJECT, $.DESC]),
    [NS.XLINK]: new Set(),
    [NS.XML]: new Set(),
    [NS.XMLNS]: new Set(),
};
function isNumberedHeader(tn) {
    return tn === $.H1 || tn === $.H2 || tn === $.H3 || tn === $.H4 || tn === $.H5 || tn === $.H6;
}
exports.isNumberedHeader = isNumberedHeader;
const UNESCAPED_TEXT = new Set([
    TAG_NAMES.STYLE,
    TAG_NAMES.SCRIPT,
    TAG_NAMES.XMP,
    TAG_NAMES.IFRAME,
    TAG_NAMES.NOEMBED,
    TAG_NAMES.NOFRAMES,
    TAG_NAMES.PLAINTEXT,
]);
function hasUnescapedText(tn, scriptingEnabled) {
    return UNESCAPED_TEXT.has(tn) || (scriptingEnabled && tn === TAG_NAMES.NOSCRIPT);
}
exports.hasUnescapedText = hasUnescapedText;

});

var decode_js_1 = decode;

var tokenizer = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tokenizer = exports.TokenizerMode = void 0;






//C1 Unicode control character reference replacements
const C1_CONTROLS_REFERENCE_REPLACEMENTS = new Map([
    [0x80, 8364],
    [0x82, 8218],
    [0x83, 402],
    [0x84, 8222],
    [0x85, 8230],
    [0x86, 8224],
    [0x87, 8225],
    [0x88, 710],
    [0x89, 8240],
    [0x8a, 352],
    [0x8b, 8249],
    [0x8c, 338],
    [0x8e, 381],
    [0x91, 8216],
    [0x92, 8217],
    [0x93, 8220],
    [0x94, 8221],
    [0x95, 8226],
    [0x96, 8211],
    [0x97, 8212],
    [0x98, 732],
    [0x99, 8482],
    [0x9a, 353],
    [0x9b, 8250],
    [0x9c, 339],
    [0x9e, 382],
    [0x9f, 376],
]);
//Tokenizer initial states for different modes
exports.TokenizerMode = {
    DATA: 0 /* State.DATA */,
    RCDATA: 1 /* State.RCDATA */,
    RAWTEXT: 2 /* State.RAWTEXT */,
    SCRIPT_DATA: 3 /* State.SCRIPT_DATA */,
    PLAINTEXT: 4 /* State.PLAINTEXT */,
    CDATA_SECTION: 68 /* State.CDATA_SECTION */,
};
//Utils
//OPTIMIZATION: these utility functions should not be moved out of this module. V8 Crankshaft will not inline
//this functions if they will be situated in another module due to context switch.
//Always perform inlining check before modifying this functions ('node --trace-inlining').
function isAsciiDigit(cp) {
    return cp >= unicode.CODE_POINTS.DIGIT_0 && cp <= unicode.CODE_POINTS.DIGIT_9;
}
function isAsciiUpper(cp) {
    return cp >= unicode.CODE_POINTS.LATIN_CAPITAL_A && cp <= unicode.CODE_POINTS.LATIN_CAPITAL_Z;
}
function isAsciiLower(cp) {
    return cp >= unicode.CODE_POINTS.LATIN_SMALL_A && cp <= unicode.CODE_POINTS.LATIN_SMALL_Z;
}
function isAsciiLetter(cp) {
    return isAsciiLower(cp) || isAsciiUpper(cp);
}
function isAsciiAlphaNumeric(cp) {
    return isAsciiLetter(cp) || isAsciiDigit(cp);
}
function isAsciiUpperHexDigit(cp) {
    return cp >= unicode.CODE_POINTS.LATIN_CAPITAL_A && cp <= unicode.CODE_POINTS.LATIN_CAPITAL_F;
}
function isAsciiLowerHexDigit(cp) {
    return cp >= unicode.CODE_POINTS.LATIN_SMALL_A && cp <= unicode.CODE_POINTS.LATIN_SMALL_F;
}
function isAsciiHexDigit(cp) {
    return isAsciiDigit(cp) || isAsciiUpperHexDigit(cp) || isAsciiLowerHexDigit(cp);
}
function toAsciiLower(cp) {
    return cp + 32;
}
function isWhitespace(cp) {
    return cp === unicode.CODE_POINTS.SPACE || cp === unicode.CODE_POINTS.LINE_FEED || cp === unicode.CODE_POINTS.TABULATION || cp === unicode.CODE_POINTS.FORM_FEED;
}
function isEntityInAttributeInvalidEnd(nextCp) {
    return nextCp === unicode.CODE_POINTS.EQUALS_SIGN || isAsciiAlphaNumeric(nextCp);
}
function isScriptDataDoubleEscapeSequenceEnd(cp) {
    return isWhitespace(cp) || cp === unicode.CODE_POINTS.SOLIDUS || cp === unicode.CODE_POINTS.GREATER_THAN_SIGN;
}
//Tokenizer
class Tokenizer {
    constructor(options, handler) {
        this.options = options;
        this.handler = handler;
        this.paused = false;
        /** Ensures that the parsing loop isn't run multiple times at once. */
        this.inLoop = false;
        /**
         * Indicates that the current adjusted node exists, is not an element in the HTML namespace,
         * and that it is not an integration point for either MathML or HTML.
         *
         * @see {@link https://html.spec.whatwg.org/multipage/parsing.html#tree-construction}
         */
        this.inForeignNode = false;
        this.lastStartTagName = '';
        this.active = false;
        this.state = 0 /* State.DATA */;
        this.returnState = 0 /* State.DATA */;
        this.charRefCode = -1;
        this.consumedAfterSnapshot = -1;
        this.currentCharacterToken = null;
        this.currentToken = null;
        this.currentAttr = { name: '', value: '' };
        this.preprocessor = new preprocessor.Preprocessor(handler);
        this.currentLocation = this.getCurrentLocation(-1);
    }
    //Errors
    _err(code) {
        var _a, _b;
        (_b = (_a = this.handler).onParseError) === null || _b === void 0 ? void 0 : _b.call(_a, this.preprocessor.getError(code));
    }
    // NOTE: `offset` may never run across line boundaries.
    getCurrentLocation(offset) {
        if (!this.options.sourceCodeLocationInfo) {
            return null;
        }
        return {
            startLine: this.preprocessor.line,
            startCol: this.preprocessor.col - offset,
            startOffset: this.preprocessor.offset - offset,
            endLine: -1,
            endCol: -1,
            endOffset: -1,
        };
    }
    _runParsingLoop() {
        if (this.inLoop)
            return;
        this.inLoop = true;
        while (this.active && !this.paused) {
            this.consumedAfterSnapshot = 0;
            const cp = this._consume();
            if (!this._ensureHibernation()) {
                this._callState(cp);
            }
        }
        this.inLoop = false;
    }
    //API
    pause() {
        this.paused = true;
    }
    resume(writeCallback) {
        if (!this.paused) {
            throw new Error('Parser was already resumed');
        }
        this.paused = false;
        // Necessary for synchronous resume.
        if (this.inLoop)
            return;
        this._runParsingLoop();
        if (!this.paused) {
            writeCallback === null || writeCallback === void 0 ? void 0 : writeCallback();
        }
    }
    write(chunk, isLastChunk, writeCallback) {
        this.active = true;
        this.preprocessor.write(chunk, isLastChunk);
        this._runParsingLoop();
        if (!this.paused) {
            writeCallback === null || writeCallback === void 0 ? void 0 : writeCallback();
        }
    }
    insertHtmlAtCurrentPos(chunk) {
        this.active = true;
        this.preprocessor.insertHtmlAtCurrentPos(chunk);
        this._runParsingLoop();
    }
    //Hibernation
    _ensureHibernation() {
        if (this.preprocessor.endOfChunkHit) {
            this._unconsume(this.consumedAfterSnapshot);
            this.active = false;
            return true;
        }
        return false;
    }
    //Consumption
    _consume() {
        this.consumedAfterSnapshot++;
        return this.preprocessor.advance();
    }
    _unconsume(count) {
        this.consumedAfterSnapshot -= count;
        this.preprocessor.retreat(count);
    }
    _reconsumeInState(state, cp) {
        this.state = state;
        this._callState(cp);
    }
    _advanceBy(count) {
        this.consumedAfterSnapshot += count;
        for (let i = 0; i < count; i++) {
            this.preprocessor.advance();
        }
    }
    _consumeSequenceIfMatch(pattern, caseSensitive) {
        if (this.preprocessor.startsWith(pattern, caseSensitive)) {
            // We will already have consumed one character before calling this method.
            this._advanceBy(pattern.length - 1);
            return true;
        }
        return false;
    }
    //Token creation
    _createStartTagToken() {
        this.currentToken = {
            type: token.TokenType.START_TAG,
            tagName: '',
            tagID: html.TAG_ID.UNKNOWN,
            selfClosing: false,
            ackSelfClosing: false,
            attrs: [],
            location: this.getCurrentLocation(1),
        };
    }
    _createEndTagToken() {
        this.currentToken = {
            type: token.TokenType.END_TAG,
            tagName: '',
            tagID: html.TAG_ID.UNKNOWN,
            selfClosing: false,
            ackSelfClosing: false,
            attrs: [],
            location: this.getCurrentLocation(2),
        };
    }
    _createCommentToken(offset) {
        this.currentToken = {
            type: token.TokenType.COMMENT,
            data: '',
            location: this.getCurrentLocation(offset),
        };
    }
    _createDoctypeToken(initialName) {
        this.currentToken = {
            type: token.TokenType.DOCTYPE,
            name: initialName,
            forceQuirks: false,
            publicId: null,
            systemId: null,
            location: this.currentLocation,
        };
    }
    _createCharacterToken(type, chars) {
        this.currentCharacterToken = {
            type,
            chars,
            location: this.currentLocation,
        };
    }
    //Tag attributes
    _createAttr(attrNameFirstCh) {
        this.currentAttr = {
            name: attrNameFirstCh,
            value: '',
        };
        this.currentLocation = this.getCurrentLocation(0);
    }
    _leaveAttrName() {
        var _a;
        var _b;
        const token$1 = this.currentToken;
        if ((0, token.getTokenAttr)(token$1, this.currentAttr.name) === null) {
            token$1.attrs.push(this.currentAttr);
            if (token$1.location && this.currentLocation) {
                const attrLocations = ((_a = (_b = token$1.location).attrs) !== null && _a !== void 0 ? _a : (_b.attrs = Object.create(null)));
                attrLocations[this.currentAttr.name] = this.currentLocation;
                // Set end location
                this._leaveAttrValue();
            }
        }
        else {
            this._err(errorCodes.ERR.duplicateAttribute);
        }
    }
    _leaveAttrValue() {
        if (this.currentLocation) {
            this.currentLocation.endLine = this.preprocessor.line;
            this.currentLocation.endCol = this.preprocessor.col;
            this.currentLocation.endOffset = this.preprocessor.offset;
        }
    }
    //Token emission
    prepareToken(ct) {
        this._emitCurrentCharacterToken(ct.location);
        this.currentToken = null;
        if (ct.location) {
            ct.location.endLine = this.preprocessor.line;
            ct.location.endCol = this.preprocessor.col + 1;
            ct.location.endOffset = this.preprocessor.offset + 1;
        }
        this.currentLocation = this.getCurrentLocation(-1);
    }
    emitCurrentTagToken() {
        const ct = this.currentToken;
        this.prepareToken(ct);
        ct.tagID = (0, html.getTagID)(ct.tagName);
        if (ct.type === token.TokenType.START_TAG) {
            this.lastStartTagName = ct.tagName;
            this.handler.onStartTag(ct);
        }
        else {
            if (ct.attrs.length > 0) {
                this._err(errorCodes.ERR.endTagWithAttributes);
            }
            if (ct.selfClosing) {
                this._err(errorCodes.ERR.endTagWithTrailingSolidus);
            }
            this.handler.onEndTag(ct);
        }
        this.preprocessor.dropParsedChunk();
    }
    emitCurrentComment(ct) {
        this.prepareToken(ct);
        this.handler.onComment(ct);
        this.preprocessor.dropParsedChunk();
    }
    emitCurrentDoctype(ct) {
        this.prepareToken(ct);
        this.handler.onDoctype(ct);
        this.preprocessor.dropParsedChunk();
    }
    _emitCurrentCharacterToken(nextLocation) {
        if (this.currentCharacterToken) {
            //NOTE: if we have a pending character token, make it's end location equal to the
            //current token's start location.
            if (nextLocation && this.currentCharacterToken.location) {
                this.currentCharacterToken.location.endLine = nextLocation.startLine;
                this.currentCharacterToken.location.endCol = nextLocation.startCol;
                this.currentCharacterToken.location.endOffset = nextLocation.startOffset;
            }
            switch (this.currentCharacterToken.type) {
                case token.TokenType.CHARACTER: {
                    this.handler.onCharacter(this.currentCharacterToken);
                    break;
                }
                case token.TokenType.NULL_CHARACTER: {
                    this.handler.onNullCharacter(this.currentCharacterToken);
                    break;
                }
                case token.TokenType.WHITESPACE_CHARACTER: {
                    this.handler.onWhitespaceCharacter(this.currentCharacterToken);
                    break;
                }
            }
            this.currentCharacterToken = null;
        }
    }
    _emitEOFToken() {
        const location = this.getCurrentLocation(0);
        if (location) {
            location.endLine = location.startLine;
            location.endCol = location.startCol;
            location.endOffset = location.startOffset;
        }
        this._emitCurrentCharacterToken(location);
        this.handler.onEof({ type: token.TokenType.EOF, location });
        this.active = false;
    }
    //Characters emission
    //OPTIMIZATION: specification uses only one type of character tokens (one token per character).
    //This causes a huge memory overhead and a lot of unnecessary parser loops. parse5 uses 3 groups of characters.
    //If we have a sequence of characters that belong to the same group, the parser can process it
    //as a single solid character token.
    //So, there are 3 types of character tokens in parse5:
    //1)TokenType.NULL_CHARACTER - \u0000-character sequences (e.g. '\u0000\u0000\u0000')
    //2)TokenType.WHITESPACE_CHARACTER - any whitespace/new-line character sequences (e.g. '\n  \r\t   \f')
    //3)TokenType.CHARACTER - any character sequence which don't belong to groups 1 and 2 (e.g. 'abcdef1234@@#$%^')
    _appendCharToCurrentCharacterToken(type, ch) {
        if (this.currentCharacterToken) {
            if (this.currentCharacterToken.type !== type) {
                this.currentLocation = this.getCurrentLocation(0);
                this._emitCurrentCharacterToken(this.currentLocation);
                this.preprocessor.dropParsedChunk();
            }
            else {
                this.currentCharacterToken.chars += ch;
                return;
            }
        }
        this._createCharacterToken(type, ch);
    }
    _emitCodePoint(cp) {
        const type = isWhitespace(cp)
            ? token.TokenType.WHITESPACE_CHARACTER
            : cp === unicode.CODE_POINTS.NULL
                ? token.TokenType.NULL_CHARACTER
                : token.TokenType.CHARACTER;
        this._appendCharToCurrentCharacterToken(type, String.fromCodePoint(cp));
    }
    //NOTE: used when we emit characters explicitly.
    //This is always for non-whitespace and non-null characters, which allows us to avoid additional checks.
    _emitChars(ch) {
        this._appendCharToCurrentCharacterToken(token.TokenType.CHARACTER, ch);
    }
    // Character reference helpers
    _matchNamedCharacterReference(cp) {
        let result = null;
        let excess = 0;
        let withoutSemicolon = false;
        for (let i = 0, current = decode_js_1.htmlDecodeTree[0]; i >= 0; cp = this._consume()) {
            i = (0, decode_js_1.determineBranch)(decode_js_1.htmlDecodeTree, current, i + 1, cp);
            if (i < 0)
                break;
            excess += 1;
            current = decode_js_1.htmlDecodeTree[i];
            const masked = current & decode_js_1.BinTrieFlags.VALUE_LENGTH;
            // If the branch is a value, store it and continue
            if (masked) {
                // The mask is the number of bytes of the value, including the current byte.
                const valueLength = (masked >> 14) - 1;
                // Attribute values that aren't terminated properly aren't parsed, and shouldn't lead to a parser error.
                // See the example in https://html.spec.whatwg.org/multipage/parsing.html#named-character-reference-state
                if (cp !== unicode.CODE_POINTS.SEMICOLON &&
                    this._isCharacterReferenceInAttribute() &&
                    isEntityInAttributeInvalidEnd(this.preprocessor.peek(1))) {
                    //NOTE: we don't flush all consumed code points here, and instead switch back to the original state after
                    //emitting an ampersand. This is fine, as alphanumeric characters won't be parsed differently in attributes.
                    result = [unicode.CODE_POINTS.AMPERSAND];
                    // Skip over the value.
                    i += valueLength;
                }
                else {
                    // If this is a surrogate pair, consume the next two bytes.
                    result =
                        valueLength === 0
                            ? [decode_js_1.htmlDecodeTree[i] & ~decode_js_1.BinTrieFlags.VALUE_LENGTH]
                            : valueLength === 1
                                ? [decode_js_1.htmlDecodeTree[++i]]
                                : [decode_js_1.htmlDecodeTree[++i], decode_js_1.htmlDecodeTree[++i]];
                    excess = 0;
                    withoutSemicolon = cp !== unicode.CODE_POINTS.SEMICOLON;
                }
                if (valueLength === 0) {
                    // If the value is zero-length, we're done.
                    this._consume();
                    break;
                }
            }
        }
        this._unconsume(excess);
        if (withoutSemicolon && !this.preprocessor.endOfChunkHit) {
            this._err(errorCodes.ERR.missingSemicolonAfterCharacterReference);
        }
        // We want to emit the error above on the code point after the entity.
        // We always consume one code point too many in the loop, and we wait to
        // unconsume it until after the error is emitted.
        this._unconsume(1);
        return result;
    }
    _isCharacterReferenceInAttribute() {
        return (this.returnState === 35 /* State.ATTRIBUTE_VALUE_DOUBLE_QUOTED */ ||
            this.returnState === 36 /* State.ATTRIBUTE_VALUE_SINGLE_QUOTED */ ||
            this.returnState === 37 /* State.ATTRIBUTE_VALUE_UNQUOTED */);
    }
    _flushCodePointConsumedAsCharacterReference(cp) {
        if (this._isCharacterReferenceInAttribute()) {
            this.currentAttr.value += String.fromCodePoint(cp);
        }
        else {
            this._emitCodePoint(cp);
        }
    }
    // Calling states this way turns out to be much faster than any other approach.
    _callState(cp) {
        switch (this.state) {
            case 0 /* State.DATA */: {
                this._stateData(cp);
                break;
            }
            case 1 /* State.RCDATA */: {
                this._stateRcdata(cp);
                break;
            }
            case 2 /* State.RAWTEXT */: {
                this._stateRawtext(cp);
                break;
            }
            case 3 /* State.SCRIPT_DATA */: {
                this._stateScriptData(cp);
                break;
            }
            case 4 /* State.PLAINTEXT */: {
                this._statePlaintext(cp);
                break;
            }
            case 5 /* State.TAG_OPEN */: {
                this._stateTagOpen(cp);
                break;
            }
            case 6 /* State.END_TAG_OPEN */: {
                this._stateEndTagOpen(cp);
                break;
            }
            case 7 /* State.TAG_NAME */: {
                this._stateTagName(cp);
                break;
            }
            case 8 /* State.RCDATA_LESS_THAN_SIGN */: {
                this._stateRcdataLessThanSign(cp);
                break;
            }
            case 9 /* State.RCDATA_END_TAG_OPEN */: {
                this._stateRcdataEndTagOpen(cp);
                break;
            }
            case 10 /* State.RCDATA_END_TAG_NAME */: {
                this._stateRcdataEndTagName(cp);
                break;
            }
            case 11 /* State.RAWTEXT_LESS_THAN_SIGN */: {
                this._stateRawtextLessThanSign(cp);
                break;
            }
            case 12 /* State.RAWTEXT_END_TAG_OPEN */: {
                this._stateRawtextEndTagOpen(cp);
                break;
            }
            case 13 /* State.RAWTEXT_END_TAG_NAME */: {
                this._stateRawtextEndTagName(cp);
                break;
            }
            case 14 /* State.SCRIPT_DATA_LESS_THAN_SIGN */: {
                this._stateScriptDataLessThanSign(cp);
                break;
            }
            case 15 /* State.SCRIPT_DATA_END_TAG_OPEN */: {
                this._stateScriptDataEndTagOpen(cp);
                break;
            }
            case 16 /* State.SCRIPT_DATA_END_TAG_NAME */: {
                this._stateScriptDataEndTagName(cp);
                break;
            }
            case 17 /* State.SCRIPT_DATA_ESCAPE_START */: {
                this._stateScriptDataEscapeStart(cp);
                break;
            }
            case 18 /* State.SCRIPT_DATA_ESCAPE_START_DASH */: {
                this._stateScriptDataEscapeStartDash(cp);
                break;
            }
            case 19 /* State.SCRIPT_DATA_ESCAPED */: {
                this._stateScriptDataEscaped(cp);
                break;
            }
            case 20 /* State.SCRIPT_DATA_ESCAPED_DASH */: {
                this._stateScriptDataEscapedDash(cp);
                break;
            }
            case 21 /* State.SCRIPT_DATA_ESCAPED_DASH_DASH */: {
                this._stateScriptDataEscapedDashDash(cp);
                break;
            }
            case 22 /* State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN */: {
                this._stateScriptDataEscapedLessThanSign(cp);
                break;
            }
            case 23 /* State.SCRIPT_DATA_ESCAPED_END_TAG_OPEN */: {
                this._stateScriptDataEscapedEndTagOpen(cp);
                break;
            }
            case 24 /* State.SCRIPT_DATA_ESCAPED_END_TAG_NAME */: {
                this._stateScriptDataEscapedEndTagName(cp);
                break;
            }
            case 25 /* State.SCRIPT_DATA_DOUBLE_ESCAPE_START */: {
                this._stateScriptDataDoubleEscapeStart(cp);
                break;
            }
            case 26 /* State.SCRIPT_DATA_DOUBLE_ESCAPED */: {
                this._stateScriptDataDoubleEscaped(cp);
                break;
            }
            case 27 /* State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH */: {
                this._stateScriptDataDoubleEscapedDash(cp);
                break;
            }
            case 28 /* State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH */: {
                this._stateScriptDataDoubleEscapedDashDash(cp);
                break;
            }
            case 29 /* State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN */: {
                this._stateScriptDataDoubleEscapedLessThanSign(cp);
                break;
            }
            case 30 /* State.SCRIPT_DATA_DOUBLE_ESCAPE_END */: {
                this._stateScriptDataDoubleEscapeEnd(cp);
                break;
            }
            case 31 /* State.BEFORE_ATTRIBUTE_NAME */: {
                this._stateBeforeAttributeName(cp);
                break;
            }
            case 32 /* State.ATTRIBUTE_NAME */: {
                this._stateAttributeName(cp);
                break;
            }
            case 33 /* State.AFTER_ATTRIBUTE_NAME */: {
                this._stateAfterAttributeName(cp);
                break;
            }
            case 34 /* State.BEFORE_ATTRIBUTE_VALUE */: {
                this._stateBeforeAttributeValue(cp);
                break;
            }
            case 35 /* State.ATTRIBUTE_VALUE_DOUBLE_QUOTED */: {
                this._stateAttributeValueDoubleQuoted(cp);
                break;
            }
            case 36 /* State.ATTRIBUTE_VALUE_SINGLE_QUOTED */: {
                this._stateAttributeValueSingleQuoted(cp);
                break;
            }
            case 37 /* State.ATTRIBUTE_VALUE_UNQUOTED */: {
                this._stateAttributeValueUnquoted(cp);
                break;
            }
            case 38 /* State.AFTER_ATTRIBUTE_VALUE_QUOTED */: {
                this._stateAfterAttributeValueQuoted(cp);
                break;
            }
            case 39 /* State.SELF_CLOSING_START_TAG */: {
                debugger;
                this._stateSelfClosingStartTag(cp);
                break;
            }
            case 40 /* State.BOGUS_COMMENT */: {
                this._stateBogusComment(cp);
                break;
            }
            case 41 /* State.MARKUP_DECLARATION_OPEN */: {
                this._stateMarkupDeclarationOpen(cp);
                break;
            }
            case 42 /* State.COMMENT_START */: {
                this._stateCommentStart(cp);
                break;
            }
            case 43 /* State.COMMENT_START_DASH */: {
                this._stateCommentStartDash(cp);
                break;
            }
            case 44 /* State.COMMENT */: {
                this._stateComment(cp);
                break;
            }
            case 45 /* State.COMMENT_LESS_THAN_SIGN */: {
                this._stateCommentLessThanSign(cp);
                break;
            }
            case 46 /* State.COMMENT_LESS_THAN_SIGN_BANG */: {
                this._stateCommentLessThanSignBang(cp);
                break;
            }
            case 47 /* State.COMMENT_LESS_THAN_SIGN_BANG_DASH */: {
                this._stateCommentLessThanSignBangDash(cp);
                break;
            }
            case 48 /* State.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH */: {
                this._stateCommentLessThanSignBangDashDash(cp);
                break;
            }
            case 49 /* State.COMMENT_END_DASH */: {
                this._stateCommentEndDash(cp);
                break;
            }
            case 50 /* State.COMMENT_END */: {
                this._stateCommentEnd(cp);
                break;
            }
            case 51 /* State.COMMENT_END_BANG */: {
                this._stateCommentEndBang(cp);
                break;
            }
            case 52 /* State.DOCTYPE */: {
                this._stateDoctype(cp);
                break;
            }
            case 53 /* State.BEFORE_DOCTYPE_NAME */: {
                this._stateBeforeDoctypeName(cp);
                break;
            }
            case 54 /* State.DOCTYPE_NAME */: {
                this._stateDoctypeName(cp);
                break;
            }
            case 55 /* State.AFTER_DOCTYPE_NAME */: {
                this._stateAfterDoctypeName(cp);
                break;
            }
            case 56 /* State.AFTER_DOCTYPE_PUBLIC_KEYWORD */: {
                this._stateAfterDoctypePublicKeyword(cp);
                break;
            }
            case 57 /* State.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER */: {
                this._stateBeforeDoctypePublicIdentifier(cp);
                break;
            }
            case 58 /* State.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED */: {
                this._stateDoctypePublicIdentifierDoubleQuoted(cp);
                break;
            }
            case 59 /* State.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED */: {
                this._stateDoctypePublicIdentifierSingleQuoted(cp);
                break;
            }
            case 60 /* State.AFTER_DOCTYPE_PUBLIC_IDENTIFIER */: {
                this._stateAfterDoctypePublicIdentifier(cp);
                break;
            }
            case 61 /* State.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS */: {
                this._stateBetweenDoctypePublicAndSystemIdentifiers(cp);
                break;
            }
            case 62 /* State.AFTER_DOCTYPE_SYSTEM_KEYWORD */: {
                this._stateAfterDoctypeSystemKeyword(cp);
                break;
            }
            case 63 /* State.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER */: {
                this._stateBeforeDoctypeSystemIdentifier(cp);
                break;
            }
            case 64 /* State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED */: {
                this._stateDoctypeSystemIdentifierDoubleQuoted(cp);
                break;
            }
            case 65 /* State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED */: {
                this._stateDoctypeSystemIdentifierSingleQuoted(cp);
                break;
            }
            case 66 /* State.AFTER_DOCTYPE_SYSTEM_IDENTIFIER */: {
                this._stateAfterDoctypeSystemIdentifier(cp);
                break;
            }
            case 67 /* State.BOGUS_DOCTYPE */: {
                this._stateBogusDoctype(cp);
                break;
            }
            case 68 /* State.CDATA_SECTION */: {
                this._stateCdataSection(cp);
                break;
            }
            case 69 /* State.CDATA_SECTION_BRACKET */: {
                this._stateCdataSectionBracket(cp);
                break;
            }
            case 70 /* State.CDATA_SECTION_END */: {
                this._stateCdataSectionEnd(cp);
                break;
            }
            case 71 /* State.CHARACTER_REFERENCE */: {
                this._stateCharacterReference(cp);
                break;
            }
            case 72 /* State.NAMED_CHARACTER_REFERENCE */: {
                this._stateNamedCharacterReference(cp);
                break;
            }
            case 73 /* State.AMBIGUOUS_AMPERSAND */: {
                this._stateAmbiguousAmpersand(cp);
                break;
            }
            case 74 /* State.NUMERIC_CHARACTER_REFERENCE */: {
                this._stateNumericCharacterReference(cp);
                break;
            }
            case 75 /* State.HEXADEMICAL_CHARACTER_REFERENCE_START */: {
                this._stateHexademicalCharacterReferenceStart(cp);
                break;
            }
            case 76 /* State.HEXADEMICAL_CHARACTER_REFERENCE */: {
                this._stateHexademicalCharacterReference(cp);
                break;
            }
            case 77 /* State.DECIMAL_CHARACTER_REFERENCE */: {
                this._stateDecimalCharacterReference(cp);
                break;
            }
            case 78 /* State.NUMERIC_CHARACTER_REFERENCE_END */: {
                this._stateNumericCharacterReferenceEnd(cp);
                break;
            }
            default: {
                throw new Error('Unknown state');
            }
        }
    }
    // State machine
    // Data state
    //------------------------------------------------------------------
    _stateData(cp) {
        switch (cp) {
            case unicode.CODE_POINTS.LESS_THAN_SIGN: {
                this.state = 5 /* State.TAG_OPEN */;
                break;
            }
            case unicode.CODE_POINTS.AMPERSAND: {
                this.returnState = 0 /* State.DATA */;
                this.state = 71 /* State.CHARACTER_REFERENCE */;
                break;
            }
            case unicode.CODE_POINTS.NULL: {
                this._err(errorCodes.ERR.unexpectedNullCharacter);
                this._emitCodePoint(cp);
                break;
            }
            case unicode.CODE_POINTS.EOF: {
                this._emitEOFToken();
                break;
            }
            default: {
                this._emitCodePoint(cp);
            }
        }
    }
    //  RCDATA state
    //------------------------------------------------------------------
    _stateRcdata(cp) {
        switch (cp) {
            case unicode.CODE_POINTS.AMPERSAND: {
                this.returnState = 1 /* State.RCDATA */;
                this.state = 71 /* State.CHARACTER_REFERENCE */;
                break;
            }
            case unicode.CODE_POINTS.LESS_THAN_SIGN: {
                this.state = 8 /* State.RCDATA_LESS_THAN_SIGN */;
                break;
            }
            case unicode.CODE_POINTS.NULL: {
                this._err(errorCodes.ERR.unexpectedNullCharacter);
                this._emitChars(unicode.REPLACEMENT_CHARACTER);
                break;
            }
            case unicode.CODE_POINTS.EOF: {
                this._emitEOFToken();
                break;
            }
            default: {
                this._emitCodePoint(cp);
            }
        }
    }
    // RAWTEXT state
    //------------------------------------------------------------------
    _stateRawtext(cp) {
        switch (cp) {
            case unicode.CODE_POINTS.LESS_THAN_SIGN: {
                this.state = 11 /* State.RAWTEXT_LESS_THAN_SIGN */;
                break;
            }
            case unicode.CODE_POINTS.NULL: {
                this._err(errorCodes.ERR.unexpectedNullCharacter);
                this._emitChars(unicode.REPLACEMENT_CHARACTER);
                break;
            }
            case unicode.CODE_POINTS.EOF: {
                this._emitEOFToken();
                break;
            }
            default: {
                this._emitCodePoint(cp);
            }
        }
    }
    // Script data state
    //------------------------------------------------------------------
    _stateScriptData(cp) {
        switch (cp) {
            case unicode.CODE_POINTS.LESS_THAN_SIGN: {
                this.state = 14 /* State.SCRIPT_DATA_LESS_THAN_SIGN */;
                break;
            }
            case unicode.CODE_POINTS.NULL: {
                this._err(errorCodes.ERR.unexpectedNullCharacter);
                this._emitChars(unicode.REPLACEMENT_CHARACTER);
                break;
            }
            case unicode.CODE_POINTS.EOF: {
                this._emitEOFToken();
                break;
            }
            default: {
                this._emitCodePoint(cp);
            }
        }
    }
    // PLAINTEXT state
    //------------------------------------------------------------------
    _statePlaintext(cp) {
        switch (cp) {
            case unicode.CODE_POINTS.NULL: {
                this._err(errorCodes.ERR.unexpectedNullCharacter);
                this._emitChars(unicode.REPLACEMENT_CHARACTER);
                break;
            }
            case unicode.CODE_POINTS.EOF: {
                this._emitEOFToken();
                break;
            }
            default: {
                this._emitCodePoint(cp);
            }
        }
    }
    // Tag open state
    //------------------------------------------------------------------
    _stateTagOpen(cp) {
        if (isAsciiLetter(cp)) {
            this._createStartTagToken();
            this.state = 7 /* State.TAG_NAME */;
            this._stateTagName(cp);
        }
        else
            switch (cp) {
                case unicode.CODE_POINTS.EXCLAMATION_MARK: {
                    this.state = 41 /* State.MARKUP_DECLARATION_OPEN */;
                    break;
                }
                case unicode.CODE_POINTS.SOLIDUS: {
                    this.state = 6 /* State.END_TAG_OPEN */;
                    break;
                }
                case unicode.CODE_POINTS.QUESTION_MARK: {
                    this._err(errorCodes.ERR.unexpectedQuestionMarkInsteadOfTagName);
                    this._createCommentToken(1);
                    this.state = 40 /* State.BOGUS_COMMENT */;
                    this._stateBogusComment(cp);
                    break;
                }
                case unicode.CODE_POINTS.EOF: {
                    this._err(errorCodes.ERR.eofBeforeTagName);
                    this._emitChars('<');
                    this._emitEOFToken();
                    break;
                }
                default: {
                    this._err(errorCodes.ERR.invalidFirstCharacterOfTagName);
                    this._emitChars('<');
                    this.state = 0 /* State.DATA */;
                    this._stateData(cp);
                }
            }
    }
    // End tag open state
    //------------------------------------------------------------------
    _stateEndTagOpen(cp) {
        if (isAsciiLetter(cp)) {
            this._createEndTagToken();
            this.state = 7 /* State.TAG_NAME */;
            this._stateTagName(cp);
        }
        else
            switch (cp) {
                case unicode.CODE_POINTS.GREATER_THAN_SIGN: {
                    this._err(errorCodes.ERR.missingEndTagName);
                    this.state = 0 /* State.DATA */;
                    break;
                }
                case unicode.CODE_POINTS.EOF: {
                    this._err(errorCodes.ERR.eofBeforeTagName);
                    this._emitChars('</');
                    this._emitEOFToken();
                    break;
                }
                default: {
                    this._err(errorCodes.ERR.invalidFirstCharacterOfTagName);
                    this._createCommentToken(2);
                    this.state = 40 /* State.BOGUS_COMMENT */;
                    this._stateBogusComment(cp);
                }
            }
    }
    // Tag name state
    //------------------------------------------------------------------
    _stateTagName(cp) {
        const token = this.currentToken;
        switch (cp) {
            case unicode.CODE_POINTS.SPACE:
            case unicode.CODE_POINTS.LINE_FEED:
            case unicode.CODE_POINTS.TABULATION:
            case unicode.CODE_POINTS.FORM_FEED: {
                this.state = 31 /* State.BEFORE_ATTRIBUTE_NAME */;
                break;
            }
            case unicode.CODE_POINTS.SOLIDUS: {
                this.state = 39 /* State.SELF_CLOSING_START_TAG */;
                break;
            }
            case unicode.CODE_POINTS.GREATER_THAN_SIGN: {
                this.state = 0 /* State.DATA */;
                this.emitCurrentTagToken();
                break;
            }
            case unicode.CODE_POINTS.NULL: {
                this._err(errorCodes.ERR.unexpectedNullCharacter);
                token.tagName += unicode.REPLACEMENT_CHARACTER;
                break;
            }
            case unicode.CODE_POINTS.EOF: {
                this._err(errorCodes.ERR.eofInTag);
                this._emitEOFToken();
                break;
            }
            default: {
                if (process.env.isLowerCaseTag) {
                    token.tagName += String.fromCodePoint(isAsciiUpper(cp) ? toAsciiLower(cp) : cp);
                }
                else {
                    token.tagName += String.fromCodePoint(cp);
                }
            }
        }
    }
    // RCDATA less-than sign state
    //------------------------------------------------------------------
    _stateRcdataLessThanSign(cp) {
        if (cp === unicode.CODE_POINTS.SOLIDUS) {
            this.state = 9 /* State.RCDATA_END_TAG_OPEN */;
        }
        else {
            this._emitChars('<');
            this.state = 1 /* State.RCDATA */;
            this._stateRcdata(cp);
        }
    }
    // RCDATA end tag open state
    //------------------------------------------------------------------
    _stateRcdataEndTagOpen(cp) {
        if (isAsciiLetter(cp)) {
            this.state = 10 /* State.RCDATA_END_TAG_NAME */;
            this._stateRcdataEndTagName(cp);
        }
        else {
            this._emitChars('</');
            this.state = 1 /* State.RCDATA */;
            this._stateRcdata(cp);
        }
    }
    handleSpecialEndTag(_cp) {
        if (!this.preprocessor.startsWith(this.lastStartTagName, false)) {
            return !this._ensureHibernation();
        }
        this._createEndTagToken();
        const token = this.currentToken;
        token.tagName = this.lastStartTagName;
        const cp = this.preprocessor.peek(this.lastStartTagName.length);
        switch (cp) {
            case unicode.CODE_POINTS.SPACE:
            case unicode.CODE_POINTS.LINE_FEED:
            case unicode.CODE_POINTS.TABULATION:
            case unicode.CODE_POINTS.FORM_FEED: {
                this._advanceBy(this.lastStartTagName.length);
                this.state = 31 /* State.BEFORE_ATTRIBUTE_NAME */;
                return false;
            }
            case unicode.CODE_POINTS.SOLIDUS: {
                this._advanceBy(this.lastStartTagName.length);
                this.state = 39 /* State.SELF_CLOSING_START_TAG */;
                return false;
            }
            case unicode.CODE_POINTS.GREATER_THAN_SIGN: {
                this._advanceBy(this.lastStartTagName.length);
                this.emitCurrentTagToken();
                this.state = 0 /* State.DATA */;
                return false;
            }
            default: {
                return !this._ensureHibernation();
            }
        }
    }
    // RCDATA end tag name state
    //------------------------------------------------------------------
    _stateRcdataEndTagName(cp) {
        if (this.handleSpecialEndTag(cp)) {
            this._emitChars('</');
            this.state = 1 /* State.RCDATA */;
            this._stateRcdata(cp);
        }
    }
    // RAWTEXT less-than sign state
    //------------------------------------------------------------------
    _stateRawtextLessThanSign(cp) {
        if (cp === unicode.CODE_POINTS.SOLIDUS) {
            this.state = 12 /* State.RAWTEXT_END_TAG_OPEN */;
        }
        else {
            this._emitChars('<');
            this.state = 2 /* State.RAWTEXT */;
            this._stateRawtext(cp);
        }
    }
    // RAWTEXT end tag open state
    //------------------------------------------------------------------
    _stateRawtextEndTagOpen(cp) {
        if (isAsciiLetter(cp)) {
            this.state = 13 /* State.RAWTEXT_END_TAG_NAME */;
            this._stateRawtextEndTagName(cp);
        }
        else {
            this._emitChars('</');
            this.state = 2 /* State.RAWTEXT */;
            this._stateRawtext(cp);
        }
    }
    // RAWTEXT end tag name state
    //------------------------------------------------------------------
    _stateRawtextEndTagName(cp) {
        if (this.handleSpecialEndTag(cp)) {
            this._emitChars('</');
            this.state = 2 /* State.RAWTEXT */;
            this._stateRawtext(cp);
        }
    }
    // Script data less-than sign state
    //------------------------------------------------------------------
    _stateScriptDataLessThanSign(cp) {
        switch (cp) {
            case unicode.CODE_POINTS.SOLIDUS: {
                this.state = 15 /* State.SCRIPT_DATA_END_TAG_OPEN */;
                break;
            }
            case unicode.CODE_POINTS.EXCLAMATION_MARK: {
                this.state = 17 /* State.SCRIPT_DATA_ESCAPE_START */;
                this._emitChars('<!');
                break;
            }
            default: {
                this._emitChars('<');
                this.state = 3 /* State.SCRIPT_DATA */;
                this._stateScriptData(cp);
            }
        }
    }
    // Script data end tag open state
    //------------------------------------------------------------------
    _stateScriptDataEndTagOpen(cp) {
        if (isAsciiLetter(cp)) {
            this.state = 16 /* State.SCRIPT_DATA_END_TAG_NAME */;
            this._stateScriptDataEndTagName(cp);
        }
        else {
            this._emitChars('</');
            this.state = 3 /* State.SCRIPT_DATA */;
            this._stateScriptData(cp);
        }
    }
    // Script data end tag name state
    //------------------------------------------------------------------
    _stateScriptDataEndTagName(cp) {
        if (this.handleSpecialEndTag(cp)) {
            this._emitChars('</');
            this.state = 3 /* State.SCRIPT_DATA */;
            this._stateScriptData(cp);
        }
    }
    // Script data escape start state
    //------------------------------------------------------------------
    _stateScriptDataEscapeStart(cp) {
        if (cp === unicode.CODE_POINTS.HYPHEN_MINUS) {
            this.state = 18 /* State.SCRIPT_DATA_ESCAPE_START_DASH */;
            this._emitChars('-');
        }
        else {
            this.state = 3 /* State.SCRIPT_DATA */;
            this._stateScriptData(cp);
        }
    }
    // Script data escape start dash state
    //------------------------------------------------------------------
    _stateScriptDataEscapeStartDash(cp) {
        if (cp === unicode.CODE_POINTS.HYPHEN_MINUS) {
            this.state = 21 /* State.SCRIPT_DATA_ESCAPED_DASH_DASH */;
            this._emitChars('-');
        }
        else {
            this.state = 3 /* State.SCRIPT_DATA */;
            this._stateScriptData(cp);
        }
    }
    // Script data escaped state
    //------------------------------------------------------------------
    _stateScriptDataEscaped(cp) {
        switch (cp) {
            case unicode.CODE_POINTS.HYPHEN_MINUS: {
                this.state = 20 /* State.SCRIPT_DATA_ESCAPED_DASH */;
                this._emitChars('-');
                break;
            }
            case unicode.CODE_POINTS.LESS_THAN_SIGN: {
                this.state = 22 /* State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN */;
                break;
            }
            case unicode.CODE_POINTS.NULL: {
                this._err(errorCodes.ERR.unexpectedNullCharacter);
                this._emitChars(unicode.REPLACEMENT_CHARACTER);
                break;
            }
            case unicode.CODE_POINTS.EOF: {
                this._err(errorCodes.ERR.eofInScriptHtmlCommentLikeText);
                this._emitEOFToken();
                break;
            }
            default: {
                this._emitCodePoint(cp);
            }
        }
    }
    // Script data escaped dash state
    //------------------------------------------------------------------
    _stateScriptDataEscapedDash(cp) {
        switch (cp) {
            case unicode.CODE_POINTS.HYPHEN_MINUS: {
                this.state = 21 /* State.SCRIPT_DATA_ESCAPED_DASH_DASH */;
                this._emitChars('-');
                break;
            }
            case unicode.CODE_POINTS.LESS_THAN_SIGN: {
                this.state = 22 /* State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN */;
                break;
            }
            case unicode.CODE_POINTS.NULL: {
                this._err(errorCodes.ERR.unexpectedNullCharacter);
                this.state = 19 /* State.SCRIPT_DATA_ESCAPED */;
                this._emitChars(unicode.REPLACEMENT_CHARACTER);
                break;
            }
            case unicode.CODE_POINTS.EOF: {
                this._err(errorCodes.ERR.eofInScriptHtmlCommentLikeText);
                this._emitEOFToken();
                break;
            }
            default: {
                this.state = 19 /* State.SCRIPT_DATA_ESCAPED */;
                this._emitCodePoint(cp);
            }
        }
    }
    // Script data escaped dash dash state
    //------------------------------------------------------------------
    _stateScriptDataEscapedDashDash(cp) {
        switch (cp) {
            case unicode.CODE_POINTS.HYPHEN_MINUS: {
                this._emitChars('-');
                break;
            }
            case unicode.CODE_POINTS.LESS_THAN_SIGN: {
                this.state = 22 /* State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN */;
                break;
            }
            case unicode.CODE_POINTS.GREATER_THAN_SIGN: {
                this.state = 3 /* State.SCRIPT_DATA */;
                this._emitChars('>');
                break;
            }
            case unicode.CODE_POINTS.NULL: {
                this._err(errorCodes.ERR.unexpectedNullCharacter);
                this.state = 19 /* State.SCRIPT_DATA_ESCAPED */;
                this._emitChars(unicode.REPLACEMENT_CHARACTER);
                break;
            }
            case unicode.CODE_POINTS.EOF: {
                this._err(errorCodes.ERR.eofInScriptHtmlCommentLikeText);
                this._emitEOFToken();
                break;
            }
            default: {
                this.state = 19 /* State.SCRIPT_DATA_ESCAPED */;
                this._emitCodePoint(cp);
            }
        }
    }
    // Script data escaped less-than sign state
    //------------------------------------------------------------------
    _stateScriptDataEscapedLessThanSign(cp) {
        if (cp === unicode.CODE_POINTS.SOLIDUS) {
            this.state = 23 /* State.SCRIPT_DATA_ESCAPED_END_TAG_OPEN */;
        }
        else if (isAsciiLetter(cp)) {
            this._emitChars('<');
            this.state = 25 /* State.SCRIPT_DATA_DOUBLE_ESCAPE_START */;
            this._stateScriptDataDoubleEscapeStart(cp);
        }
        else {
            this._emitChars('<');
            this.state = 19 /* State.SCRIPT_DATA_ESCAPED */;
            this._stateScriptDataEscaped(cp);
        }
    }
    // Script data escaped end tag open state
    //------------------------------------------------------------------
    _stateScriptDataEscapedEndTagOpen(cp) {
        if (isAsciiLetter(cp)) {
            this.state = 24 /* State.SCRIPT_DATA_ESCAPED_END_TAG_NAME */;
            this._stateScriptDataEscapedEndTagName(cp);
        }
        else {
            this._emitChars('</');
            this.state = 19 /* State.SCRIPT_DATA_ESCAPED */;
            this._stateScriptDataEscaped(cp);
        }
    }
    // Script data escaped end tag name state
    //------------------------------------------------------------------
    _stateScriptDataEscapedEndTagName(cp) {
        if (this.handleSpecialEndTag(cp)) {
            this._emitChars('</');
            this.state = 19 /* State.SCRIPT_DATA_ESCAPED */;
            this._stateScriptDataEscaped(cp);
        }
    }
    // Script data double escape start state
    //------------------------------------------------------------------
    _stateScriptDataDoubleEscapeStart(cp) {
        if (this.preprocessor.startsWith(unicode.SEQUENCES.SCRIPT, false) &&
            isScriptDataDoubleEscapeSequenceEnd(this.preprocessor.peek(unicode.SEQUENCES.SCRIPT.length))) {
            this._emitCodePoint(cp);
            for (let i = 0; i < unicode.SEQUENCES.SCRIPT.length; i++) {
                this._emitCodePoint(this._consume());
            }
            this.state = 26 /* State.SCRIPT_DATA_DOUBLE_ESCAPED */;
        }
        else if (!this._ensureHibernation()) {
            this.state = 19 /* State.SCRIPT_DATA_ESCAPED */;
            this._stateScriptDataEscaped(cp);
        }
    }
    // Script data double escaped state
    //------------------------------------------------------------------
    _stateScriptDataDoubleEscaped(cp) {
        switch (cp) {
            case unicode.CODE_POINTS.HYPHEN_MINUS: {
                this.state = 27 /* State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH */;
                this._emitChars('-');
                break;
            }
            case unicode.CODE_POINTS.LESS_THAN_SIGN: {
                this.state = 29 /* State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN */;
                this._emitChars('<');
                break;
            }
            case unicode.CODE_POINTS.NULL: {
                this._err(errorCodes.ERR.unexpectedNullCharacter);
                this._emitChars(unicode.REPLACEMENT_CHARACTER);
                break;
            }
            case unicode.CODE_POINTS.EOF: {
                this._err(errorCodes.ERR.eofInScriptHtmlCommentLikeText);
                this._emitEOFToken();
                break;
            }
            default: {
                this._emitCodePoint(cp);
            }
        }
    }
    // Script data double escaped dash state
    //------------------------------------------------------------------
    _stateScriptDataDoubleEscapedDash(cp) {
        switch (cp) {
            case unicode.CODE_POINTS.HYPHEN_MINUS: {
                this.state = 28 /* State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH */;
                this._emitChars('-');
                break;
            }
            case unicode.CODE_POINTS.LESS_THAN_SIGN: {
                this.state = 29 /* State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN */;
                this._emitChars('<');
                break;
            }
            case unicode.CODE_POINTS.NULL: {
                this._err(errorCodes.ERR.unexpectedNullCharacter);
                this.state = 26 /* State.SCRIPT_DATA_DOUBLE_ESCAPED */;
                this._emitChars(unicode.REPLACEMENT_CHARACTER);
                break;
            }
            case unicode.CODE_POINTS.EOF: {
                this._err(errorCodes.ERR.eofInScriptHtmlCommentLikeText);
                this._emitEOFToken();
                break;
            }
            default: {
                this.state = 26 /* State.SCRIPT_DATA_DOUBLE_ESCAPED */;
                this._emitCodePoint(cp);
            }
        }
    }
    // Script data double escaped dash dash state
    //------------------------------------------------------------------
    _stateScriptDataDoubleEscapedDashDash(cp) {
        switch (cp) {
            case unicode.CODE_POINTS.HYPHEN_MINUS: {
                this._emitChars('-');
                break;
            }
            case unicode.CODE_POINTS.LESS_THAN_SIGN: {
                this.state = 29 /* State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN */;
                this._emitChars('<');
                break;
            }
            case unicode.CODE_POINTS.GREATER_THAN_SIGN: {
                this.state = 3 /* State.SCRIPT_DATA */;
                this._emitChars('>');
                break;
            }
            case unicode.CODE_POINTS.NULL: {
                this._err(errorCodes.ERR.unexpectedNullCharacter);
                this.state = 26 /* State.SCRIPT_DATA_DOUBLE_ESCAPED */;
                this._emitChars(unicode.REPLACEMENT_CHARACTER);
                break;
            }
            case unicode.CODE_POINTS.EOF: {
                this._err(errorCodes.ERR.eofInScriptHtmlCommentLikeText);
                this._emitEOFToken();
                break;
            }
            default: {
                this.state = 26 /* State.SCRIPT_DATA_DOUBLE_ESCAPED */;
                this._emitCodePoint(cp);
            }
        }
    }
    // Script data double escaped less-than sign state
    //------------------------------------------------------------------
    _stateScriptDataDoubleEscapedLessThanSign(cp) {
        if (cp === unicode.CODE_POINTS.SOLIDUS) {
            this.state = 30 /* State.SCRIPT_DATA_DOUBLE_ESCAPE_END */;
            this._emitChars('/');
        }
        else {
            this.state = 26 /* State.SCRIPT_DATA_DOUBLE_ESCAPED */;
            this._stateScriptDataDoubleEscaped(cp);
        }
    }
    // Script data double escape end state
    //------------------------------------------------------------------
    _stateScriptDataDoubleEscapeEnd(cp) {
        if (this.preprocessor.startsWith(unicode.SEQUENCES.SCRIPT, false) &&
            isScriptDataDoubleEscapeSequenceEnd(this.preprocessor.peek(unicode.SEQUENCES.SCRIPT.length))) {
            this._emitCodePoint(cp);
            for (let i = 0; i < unicode.SEQUENCES.SCRIPT.length; i++) {
                this._emitCodePoint(this._consume());
            }
            this.state = 19 /* State.SCRIPT_DATA_ESCAPED */;
        }
        else if (!this._ensureHibernation()) {
            this.state = 26 /* State.SCRIPT_DATA_DOUBLE_ESCAPED */;
            this._stateScriptDataDoubleEscaped(cp);
        }
    }
    // Before attribute name state
    //------------------------------------------------------------------
    _stateBeforeAttributeName(cp) {
        switch (cp) {
            case unicode.CODE_POINTS.SPACE:
            case unicode.CODE_POINTS.LINE_FEED:
            case unicode.CODE_POINTS.TABULATION:
            case unicode.CODE_POINTS.FORM_FEED: {
                // Ignore whitespace
                break;
            }
            case unicode.CODE_POINTS.SOLIDUS:
            case unicode.CODE_POINTS.GREATER_THAN_SIGN:
            case unicode.CODE_POINTS.EOF: {
                this.state = 33 /* State.AFTER_ATTRIBUTE_NAME */;
                this._stateAfterAttributeName(cp);
                break;
            }
            case unicode.CODE_POINTS.EQUALS_SIGN: {
                this._err(errorCodes.ERR.unexpectedEqualsSignBeforeAttributeName);
                this._createAttr('=');
                this.state = 32 /* State.ATTRIBUTE_NAME */;
                break;
            }
            default: {
                this._createAttr('');
                this.state = 32 /* State.ATTRIBUTE_NAME */;
                this._stateAttributeName(cp);
            }
        }
    }
    // Attribute name state
    //------------------------------------------------------------------
    _stateAttributeName(cp) {
        switch (cp) {
            case unicode.CODE_POINTS.SPACE:
            case unicode.CODE_POINTS.LINE_FEED:
            case unicode.CODE_POINTS.TABULATION:
            case unicode.CODE_POINTS.FORM_FEED:
            case unicode.CODE_POINTS.SOLIDUS:
            case unicode.CODE_POINTS.GREATER_THAN_SIGN:
            case unicode.CODE_POINTS.EOF: {
                this._leaveAttrName();
                this.state = 33 /* State.AFTER_ATTRIBUTE_NAME */;
                this._stateAfterAttributeName(cp);
                break;
            }
            case unicode.CODE_POINTS.EQUALS_SIGN: {
                this._leaveAttrName();
                this.state = 34 /* State.BEFORE_ATTRIBUTE_VALUE */;
                break;
            }
            case unicode.CODE_POINTS.QUOTATION_MARK:
            case unicode.CODE_POINTS.APOSTROPHE:
            case unicode.CODE_POINTS.LESS_THAN_SIGN: {
                this._err(errorCodes.ERR.unexpectedCharacterInAttributeName);
                this.currentAttr.name += String.fromCodePoint(cp);
                break;
            }
            case unicode.CODE_POINTS.NULL: {
                this._err(errorCodes.ERR.unexpectedNullCharacter);
                this.currentAttr.name += unicode.REPLACEMENT_CHARACTER;
                break;
            }
            default: {
                this.currentAttr.name += String.fromCodePoint(cp);
            }
        }
    }
    // After attribute name state
    //------------------------------------------------------------------
    _stateAfterAttributeName(cp) {
        switch (cp) {
            case unicode.CODE_POINTS.SPACE:
            case unicode.CODE_POINTS.LINE_FEED:
            case unicode.CODE_POINTS.TABULATION:
            case unicode.CODE_POINTS.FORM_FEED: {
                // Ignore whitespace
                break;
            }
            case unicode.CODE_POINTS.SOLIDUS: {
                this.state = 39 /* State.SELF_CLOSING_START_TAG */;
                break;
            }
            case unicode.CODE_POINTS.EQUALS_SIGN: {
                this.state = 34 /* State.BEFORE_ATTRIBUTE_VALUE */;
                break;
            }
            case unicode.CODE_POINTS.GREATER_THAN_SIGN: {
                this.state = 0 /* State.DATA */;
                this.emitCurrentTagToken();
                break;
            }
            case unicode.CODE_POINTS.EOF: {
                this._err(errorCodes.ERR.eofInTag);
                this._emitEOFToken();
                break;
            }
            default: {
                this._createAttr('');
                this.state = 32 /* State.ATTRIBUTE_NAME */;
                this._stateAttributeName(cp);
            }
        }
    }
    // Before attribute value state
    //------------------------------------------------------------------
    _stateBeforeAttributeValue(cp) {
        switch (cp) {
            case unicode.CODE_POINTS.SPACE:
            case unicode.CODE_POINTS.LINE_FEED:
            case unicode.CODE_POINTS.TABULATION:
            case unicode.CODE_POINTS.FORM_FEED: {
                // Ignore whitespace
                break;
            }
            case unicode.CODE_POINTS.QUOTATION_MARK: {
                this.state = 35 /* State.ATTRIBUTE_VALUE_DOUBLE_QUOTED */;
                break;
            }
            case unicode.CODE_POINTS.APOSTROPHE: {
                this.state = 36 /* State.ATTRIBUTE_VALUE_SINGLE_QUOTED */;
                break;
            }
            case unicode.CODE_POINTS.GREATER_THAN_SIGN: {
                this._err(errorCodes.ERR.missingAttributeValue);
                this.state = 0 /* State.DATA */;
                this.emitCurrentTagToken();
                break;
            }
            default: {
                this.state = 37 /* State.ATTRIBUTE_VALUE_UNQUOTED */;
                this._stateAttributeValueUnquoted(cp);
            }
        }
    }
    // Attribute value (double-quoted) state
    //------------------------------------------------------------------
    _stateAttributeValueDoubleQuoted(cp) {
        switch (cp) {
            case unicode.CODE_POINTS.QUOTATION_MARK: {
                this.state = 38 /* State.AFTER_ATTRIBUTE_VALUE_QUOTED */;
                break;
            }
            case unicode.CODE_POINTS.AMPERSAND: {
                this.returnState = 35 /* State.ATTRIBUTE_VALUE_DOUBLE_QUOTED */;
                this.state = 71 /* State.CHARACTER_REFERENCE */;
                break;
            }
            case unicode.CODE_POINTS.NULL: {
                this._err(errorCodes.ERR.unexpectedNullCharacter);
                this.currentAttr.value += unicode.REPLACEMENT_CHARACTER;
                break;
            }
            case unicode.CODE_POINTS.EOF: {
                this._err(errorCodes.ERR.eofInTag);
                this._emitEOFToken();
                break;
            }
            default: {
                this.currentAttr.value += String.fromCodePoint(cp);
            }
        }
    }
    // Attribute value (single-quoted) state
    //------------------------------------------------------------------
    _stateAttributeValueSingleQuoted(cp) {
        switch (cp) {
            case unicode.CODE_POINTS.APOSTROPHE: {
                this.state = 38 /* State.AFTER_ATTRIBUTE_VALUE_QUOTED */;
                break;
            }
            case unicode.CODE_POINTS.AMPERSAND: {
                this.returnState = 36 /* State.ATTRIBUTE_VALUE_SINGLE_QUOTED */;
                this.state = 71 /* State.CHARACTER_REFERENCE */;
                break;
            }
            case unicode.CODE_POINTS.NULL: {
                this._err(errorCodes.ERR.unexpectedNullCharacter);
                this.currentAttr.value += unicode.REPLACEMENT_CHARACTER;
                break;
            }
            case unicode.CODE_POINTS.EOF: {
                this._err(errorCodes.ERR.eofInTag);
                this._emitEOFToken();
                break;
            }
            default: {
                this.currentAttr.value += String.fromCodePoint(cp);
            }
        }
    }
    // Attribute value (unquoted) state
    //------------------------------------------------------------------
    _stateAttributeValueUnquoted(cp) {
        switch (cp) {
            case unicode.CODE_POINTS.SPACE:
            case unicode.CODE_POINTS.LINE_FEED:
            case unicode.CODE_POINTS.TABULATION:
            case unicode.CODE_POINTS.FORM_FEED: {
                this._leaveAttrValue();
                this.state = 31 /* State.BEFORE_ATTRIBUTE_NAME */;
                break;
            }
            case unicode.CODE_POINTS.AMPERSAND: {
                this.returnState = 37 /* State.ATTRIBUTE_VALUE_UNQUOTED */;
                this.state = 71 /* State.CHARACTER_REFERENCE */;
                break;
            }
            case unicode.CODE_POINTS.GREATER_THAN_SIGN: {
                this._leaveAttrValue();
                this.state = 0 /* State.DATA */;
                this.emitCurrentTagToken();
                break;
            }
            case unicode.CODE_POINTS.NULL: {
                this._err(errorCodes.ERR.unexpectedNullCharacter);
                this.currentAttr.value += unicode.REPLACEMENT_CHARACTER;
                break;
            }
            case unicode.CODE_POINTS.QUOTATION_MARK:
            case unicode.CODE_POINTS.APOSTROPHE:
            case unicode.CODE_POINTS.LESS_THAN_SIGN:
            case unicode.CODE_POINTS.EQUALS_SIGN:
            case unicode.CODE_POINTS.GRAVE_ACCENT: {
                this._err(errorCodes.ERR.unexpectedCharacterInUnquotedAttributeValue);
                this.currentAttr.value += String.fromCodePoint(cp);
                break;
            }
            case unicode.CODE_POINTS.EOF: {
                this._err(errorCodes.ERR.eofInTag);
                this._emitEOFToken();
                break;
            }
            default: {
                this.currentAttr.value += String.fromCodePoint(cp);
            }
        }
    }
    // After attribute value (quoted) state
    //------------------------------------------------------------------
    _stateAfterAttributeValueQuoted(cp) {
        switch (cp) {
            case unicode.CODE_POINTS.SPACE:
            case unicode.CODE_POINTS.LINE_FEED:
            case unicode.CODE_POINTS.TABULATION:
            case unicode.CODE_POINTS.FORM_FEED: {
                this._leaveAttrValue();
                this.state = 31 /* State.BEFORE_ATTRIBUTE_NAME */;
                break;
            }
            case unicode.CODE_POINTS.SOLIDUS: {
                this._leaveAttrValue();
                this.state = 39 /* State.SELF_CLOSING_START_TAG */;
                break;
            }
            case unicode.CODE_POINTS.GREATER_THAN_SIGN: {
                this._leaveAttrValue();
                this.state = 0 /* State.DATA */;
                this.emitCurrentTagToken();
                break;
            }
            case unicode.CODE_POINTS.EOF: {
                this._err(errorCodes.ERR.eofInTag);
                this._emitEOFToken();
                break;
            }
            default: {
                this._err(errorCodes.ERR.missingWhitespaceBetweenAttributes);
                this.state = 31 /* State.BEFORE_ATTRIBUTE_NAME */;
                this._stateBeforeAttributeName(cp);
            }
        }
    }
    // Self-closing start tag state
    //------------------------------------------------------------------
    _stateSelfClosingStartTag(cp) {
        switch (cp) {
            case unicode.CODE_POINTS.GREATER_THAN_SIGN: {
                const token = this.currentToken;
                token.selfClosing = true;
                this.state = 0 /* State.DATA */;
                this.emitCurrentTagToken();
                break;
            }
            case unicode.CODE_POINTS.EOF: {
                this._err(errorCodes.ERR.eofInTag);
                this._emitEOFToken();
                break;
            }
            default: {
                this._err(errorCodes.ERR.unexpectedSolidusInTag);
                this.state = 31 /* State.BEFORE_ATTRIBUTE_NAME */;
                this._stateBeforeAttributeName(cp);
            }
        }
    }
    // Bogus comment state
    //------------------------------------------------------------------
    _stateBogusComment(cp) {
        const token = this.currentToken;
        switch (cp) {
            case unicode.CODE_POINTS.GREATER_THAN_SIGN: {
                this.state = 0 /* State.DATA */;
                this.emitCurrentComment(token);
                break;
            }
            case unicode.CODE_POINTS.EOF: {
                this.emitCurrentComment(token);
                this._emitEOFToken();
                break;
            }
            case unicode.CODE_POINTS.NULL: {
                this._err(errorCodes.ERR.unexpectedNullCharacter);
                token.data += unicode.REPLACEMENT_CHARACTER;
                break;
            }
            default: {
                token.data += String.fromCodePoint(cp);
            }
        }
    }
    // Markup declaration open state
    //------------------------------------------------------------------
    _stateMarkupDeclarationOpen(cp) {
        if (this._consumeSequenceIfMatch(unicode.SEQUENCES.DASH_DASH, true)) {
            this._createCommentToken(unicode.SEQUENCES.DASH_DASH.length + 1);
            this.state = 42 /* State.COMMENT_START */;
        }
        else if (this._consumeSequenceIfMatch(unicode.SEQUENCES.DOCTYPE, false)) {
            // NOTE: Doctypes tokens are created without fixed offsets. We keep track of the moment a doctype *might* start here.
            this.currentLocation = this.getCurrentLocation(unicode.SEQUENCES.DOCTYPE.length + 1);
            this.state = 52 /* State.DOCTYPE */;
        }
        else if (this._consumeSequenceIfMatch(unicode.SEQUENCES.CDATA_START, true)) {
            if (this.inForeignNode) {
                this.state = 68 /* State.CDATA_SECTION */;
            }
            else {
                this._err(errorCodes.ERR.cdataInHtmlContent);
                this._createCommentToken(unicode.SEQUENCES.CDATA_START.length + 1);
                this.currentToken.data = '[CDATA[';
                this.state = 40 /* State.BOGUS_COMMENT */;
            }
        }
        //NOTE: Sequence lookups can be abrupted by hibernation. In that case, lookup
        //results are no longer valid and we will need to start over.
        else if (!this._ensureHibernation()) {
            this._err(errorCodes.ERR.incorrectlyOpenedComment);
            this._createCommentToken(2);
            this.state = 40 /* State.BOGUS_COMMENT */;
            this._stateBogusComment(cp);
        }
    }
    // Comment start state
    //------------------------------------------------------------------
    _stateCommentStart(cp) {
        switch (cp) {
            case unicode.CODE_POINTS.HYPHEN_MINUS: {
                this.state = 43 /* State.COMMENT_START_DASH */;
                break;
            }
            case unicode.CODE_POINTS.GREATER_THAN_SIGN: {
                this._err(errorCodes.ERR.abruptClosingOfEmptyComment);
                this.state = 0 /* State.DATA */;
                const token = this.currentToken;
                this.emitCurrentComment(token);
                break;
            }
            default: {
                this.state = 44 /* State.COMMENT */;
                this._stateComment(cp);
            }
        }
    }
    // Comment start dash state
    //------------------------------------------------------------------
    _stateCommentStartDash(cp) {
        const token = this.currentToken;
        switch (cp) {
            case unicode.CODE_POINTS.HYPHEN_MINUS: {
                this.state = 50 /* State.COMMENT_END */;
                break;
            }
            case unicode.CODE_POINTS.GREATER_THAN_SIGN: {
                this._err(errorCodes.ERR.abruptClosingOfEmptyComment);
                this.state = 0 /* State.DATA */;
                this.emitCurrentComment(token);
                break;
            }
            case unicode.CODE_POINTS.EOF: {
                this._err(errorCodes.ERR.eofInComment);
                this.emitCurrentComment(token);
                this._emitEOFToken();
                break;
            }
            default: {
                token.data += '-';
                this.state = 44 /* State.COMMENT */;
                this._stateComment(cp);
            }
        }
    }
    // Comment state
    //------------------------------------------------------------------
    _stateComment(cp) {
        const token = this.currentToken;
        switch (cp) {
            case unicode.CODE_POINTS.HYPHEN_MINUS: {
                this.state = 49 /* State.COMMENT_END_DASH */;
                break;
            }
            case unicode.CODE_POINTS.LESS_THAN_SIGN: {
                token.data += '<';
                this.state = 45 /* State.COMMENT_LESS_THAN_SIGN */;
                break;
            }
            case unicode.CODE_POINTS.NULL: {
                this._err(errorCodes.ERR.unexpectedNullCharacter);
                token.data += unicode.REPLACEMENT_CHARACTER;
                break;
            }
            case unicode.CODE_POINTS.EOF: {
                this._err(errorCodes.ERR.eofInComment);
                this.emitCurrentComment(token);
                this._emitEOFToken();
                break;
            }
            default: {
                token.data += String.fromCodePoint(cp);
            }
        }
    }
    // Comment less-than sign state
    //------------------------------------------------------------------
    _stateCommentLessThanSign(cp) {
        const token = this.currentToken;
        switch (cp) {
            case unicode.CODE_POINTS.EXCLAMATION_MARK: {
                token.data += '!';
                this.state = 46 /* State.COMMENT_LESS_THAN_SIGN_BANG */;
                break;
            }
            case unicode.CODE_POINTS.LESS_THAN_SIGN: {
                token.data += '<';
                break;
            }
            default: {
                this.state = 44 /* State.COMMENT */;
                this._stateComment(cp);
            }
        }
    }
    // Comment less-than sign bang state
    //------------------------------------------------------------------
    _stateCommentLessThanSignBang(cp) {
        if (cp === unicode.CODE_POINTS.HYPHEN_MINUS) {
            this.state = 47 /* State.COMMENT_LESS_THAN_SIGN_BANG_DASH */;
        }
        else {
            this.state = 44 /* State.COMMENT */;
            this._stateComment(cp);
        }
    }
    // Comment less-than sign bang dash state
    //------------------------------------------------------------------
    _stateCommentLessThanSignBangDash(cp) {
        if (cp === unicode.CODE_POINTS.HYPHEN_MINUS) {
            this.state = 48 /* State.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH */;
        }
        else {
            this.state = 49 /* State.COMMENT_END_DASH */;
            this._stateCommentEndDash(cp);
        }
    }
    // Comment less-than sign bang dash dash state
    //------------------------------------------------------------------
    _stateCommentLessThanSignBangDashDash(cp) {
        if (cp !== unicode.CODE_POINTS.GREATER_THAN_SIGN && cp !== unicode.CODE_POINTS.EOF) {
            this._err(errorCodes.ERR.nestedComment);
        }
        this.state = 50 /* State.COMMENT_END */;
        this._stateCommentEnd(cp);
    }
    // Comment end dash state
    //------------------------------------------------------------------
    _stateCommentEndDash(cp) {
        const token = this.currentToken;
        switch (cp) {
            case unicode.CODE_POINTS.HYPHEN_MINUS: {
                this.state = 50 /* State.COMMENT_END */;
                break;
            }
            case unicode.CODE_POINTS.EOF: {
                this._err(errorCodes.ERR.eofInComment);
                this.emitCurrentComment(token);
                this._emitEOFToken();
                break;
            }
            default: {
                token.data += '-';
                this.state = 44 /* State.COMMENT */;
                this._stateComment(cp);
            }
        }
    }
    // Comment end state
    //------------------------------------------------------------------
    _stateCommentEnd(cp) {
        const token = this.currentToken;
        switch (cp) {
            case unicode.CODE_POINTS.GREATER_THAN_SIGN: {
                this.state = 0 /* State.DATA */;
                this.emitCurrentComment(token);
                break;
            }
            case unicode.CODE_POINTS.EXCLAMATION_MARK: {
                this.state = 51 /* State.COMMENT_END_BANG */;
                break;
            }
            case unicode.CODE_POINTS.HYPHEN_MINUS: {
                token.data += '-';
                break;
            }
            case unicode.CODE_POINTS.EOF: {
                this._err(errorCodes.ERR.eofInComment);
                this.emitCurrentComment(token);
                this._emitEOFToken();
                break;
            }
            default: {
                token.data += '--';
                this.state = 44 /* State.COMMENT */;
                this._stateComment(cp);
            }
        }
    }
    // Comment end bang state
    //------------------------------------------------------------------
    _stateCommentEndBang(cp) {
        const token = this.currentToken;
        switch (cp) {
            case unicode.CODE_POINTS.HYPHEN_MINUS: {
                token.data += '--!';
                this.state = 49 /* State.COMMENT_END_DASH */;
                break;
            }
            case unicode.CODE_POINTS.GREATER_THAN_SIGN: {
                this._err(errorCodes.ERR.incorrectlyClosedComment);
                this.state = 0 /* State.DATA */;
                this.emitCurrentComment(token);
                break;
            }
            case unicode.CODE_POINTS.EOF: {
                this._err(errorCodes.ERR.eofInComment);
                this.emitCurrentComment(token);
                this._emitEOFToken();
                break;
            }
            default: {
                token.data += '--!';
                this.state = 44 /* State.COMMENT */;
                this._stateComment(cp);
            }
        }
    }
    // DOCTYPE state
    //------------------------------------------------------------------
    _stateDoctype(cp) {
        switch (cp) {
            case unicode.CODE_POINTS.SPACE:
            case unicode.CODE_POINTS.LINE_FEED:
            case unicode.CODE_POINTS.TABULATION:
            case unicode.CODE_POINTS.FORM_FEED: {
                this.state = 53 /* State.BEFORE_DOCTYPE_NAME */;
                break;
            }
            case unicode.CODE_POINTS.GREATER_THAN_SIGN: {
                this.state = 53 /* State.BEFORE_DOCTYPE_NAME */;
                this._stateBeforeDoctypeName(cp);
                break;
            }
            case unicode.CODE_POINTS.EOF: {
                this._err(errorCodes.ERR.eofInDoctype);
                this._createDoctypeToken(null);
                const token = this.currentToken;
                token.forceQuirks = true;
                this.emitCurrentDoctype(token);
                this._emitEOFToken();
                break;
            }
            default: {
                this._err(errorCodes.ERR.missingWhitespaceBeforeDoctypeName);
                this.state = 53 /* State.BEFORE_DOCTYPE_NAME */;
                this._stateBeforeDoctypeName(cp);
            }
        }
    }
    // Before DOCTYPE name state
    //------------------------------------------------------------------
    _stateBeforeDoctypeName(cp) {
        if (isAsciiUpper(cp)) {
            this._createDoctypeToken(String.fromCharCode(toAsciiLower(cp)));
            this.state = 54 /* State.DOCTYPE_NAME */;
        }
        else
            switch (cp) {
                case unicode.CODE_POINTS.SPACE:
                case unicode.CODE_POINTS.LINE_FEED:
                case unicode.CODE_POINTS.TABULATION:
                case unicode.CODE_POINTS.FORM_FEED: {
                    // Ignore whitespace
                    break;
                }
                case unicode.CODE_POINTS.NULL: {
                    this._err(errorCodes.ERR.unexpectedNullCharacter);
                    this._createDoctypeToken(unicode.REPLACEMENT_CHARACTER);
                    this.state = 54 /* State.DOCTYPE_NAME */;
                    break;
                }
                case unicode.CODE_POINTS.GREATER_THAN_SIGN: {
                    this._err(errorCodes.ERR.missingDoctypeName);
                    this._createDoctypeToken(null);
                    const token = this.currentToken;
                    token.forceQuirks = true;
                    this.emitCurrentDoctype(token);
                    this.state = 0 /* State.DATA */;
                    break;
                }
                case unicode.CODE_POINTS.EOF: {
                    this._err(errorCodes.ERR.eofInDoctype);
                    this._createDoctypeToken(null);
                    const token = this.currentToken;
                    token.forceQuirks = true;
                    this.emitCurrentDoctype(token);
                    this._emitEOFToken();
                    break;
                }
                default: {
                    this._createDoctypeToken(String.fromCodePoint(cp));
                    this.state = 54 /* State.DOCTYPE_NAME */;
                }
            }
    }
    // DOCTYPE name state
    //------------------------------------------------------------------
    _stateDoctypeName(cp) {
        const token = this.currentToken;
        switch (cp) {
            case unicode.CODE_POINTS.SPACE:
            case unicode.CODE_POINTS.LINE_FEED:
            case unicode.CODE_POINTS.TABULATION:
            case unicode.CODE_POINTS.FORM_FEED: {
                this.state = 55 /* State.AFTER_DOCTYPE_NAME */;
                break;
            }
            case unicode.CODE_POINTS.GREATER_THAN_SIGN: {
                this.state = 0 /* State.DATA */;
                this.emitCurrentDoctype(token);
                break;
            }
            case unicode.CODE_POINTS.NULL: {
                this._err(errorCodes.ERR.unexpectedNullCharacter);
                token.name += unicode.REPLACEMENT_CHARACTER;
                break;
            }
            case unicode.CODE_POINTS.EOF: {
                this._err(errorCodes.ERR.eofInDoctype);
                token.forceQuirks = true;
                this.emitCurrentDoctype(token);
                this._emitEOFToken();
                break;
            }
            default: {
                token.name += String.fromCodePoint(cp);
            }
        }
    }
    // After DOCTYPE name state
    //------------------------------------------------------------------
    _stateAfterDoctypeName(cp) {
        const token = this.currentToken;
        switch (cp) {
            case unicode.CODE_POINTS.SPACE:
            case unicode.CODE_POINTS.LINE_FEED:
            case unicode.CODE_POINTS.TABULATION:
            case unicode.CODE_POINTS.FORM_FEED: {
                // Ignore whitespace
                break;
            }
            case unicode.CODE_POINTS.GREATER_THAN_SIGN: {
                this.state = 0 /* State.DATA */;
                this.emitCurrentDoctype(token);
                break;
            }
            case unicode.CODE_POINTS.EOF: {
                this._err(errorCodes.ERR.eofInDoctype);
                token.forceQuirks = true;
                this.emitCurrentDoctype(token);
                this._emitEOFToken();
                break;
            }
            default:
                if (this._consumeSequenceIfMatch(unicode.SEQUENCES.PUBLIC, false)) {
                    this.state = 56 /* State.AFTER_DOCTYPE_PUBLIC_KEYWORD */;
                }
                else if (this._consumeSequenceIfMatch(unicode.SEQUENCES.SYSTEM, false)) {
                    this.state = 62 /* State.AFTER_DOCTYPE_SYSTEM_KEYWORD */;
                }
                //NOTE: sequence lookup can be abrupted by hibernation. In that case lookup
                //results are no longer valid and we will need to start over.
                else if (!this._ensureHibernation()) {
                    this._err(errorCodes.ERR.invalidCharacterSequenceAfterDoctypeName);
                    token.forceQuirks = true;
                    this.state = 67 /* State.BOGUS_DOCTYPE */;
                    this._stateBogusDoctype(cp);
                }
        }
    }
    // After DOCTYPE public keyword state
    //------------------------------------------------------------------
    _stateAfterDoctypePublicKeyword(cp) {
        const token = this.currentToken;
        switch (cp) {
            case unicode.CODE_POINTS.SPACE:
            case unicode.CODE_POINTS.LINE_FEED:
            case unicode.CODE_POINTS.TABULATION:
            case unicode.CODE_POINTS.FORM_FEED: {
                this.state = 57 /* State.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER */;
                break;
            }
            case unicode.CODE_POINTS.QUOTATION_MARK: {
                this._err(errorCodes.ERR.missingWhitespaceAfterDoctypePublicKeyword);
                token.publicId = '';
                this.state = 58 /* State.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED */;
                break;
            }
            case unicode.CODE_POINTS.APOSTROPHE: {
                this._err(errorCodes.ERR.missingWhitespaceAfterDoctypePublicKeyword);
                token.publicId = '';
                this.state = 59 /* State.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED */;
                break;
            }
            case unicode.CODE_POINTS.GREATER_THAN_SIGN: {
                this._err(errorCodes.ERR.missingDoctypePublicIdentifier);
                token.forceQuirks = true;
                this.state = 0 /* State.DATA */;
                this.emitCurrentDoctype(token);
                break;
            }
            case unicode.CODE_POINTS.EOF: {
                this._err(errorCodes.ERR.eofInDoctype);
                token.forceQuirks = true;
                this.emitCurrentDoctype(token);
                this._emitEOFToken();
                break;
            }
            default: {
                this._err(errorCodes.ERR.missingQuoteBeforeDoctypePublicIdentifier);
                token.forceQuirks = true;
                this.state = 67 /* State.BOGUS_DOCTYPE */;
                this._stateBogusDoctype(cp);
            }
        }
    }
    // Before DOCTYPE public identifier state
    //------------------------------------------------------------------
    _stateBeforeDoctypePublicIdentifier(cp) {
        const token = this.currentToken;
        switch (cp) {
            case unicode.CODE_POINTS.SPACE:
            case unicode.CODE_POINTS.LINE_FEED:
            case unicode.CODE_POINTS.TABULATION:
            case unicode.CODE_POINTS.FORM_FEED: {
                // Ignore whitespace
                break;
            }
            case unicode.CODE_POINTS.QUOTATION_MARK: {
                token.publicId = '';
                this.state = 58 /* State.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED */;
                break;
            }
            case unicode.CODE_POINTS.APOSTROPHE: {
                token.publicId = '';
                this.state = 59 /* State.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED */;
                break;
            }
            case unicode.CODE_POINTS.GREATER_THAN_SIGN: {
                this._err(errorCodes.ERR.missingDoctypePublicIdentifier);
                token.forceQuirks = true;
                this.state = 0 /* State.DATA */;
                this.emitCurrentDoctype(token);
                break;
            }
            case unicode.CODE_POINTS.EOF: {
                this._err(errorCodes.ERR.eofInDoctype);
                token.forceQuirks = true;
                this.emitCurrentDoctype(token);
                this._emitEOFToken();
                break;
            }
            default: {
                this._err(errorCodes.ERR.missingQuoteBeforeDoctypePublicIdentifier);
                token.forceQuirks = true;
                this.state = 67 /* State.BOGUS_DOCTYPE */;
                this._stateBogusDoctype(cp);
            }
        }
    }
    // DOCTYPE public identifier (double-quoted) state
    //------------------------------------------------------------------
    _stateDoctypePublicIdentifierDoubleQuoted(cp) {
        const token = this.currentToken;
        switch (cp) {
            case unicode.CODE_POINTS.QUOTATION_MARK: {
                this.state = 60 /* State.AFTER_DOCTYPE_PUBLIC_IDENTIFIER */;
                break;
            }
            case unicode.CODE_POINTS.NULL: {
                this._err(errorCodes.ERR.unexpectedNullCharacter);
                token.publicId += unicode.REPLACEMENT_CHARACTER;
                break;
            }
            case unicode.CODE_POINTS.GREATER_THAN_SIGN: {
                this._err(errorCodes.ERR.abruptDoctypePublicIdentifier);
                token.forceQuirks = true;
                this.emitCurrentDoctype(token);
                this.state = 0 /* State.DATA */;
                break;
            }
            case unicode.CODE_POINTS.EOF: {
                this._err(errorCodes.ERR.eofInDoctype);
                token.forceQuirks = true;
                this.emitCurrentDoctype(token);
                this._emitEOFToken();
                break;
            }
            default: {
                token.publicId += String.fromCodePoint(cp);
            }
        }
    }
    // DOCTYPE public identifier (single-quoted) state
    //------------------------------------------------------------------
    _stateDoctypePublicIdentifierSingleQuoted(cp) {
        const token = this.currentToken;
        switch (cp) {
            case unicode.CODE_POINTS.APOSTROPHE: {
                this.state = 60 /* State.AFTER_DOCTYPE_PUBLIC_IDENTIFIER */;
                break;
            }
            case unicode.CODE_POINTS.NULL: {
                this._err(errorCodes.ERR.unexpectedNullCharacter);
                token.publicId += unicode.REPLACEMENT_CHARACTER;
                break;
            }
            case unicode.CODE_POINTS.GREATER_THAN_SIGN: {
                this._err(errorCodes.ERR.abruptDoctypePublicIdentifier);
                token.forceQuirks = true;
                this.emitCurrentDoctype(token);
                this.state = 0 /* State.DATA */;
                break;
            }
            case unicode.CODE_POINTS.EOF: {
                this._err(errorCodes.ERR.eofInDoctype);
                token.forceQuirks = true;
                this.emitCurrentDoctype(token);
                this._emitEOFToken();
                break;
            }
            default: {
                token.publicId += String.fromCodePoint(cp);
            }
        }
    }
    // After DOCTYPE public identifier state
    //------------------------------------------------------------------
    _stateAfterDoctypePublicIdentifier(cp) {
        const token = this.currentToken;
        switch (cp) {
            case unicode.CODE_POINTS.SPACE:
            case unicode.CODE_POINTS.LINE_FEED:
            case unicode.CODE_POINTS.TABULATION:
            case unicode.CODE_POINTS.FORM_FEED: {
                this.state = 61 /* State.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS */;
                break;
            }
            case unicode.CODE_POINTS.GREATER_THAN_SIGN: {
                this.state = 0 /* State.DATA */;
                this.emitCurrentDoctype(token);
                break;
            }
            case unicode.CODE_POINTS.QUOTATION_MARK: {
                this._err(errorCodes.ERR.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers);
                token.systemId = '';
                this.state = 64 /* State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED */;
                break;
            }
            case unicode.CODE_POINTS.APOSTROPHE: {
                this._err(errorCodes.ERR.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers);
                token.systemId = '';
                this.state = 65 /* State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED */;
                break;
            }
            case unicode.CODE_POINTS.EOF: {
                this._err(errorCodes.ERR.eofInDoctype);
                token.forceQuirks = true;
                this.emitCurrentDoctype(token);
                this._emitEOFToken();
                break;
            }
            default: {
                this._err(errorCodes.ERR.missingQuoteBeforeDoctypeSystemIdentifier);
                token.forceQuirks = true;
                this.state = 67 /* State.BOGUS_DOCTYPE */;
                this._stateBogusDoctype(cp);
            }
        }
    }
    // Between DOCTYPE public and system identifiers state
    //------------------------------------------------------------------
    _stateBetweenDoctypePublicAndSystemIdentifiers(cp) {
        const token = this.currentToken;
        switch (cp) {
            case unicode.CODE_POINTS.SPACE:
            case unicode.CODE_POINTS.LINE_FEED:
            case unicode.CODE_POINTS.TABULATION:
            case unicode.CODE_POINTS.FORM_FEED: {
                // Ignore whitespace
                break;
            }
            case unicode.CODE_POINTS.GREATER_THAN_SIGN: {
                this.emitCurrentDoctype(token);
                this.state = 0 /* State.DATA */;
                break;
            }
            case unicode.CODE_POINTS.QUOTATION_MARK: {
                token.systemId = '';
                this.state = 64 /* State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED */;
                break;
            }
            case unicode.CODE_POINTS.APOSTROPHE: {
                token.systemId = '';
                this.state = 65 /* State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED */;
                break;
            }
            case unicode.CODE_POINTS.EOF: {
                this._err(errorCodes.ERR.eofInDoctype);
                token.forceQuirks = true;
                this.emitCurrentDoctype(token);
                this._emitEOFToken();
                break;
            }
            default: {
                this._err(errorCodes.ERR.missingQuoteBeforeDoctypeSystemIdentifier);
                token.forceQuirks = true;
                this.state = 67 /* State.BOGUS_DOCTYPE */;
                this._stateBogusDoctype(cp);
            }
        }
    }
    // After DOCTYPE system keyword state
    //------------------------------------------------------------------
    _stateAfterDoctypeSystemKeyword(cp) {
        const token = this.currentToken;
        switch (cp) {
            case unicode.CODE_POINTS.SPACE:
            case unicode.CODE_POINTS.LINE_FEED:
            case unicode.CODE_POINTS.TABULATION:
            case unicode.CODE_POINTS.FORM_FEED: {
                this.state = 63 /* State.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER */;
                break;
            }
            case unicode.CODE_POINTS.QUOTATION_MARK: {
                this._err(errorCodes.ERR.missingWhitespaceAfterDoctypeSystemKeyword);
                token.systemId = '';
                this.state = 64 /* State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED */;
                break;
            }
            case unicode.CODE_POINTS.APOSTROPHE: {
                this._err(errorCodes.ERR.missingWhitespaceAfterDoctypeSystemKeyword);
                token.systemId = '';
                this.state = 65 /* State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED */;
                break;
            }
            case unicode.CODE_POINTS.GREATER_THAN_SIGN: {
                this._err(errorCodes.ERR.missingDoctypeSystemIdentifier);
                token.forceQuirks = true;
                this.state = 0 /* State.DATA */;
                this.emitCurrentDoctype(token);
                break;
            }
            case unicode.CODE_POINTS.EOF: {
                this._err(errorCodes.ERR.eofInDoctype);
                token.forceQuirks = true;
                this.emitCurrentDoctype(token);
                this._emitEOFToken();
                break;
            }
            default: {
                this._err(errorCodes.ERR.missingQuoteBeforeDoctypeSystemIdentifier);
                token.forceQuirks = true;
                this.state = 67 /* State.BOGUS_DOCTYPE */;
                this._stateBogusDoctype(cp);
            }
        }
    }
    // Before DOCTYPE system identifier state
    //------------------------------------------------------------------
    _stateBeforeDoctypeSystemIdentifier(cp) {
        const token = this.currentToken;
        switch (cp) {
            case unicode.CODE_POINTS.SPACE:
            case unicode.CODE_POINTS.LINE_FEED:
            case unicode.CODE_POINTS.TABULATION:
            case unicode.CODE_POINTS.FORM_FEED: {
                // Ignore whitespace
                break;
            }
            case unicode.CODE_POINTS.QUOTATION_MARK: {
                token.systemId = '';
                this.state = 64 /* State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED */;
                break;
            }
            case unicode.CODE_POINTS.APOSTROPHE: {
                token.systemId = '';
                this.state = 65 /* State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED */;
                break;
            }
            case unicode.CODE_POINTS.GREATER_THAN_SIGN: {
                this._err(errorCodes.ERR.missingDoctypeSystemIdentifier);
                token.forceQuirks = true;
                this.state = 0 /* State.DATA */;
                this.emitCurrentDoctype(token);
                break;
            }
            case unicode.CODE_POINTS.EOF: {
                this._err(errorCodes.ERR.eofInDoctype);
                token.forceQuirks = true;
                this.emitCurrentDoctype(token);
                this._emitEOFToken();
                break;
            }
            default: {
                this._err(errorCodes.ERR.missingQuoteBeforeDoctypeSystemIdentifier);
                token.forceQuirks = true;
                this.state = 67 /* State.BOGUS_DOCTYPE */;
                this._stateBogusDoctype(cp);
            }
        }
    }
    // DOCTYPE system identifier (double-quoted) state
    //------------------------------------------------------------------
    _stateDoctypeSystemIdentifierDoubleQuoted(cp) {
        const token = this.currentToken;
        switch (cp) {
            case unicode.CODE_POINTS.QUOTATION_MARK: {
                this.state = 66 /* State.AFTER_DOCTYPE_SYSTEM_IDENTIFIER */;
                break;
            }
            case unicode.CODE_POINTS.NULL: {
                this._err(errorCodes.ERR.unexpectedNullCharacter);
                token.systemId += unicode.REPLACEMENT_CHARACTER;
                break;
            }
            case unicode.CODE_POINTS.GREATER_THAN_SIGN: {
                this._err(errorCodes.ERR.abruptDoctypeSystemIdentifier);
                token.forceQuirks = true;
                this.emitCurrentDoctype(token);
                this.state = 0 /* State.DATA */;
                break;
            }
            case unicode.CODE_POINTS.EOF: {
                this._err(errorCodes.ERR.eofInDoctype);
                token.forceQuirks = true;
                this.emitCurrentDoctype(token);
                this._emitEOFToken();
                break;
            }
            default: {
                token.systemId += String.fromCodePoint(cp);
            }
        }
    }
    // DOCTYPE system identifier (single-quoted) state
    //------------------------------------------------------------------
    _stateDoctypeSystemIdentifierSingleQuoted(cp) {
        const token = this.currentToken;
        switch (cp) {
            case unicode.CODE_POINTS.APOSTROPHE: {
                this.state = 66 /* State.AFTER_DOCTYPE_SYSTEM_IDENTIFIER */;
                break;
            }
            case unicode.CODE_POINTS.NULL: {
                this._err(errorCodes.ERR.unexpectedNullCharacter);
                token.systemId += unicode.REPLACEMENT_CHARACTER;
                break;
            }
            case unicode.CODE_POINTS.GREATER_THAN_SIGN: {
                this._err(errorCodes.ERR.abruptDoctypeSystemIdentifier);
                token.forceQuirks = true;
                this.emitCurrentDoctype(token);
                this.state = 0 /* State.DATA */;
                break;
            }
            case unicode.CODE_POINTS.EOF: {
                this._err(errorCodes.ERR.eofInDoctype);
                token.forceQuirks = true;
                this.emitCurrentDoctype(token);
                this._emitEOFToken();
                break;
            }
            default: {
                token.systemId += String.fromCodePoint(cp);
            }
        }
    }
    // After DOCTYPE system identifier state
    //------------------------------------------------------------------
    _stateAfterDoctypeSystemIdentifier(cp) {
        const token = this.currentToken;
        switch (cp) {
            case unicode.CODE_POINTS.SPACE:
            case unicode.CODE_POINTS.LINE_FEED:
            case unicode.CODE_POINTS.TABULATION:
            case unicode.CODE_POINTS.FORM_FEED: {
                // Ignore whitespace
                break;
            }
            case unicode.CODE_POINTS.GREATER_THAN_SIGN: {
                this.emitCurrentDoctype(token);
                this.state = 0 /* State.DATA */;
                break;
            }
            case unicode.CODE_POINTS.EOF: {
                this._err(errorCodes.ERR.eofInDoctype);
                token.forceQuirks = true;
                this.emitCurrentDoctype(token);
                this._emitEOFToken();
                break;
            }
            default: {
                this._err(errorCodes.ERR.unexpectedCharacterAfterDoctypeSystemIdentifier);
                this.state = 67 /* State.BOGUS_DOCTYPE */;
                this._stateBogusDoctype(cp);
            }
        }
    }
    // Bogus DOCTYPE state
    //------------------------------------------------------------------
    _stateBogusDoctype(cp) {
        const token = this.currentToken;
        switch (cp) {
            case unicode.CODE_POINTS.GREATER_THAN_SIGN: {
                this.emitCurrentDoctype(token);
                this.state = 0 /* State.DATA */;
                break;
            }
            case unicode.CODE_POINTS.NULL: {
                this._err(errorCodes.ERR.unexpectedNullCharacter);
                break;
            }
            case unicode.CODE_POINTS.EOF: {
                this.emitCurrentDoctype(token);
                this._emitEOFToken();
                break;
            }
            // Do nothing
        }
    }
    // CDATA section state
    //------------------------------------------------------------------
    _stateCdataSection(cp) {
        switch (cp) {
            case unicode.CODE_POINTS.RIGHT_SQUARE_BRACKET: {
                this.state = 69 /* State.CDATA_SECTION_BRACKET */;
                break;
            }
            case unicode.CODE_POINTS.EOF: {
                this._err(errorCodes.ERR.eofInCdata);
                this._emitEOFToken();
                break;
            }
            default: {
                this._emitCodePoint(cp);
            }
        }
    }
    // CDATA section bracket state
    //------------------------------------------------------------------
    _stateCdataSectionBracket(cp) {
        if (cp === unicode.CODE_POINTS.RIGHT_SQUARE_BRACKET) {
            this.state = 70 /* State.CDATA_SECTION_END */;
        }
        else {
            this._emitChars(']');
            this.state = 68 /* State.CDATA_SECTION */;
            this._stateCdataSection(cp);
        }
    }
    // CDATA section end state
    //------------------------------------------------------------------
    _stateCdataSectionEnd(cp) {
        switch (cp) {
            case unicode.CODE_POINTS.GREATER_THAN_SIGN: {
                this.state = 0 /* State.DATA */;
                break;
            }
            case unicode.CODE_POINTS.RIGHT_SQUARE_BRACKET: {
                this._emitChars(']');
                break;
            }
            default: {
                this._emitChars(']]');
                this.state = 68 /* State.CDATA_SECTION */;
                this._stateCdataSection(cp);
            }
        }
    }
    // Character reference state
    //------------------------------------------------------------------
    _stateCharacterReference(cp) {
        if (cp === unicode.CODE_POINTS.NUMBER_SIGN) {
            this.state = 74 /* State.NUMERIC_CHARACTER_REFERENCE */;
        }
        else if (isAsciiAlphaNumeric(cp)) {
            this.state = 72 /* State.NAMED_CHARACTER_REFERENCE */;
            this._stateNamedCharacterReference(cp);
        }
        else {
            this._flushCodePointConsumedAsCharacterReference(unicode.CODE_POINTS.AMPERSAND);
            this._reconsumeInState(this.returnState, cp);
        }
    }
    // Named character reference state
    //------------------------------------------------------------------
    _stateNamedCharacterReference(cp) {
        const matchResult = this._matchNamedCharacterReference(cp);
        //NOTE: Matching can be abrupted by hibernation. In that case, match
        //results are no longer valid and we will need to start over.
        if (this._ensureHibernation()) ;
        else if (matchResult) {
            for (let i = 0; i < matchResult.length; i++) {
                this._flushCodePointConsumedAsCharacterReference(matchResult[i]);
            }
            this.state = this.returnState;
        }
        else {
            this._flushCodePointConsumedAsCharacterReference(unicode.CODE_POINTS.AMPERSAND);
            this.state = 73 /* State.AMBIGUOUS_AMPERSAND */;
        }
    }
    // Ambiguos ampersand state
    //------------------------------------------------------------------
    _stateAmbiguousAmpersand(cp) {
        if (isAsciiAlphaNumeric(cp)) {
            this._flushCodePointConsumedAsCharacterReference(cp);
        }
        else {
            if (cp === unicode.CODE_POINTS.SEMICOLON) {
                this._err(errorCodes.ERR.unknownNamedCharacterReference);
            }
            this._reconsumeInState(this.returnState, cp);
        }
    }
    // Numeric character reference state
    //------------------------------------------------------------------
    _stateNumericCharacterReference(cp) {
        this.charRefCode = 0;
        if (cp === unicode.CODE_POINTS.LATIN_SMALL_X || cp === unicode.CODE_POINTS.LATIN_CAPITAL_X) {
            this.state = 75 /* State.HEXADEMICAL_CHARACTER_REFERENCE_START */;
        }
        // Inlined decimal character reference start state
        else if (isAsciiDigit(cp)) {
            this.state = 77 /* State.DECIMAL_CHARACTER_REFERENCE */;
            this._stateDecimalCharacterReference(cp);
        }
        else {
            this._err(errorCodes.ERR.absenceOfDigitsInNumericCharacterReference);
            this._flushCodePointConsumedAsCharacterReference(unicode.CODE_POINTS.AMPERSAND);
            this._flushCodePointConsumedAsCharacterReference(unicode.CODE_POINTS.NUMBER_SIGN);
            this._reconsumeInState(this.returnState, cp);
        }
    }
    // Hexademical character reference start state
    //------------------------------------------------------------------
    _stateHexademicalCharacterReferenceStart(cp) {
        if (isAsciiHexDigit(cp)) {
            this.state = 76 /* State.HEXADEMICAL_CHARACTER_REFERENCE */;
            this._stateHexademicalCharacterReference(cp);
        }
        else {
            this._err(errorCodes.ERR.absenceOfDigitsInNumericCharacterReference);
            this._flushCodePointConsumedAsCharacterReference(unicode.CODE_POINTS.AMPERSAND);
            this._flushCodePointConsumedAsCharacterReference(unicode.CODE_POINTS.NUMBER_SIGN);
            this._unconsume(2);
            this.state = this.returnState;
        }
    }
    // Hexademical character reference state
    //------------------------------------------------------------------
    _stateHexademicalCharacterReference(cp) {
        if (isAsciiUpperHexDigit(cp)) {
            this.charRefCode = this.charRefCode * 16 + cp - 0x37;
        }
        else if (isAsciiLowerHexDigit(cp)) {
            this.charRefCode = this.charRefCode * 16 + cp - 0x57;
        }
        else if (isAsciiDigit(cp)) {
            this.charRefCode = this.charRefCode * 16 + cp - 0x30;
        }
        else if (cp === unicode.CODE_POINTS.SEMICOLON) {
            this.state = 78 /* State.NUMERIC_CHARACTER_REFERENCE_END */;
        }
        else {
            this._err(errorCodes.ERR.missingSemicolonAfterCharacterReference);
            this.state = 78 /* State.NUMERIC_CHARACTER_REFERENCE_END */;
            this._stateNumericCharacterReferenceEnd(cp);
        }
    }
    // Decimal character reference state
    //------------------------------------------------------------------
    _stateDecimalCharacterReference(cp) {
        if (isAsciiDigit(cp)) {
            this.charRefCode = this.charRefCode * 10 + cp - 0x30;
        }
        else if (cp === unicode.CODE_POINTS.SEMICOLON) {
            this.state = 78 /* State.NUMERIC_CHARACTER_REFERENCE_END */;
        }
        else {
            this._err(errorCodes.ERR.missingSemicolonAfterCharacterReference);
            this.state = 78 /* State.NUMERIC_CHARACTER_REFERENCE_END */;
            this._stateNumericCharacterReferenceEnd(cp);
        }
    }
    // Numeric character reference end state
    //------------------------------------------------------------------
    _stateNumericCharacterReferenceEnd(cp) {
        if (this.charRefCode === unicode.CODE_POINTS.NULL) {
            this._err(errorCodes.ERR.nullCharacterReference);
            this.charRefCode = unicode.CODE_POINTS.REPLACEMENT_CHARACTER;
        }
        else if (this.charRefCode > 1114111) {
            this._err(errorCodes.ERR.characterReferenceOutsideUnicodeRange);
            this.charRefCode = unicode.CODE_POINTS.REPLACEMENT_CHARACTER;
        }
        else if ((0, unicode.isSurrogate)(this.charRefCode)) {
            this._err(errorCodes.ERR.surrogateCharacterReference);
            this.charRefCode = unicode.CODE_POINTS.REPLACEMENT_CHARACTER;
        }
        else if ((0, unicode.isUndefinedCodePoint)(this.charRefCode)) {
            this._err(errorCodes.ERR.noncharacterCharacterReference);
        }
        else if ((0, unicode.isControlCodePoint)(this.charRefCode) || this.charRefCode === unicode.CODE_POINTS.CARRIAGE_RETURN) {
            this._err(errorCodes.ERR.controlCharacterReference);
            const replacement = C1_CONTROLS_REFERENCE_REPLACEMENTS.get(this.charRefCode);
            if (replacement !== undefined) {
                this.charRefCode = replacement;
            }
        }
        this._flushCodePointConsumedAsCharacterReference(this.charRefCode);
        this._reconsumeInState(this.returnState, cp);
    }
}
exports.Tokenizer = Tokenizer;

});

var openElementStack = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenElementStack = void 0;

//Element utils
const IMPLICIT_END_TAG_REQUIRED = new Set([html.TAG_ID.DD, html.TAG_ID.DT, html.TAG_ID.LI, html.TAG_ID.OPTGROUP, html.TAG_ID.OPTION, html.TAG_ID.P, html.TAG_ID.RB, html.TAG_ID.RP, html.TAG_ID.RT, html.TAG_ID.RTC]);
const IMPLICIT_END_TAG_REQUIRED_THOROUGHLY = new Set([
    ...IMPLICIT_END_TAG_REQUIRED,
    html.TAG_ID.CAPTION,
    html.TAG_ID.COLGROUP,
    html.TAG_ID.TBODY,
    html.TAG_ID.TD,
    html.TAG_ID.TFOOT,
    html.TAG_ID.TH,
    html.TAG_ID.THEAD,
    html.TAG_ID.TR,
]);
const SCOPING_ELEMENT_NS = new Map([
    [html.TAG_ID.APPLET, html.NS.HTML],
    [html.TAG_ID.CAPTION, html.NS.HTML],
    [html.TAG_ID.HTML, html.NS.HTML],
    [html.TAG_ID.MARQUEE, html.NS.HTML],
    [html.TAG_ID.OBJECT, html.NS.HTML],
    [html.TAG_ID.TABLE, html.NS.HTML],
    [html.TAG_ID.TD, html.NS.HTML],
    [html.TAG_ID.TEMPLATE, html.NS.HTML],
    [html.TAG_ID.TH, html.NS.HTML],
    [html.TAG_ID.ANNOTATION_XML, html.NS.MATHML],
    [html.TAG_ID.MI, html.NS.MATHML],
    [html.TAG_ID.MN, html.NS.MATHML],
    [html.TAG_ID.MO, html.NS.MATHML],
    [html.TAG_ID.MS, html.NS.MATHML],
    [html.TAG_ID.MTEXT, html.NS.MATHML],
    [html.TAG_ID.DESC, html.NS.SVG],
    [html.TAG_ID.FOREIGN_OBJECT, html.NS.SVG],
    [html.TAG_ID.TITLE, html.NS.SVG],
]);
const NAMED_HEADERS = [html.TAG_ID.H1, html.TAG_ID.H2, html.TAG_ID.H3, html.TAG_ID.H4, html.TAG_ID.H5, html.TAG_ID.H6];
const TABLE_ROW_CONTEXT = [html.TAG_ID.TR, html.TAG_ID.TEMPLATE, html.TAG_ID.HTML];
const TABLE_BODY_CONTEXT = [html.TAG_ID.TBODY, html.TAG_ID.TFOOT, html.TAG_ID.THEAD, html.TAG_ID.TEMPLATE, html.TAG_ID.HTML];
const TABLE_CONTEXT = [html.TAG_ID.TABLE, html.TAG_ID.TEMPLATE, html.TAG_ID.HTML];
const TABLE_CELLS = [html.TAG_ID.TD, html.TAG_ID.TH];
//Stack of open elements
class OpenElementStack {
    constructor(document, treeAdapter, handler) {
        this.treeAdapter = treeAdapter;
        this.handler = handler;
        this.items = [];
        this.tagIDs = [];
        this.stackTop = -1;
        this.tmplCount = 0;
        this.currentTagId = html.TAG_ID.UNKNOWN;
        this.current = document;
    }
    get currentTmplContentOrNode() {
        return this._isInTemplate() ? this.treeAdapter.getTemplateContent(this.current) : this.current;
    }
    //Index of element
    _indexOf(element) {
        return this.items.lastIndexOf(element, this.stackTop);
    }
    //Update current element
    _isInTemplate() {
        return this.currentTagId === html.TAG_ID.TEMPLATE && this.treeAdapter.getNamespaceURI(this.current) === html.NS.HTML;
    }
    _updateCurrentElement() {
        this.current = this.items[this.stackTop];
        this.currentTagId = this.tagIDs[this.stackTop];
    }
    //Mutations
    push(element, tagID) {
        this.stackTop++;
        this.items[this.stackTop] = element;
        this.current = element;
        this.tagIDs[this.stackTop] = tagID;
        this.currentTagId = tagID;
        if (this._isInTemplate()) {
            this.tmplCount++;
        }
        this.handler.onItemPush(element, tagID, true);
    }
    pop() {
        const popped = this.current;
        if (this.tmplCount > 0 && this._isInTemplate()) {
            this.tmplCount--;
        }
        this.stackTop--;
        this._updateCurrentElement();
        this.handler.onItemPop(popped, true);
    }
    replace(oldElement, newElement) {
        const idx = this._indexOf(oldElement);
        this.items[idx] = newElement;
        if (idx === this.stackTop) {
            this.current = newElement;
        }
    }
    insertAfter(referenceElement, newElement, newElementID) {
        const insertionIdx = this._indexOf(referenceElement) + 1;
        this.items.splice(insertionIdx, 0, newElement);
        this.tagIDs.splice(insertionIdx, 0, newElementID);
        this.stackTop++;
        if (insertionIdx === this.stackTop) {
            this._updateCurrentElement();
        }
        this.handler.onItemPush(this.current, this.currentTagId, insertionIdx === this.stackTop);
    }
    popUntilTagNamePopped(tagName) {
        let targetIdx = this.stackTop + 1;
        do {
            targetIdx = this.tagIDs.lastIndexOf(tagName, targetIdx - 1);
        } while (targetIdx > 0 && this.treeAdapter.getNamespaceURI(this.items[targetIdx]) !== html.NS.HTML);
        this.shortenToLength(targetIdx < 0 ? 0 : targetIdx);
    }
    shortenToLength(idx) {
        while (this.stackTop >= idx) {
            const popped = this.current;
            if (this.tmplCount > 0 && this._isInTemplate()) {
                this.tmplCount -= 1;
            }
            this.stackTop--;
            this._updateCurrentElement();
            this.handler.onItemPop(popped, this.stackTop < idx);
        }
    }
    popUntilElementPopped(element) {
        const idx = this._indexOf(element);
        this.shortenToLength(idx < 0 ? 0 : idx);
    }
    popUntilPopped(tagNames, targetNS) {
        const idx = this._indexOfTagNames(tagNames, targetNS);
        this.shortenToLength(idx < 0 ? 0 : idx);
    }
    popUntilNumberedHeaderPopped() {
        this.popUntilPopped(NAMED_HEADERS, html.NS.HTML);
    }
    popUntilTableCellPopped() {
        this.popUntilPopped(TABLE_CELLS, html.NS.HTML);
    }
    popAllUpToHtmlElement() {
        //NOTE: here we assume that the root <html> element is always first in the open element stack, so
        //we perform this fast stack clean up.
        this.tmplCount = 0;
        this.shortenToLength(1);
    }
    _indexOfTagNames(tagNames, namespace) {
        for (let i = this.stackTop; i >= 0; i--) {
            if (tagNames.includes(this.tagIDs[i]) && this.treeAdapter.getNamespaceURI(this.items[i]) === namespace) {
                return i;
            }
        }
        return -1;
    }
    clearBackTo(tagNames, targetNS) {
        const idx = this._indexOfTagNames(tagNames, targetNS);
        this.shortenToLength(idx + 1);
    }
    clearBackToTableContext() {
        this.clearBackTo(TABLE_CONTEXT, html.NS.HTML);
    }
    clearBackToTableBodyContext() {
        this.clearBackTo(TABLE_BODY_CONTEXT, html.NS.HTML);
    }
    clearBackToTableRowContext() {
        this.clearBackTo(TABLE_ROW_CONTEXT, html.NS.HTML);
    }
    remove(element) {
        const idx = this._indexOf(element);
        if (idx >= 0) {
            if (idx === this.stackTop) {
                this.pop();
            }
            else {
                this.items.splice(idx, 1);
                this.tagIDs.splice(idx, 1);
                this.stackTop--;
                this._updateCurrentElement();
                this.handler.onItemPop(element, false);
            }
        }
    }
    //Search
    tryPeekProperlyNestedBodyElement() {
        //Properly nested <body> element (should be second element in stack).
        return this.stackTop >= 1 && this.tagIDs[1] === html.TAG_ID.BODY ? this.items[1] : null;
    }
    contains(element) {
        return this._indexOf(element) > -1;
    }
    getCommonAncestor(element) {
        const elementIdx = this._indexOf(element) - 1;
        return elementIdx >= 0 ? this.items[elementIdx] : null;
    }
    isRootHtmlElementCurrent() {
        return this.stackTop === 0 && this.tagIDs[0] === html.TAG_ID.HTML;
    }
    //Element in scope
    hasInScope(tagName) {
        for (let i = this.stackTop; i >= 0; i--) {
            const tn = this.tagIDs[i];
            const ns = this.treeAdapter.getNamespaceURI(this.items[i]);
            if (tn === tagName && ns === html.NS.HTML) {
                return true;
            }
            if (SCOPING_ELEMENT_NS.get(tn) === ns) {
                return false;
            }
        }
        return true;
    }
    hasNumberedHeaderInScope() {
        for (let i = this.stackTop; i >= 0; i--) {
            const tn = this.tagIDs[i];
            const ns = this.treeAdapter.getNamespaceURI(this.items[i]);
            if ((0, html.isNumberedHeader)(tn) && ns === html.NS.HTML) {
                return true;
            }
            if (SCOPING_ELEMENT_NS.get(tn) === ns) {
                return false;
            }
        }
        return true;
    }
    hasInListItemScope(tagName) {
        for (let i = this.stackTop; i >= 0; i--) {
            const tn = this.tagIDs[i];
            const ns = this.treeAdapter.getNamespaceURI(this.items[i]);
            if (tn === tagName && ns === html.NS.HTML) {
                return true;
            }
            if (((tn === html.TAG_ID.UL || tn === html.TAG_ID.OL) && ns === html.NS.HTML) || SCOPING_ELEMENT_NS.get(tn) === ns) {
                return false;
            }
        }
        return true;
    }
    hasInButtonScope(tagName) {
        for (let i = this.stackTop; i >= 0; i--) {
            const tn = this.tagIDs[i];
            const ns = this.treeAdapter.getNamespaceURI(this.items[i]);
            if (tn === tagName && ns === html.NS.HTML) {
                return true;
            }
            if ((tn === html.TAG_ID.BUTTON && ns === html.NS.HTML) || SCOPING_ELEMENT_NS.get(tn) === ns) {
                return false;
            }
        }
        return true;
    }
    hasInTableScope(tagName) {
        for (let i = this.stackTop; i >= 0; i--) {
            const tn = this.tagIDs[i];
            const ns = this.treeAdapter.getNamespaceURI(this.items[i]);
            if (ns !== html.NS.HTML) {
                continue;
            }
            if (tn === tagName) {
                return true;
            }
            if (tn === html.TAG_ID.TABLE || tn === html.TAG_ID.TEMPLATE || tn === html.TAG_ID.HTML) {
                return false;
            }
        }
        return true;
    }
    hasTableBodyContextInTableScope() {
        for (let i = this.stackTop; i >= 0; i--) {
            const tn = this.tagIDs[i];
            const ns = this.treeAdapter.getNamespaceURI(this.items[i]);
            if (ns !== html.NS.HTML) {
                continue;
            }
            if (tn === html.TAG_ID.TBODY || tn === html.TAG_ID.THEAD || tn === html.TAG_ID.TFOOT) {
                return true;
            }
            if (tn === html.TAG_ID.TABLE || tn === html.TAG_ID.HTML) {
                return false;
            }
        }
        return true;
    }
    hasInSelectScope(tagName) {
        for (let i = this.stackTop; i >= 0; i--) {
            const tn = this.tagIDs[i];
            const ns = this.treeAdapter.getNamespaceURI(this.items[i]);
            if (ns !== html.NS.HTML) {
                continue;
            }
            if (tn === tagName) {
                return true;
            }
            if (tn !== html.TAG_ID.OPTION && tn !== html.TAG_ID.OPTGROUP) {
                return false;
            }
        }
        return true;
    }
    //Implied end tags
    generateImpliedEndTags() {
        while (IMPLICIT_END_TAG_REQUIRED.has(this.currentTagId)) {
            this.pop();
        }
    }
    generateImpliedEndTagsThoroughly() {
        while (IMPLICIT_END_TAG_REQUIRED_THOROUGHLY.has(this.currentTagId)) {
            this.pop();
        }
    }
    generateImpliedEndTagsWithExclusion(exclusionId) {
        while (this.currentTagId !== exclusionId && IMPLICIT_END_TAG_REQUIRED_THOROUGHLY.has(this.currentTagId)) {
            this.pop();
        }
    }
}
exports.OpenElementStack = OpenElementStack;

});

var formattingElementList = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormattingElementList = exports.EntryType = void 0;
//Const
const NOAH_ARK_CAPACITY = 3;
var EntryType;
(function (EntryType) {
    EntryType[EntryType["Marker"] = 0] = "Marker";
    EntryType[EntryType["Element"] = 1] = "Element";
})(EntryType = exports.EntryType || (exports.EntryType = {}));
const MARKER = { type: EntryType.Marker };
//List of formatting elements
class FormattingElementList {
    constructor(treeAdapter) {
        this.treeAdapter = treeAdapter;
        this.entries = [];
        this.bookmark = null;
    }
    //Noah Ark's condition
    //OPTIMIZATION: at first we try to find possible candidates for exclusion using
    //lightweight heuristics without thorough attributes check.
    _getNoahArkConditionCandidates(newElement, neAttrs) {
        const candidates = [];
        const neAttrsLength = neAttrs.length;
        const neTagName = this.treeAdapter.getTagName(newElement);
        const neNamespaceURI = this.treeAdapter.getNamespaceURI(newElement);
        for (let i = 0; i < this.entries.length; i++) {
            const entry = this.entries[i];
            if (entry.type === EntryType.Marker) {
                break;
            }
            const { element } = entry;
            if (this.treeAdapter.getTagName(element) === neTagName &&
                this.treeAdapter.getNamespaceURI(element) === neNamespaceURI) {
                const elementAttrs = this.treeAdapter.getAttrList(element);
                if (elementAttrs.length === neAttrsLength) {
                    candidates.push({ idx: i, attrs: elementAttrs });
                }
            }
        }
        return candidates;
    }
    _ensureNoahArkCondition(newElement) {
        if (this.entries.length < NOAH_ARK_CAPACITY)
            return;
        const neAttrs = this.treeAdapter.getAttrList(newElement);
        const candidates = this._getNoahArkConditionCandidates(newElement, neAttrs);
        if (candidates.length < NOAH_ARK_CAPACITY)
            return;
        //NOTE: build attrs map for the new element, so we can perform fast lookups
        const neAttrsMap = new Map(neAttrs.map((neAttr) => [neAttr.name, neAttr.value]));
        let validCandidates = 0;
        //NOTE: remove bottommost candidates, until Noah's Ark condition will not be met
        for (let i = 0; i < candidates.length; i++) {
            const candidate = candidates[i];
            // We know that `candidate.attrs.length === neAttrs.length`
            if (candidate.attrs.every((cAttr) => neAttrsMap.get(cAttr.name) === cAttr.value)) {
                validCandidates += 1;
                if (validCandidates >= NOAH_ARK_CAPACITY) {
                    this.entries.splice(candidate.idx, 1);
                }
            }
        }
    }
    //Mutations
    insertMarker() {
        this.entries.unshift(MARKER);
    }
    pushElement(element, token) {
        this._ensureNoahArkCondition(element);
        this.entries.unshift({
            type: EntryType.Element,
            element,
            token,
        });
    }
    insertElementAfterBookmark(element, token) {
        const bookmarkIdx = this.entries.indexOf(this.bookmark);
        this.entries.splice(bookmarkIdx, 0, {
            type: EntryType.Element,
            element,
            token,
        });
    }
    removeEntry(entry) {
        const entryIndex = this.entries.indexOf(entry);
        if (entryIndex >= 0) {
            this.entries.splice(entryIndex, 1);
        }
    }
    /**
     * Clears the list of formatting elements up to the last marker.
     *
     * @see https://html.spec.whatwg.org/multipage/parsing.html#clear-the-list-of-active-formatting-elements-up-to-the-last-marker
     */
    clearToLastMarker() {
        const markerIdx = this.entries.indexOf(MARKER);
        if (markerIdx >= 0) {
            this.entries.splice(0, markerIdx + 1);
        }
        else {
            this.entries.length = 0;
        }
    }
    //Search
    getElementEntryInScopeWithTagName(tagName) {
        const entry = this.entries.find((entry) => entry.type === EntryType.Marker || this.treeAdapter.getTagName(entry.element) === tagName);
        return entry && entry.type === EntryType.Element ? entry : null;
    }
    getElementEntry(element) {
        return this.entries.find((entry) => entry.type === EntryType.Element && entry.element === element);
    }
}
exports.FormattingElementList = FormattingElementList;

});

var _default = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultTreeAdapter = exports.NodeType = void 0;

var NodeType;
(function (NodeType) {
    NodeType["Document"] = "#document";
    NodeType["DocumentFragment"] = "#document-fragment";
    NodeType["Comment"] = "#comment";
    NodeType["Text"] = "#text";
    NodeType["DocumentType"] = "#documentType";
})(NodeType = exports.NodeType || (exports.NodeType = {}));
function createTextNode(value) {
    return {
        nodeName: NodeType.Text,
        value,
        parentNode: null,
    };
}
exports.defaultTreeAdapter = {
    //Node construction
    createDocument() {
        return {
            nodeName: NodeType.Document,
            mode: html.DOCUMENT_MODE.NO_QUIRKS,
            childNodes: [],
        };
    },
    createDocumentFragment() {
        return {
            nodeName: NodeType.DocumentFragment,
            childNodes: [],
        };
    },
    createElement(tagName, namespaceURI, attrs, token) {
        var _a;
        return {
            nodeName: tagName,
            tagName,
            attrs,
            namespaceURI,
            childNodes: [],
            parentNode: null,
            selfClosing: (_a = token === null || token === void 0 ? void 0 : token.selfClosing) !== null && _a !== void 0 ? _a : false,
        };
    },
    createCommentNode(data) {
        return {
            nodeName: NodeType.Comment,
            data,
            parentNode: null,
        };
    },
    //Tree mutation
    appendChild(parentNode, newNode) {
        parentNode.childNodes.push(newNode);
        newNode.parentNode = parentNode;
    },
    insertBefore(parentNode, newNode, referenceNode) {
        const insertionIdx = parentNode.childNodes.indexOf(referenceNode);
        parentNode.childNodes.splice(insertionIdx, 0, newNode);
        newNode.parentNode = parentNode;
    },
    setTemplateContent(templateElement, contentElement) {
        templateElement.content = contentElement;
    },
    getTemplateContent(templateElement) {
        return templateElement.content;
    },
    setDocumentType(document, name, publicId, systemId) {
        const doctypeNode = document.childNodes.find((node) => node.nodeName === NodeType.DocumentType);
        if (doctypeNode) {
            doctypeNode.name = name;
            doctypeNode.publicId = publicId;
            doctypeNode.systemId = systemId;
        }
        else {
            const node = {
                nodeName: NodeType.DocumentType,
                name,
                publicId,
                systemId,
                parentNode: null,
            };
            exports.defaultTreeAdapter.appendChild(document, node);
        }
    },
    setDocumentMode(document, mode) {
        document.mode = mode;
    },
    getDocumentMode(document) {
        return document.mode;
    },
    detachNode(node) {
        if (node.parentNode) {
            const idx = node.parentNode.childNodes.indexOf(node);
            node.parentNode.childNodes.splice(idx, 1);
            node.parentNode = null;
        }
    },
    insertText(parentNode, text) {
        if (parentNode.childNodes.length > 0) {
            const prevNode = parentNode.childNodes[parentNode.childNodes.length - 1];
            if (exports.defaultTreeAdapter.isTextNode(prevNode)) {
                prevNode.value += text;
                return;
            }
        }
        exports.defaultTreeAdapter.appendChild(parentNode, createTextNode(text));
    },
    insertTextBefore(parentNode, text, referenceNode) {
        const prevNode = parentNode.childNodes[parentNode.childNodes.indexOf(referenceNode) - 1];
        if (prevNode && exports.defaultTreeAdapter.isTextNode(prevNode)) {
            prevNode.value += text;
        }
        else {
            exports.defaultTreeAdapter.insertBefore(parentNode, createTextNode(text), referenceNode);
        }
    },
    adoptAttributes(recipient, attrs) {
        const recipientAttrsMap = new Set(recipient.attrs.map((attr) => attr.name));
        for (let j = 0; j < attrs.length; j++) {
            if (!recipientAttrsMap.has(attrs[j].name)) {
                recipient.attrs.push(attrs[j]);
            }
        }
    },
    //Tree traversing
    getFirstChild(node) {
        return node.childNodes[0];
    },
    getChildNodes(node) {
        return node.childNodes;
    },
    getParentNode(node) {
        return node.parentNode;
    },
    getAttrList(element) {
        return element.attrs;
    },
    //Node data
    getTagName(element) {
        return element.tagName;
    },
    getNamespaceURI(element) {
        return element.namespaceURI;
    },
    getTextNodeContent(textNode) {
        return textNode.value;
    },
    getCommentNodeContent(commentNode) {
        return commentNode.data;
    },
    getDocumentTypeNodeName(doctypeNode) {
        return doctypeNode.name;
    },
    getDocumentTypeNodePublicId(doctypeNode) {
        return doctypeNode.publicId;
    },
    getDocumentTypeNodeSystemId(doctypeNode) {
        return doctypeNode.systemId;
    },
    //Node types
    isTextNode(node) {
        return node.nodeName === '#text';
    },
    isCommentNode(node) {
        return node.nodeName === '#comment';
    },
    isDocumentTypeNode(node) {
        return node.nodeName === NodeType.DocumentType;
    },
    isElementNode(node) {
        return Object.prototype.hasOwnProperty.call(node, 'tagName');
    },
    // Source code location
    setNodeSourceCodeLocation(node, location) {
        node.sourceCodeLocation = location;
    },
    getNodeSourceCodeLocation(node) {
        return node.sourceCodeLocation;
    },
    updateNodeSourceCodeLocation(node, endLocation) {
        node.sourceCodeLocation = Object.assign(Object.assign({}, node.sourceCodeLocation), endLocation);
    },
};

});

var doctype = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocumentMode = exports.isConforming = void 0;

//Const
const VALID_DOCTYPE_NAME = 'html';
const VALID_SYSTEM_ID = 'about:legacy-compat';
const QUIRKS_MODE_SYSTEM_ID = 'http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd';
const QUIRKS_MODE_PUBLIC_ID_PREFIXES = [
    '+//silmaril//dtd html pro v0r11 19970101//',
    '-//as//dtd html 3.0 aswedit + extensions//',
    '-//advasoft ltd//dtd html 3.0 aswedit + extensions//',
    '-//ietf//dtd html 2.0 level 1//',
    '-//ietf//dtd html 2.0 level 2//',
    '-//ietf//dtd html 2.0 strict level 1//',
    '-//ietf//dtd html 2.0 strict level 2//',
    '-//ietf//dtd html 2.0 strict//',
    '-//ietf//dtd html 2.0//',
    '-//ietf//dtd html 2.1e//',
    '-//ietf//dtd html 3.0//',
    '-//ietf//dtd html 3.2 final//',
    '-//ietf//dtd html 3.2//',
    '-//ietf//dtd html 3//',
    '-//ietf//dtd html level 0//',
    '-//ietf//dtd html level 1//',
    '-//ietf//dtd html level 2//',
    '-//ietf//dtd html level 3//',
    '-//ietf//dtd html strict level 0//',
    '-//ietf//dtd html strict level 1//',
    '-//ietf//dtd html strict level 2//',
    '-//ietf//dtd html strict level 3//',
    '-//ietf//dtd html strict//',
    '-//ietf//dtd html//',
    '-//metrius//dtd metrius presentational//',
    '-//microsoft//dtd internet explorer 2.0 html strict//',
    '-//microsoft//dtd internet explorer 2.0 html//',
    '-//microsoft//dtd internet explorer 2.0 tables//',
    '-//microsoft//dtd internet explorer 3.0 html strict//',
    '-//microsoft//dtd internet explorer 3.0 html//',
    '-//microsoft//dtd internet explorer 3.0 tables//',
    '-//netscape comm. corp.//dtd html//',
    '-//netscape comm. corp.//dtd strict html//',
    "-//o'reilly and associates//dtd html 2.0//",
    "-//o'reilly and associates//dtd html extended 1.0//",
    "-//o'reilly and associates//dtd html extended relaxed 1.0//",
    '-//sq//dtd html 2.0 hotmetal + extensions//',
    '-//softquad software//dtd hotmetal pro 6.0::19990601::extensions to html 4.0//',
    '-//softquad//dtd hotmetal pro 4.0::19971010::extensions to html 4.0//',
    '-//spyglass//dtd html 2.0 extended//',
    '-//sun microsystems corp.//dtd hotjava html//',
    '-//sun microsystems corp.//dtd hotjava strict html//',
    '-//w3c//dtd html 3 1995-03-24//',
    '-//w3c//dtd html 3.2 draft//',
    '-//w3c//dtd html 3.2 final//',
    '-//w3c//dtd html 3.2//',
    '-//w3c//dtd html 3.2s draft//',
    '-//w3c//dtd html 4.0 frameset//',
    '-//w3c//dtd html 4.0 transitional//',
    '-//w3c//dtd html experimental 19960712//',
    '-//w3c//dtd html experimental 970421//',
    '-//w3c//dtd w3 html//',
    '-//w3o//dtd w3 html 3.0//',
    '-//webtechs//dtd mozilla html 2.0//',
    '-//webtechs//dtd mozilla html//',
];
const QUIRKS_MODE_NO_SYSTEM_ID_PUBLIC_ID_PREFIXES = [
    ...QUIRKS_MODE_PUBLIC_ID_PREFIXES,
    '-//w3c//dtd html 4.01 frameset//',
    '-//w3c//dtd html 4.01 transitional//',
];
const QUIRKS_MODE_PUBLIC_IDS = new Set([
    '-//w3o//dtd w3 html strict 3.0//en//',
    '-/w3c/dtd html 4.0 transitional/en',
    'html',
]);
const LIMITED_QUIRKS_PUBLIC_ID_PREFIXES = ['-//w3c//dtd xhtml 1.0 frameset//', '-//w3c//dtd xhtml 1.0 transitional//'];
const LIMITED_QUIRKS_WITH_SYSTEM_ID_PUBLIC_ID_PREFIXES = [
    ...LIMITED_QUIRKS_PUBLIC_ID_PREFIXES,
    '-//w3c//dtd html 4.01 frameset//',
    '-//w3c//dtd html 4.01 transitional//',
];
//Utils
function hasPrefix(publicId, prefixes) {
    return prefixes.some((prefix) => publicId.startsWith(prefix));
}
//API
function isConforming(token) {
    return (token.name === VALID_DOCTYPE_NAME &&
        token.publicId === null &&
        (token.systemId === null || token.systemId === VALID_SYSTEM_ID));
}
exports.isConforming = isConforming;
function getDocumentMode(token) {
    if (token.name !== VALID_DOCTYPE_NAME) {
        return html.DOCUMENT_MODE.QUIRKS;
    }
    const { systemId } = token;
    if (systemId && systemId.toLowerCase() === QUIRKS_MODE_SYSTEM_ID) {
        return html.DOCUMENT_MODE.QUIRKS;
    }
    let { publicId } = token;
    if (publicId !== null) {
        publicId = publicId.toLowerCase();
        if (QUIRKS_MODE_PUBLIC_IDS.has(publicId)) {
            return html.DOCUMENT_MODE.QUIRKS;
        }
        let prefixes = systemId === null ? QUIRKS_MODE_NO_SYSTEM_ID_PUBLIC_ID_PREFIXES : QUIRKS_MODE_PUBLIC_ID_PREFIXES;
        if (hasPrefix(publicId, prefixes)) {
            return html.DOCUMENT_MODE.QUIRKS;
        }
        prefixes =
            systemId === null ? LIMITED_QUIRKS_PUBLIC_ID_PREFIXES : LIMITED_QUIRKS_WITH_SYSTEM_ID_PUBLIC_ID_PREFIXES;
        if (hasPrefix(publicId, prefixes)) {
            return html.DOCUMENT_MODE.LIMITED_QUIRKS;
        }
    }
    return html.DOCUMENT_MODE.NO_QUIRKS;
}
exports.getDocumentMode = getDocumentMode;

});

var foreignContent = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIntegrationPoint = exports.adjustTokenSVGTagName = exports.adjustTokenXMLAttrs = exports.adjustTokenSVGAttrs = exports.adjustTokenMathMLAttrs = exports.causesExit = exports.SVG_TAG_NAMES_ADJUSTMENT_MAP = void 0;

//MIME types
const MIME_TYPES = {
    TEXT_HTML: 'text/html',
    APPLICATION_XML: 'application/xhtml+xml',
};
//Attributes
const DEFINITION_URL_ATTR = 'definitionurl';
const ADJUSTED_DEFINITION_URL_ATTR = 'definitionURL';
const SVG_ATTRS_ADJUSTMENT_MAP = new Map([
    'attributeName',
    'attributeType',
    'baseFrequency',
    'baseProfile',
    'calcMode',
    'clipPathUnits',
    'diffuseConstant',
    'edgeMode',
    'filterUnits',
    'glyphRef',
    'gradientTransform',
    'gradientUnits',
    'kernelMatrix',
    'kernelUnitLength',
    'keyPoints',
    'keySplines',
    'keyTimes',
    'lengthAdjust',
    'limitingConeAngle',
    'markerHeight',
    'markerUnits',
    'markerWidth',
    'maskContentUnits',
    'maskUnits',
    'numOctaves',
    'pathLength',
    'patternContentUnits',
    'patternTransform',
    'patternUnits',
    'pointsAtX',
    'pointsAtY',
    'pointsAtZ',
    'preserveAlpha',
    'preserveAspectRatio',
    'primitiveUnits',
    'refX',
    'refY',
    'repeatCount',
    'repeatDur',
    'requiredExtensions',
    'requiredFeatures',
    'specularConstant',
    'specularExponent',
    'spreadMethod',
    'startOffset',
    'stdDeviation',
    'stitchTiles',
    'surfaceScale',
    'systemLanguage',
    'tableValues',
    'targetX',
    'targetY',
    'textLength',
    'viewBox',
    'viewTarget',
    'xChannelSelector',
    'yChannelSelector',
    'zoomAndPan',
].map((attr) => [attr.toLowerCase(), attr]));
const XML_ATTRS_ADJUSTMENT_MAP = new Map([
    ['xlink:actuate', { prefix: 'xlink', name: 'actuate', namespace: html.NS.XLINK }],
    ['xlink:arcrole', { prefix: 'xlink', name: 'arcrole', namespace: html.NS.XLINK }],
    ['xlink:href', { prefix: 'xlink', name: 'href', namespace: html.NS.XLINK }],
    ['xlink:role', { prefix: 'xlink', name: 'role', namespace: html.NS.XLINK }],
    ['xlink:show', { prefix: 'xlink', name: 'show', namespace: html.NS.XLINK }],
    ['xlink:title', { prefix: 'xlink', name: 'title', namespace: html.NS.XLINK }],
    ['xlink:type', { prefix: 'xlink', name: 'type', namespace: html.NS.XLINK }],
    ['xml:base', { prefix: 'xml', name: 'base', namespace: html.NS.XML }],
    ['xml:lang', { prefix: 'xml', name: 'lang', namespace: html.NS.XML }],
    ['xml:space', { prefix: 'xml', name: 'space', namespace: html.NS.XML }],
    ['xmlns', { prefix: '', name: 'xmlns', namespace: html.NS.XMLNS }],
    ['xmlns:xlink', { prefix: 'xmlns', name: 'xlink', namespace: html.NS.XMLNS }],
]);
//SVG tag names adjustment map
exports.SVG_TAG_NAMES_ADJUSTMENT_MAP = new Map([
    'altGlyph',
    'altGlyphDef',
    'altGlyphItem',
    'animateColor',
    'animateMotion',
    'animateTransform',
    'clipPath',
    'feBlend',
    'feColorMatrix',
    'feComponentTransfer',
    'feComposite',
    'feConvolveMatrix',
    'feDiffuseLighting',
    'feDisplacementMap',
    'feDistantLight',
    'feFlood',
    'feFuncA',
    'feFuncB',
    'feFuncG',
    'feFuncR',
    'feGaussianBlur',
    'feImage',
    'feMerge',
    'feMergeNode',
    'feMorphology',
    'feOffset',
    'fePointLight',
    'feSpecularLighting',
    'feSpotLight',
    'feTile',
    'feTurbulence',
    'foreignObject',
    'glyphRef',
    'linearGradient',
    'radialGradient',
    'textPath',
].map((tn) => [tn.toLowerCase(), tn]));
//Tags that causes exit from foreign content
const EXITS_FOREIGN_CONTENT = new Set([
    html.TAG_ID.B,
    html.TAG_ID.BIG,
    html.TAG_ID.BLOCKQUOTE,
    html.TAG_ID.BODY,
    html.TAG_ID.BR,
    html.TAG_ID.CENTER,
    html.TAG_ID.CODE,
    html.TAG_ID.DD,
    html.TAG_ID.DIV,
    html.TAG_ID.DL,
    html.TAG_ID.DT,
    html.TAG_ID.EM,
    html.TAG_ID.EMBED,
    html.TAG_ID.H1,
    html.TAG_ID.H2,
    html.TAG_ID.H3,
    html.TAG_ID.H4,
    html.TAG_ID.H5,
    html.TAG_ID.H6,
    html.TAG_ID.HEAD,
    html.TAG_ID.HR,
    html.TAG_ID.I,
    html.TAG_ID.IMG,
    html.TAG_ID.LI,
    html.TAG_ID.LISTING,
    html.TAG_ID.MENU,
    html.TAG_ID.META,
    html.TAG_ID.NOBR,
    html.TAG_ID.OL,
    html.TAG_ID.P,
    html.TAG_ID.PRE,
    html.TAG_ID.RUBY,
    html.TAG_ID.S,
    html.TAG_ID.SMALL,
    html.TAG_ID.SPAN,
    html.TAG_ID.STRONG,
    html.TAG_ID.STRIKE,
    html.TAG_ID.SUB,
    html.TAG_ID.SUP,
    html.TAG_ID.TABLE,
    html.TAG_ID.TT,
    html.TAG_ID.U,
    html.TAG_ID.UL,
    html.TAG_ID.VAR,
]);
//Check exit from foreign content
function causesExit(startTagToken) {
    const tn = startTagToken.tagID;
    const isFontWithAttrs = tn === html.TAG_ID.FONT &&
        startTagToken.attrs.some(({ name }) => name === html.ATTRS.COLOR || name === html.ATTRS.SIZE || name === html.ATTRS.FACE);
    return isFontWithAttrs || EXITS_FOREIGN_CONTENT.has(tn);
}
exports.causesExit = causesExit;
//Token adjustments
function adjustTokenMathMLAttrs(token) {
    for (let i = 0; i < token.attrs.length; i++) {
        if (token.attrs[i].name === DEFINITION_URL_ATTR) {
            token.attrs[i].name = ADJUSTED_DEFINITION_URL_ATTR;
            break;
        }
    }
}
exports.adjustTokenMathMLAttrs = adjustTokenMathMLAttrs;
function adjustTokenSVGAttrs(token) {
    for (let i = 0; i < token.attrs.length; i++) {
        const adjustedAttrName = SVG_ATTRS_ADJUSTMENT_MAP.get(token.attrs[i].name);
        if (adjustedAttrName != null) {
            token.attrs[i].name = adjustedAttrName;
        }
    }
}
exports.adjustTokenSVGAttrs = adjustTokenSVGAttrs;
function adjustTokenXMLAttrs(token) {
    for (let i = 0; i < token.attrs.length; i++) {
        const adjustedAttrEntry = XML_ATTRS_ADJUSTMENT_MAP.get(token.attrs[i].name);
        if (adjustedAttrEntry) {
            token.attrs[i].prefix = adjustedAttrEntry.prefix;
            token.attrs[i].name = adjustedAttrEntry.name;
            token.attrs[i].namespace = adjustedAttrEntry.namespace;
        }
    }
}
exports.adjustTokenXMLAttrs = adjustTokenXMLAttrs;
function adjustTokenSVGTagName(token) {
    const adjustedTagName = exports.SVG_TAG_NAMES_ADJUSTMENT_MAP.get(token.tagName);
    if (adjustedTagName != null) {
        token.tagName = adjustedTagName;
        token.tagID = (0, html.getTagID)(token.tagName);
    }
}
exports.adjustTokenSVGTagName = adjustTokenSVGTagName;
//Integration points
function isMathMLTextIntegrationPoint(tn, ns) {
    return ns === html.NS.MATHML && (tn === html.TAG_ID.MI || tn === html.TAG_ID.MO || tn === html.TAG_ID.MN || tn === html.TAG_ID.MS || tn === html.TAG_ID.MTEXT);
}
function isHtmlIntegrationPoint(tn, ns, attrs) {
    if (ns === html.NS.MATHML && tn === html.TAG_ID.ANNOTATION_XML) {
        for (let i = 0; i < attrs.length; i++) {
            if (attrs[i].name === html.ATTRS.ENCODING) {
                const value = attrs[i].value.toLowerCase();
                return value === MIME_TYPES.TEXT_HTML || value === MIME_TYPES.APPLICATION_XML;
            }
        }
    }
    return ns === html.NS.SVG && (tn === html.TAG_ID.FOREIGN_OBJECT || tn === html.TAG_ID.DESC || tn === html.TAG_ID.TITLE);
}
function isIntegrationPoint(tn, ns, attrs, foreignNS) {
    return (((!foreignNS || foreignNS === html.NS.HTML) && isHtmlIntegrationPoint(tn, ns, attrs)) ||
        ((!foreignNS || foreignNS === html.NS.MATHML) && isMathMLTextIntegrationPoint(tn, ns)));
}
exports.isIntegrationPoint = isIntegrationPoint;

});

var parser = createCommonjsModule(function (module, exports) {
var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;




const doctype$1 = __importStar(doctype);
const foreignContent$1 = __importStar(foreignContent);

const unicode$1 = __importStar(unicode);


//Misc constants
const HIDDEN_INPUT_TYPE = 'hidden';
//Adoption agency loops iteration count
const AA_OUTER_LOOP_ITER = 8;
const AA_INNER_LOOP_ITER = 3;
//Insertion modes
var InsertionMode;
(function (InsertionMode) {
    InsertionMode[InsertionMode["INITIAL"] = 0] = "INITIAL";
    InsertionMode[InsertionMode["BEFORE_HTML"] = 1] = "BEFORE_HTML";
    InsertionMode[InsertionMode["BEFORE_HEAD"] = 2] = "BEFORE_HEAD";
    InsertionMode[InsertionMode["IN_HEAD"] = 3] = "IN_HEAD";
    InsertionMode[InsertionMode["IN_HEAD_NO_SCRIPT"] = 4] = "IN_HEAD_NO_SCRIPT";
    InsertionMode[InsertionMode["AFTER_HEAD"] = 5] = "AFTER_HEAD";
    InsertionMode[InsertionMode["IN_BODY"] = 6] = "IN_BODY";
    InsertionMode[InsertionMode["TEXT"] = 7] = "TEXT";
    InsertionMode[InsertionMode["IN_TABLE"] = 8] = "IN_TABLE";
    InsertionMode[InsertionMode["IN_TABLE_TEXT"] = 9] = "IN_TABLE_TEXT";
    InsertionMode[InsertionMode["IN_CAPTION"] = 10] = "IN_CAPTION";
    InsertionMode[InsertionMode["IN_COLUMN_GROUP"] = 11] = "IN_COLUMN_GROUP";
    InsertionMode[InsertionMode["IN_TABLE_BODY"] = 12] = "IN_TABLE_BODY";
    InsertionMode[InsertionMode["IN_ROW"] = 13] = "IN_ROW";
    InsertionMode[InsertionMode["IN_CELL"] = 14] = "IN_CELL";
    InsertionMode[InsertionMode["IN_SELECT"] = 15] = "IN_SELECT";
    InsertionMode[InsertionMode["IN_SELECT_IN_TABLE"] = 16] = "IN_SELECT_IN_TABLE";
    InsertionMode[InsertionMode["IN_TEMPLATE"] = 17] = "IN_TEMPLATE";
    InsertionMode[InsertionMode["AFTER_BODY"] = 18] = "AFTER_BODY";
    InsertionMode[InsertionMode["IN_FRAMESET"] = 19] = "IN_FRAMESET";
    InsertionMode[InsertionMode["AFTER_FRAMESET"] = 20] = "AFTER_FRAMESET";
    InsertionMode[InsertionMode["AFTER_AFTER_BODY"] = 21] = "AFTER_AFTER_BODY";
    InsertionMode[InsertionMode["AFTER_AFTER_FRAMESET"] = 22] = "AFTER_AFTER_FRAMESET";
})(InsertionMode || (InsertionMode = {}));
const BASE_LOC = {
    startLine: -1,
    startCol: -1,
    startOffset: -1,
    endLine: -1,
    endCol: -1,
    endOffset: -1,
};
const TABLE_STRUCTURE_TAGS = new Set([html.TAG_ID.TABLE, html.TAG_ID.TBODY, html.TAG_ID.TFOOT, html.TAG_ID.THEAD, html.TAG_ID.TR]);
const defaultParserOptions = {
    scriptingEnabled: true,
    sourceCodeLocationInfo: false,
    treeAdapter: _default.defaultTreeAdapter,
    onParseError: null,
};
//Parser
class Parser {
    constructor(options, document, fragmentContext = null, scriptHandler = null) {
        this.fragmentContext = fragmentContext;
        this.scriptHandler = scriptHandler;
        this.currentToken = null;
        this.stopped = false;
        this.insertionMode = InsertionMode.INITIAL;
        this.originalInsertionMode = InsertionMode.INITIAL;
        this.headElement = null;
        this.formElement = null;
        /** Indicates that the current node is not an element in the HTML namespace */
        this.currentNotInHTML = false;
        /**
         * The template insertion mode stack is maintained from the left.
         * Ie. the topmost element will always have index 0.
         */
        this.tmplInsertionModeStack = [];
        this.pendingCharacterTokens = [];
        this.hasNonWhitespacePendingCharacterToken = false;
        this.framesetOk = true;
        this.skipNextNewLine = false;
        this.fosterParentingEnabled = false;
        this.options = Object.assign(Object.assign({}, defaultParserOptions), options);
        this.treeAdapter = this.options.treeAdapter;
        this.onParseError = this.options.onParseError;
        // Always enable location info if we report parse errors.
        if (this.onParseError) {
            this.options.sourceCodeLocationInfo = true;
        }
        this.document = document !== null && document !== void 0 ? document : this.treeAdapter.createDocument();
        this.tokenizer = new tokenizer.Tokenizer(this.options, this);
        this.activeFormattingElements = new formattingElementList.FormattingElementList(this.treeAdapter);
        this.fragmentContextID = fragmentContext ? (0, html.getTagID)(this.treeAdapter.getTagName(fragmentContext)) : html.TAG_ID.UNKNOWN;
        this._setContextModes(fragmentContext !== null && fragmentContext !== void 0 ? fragmentContext : this.document, this.fragmentContextID);
        this.openElements = new openElementStack.OpenElementStack(this.document, this.treeAdapter, this);
    }
    // API
    static parse(html, options) {
        const parser = new this(options);
        parser.tokenizer.write(html, true);
        return parser.document;
    }
    static getFragmentParser(fragmentContext, options) {
        const opts = Object.assign(Object.assign({}, defaultParserOptions), options);
        //NOTE: use a <template> element as the fragment context if no context element was provided,
        //so we will parse in a "forgiving" manner
        fragmentContext !== null && fragmentContext !== void 0 ? fragmentContext : (fragmentContext = opts.treeAdapter.createElement(html.TAG_NAMES.TEMPLATE, html.NS.HTML, []));
        //NOTE: create a fake element which will be used as the `document` for fragment parsing.
        //This is important for jsdom, where a new `document` cannot be created. This led to
        //fragment parsing messing with the main `document`.
        const documentMock = opts.treeAdapter.createElement('documentmock', html.NS.HTML, []);
        const parser = new this(opts, documentMock, fragmentContext);
        if (parser.fragmentContextID === html.TAG_ID.TEMPLATE) {
            parser.tmplInsertionModeStack.unshift(InsertionMode.IN_TEMPLATE);
        }
        parser._initTokenizerForFragmentParsing();
        parser._insertFakeRootElement();
        parser._resetInsertionMode();
        parser._findFormInFragmentContext();
        return parser;
    }
    getFragment() {
        const rootElement = this.treeAdapter.getFirstChild(this.document);
        const fragment = this.treeAdapter.createDocumentFragment();
        this._adoptNodes(rootElement, fragment);
        return fragment;
    }
    //Errors
    _err(token, code, beforeToken) {
        var _a;
        if (!this.onParseError)
            return;
        const loc = (_a = token.location) !== null && _a !== void 0 ? _a : BASE_LOC;
        const err = {
            code,
            startLine: loc.startLine,
            startCol: loc.startCol,
            startOffset: loc.startOffset,
            endLine: beforeToken ? loc.startLine : loc.endLine,
            endCol: beforeToken ? loc.startCol : loc.endCol,
            endOffset: beforeToken ? loc.startOffset : loc.endOffset,
        };
        this.onParseError(err);
    }
    //Stack events
    onItemPush(node, tid, isTop) {
        var _a, _b;
        (_b = (_a = this.treeAdapter).onItemPush) === null || _b === void 0 ? void 0 : _b.call(_a, node);
        if (isTop && this.openElements.stackTop > 0)
            this._setContextModes(node, tid);
    }
    onItemPop(node, isTop) {
        var _a, _b;
        if (this.options.sourceCodeLocationInfo) {
            this._setEndLocation(node, this.currentToken);
        }
        (_b = (_a = this.treeAdapter).onItemPop) === null || _b === void 0 ? void 0 : _b.call(_a, node, this.openElements.current);
        if (isTop) {
            let current;
            let currentTagId;
            if (this.openElements.stackTop === 0 && this.fragmentContext) {
                current = this.fragmentContext;
                currentTagId = this.fragmentContextID;
            }
            else {
                ({ current, currentTagId } = this.openElements);
            }
            this._setContextModes(current, currentTagId);
        }
    }
    _setContextModes(current, tid) {
        const isHTML = current === this.document || this.treeAdapter.getNamespaceURI(current) === html.NS.HTML;
        this.currentNotInHTML = !isHTML;
        this.tokenizer.inForeignNode = !isHTML && !this._isIntegrationPoint(tid, current);
    }
    _switchToTextParsing(currentToken, nextTokenizerState) {
        this._insertElement(currentToken, html.NS.HTML);
        this.tokenizer.state = nextTokenizerState;
        this.originalInsertionMode = this.insertionMode;
        this.insertionMode = InsertionMode.TEXT;
    }
    switchToPlaintextParsing() {
        this.insertionMode = InsertionMode.TEXT;
        this.originalInsertionMode = InsertionMode.IN_BODY;
        this.tokenizer.state = tokenizer.TokenizerMode.PLAINTEXT;
    }
    //Fragment parsing
    _getAdjustedCurrentElement() {
        return this.openElements.stackTop === 0 && this.fragmentContext
            ? this.fragmentContext
            : this.openElements.current;
    }
    _findFormInFragmentContext() {
        let node = this.fragmentContext;
        while (node) {
            if (this.treeAdapter.getTagName(node) === html.TAG_NAMES.FORM) {
                this.formElement = node;
                break;
            }
            node = this.treeAdapter.getParentNode(node);
        }
    }
    _initTokenizerForFragmentParsing() {
        if (!this.fragmentContext || this.treeAdapter.getNamespaceURI(this.fragmentContext) !== html.NS.HTML) {
            return;
        }
        switch (this.fragmentContextID) {
            case html.TAG_ID.TITLE:
            case html.TAG_ID.TEXTAREA: {
                this.tokenizer.state = tokenizer.TokenizerMode.RCDATA;
                break;
            }
            case html.TAG_ID.STYLE:
            case html.TAG_ID.XMP:
            case html.TAG_ID.IFRAME:
            case html.TAG_ID.NOEMBED:
            case html.TAG_ID.NOFRAMES:
            case html.TAG_ID.NOSCRIPT: {
                this.tokenizer.state = tokenizer.TokenizerMode.RAWTEXT;
                break;
            }
            case html.TAG_ID.SCRIPT: {
                this.tokenizer.state = tokenizer.TokenizerMode.SCRIPT_DATA;
                break;
            }
            case html.TAG_ID.PLAINTEXT: {
                this.tokenizer.state = tokenizer.TokenizerMode.PLAINTEXT;
                break;
            }
            // Do nothing
        }
    }
    //Tree mutation
    _setDocumentType(token) {
        const name = token.name || '';
        const publicId = token.publicId || '';
        const systemId = token.systemId || '';
        this.treeAdapter.setDocumentType(this.document, name, publicId, systemId);
        if (token.location) {
            const documentChildren = this.treeAdapter.getChildNodes(this.document);
            const docTypeNode = documentChildren.find((node) => this.treeAdapter.isDocumentTypeNode(node));
            if (docTypeNode) {
                this.treeAdapter.setNodeSourceCodeLocation(docTypeNode, token.location);
            }
        }
    }
    _attachElementToTree(element, location) {
        if (this.options.sourceCodeLocationInfo) {
            const loc = location && Object.assign(Object.assign({}, location), { startTag: location });
            this.treeAdapter.setNodeSourceCodeLocation(element, loc);
        }
        if (this._shouldFosterParentOnInsertion()) {
            this._fosterParentElement(element);
        }
        else {
            const parent = this.openElements.currentTmplContentOrNode;
            this.treeAdapter.appendChild(parent, element);
        }
    }
    _appendElement(token, namespaceURI) {
        const element = this.treeAdapter.createElement(token.tagName, namespaceURI, token.attrs, token);
        this._attachElementToTree(element, token.location);
    }
    _insertElement(token, namespaceURI) {
        const element = this.treeAdapter.createElement(token.tagName, namespaceURI, token.attrs, token);
        this._attachElementToTree(element, token.location);
        this.openElements.push(element, token.tagID);
    }
    _insertFakeElement(tagName, tagID) {
        const element = this.treeAdapter.createElement(tagName, html.NS.HTML, []);
        this._attachElementToTree(element, null);
        this.openElements.push(element, tagID);
    }
    _insertTemplate(token) {
        const tmpl = this.treeAdapter.createElement(token.tagName, html.NS.HTML, token.attrs, token);
        const content = this.treeAdapter.createDocumentFragment();
        this.treeAdapter.setTemplateContent(tmpl, content);
        this._attachElementToTree(tmpl, token.location);
        this.openElements.push(tmpl, token.tagID);
        if (this.options.sourceCodeLocationInfo)
            this.treeAdapter.setNodeSourceCodeLocation(content, null);
    }
    _insertFakeRootElement() {
        const element = this.treeAdapter.createElement(html.TAG_NAMES.HTML, html.NS.HTML, []);
        if (this.options.sourceCodeLocationInfo)
            this.treeAdapter.setNodeSourceCodeLocation(element, null);
        this.treeAdapter.appendChild(this.openElements.current, element);
        this.openElements.push(element, html.TAG_ID.HTML);
    }
    _appendCommentNode(token, parent) {
        const commentNode = this.treeAdapter.createCommentNode(token.data);
        this.treeAdapter.appendChild(parent, commentNode);
        if (this.options.sourceCodeLocationInfo) {
            this.treeAdapter.setNodeSourceCodeLocation(commentNode, token.location);
        }
    }
    _insertCharacters(token) {
        let parent;
        let beforeElement;
        if (this._shouldFosterParentOnInsertion()) {
            ({ parent, beforeElement } = this._findFosterParentingLocation());
            if (beforeElement) {
                this.treeAdapter.insertTextBefore(parent, token.chars, beforeElement);
            }
            else {
                this.treeAdapter.insertText(parent, token.chars);
            }
        }
        else {
            parent = this.openElements.currentTmplContentOrNode;
            this.treeAdapter.insertText(parent, token.chars);
        }
        if (!token.location)
            return;
        const siblings = this.treeAdapter.getChildNodes(parent);
        const textNodeIdx = beforeElement ? siblings.lastIndexOf(beforeElement) : siblings.length;
        const textNode = siblings[textNodeIdx - 1];
        //NOTE: if we have a location assigned by another token, then just update the end position
        const tnLoc = this.treeAdapter.getNodeSourceCodeLocation(textNode);
        if (tnLoc) {
            const { endLine, endCol, endOffset } = token.location;
            this.treeAdapter.updateNodeSourceCodeLocation(textNode, { endLine, endCol, endOffset });
        }
        else if (this.options.sourceCodeLocationInfo) {
            this.treeAdapter.setNodeSourceCodeLocation(textNode, token.location);
        }
    }
    _adoptNodes(donor, recipient) {
        for (let child = this.treeAdapter.getFirstChild(donor); child; child = this.treeAdapter.getFirstChild(donor)) {
            this.treeAdapter.detachNode(child);
            this.treeAdapter.appendChild(recipient, child);
        }
    }
    _setEndLocation(element, closingToken) {
        if (this.treeAdapter.getNodeSourceCodeLocation(element) && closingToken.location) {
            const ctLoc = closingToken.location;
            const tn = this.treeAdapter.getTagName(element);
            const endLoc = 
            // NOTE: For cases like <p> <p> </p> - First 'p' closes without a closing
            // tag and for cases like <td> <p> </td> - 'p' closes without a closing tag.
            closingToken.type === token.TokenType.END_TAG && tn === closingToken.tagName
                ? {
                    endTag: Object.assign({}, ctLoc),
                    endLine: ctLoc.endLine,
                    endCol: ctLoc.endCol,
                    endOffset: ctLoc.endOffset,
                }
                : {
                    endLine: ctLoc.startLine,
                    endCol: ctLoc.startCol,
                    endOffset: ctLoc.startOffset,
                };
            this.treeAdapter.updateNodeSourceCodeLocation(element, endLoc);
        }
    }
    //Token processing
    shouldProcessStartTagTokenInForeignContent(token) {
        // Check that neither current === document, or ns === NS.HTML
        if (!this.currentNotInHTML)
            return false;
        let current;
        let currentTagId;
        if (this.openElements.stackTop === 0 && this.fragmentContext) {
            current = this.fragmentContext;
            currentTagId = this.fragmentContextID;
        }
        else {
            ({ current, currentTagId } = this.openElements);
        }
        if (token.tagID === html.TAG_ID.SVG &&
            this.treeAdapter.getTagName(current) === html.TAG_NAMES.ANNOTATION_XML &&
            this.treeAdapter.getNamespaceURI(current) === html.NS.MATHML) {
            return false;
        }
        return (
        // Check that `current` is not an integration point for HTML or MathML elements.
        this.tokenizer.inForeignNode ||
            // If it _is_ an integration point, then we might have to check that it is not an HTML
            // integration point.
            ((token.tagID === html.TAG_ID.MGLYPH || token.tagID === html.TAG_ID.MALIGNMARK) &&
                !this._isIntegrationPoint(currentTagId, current, html.NS.HTML)));
    }
    _processToken(token$1) {
        switch (token$1.type) {
            case token.TokenType.CHARACTER: {
                this.onCharacter(token$1);
                break;
            }
            case token.TokenType.NULL_CHARACTER: {
                this.onNullCharacter(token$1);
                break;
            }
            case token.TokenType.COMMENT: {
                this.onComment(token$1);
                break;
            }
            case token.TokenType.DOCTYPE: {
                this.onDoctype(token$1);
                break;
            }
            case token.TokenType.START_TAG: {
                this._processStartTag(token$1);
                break;
            }
            case token.TokenType.END_TAG: {
                this.onEndTag(token$1);
                break;
            }
            case token.TokenType.EOF: {
                this.onEof(token$1);
                break;
            }
            case token.TokenType.WHITESPACE_CHARACTER: {
                this.onWhitespaceCharacter(token$1);
                break;
            }
        }
    }
    //Integration points
    _isIntegrationPoint(tid, element, foreignNS) {
        const ns = this.treeAdapter.getNamespaceURI(element);
        const attrs = this.treeAdapter.getAttrList(element);
        return foreignContent$1.isIntegrationPoint(tid, ns, attrs, foreignNS);
    }
    //Active formatting elements reconstruction
    _reconstructActiveFormattingElements() {
        const listLength = this.activeFormattingElements.entries.length;
        if (listLength) {
            const endIndex = this.activeFormattingElements.entries.findIndex((entry) => entry.type === formattingElementList.EntryType.Marker || this.openElements.contains(entry.element));
            const unopenIdx = endIndex < 0 ? listLength - 1 : endIndex - 1;
            for (let i = unopenIdx; i >= 0; i--) {
                const entry = this.activeFormattingElements.entries[i];
                this._insertElement(entry.token, this.treeAdapter.getNamespaceURI(entry.element));
                entry.element = this.openElements.current;
            }
        }
    }
    //Close elements
    _closeTableCell() {
        this.openElements.generateImpliedEndTags();
        this.openElements.popUntilTableCellPopped();
        this.activeFormattingElements.clearToLastMarker();
        this.insertionMode = InsertionMode.IN_ROW;
    }
    _closePElement() {
        this.openElements.generateImpliedEndTagsWithExclusion(html.TAG_ID.P);
        this.openElements.popUntilTagNamePopped(html.TAG_ID.P);
    }
    //Insertion modes
    _resetInsertionMode() {
        for (let i = this.openElements.stackTop; i >= 0; i--) {
            //Insertion mode reset map
            switch (i === 0 && this.fragmentContext ? this.fragmentContextID : this.openElements.tagIDs[i]) {
                case html.TAG_ID.TR:
                    this.insertionMode = InsertionMode.IN_ROW;
                    return;
                case html.TAG_ID.TBODY:
                case html.TAG_ID.THEAD:
                case html.TAG_ID.TFOOT:
                    this.insertionMode = InsertionMode.IN_TABLE_BODY;
                    return;
                case html.TAG_ID.CAPTION:
                    this.insertionMode = InsertionMode.IN_CAPTION;
                    return;
                case html.TAG_ID.COLGROUP:
                    this.insertionMode = InsertionMode.IN_COLUMN_GROUP;
                    return;
                case html.TAG_ID.TABLE:
                    this.insertionMode = InsertionMode.IN_TABLE;
                    return;
                case html.TAG_ID.BODY:
                    this.insertionMode = InsertionMode.IN_BODY;
                    return;
                case html.TAG_ID.FRAMESET:
                    this.insertionMode = InsertionMode.IN_FRAMESET;
                    return;
                case html.TAG_ID.SELECT:
                    this._resetInsertionModeForSelect(i);
                    return;
                case html.TAG_ID.TEMPLATE:
                    this.insertionMode = this.tmplInsertionModeStack[0];
                    return;
                case html.TAG_ID.HTML:
                    this.insertionMode = this.headElement ? InsertionMode.AFTER_HEAD : InsertionMode.BEFORE_HEAD;
                    return;
                case html.TAG_ID.TD:
                case html.TAG_ID.TH:
                    if (i > 0) {
                        this.insertionMode = InsertionMode.IN_CELL;
                        return;
                    }
                    break;
                case html.TAG_ID.HEAD:
                    if (i > 0) {
                        this.insertionMode = InsertionMode.IN_HEAD;
                        return;
                    }
                    break;
            }
        }
        this.insertionMode = InsertionMode.IN_BODY;
    }
    _resetInsertionModeForSelect(selectIdx) {
        if (selectIdx > 0) {
            for (let i = selectIdx - 1; i > 0; i--) {
                const tn = this.openElements.tagIDs[i];
                if (tn === html.TAG_ID.TEMPLATE) {
                    break;
                }
                else if (tn === html.TAG_ID.TABLE) {
                    this.insertionMode = InsertionMode.IN_SELECT_IN_TABLE;
                    return;
                }
            }
        }
        this.insertionMode = InsertionMode.IN_SELECT;
    }
    //Foster parenting
    _isElementCausesFosterParenting(tn) {
        return TABLE_STRUCTURE_TAGS.has(tn);
    }
    _shouldFosterParentOnInsertion() {
        return this.fosterParentingEnabled && this._isElementCausesFosterParenting(this.openElements.currentTagId);
    }
    _findFosterParentingLocation() {
        for (let i = this.openElements.stackTop; i >= 0; i--) {
            const openElement = this.openElements.items[i];
            switch (this.openElements.tagIDs[i]) {
                case html.TAG_ID.TEMPLATE:
                    if (this.treeAdapter.getNamespaceURI(openElement) === html.NS.HTML) {
                        return { parent: this.treeAdapter.getTemplateContent(openElement), beforeElement: null };
                    }
                    break;
                case html.TAG_ID.TABLE: {
                    const parent = this.treeAdapter.getParentNode(openElement);
                    if (parent) {
                        return { parent, beforeElement: openElement };
                    }
                    return { parent: this.openElements.items[i - 1], beforeElement: null };
                }
                // Do nothing
            }
        }
        return { parent: this.openElements.items[0], beforeElement: null };
    }
    _fosterParentElement(element) {
        const location = this._findFosterParentingLocation();
        if (location.beforeElement) {
            this.treeAdapter.insertBefore(location.parent, element, location.beforeElement);
        }
        else {
            this.treeAdapter.appendChild(location.parent, element);
        }
    }
    //Special elements
    _isSpecialElement(element, id) {
        const ns = this.treeAdapter.getNamespaceURI(element);
        return html.SPECIAL_ELEMENTS[ns].has(id);
    }
    onCharacter(token) {
        this.skipNextNewLine = false;
        if (this.tokenizer.inForeignNode) {
            characterInForeignContent(this, token);
            return;
        }
        switch (this.insertionMode) {
            case InsertionMode.INITIAL:
                tokenInInitialMode(this, token);
                break;
            case InsertionMode.BEFORE_HTML:
                tokenBeforeHtml(this, token);
                break;
            case InsertionMode.BEFORE_HEAD:
                tokenBeforeHead(this, token);
                break;
            case InsertionMode.IN_HEAD:
                tokenInHead(this, token);
                break;
            case InsertionMode.IN_HEAD_NO_SCRIPT:
                tokenInHeadNoScript(this, token);
                break;
            case InsertionMode.AFTER_HEAD:
                tokenAfterHead(this, token);
                break;
            case InsertionMode.IN_BODY:
            case InsertionMode.IN_CAPTION:
            case InsertionMode.IN_CELL:
            case InsertionMode.IN_TEMPLATE:
                characterInBody(this, token);
                break;
            case InsertionMode.TEXT:
            case InsertionMode.IN_SELECT:
            case InsertionMode.IN_SELECT_IN_TABLE:
                this._insertCharacters(token);
                break;
            case InsertionMode.IN_TABLE:
            case InsertionMode.IN_TABLE_BODY:
            case InsertionMode.IN_ROW:
                characterInTable(this, token);
                break;
            case InsertionMode.IN_TABLE_TEXT:
                characterInTableText(this, token);
                break;
            case InsertionMode.IN_COLUMN_GROUP:
                tokenInColumnGroup(this, token);
                break;
            case InsertionMode.AFTER_BODY:
                tokenAfterBody(this, token);
                break;
            case InsertionMode.AFTER_AFTER_BODY:
                tokenAfterAfterBody(this, token);
                break;
            // Do nothing
        }
    }
    onNullCharacter(token) {
        this.skipNextNewLine = false;
        if (this.tokenizer.inForeignNode) {
            nullCharacterInForeignContent(this, token);
            return;
        }
        switch (this.insertionMode) {
            case InsertionMode.INITIAL:
                tokenInInitialMode(this, token);
                break;
            case InsertionMode.BEFORE_HTML:
                tokenBeforeHtml(this, token);
                break;
            case InsertionMode.BEFORE_HEAD:
                tokenBeforeHead(this, token);
                break;
            case InsertionMode.IN_HEAD:
                tokenInHead(this, token);
                break;
            case InsertionMode.IN_HEAD_NO_SCRIPT:
                tokenInHeadNoScript(this, token);
                break;
            case InsertionMode.AFTER_HEAD:
                tokenAfterHead(this, token);
                break;
            case InsertionMode.TEXT:
                this._insertCharacters(token);
                break;
            case InsertionMode.IN_TABLE:
            case InsertionMode.IN_TABLE_BODY:
            case InsertionMode.IN_ROW:
                characterInTable(this, token);
                break;
            case InsertionMode.IN_COLUMN_GROUP:
                tokenInColumnGroup(this, token);
                break;
            case InsertionMode.AFTER_BODY:
                tokenAfterBody(this, token);
                break;
            case InsertionMode.AFTER_AFTER_BODY:
                tokenAfterAfterBody(this, token);
                break;
            // Do nothing
        }
    }
    onComment(token) {
        this.skipNextNewLine = false;
        if (this.currentNotInHTML) {
            appendComment(this, token);
            return;
        }
        switch (this.insertionMode) {
            case InsertionMode.INITIAL:
            case InsertionMode.BEFORE_HTML:
            case InsertionMode.BEFORE_HEAD:
            case InsertionMode.IN_HEAD:
            case InsertionMode.IN_HEAD_NO_SCRIPT:
            case InsertionMode.AFTER_HEAD:
            case InsertionMode.IN_BODY:
            case InsertionMode.IN_TABLE:
            case InsertionMode.IN_CAPTION:
            case InsertionMode.IN_COLUMN_GROUP:
            case InsertionMode.IN_TABLE_BODY:
            case InsertionMode.IN_ROW:
            case InsertionMode.IN_CELL:
            case InsertionMode.IN_SELECT:
            case InsertionMode.IN_SELECT_IN_TABLE:
            case InsertionMode.IN_TEMPLATE:
            case InsertionMode.IN_FRAMESET:
            case InsertionMode.AFTER_FRAMESET:
                appendComment(this, token);
                break;
            case InsertionMode.IN_TABLE_TEXT:
                tokenInTableText(this, token);
                break;
            case InsertionMode.AFTER_BODY:
                appendCommentToRootHtmlElement(this, token);
                break;
            case InsertionMode.AFTER_AFTER_BODY:
            case InsertionMode.AFTER_AFTER_FRAMESET:
                appendCommentToDocument(this, token);
                break;
            // Do nothing
        }
    }
    onDoctype(token) {
        this.skipNextNewLine = false;
        switch (this.insertionMode) {
            case InsertionMode.INITIAL:
                doctypeInInitialMode(this, token);
                break;
            case InsertionMode.BEFORE_HEAD:
            case InsertionMode.IN_HEAD:
            case InsertionMode.IN_HEAD_NO_SCRIPT:
            case InsertionMode.AFTER_HEAD:
                this._err(token, errorCodes.ERR.misplacedDoctype);
                break;
            case InsertionMode.IN_TABLE_TEXT:
                tokenInTableText(this, token);
                break;
            // Do nothing
        }
    }
    onStartTag(token) {
        this.skipNextNewLine = false;
        this.currentToken = token;
        this._processStartTag(token);
        if (token.selfClosing && !token.ackSelfClosing) {
            this._err(token, errorCodes.ERR.nonVoidHtmlElementStartTagWithTrailingSolidus);
        }
    }
    /**
     * Processes a given start tag.
     *
     * `onStartTag` checks if a self-closing tag was recognized. When a token
     * is moved inbetween multiple insertion modes, this check for self-closing
     * could lead to false positives. To avoid this, `_processStartTag` is used
     * for nested calls.
     *
     * @param token The token to process.
     */
    _processStartTag(token) {
        if (this.shouldProcessStartTagTokenInForeignContent(token)) {
            startTagInForeignContent(this, token);
        }
        else {
            this._startTagOutsideForeignContent(token);
        }
    }
    _startTagOutsideForeignContent(token) {
        switch (this.insertionMode) {
            case InsertionMode.INITIAL:
                tokenInInitialMode(this, token);
                break;
            case InsertionMode.BEFORE_HTML:
                startTagBeforeHtml(this, token);
                break;
            case InsertionMode.BEFORE_HEAD:
                startTagBeforeHead(this, token);
                break;
            case InsertionMode.IN_HEAD:
                startTagInHead(this, token);
                break;
            case InsertionMode.IN_HEAD_NO_SCRIPT:
                startTagInHeadNoScript(this, token);
                break;
            case InsertionMode.AFTER_HEAD:
                startTagAfterHead(this, token);
                break;
            case InsertionMode.IN_BODY:
                startTagInBody(this, token);
                break;
            case InsertionMode.IN_TABLE:
                startTagInTable(this, token);
                break;
            case InsertionMode.IN_TABLE_TEXT:
                tokenInTableText(this, token);
                break;
            case InsertionMode.IN_CAPTION:
                startTagInCaption(this, token);
                break;
            case InsertionMode.IN_COLUMN_GROUP:
                startTagInColumnGroup(this, token);
                break;
            case InsertionMode.IN_TABLE_BODY:
                startTagInTableBody(this, token);
                break;
            case InsertionMode.IN_ROW:
                startTagInRow(this, token);
                break;
            case InsertionMode.IN_CELL:
                startTagInCell(this, token);
                break;
            case InsertionMode.IN_SELECT:
                startTagInSelect(this, token);
                break;
            case InsertionMode.IN_SELECT_IN_TABLE:
                startTagInSelectInTable(this, token);
                break;
            case InsertionMode.IN_TEMPLATE:
                startTagInTemplate(this, token);
                break;
            case InsertionMode.AFTER_BODY:
                startTagAfterBody(this, token);
                break;
            case InsertionMode.IN_FRAMESET:
                startTagInFrameset(this, token);
                break;
            case InsertionMode.AFTER_FRAMESET:
                startTagAfterFrameset(this, token);
                break;
            case InsertionMode.AFTER_AFTER_BODY:
                startTagAfterAfterBody(this, token);
                break;
            case InsertionMode.AFTER_AFTER_FRAMESET:
                startTagAfterAfterFrameset(this, token);
                break;
            // Do nothing
        }
    }
    onEndTag(token) {
        this.skipNextNewLine = false;
        this.currentToken = token;
        if (this.currentNotInHTML) {
            endTagInForeignContent(this, token);
        }
        else {
            this._endTagOutsideForeignContent(token);
        }
    }
    _endTagOutsideForeignContent(token) {
        switch (this.insertionMode) {
            case InsertionMode.INITIAL:
                tokenInInitialMode(this, token);
                break;
            case InsertionMode.BEFORE_HTML:
                endTagBeforeHtml(this, token);
                break;
            case InsertionMode.BEFORE_HEAD:
                endTagBeforeHead(this, token);
                break;
            case InsertionMode.IN_HEAD:
                endTagInHead(this, token);
                break;
            case InsertionMode.IN_HEAD_NO_SCRIPT:
                endTagInHeadNoScript(this, token);
                break;
            case InsertionMode.AFTER_HEAD:
                endTagAfterHead(this, token);
                break;
            case InsertionMode.IN_BODY:
                endTagInBody(this, token);
                break;
            case InsertionMode.TEXT:
                endTagInText(this, token);
                break;
            case InsertionMode.IN_TABLE:
                endTagInTable(this, token);
                break;
            case InsertionMode.IN_TABLE_TEXT:
                tokenInTableText(this, token);
                break;
            case InsertionMode.IN_CAPTION:
                endTagInCaption(this, token);
                break;
            case InsertionMode.IN_COLUMN_GROUP:
                endTagInColumnGroup(this, token);
                break;
            case InsertionMode.IN_TABLE_BODY:
                endTagInTableBody(this, token);
                break;
            case InsertionMode.IN_ROW:
                endTagInRow(this, token);
                break;
            case InsertionMode.IN_CELL:
                endTagInCell(this, token);
                break;
            case InsertionMode.IN_SELECT:
                endTagInSelect(this, token);
                break;
            case InsertionMode.IN_SELECT_IN_TABLE:
                endTagInSelectInTable(this, token);
                break;
            case InsertionMode.IN_TEMPLATE:
                endTagInTemplate(this, token);
                break;
            case InsertionMode.AFTER_BODY:
                endTagAfterBody(this, token);
                break;
            case InsertionMode.IN_FRAMESET:
                endTagInFrameset(this, token);
                break;
            case InsertionMode.AFTER_FRAMESET:
                endTagAfterFrameset(this, token);
                break;
            case InsertionMode.AFTER_AFTER_BODY:
                tokenAfterAfterBody(this, token);
                break;
            // Do nothing
        }
    }
    onEof(token) {
        switch (this.insertionMode) {
            case InsertionMode.INITIAL:
                tokenInInitialMode(this, token);
                break;
            case InsertionMode.BEFORE_HTML:
                tokenBeforeHtml(this, token);
                break;
            case InsertionMode.BEFORE_HEAD:
                tokenBeforeHead(this, token);
                break;
            case InsertionMode.IN_HEAD:
                tokenInHead(this, token);
                break;
            case InsertionMode.IN_HEAD_NO_SCRIPT:
                tokenInHeadNoScript(this, token);
                break;
            case InsertionMode.AFTER_HEAD:
                tokenAfterHead(this, token);
                break;
            case InsertionMode.IN_BODY:
            case InsertionMode.IN_TABLE:
            case InsertionMode.IN_CAPTION:
            case InsertionMode.IN_COLUMN_GROUP:
            case InsertionMode.IN_TABLE_BODY:
            case InsertionMode.IN_ROW:
            case InsertionMode.IN_CELL:
            case InsertionMode.IN_SELECT:
            case InsertionMode.IN_SELECT_IN_TABLE:
                eofInBody(this, token);
                break;
            case InsertionMode.TEXT:
                eofInText(this, token);
                break;
            case InsertionMode.IN_TABLE_TEXT:
                tokenInTableText(this, token);
                break;
            case InsertionMode.IN_TEMPLATE:
                eofInTemplate(this, token);
                break;
            case InsertionMode.AFTER_BODY:
            case InsertionMode.IN_FRAMESET:
            case InsertionMode.AFTER_FRAMESET:
            case InsertionMode.AFTER_AFTER_BODY:
            case InsertionMode.AFTER_AFTER_FRAMESET:
                stopParsing(this, token);
                break;
            // Do nothing
        }
    }
    onWhitespaceCharacter(token) {
        if (this.skipNextNewLine) {
            this.skipNextNewLine = false;
            if (token.chars.charCodeAt(0) === unicode$1.CODE_POINTS.LINE_FEED) {
                if (token.chars.length === 1) {
                    return;
                }
                token.chars = token.chars.substr(1);
            }
        }
        if (this.tokenizer.inForeignNode) {
            this._insertCharacters(token);
            return;
        }
        switch (this.insertionMode) {
            case InsertionMode.IN_HEAD:
            case InsertionMode.IN_HEAD_NO_SCRIPT:
            case InsertionMode.AFTER_HEAD:
            case InsertionMode.TEXT:
            case InsertionMode.IN_COLUMN_GROUP:
            case InsertionMode.IN_SELECT:
            case InsertionMode.IN_SELECT_IN_TABLE:
            case InsertionMode.IN_FRAMESET:
            case InsertionMode.AFTER_FRAMESET:
                this._insertCharacters(token);
                break;
            case InsertionMode.IN_BODY:
            case InsertionMode.IN_CAPTION:
            case InsertionMode.IN_CELL:
            case InsertionMode.IN_TEMPLATE:
            case InsertionMode.AFTER_BODY:
            case InsertionMode.AFTER_AFTER_BODY:
            case InsertionMode.AFTER_AFTER_FRAMESET:
                whitespaceCharacterInBody(this, token);
                break;
            case InsertionMode.IN_TABLE:
            case InsertionMode.IN_TABLE_BODY:
            case InsertionMode.IN_ROW:
                characterInTable(this, token);
                break;
            case InsertionMode.IN_TABLE_TEXT:
                whitespaceCharacterInTableText(this, token);
                break;
            // Do nothing
        }
    }
}
exports.Parser = Parser;
//Adoption agency algorithm
//(see: http://www.whatwg.org/specs/web-apps/current-work/multipage/tree-construction.html#adoptionAgency)
//------------------------------------------------------------------
//Steps 5-8 of the algorithm
function aaObtainFormattingElementEntry(p, token) {
    let formattingElementEntry = p.activeFormattingElements.getElementEntryInScopeWithTagName(token.tagName);
    if (formattingElementEntry) {
        if (!p.openElements.contains(formattingElementEntry.element)) {
            p.activeFormattingElements.removeEntry(formattingElementEntry);
            formattingElementEntry = null;
        }
        else if (!p.openElements.hasInScope(token.tagID)) {
            formattingElementEntry = null;
        }
    }
    else {
        genericEndTagInBody(p, token);
    }
    return formattingElementEntry;
}
//Steps 9 and 10 of the algorithm
function aaObtainFurthestBlock(p, formattingElementEntry) {
    let furthestBlock = null;
    let idx = p.openElements.stackTop;
    for (; idx >= 0; idx--) {
        const element = p.openElements.items[idx];
        if (element === formattingElementEntry.element) {
            break;
        }
        if (p._isSpecialElement(element, p.openElements.tagIDs[idx])) {
            furthestBlock = element;
        }
    }
    if (!furthestBlock) {
        p.openElements.shortenToLength(idx < 0 ? 0 : idx);
        p.activeFormattingElements.removeEntry(formattingElementEntry);
    }
    return furthestBlock;
}
//Step 13 of the algorithm
function aaInnerLoop(p, furthestBlock, formattingElement) {
    let lastElement = furthestBlock;
    let nextElement = p.openElements.getCommonAncestor(furthestBlock);
    for (let i = 0, element = nextElement; element !== formattingElement; i++, element = nextElement) {
        //NOTE: store the next element for the next loop iteration (it may be deleted from the stack by step 9.5)
        nextElement = p.openElements.getCommonAncestor(element);
        const elementEntry = p.activeFormattingElements.getElementEntry(element);
        const counterOverflow = elementEntry && i >= AA_INNER_LOOP_ITER;
        const shouldRemoveFromOpenElements = !elementEntry || counterOverflow;
        if (shouldRemoveFromOpenElements) {
            if (counterOverflow) {
                p.activeFormattingElements.removeEntry(elementEntry);
            }
            p.openElements.remove(element);
        }
        else {
            element = aaRecreateElementFromEntry(p, elementEntry);
            if (lastElement === furthestBlock) {
                p.activeFormattingElements.bookmark = elementEntry;
            }
            p.treeAdapter.detachNode(lastElement);
            p.treeAdapter.appendChild(element, lastElement);
            lastElement = element;
        }
    }
    return lastElement;
}
//Step 13.7 of the algorithm
function aaRecreateElementFromEntry(p, elementEntry) {
    const ns = p.treeAdapter.getNamespaceURI(elementEntry.element);
    const newElement = p.treeAdapter.createElement(elementEntry.token.tagName, ns, elementEntry.token.attrs, elementEntry.token);
    p.openElements.replace(elementEntry.element, newElement);
    elementEntry.element = newElement;
    return newElement;
}
//Step 14 of the algorithm
function aaInsertLastNodeInCommonAncestor(p, commonAncestor, lastElement) {
    const tn = p.treeAdapter.getTagName(commonAncestor);
    const tid = (0, html.getTagID)(tn);
    if (p._isElementCausesFosterParenting(tid)) {
        p._fosterParentElement(lastElement);
    }
    else {
        const ns = p.treeAdapter.getNamespaceURI(commonAncestor);
        if (tid === html.TAG_ID.TEMPLATE && ns === html.NS.HTML) {
            commonAncestor = p.treeAdapter.getTemplateContent(commonAncestor);
        }
        p.treeAdapter.appendChild(commonAncestor, lastElement);
    }
}
//Steps 15-19 of the algorithm
function aaReplaceFormattingElement(p, furthestBlock, formattingElementEntry) {
    const ns = p.treeAdapter.getNamespaceURI(formattingElementEntry.element);
    const { token } = formattingElementEntry;
    const newElement = p.treeAdapter.createElement(token.tagName, ns, token.attrs, Object.create(null));
    p._adoptNodes(furthestBlock, newElement);
    p.treeAdapter.appendChild(furthestBlock, newElement);
    p.activeFormattingElements.insertElementAfterBookmark(newElement, token);
    p.activeFormattingElements.removeEntry(formattingElementEntry);
    p.openElements.remove(formattingElementEntry.element);
    p.openElements.insertAfter(furthestBlock, newElement, token.tagID);
}
//Algorithm entry point
function callAdoptionAgency(p, token) {
    for (let i = 0; i < AA_OUTER_LOOP_ITER; i++) {
        const formattingElementEntry = aaObtainFormattingElementEntry(p, token);
        if (!formattingElementEntry) {
            break;
        }
        const furthestBlock = aaObtainFurthestBlock(p, formattingElementEntry);
        if (!furthestBlock) {
            break;
        }
        p.activeFormattingElements.bookmark = formattingElementEntry;
        const lastElement = aaInnerLoop(p, furthestBlock, formattingElementEntry.element);
        const commonAncestor = p.openElements.getCommonAncestor(formattingElementEntry.element);
        p.treeAdapter.detachNode(lastElement);
        if (commonAncestor)
            aaInsertLastNodeInCommonAncestor(p, commonAncestor, lastElement);
        aaReplaceFormattingElement(p, furthestBlock, formattingElementEntry);
    }
}
//Generic token handlers
//------------------------------------------------------------------
function appendComment(p, token) {
    p._appendCommentNode(token, p.openElements.currentTmplContentOrNode);
}
function appendCommentToRootHtmlElement(p, token) {
    p._appendCommentNode(token, p.openElements.items[0]);
}
function appendCommentToDocument(p, token) {
    p._appendCommentNode(token, p.document);
}
function stopParsing(p, token) {
    p.stopped = true;
    // NOTE: Set end locations for elements that remain on the open element stack.
    if (token.location) {
        // NOTE: If we are not in a fragment, `html` and `body` will stay on the stack.
        // This is a problem, as we might overwrite their end position here.
        const target = p.fragmentContext ? 0 : 2;
        for (let i = p.openElements.stackTop; i >= target; i--) {
            p._setEndLocation(p.openElements.items[i], token);
        }
        // Handle `html` and `body`
        if (!p.fragmentContext && p.openElements.stackTop >= 0) {
            const htmlElement = p.openElements.items[0];
            const htmlLocation = p.treeAdapter.getNodeSourceCodeLocation(htmlElement);
            if (htmlLocation && !htmlLocation.endTag) {
                p._setEndLocation(htmlElement, token);
                if (p.openElements.stackTop >= 1) {
                    const bodyElement = p.openElements.items[1];
                    const bodyLocation = p.treeAdapter.getNodeSourceCodeLocation(bodyElement);
                    if (bodyLocation && !bodyLocation.endTag) {
                        p._setEndLocation(bodyElement, token);
                    }
                }
            }
        }
    }
}
// The "initial" insertion mode
//------------------------------------------------------------------
function doctypeInInitialMode(p, token) {
    p._setDocumentType(token);
    const mode = token.forceQuirks ? html.DOCUMENT_MODE.QUIRKS : doctype$1.getDocumentMode(token);
    if (!doctype$1.isConforming(token)) {
        p._err(token, errorCodes.ERR.nonConformingDoctype);
    }
    p.treeAdapter.setDocumentMode(p.document, mode);
    p.insertionMode = InsertionMode.BEFORE_HTML;
}
function tokenInInitialMode(p, token) {
    p._err(token, errorCodes.ERR.missingDoctype, true);
    p.treeAdapter.setDocumentMode(p.document, html.DOCUMENT_MODE.QUIRKS);
    p.insertionMode = InsertionMode.BEFORE_HTML;
    p._processToken(token);
}
// The "before html" insertion mode
//------------------------------------------------------------------
function startTagBeforeHtml(p, token) {
    if (token.tagID === html.TAG_ID.HTML) {
        p._insertElement(token, html.NS.HTML);
        p.insertionMode = InsertionMode.BEFORE_HEAD;
    }
    else {
        tokenBeforeHtml(p, token);
    }
}
function endTagBeforeHtml(p, token) {
    const tn = token.tagID;
    if (tn === html.TAG_ID.HTML || tn === html.TAG_ID.HEAD || tn === html.TAG_ID.BODY || tn === html.TAG_ID.BR) {
        tokenBeforeHtml(p, token);
    }
}
function tokenBeforeHtml(p, token) {
    p._insertFakeRootElement();
    p.insertionMode = InsertionMode.BEFORE_HEAD;
    p._processToken(token);
}
// The "before head" insertion mode
//------------------------------------------------------------------
function startTagBeforeHead(p, token) {
    switch (token.tagID) {
        case html.TAG_ID.HTML: {
            startTagInBody(p, token);
            break;
        }
        case html.TAG_ID.HEAD: {
            p._insertElement(token, html.NS.HTML);
            p.headElement = p.openElements.current;
            p.insertionMode = InsertionMode.IN_HEAD;
            break;
        }
        default: {
            tokenBeforeHead(p, token);
        }
    }
}
function endTagBeforeHead(p, token) {
    const tn = token.tagID;
    if (tn === html.TAG_ID.HEAD || tn === html.TAG_ID.BODY || tn === html.TAG_ID.HTML || tn === html.TAG_ID.BR) {
        tokenBeforeHead(p, token);
    }
    else {
        p._err(token, errorCodes.ERR.endTagWithoutMatchingOpenElement);
    }
}
function tokenBeforeHead(p, token) {
    p._insertFakeElement(html.TAG_NAMES.HEAD, html.TAG_ID.HEAD);
    p.headElement = p.openElements.current;
    p.insertionMode = InsertionMode.IN_HEAD;
    p._processToken(token);
}
// The "in head" insertion mode
//------------------------------------------------------------------
function startTagInHead(p, token) {
    switch (token.tagID) {
        case html.TAG_ID.HTML: {
            startTagInBody(p, token);
            break;
        }
        case html.TAG_ID.BASE:
        case html.TAG_ID.BASEFONT:
        case html.TAG_ID.BGSOUND:
        case html.TAG_ID.LINK:
        case html.TAG_ID.META: {
            p._appendElement(token, html.NS.HTML);
            token.ackSelfClosing = true;
            break;
        }
        case html.TAG_ID.TITLE: {
            p._switchToTextParsing(token, tokenizer.TokenizerMode.RCDATA);
            break;
        }
        case html.TAG_ID.NOSCRIPT: {
            if (p.options.scriptingEnabled) {
                p._switchToTextParsing(token, tokenizer.TokenizerMode.RAWTEXT);
            }
            else {
                p._insertElement(token, html.NS.HTML);
                p.insertionMode = InsertionMode.IN_HEAD_NO_SCRIPT;
            }
            break;
        }
        case html.TAG_ID.NOFRAMES:
        case html.TAG_ID.STYLE: {
            p._switchToTextParsing(token, tokenizer.TokenizerMode.RAWTEXT);
            break;
        }
        case html.TAG_ID.SCRIPT: {
            p._switchToTextParsing(token, tokenizer.TokenizerMode.SCRIPT_DATA);
            break;
        }
        case html.TAG_ID.TEMPLATE: {
            p._insertTemplate(token);
            p.activeFormattingElements.insertMarker();
            p.framesetOk = false;
            p.insertionMode = InsertionMode.IN_TEMPLATE;
            p.tmplInsertionModeStack.unshift(InsertionMode.IN_TEMPLATE);
            break;
        }
        case html.TAG_ID.HEAD: {
            p._err(token, errorCodes.ERR.misplacedStartTagForHeadElement);
            break;
        }
        default: {
            tokenInHead(p, token);
        }
    }
}
function endTagInHead(p, token) {
    switch (token.tagID) {
        case html.TAG_ID.HEAD: {
            p.openElements.pop();
            p.insertionMode = InsertionMode.AFTER_HEAD;
            break;
        }
        case html.TAG_ID.BODY:
        case html.TAG_ID.BR:
        case html.TAG_ID.HTML: {
            tokenInHead(p, token);
            break;
        }
        case html.TAG_ID.TEMPLATE: {
            templateEndTagInHead(p, token);
            break;
        }
        default: {
            p._err(token, errorCodes.ERR.endTagWithoutMatchingOpenElement);
        }
    }
}
function templateEndTagInHead(p, token) {
    if (p.openElements.tmplCount > 0) {
        p.openElements.generateImpliedEndTagsThoroughly();
        if (p.openElements.currentTagId !== html.TAG_ID.TEMPLATE) {
            p._err(token, errorCodes.ERR.closingOfElementWithOpenChildElements);
        }
        p.openElements.popUntilTagNamePopped(html.TAG_ID.TEMPLATE);
        p.activeFormattingElements.clearToLastMarker();
        p.tmplInsertionModeStack.shift();
        p._resetInsertionMode();
    }
    else {
        p._err(token, errorCodes.ERR.endTagWithoutMatchingOpenElement);
    }
}
function tokenInHead(p, token) {
    p.openElements.pop();
    p.insertionMode = InsertionMode.AFTER_HEAD;
    p._processToken(token);
}
// The "in head no script" insertion mode
//------------------------------------------------------------------
function startTagInHeadNoScript(p, token) {
    switch (token.tagID) {
        case html.TAG_ID.HTML: {
            startTagInBody(p, token);
            break;
        }
        case html.TAG_ID.BASEFONT:
        case html.TAG_ID.BGSOUND:
        case html.TAG_ID.HEAD:
        case html.TAG_ID.LINK:
        case html.TAG_ID.META:
        case html.TAG_ID.NOFRAMES:
        case html.TAG_ID.STYLE: {
            startTagInHead(p, token);
            break;
        }
        case html.TAG_ID.NOSCRIPT: {
            p._err(token, errorCodes.ERR.nestedNoscriptInHead);
            break;
        }
        default: {
            tokenInHeadNoScript(p, token);
        }
    }
}
function endTagInHeadNoScript(p, token) {
    switch (token.tagID) {
        case html.TAG_ID.NOSCRIPT: {
            p.openElements.pop();
            p.insertionMode = InsertionMode.IN_HEAD;
            break;
        }
        case html.TAG_ID.BR: {
            tokenInHeadNoScript(p, token);
            break;
        }
        default: {
            p._err(token, errorCodes.ERR.endTagWithoutMatchingOpenElement);
        }
    }
}
function tokenInHeadNoScript(p, token$1) {
    const errCode = token$1.type === token.TokenType.EOF ? errorCodes.ERR.openElementsLeftAfterEof : errorCodes.ERR.disallowedContentInNoscriptInHead;
    p._err(token$1, errCode);
    p.openElements.pop();
    p.insertionMode = InsertionMode.IN_HEAD;
    p._processToken(token$1);
}
// The "after head" insertion mode
//------------------------------------------------------------------
function startTagAfterHead(p, token) {
    switch (token.tagID) {
        case html.TAG_ID.HTML: {
            startTagInBody(p, token);
            break;
        }
        case html.TAG_ID.BODY: {
            p._insertElement(token, html.NS.HTML);
            p.framesetOk = false;
            p.insertionMode = InsertionMode.IN_BODY;
            break;
        }
        case html.TAG_ID.FRAMESET: {
            p._insertElement(token, html.NS.HTML);
            p.insertionMode = InsertionMode.IN_FRAMESET;
            break;
        }
        case html.TAG_ID.BASE:
        case html.TAG_ID.BASEFONT:
        case html.TAG_ID.BGSOUND:
        case html.TAG_ID.LINK:
        case html.TAG_ID.META:
        case html.TAG_ID.NOFRAMES:
        case html.TAG_ID.SCRIPT:
        case html.TAG_ID.STYLE:
        case html.TAG_ID.TEMPLATE:
        case html.TAG_ID.TITLE: {
            p._err(token, errorCodes.ERR.abandonedHeadElementChild);
            p.openElements.push(p.headElement, html.TAG_ID.HEAD);
            startTagInHead(p, token);
            p.openElements.remove(p.headElement);
            break;
        }
        case html.TAG_ID.HEAD: {
            p._err(token, errorCodes.ERR.misplacedStartTagForHeadElement);
            break;
        }
        default: {
            tokenAfterHead(p, token);
        }
    }
}
function endTagAfterHead(p, token) {
    switch (token.tagID) {
        case html.TAG_ID.BODY:
        case html.TAG_ID.HTML:
        case html.TAG_ID.BR: {
            tokenAfterHead(p, token);
            break;
        }
        case html.TAG_ID.TEMPLATE: {
            templateEndTagInHead(p, token);
            break;
        }
        default: {
            p._err(token, errorCodes.ERR.endTagWithoutMatchingOpenElement);
        }
    }
}
function tokenAfterHead(p, token) {
    p._insertFakeElement(html.TAG_NAMES.BODY, html.TAG_ID.BODY);
    p.insertionMode = InsertionMode.IN_BODY;
    modeInBody(p, token);
}
// The "in body" insertion mode
//------------------------------------------------------------------
function modeInBody(p, token$1) {
    switch (token$1.type) {
        case token.TokenType.CHARACTER: {
            characterInBody(p, token$1);
            break;
        }
        case token.TokenType.WHITESPACE_CHARACTER: {
            whitespaceCharacterInBody(p, token$1);
            break;
        }
        case token.TokenType.COMMENT: {
            appendComment(p, token$1);
            break;
        }
        case token.TokenType.START_TAG: {
            startTagInBody(p, token$1);
            break;
        }
        case token.TokenType.END_TAG: {
            endTagInBody(p, token$1);
            break;
        }
        case token.TokenType.EOF: {
            eofInBody(p, token$1);
            break;
        }
        // Do nothing
    }
}
function whitespaceCharacterInBody(p, token) {
    p._reconstructActiveFormattingElements();
    p._insertCharacters(token);
}
function characterInBody(p, token) {
    p._reconstructActiveFormattingElements();
    p._insertCharacters(token);
    p.framesetOk = false;
}
function htmlStartTagInBody(p, token) {
    if (p.openElements.tmplCount === 0) {
        p.treeAdapter.adoptAttributes(p.openElements.items[0], token.attrs);
    }
}
function bodyStartTagInBody(p, token) {
    const bodyElement = p.openElements.tryPeekProperlyNestedBodyElement();
    if (bodyElement && p.openElements.tmplCount === 0) {
        p.framesetOk = false;
        p.treeAdapter.adoptAttributes(bodyElement, token.attrs);
    }
}
function framesetStartTagInBody(p, token) {
    const bodyElement = p.openElements.tryPeekProperlyNestedBodyElement();
    if (p.framesetOk && bodyElement) {
        p.treeAdapter.detachNode(bodyElement);
        p.openElements.popAllUpToHtmlElement();
        p._insertElement(token, html.NS.HTML);
        p.insertionMode = InsertionMode.IN_FRAMESET;
    }
}
function addressStartTagInBody(p, token) {
    if (p.openElements.hasInButtonScope(html.TAG_ID.P)) {
        p._closePElement();
    }
    p._insertElement(token, html.NS.HTML);
}
function numberedHeaderStartTagInBody(p, token) {
    if (p.openElements.hasInButtonScope(html.TAG_ID.P)) {
        p._closePElement();
    }
    if ((0, html.isNumberedHeader)(p.openElements.currentTagId)) {
        p.openElements.pop();
    }
    p._insertElement(token, html.NS.HTML);
}
function preStartTagInBody(p, token) {
    if (p.openElements.hasInButtonScope(html.TAG_ID.P)) {
        p._closePElement();
    }
    p._insertElement(token, html.NS.HTML);
    //NOTE: If the next token is a U+000A LINE FEED (LF) character token, then ignore that token and move
    //on to the next one. (Newlines at the start of pre blocks are ignored as an authoring convenience.)
    p.skipNextNewLine = true;
    p.framesetOk = false;
}
function formStartTagInBody(p, token) {
    const inTemplate = p.openElements.tmplCount > 0;
    if (!p.formElement || inTemplate) {
        if (p.openElements.hasInButtonScope(html.TAG_ID.P)) {
            p._closePElement();
        }
        p._insertElement(token, html.NS.HTML);
        if (!inTemplate) {
            p.formElement = p.openElements.current;
        }
    }
}
function listItemStartTagInBody(p, token) {
    p.framesetOk = false;
    const tn = token.tagID;
    for (let i = p.openElements.stackTop; i >= 0; i--) {
        const elementId = p.openElements.tagIDs[i];
        if ((tn === html.TAG_ID.LI && elementId === html.TAG_ID.LI) ||
            ((tn === html.TAG_ID.DD || tn === html.TAG_ID.DT) && (elementId === html.TAG_ID.DD || elementId === html.TAG_ID.DT))) {
            p.openElements.generateImpliedEndTagsWithExclusion(elementId);
            p.openElements.popUntilTagNamePopped(elementId);
            break;
        }
        if (elementId !== html.TAG_ID.ADDRESS &&
            elementId !== html.TAG_ID.DIV &&
            elementId !== html.TAG_ID.P &&
            p._isSpecialElement(p.openElements.items[i], elementId)) {
            break;
        }
    }
    if (p.openElements.hasInButtonScope(html.TAG_ID.P)) {
        p._closePElement();
    }
    p._insertElement(token, html.NS.HTML);
}
function plaintextStartTagInBody(p, token) {
    if (p.openElements.hasInButtonScope(html.TAG_ID.P)) {
        p._closePElement();
    }
    p._insertElement(token, html.NS.HTML);
    p.tokenizer.state = tokenizer.TokenizerMode.PLAINTEXT;
}
function buttonStartTagInBody(p, token) {
    if (p.openElements.hasInScope(html.TAG_ID.BUTTON)) {
        p.openElements.generateImpliedEndTags();
        p.openElements.popUntilTagNamePopped(html.TAG_ID.BUTTON);
    }
    p._reconstructActiveFormattingElements();
    p._insertElement(token, html.NS.HTML);
    p.framesetOk = false;
}
function aStartTagInBody(p, token) {
    const activeElementEntry = p.activeFormattingElements.getElementEntryInScopeWithTagName(html.TAG_NAMES.A);
    if (activeElementEntry) {
        callAdoptionAgency(p, token);
        p.openElements.remove(activeElementEntry.element);
        p.activeFormattingElements.removeEntry(activeElementEntry);
    }
    p._reconstructActiveFormattingElements();
    p._insertElement(token, html.NS.HTML);
    p.activeFormattingElements.pushElement(p.openElements.current, token);
}
function bStartTagInBody(p, token) {
    p._reconstructActiveFormattingElements();
    p._insertElement(token, html.NS.HTML);
    p.activeFormattingElements.pushElement(p.openElements.current, token);
}
function nobrStartTagInBody(p, token) {
    p._reconstructActiveFormattingElements();
    if (p.openElements.hasInScope(html.TAG_ID.NOBR)) {
        callAdoptionAgency(p, token);
        p._reconstructActiveFormattingElements();
    }
    p._insertElement(token, html.NS.HTML);
    p.activeFormattingElements.pushElement(p.openElements.current, token);
}
function appletStartTagInBody(p, token) {
    p._reconstructActiveFormattingElements();
    p._insertElement(token, html.NS.HTML);
    p.activeFormattingElements.insertMarker();
    p.framesetOk = false;
}
function tableStartTagInBody(p, token) {
    if (p.treeAdapter.getDocumentMode(p.document) !== html.DOCUMENT_MODE.QUIRKS && p.openElements.hasInButtonScope(html.TAG_ID.P)) {
        p._closePElement();
    }
    p._insertElement(token, html.NS.HTML);
    p.framesetOk = false;
    p.insertionMode = InsertionMode.IN_TABLE;
}
function areaStartTagInBody(p, token) {
    p._reconstructActiveFormattingElements();
    p._appendElement(token, html.NS.HTML);
    p.framesetOk = false;
    token.ackSelfClosing = true;
}
function isHiddenInput(token$1) {
    const inputType = (0, token.getTokenAttr)(token$1, html.ATTRS.TYPE);
    return inputType != null && inputType.toLowerCase() === HIDDEN_INPUT_TYPE;
}
function inputStartTagInBody(p, token) {
    p._reconstructActiveFormattingElements();
    p._appendElement(token, html.NS.HTML);
    if (!isHiddenInput(token)) {
        p.framesetOk = false;
    }
    token.ackSelfClosing = true;
}
function paramStartTagInBody(p, token) {
    p._appendElement(token, html.NS.HTML);
    token.ackSelfClosing = true;
}
function hrStartTagInBody(p, token) {
    if (p.openElements.hasInButtonScope(html.TAG_ID.P)) {
        p._closePElement();
    }
    p._appendElement(token, html.NS.HTML);
    p.framesetOk = false;
    token.ackSelfClosing = true;
}
function imageStartTagInBody(p, token) {
    // token.tagName = TN.IMG;
    // token.tagID = $.IMG;
    areaStartTagInBody(p, token);
}
function textareaStartTagInBody(p, token) {
    // p._insertElement(token, NS.HTML);
    //NOTE: If the next token is a U+000A LINE FEED (LF) character token, then ignore that token and move
    //on to the next one. (Newlines at the start of textarea elements are ignored as an authoring convenience.)
    // p.skipNextNewLine = true;
    // p.tokenizer.state = TokenizerMode.RCDATA;
    // p.originalInsertionMode = p.insertionMode;
    // p.framesetOk = false;
    // p.insertionMode = InsertionMode.TEXT;
    p._reconstructActiveFormattingElements();
    p._insertElement(token, html.NS.HTML);
    p.framesetOk = false;
}
function xmpStartTagInBody(p, token) {
    if (p.openElements.hasInButtonScope(html.TAG_ID.P)) {
        p._closePElement();
    }
    p._reconstructActiveFormattingElements();
    p.framesetOk = false;
    p._switchToTextParsing(token, tokenizer.TokenizerMode.RAWTEXT);
}
function iframeStartTagInBody(p, token) {
    p.framesetOk = false;
    p._switchToTextParsing(token, tokenizer.TokenizerMode.RAWTEXT);
}
//NOTE: here we assume that we always act as an user agent with enabled plugins, so we parse
//<noembed> as rawtext.
function noembedStartTagInBody(p, token) {
    p._switchToTextParsing(token, tokenizer.TokenizerMode.RAWTEXT);
}
function selectStartTagInBody(p, token) {
    p._reconstructActiveFormattingElements();
    p._insertElement(token, html.NS.HTML);
    p.framesetOk = false;
    p.insertionMode =
        p.insertionMode === InsertionMode.IN_TABLE ||
            p.insertionMode === InsertionMode.IN_CAPTION ||
            p.insertionMode === InsertionMode.IN_TABLE_BODY ||
            p.insertionMode === InsertionMode.IN_ROW ||
            p.insertionMode === InsertionMode.IN_CELL
            ? InsertionMode.IN_SELECT_IN_TABLE
            : InsertionMode.IN_SELECT;
}
function optgroupStartTagInBody(p, token) {
    if (p.openElements.currentTagId === html.TAG_ID.OPTION) {
        p.openElements.pop();
    }
    p._reconstructActiveFormattingElements();
    p._insertElement(token, html.NS.HTML);
}
function rbStartTagInBody(p, token) {
    if (p.openElements.hasInScope(html.TAG_ID.RUBY)) {
        p.openElements.generateImpliedEndTags();
    }
    p._insertElement(token, html.NS.HTML);
}
function rtStartTagInBody(p, token) {
    if (p.openElements.hasInScope(html.TAG_ID.RUBY)) {
        p.openElements.generateImpliedEndTagsWithExclusion(html.TAG_ID.RTC);
    }
    p._insertElement(token, html.NS.HTML);
}
function mathStartTagInBody(p, token) {
    p._reconstructActiveFormattingElements();
    foreignContent$1.adjustTokenMathMLAttrs(token);
    foreignContent$1.adjustTokenXMLAttrs(token);
    if (token.selfClosing) {
        p._appendElement(token, html.NS.MATHML);
    }
    else {
        p._insertElement(token, html.NS.MATHML);
    }
    token.ackSelfClosing = true;
}
function svgStartTagInBody(p, token) {
    p._reconstructActiveFormattingElements();
    foreignContent$1.adjustTokenSVGAttrs(token);
    foreignContent$1.adjustTokenXMLAttrs(token);
    if (token.selfClosing) {
        p._appendElement(token, html.NS.SVG);
    }
    else {
        p._insertElement(token, html.NS.SVG);
    }
    token.ackSelfClosing = true;
}
function genericStartTagInBody(p, token) {
    p._reconstructActiveFormattingElements();
    p._insertElement(token, html.NS.HTML);
}
function startTagInBody(p, token) {
    switch (token.tagID) {
        case html.TAG_ID.I:
        case html.TAG_ID.S:
        case html.TAG_ID.B:
        case html.TAG_ID.U:
        case html.TAG_ID.EM:
        case html.TAG_ID.TT:
        case html.TAG_ID.BIG:
        case html.TAG_ID.CODE:
        case html.TAG_ID.FONT:
        case html.TAG_ID.SMALL:
        case html.TAG_ID.STRIKE:
        case html.TAG_ID.STRONG: {
            bStartTagInBody(p, token);
            break;
        }
        case html.TAG_ID.A: {
            aStartTagInBody(p, token);
            break;
        }
        case html.TAG_ID.H1:
        case html.TAG_ID.H2:
        case html.TAG_ID.H3:
        case html.TAG_ID.H4:
        case html.TAG_ID.H5:
        case html.TAG_ID.H6: {
            numberedHeaderStartTagInBody(p, token);
            break;
        }
        case html.TAG_ID.P:
        case html.TAG_ID.DL:
        case html.TAG_ID.OL:
        case html.TAG_ID.UL:
        case html.TAG_ID.DIV:
        case html.TAG_ID.DIR:
        case html.TAG_ID.NAV:
        case html.TAG_ID.MAIN:
        case html.TAG_ID.MENU:
        case html.TAG_ID.ASIDE:
        case html.TAG_ID.CENTER:
        case html.TAG_ID.FIGURE:
        case html.TAG_ID.FOOTER:
        case html.TAG_ID.HEADER:
        case html.TAG_ID.HGROUP:
        case html.TAG_ID.DIALOG:
        case html.TAG_ID.DETAILS:
        case html.TAG_ID.ADDRESS:
        case html.TAG_ID.ARTICLE:
        case html.TAG_ID.SECTION:
        case html.TAG_ID.SUMMARY:
        case html.TAG_ID.FIELDSET:
        case html.TAG_ID.BLOCKQUOTE:
        case html.TAG_ID.FIGCAPTION: {
            addressStartTagInBody(p, token);
            break;
        }
        case html.TAG_ID.LI:
        case html.TAG_ID.DD:
        case html.TAG_ID.DT: {
            listItemStartTagInBody(p, token);
            break;
        }
        case html.TAG_ID.BR:
        case html.TAG_ID.IMG:
        case html.TAG_ID.WBR:
        case html.TAG_ID.AREA:
        case html.TAG_ID.EMBED:
        case html.TAG_ID.KEYGEN: {
            areaStartTagInBody(p, token);
            break;
        }
        case html.TAG_ID.HR: {
            hrStartTagInBody(p, token);
            break;
        }
        case html.TAG_ID.RB:
        case html.TAG_ID.RTC: {
            rbStartTagInBody(p, token);
            break;
        }
        case html.TAG_ID.RT:
        case html.TAG_ID.RP: {
            rtStartTagInBody(p, token);
            break;
        }
        case html.TAG_ID.PRE:
        case html.TAG_ID.LISTING: {
            preStartTagInBody(p, token);
            break;
        }
        case html.TAG_ID.XMP: {
            xmpStartTagInBody(p, token);
            break;
        }
        case html.TAG_ID.SVG: {
            svgStartTagInBody(p, token);
            break;
        }
        case html.TAG_ID.HTML: {
            htmlStartTagInBody(p, token);
            break;
        }
        case html.TAG_ID.BASE:
        case html.TAG_ID.LINK:
        case html.TAG_ID.META:
        case html.TAG_ID.STYLE:
        case html.TAG_ID.TITLE:
        case html.TAG_ID.SCRIPT:
        case html.TAG_ID.BGSOUND:
        case html.TAG_ID.BASEFONT:
        case html.TAG_ID.TEMPLATE: {
            startTagInHead(p, token);
            break;
        }
        case html.TAG_ID.BODY: {
            bodyStartTagInBody(p, token);
            break;
        }
        case html.TAG_ID.FORM: {
            formStartTagInBody(p, token);
            break;
        }
        case html.TAG_ID.NOBR: {
            nobrStartTagInBody(p, token);
            break;
        }
        case html.TAG_ID.MATH: {
            mathStartTagInBody(p, token);
            break;
        }
        case html.TAG_ID.TABLE: {
            tableStartTagInBody(p, token);
            break;
        }
        case html.TAG_ID.INPUT: {
            inputStartTagInBody(p, token);
            break;
        }
        case html.TAG_ID.PARAM:
        case html.TAG_ID.TRACK:
        case html.TAG_ID.SOURCE: {
            paramStartTagInBody(p, token);
            break;
        }
        case html.TAG_ID.IMAGE: {
            imageStartTagInBody(p, token);
            break;
        }
        case html.TAG_ID.BUTTON: {
            buttonStartTagInBody(p, token);
            break;
        }
        case html.TAG_ID.APPLET:
        case html.TAG_ID.OBJECT:
        case html.TAG_ID.MARQUEE: {
            appletStartTagInBody(p, token);
            break;
        }
        case html.TAG_ID.IFRAME: {
            iframeStartTagInBody(p, token);
            break;
        }
        case html.TAG_ID.SELECT: {
            selectStartTagInBody(p, token);
            break;
        }
        case html.TAG_ID.OPTION:
        case html.TAG_ID.OPTGROUP: {
            optgroupStartTagInBody(p, token);
            break;
        }
        case html.TAG_ID.NOEMBED: {
            noembedStartTagInBody(p, token);
            break;
        }
        case html.TAG_ID.FRAMESET: {
            framesetStartTagInBody(p, token);
            break;
        }
        case html.TAG_ID.TEXTAREA: {
            textareaStartTagInBody(p, token);
            break;
        }
        case html.TAG_ID.NOSCRIPT: {
            if (p.options.scriptingEnabled) {
                noembedStartTagInBody(p, token);
            }
            else {
                genericStartTagInBody(p, token);
            }
            break;
        }
        case html.TAG_ID.PLAINTEXT: {
            plaintextStartTagInBody(p, token);
            break;
        }
        case html.TAG_ID.COL:
        case html.TAG_ID.TH:
        case html.TAG_ID.TD:
        case html.TAG_ID.TR:
        case html.TAG_ID.HEAD:
        case html.TAG_ID.FRAME:
        case html.TAG_ID.TBODY:
        case html.TAG_ID.TFOOT:
        case html.TAG_ID.THEAD:
        case html.TAG_ID.CAPTION:
        case html.TAG_ID.COLGROUP: {
            // Ignore token
            break;
        }
        default: {
            genericStartTagInBody(p, token);
        }
    }
}
function bodyEndTagInBody(p, token) {
    if (p.openElements.hasInScope(html.TAG_ID.BODY)) {
        p.insertionMode = InsertionMode.AFTER_BODY;
        //NOTE: <body> is never popped from the stack, so we need to updated
        //the end location explicitly.
        if (p.options.sourceCodeLocationInfo) {
            const bodyElement = p.openElements.tryPeekProperlyNestedBodyElement();
            if (bodyElement) {
                p._setEndLocation(bodyElement, token);
            }
        }
    }
}
function htmlEndTagInBody(p, token) {
    if (p.openElements.hasInScope(html.TAG_ID.BODY)) {
        p.insertionMode = InsertionMode.AFTER_BODY;
        endTagAfterBody(p, token);
    }
}
function addressEndTagInBody(p, token) {
    const tn = token.tagID;
    if (p.openElements.hasInScope(tn)) {
        p.openElements.generateImpliedEndTags();
        p.openElements.popUntilTagNamePopped(tn);
    }
}
function formEndTagInBody(p) {
    const inTemplate = p.openElements.tmplCount > 0;
    const { formElement } = p;
    if (!inTemplate) {
        p.formElement = null;
    }
    if ((formElement || inTemplate) && p.openElements.hasInScope(html.TAG_ID.FORM)) {
        p.openElements.generateImpliedEndTags();
        if (inTemplate) {
            p.openElements.popUntilTagNamePopped(html.TAG_ID.FORM);
        }
        else if (formElement) {
            p.openElements.remove(formElement);
        }
    }
}
function pEndTagInBody(p) {
    if (!p.openElements.hasInButtonScope(html.TAG_ID.P)) {
        p._insertFakeElement(html.TAG_NAMES.P, html.TAG_ID.P);
    }
    p._closePElement();
}
function liEndTagInBody(p) {
    if (p.openElements.hasInListItemScope(html.TAG_ID.LI)) {
        p.openElements.generateImpliedEndTagsWithExclusion(html.TAG_ID.LI);
        p.openElements.popUntilTagNamePopped(html.TAG_ID.LI);
    }
}
function ddEndTagInBody(p, token) {
    const tn = token.tagID;
    if (p.openElements.hasInScope(tn)) {
        p.openElements.generateImpliedEndTagsWithExclusion(tn);
        p.openElements.popUntilTagNamePopped(tn);
    }
}
function numberedHeaderEndTagInBody(p) {
    if (p.openElements.hasNumberedHeaderInScope()) {
        p.openElements.generateImpliedEndTags();
        p.openElements.popUntilNumberedHeaderPopped();
    }
}
function appletEndTagInBody(p, token) {
    const tn = token.tagID;
    if (p.openElements.hasInScope(tn)) {
        p.openElements.generateImpliedEndTags();
        p.openElements.popUntilTagNamePopped(tn);
        p.activeFormattingElements.clearToLastMarker();
    }
}
function brEndTagInBody(p) {
    p._reconstructActiveFormattingElements();
    p._insertFakeElement(html.TAG_NAMES.BR, html.TAG_ID.BR);
    p.openElements.pop();
    p.framesetOk = false;
}
function genericEndTagInBody(p, token) {
    const tn = token.tagName;
    const tid = token.tagID;
    for (let i = p.openElements.stackTop; i > 0; i--) {
        const element = p.openElements.items[i];
        const elementId = p.openElements.tagIDs[i];
        // Compare the tag name here, as the tag might not be a known tag with an ID.
        if (tid === elementId && (tid !== html.TAG_ID.UNKNOWN || p.treeAdapter.getTagName(element) === tn)) {
            p.openElements.generateImpliedEndTagsWithExclusion(tid);
            if (p.openElements.stackTop >= i)
                p.openElements.shortenToLength(i);
            break;
        }
        if (p._isSpecialElement(element, elementId)) {
            break;
        }
    }
}
function endTagInBody(p, token) {
    switch (token.tagID) {
        case html.TAG_ID.A:
        case html.TAG_ID.B:
        case html.TAG_ID.I:
        case html.TAG_ID.S:
        case html.TAG_ID.U:
        case html.TAG_ID.EM:
        case html.TAG_ID.TT:
        case html.TAG_ID.BIG:
        case html.TAG_ID.CODE:
        case html.TAG_ID.FONT:
        case html.TAG_ID.NOBR:
        case html.TAG_ID.SMALL:
        case html.TAG_ID.STRIKE:
        case html.TAG_ID.STRONG: {
            callAdoptionAgency(p, token);
            break;
        }
        case html.TAG_ID.P: {
            pEndTagInBody(p);
            break;
        }
        case html.TAG_ID.DL:
        case html.TAG_ID.UL:
        case html.TAG_ID.OL:
        case html.TAG_ID.DIR:
        case html.TAG_ID.DIV:
        case html.TAG_ID.NAV:
        case html.TAG_ID.PRE:
        case html.TAG_ID.MAIN:
        case html.TAG_ID.MENU:
        case html.TAG_ID.ASIDE:
        case html.TAG_ID.BUTTON:
        case html.TAG_ID.CENTER:
        case html.TAG_ID.FIGURE:
        case html.TAG_ID.FOOTER:
        case html.TAG_ID.HEADER:
        case html.TAG_ID.HGROUP:
        case html.TAG_ID.DIALOG:
        case html.TAG_ID.ADDRESS:
        case html.TAG_ID.ARTICLE:
        case html.TAG_ID.DETAILS:
        case html.TAG_ID.SECTION:
        case html.TAG_ID.SUMMARY:
        case html.TAG_ID.LISTING:
        case html.TAG_ID.FIELDSET:
        case html.TAG_ID.BLOCKQUOTE:
        case html.TAG_ID.FIGCAPTION: {
            addressEndTagInBody(p, token);
            break;
        }
        case html.TAG_ID.LI: {
            liEndTagInBody(p);
            break;
        }
        case html.TAG_ID.DD:
        case html.TAG_ID.DT: {
            ddEndTagInBody(p, token);
            break;
        }
        case html.TAG_ID.H1:
        case html.TAG_ID.H2:
        case html.TAG_ID.H3:
        case html.TAG_ID.H4:
        case html.TAG_ID.H5:
        case html.TAG_ID.H6: {
            numberedHeaderEndTagInBody(p);
            break;
        }
        case html.TAG_ID.BR: {
            brEndTagInBody(p);
            break;
        }
        case html.TAG_ID.BODY: {
            bodyEndTagInBody(p, token);
            break;
        }
        case html.TAG_ID.HTML: {
            htmlEndTagInBody(p, token);
            break;
        }
        case html.TAG_ID.FORM: {
            formEndTagInBody(p);
            break;
        }
        case html.TAG_ID.APPLET:
        case html.TAG_ID.OBJECT:
        case html.TAG_ID.MARQUEE: {
            appletEndTagInBody(p, token);
            break;
        }
        case html.TAG_ID.TEMPLATE: {
            templateEndTagInHead(p, token);
            break;
        }
        default: {
            genericEndTagInBody(p, token);
        }
    }
}
function eofInBody(p, token) {
    if (p.tmplInsertionModeStack.length > 0) {
        eofInTemplate(p, token);
    }
    else {
        stopParsing(p, token);
    }
}
// The "text" insertion mode
//------------------------------------------------------------------
function endTagInText(p, token) {
    var _a;
    if (token.tagID === html.TAG_ID.SCRIPT) {
        (_a = p.scriptHandler) === null || _a === void 0 ? void 0 : _a.call(p, p.openElements.current);
    }
    p.openElements.pop();
    p.insertionMode = p.originalInsertionMode;
}
function eofInText(p, token) {
    p._err(token, errorCodes.ERR.eofInElementThatCanContainOnlyText);
    p.openElements.pop();
    p.insertionMode = p.originalInsertionMode;
    p.onEof(token);
}
// The "in table" insertion mode
//------------------------------------------------------------------
function characterInTable(p, token$1) {
    if (TABLE_STRUCTURE_TAGS.has(p.openElements.currentTagId)) {
        p.pendingCharacterTokens.length = 0;
        p.hasNonWhitespacePendingCharacterToken = false;
        p.originalInsertionMode = p.insertionMode;
        p.insertionMode = InsertionMode.IN_TABLE_TEXT;
        switch (token$1.type) {
            case token.TokenType.CHARACTER: {
                characterInTableText(p, token$1);
                break;
            }
            case token.TokenType.WHITESPACE_CHARACTER: {
                whitespaceCharacterInTableText(p, token$1);
                break;
            }
            // Ignore null
        }
    }
    else {
        tokenInTable(p, token$1);
    }
}
function captionStartTagInTable(p, token) {
    p.openElements.clearBackToTableContext();
    p.activeFormattingElements.insertMarker();
    p._insertElement(token, html.NS.HTML);
    p.insertionMode = InsertionMode.IN_CAPTION;
}
function colgroupStartTagInTable(p, token) {
    p.openElements.clearBackToTableContext();
    p._insertElement(token, html.NS.HTML);
    p.insertionMode = InsertionMode.IN_COLUMN_GROUP;
}
function colStartTagInTable(p, token) {
    p.openElements.clearBackToTableContext();
    p._insertFakeElement(html.TAG_NAMES.COLGROUP, html.TAG_ID.COLGROUP);
    p.insertionMode = InsertionMode.IN_COLUMN_GROUP;
    startTagInColumnGroup(p, token);
}
function tbodyStartTagInTable(p, token) {
    p.openElements.clearBackToTableContext();
    p._insertElement(token, html.NS.HTML);
    p.insertionMode = InsertionMode.IN_TABLE_BODY;
}
function tdStartTagInTable(p, token) {
    p.openElements.clearBackToTableContext();
    p._insertFakeElement(html.TAG_NAMES.TBODY, html.TAG_ID.TBODY);
    p.insertionMode = InsertionMode.IN_TABLE_BODY;
    startTagInTableBody(p, token);
}
function tableStartTagInTable(p, token) {
    if (p.openElements.hasInTableScope(html.TAG_ID.TABLE)) {
        p.openElements.popUntilTagNamePopped(html.TAG_ID.TABLE);
        p._resetInsertionMode();
        p._processStartTag(token);
    }
}
function inputStartTagInTable(p, token) {
    if (isHiddenInput(token)) {
        p._appendElement(token, html.NS.HTML);
    }
    else {
        tokenInTable(p, token);
    }
    token.ackSelfClosing = true;
}
function formStartTagInTable(p, token) {
    if (!p.formElement && p.openElements.tmplCount === 0) {
        p._insertElement(token, html.NS.HTML);
        p.formElement = p.openElements.current;
        p.openElements.pop();
    }
}
function startTagInTable(p, token) {
    switch (token.tagID) {
        case html.TAG_ID.TD:
        case html.TAG_ID.TH:
        case html.TAG_ID.TR: {
            tdStartTagInTable(p, token);
            break;
        }
        case html.TAG_ID.STYLE:
        case html.TAG_ID.SCRIPT:
        case html.TAG_ID.TEMPLATE: {
            startTagInHead(p, token);
            break;
        }
        case html.TAG_ID.COL: {
            colStartTagInTable(p, token);
            break;
        }
        case html.TAG_ID.FORM: {
            formStartTagInTable(p, token);
            break;
        }
        case html.TAG_ID.TABLE: {
            tableStartTagInTable(p, token);
            break;
        }
        case html.TAG_ID.TBODY:
        case html.TAG_ID.TFOOT:
        case html.TAG_ID.THEAD: {
            tbodyStartTagInTable(p, token);
            break;
        }
        case html.TAG_ID.INPUT: {
            inputStartTagInTable(p, token);
            break;
        }
        case html.TAG_ID.CAPTION: {
            captionStartTagInTable(p, token);
            break;
        }
        case html.TAG_ID.COLGROUP: {
            colgroupStartTagInTable(p, token);
            break;
        }
        default: {
            tokenInTable(p, token);
        }
    }
}
function endTagInTable(p, token) {
    switch (token.tagID) {
        case html.TAG_ID.TABLE: {
            if (p.openElements.hasInTableScope(html.TAG_ID.TABLE)) {
                p.openElements.popUntilTagNamePopped(html.TAG_ID.TABLE);
                p._resetInsertionMode();
            }
            break;
        }
        case html.TAG_ID.TEMPLATE: {
            templateEndTagInHead(p, token);
            break;
        }
        case html.TAG_ID.BODY:
        case html.TAG_ID.CAPTION:
        case html.TAG_ID.COL:
        case html.TAG_ID.COLGROUP:
        case html.TAG_ID.HTML:
        case html.TAG_ID.TBODY:
        case html.TAG_ID.TD:
        case html.TAG_ID.TFOOT:
        case html.TAG_ID.TH:
        case html.TAG_ID.THEAD:
        case html.TAG_ID.TR: {
            // Ignore token
            break;
        }
        default: {
            tokenInTable(p, token);
        }
    }
}
function tokenInTable(p, token) {
    const savedFosterParentingState = p.fosterParentingEnabled;
    p.fosterParentingEnabled = true;
    // Process token in `In Body` mode
    modeInBody(p, token);
    p.fosterParentingEnabled = savedFosterParentingState;
}
// The "in table text" insertion mode
//------------------------------------------------------------------
function whitespaceCharacterInTableText(p, token) {
    p.pendingCharacterTokens.push(token);
}
function characterInTableText(p, token) {
    p.pendingCharacterTokens.push(token);
    p.hasNonWhitespacePendingCharacterToken = true;
}
function tokenInTableText(p, token) {
    let i = 0;
    if (p.hasNonWhitespacePendingCharacterToken) {
        for (; i < p.pendingCharacterTokens.length; i++) {
            tokenInTable(p, p.pendingCharacterTokens[i]);
        }
    }
    else {
        for (; i < p.pendingCharacterTokens.length; i++) {
            p._insertCharacters(p.pendingCharacterTokens[i]);
        }
    }
    p.insertionMode = p.originalInsertionMode;
    p._processToken(token);
}
// The "in caption" insertion mode
//------------------------------------------------------------------
const TABLE_VOID_ELEMENTS = new Set([html.TAG_ID.CAPTION, html.TAG_ID.COL, html.TAG_ID.COLGROUP, html.TAG_ID.TBODY, html.TAG_ID.TD, html.TAG_ID.TFOOT, html.TAG_ID.TH, html.TAG_ID.THEAD, html.TAG_ID.TR]);
function startTagInCaption(p, token) {
    const tn = token.tagID;
    if (TABLE_VOID_ELEMENTS.has(tn)) {
        if (p.openElements.hasInTableScope(html.TAG_ID.CAPTION)) {
            p.openElements.generateImpliedEndTags();
            p.openElements.popUntilTagNamePopped(html.TAG_ID.CAPTION);
            p.activeFormattingElements.clearToLastMarker();
            p.insertionMode = InsertionMode.IN_TABLE;
            startTagInTable(p, token);
        }
    }
    else {
        startTagInBody(p, token);
    }
}
function endTagInCaption(p, token) {
    const tn = token.tagID;
    switch (tn) {
        case html.TAG_ID.CAPTION:
        case html.TAG_ID.TABLE: {
            if (p.openElements.hasInTableScope(html.TAG_ID.CAPTION)) {
                p.openElements.generateImpliedEndTags();
                p.openElements.popUntilTagNamePopped(html.TAG_ID.CAPTION);
                p.activeFormattingElements.clearToLastMarker();
                p.insertionMode = InsertionMode.IN_TABLE;
                if (tn === html.TAG_ID.TABLE) {
                    endTagInTable(p, token);
                }
            }
            break;
        }
        case html.TAG_ID.BODY:
        case html.TAG_ID.COL:
        case html.TAG_ID.COLGROUP:
        case html.TAG_ID.HTML:
        case html.TAG_ID.TBODY:
        case html.TAG_ID.TD:
        case html.TAG_ID.TFOOT:
        case html.TAG_ID.TH:
        case html.TAG_ID.THEAD:
        case html.TAG_ID.TR: {
            // Ignore token
            break;
        }
        default: {
            endTagInBody(p, token);
        }
    }
}
// The "in column group" insertion mode
//------------------------------------------------------------------
function startTagInColumnGroup(p, token) {
    switch (token.tagID) {
        case html.TAG_ID.HTML: {
            startTagInBody(p, token);
            break;
        }
        case html.TAG_ID.COL: {
            p._appendElement(token, html.NS.HTML);
            token.ackSelfClosing = true;
            break;
        }
        case html.TAG_ID.TEMPLATE: {
            startTagInHead(p, token);
            break;
        }
        default: {
            tokenInColumnGroup(p, token);
        }
    }
}
function endTagInColumnGroup(p, token) {
    switch (token.tagID) {
        case html.TAG_ID.COLGROUP: {
            if (p.openElements.currentTagId === html.TAG_ID.COLGROUP) {
                p.openElements.pop();
                p.insertionMode = InsertionMode.IN_TABLE;
            }
            break;
        }
        case html.TAG_ID.TEMPLATE: {
            templateEndTagInHead(p, token);
            break;
        }
        case html.TAG_ID.COL: {
            // Ignore token
            break;
        }
        default: {
            tokenInColumnGroup(p, token);
        }
    }
}
function tokenInColumnGroup(p, token) {
    if (p.openElements.currentTagId === html.TAG_ID.COLGROUP) {
        p.openElements.pop();
        p.insertionMode = InsertionMode.IN_TABLE;
        p._processToken(token);
    }
}
// The "in table body" insertion mode
//------------------------------------------------------------------
function startTagInTableBody(p, token) {
    switch (token.tagID) {
        case html.TAG_ID.TR: {
            p.openElements.clearBackToTableBodyContext();
            p._insertElement(token, html.NS.HTML);
            p.insertionMode = InsertionMode.IN_ROW;
            break;
        }
        case html.TAG_ID.TH:
        case html.TAG_ID.TD: {
            p.openElements.clearBackToTableBodyContext();
            p._insertFakeElement(html.TAG_NAMES.TR, html.TAG_ID.TR);
            p.insertionMode = InsertionMode.IN_ROW;
            startTagInRow(p, token);
            break;
        }
        case html.TAG_ID.CAPTION:
        case html.TAG_ID.COL:
        case html.TAG_ID.COLGROUP:
        case html.TAG_ID.TBODY:
        case html.TAG_ID.TFOOT:
        case html.TAG_ID.THEAD: {
            if (p.openElements.hasTableBodyContextInTableScope()) {
                p.openElements.clearBackToTableBodyContext();
                p.openElements.pop();
                p.insertionMode = InsertionMode.IN_TABLE;
                startTagInTable(p, token);
            }
            break;
        }
        default: {
            startTagInTable(p, token);
        }
    }
}
function endTagInTableBody(p, token) {
    const tn = token.tagID;
    switch (token.tagID) {
        case html.TAG_ID.TBODY:
        case html.TAG_ID.TFOOT:
        case html.TAG_ID.THEAD: {
            if (p.openElements.hasInTableScope(tn)) {
                p.openElements.clearBackToTableBodyContext();
                p.openElements.pop();
                p.insertionMode = InsertionMode.IN_TABLE;
            }
            break;
        }
        case html.TAG_ID.TABLE: {
            if (p.openElements.hasTableBodyContextInTableScope()) {
                p.openElements.clearBackToTableBodyContext();
                p.openElements.pop();
                p.insertionMode = InsertionMode.IN_TABLE;
                endTagInTable(p, token);
            }
            break;
        }
        case html.TAG_ID.BODY:
        case html.TAG_ID.CAPTION:
        case html.TAG_ID.COL:
        case html.TAG_ID.COLGROUP:
        case html.TAG_ID.HTML:
        case html.TAG_ID.TD:
        case html.TAG_ID.TH:
        case html.TAG_ID.TR: {
            // Ignore token
            break;
        }
        default: {
            endTagInTable(p, token);
        }
    }
}
// The "in row" insertion mode
//------------------------------------------------------------------
function startTagInRow(p, token) {
    switch (token.tagID) {
        case html.TAG_ID.TH:
        case html.TAG_ID.TD: {
            p.openElements.clearBackToTableRowContext();
            p._insertElement(token, html.NS.HTML);
            p.insertionMode = InsertionMode.IN_CELL;
            p.activeFormattingElements.insertMarker();
            break;
        }
        case html.TAG_ID.CAPTION:
        case html.TAG_ID.COL:
        case html.TAG_ID.COLGROUP:
        case html.TAG_ID.TBODY:
        case html.TAG_ID.TFOOT:
        case html.TAG_ID.THEAD:
        case html.TAG_ID.TR: {
            if (p.openElements.hasInTableScope(html.TAG_ID.TR)) {
                p.openElements.clearBackToTableRowContext();
                p.openElements.pop();
                p.insertionMode = InsertionMode.IN_TABLE_BODY;
                startTagInTableBody(p, token);
            }
            break;
        }
        default: {
            startTagInTable(p, token);
        }
    }
}
function endTagInRow(p, token) {
    switch (token.tagID) {
        case html.TAG_ID.TR: {
            if (p.openElements.hasInTableScope(html.TAG_ID.TR)) {
                p.openElements.clearBackToTableRowContext();
                p.openElements.pop();
                p.insertionMode = InsertionMode.IN_TABLE_BODY;
            }
            break;
        }
        case html.TAG_ID.TABLE: {
            if (p.openElements.hasInTableScope(html.TAG_ID.TR)) {
                p.openElements.clearBackToTableRowContext();
                p.openElements.pop();
                p.insertionMode = InsertionMode.IN_TABLE_BODY;
                endTagInTableBody(p, token);
            }
            break;
        }
        case html.TAG_ID.TBODY:
        case html.TAG_ID.TFOOT:
        case html.TAG_ID.THEAD: {
            if (p.openElements.hasInTableScope(token.tagID) || p.openElements.hasInTableScope(html.TAG_ID.TR)) {
                p.openElements.clearBackToTableRowContext();
                p.openElements.pop();
                p.insertionMode = InsertionMode.IN_TABLE_BODY;
                endTagInTableBody(p, token);
            }
            break;
        }
        case html.TAG_ID.BODY:
        case html.TAG_ID.CAPTION:
        case html.TAG_ID.COL:
        case html.TAG_ID.COLGROUP:
        case html.TAG_ID.HTML:
        case html.TAG_ID.TD:
        case html.TAG_ID.TH: {
            // Ignore end tag
            break;
        }
        default:
            endTagInTable(p, token);
    }
}
// The "in cell" insertion mode
//------------------------------------------------------------------
function startTagInCell(p, token) {
    const tn = token.tagID;
    if (TABLE_VOID_ELEMENTS.has(tn)) {
        if (p.openElements.hasInTableScope(html.TAG_ID.TD) || p.openElements.hasInTableScope(html.TAG_ID.TH)) {
            p._closeTableCell();
            startTagInRow(p, token);
        }
    }
    else {
        startTagInBody(p, token);
    }
}
function endTagInCell(p, token) {
    const tn = token.tagID;
    switch (tn) {
        case html.TAG_ID.TD:
        case html.TAG_ID.TH: {
            if (p.openElements.hasInTableScope(tn)) {
                p.openElements.generateImpliedEndTags();
                p.openElements.popUntilTagNamePopped(tn);
                p.activeFormattingElements.clearToLastMarker();
                p.insertionMode = InsertionMode.IN_ROW;
            }
            break;
        }
        case html.TAG_ID.TABLE:
        case html.TAG_ID.TBODY:
        case html.TAG_ID.TFOOT:
        case html.TAG_ID.THEAD:
        case html.TAG_ID.TR: {
            if (p.openElements.hasInTableScope(tn)) {
                p._closeTableCell();
                endTagInRow(p, token);
            }
            break;
        }
        case html.TAG_ID.BODY:
        case html.TAG_ID.CAPTION:
        case html.TAG_ID.COL:
        case html.TAG_ID.COLGROUP:
        case html.TAG_ID.HTML: {
            // Ignore token
            break;
        }
        default: {
            endTagInBody(p, token);
        }
    }
}
// The "in select" insertion mode
//------------------------------------------------------------------
function startTagInSelect(p, token) {
    switch (token.tagID) {
        case html.TAG_ID.HTML: {
            startTagInBody(p, token);
            break;
        }
        case html.TAG_ID.OPTION: {
            if (p.openElements.currentTagId === html.TAG_ID.OPTION) {
                p.openElements.pop();
            }
            p._insertElement(token, html.NS.HTML);
            break;
        }
        case html.TAG_ID.OPTGROUP: {
            if (p.openElements.currentTagId === html.TAG_ID.OPTION) {
                p.openElements.pop();
            }
            if (p.openElements.currentTagId === html.TAG_ID.OPTGROUP) {
                p.openElements.pop();
            }
            p._insertElement(token, html.NS.HTML);
            break;
        }
        case html.TAG_ID.INPUT:
        case html.TAG_ID.KEYGEN:
        case html.TAG_ID.TEXTAREA:
        case html.TAG_ID.SELECT: {
            if (p.openElements.hasInSelectScope(html.TAG_ID.SELECT)) {
                p.openElements.popUntilTagNamePopped(html.TAG_ID.SELECT);
                p._resetInsertionMode();
                if (token.tagID !== html.TAG_ID.SELECT) {
                    p._processStartTag(token);
                }
            }
            break;
        }
        case html.TAG_ID.SCRIPT:
        case html.TAG_ID.TEMPLATE: {
            startTagInHead(p, token);
            break;
        }
        // Do nothing
    }
}
function endTagInSelect(p, token) {
    switch (token.tagID) {
        case html.TAG_ID.OPTGROUP: {
            if (p.openElements.stackTop > 0 &&
                p.openElements.currentTagId === html.TAG_ID.OPTION &&
                p.openElements.tagIDs[p.openElements.stackTop - 1] === html.TAG_ID.OPTGROUP) {
                p.openElements.pop();
            }
            if (p.openElements.currentTagId === html.TAG_ID.OPTGROUP) {
                p.openElements.pop();
            }
            break;
        }
        case html.TAG_ID.OPTION: {
            if (p.openElements.currentTagId === html.TAG_ID.OPTION) {
                p.openElements.pop();
            }
            break;
        }
        case html.TAG_ID.SELECT: {
            if (p.openElements.hasInSelectScope(html.TAG_ID.SELECT)) {
                p.openElements.popUntilTagNamePopped(html.TAG_ID.SELECT);
                p._resetInsertionMode();
            }
            break;
        }
        case html.TAG_ID.TEMPLATE: {
            templateEndTagInHead(p, token);
            break;
        }
        // Do nothing
    }
}
// The "in select in table" insertion mode
//------------------------------------------------------------------
function startTagInSelectInTable(p, token) {
    const tn = token.tagID;
    if (tn === html.TAG_ID.CAPTION ||
        tn === html.TAG_ID.TABLE ||
        tn === html.TAG_ID.TBODY ||
        tn === html.TAG_ID.TFOOT ||
        tn === html.TAG_ID.THEAD ||
        tn === html.TAG_ID.TR ||
        tn === html.TAG_ID.TD ||
        tn === html.TAG_ID.TH) {
        p.openElements.popUntilTagNamePopped(html.TAG_ID.SELECT);
        p._resetInsertionMode();
        p._processStartTag(token);
    }
    else {
        startTagInSelect(p, token);
    }
}
function endTagInSelectInTable(p, token) {
    const tn = token.tagID;
    if (tn === html.TAG_ID.CAPTION ||
        tn === html.TAG_ID.TABLE ||
        tn === html.TAG_ID.TBODY ||
        tn === html.TAG_ID.TFOOT ||
        tn === html.TAG_ID.THEAD ||
        tn === html.TAG_ID.TR ||
        tn === html.TAG_ID.TD ||
        tn === html.TAG_ID.TH) {
        if (p.openElements.hasInTableScope(tn)) {
            p.openElements.popUntilTagNamePopped(html.TAG_ID.SELECT);
            p._resetInsertionMode();
            p.onEndTag(token);
        }
    }
    else {
        endTagInSelect(p, token);
    }
}
// The "in template" insertion mode
//------------------------------------------------------------------
function startTagInTemplate(p, token) {
    switch (token.tagID) {
        // First, handle tags that can start without a mode change
        case html.TAG_ID.BASE:
        case html.TAG_ID.BASEFONT:
        case html.TAG_ID.BGSOUND:
        case html.TAG_ID.LINK:
        case html.TAG_ID.META:
        case html.TAG_ID.NOFRAMES:
        case html.TAG_ID.SCRIPT:
        case html.TAG_ID.STYLE:
        case html.TAG_ID.TEMPLATE:
        case html.TAG_ID.TITLE:
            startTagInHead(p, token);
            break;
        // Re-process the token in the appropriate mode
        case html.TAG_ID.CAPTION:
        case html.TAG_ID.COLGROUP:
        case html.TAG_ID.TBODY:
        case html.TAG_ID.TFOOT:
        case html.TAG_ID.THEAD:
            p.tmplInsertionModeStack[0] = InsertionMode.IN_TABLE;
            p.insertionMode = InsertionMode.IN_TABLE;
            startTagInTable(p, token);
            break;
        case html.TAG_ID.COL:
            p.tmplInsertionModeStack[0] = InsertionMode.IN_COLUMN_GROUP;
            p.insertionMode = InsertionMode.IN_COLUMN_GROUP;
            startTagInColumnGroup(p, token);
            break;
        case html.TAG_ID.TR:
            p.tmplInsertionModeStack[0] = InsertionMode.IN_TABLE_BODY;
            p.insertionMode = InsertionMode.IN_TABLE_BODY;
            startTagInTableBody(p, token);
            break;
        case html.TAG_ID.TD:
        case html.TAG_ID.TH:
            p.tmplInsertionModeStack[0] = InsertionMode.IN_ROW;
            p.insertionMode = InsertionMode.IN_ROW;
            startTagInRow(p, token);
            break;
        default:
            p.tmplInsertionModeStack[0] = InsertionMode.IN_BODY;
            p.insertionMode = InsertionMode.IN_BODY;
            startTagInBody(p, token);
    }
}
function endTagInTemplate(p, token) {
    if (token.tagID === html.TAG_ID.TEMPLATE) {
        templateEndTagInHead(p, token);
    }
}
function eofInTemplate(p, token) {
    if (p.openElements.tmplCount > 0) {
        p.openElements.popUntilTagNamePopped(html.TAG_ID.TEMPLATE);
        p.activeFormattingElements.clearToLastMarker();
        p.tmplInsertionModeStack.shift();
        p._resetInsertionMode();
        p.onEof(token);
    }
    else {
        stopParsing(p, token);
    }
}
// The "after body" insertion mode
//------------------------------------------------------------------
function startTagAfterBody(p, token) {
    if (token.tagID === html.TAG_ID.HTML) {
        startTagInBody(p, token);
    }
    else {
        tokenAfterBody(p, token);
    }
}
function endTagAfterBody(p, token) {
    var _a;
    if (token.tagID === html.TAG_ID.HTML) {
        if (!p.fragmentContext) {
            p.insertionMode = InsertionMode.AFTER_AFTER_BODY;
        }
        //NOTE: <html> is never popped from the stack, so we need to updated
        //the end location explicitly.
        if (p.options.sourceCodeLocationInfo && p.openElements.tagIDs[0] === html.TAG_ID.HTML) {
            p._setEndLocation(p.openElements.items[0], token);
            // Update the body element, if it doesn't have an end tag
            const bodyElement = p.openElements.items[1];
            if (bodyElement && !((_a = p.treeAdapter.getNodeSourceCodeLocation(bodyElement)) === null || _a === void 0 ? void 0 : _a.endTag)) {
                p._setEndLocation(bodyElement, token);
            }
        }
    }
    else {
        tokenAfterBody(p, token);
    }
}
function tokenAfterBody(p, token) {
    p.insertionMode = InsertionMode.IN_BODY;
    modeInBody(p, token);
}
// The "in frameset" insertion mode
//------------------------------------------------------------------
function startTagInFrameset(p, token) {
    switch (token.tagID) {
        case html.TAG_ID.HTML: {
            startTagInBody(p, token);
            break;
        }
        case html.TAG_ID.FRAMESET: {
            p._insertElement(token, html.NS.HTML);
            break;
        }
        case html.TAG_ID.FRAME: {
            p._appendElement(token, html.NS.HTML);
            token.ackSelfClosing = true;
            break;
        }
        case html.TAG_ID.NOFRAMES: {
            startTagInHead(p, token);
            break;
        }
        // Do nothing
    }
}
function endTagInFrameset(p, token) {
    if (token.tagID === html.TAG_ID.FRAMESET && !p.openElements.isRootHtmlElementCurrent()) {
        p.openElements.pop();
        if (!p.fragmentContext && p.openElements.currentTagId !== html.TAG_ID.FRAMESET) {
            p.insertionMode = InsertionMode.AFTER_FRAMESET;
        }
    }
}
// The "after frameset" insertion mode
//------------------------------------------------------------------
function startTagAfterFrameset(p, token) {
    switch (token.tagID) {
        case html.TAG_ID.HTML: {
            startTagInBody(p, token);
            break;
        }
        case html.TAG_ID.NOFRAMES: {
            startTagInHead(p, token);
            break;
        }
        // Do nothing
    }
}
function endTagAfterFrameset(p, token) {
    if (token.tagID === html.TAG_ID.HTML) {
        p.insertionMode = InsertionMode.AFTER_AFTER_FRAMESET;
    }
}
// The "after after body" insertion mode
//------------------------------------------------------------------
function startTagAfterAfterBody(p, token) {
    if (token.tagID === html.TAG_ID.HTML) {
        startTagInBody(p, token);
    }
    else {
        tokenAfterAfterBody(p, token);
    }
}
function tokenAfterAfterBody(p, token) {
    p.insertionMode = InsertionMode.IN_BODY;
    modeInBody(p, token);
}
// The "after after frameset" insertion mode
//------------------------------------------------------------------
function startTagAfterAfterFrameset(p, token) {
    switch (token.tagID) {
        case html.TAG_ID.HTML: {
            startTagInBody(p, token);
            break;
        }
        case html.TAG_ID.NOFRAMES: {
            startTagInHead(p, token);
            break;
        }
        // Do nothing
    }
}
// The rules for parsing tokens in foreign content
//------------------------------------------------------------------
function nullCharacterInForeignContent(p, token) {
    token.chars = unicode$1.REPLACEMENT_CHARACTER;
    p._insertCharacters(token);
}
function characterInForeignContent(p, token) {
    p._insertCharacters(token);
    p.framesetOk = false;
}
function popUntilHtmlOrIntegrationPoint(p) {
    while (p.treeAdapter.getNamespaceURI(p.openElements.current) !== html.NS.HTML &&
        !p._isIntegrationPoint(p.openElements.currentTagId, p.openElements.current)) {
        p.openElements.pop();
    }
}
function startTagInForeignContent(p, token) {
    if (foreignContent$1.causesExit(token)) {
        popUntilHtmlOrIntegrationPoint(p);
        p._startTagOutsideForeignContent(token);
    }
    else {
        const current = p._getAdjustedCurrentElement();
        const currentNs = p.treeAdapter.getNamespaceURI(current);
        if (currentNs === html.NS.MATHML) {
            foreignContent$1.adjustTokenMathMLAttrs(token);
        }
        else if (currentNs === html.NS.SVG) {
            foreignContent$1.adjustTokenSVGTagName(token);
            foreignContent$1.adjustTokenSVGAttrs(token);
        }
        foreignContent$1.adjustTokenXMLAttrs(token);
        if (token.selfClosing) {
            p._appendElement(token, currentNs);
        }
        else {
            p._insertElement(token, currentNs);
        }
        token.ackSelfClosing = true;
    }
}
function endTagInForeignContent(p, token) {
    if (token.tagID === html.TAG_ID.P || token.tagID === html.TAG_ID.BR) {
        popUntilHtmlOrIntegrationPoint(p);
        p._endTagOutsideForeignContent(token);
        return;
    }
    for (let i = p.openElements.stackTop; i > 0; i--) {
        const element = p.openElements.items[i];
        if (p.treeAdapter.getNamespaceURI(element) === html.NS.HTML) {
            p._endTagOutsideForeignContent(token);
            break;
        }
        const tagName = p.treeAdapter.getTagName(element);
        if (tagName.toLowerCase() === token.tagName) {
            //NOTE: update the token tag name for `_setEndLocation`.
            token.tagName = tagName;
            p.openElements.shortenToLength(i);
            break;
        }
    }
}

});

var serializer = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeOuter = exports.serialize = void 0;


// Sets
const VOID_ELEMENTS = new Set([
    html.TAG_NAMES.AREA,
    html.TAG_NAMES.BASE,
    html.TAG_NAMES.BASEFONT,
    html.TAG_NAMES.BGSOUND,
    html.TAG_NAMES.BR,
    html.TAG_NAMES.COL,
    html.TAG_NAMES.EMBED,
    html.TAG_NAMES.FRAME,
    html.TAG_NAMES.HR,
    html.TAG_NAMES.IMG,
    html.TAG_NAMES.INPUT,
    html.TAG_NAMES.KEYGEN,
    html.TAG_NAMES.LINK,
    html.TAG_NAMES.META,
    html.TAG_NAMES.PARAM,
    html.TAG_NAMES.SOURCE,
    html.TAG_NAMES.TRACK,
    html.TAG_NAMES.WBR,
    "img",
    "import",
]);
function isVoidElement(node, options) {
    return (options.treeAdapter.isElementNode(node) &&
        options.treeAdapter.getNamespaceURI(node) === html.NS.HTML &&
        VOID_ELEMENTS.has(options.treeAdapter.getTagName(node)));
}
const defaultOpts = {
    treeAdapter: _default.defaultTreeAdapter,
    scriptingEnabled: true,
};
/**
 * Serializes an AST node to an HTML string.
 *
 * @example
 *
 * ```js
 * const parse5 = require('parse5');
 *
 * const document = parse5.parse('<!DOCTYPE html><html><head></head><body>Hi there!</body></html>');
 *
 * // Serializes a document.
 * const html = parse5.serialize(document);
 *
 * // Serializes the <html> element content.
 * const str = parse5.serialize(document.childNodes[1]);
 *
 * console.log(str); //> '<head></head><body>Hi there!</body>'
 * ```
 *
 * @param node Node to serialize.
 * @param options Serialization options.
 */
function serialize(node, options) {
    var _a;
    const defaultTreeAdapter = defaultOpts.treeAdapter;
    const opts = Object.assign(Object.assign(Object.assign({}, defaultOpts), options), { treeAdapter: Object.assign(Object.assign({}, defaultTreeAdapter), ((_a = options === null || options === void 0 ? void 0 : options.treeAdapter) !== null && _a !== void 0 ? _a : {})) });
    if (isVoidElement(node, opts)) {
        return "";
    }
    return serializeChildNodes(node, opts);
}
exports.serialize = serialize;
/**
 * Serializes an AST element node to an HTML string, including the element node.
 *
 * @example
 *
 * ```js
 * const parse5 = require('parse5');
 *
 * const document = parse5.parseFragment('<div>Hello, <b>world</b>!</div>');
 *
 * // Serializes the <div> element.
 * const html = parse5.serializeOuter(document.childNodes[0]);
 *
 * console.log(str); //> '<div>Hello, <b>world</b>!</div>'
 * ```
 *
 * @param node Node to serialize.
 * @param options Serialization options.
 */
function serializeOuter(node, options) {
    var _a;
    const defaultTreeAdapter = defaultOpts.treeAdapter;
    const opts = Object.assign(Object.assign(Object.assign({}, defaultOpts), options), { treeAdapter: Object.assign(Object.assign({}, defaultTreeAdapter), ((_a = options === null || options === void 0 ? void 0 : options.treeAdapter) !== null && _a !== void 0 ? _a : {})) });
    return serializeNode(node, opts);
}
exports.serializeOuter = serializeOuter;
function serializeChildNodes(parentNode, options) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    let html$1 = "";
    // Get container of the child nodes
    const container = ((_b = (_a = options.treeAdapter) === null || _a === void 0 ? void 0 : _a.isElementNode) === null || _b === void 0 ? void 0 : _b.call(_a, parentNode)) &&
        ((_d = (_c = options.treeAdapter) === null || _c === void 0 ? void 0 : _c.getTagName) === null || _d === void 0 ? void 0 : _d.call(_c, parentNode)) === html.TAG_NAMES.TEMPLATE &&
        ((_f = (_e = options.treeAdapter) === null || _e === void 0 ? void 0 : _e.getNamespaceURI) === null || _f === void 0 ? void 0 : _f.call(_e, parentNode)) === html.NS.HTML
        ? (_h = (_g = options.treeAdapter) === null || _g === void 0 ? void 0 : _g.getTemplateContent) === null || _h === void 0 ? void 0 : _h.call(_g, parentNode)
        : parentNode;
    const childNodes = (_k = (_j = options.treeAdapter) === null || _j === void 0 ? void 0 : _j.getChildNodes) === null || _k === void 0 ? void 0 : _k.call(_j, container);
    if (childNodes) {
        for (const currentNode of childNodes) {
            html$1 += serializeNode(currentNode, options);
        }
    }
    return html$1;
}
function serializeNode(node, options) {
    if (options.treeAdapter.isElementNode(node)) {
        return serializeElement(node, options);
    }
    if (options.treeAdapter.isTextNode(node)) {
        return serializeTextNode(node, options);
    }
    if (options.treeAdapter.isCommentNode(node)) {
        return serializeCommentNode(node, options);
    }
    if (options.treeAdapter.isDocumentTypeNode(node)) {
        return serializeDocumentTypeNode(node, options);
    }
    // Return an empty string for unknown nodes
    return "";
}
function serializeElement(node, options) {
    var _a, _b;
    const tn = (_b = (_a = options.treeAdapter).getTagName) === null || _b === void 0 ? void 0 : _b.call(_a, node);
    if (node.selfClosing) {
        return `<${tn}${serializeAttributes(node, options)}/>${serializeChildNodes(node, options)}`;
    }
    return `<${tn}${serializeAttributes(node, options)}>${isVoidElement(node, options)
        ? ""
        : `${serializeChildNodes(node, options)}</${tn}>`}`;
}
function serializeAttributes(node, { treeAdapter }) {
    let html$1 = "";
    for (const attr of treeAdapter.getAttrList(node)) {
        html$1 += " ";
        if (!attr.namespace) {
            html$1 += attr.name;
        }
        else
            switch (attr.namespace) {
                case html.NS.XML: {
                    html$1 += `xml:${attr.name}`;
                    break;
                }
                case html.NS.XMLNS: {
                    if (attr.name !== "xmlns") {
                        html$1 += "xmlns:";
                    }
                    html$1 += attr.name;
                    break;
                }
                case html.NS.XLINK: {
                    html$1 += `xlink:${attr.name}`;
                    break;
                }
                default: {
                    html$1 += `${attr.prefix}:${attr.name}`;
                }
            }
        html$1 += `="${attr.value}"`;
    }
    return html$1;
}
function serializeTextNode(node, options) {
    var _a, _b;
    const { treeAdapter } = options;
    const content = (_b = (_a = treeAdapter.getTextNodeContent) === null || _a === void 0 ? void 0 : _a.call(treeAdapter, node)) !== null && _b !== void 0 ? _b : "";
    return content;
}
function serializeCommentNode(node, { treeAdapter }) {
    var _a;
    return `<!--${(_a = treeAdapter === null || treeAdapter === void 0 ? void 0 : treeAdapter.getCommentNodeContent) === null || _a === void 0 ? void 0 : _a.call(treeAdapter, node)}-->`;
}
function serializeDocumentTypeNode(node, { treeAdapter }) {
    var _a;
    return `<!DOCTYPE ${(_a = treeAdapter === null || treeAdapter === void 0 ? void 0 : treeAdapter.getDocumentTypeNodeName) === null || _a === void 0 ? void 0 : _a.call(treeAdapter, node)}>`;
}

});

var dist = createCommonjsModule(function (module, exports) {
var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseFragment = exports.parse = exports.TokenizerMode = exports.Tokenizer = exports.Token = exports.html = exports.foreignContent = exports.serializeOuter = exports.serialize = exports.Parser = exports.defaultTreeAdapter = void 0;


Object.defineProperty(exports, "defaultTreeAdapter", { enumerable: true, get: function () { return _default.defaultTreeAdapter; } });
var index_js_2 = parser;
Object.defineProperty(exports, "Parser", { enumerable: true, get: function () { return index_js_2.Parser; } });

Object.defineProperty(exports, "serialize", { enumerable: true, get: function () { return serializer.serialize; } });
Object.defineProperty(exports, "serializeOuter", { enumerable: true, get: function () { return serializer.serializeOuter; } });
/** @internal */
exports.foreignContent = __importStar(foreignContent);
/** @internal */
exports.html = __importStar(html);
/** @internal */
exports.Token = __importStar(token);
/** @internal */

Object.defineProperty(exports, "Tokenizer", { enumerable: true, get: function () { return tokenizer.Tokenizer; } });
Object.defineProperty(exports, "TokenizerMode", { enumerable: true, get: function () { return tokenizer.TokenizerMode; } });
// Shorthands
/**
 * Parses an HTML string.
 *
 * @param html Input HTML string.
 * @param options Parsing options.
 * @returns Document
 *
 * @example
 *
 * ```js
 * const parse5 = require('parse5');
 *
 * const document = parse5.parse('<!DOCTYPE html><html><head></head><body>Hi there!</body></html>');
 *
 * console.log(document.childNodes[1].tagName); //> 'html'
 *```
 */
function parse(html, options) {
    return parser.Parser.parse(html, options);
}
exports.parse = parse;
function parseFragment(fragmentContext, html, options) {
    if (typeof fragmentContext === 'string') {
        options = html;
        html = fragmentContext;
        fragmentContext = null;
    }
    const parser$1 = parser.Parser.getFragmentParser(fragmentContext, options);
    parser$1.tokenizer.write(html, true);
    return parser$1.getFragment();
}
exports.parseFragment = parseFragment;

});

var mappings = {
    elements: {
        "scroll-view": "scroll-view",
        map: "map",
        picker: "picker",
        input: "input",
        textarea: "textarea",
        wxs: "import-sjs",
    },
    elementAttrs: {
        /**
         * 属性为支付宝小程序标签名
         */
        "scroll-view": {
            bounces: "trap-scroll",
            bindscrolltoupper: "onScrollToUpper",
            bindscrolltolower: "onScrollToLower",
            bindscroll: "onScroll",
            "bind:touchstart": "onTouchStart",
            "catch:touchstart": "onTouchStart",
        },
        map: {
            "bind:markertap": "onMarkerTap",
        },
        picker: {
            bindchange: "onChange",
        },
        input: {
            bindblur: "onBlur",
            bindinput: "onInput",
            bindfocus: "onFocus",
            bindconfirm: "onConfirm",
        },
        textarea: {
            bindblur: "onBlur",
            bindinput: "onInput",
            bindfocus: "onFocus",
            bindconfirm: "onConfirm",
        },
    },
};

function getTagMapping(tagName) {
    var _a, _b;
    var platformTagName = (_a = mappings === null || mappings === void 0 ? void 0 : mappings.elements) === null || _a === void 0 ? void 0 : _a[tagName];
    var attrs = (_b = mappings === null || mappings === void 0 ? void 0 : mappings.elementAttrs) === null || _b === void 0 ? void 0 : _b[platformTagName];
    return attrs;
}
function getTagName(originalTagName) {
    var _a;
    return ((_a = mappings === null || mappings === void 0 ? void 0 : mappings.elements) === null || _a === void 0 ? void 0 : _a[originalTagName]) || originalTagName;
}

var sourcePath = "";
var config = Object.create(null);
function getConfigElementAttrs(tagName) {
    var _a, _b, _c, _d;
    var platformTagName = (_b = (_a = config === null || config === void 0 ? void 0 : config.elementMappings) === null || _a === void 0 ? void 0 : _a.elements) === null || _b === void 0 ? void 0 : _b[tagName];
    var attrs = (_d = (_c = config === null || config === void 0 ? void 0 : config.elementMappings) === null || _c === void 0 ? void 0 : _c.elementAttrs) === null || _d === void 0 ? void 0 : _d[platformTagName];
    return attrs;
}
function transform(xml) {
    var document = dist.parseFragment(xml);
    return dist.serialize(document, {
        treeAdapter: {
            getTagName: function (element) {
                // 替换成平台的属性
                map([element]);
                return getTagName(element.tagName);
            },
            getAttrList: function (element) {
                var _a, _b;
                if (element.tagName === "wxs") {
                    return (_a = element === null || element === void 0 ? void 0 : element.attrs) === null || _a === void 0 ? void 0 : _a.map(function (attr) {
                        var _a, _b;
                        if (attr.name === "src") {
                            return {
                                name: "from",
                                value: (_b = (_a = attr.value) === null || _a === void 0 ? void 0 : _a.replace) === null || _b === void 0 ? void 0 : _b.call(_a, /(\.wxs)$/, ".sjs"),
                            };
                        }
                        if (attr.name === "module") {
                            return {
                                name: "name",
                                value: attr.value,
                            };
                        }
                        return attr;
                    });
                }
                if (["import", "include"].includes(element.tagName)) {
                    return (_b = element === null || element === void 0 ? void 0 : element.attrs) === null || _b === void 0 ? void 0 : _b.map(function (attr) {
                        var _a, _b;
                        if (attr.name === "src") {
                            return {
                                name: attr.name,
                                value: (_b = (_a = attr.value) === null || _a === void 0 ? void 0 : _a.replace) === null || _b === void 0 ? void 0 : _b.call(_a, /(\.wxml)$/, ".axml"),
                            };
                        }
                        return attr;
                    });
                }
                return element.attrs;
            },
        },
    });
}
function map(childNodes) {
    childNodes === null || childNodes === void 0 ? void 0 : childNodes.forEach(function (item) {
        var _a, _b;
        var element = item;
        var attrsMapping = (_b = (_a = getConfigElementAttrs(element.tagName)) !== null && _a !== void 0 ? _a : getTagMapping(element.tagName)) !== null && _b !== void 0 ? _b : Object.create(null);
        if (element === null || element === void 0 ? void 0 : element.attrs) {
            element.attrs.forEach(function (attr) {
                var _a, _b, _c, _d, _e;
                var name = attr.name;
                var keyName = (_a = attrsMapping === null || attrsMapping === void 0 ? void 0 : attrsMapping[name]) !== null && _a !== void 0 ? _a : name;
                if (!replaceMappings[name] &&
                    (((_b = name === null || name === void 0 ? void 0 : name.startsWith) === null || _b === void 0 ? void 0 : _b.call(name, "bind:")) || ((_c = name === null || name === void 0 ? void 0 : name.startsWith) === null || _c === void 0 ? void 0 : _c.call(name, "catch:")))) {
                    keyName = keyName.replace(/^(bind:)|^(catch:)/, "");
                }
                keyName =
                    replaceMappings[keyName] || keyName;
                attr.name = keyName;
                if (element.nodeName === "image" &&
                    attr.name === "src" &&
                    !((_d = attr.value) === null || _d === void 0 ? void 0 : _d.startsWith("/")) &&
                    !((_e = attr.value) === null || _e === void 0 ? void 0 : _e.startsWith("{{")) &&
                    config.useRootPath) {
                    attr.value =
                        "/" +
                            relative(join(config.cwd || process.cwd(), config.sourceDir || "src"), resolve(dirname(sourcePath), attr.value));
                }
            });
        }
    });
}
function parse(source, dest, options) {
    config = __assign({ sourceDir: "src" }, (options !== null && options !== void 0 ? options : {}));
    sourcePath = join(config.cwd || process.cwd(), source);
    var xml = readFileSync(sourcePath, "utf-8");
    var builderXml = transform(xml);
    writeFileSync(dest, builderXml);
    sourcePath = "";
    config = Object.create(null);
}

export { parse as default, transform };
//# sourceMappingURL=mini-xml-parser.es.js.map

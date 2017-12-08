"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = maskJs;
var DIGIT = '9';
var OPTIONAL = '?';
function maskJs(mask, value) {
    var inputArray = value.split('') || [];
    var digitsEntered = inputArray
        .map(function (char, index) { return (isNumber(char) ? 1 : 0); })
        .reduce(function (prev, next) { return (prev + next); }, 0);
    if (digitsEntered == 0)
        return '';
    var inputLength = value.length;
    var maskArray = mask.split('') || [];
    var indexes = maskArray.map(function (char, index) { return (char === OPTIONAL ? index : ''); }).filter(String);
    // counts 9s in the mask
    var digitPlaces = maskArray
        .map(function (char, index) { return (char === DIGIT ? 1 : 0); })
        .reduce(function (prev, next) { return (prev + next); }, 0);
    var maskedValue = maskArray;
    var nextElement = 0;
    var jump = false;
    var lengthDiff = digitPlaces - inputLength;
    maskArray.map(function (char, index) {
        if (jump) {
            lengthDiff--;
            jump = false;
            maskedValue[index] = '';
            return;
        }
        if (char === OPTIONAL) {
            jump = lengthDiff > 0;
            maskedValue[index] = '';
            return;
        }
        if (char === DIGIT && inputLength > nextElement) {
            var isNum = isNumber(value[nextElement]);
            if (isNum) {
                maskedValue[index] = value[nextElement];
                nextElement++;
                return;
            }
            while (inputLength > nextElement && !isNumber(value[nextElement])) {
                nextElement++;
            }
            maskedValue[index] = isNumber(value[nextElement]) ? value[nextElement] : '';
            nextElement++;
        }
        else if (inputLength <= nextElement) {
            maskedValue[index] = '';
        }
    });
    return maskedValue.join("");
} // preceeded by optional
function isNumber(value) {
    return value && value.match(/[0-9]/) != null;
}
//# sourceMappingURL=index.js.map
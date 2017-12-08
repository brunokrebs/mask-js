"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DIGIT = '9';
var OPTIONAL = '?';
function maskCurrency(value, decimalSeparator) {
    if (decimalSeparator === void 0) { decimalSeparator = '.'; }
    var thousandsSeparator = decimalSeparator == '.' ? ',' : '.';
    value = value || '';
    var justNumbers = value.replace(/\D/g, '');
    var reversedArray = justNumbers.split('').reverse();
    var result = '';
    reversedArray.map(function (char, index) {
        if (index == 2) {
            result = decimalSeparator + result;
        }
        else if (index >= 5 && (index + 1) % 3 === 0) {
            result = thousandsSeparator + result;
        }
        result = char + result;
    });
    return result;
}
exports.maskCurrency = maskCurrency;
function maskJs(mask, value) {
    value = value || '';
    var inputArray = value.split('');
    var digitsEntered = inputArray
        .map(function (char, index) { return (isNumber(char) ? 1 : 0); })
        .reduce(function (prev, next) { return (prev + next); }, 0);
    if (digitsEntered == 0)
        return '';
    var inputLength = value.length;
    mask = mask || '';
    var maskArray = mask.split('');
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
exports.maskJs = maskJs;
function isNumber(value) {
    return value && value.match(/[0-9]/) != null;
}
//# sourceMappingURL=index.js.map
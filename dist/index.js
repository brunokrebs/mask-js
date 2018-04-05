"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var currency_1 = require("./currency");
exports.maskCurrency = currency_1.default;
var date_1 = require("./date");
exports.maskDate = date_1.default;
var util_1 = require("./util");
exports.removeNonDigits = util_1.removeNonDigits;
var DIGIT = '9';
var OPTIONAL = '?';
function maskJs(mask, value) {
    value = (value || '');
    var justNumbers = value.replace(/\D/g, '');
    var inputArray = justNumbers.split('');
    var digitsEntered = inputArray
        .map(function (char, index) { return (util_1.isNumber(char) ? 1 : 0); })
        .reduce(function (prev, next) { return (prev + next); }, 0);
    if (digitsEntered == 0)
        return '';
    var inputLength = justNumbers.length;
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
            var isNum = util_1.isNumber(justNumbers[nextElement]);
            if (isNum) {
                maskedValue[index] = justNumbers[nextElement];
                nextElement++;
                return;
            }
            while (inputLength > nextElement && !util_1.isNumber(justNumbers[nextElement])) {
                nextElement++;
            }
            maskedValue[index] = util_1.isNumber(justNumbers[nextElement]) ? justNumbers[nextElement] : '';
            nextElement++;
        }
        else if (inputLength <= nextElement) {
            maskedValue[index] = '';
        }
    });
    return maskedValue.join("");
}
exports.maskJs = maskJs;
//# sourceMappingURL=index.js.map
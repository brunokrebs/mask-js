"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
var toFixed = function (value) {
    if (util_1.isNumber(value))
        return Number(value).toFixed(2);
    return Number(0).toFixed(2);
};
var maskCurrency = function (value, decimalSeparator) {
    if (decimalSeparator === void 0) { decimalSeparator = '.'; }
    var thousandsSeparator = decimalSeparator == '.' ? ',' : '.';
    var withDecimal = toFixed(value);
    var justDigits = util_1.removeNonDigits(withDecimal);
    var reversedArray = justDigits.split('').reverse();
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
};
exports.default = maskCurrency;
//# sourceMappingURL=currency.js.map
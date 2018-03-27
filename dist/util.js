"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isNumber = function (value) {
    return !isNaN(value);
};
exports.isNumber = isNumber;
var removeNonDigits = function (value) {
    return value.toString().replace(/\D/g, '');
};
exports.removeNonDigits = removeNonDigits;
//# sourceMappingURL=util.js.map
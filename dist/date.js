"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var maskDate = function (value, format) {
    if (format === void 0) { format = 'en-US'; }
    if (format === 'en-US') {
        return value.getFullYear() + "/" + (value.getMonth() + 1) + "/" + value.getDate();
    }
    return value.getDate() + "/" + (value.getMonth() + 1) + "/" + value.getFullYear();
};
exports.default = maskDate;
//# sourceMappingURL=date.js.map
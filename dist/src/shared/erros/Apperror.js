"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Apperror = void 0;
var Apperror = /** @class */ (function () {
    function Apperror(message, statusCode) {
        if (statusCode === void 0) { statusCode = 400; }
        this.message = message;
        this.statusCode = statusCode;
    }
    return Apperror;
}());
exports.Apperror = Apperror;

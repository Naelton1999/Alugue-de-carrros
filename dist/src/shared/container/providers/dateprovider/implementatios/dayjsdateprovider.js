"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dayjsdateprovider = void 0;
var dayjs_1 = __importDefault(require("dayjs"));
var utc_1 = __importDefault(require("dayjs/plugin/utc"));
dayjs_1.default.extend(utc_1.default);
var Dayjsdateprovider = /** @class */ (function () {
    function Dayjsdateprovider() {
    }
    Dayjsdateprovider.prototype.compareInHours = function (start_date, end_date) {
        var end_date_utc = this.convertToUtc(end_date);
        var start_date_utc = this.convertToUtc(start_date);
        return (0, dayjs_1.default)(end_date_utc).diff(start_date_utc, "hours");
    };
    Dayjsdateprovider.prototype.convertToUtc = function (date) {
        return (0, dayjs_1.default)(date).utc().local().format();
    };
    Dayjsdateprovider.prototype.dateNow = function () {
        return (0, dayjs_1.default)().toDate();
    };
    Dayjsdateprovider.prototype.compareInDays = function (start_date, end_date) {
        var end_date_utc = this.convertToUtc(end_date);
        var start_date_utc = this.convertToUtc(start_date);
        return (0, dayjs_1.default)(end_date).diff(start_date_utc, "days");
    };
    Dayjsdateprovider.prototype.addDays = function (days) {
        return (0, dayjs_1.default)().add(days, "days").toDate();
    };
    Dayjsdateprovider.prototype.addHours = function (hours) {
        return (0, dayjs_1.default)().add(hours, "hour").toDate();
    };
    Dayjsdateprovider.prototype.compareInBefore = function (start_date, end_date) {
        return (0, dayjs_1.default)(start_date).isBefore(end_date);
    };
    return Dayjsdateprovider;
}());
exports.Dayjsdateprovider = Dayjsdateprovider;

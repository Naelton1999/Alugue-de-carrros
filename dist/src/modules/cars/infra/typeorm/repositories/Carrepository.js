"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Carrepository = void 0;
var typeorm_1 = require("typeorm");
var Car_1 = require("../entities/Car");
var Carrepository = /** @class */ (function () {
    function Carrepository() {
        this.repositore = (0, typeorm_1.getRepository)(Car_1.Car);
    }
    Carrepository.prototype.create = function (_a) {
        var brand = _a.brand, category_id = _a.category_id, name = _a.name, description = _a.description, fine_amount = _a.fine_amount, license_plate = _a.license_plate, daily_rate = _a.daily_rate, especifications = _a.especifications, id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            var car;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        car = this.repositore.create({
                            brand: brand,
                            category_id: category_id,
                            name: name,
                            description: description,
                            fine_amount: fine_amount,
                            license_plate: license_plate,
                            daily_rate: daily_rate,
                            especifications: especifications,
                            id: id
                        });
                        return [4 /*yield*/, this.repositore.save(car)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, car];
                }
            });
        });
    };
    Carrepository.prototype.findByLicensePlate = function (license_plate) {
        return __awaiter(this, void 0, void 0, function () {
            var car;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repositore.findOne({ license_plate: license_plate })];
                    case 1:
                        car = _a.sent();
                        return [2 /*return*/, car];
                }
            });
        });
    };
    Carrepository.prototype.findAvailable = function (name, category_id, brand) {
        return __awaiter(this, void 0, void 0, function () {
            var carsQuery, cars;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repositore
                            .createQueryBuilder("c")
                            .where("available = :available", { available: true })];
                    case 1:
                        carsQuery = _a.sent();
                        if (brand) {
                            carsQuery.andWhere("brand =brand", { brand: brand });
                        }
                        if (name) {
                            carsQuery.andWhere("name =name", { name: name });
                        }
                        if (category_id) {
                            carsQuery.andWhere("category_id =category_id", { category_id: category_id });
                        }
                        return [4 /*yield*/, carsQuery.getMany()];
                    case 2:
                        cars = _a.sent();
                        return [2 /*return*/, cars];
                }
            });
        });
    };
    Carrepository.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var car;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repositore.findOne(id)];
                    case 1:
                        car = _a.sent();
                        return [2 /*return*/, car];
                }
            });
        });
    };
    Carrepository.prototype.updateAvailable = function (id, available) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repositore
                            .createQueryBuilder()
                            .update()
                            //aqui esta definindo o available
                            .set({ available: available })
                            //where é onde
                            .where("id = :id")
                            .setParameters({ id: id })
                            .execute()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Carrepository;
}());
exports.Carrepository = Carrepository;

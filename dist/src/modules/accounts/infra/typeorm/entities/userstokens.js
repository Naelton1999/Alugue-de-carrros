"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Userstokens = void 0;
var typeorm_1 = require("typeorm");
var users_1 = require("./users");
var uuid_1 = require("uuid");
var Userstokens = /** @class */ (function () {
    function Userstokens() {
        if (!this.id) {
            this.id = (0, uuid_1.v4)();
        }
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)(),
        __metadata("design:type", String)
    ], Userstokens.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Userstokens.prototype, "reflesh_token", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Userstokens.prototype, "user_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return users_1.User; }),
        (0, typeorm_1.JoinColumn)({ name: "user_id" }),
        __metadata("design:type", users_1.User)
    ], Userstokens.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Date)
    ], Userstokens.prototype, "expires_date", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Userstokens.prototype, "created_at", void 0);
    Userstokens = __decorate([
        (0, typeorm_1.Entity)("users_tokens"),
        __metadata("design:paramtypes", [])
    ], Userstokens);
    return Userstokens;
}());
exports.Userstokens = Userstokens;

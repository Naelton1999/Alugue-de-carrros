"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRoutes = void 0;
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var updateuseravatarcontroller_1 = require("@modules/accounts/usecases/updateuseravatar/updateuseravatarcontroller");
var upload_1 = __importDefault(require("@config/upload"));
var ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
var Createusercontroller_1 = require("@modules/accounts/usecases/createuser/Createusercontroller");
var profileusercontroller_1 = require("@modules/accounts/usecases/profileuserusecase/profileusercontroller");
var UsersRoutes = (0, express_1.Router)();
exports.UsersRoutes = UsersRoutes;
var uploadAvatar = (0, multer_1.default)(upload_1.default);
var createusercontroller = new Createusercontroller_1.Createusercontroller();
var updateuserAvatarcontrolle = new updateuseravatarcontroller_1.UpdateuserAvatarcontrolle();
var profileusercontroller = new profileusercontroller_1.Profileusercontroller();
UsersRoutes.post("/", createusercontroller.handle);
UsersRoutes.patch("/avatar", ensureAuthenticated_1.ensureAuthenticated, uploadAvatar.single("avatar"), updateuserAvatarcontrolle.handle);
UsersRoutes.get("/profile", ensureAuthenticated_1.ensureAuthenticated, profileusercontroller.handle);

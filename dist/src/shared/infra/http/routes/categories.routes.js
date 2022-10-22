"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesRoutes = void 0;
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var createcategorycontrole_1 = require("@modules/cars/usecases/createcategory/createcategorycontrole");
var importcategorycontrole_1 = require("@modules/cars/usecases/importcategory/importcategorycontrole");
var listcategoriescontrole_1 = require("@modules/cars/usecases/listcategory/listcategoriescontrole");
var ensureAuthenticated_1 = require("@shared/infra/http/middlewares/ensureAuthenticated");
var ensureAdmin_1 = require("@shared/infra/http/middlewares/ensureAdmin");
var categoriesRoutes = (0, express_1.Router)();
exports.categoriesRoutes = categoriesRoutes;
var upload = (0, multer_1.default)({
    dest: './tmp'
});
var createCategoryControle = new createcategorycontrole_1.Createcategorycontrole();
var importcategorycontrole = new importcategorycontrole_1.Importcategorycontrole();
var listcategoriescontrole = new listcategoriescontrole_1.Listcategorycontrole();
categoriesRoutes.post("/", ensureAuthenticated_1.ensureAuthenticated, ensureAdmin_1.ensureAdmin, createCategoryControle.handle);
categoriesRoutes.get("/", listcategoriescontrole.handle);
categoriesRoutes.post("/import", upload.single('file'), ensureAuthenticated_1.ensureAuthenticated, ensureAdmin_1.ensureAdmin, importcategorycontrole.handle);

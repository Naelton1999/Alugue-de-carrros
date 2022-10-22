"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tsyringe_1 = require("tsyringe");
require("@shared/container/providers/dateprovider");
var CategoriesRepository_1 = require("@modules/cars/infra/typeorm/repositories/CategoriesRepository");
var UsersRepository_1 = require("@modules/accounts/infra/typeorm/repositories/UsersRepository");
var SpecificationRepository_1 = require("@modules/cars/infra/typeorm/repositories/SpecificationRepository");
var Carrepository_1 = require("@modules/cars/infra/typeorm/repositories/Carrepository");
var Carimagesrepository_1 = require("@modules/cars/infra/typeorm/repositories/Carimagesrepository");
var rentalsrepository_1 = require("@modules/rentals/infra/typeorm/repositories/rentalsrepository");
var UserstokensRepository_1 = require("@modules/accounts/infra/typeorm/repositories/UserstokensRepository");
// aqui esta passando ICategoriesRepository para o singleton
tsyringe_1.container.registerSingleton("CategoriesRepository", CategoriesRepository_1.CategoriesRepository);
tsyringe_1.container.registerSingleton("SpecificationRepository", SpecificationRepository_1.SpecificationRepository);
tsyringe_1.container.registerSingleton("usersRepository", UsersRepository_1.UsersRepository);
tsyringe_1.container.registerSingleton("Carrepository", Carrepository_1.Carrepository);
tsyringe_1.container.registerSingleton("Carimagesrepository", Carimagesrepository_1.Carimagesrepository);
tsyringe_1.container.registerSingleton("Rentalsrepository", rentalsrepository_1.Rentalsrepository);
tsyringe_1.container.registerSingleton("UserstokensRepository", UserstokensRepository_1.UserstokensRepository);

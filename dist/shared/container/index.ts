import {container} from "tsyringe";
import "@shared/container/providers/dateprovider";
import {Icategoriesrepository} from "@modules/cars/repositore/Icategoriesrepositore";
import {Ispecification} from "@modules/cars/repositore/Ispecification";
import {IUsersRepository} from "@modules/accounts/repositories/IUsersRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationRepository";
import { ICarsrepository } from "@modules/cars/repositore/icarsrepository";
import { Carrepository } from "@modules/cars/infra/typeorm/repositories/Carrepository";
import { ICarsimagerepository } from "@modules/cars/repositore/Icarsimagesrepository";
import { Carimagesrepository } from "@modules/cars/infra/typeorm/repositories/Carimagesrepository";
import { IRentalsrepository } from "@modules/rentals/repositore/IRentalsrepository";
import { Rentalsrepository } from "@modules/rentals/infra/typeorm/repositories/rentalsrepository";
import { IUserstokensrepository } from "@modules/accounts/repositories/IUserstokensRepository";
import { UserstokensRepository } from "@modules/accounts/infra/typeorm/repositories/UserstokensRepository";


// aqui esta passando ICategoriesRepository para o singleton
container.registerSingleton<Icategoriesrepository>(
    "CategoriesRepository", CategoriesRepository 
)

container.registerSingleton<Ispecification>(
    "SpecificationRepository", SpecificationRepository 
)

container.registerSingleton<IUsersRepository>(
    "usersRepository", UsersRepository
)

container.registerSingleton<ICarsrepository>(
    "Carrepository", Carrepository
)

container.registerSingleton<ICarsimagerepository>(
    "Carimagesrepository", Carimagesrepository
)

container.registerSingleton<IRentalsrepository>(
    "Rentalsrepository", Rentalsrepository
)

container.registerSingleton<IUserstokensrepository>(
    "UserstokensRepository", UserstokensRepository
)
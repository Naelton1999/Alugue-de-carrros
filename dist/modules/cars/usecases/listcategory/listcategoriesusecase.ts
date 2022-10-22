import { inject, injectable } from 'tsyringe';
import { Icategoriesrepository } from "@modules/cars/repositore/Icategoriesrepositore";
import { Category } from '@modules/cars/infra/typeorm/entities/Category';


@injectable()
class Listcategorieusecase{
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepositore: Icategoriesrepository){}

    async execute(): Promise <Category[]> {
        const categories= await this.categoriesRepositore.list();
        return categories
    }
   

}

export {Listcategorieusecase}
import {Category} from '../entities/Category';
import {Icategoriesrepository, IcreateCategoriesDTO} from "../../../repositore/Icategoriesrepositore";

import {getRepository, Repository} from "typeorm";

class CategoriesRepository 
implements Icategoriesrepository{
   private repository: Repository<Category>

    private static INSTANCE: CategoriesRepository;

    constructor(){
        this.repository = getRepository(Category) };

    async create({name, description}: IcreateCategoriesDTO):Promise<void>{
        const category = this.repository.create({
            name,
            description
        })

        await this.repository.save(category)
    }
    async list(): Promise <Category[]> {
       const categories= await this.repository.find();
       return categories
    }
    async findByName(name:string): Promise <Category>{
    // selecionar todos  from do categories where name= "name" limit 1
        const category= await this.repository.findOne({name})
        return category
    }
}

export {CategoriesRepository};
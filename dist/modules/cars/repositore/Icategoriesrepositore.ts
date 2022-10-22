import { Category } from "../infra/typeorm/entities/Category";


interface IcreateCategoriesDTO{
    name:string,
    description: string}

interface Icategoriesrepository{
    findByName(name: string): Promise <Category>
    list(): Promise <Category[]>;
    create({name, description}: IcreateCategoriesDTO ): Promise <void>;
}

export {Icategoriesrepository, IcreateCategoriesDTO}
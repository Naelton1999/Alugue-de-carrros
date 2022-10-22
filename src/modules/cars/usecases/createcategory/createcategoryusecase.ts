import {inject, injectable} from 'tsyringe';
import { Icategoriesrepository } from '@modules/cars/repositore/Icategoriesrepositore';
import { Apperror } from '@shared/erros/Apperror';


interface IRequest{
    name:string;
    description:string; }

@injectable()
class Createcategoryusecase { 

  constructor(
    @inject("CategoriesRepository")
    
    private categoriesRepository: Icategoriesrepository){}

    async execute({name,description}: IRequest): Promise <void>{
    const categorieAlreadExist= await this.categoriesRepository.findByName(name);
    if (categorieAlreadExist) {throw new Apperror('ja existe')}
    
    await this.categoriesRepository.create({name, description}); }
}
export {Createcategoryusecase};
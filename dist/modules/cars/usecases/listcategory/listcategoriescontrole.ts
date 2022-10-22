import {Request, Response} from 'express';
import {Listcategorieusecase} from './listcategoriesusecase';
import {container} from 'tsyringe';

class Listcategorycontrole{
    
    async handle(request: Request, response: Response): Promise <Response>{
        const listcategoriesusecase= container.resolve(Listcategorieusecase)
        const all= await listcategoriesusecase.execute()
        return response.json(all)
    }
}
export {Listcategorycontrole}
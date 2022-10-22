import {Request, Response} from 'express';
import { Importcategoryusecase } from "./importcategoryusecase";
import {container} from 'tsyringe';

class Importcategorycontrole{
    
    async handle(request: Request, response: Response): Promise <Response> {
    const { file } = request;
    const importcategoryusecase = container.resolve(Importcategoryusecase)
    await importcategoryusecase.execute(file);
  
     return response.send();
    }

}

export{Importcategorycontrole}
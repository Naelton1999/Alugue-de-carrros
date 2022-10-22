import {Request, Response} from "express";

import {container} from 'tsyringe';
import { Createcategoryusecase } from "./createcategoryusecase";

class Createcategorycontrole{
    async handle(request: Request, response: Response): Promise <Response>{
        const{name, description}= request.body

        const createcategoryusecase = container.resolve(Createcategoryusecase)
        await createcategoryusecase.execute({name, description})
        return response.status(201).send()
    }
}

export {Createcategorycontrole}
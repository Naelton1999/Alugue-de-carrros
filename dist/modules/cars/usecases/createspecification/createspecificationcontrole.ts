import{Request, Response} from 'express';
import{Createespecification} from './createspecificationusecase';
import {container} from 'tsyringe';

class Createspecificationcontrole{

    async handle(request: Request, response: Response): Promise <Response>{
    const{name, description}= request.body
    const createespecification = container.resolve(Createespecification);

    await createespecification.execute({name, description})
    return response.status(201).send()


    }
}
export {Createspecificationcontrole}
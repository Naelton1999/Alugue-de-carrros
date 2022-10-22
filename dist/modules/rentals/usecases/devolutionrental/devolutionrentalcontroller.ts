import {Request,Response} from "express";
import { container } from "tsyringe";
import { Devolutionrentalusecase } from "./devolutionrentalusecase";

class Devolutionrentalcontroller{
    async handle(request:Request,response:Response):Promise<Response>{
        const {id:user_id}= request.user;
        const{id}= request.params
        const devolutionrentalusecase= container.resolve(Devolutionrentalusecase)
        const rental= await devolutionrentalusecase.execute({
            id,
            user_id
        });
        return response.status(200).json(rental)
    } 
}
export {Devolutionrentalcontroller}
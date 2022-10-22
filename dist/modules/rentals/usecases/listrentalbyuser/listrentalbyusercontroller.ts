import {Request,Response} from "express";
import { container } from "tsyringe";
import { Listrentalbyuserusecase } from "./listrentalbyuserusecase";

class Listrentalbyusercontroller{
    async handle(request:Request,response:Response):Promise<Response>{
        const {id}= request.user

        const listrentalbyuserusecase= container.resolve(Listrentalbyuserusecase);
        const rentals= await listrentalbyuserusecase.execute(id);
        return response.json(rentals)
    }

}

export{Listrentalbyusercontroller}
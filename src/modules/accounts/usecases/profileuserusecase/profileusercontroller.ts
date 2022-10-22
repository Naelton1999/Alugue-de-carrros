import { container } from "tsyringe";
import {Request, Response} from "express";
import { Profileuserusecase } from "./profileuserusecase";

class Profileusercontroller{
    async handle(request: Request, response: Response):Promise<Response>{
        const {id}= request.user
        const profileuserusecase= container.resolve(Profileuserusecase)
        const user= await profileuserusecase.execute(id)
        return response.json(user)

    }
}
export{Profileusercontroller}
import { Resetpasswordusecase } from "./resetpassworduserusecase";
import {container} from 'tsyringe';
import {Request, Response} from "express";
import { string } from "yargs";

class Resetpasswordcontroller{
    async handle(request: Request, response: Response):Promise<Response>{
        const {token}= request.query;
        const {password}= request.body
        const resetpasswordusecase= container.resolve(Resetpasswordusecase)

        await resetpasswordusecase.execute({token:String(token), password})

        return response.send()
    }
}
export {Resetpasswordcontroller}
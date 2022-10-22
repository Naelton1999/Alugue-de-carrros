import {Request, Response} from "express";
import {container} from 'tsyringe';
import { Refleshtokenusecase } from "./refleshtokenusecase";


class Refleshtokencontroller{
    async handle(request: Request, response: Response):Promise<Response>{
        const token=
        request.body.token || request.headers["x-access-token"] || request.query.token

        const refleshtokenusecase= container.resolve(Refleshtokenusecase)

        const reflesh_token= await refleshtokenusecase.execute(token)
        return response.json(reflesh_token)
    }

}

export {Refleshtokencontroller}
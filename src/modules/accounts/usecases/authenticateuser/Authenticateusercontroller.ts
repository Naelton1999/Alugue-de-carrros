import {Request, Response} from "express";
import {container} from 'tsyringe';
import {Authenticateuserusecase} from "./Authenticateuserusecase"


class Authenticatecontroller{
    async handle(request: Request, response: Response): Promise <Response> {
        const {password, email} = request.body

        const authenticateuserusecase = container.resolve(Authenticateuserusecase);
        const token = await authenticateuserusecase.execute({
            password,
            email
        })
        return response.json(token);
    }

}

export {Authenticatecontroller}
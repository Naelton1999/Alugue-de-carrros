import {Request, Response} from "express";
import {container} from 'tsyringe';
import {Createuserusecase} from "./Createuserusecase";


class Createusercontroller {
    async handle(request: Request, response: Response): Promise <Response>{
        const {name, password, email, driver_license}= request.body

        const createuserusecase= container.resolve(Createuserusecase)
        await createuserusecase.execute({name, password, email, driver_license})
        return response.status(201).send()
    }
}

export {Createusercontroller}
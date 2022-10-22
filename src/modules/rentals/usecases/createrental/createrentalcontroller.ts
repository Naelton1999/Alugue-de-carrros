import {container} from "tsyringe";
import {Request,response,Response} from "express";
import { Createrentalusecase } from "./createrentalusecase";

class Createrentalcontroller{
    async handle(request:Request, response:Response){
        const {expected_return_date,car_id}= request.body
        const {id}= request.user
        const createrentalusecase= container.resolve(Createrentalusecase)

        const rental= await createrentalusecase.execute({
            car_id,
            expected_return_date,
            user_id:id
        });
        return response.status(201).json(rental)
    }
}
export{Createrentalcontroller}
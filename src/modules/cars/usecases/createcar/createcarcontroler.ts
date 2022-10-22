import {container} from "tsyringe";
import {Request,response,Response} from "express";
import{Createcarusecase} from "./createcarusecase";

class Createcarcontroler{
    async handle(request:Request, response:Response):Promise <Response>{
        const {name,description,daily_rate,license_plate,fine_amount,brand,category_id} = request.body
    
        const createcarusecase= container.resolve(Createcarusecase);

        const car= await createcarusecase.execute({
            name,description,daily_rate,license_plate,fine_amount,brand,category_id
        });
        return response.status(201).json(car); 
    }
}
export{Createcarcontroler};
import {container} from "tsyringe";
import {Request, Response} from "express";
import { Createcarspecificationusecase } from "./createcarspecificationusecase";


    class Createcarspecificationcontroller{
        async handle(request:Request, response:Response):Promise <Response>{
            const {id}=request.params;
            const {specifications_id}=request.body

            const createcarspecificationusecase= container.resolve(
                Createcarspecificationusecase
            );
            const cars= await createcarspecificationusecase.execute({
                car_id:id,
                specifications_id
            });
            return response.json(cars)
        }
    }
    export{Createcarspecificationcontroller}
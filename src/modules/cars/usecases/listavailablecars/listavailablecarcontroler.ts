import {Request,Response} from "express";
import {container} from "tsyringe";
import {Listavailablecarusecase} from "./listavailablecarusecase"


class Listavailablecarcontroler{
    async handle(request:Request, response:Response): Promise<Response>{
        const {brand,category_id,name}= request.query
        const listavailablecarusecase= container.resolve(Listavailablecarusecase);

        const cars= await listavailablecarusecase.execute({
            brand: brand as string,
            category_id: category_id as string,
            name: name as string
        });
        return response.json(cars)

       
    }
}
export{Listavailablecarcontroler}
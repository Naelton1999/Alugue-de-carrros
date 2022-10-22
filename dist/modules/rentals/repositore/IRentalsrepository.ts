import { ICreaterentaldto } from "../dtos/ICreaterentaldto"
import { Rental } from "../infra/typeorm/entities/rental"


interface IRentalsrepository{
    findOpenRentalByCar(car_id:string):Promise<Rental>
    findOpenRentalByUser(user_id:string):Promise<Rental>
    create(data: ICreaterentaldto):Promise<Rental>
    findById(id:string):Promise <Rental>
    findByUser(user_id:string):Promise <Rental[]>
}

export{IRentalsrepository}
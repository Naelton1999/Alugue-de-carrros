import {Car} from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsrepository } from "@modules/cars/repositore/icarsrepository";
import { inject, injectable } from "tsyringe";

interface IRequest{
    category_id?:string,
    brand?:string,
    name?:string
}
@injectable()
class Listavailablecarusecase{
    
    constructor(
        @inject("Carrepository")
        private carsRepository: ICarsrepository){}
    
    async execute({category_id, brand, name}: IRequest):Promise <Car[]>{
        const cars=  await this.carsRepository.findAvailable(
            brand,
            category_id,
            name
        );
        return cars;
    }
}
export {Listavailablecarusecase}
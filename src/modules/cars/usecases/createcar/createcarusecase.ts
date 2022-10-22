import { Car } from "@modules/cars/infra/typeorm/entities/Car"
import { ICarsrepository } from "@modules/cars/repositore/icarsrepository"
import { Apperror } from "@shared/erros/Apperror"
import {inject, injectable} from "tsyringe"

interface IRequest{
    name:string,
    description:string,
    daily_rate:number,
    license_plate:string,
    fine_amount:number,
    brand:string,
    category_id:string
}

@injectable()
class Createcarusecase{
    constructor(
        @inject("Carrepository") 
        private carrepository:ICarsrepository
    ){};
    async execute({name,description,daily_rate,license_plate,fine_amount,brand,category_id}:IRequest):Promise <Car>{
        const caralreadyexist= await this.carrepository.findByLicensePlate(license_plate)
        if (caralreadyexist){throw new Apperror("car already exist")};

        const car= await this.carrepository.create({
            name,description,daily_rate,license_plate,fine_amount,brand,category_id
        });
        return car
    }
}

export{Createcarusecase}
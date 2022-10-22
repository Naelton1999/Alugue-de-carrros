import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsrepository } from "@modules/cars/repositore/icarsrepository"
import { Ispecification } from "@modules/cars/repositore/Ispecification";
import { Apperror } from "@shared/erros/Apperror";
import { inject, injectable } from "tsyringe";


interface IRequest{
    car_id:string,
    specifications_id:string[]
}
@injectable()
class Createcarspecificationusecase {
    constructor(
        @inject("Carrepository")
        private carrepository:ICarsrepository,
        @inject("SpecificationRepository")
        private ispecification:Ispecification
        ){}

    async execute({car_id,specifications_id}): Promise<Car>{
        const carexist= await this.carrepository.findById(car_id);
        if(!carexist){
            throw new Apperror("car does not exist")
        }
        const ispecification= await this.ispecification.findByIds(specifications_id);
        carexist.especifications= ispecification

        await this.carrepository.create(carexist);
        return carexist
    }
}

export{Createcarspecificationusecase}
//
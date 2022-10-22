import { IRentalsrepository } from "../../repositore/IRentalsrepository"
import { Apperror } from "@shared/erros/Apperror"
import { Rental } from "@modules/rentals/infra/typeorm/entities/rental";
import { inject, injectable } from "tsyringe";

@injectable()
class Listrentalbyuserusecase{
    constructor(
        @inject("Rentalsrepository")
        private rentalsrepository: IRentalsrepository,

    ){}
    async execute(user_id:string):Promise<Rental[]>{
        const rentalByUser= await this.rentalsrepository.findByUser(user_id);
        return rentalByUser

    }

}

export{Listrentalbyuserusecase}
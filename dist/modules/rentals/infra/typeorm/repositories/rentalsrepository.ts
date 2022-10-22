import { ICreaterentaldto } from "@modules/rentals/dtos/ICreaterentaldto";
import { IRentalsrepository } from "@modules/rentals/repositore/IRentalsrepository";
import { getRepository, Repository } from "typeorm";
import { Rental } from "../entities/rental";


class Rentalsrepository implements IRentalsrepository{
    private repository: Repository<Rental>

    constructor() {
        this.repository = getRepository(Rental);
      }

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        const OpenRentalByCar= await this.repository.findOne({
            where:{car_id, end_date: null}
        })
        return OpenRentalByCar
    }
    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        const OpenRentalByUser= await this.repository.findOne({
            where:{user_id, end_date: null}
        })
        return OpenRentalByUser
    }
    async create({car_id,expected_return_date,user_id,id,end_date,total}: ICreaterentaldto): Promise<Rental> {
        const rental= this.repository.create({
            car_id,
            expected_return_date,
            user_id,
            id,
            end_date,
            total
        })
        await this.repository.save(rental)
        return rental
    }
    async findById(id: string): Promise<Rental> {
        const rental=await this.repository.findOne(id)
        return rental;
    }
    async findByUser(user_id: string): Promise<Rental[]> {
        const rentals= await this.repository.find({
            where:{user_id},
            relations:["car"]
        })
        return rentals
    }
    
}
export{Rentalsrepository}
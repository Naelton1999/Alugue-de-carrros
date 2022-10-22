import { IRentalsrepository } from "../../repositore/IRentalsrepository"
import { Apperror } from "@shared/erros/Apperror"
import { Rental } from "@modules/rentals/infra/typeorm/entities/rental"
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import {Idateprovider} from "@shared/container/providers/dateprovider/Idateprovider"
import { inject, injectable } from "tsyringe";
import { ICarsrepository } from "@modules/cars/repositore/icarsrepository";

interface IRequest{
    user_id:string,
    car_id:string,
    expected_return_date:Date
}
@injectable()
class Createrentalusecase{
    constructor(
        @inject("Rentalsrepository")
        private rentalsrepository: IRentalsrepository,
        @inject("Dayjsdateprovider")
        private dateprovider: Idateprovider,
        @inject("Carrepository")
        private carrepository:ICarsrepository
        ){}

    async execute({user_id,car_id,expected_return_date}:IRequest): Promise<Rental>{
        const minimunhour=24
        //Não deve ser possivel cadastrar um aluguel caso ja exista para o mesmo carro
        const carUnavailable= await this.rentalsrepository.findOpenRentalByCar(car_id)
        if(carUnavailable){
            throw new Apperror("car is unavailable")}
 
        //Não deve ser possivel cadastrar um novo aluguel caso ja exista um aberto para o mesmo usuario
        const rentalopentTouser= await this.rentalsrepository.findOpenRentalByUser(user_id)
        if(rentalopentTouser){
            throw new Apperror("there's a rental in progress for user!")
        }

        //o aluguel deve ter duração minima de 24 horas
        //const expectedreturndateformat= this.dateprovider.convertiToUtc(expected_return_date)

        const datenow=this.dateprovider.dateNow()

        const compare= this.dateprovider.compareInHours(datenow,expected_return_date)

        if(compare<minimunhour){
            throw new Apperror("invalid return time")
        }

        const rental=await this.rentalsrepository.create({
            user_id,
            car_id,
            expected_return_date
        });
        await this.carrepository.updateAvailable(car_id, false)

        return rental
    }
}

export{Createrentalusecase}
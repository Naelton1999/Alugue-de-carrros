import {Idateprovider} from "@shared/container/providers/dateprovider/Idateprovider"
import { inject, injectable } from "tsyringe";
import { ICarsrepository } from "@modules/cars/repositore/icarsrepository";
import { IRentalsrepository } from "../../repositore/IRentalsrepository"
import { Apperror } from "@shared/erros/Apperror"
import { Rental } from "@modules/rentals/infra/typeorm/entities/rental";

interface IRequest{
    id:string,
    user_id:string,
}
@injectable()
class Devolutionrentalusecase{
    constructor(
        @inject("Rentalsrepository")
        private rentalsrepository: IRentalsrepository,
        @inject("Carrepository")
        private carrepository:ICarsrepository,
        @inject("Dayjsdateprovider")
        private dateprovider: Idateprovider,
    ){}
    async execute({id, user_id}:IRequest):Promise<Rental>{
        const rental= await this.rentalsrepository.findById(id);
        const car= await this.carrepository.findById(rental.car_id);

        const minimum_daily=1;

        if(!rental){
            throw new Apperror("rental does not exists")
        }
        const dateNow= this.dateprovider.dateNow()
        //aqui esta verificando quantas diarias tem esse aluguel 
        let daily= this.dateprovider.compareInDays(rental.start_date, this.dateprovider.dateNow());
        //se for uma diaria menor ou igual a zero é atribuido o valor minimo de um dia
        if(daily<=0){
            daily= minimum_daily}

        const delay=this.dateprovider.compareInDays(dateNow, rental.expected_return_date);

        let total=0;

        if(delay>0){
            const calculale_fine= delay * car.fine_amount;
            total= calculale_fine}
        
        total += daily * car.daily_rate;

        rental.end_date= this.dateprovider.dateNow();
        rental.total=total
        
        await this.rentalsrepository.create(rental)
        await this.carrepository.updateAvailable(car.id, true)
        return rental
    }
}
export{Devolutionrentalusecase}
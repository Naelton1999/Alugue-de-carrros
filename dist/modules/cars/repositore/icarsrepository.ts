import { ICreatecarDTO } from "../dtos/Icreatecardto"
import { Car } from "../infra/typeorm/entities/Car";

//aqui eu estou recebendo os dados para criar a interface
interface ICarsrepository{
    create(data:ICreatecarDTO):Promise <Car>;
    findByLicensePlate(license_plate:string):Promise<Car>;
    findAvailable(name?:string, category_id?:string, brand?:string):Promise<Car[]>;
    findById(id:string):Promise<Car>;
    updateAvailable(id:string,available:boolean):Promise<void>
}
export{ICarsrepository}
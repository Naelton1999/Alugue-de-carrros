import { ICreatecarDTO } from "../../dtos/Icreatecardto";
import {Car} from "@modules/cars/infra/typeorm/entities/Car"
import { ICarsrepository } from "@modules/cars/repositore/icarsrepository"

class Carsrepositoryinmemory implements ICarsrepository{
   
    cars:Car[]=[];

    async create({name,description,daily_rate,license_plate,fine_amount,brand,category_id,id}: ICreatecarDTO): Promise<Car> {
        const car= new Car()
        Object.assign(car,{
            name,description,daily_rate,license_plate,fine_amount,brand,category_id,id
        });
        this.cars.push(car);
        return car
    }
    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find((car)=> car.license_plate===license_plate)
    }
    async findAvailable(name?:string, category_id?:string, brand?:string): Promise<Car[]> {
        //o find so retorna um item, ams o filter retorna uma lista
        const all= this.cars.filter((car)=> car.available===true)
        .filter((car)=> {
           if(car.available===true ||((brand && car.brand=== brand)
           || (category_id && car.category_id===category_id)
           || (name && car.name===name) )) {
            return car
           }
           return null
        })         
        
        return all;
    }
    async findById(id: string): Promise<Car> {
        return this.cars.find((car)=>car.id===id);
    }
    async updateAvailable(id: string, available: boolean): Promise<void> {
        const findIndex=this.cars.findIndex((car)=>car.id===id)
        this.cars[findIndex].available=available
    }
    
}
export {Carsrepositoryinmemory}
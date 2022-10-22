import { ICreatecarDTO } from "@modules/cars/dtos/Icreatecardto";
import {ICarsrepository} from "@modules/cars/repositore/icarsrepository";
import { query } from "express";
import { getRepository, Repository } from "typeorm";
import { Car } from "../entities/Car";

class Carrepository implements ICarsrepository{

    private repositore:Repository<Car>;
    constructor(){
        this.repositore=getRepository(Car);
    }
   
    async create({brand,category_id,name,description,fine_amount,license_plate,daily_rate,especifications,id}: ICreatecarDTO): Promise<Car> {
        const car= this.repositore.create({
            brand,category_id,name,description,fine_amount,license_plate,daily_rate,especifications,id
        });
        await this.repositore.save(car);
        return car
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car= await this.repositore.findOne({license_plate})
        return car;
    }
    async findAvailable(name?: string, category_id?: string, brand?: string):Promise<Car[]> {
        const carsQuery = await this.repositore
        .createQueryBuilder("c")
        .where("available = :available", { available: true });
        if (brand){carsQuery.andWhere("brand =brand", {brand})}
        if (name){carsQuery.andWhere("name =name", {name})}
        if (category_id){carsQuery.andWhere("category_id =category_id", {category_id})}
        
        const cars= await carsQuery.getMany()
        return cars
    }
    async findById(id: string): Promise<Car> {
        const car= await this.repositore.findOne(id);
        return car
    }
    async updateAvailable(id: string, available: boolean): Promise<void> {
        await this.repositore
        .createQueryBuilder()
        .update()
        //aqui esta definindo o available
        .set({available})
        //where é onde
        .where("id = :id")
        .setParameters({id})
        .execute()
    }
    //update cars set available ="true" where id=id

}

export{Carrepository}
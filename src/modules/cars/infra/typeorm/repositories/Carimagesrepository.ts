import { getRepository, Repository } from "typeorm";
import { ICarsimagerepository } from "../../../repositore/Icarsimagesrepository";
import { Carimage } from "../entities/Carimage";

class Carimagesrepository implements ICarsimagerepository{
    private repository:Repository<Carimage>;

    constructor(){
        this.repository=getRepository(Carimage)
    }
    async create(car_id: string, image_name: string): Promise<Carimage> {
        const carimage= this.repository.create({
            car_id,
            image_name
        });
        await this.repository.save(carimage)
        return carimage       
    }

}

export {Carimagesrepository}
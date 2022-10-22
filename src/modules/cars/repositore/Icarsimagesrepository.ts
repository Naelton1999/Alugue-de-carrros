import {Carimage} from "../infra/typeorm/entities/Carimage"

interface ICarsimagerepository{
    create(car_id:string,image_name:string):Promise<Carimage>
}

export{ICarsimagerepository}
import { inject, injectable } from "tsyringe"
import {ICarsimagerepository} from "@modules/cars/repositore/Icarsimagesrepository";
import { Istorageprovider } from "@shared/container/providers/storageprovider/Istorageprovider";

interface IRequest{
    car_id:string,
    images_name:string[]
}
@injectable()
class Uploadcarimage{
    constructor(
        @inject("Carimagesrepository")
        private carimagesrepository: ICarsimagerepository,
        @inject("storageprovider")
        private storageprovider: Istorageprovider
    ){}
    async execute({car_id,images_name}:IRequest){
        images_name.map(async(image)=>{
            await this.carimagesrepository.create(car_id,image);
            await this.storageprovider.save(image, "cars")
        })
    }

}
export{Uploadcarimage}
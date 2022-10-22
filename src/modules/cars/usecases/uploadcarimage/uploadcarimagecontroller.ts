import {Request, Response} from "express"
import {container} from "tsyringe"
import { Uploadcarimage } from "./uploadcarimageusecase"

interface IFiles{
    filename:string
}

class Uploadcarimagecontroller{
    async handle(request:Request,response:Response): Promise<Response>{
        const {id}= request.params
        const images= request.files as IFiles[]
        const uploadcarimage= container.resolve(Uploadcarimage)
        const images_name= images.map((file)=> file.filename);
        await uploadcarimage.execute({
            car_id:id,
            images_name
        })
        return response.status(201).send()

    }
}
export{Uploadcarimagecontroller}
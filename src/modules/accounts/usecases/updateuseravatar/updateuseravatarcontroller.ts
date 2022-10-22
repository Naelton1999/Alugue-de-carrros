import { container } from "tsyringe";
import {Request, Response} from "express";
import {UpdateuserAvatarusecase} from "./updateuseravatarusecase";

class UpdateuserAvatarcontrolle{
    async handle(request: Request, response: Response):Promise<Response>{
        const {id}= request.user;
        const avatar_file= request.file.filename;
        const updateuserAvatarusecase = container.resolve(UpdateuserAvatarusecase)
        await updateuserAvatarusecase.execute({user_id: id, avatar_file});
        return response.status(200).send();
    }
}

export {UpdateuserAvatarcontrolle}
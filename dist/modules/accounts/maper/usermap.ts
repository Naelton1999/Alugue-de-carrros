import { IUserresponseDTO } from "../dtos/IUsersresponseDTO";
import { User } from "../infra/typeorm/entities/users";
import {instanceToInstance} from "class-transformer"

class Usermap{
    static toDTO({
        email, name, id, avatar, driver_license, avatar_url}:User):IUserresponseDTO{
            const user= instanceToInstance({email, name, id, avatar, driver_license, avatar_url})
            return user
        }
}

export {Usermap}
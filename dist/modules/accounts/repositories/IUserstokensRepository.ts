import{ICreateuserstokensDTO} from "../dtos/ICreateUsersTokenDTO"
import { Userstokens } from "../infra/typeorm/entities/userstokens"

interface IUserstokensrepository{
    create({expires_date,user_id,reflesh_token}:ICreateuserstokensDTO):Promise<Userstokens>
    findByUserIdAndRefleshToken(user_id:string,reflesh_token:string):Promise<Userstokens>
    deleteByUserId(id:string):Promise<void>
    findByUserToken(reflesh_token:string):Promise<Userstokens>

}

export{IUserstokensrepository}
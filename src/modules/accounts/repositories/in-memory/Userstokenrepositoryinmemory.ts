import { ICreateuserstokensDTO } from "../../dtos/ICreateUsersTokenDTO";
import { Userstokens } from "../../infra/typeorm/entities/userstokens";
import {IUserstokensrepository} from "../IUserstokensRepository";

    class Userstokenrepositoryinmemory implements IUserstokensrepository{
        userstokens: Userstokens[] = []  

        async create({ expires_date, user_id, reflesh_token }: ICreateuserstokensDTO): Promise<Userstokens> {
            const usertoken= new Userstokens()
            Object.assign(usertoken,{
                expires_date,
                reflesh_token,
                user_id
            })
            this.userstokens.push(usertoken)
            return usertoken   
        }
        async findByUserIdAndRefleshToken(user_id: string, reflesh_token: string): Promise<Userstokens> {
            const usertoken= this.userstokens.find((ut)=> ut.user_id===user_id && ut.reflesh_token && reflesh_token)
            return usertoken
        }
        async deleteByUserId(id: string): Promise<void> {
            const usertoken= this.userstokens.find((ut)=>ut.id ===id);
            this.userstokens.splice(this.userstokens.indexOf(usertoken))
        }
        async findByUserToken(reflesh_token: string): Promise<Userstokens> {
            const usertoken= this.userstokens.find(
                (ut)=> ut.reflesh_token===reflesh_token)
            return usertoken
        }
    }
    export {Userstokenrepositoryinmemory}
import { ICreateuserstokensDTO } from "@modules/accounts/dtos/ICreateUsersTokenDTO";
import {IUserstokensrepository} from "@modules/accounts/repositories/IUserstokensRepository";
import { getRepository, Repository } from "typeorm";
import { Userstokens } from "../entities/userstokens";

class UserstokensRepository implements IUserstokensrepository{
    private repository : Repository<Userstokens>;
    constructor(){
        this.repository= getRepository(Userstokens)
    }
    async create({ expires_date, user_id, reflesh_token }: ICreateuserstokensDTO): Promise<Userstokens> {
        const usertokens= this.repository.create({
            expires_date,
            reflesh_token,
            user_id
        })
        await this.repository.save(usertokens)
        return usertokens
    }
    async findByUserIdAndRefleshToken(user_id: string,reflesh_token:string): Promise<Userstokens> {
        const userstokens= await this.repository.findOne({
            user_id,
            reflesh_token
        })
        return userstokens
    }
    async deleteByUserId(id: string): Promise<void> {
        await this.repository.delete(id)
    }
    async findByUserToken(reflesh_token: string): Promise<Userstokens> {
        const usertoken= await this.repository.findOne({reflesh_token})
        return usertoken
    }
}

export {UserstokensRepository}
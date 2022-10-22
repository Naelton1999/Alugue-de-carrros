import auth from "@config/auth"
import { IUserstokensrepository } from "@modules/accounts/repositories/IUserstokensRepository"
import { Apperror } from "@shared/erros/Apperror"
import {verify, sign} from "jsonwebtoken"
import { inject, injectable } from "tsyringe"
import { Idateprovider } from "@shared/container/providers/dateprovider/Idateprovider";

interface ITokenresponse{
    token: string
    reflesh_token: string
  }
interface IPayload{
    email:string
    sub:string
}
@injectable()
class Refleshtokenusecase{
    constructor(
    @inject("UserstokensRepository")
    private userstokensRepository: IUserstokensrepository,
    @inject("Dayjsdateprovider")
    private dateprovider: Idateprovider
    ){}
    async execute(token:string):Promise<ITokenresponse>{
    const {email, sub}= verify(token, auth.secret_reflesh_token) as IPayload;
    const user_id= sub

    const usertoken= await this.userstokensRepository.findByUserIdAndRefleshToken(user_id,token)

    if(!usertoken){throw new Apperror("Refrlesh token erro does not exists")}
    await this.userstokensRepository.deleteByUserId(usertoken.id)

    const reflesh_token=sign({email}, auth.secret_reflesh_token, {
        subject:sub,
        expiresIn: auth.expires_in_reflesh_token
    });
    const expires_date=this.dateprovider.addDays(auth.expires_reflesh_token_days);
    await this.userstokensRepository.create({
        expires_date,reflesh_token,user_id
    });
    const newToken= sign({}, auth.secret_token,{
        subject: user_id,
        expiresIn:auth.expires_in_token
    });
    return{
        reflesh_token, token: newToken}
    }
}

export {Refleshtokenusecase}


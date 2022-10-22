import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository"
import { IUserstokensrepository } from "@modules/accounts/repositories/IUserstokensRepository"
import { Idateprovider } from "@shared/container/providers/dateprovider/Idateprovider"
import { Apperror } from "@shared/erros/Apperror"
import { hash } from "bcrypt"
import { inject, injectable } from "tsyringe"

interface IRequest{
    password:string,
    token:string
}
@injectable()
class Resetpasswordusecase{
    constructor(
    @inject("UserstokensRepository")
    private userstokensRepository: IUserstokensrepository,
    @inject("Dayjsdateprovider")
    private dateprovider: Idateprovider,
    @inject("usersRepository")
    private usersRepository: IUsersRepository,
    ){}
    async execute({token,password}:IRequest):Promise <void>{
        const usertoken= await this.userstokensRepository.findByUserToken(token)

        if(!usertoken){throw new Apperror("token invalid")}
        if (this.dateprovider.compareInBefore(usertoken.expires_date,this.dateprovider.dateNow())){
            throw new Apperror("token expired")}

        const user= await this.usersRepository.findById(usertoken.user_id)

        user.password= await hash(password, 8)
        await this.usersRepository.create(user)

        await this.userstokensRepository.deleteByUserId(usertoken.id)
    }
}
export {Resetpasswordusecase}
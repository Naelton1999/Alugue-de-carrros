import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository"
import { IUserstokensrepository } from "@modules/accounts/repositories/IUserstokensRepository"
import { Idateprovider } from "@shared/container/providers/dateprovider/Idateprovider"
import { IMailprovider } from "@shared/container/providers/mailprovider/imailprovider"
import { Apperror } from "@shared/erros/Apperror"
import { inject, injectable } from "tsyringe"
import {v4 as uuidv4} from "uuid"
import {resolve} from "path"

@injectable()
class Sendforgotpasswordmailusecase{
    constructor(
    @inject("usersRepository")
    private usersRepository: IUsersRepository,
    @inject("UserstokensRepository")
    private userstokensRepository: IUserstokensrepository,
    @inject("Dayjsdateprovider")
    private dateprovider: Idateprovider,
    @inject("Mailprovider")
    private mailprovider: IMailprovider
    ){}

    async execute(email:string): Promise<void>{
        const user= await this.usersRepository.findByEmail(email)
        const templatepath= resolve(__dirname,"..", "..", "views", "emails", "forgotemail.hbs")

        if(!user){throw new Apperror("user does not exist")}

        const token=uuidv4()

        const expires_date=this.dateprovider.addHours(3)

        await this.userstokensRepository.create({
            reflesh_token:token,
            user_id:user.id,
            expires_date
        })
        const variables={
            name:user.name,
            link:`${process.env.FORGOT_MAIL_URL}${token}`

        }

        await this.mailprovider.sendMail(
            email,
            "Recuperação de senha",
            variables,
            templatepath
        )
    }

}
export {Sendforgotpasswordmailusecase}
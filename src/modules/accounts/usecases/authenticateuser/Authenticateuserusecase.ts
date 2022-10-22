import {inject, injectable} from "tsyringe";
import {IUsersRepository} from "@modules/accounts/repositories/IUsersRepository";
import {compare} from "bcrypt";
import {sign} from "jsonwebtoken";
import { Apperror } from "@shared/erros/Apperror";
import { IUserstokensrepository } from "@modules/accounts/repositories/IUserstokensRepository";
import auth from "@config/auth";
import { Subject } from "typeorm/persistence/Subject";
import { Idateprovider } from "@shared/container/providers/dateprovider/Idateprovider";

interface IRequest{
    email: string;
    password: string
}
interface IResponse{
    user:{
        name:string,
        email:string;};
    token: string;
    reflesh_token:string
}

@injectable()
class Authenticateuserusecase{
    constructor(
    @inject("usersRepository")
    private usersRepository : IUsersRepository,
    @inject("UserstokensRepository")
    private userstokensRepository: IUserstokensrepository,
    @inject("Dayjsdateprovider")
    private dateprovider: Idateprovider
    ){}

//aqui esta verificando se o usuario existe, se a senha esta correta e se estiver correta vai gerar jsonwebtoken
    async execute({email, password}: IRequest): Promise<IResponse> {
        const user= await this.usersRepository.findByEmail(email);
        const {expires_in_token,secret_reflesh_token,secret_token, expires_in_reflesh_token,
        expires_reflesh_token_days}= auth

        if (!user){ throw new Apperror("email ou senha incorreto")};
        
        //verifica se asenha esta correta
        const passwordMatch = await compare(password, (await user).password);
        if (!passwordMatch){throw new Apperror("email ou senha incorreto")};

        const token= sign({}, secret_token, {
            subject: user.id,
            expiresIn: expires_in_token
        });
        const reflesh_token=sign({email}, secret_reflesh_token, {
            subject:user.id,
            expiresIn:expires_in_reflesh_token} )

        const reflesh_token_expires_date= this.dateprovider.addDays(expires_reflesh_token_days)

        await this.userstokensRepository.create({
            user_id:user.id,
            reflesh_token,
            expires_date:reflesh_token_expires_date
        })

        const tokenReturn: IResponse={
            token,
            user:{
                name: user.name,
                email: user.email
            },
            reflesh_token
        };
        return tokenReturn
         
    }
    
}

export {Authenticateuserusecase}
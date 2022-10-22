import {inject, injectable} from "tsyringe";
import {IUsersRepository} from "@modules/accounts/repositories/IUsersRepository";
import {ICreateUsersDTO} from "@modules/accounts/dtos/ICreateUsersDTO";
import {hash} from "bcrypt";
import { Apperror } from "@shared/erros/Apperror";


@injectable()
class Createuserusecase{
    constructor(
        @inject("usersRepository")
        private usersRepository: IUsersRepository) {}

    async execute({name, password, email, driver_license}: ICreateUsersDTO): Promise<void>{
        const userAlreadyExists = await this.usersRepository.findByEmail(email)
        if (userAlreadyExists){throw new Apperror("usuaria ja existe")}

        //assim que se mantem a senha oculta, no banco de dados. instala o yarn add bcrypt  e importa
        const passwordHash = await hash(password, 8)
        await this.usersRepository.create({
            name, 
            password: passwordHash,
            email, 
            driver_license
        });

    }

}


export {Createuserusecase}




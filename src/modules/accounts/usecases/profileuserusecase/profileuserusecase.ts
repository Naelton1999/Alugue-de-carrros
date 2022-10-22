import { IUserresponseDTO } from "@modules/accounts/dtos/IUsersresponseDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/users";
import { Usermap } from "@modules/accounts/maper/usermap";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class Profileuserusecase{
    constructor(
        @inject("usersRepository")
        private userRepository: IUsersRepository,
    ){}

    async execute(id:string):Promise<IUserresponseDTO>{
        const user= await this.userRepository.findById(id)
        return Usermap.toDTO(user)

    }
}
export {Profileuserusecase}
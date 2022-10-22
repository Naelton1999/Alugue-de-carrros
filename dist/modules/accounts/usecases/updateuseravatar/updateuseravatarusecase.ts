import {deleteFile} from "../../../../utils/file";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { Istorageprovider } from "@shared/container/providers/storageprovider/Istorageprovider";

interface IRequest{
    user_id: string;
    avatar_file: string;
}
@injectable()
class UpdateuserAvatarusecase{
    constructor(
        @inject("usersRepository")
        private userRepository: IUsersRepository,
        @inject("storageprovider")
        private storageprovider: Istorageprovider
    ){}
   
    async execute({user_id, avatar_file}: IRequest): Promise <void>{
        const user= await this.userRepository.findById(user_id);

        if (user.avatar){await this.storageprovider.delete(user.avatar, "avatar")}
        user.avatar= avatar_file
        await this.storageprovider.save(avatar_file, "avatar")
        user.avatar= avatar_file;

        await this.userRepository.create(user)
    }
}
//ab382a43672c327af9ba41e269f036c3-images.jpg
export {UpdateuserAvatarusecase}
import {User} from "../entities/users"
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import {ICreateUsersDTO} from "../../../dtos/ICreateUsersDTO"
import {getRepository, Repository} from "typeorm";

class UsersRepository implements IUsersRepository{
    private repository: Repository<User>;
    constructor(){
        this.repository= getRepository(User);
    }

    async create({name, password, email, driver_license,avatar,id}: ICreateUsersDTO): Promise <void>{
        const user= this.repository.create({
            name, password, email, driver_license,avatar,id
        });

        await this.repository.save(user);
    } 
    async findByEmail(email: string): Promise<User> {
      const user = await this.repository.findOne({email});
      return user }

    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne(id)
        return user }
}
export {UsersRepository}
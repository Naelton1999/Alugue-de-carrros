import { Ispecification, IspecificationDTO } from "../../../repositore/Ispecification";
import {IcreateCategoriesDTO} from "../../../repositore/Icategoriesrepositore";
import { getRepository, Repository } from "typeorm";
import {Especification} from "../entities/Especification";

class SpecificationRepository   implements Ispecification{
    private repository: Repository<Especification>;
    constructor(){
        this.repository = getRepository(Especification)
        }

    async create({description, name }: IspecificationDTO): Promise <Especification> {
       const specificationRepository = this.repository.create({
        description,
        name,
       });
       await this.repository.save(specificationRepository)
       return specificationRepository;
    }

    async findByName(name: string): Promise <Especification>{
        const specificationRepository= await this.repository.findOne({
              name,
        });
        return specificationRepository;
    }
    async findByIds(ids: string[]): Promise<Especification[]> {
        const specification= await this.repository.findByIds(ids);
        return specification; 
    }
}      

export {SpecificationRepository}
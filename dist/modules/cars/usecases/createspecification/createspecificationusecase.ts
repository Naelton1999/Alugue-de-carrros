import { Ispecification } from "@modules/cars/repositore/Ispecification";
import { Apperror } from "@shared/erros/Apperror";
import { inject, injectable } from "tsyringe";

interface IRequest{
    name: string,
    description: string,}

    @injectable()
class Createespecification{
    constructor( 
        @inject("SpecificationRepository")
        private specification: Ispecification){}
        async execute({name, description}: IRequest): Promise <void>{
        const specificationAlreadyExist= await this.specification.findByName(name);
        if (specificationAlreadyExist){
            throw new Apperror('error: especification ja existe')
        }
        await this.specification.create({
            name, 
            description,
        })
    }
}

//private serve para ter acesso ao this.
export{Createespecification}
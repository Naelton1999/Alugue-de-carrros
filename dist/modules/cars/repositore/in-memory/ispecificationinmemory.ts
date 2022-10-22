import { Especification } from "../../infra/typeorm/entities/Especification";
import {Ispecification, IspecificationDTO} from "../Ispecification";

class Ispecificationinmemory implements Ispecification{
    especifications: Especification[]=[]

    async create({ name, description }: IspecificationDTO): Promise<Especification> {
        const especification= new Especification();
        Object.assign(especification,{
            description,
            name
        });
        this.especifications.push(especification)
        return especification;
    }
    async findByName(name: string): Promise<Especification> {
        return this.especifications.find((especification) => especification.name===name)
    }
    async findByIds(ids: string[]): Promise<Especification[]> {
        const allspecification= this.especifications.filter((especification)=> ids.includes(especification.id))
        return allspecification;
    }

}

export{Ispecificationinmemory}
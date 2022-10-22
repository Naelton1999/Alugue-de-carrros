import { Especification } from "../infra/typeorm/entities/Especification"

interface IspecificationDTO{
    name: string,
    description: string
}
interface Ispecification{
    create({name, description}: IspecificationDTO): Promise <Especification>
    findByName(name: string): Promise <Especification>;
    findByIds(ids:string[]): Promise<Especification[]>
}

export {Ispecification, IspecificationDTO} 
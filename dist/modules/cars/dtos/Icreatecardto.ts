import { Especification } from "../infra/typeorm/entities/Especification"


interface ICreatecarDTO{
    name:string,
    description:string,
    daily_rate:number,
    license_plate:string,
    fine_amount:number,
    brand:string,
    category_id:string,
    especifications?:Especification[],
    id?:string

}
export {ICreatecarDTO}
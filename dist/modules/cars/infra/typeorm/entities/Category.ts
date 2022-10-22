import {v4 as uuidv4} from 'uuid';
import {CreateDateColumn, Entity} from "typeorm";
import { Column, PrimaryColumn } from 'typeorm';

@Entity("categories")
class Category{
    @Column()
    name:string;

    @PrimaryColumn()
    id?:string;

    @Column()
    description:string;
    
    @CreateDateColumn()
    created_at: Date;

//esta responsavel por adicionar um uuid caso não tenha um id
constructor(){
    if(!this.id){this.id= uuidv4()}
}
}

export {Category}
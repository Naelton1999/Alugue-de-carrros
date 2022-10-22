import {v4 as uuidv4} from 'uuid';
import {Column, CreateDateColumn, Entity, PrimaryColumn} from "typeorm"

@Entity("specifications")
class Especification{
        @Column()
        name:string;
        @PrimaryColumn()
        id?:string;
        @Column()
        description:string;
        @CreateDateColumn()
        created_at: Date;

constructor(){
if(!this.id){this.id= uuidv4()} }

}

export{Especification}
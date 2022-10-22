import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, PrimaryColumn } from "typeorm";
import { User } from "./users";
import {v4 as uuidv4} from "uuid"

@Entity("users_tokens")
class Userstokens{
    @PrimaryColumn()
    id:string;
    @Column()
    reflesh_token:string;
    @Column()
    user_id:string;
    @ManyToMany(()=>User)
    @JoinColumn({name:"user_id"})
    user:User;
    @Column()
    expires_date:Date;
    @CreateDateColumn()
    created_at:Date;

    constructor(){
        if(!this.id){this.id= uuidv4()}
    }

}

export {Userstokens}
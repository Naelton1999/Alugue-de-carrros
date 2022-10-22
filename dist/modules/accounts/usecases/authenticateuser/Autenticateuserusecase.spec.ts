import { Userstokenrepositoryinmemory } from "@modules/accounts/repositories/in-memory/Userstokenrepositoryinmemory";
import { Dayjsdateprovider } from "@shared/container/providers/dateprovider/implementatios/dayjsdateprovider";
import { Apperror } from "../../../../shared/erros/Apperror";
import { ICreateUsersDTO } from "../../dtos/ICreateUsersDTO";
import { Usersrepositoryinmemory } from "../../repositories/in-memory/Usersrepositoryinmemory";
import { Createuserusecase } from "../createuser/Createuserusecase";
import { Authenticateuserusecase } from "./Authenticateuserusecase";

let authenticateuserusecase: Authenticateuserusecase;
let usersrepositoryinmemory: Usersrepositoryinmemory;
let userstokenrepositoryinmemory: Userstokenrepositoryinmemory;
let dateprovider: Dayjsdateprovider;
let createuserusecase: Createuserusecase

describe('Autenticate user', ()=>{
    beforeEach(()=>{
        usersrepositoryinmemory= new Usersrepositoryinmemory(),
        userstokenrepositoryinmemory= new Userstokenrepositoryinmemory()
        dateprovider= new Dayjsdateprovider()
        authenticateuserusecase= new Authenticateuserusecase(usersrepositoryinmemory, 
        userstokenrepositoryinmemory, dateprovider),
        createuserusecase= new Createuserusecase(usersrepositoryinmemory)
    });
    it("should be able to authenticate an user", async()=>{
        const user: ICreateUsersDTO={
            driver_license:"000123",
            email:"user@test.com",
            password:"1234",
            name:"User test"
        };
        await createuserusecase.execute(user);

        const result= await authenticateuserusecase.execute({
            email:user.email,
            password:user.password
        });
        expect(result).toHaveProperty("token")
    });
    it("should not be able to authenticate an noexistent user",async()=>{
        await expect(authenticateuserusecase.execute({
                email:"false@email.com",
                password:"1234"
            })
        ).rejects.toEqual(new Apperror("email ou senha incorreto"))
    });
    it("should not be able to authenticate with incorret password",async()=>{
        const user: ICreateUsersDTO={
            driver_license:"9999",
            email:"user@user.com",
            password:"1234",
            name:"user test error"
        }
        await createuserusecase.execute(user);
        await expect(authenticateuserusecase.execute({
                email:user.email,
                password:"incorrect password"
            })
        ).rejects.toEqual(new Apperror("email ou senha incorreto"))
    })
})
import { Mailproviderinmemory } from "@modules/accounts/repositories/in-memory/Mailproviderinmemory";
import { Usersrepositoryinmemory } from "@modules/accounts/repositories/in-memory/Usersrepositoryinmemory"
import { Userstokenrepositoryinmemory } from "@modules/accounts/repositories/in-memory/Userstokenrepositoryinmemory";
import { Dayjsdateprovider } from "@shared/container/providers/dateprovider/implementatios/dayjsdateprovider";
import { Apperror } from "@shared/erros/Apperror";
import { Sendforgotpasswordmailusecase } from "./sendforgotpasswordmailusecase";

let usersrepositoryinmemory: Usersrepositoryinmemory;
let userstokenrepositoryinmemory:Userstokenrepositoryinmemory;
let dateProvider: Dayjsdateprovider;
let mailProvider: Mailproviderinmemory;
let sendforgotpasswordmailusecase: Sendforgotpasswordmailusecase;

describe("send forgot mail", ()=>{
    beforeEach(()=>{
        usersrepositoryinmemory= new Usersrepositoryinmemory();
        userstokenrepositoryinmemory= new Userstokenrepositoryinmemory();
        dateProvider= new Dayjsdateprovider();
        mailProvider= new Mailproviderinmemory();
        sendforgotpasswordmailusecase= new Sendforgotpasswordmailusecase(usersrepositoryinmemory,
        userstokenrepositoryinmemory, dateProvider, mailProvider)
    })
    it("should be able to send a forgot password mail to user",async ()=>{
        const sendMail= jest.spyOn(mailProvider, "sendMail")

        await usersrepositoryinmemory.create({
            driver_license:"664168",
            email:"avzonbop@ospo.pr",
            name:"Blanche Curry",
            password:"1234"
        })
        await sendforgotpasswordmailusecase.execute("avzonbop@ospo.pr")
        expect(sendMail).toHaveBeenCalled() 
    })
    it("should not be able to send an email if user does not exists",async ()=>{
        await expect(
            sendforgotpasswordmailusecase.execute("ka@uj.gr")
            ).rejects.toEqual(new Apperror("user does not exist"))
    })
    it("shold be able to create an users token", async()=>{
        const generatetokenmail= jest.spyOn(userstokenrepositoryinmemory,"create")
        usersrepositoryinmemory.create({
            driver_license:"787330",
            email:"abome@regrog.ee",
            name:"Leon parks",
            password:"1234"
        })
        await sendforgotpasswordmailusecase.execute("abome@regrog.ee")
        expect(generatetokenmail).toBeCalled()
    })
}) 
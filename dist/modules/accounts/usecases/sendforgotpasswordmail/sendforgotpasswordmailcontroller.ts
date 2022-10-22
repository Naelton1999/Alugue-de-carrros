import {Request, Response} from "express";
import {container} from 'tsyringe';
import { Sendforgotpasswordmailusecase } from "./sendforgotpasswordmailusecase";

class Sendforgotpasswordmailcontroler{
    async handle(request: Request, response: Response):Promise<Response>{
        const {email}= request.body
        const sendforgotpasswordmailusecase= container.resolve(Sendforgotpasswordmailusecase);

        await sendforgotpasswordmailusecase.execute(email);

        return response.send()

    }

}
export{Sendforgotpasswordmailcontroler}
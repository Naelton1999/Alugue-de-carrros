import { injectable } from "tsyringe";
import { IMailprovider } from "../imailprovider";
import nodemailer,{ Transporter } from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";

@injectable()
class Ethereaimailprovider implements IMailprovider{
    private client: Transporter;
    constructor(){
        nodemailer.createTestAccount().then((account)=>{
            const transporte= nodemailer.createTransport({
                host:account.smtp.host,
                port:account.smtp.port,
                secure:account.smtp.secure,
                auth:{
                    user:account.user,
                    pass:account.pass
                }
            })
            this.client= transporte
        })
        .catch((err)=>console.error(err))
    }
    async sendMail(to: string, subject: string, variables:any, path:string): Promise<void> {
        const templatefilecontent= fs.readFileSync(path).toString("utf-8")
        const templateparce=handlebars.compile(templatefilecontent)
        const templatehtml= templateparce(variables)

        const message= await this.client.sendMail({
            to,
            from:"Rentx <noreplay@rentx.com.br>",
            subject,
            html:templatehtml
        })
        console.log("Message sent: %s", message.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message))
    }
}
export {Ethereaimailprovider}
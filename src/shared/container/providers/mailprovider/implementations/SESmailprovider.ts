import { injectable } from "tsyringe";
import { IMailprovider } from "../imailprovider";
import nodemailer,{ Transporter } from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
import  { SES } from "aws-sdk";

@injectable()
class SESmailprovider implements IMailprovider{
    private client: Transporter;
    constructor(){
        this.client= nodemailer.createTransport({
            SES: new SES({
                apiVersion:"2010-12-01",
                region: process.env.AWS_REGION
            }),
        })
    }
    async sendMail(to: string, subject: string, variables:any, path:string): Promise<void> {
        const templatefilecontent= fs.readFileSync(path).toString("utf-8")
        const templateparce=handlebars.compile(templatefilecontent)
        const templatehtml= templateparce(variables)

        await this.client.sendMail({
            to,
            from:"Rentx <noreplay@rentx.com.br>",
            subject,
            html:templatehtml
        })
    }
}
export {SESmailprovider}
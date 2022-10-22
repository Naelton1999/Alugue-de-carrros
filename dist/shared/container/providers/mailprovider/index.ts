import {container} from "tsyringe";
import { IMailprovider } from "../mailprovider/imailprovider";
import { Ethereaimailprovider } from "../mailprovider/implementations/ethereaimailprovider";
import {SESmailprovider} from "./implementations/SESmailprovider"

const mailprovider={
    ethereal: container.resolve(Ethereaimailprovider),
    SES: container.resolve(SESmailprovider)
}

container.registerInstance<IMailprovider>(
    "Mailprovider", mailprovider[process.env.mailprovider]
)
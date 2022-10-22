import { Resetpasswordcontroller } from "@modules/accounts/usecases/resetpassworduser/resetpasswordcontroller"
import { Sendforgotpasswordmailcontroler } from "@modules/accounts/usecases/sendforgotpasswordmail/sendforgotpasswordmailcontroller"
import {Router} from "express"

const passwordRoutes= Router()

const sendforgotpasswordmailcontroler= new Sendforgotpasswordmailcontroler()
const resetpasswordcontroller= new Resetpasswordcontroller()

passwordRoutes.post("/forgot", sendforgotpasswordmailcontroler.handle);
passwordRoutes.post("/reset", resetpasswordcontroller.handle);

export {passwordRoutes}
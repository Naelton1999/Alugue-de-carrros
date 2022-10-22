import {Router} from "express";
import multer from "multer";
import {UpdateuserAvatarcontrolle} from '@modules/accounts/usecases/updateuseravatar/updateuseravatarcontroller';
import uploadconfig from '@config/upload';
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { Createusercontroller } from "@modules/accounts/usecases/createuser/Createusercontroller";
import { Profileusercontroller } from "@modules/accounts/usecases/profileuserusecase/profileusercontroller";

const UsersRoutes = Router();

const uploadAvatar= multer(uploadconfig);

const createusercontroller = new Createusercontroller()
const updateuserAvatarcontrolle = new UpdateuserAvatarcontrolle()
const profileusercontroller= new Profileusercontroller()

UsersRoutes.post("/", createusercontroller.handle);

UsersRoutes.patch("/avatar",ensureAuthenticated, uploadAvatar.single("avatar"), updateuserAvatarcontrolle.handle)

UsersRoutes.get("/profile", ensureAuthenticated, profileusercontroller.handle)
export {UsersRoutes}
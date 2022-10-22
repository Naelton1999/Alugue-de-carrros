import { Router } from "express";
import {Createcarcontroler} from "@modules/cars/usecases/createcar/createcarcontroler";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { Listavailablecarcontroler } from "@modules/cars/usecases/listavailablecars/listavailablecarcontroler";
import { Createcarspecificationcontroller } from "@modules/cars/usecases/createcarspecification/createcarspecificationcontroller";
import { Uploadcarimagecontroller } from "@modules/cars/usecases/uploadcarimage/uploadcarimagecontroller";
import uploadconfig from '@config/upload'
import multer from "multer";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const carsRoutes = Router();

const createcarcontroler= new Createcarcontroler()
const listavailablecarcontroler= new Listavailablecarcontroler()
const createcarspecificationcontroller= new Createcarspecificationcontroller()
const uploadcarimagecontroller= new Uploadcarimagecontroller()

const upload= multer(uploadconfig);

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createcarcontroler.handle)

carsRoutes.get("/available", listavailablecarcontroler.handle)

carsRoutes.post("/specification/:id",ensureAuthenticated, ensureAdmin, createcarspecificationcontroller.handle)

carsRoutes.post("/images/:id", ensureAuthenticated, ensureAdmin, upload.array("images"), uploadcarimagecontroller.handle)

export {carsRoutes}
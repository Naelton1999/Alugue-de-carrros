import { Router } from "express";
import {Createrentalcontroller} from "@modules/rentals/usecases/createrental/createrentalcontroller"
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { Devolutionrentalcontroller } from "@modules/rentals/usecases/devolutionrental/devolutionrentalcontroller";
import { Listrentalbyusercontroller } from "@modules/rentals/usecases/listrentalbyuser/listrentalbyusercontroller";

const rentalRoutes= Router()

const createrentalcontroller= new Createrentalcontroller();
const devolutionrentalcontroller= new Devolutionrentalcontroller();
const listrentalbyusercontroller= new Listrentalbyusercontroller()

rentalRoutes.post("/", ensureAuthenticated, createrentalcontroller.handle)
rentalRoutes.post("/devolution/:id", ensureAuthenticated, devolutionrentalcontroller.handle)
rentalRoutes.get("/user",ensureAuthenticated, listrentalbyusercontroller.handle)

export{rentalRoutes}
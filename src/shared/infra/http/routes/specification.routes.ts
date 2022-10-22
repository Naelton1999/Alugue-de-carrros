import { Createspecificationcontrole } from '@modules/cars/usecases/createspecification/createspecificationcontrole';
import {Router} from 'express';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

const especificationRoutes= Router();

const createespecificationcontrole = new Createspecificationcontrole();


especificationRoutes.post("/", ensureAuthenticated, ensureAdmin, createespecificationcontrole.handle)
    

export {especificationRoutes}
import { Router } from "express";
import {categoriesRoutes} from './categories.routes';
import {especificationRoutes} from './specification.routes';
import {UsersRoutes} from './users.routes'
import {authenticateRouter} from './authenticate.routes';
import {carsRoutes} from './car.routes'
import { rentalRoutes } from "./rental.routes";
import { passwordRoutes } from "./password.routes";

const router= Router();

router.use("/categories",categoriesRoutes);
router.use("/specification", especificationRoutes)
router.use("/users", UsersRoutes);
router.use("/cars", carsRoutes);
router.use("/rentals", rentalRoutes);
router.use(authenticateRouter);
router.use("/password",passwordRoutes)
export {router}


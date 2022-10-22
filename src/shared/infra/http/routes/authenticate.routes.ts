import { Authenticatecontroller } from '@modules/accounts/usecases/authenticateuser/Authenticateusercontroller';
import { Refleshtokencontroller } from '@modules/accounts/usecases/refleshtoken.ts/refleshtokencontroller';
import {Router} from 'express';


const authenticateRouter= Router();

const authenticatecontroller = new Authenticatecontroller()
const refleshtokencontroller = new Refleshtokencontroller()

authenticateRouter.post("/sessions", authenticatecontroller.handle);
authenticateRouter.post("/reflesh-token", refleshtokencontroller.handle);

export {authenticateRouter}


import { Router } from 'express';
import multer from 'multer';
import { Createcategorycontrole } from '@modules/cars/usecases/createcategory/createcategorycontrole';
import { Importcategorycontrole } from '@modules/cars/usecases/importcategory/importcategorycontrole';
import { Listcategorycontrole } from '@modules/cars/usecases/listcategory/listcategoriescontrole';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';

const categoriesRoutes= Router();

const upload= multer({
    dest: './tmp'
});

const createCategoryControle = new Createcategorycontrole()
const importcategorycontrole = new Importcategorycontrole()
const listcategoriescontrole = new Listcategorycontrole()


categoriesRoutes.post("/", ensureAuthenticated, ensureAdmin, createCategoryControle.handle);
  

categoriesRoutes.get("/", listcategoriescontrole.handle);
    

categoriesRoutes.post("/import", upload.single('file'), ensureAuthenticated, ensureAdmin, importcategorycontrole.handle)
    
 
export {categoriesRoutes}
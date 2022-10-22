import { Apperror } from '../../../../shared/erros/Apperror';
import {Categoriesrepositoryinmemory} from '../../repositore/in-memory/categoriesrepositoryinmemory';
import {Createcategoryusecase} from './createcategoryusecase';
/*describe("criar category", ()=>{
    it("espero que 2+2 seja 4", () =>{
        const soma= 2+2;
        const resultado= 4

        expect(soma).toBe(resultado)
    })
    it("expero que 2+2 não seja 5",()=>{
        const soma=2+2;
        const resultado= 5

        expect(soma).not.toBe(resultado)
    })
}) */
let createcategoryusecase: Createcategoryusecase;
let categoriesrepositoryinmemory: Categoriesrepositoryinmemory

describe("create Category", ()=>{
    beforeEach(()=>{
        categoriesrepositoryinmemory= new Categoriesrepositoryinmemory();
        createcategoryusecase= new Createcategoryusecase(
            categoriesrepositoryinmemory
        );
    });

    it("should be able to create new a category", async ()=>{
        const category={
            name:"Category teste",
            description:"Category description test",
        }
        await createcategoryusecase.execute({
            name: category.name,
            description: category.description
        });
        const categorycreated= await categoriesrepositoryinmemory.findByName(category.name);

        expect(categorycreated).toHaveProperty("id")
    })

    it("should not be able to create new a category with name exist", async ()=>{
        
            const category={
                name:"Category teste",
                description:"Category description test",
            }
            await createcategoryusecase.execute({
                name: category.name,
                description: category.description
            });
            await expect(
            createcategoryusecase.execute({
                name: category.name,
                description: category.description
            })
        ).rejects.toEqual(new Apperror("ja existe"))
        
    })
})





  





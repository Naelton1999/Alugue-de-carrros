import { Carsrepositoryinmemory } from "@modules/cars/repositore/in-memory/carrepositoryinmemory"
import { Ispecificationinmemory } from "@modules/cars/repositore/in-memory/ispecificationinmemory"
import { Apperror } from "@shared/erros/Apperror"
import { Createcarspecificationusecase } from "./createcarspecificationusecase"


let createcarpecificationusecase: Createcarspecificationusecase
let carsrepositoryinmemory: Carsrepositoryinmemory
let ispecificationinmemory:Ispecificationinmemory

describe("create car specification", ()=> {
    beforeEach(()=>{
        carsrepositoryinmemory= new Carsrepositoryinmemory()
        ispecificationinmemory= new Ispecificationinmemory()
        createcarpecificationusecase= new Createcarspecificationusecase(carsrepositoryinmemory, ispecificationinmemory)
    })

    it("should not be able to add a new specification to a new-existent car", async ()=>{
        const car_id="1234";
        const specifications_id= ["54321"]
        expect(createcarpecificationusecase.execute({car_id, specifications_id})
         ).rejects.toEqual(new Apperror("car does not exist"))
    });

    it("should be able to add a new specification to the car",async ()=>{
        const car= await carsrepositoryinmemory.create({
            name:"Name Car",
            description:"Description Car",
            daily_rate:100,
            license_plate:"ABC-1234",
            fine_amount:60,
            brand:"Brand",
            category_id:"category"
        })
        const specification= await ispecificationinmemory.create({
            description:"test",
            name:"test"
        })

        const specifications_id= [specification.id]
        const specificationscars= await createcarpecificationusecase.execute({car_id:car.id, specifications_id})
        
        expect(specificationscars).toHaveProperty("especifications");
        expect(specificationscars.especifications.length).toBe(1)
    })
})
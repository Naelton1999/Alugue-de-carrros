import { Apperror } from "@shared/erros/Apperror";
import { Carsrepositoryinmemory } from "../../repositore/in-memory/carrepositoryinmemory";
import { Createcarusecase } from "./createcarusecase"

let createcarusecase:Createcarusecase
let carrepositoryinmemory:Carsrepositoryinmemory

describe("create car",()=>{
    beforeEach(()=>{
        carrepositoryinmemory= new Carsrepositoryinmemory()
        createcarusecase= new Createcarusecase(carrepositoryinmemory)
    });

    it("should be able to create a new car",async ()=>{
        const car= await createcarusecase.execute({
            name:"Name Car",
            description:"Description Car",
            daily_rate:100,
            license_plate:"ABC-1234",
            fine_amount:60,
            brand:"Brand",
            category_id:"category"
        });
    expect(car).toHaveProperty("id");
    });
    
    it("should not be to able to create a car with exist license plate",async()=>{
        await createcarusecase.execute({
            name:"Car",
            description:"Description Car",
            daily_rate:100,
            license_plate:"ABC-1234",
            fine_amount:60,
            brand:"Brand",
            category_id:"category"
    });
        
        await expect(createcarusecase.execute({
            name:"Car2",
            description:"Description Car2",
            daily_rate:100,
            license_plate:"ABC-1234",
            fine_amount:60,
            brand:"Brand",
            category_id:"category"
        })
        ).rejects.toEqual(new Apperror("car already exist"))
    })
    it("should not be to able to create a car with available true by default",async ()=>{
        const car= await createcarusecase.execute({
                name:"Car Available",
                description:"Description Car Available",
                daily_rate:100,
                license_plate:"ABCD-1234",
                fine_amount:60,
                brand:"Brand",
                category_id:"category"
        });
        console.log(car);
        expect(car.available).toBe(true)
    })
})
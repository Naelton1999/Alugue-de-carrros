import { Rentalsrepositoryinmemory } from "@modules/rentals/repositore/in-memory/rentalsrepositoryinmemory";
import { Apperror } from "@shared/erros/Apperror";
import { Createrentalusecase } from "./createrentalusecase";
import dayjs from "dayjs";
import { Dayjsdateprovider } from "@shared/container/providers/dateprovider/implementatios/dayjsdateprovider";
import { Carsrepositoryinmemory } from "@modules/cars/repositore/in-memory/carrepositoryinmemory";

let createrentalusecase: Createrentalusecase
let rentalsrepositoryinmemory: Rentalsrepositoryinmemory
let carsrepositoryinmemory:Carsrepositoryinmemory
let dayjsdateprovider:Dayjsdateprovider

describe("create rental", ()=>{
    const dayAdd24hours= dayjs().add(1,"day").toDate()
    beforeEach(()=>{
        carsrepositoryinmemory= new Carsrepositoryinmemory()
        rentalsrepositoryinmemory= new Rentalsrepositoryinmemory();
        dayjsdateprovider= new Dayjsdateprovider()
        createrentalusecase= new Createrentalusecase(rentalsrepositoryinmemory, dayjsdateprovider, carsrepositoryinmemory)
    });

    it("should be able to create a new rental", async ()=>{
        const car= await carsrepositoryinmemory.create({
            name:"Test",
            description:"Car test",
            daily_rate:100,
            license_plate:"Test",
            fine_amount:40,
            category_id:"1234",
            brand:"brand"
        })

        const rental= await createrentalusecase.execute({
            user_id:"12345",
            car_id:car.id,
            expected_return_date: dayAdd24hours
        });
        console.log(rental)

        expect(rental).toHaveProperty("id")
        expect(rental).toHaveProperty("start_date")
    });

    it("should not be able to create a new rental if there is another open to the same user", async ()=>{
        await rentalsrepositoryinmemory.create({
            car_id:"1111",
            expected_return_date: dayAdd24hours,
            user_id:"12345"
        })
        await expect(createrentalusecase.execute({
            user_id:"12345",
            car_id:"121212",
            expected_return_date: dayAdd24hours
        })
        ).rejects.toEqual(new Apperror("there's a rental in progress for user!"))
        });
        
    it("should not be able to create a new rental if there is another open to the same car", async ()=>{
        await rentalsrepositoryinmemory.create({
            car_id:"test",
            expected_return_date: dayAdd24hours,
            user_id:"12345"
        })
        await expect(createrentalusecase.execute({
            user_id:"321",
            car_id:"test",
            expected_return_date: dayAdd24hours    
        })
        ).rejects.toEqual(new Apperror("car is unavailable"))
        });
  

    it(" should not be able to create a new rental with invalid return time ",async ()=>{
            await expect(createrentalusecase.execute({
                user_id:"321",
                car_id:"test",
                expected_return_date: dayjs().toDate()
             })
            ).rejects.toEqual(new Apperror("invalid return time"))
        })
})
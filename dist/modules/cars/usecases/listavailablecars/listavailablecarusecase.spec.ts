import { Carsrepositoryinmemory } from "@modules/cars/repositore/in-memory/carrepositoryinmemory";
import { Listavailablecarusecase } from "./listavailablecarusecase";

let listavailablecarusecase:Listavailablecarusecase;
let carsRepositoryInmemory:Carsrepositoryinmemory

describe("list cars", ()=>{
    beforeEach(()=>{
        carsRepositoryInmemory= new Carsrepositoryinmemory()
        listavailablecarusecase= new Listavailablecarusecase(carsRepositoryInmemory);
    });
    it("should be able to list all available cars", async ()=>{
        const car= await carsRepositoryInmemory.create({
            "name":"Car1",
	        "description":"car description",
	        "daily_rate":140.00,
	        "license_plate":"DEF-1212",
	        "fine_amount":100,
	        "brand":"car_brand",
	        "category_id":"category_id"
        });

        const cars= await listavailablecarusecase.execute({});

        expect(cars).toEqual([car])
    });
    it("should be able to list all available cars by brand", async ()=>{
        const car= await carsRepositoryInmemory.create({
            "name":"Car2",
	        "description":"car description",
	        "daily_rate":140.00,
	        "license_plate":"DEF-1212",
	        "fine_amount":100,
	        "brand":"car_brand_test",
	        "category_id":"category_id"
        });
        const cars= await listavailablecarusecase.execute({
            brand:"car_brand_test"})
        expect(cars).toEqual([car])
    })
    it("should be able to list all available cars by name", async ()=>{
        const car= await carsRepositoryInmemory.create({
            "name":"Car3",
	        "description":"car description",
	        "daily_rate":140.00,
	        "license_plate":"DEF-1214",
	        "fine_amount":100,
	        "brand":"car_brand_test",
	        "category_id":"category_id"
        });

        const cars= await listavailablecarusecase.execute({
            brand:"car_brand"
        });
        console.log(cars)

        expect(cars).toEqual([car])
    });

    it("should be able to list all available cars by name", async ()=>{
        const car= await carsRepositoryInmemory.create({
            "name":"Car3",
	        "description":"car description",
	        "daily_rate":140.00,
	        "license_plate":"DEF-1214",
	        "fine_amount":100,
	        "brand":"car_brand_test",
	        "category_id":"12345"
        });

        const cars= await listavailablecarusecase.execute({
            category_id:"1234"
        });
        console.log(cars)

        expect(cars).toEqual([car])
    });
})
import { app } from "@shared/infra/http/app";
import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import  createConnection  from '@shared/infra/typeorm';
import {v4 as uuid} from "uuid";

let connection:Connection

describe("create category controller",  ()=>{
    beforeAll(async ()=>{
        connection=await createConnection();
        await connection.runMigrations()
        const id= uuid()
        const password= await hash("admin",8)

        await connection.query(
        `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
        values('${id}', 'admin', 'email@admin.com.br', '${password}', true, 'now()', 'xxxxxx')`
        )
    })
    afterAll(async()=>{
        await connection.dropDatabase();
        await connection.close()
    })
        
    it("should be able to list all categories", async ()=>{
        const responseToken= await request(app).post("/sessions").send({
            email:"email@admin.com.br",
            password:"admin"
        })
        
        const {reflesh_token} = responseToken.body
        
        await request(app).post("/categories")
        .send({
            name:"Category supertest",
            description:"Category Supertest"
        }).set({Authorization:`Bearer ${reflesh_token}`});

        const response= await request(app).get("/categories")

        console.log(response.body)

        expect(response.status).toBe(200)
        expect(response.body.length).toBe(1)
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0].name).toBe("Category Supertest");
    })
    
})


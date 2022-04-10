/**
 * 
 *  Test: Setup test
 *  @module "tests/unit test/setup"
 * 
 *  @description tests the entire stack setup
 *  * you can remove or modify this file *
 * 
 */

import { express } from "@services"
import { Sequelize } from "@bananasplit-js"

import request, { Response } from "supertest"
import http from "http"
import dotenv from "dotenv"

dotenv.config()

// Express server
let Express: http.Server

beforeAll(async () => {
	Express = express.serve(6627)
})

/**
 *  @test Express server is ok
 */
test("Express server is ok", async () => {
	const response: Response = await request(Express).get("/")

	expect(response.status).toBe(200)
	expect(response.text ).toBe("GET 200 /")
})

/**
 *  @test Database connection is ok
 */
test("Database connection is ok", async () => {
	const response: Response = await request(Express).get("/test/connection")

	expect(response.status).toBe(200)
	expect(response.text).toBe("Connection has been established successfully.")
})


/**
 *  @test Database queries are ok
 */
test("Database queries are ok", async () => {
	interface IResponse {
		result: String
	}

	const response: Response = await request(Express).get("/test/query")
	const JSONResponse: IResponse[] = JSON.parse(response.text)

	expect(response.status).toBe(200)
	expect(JSONResponse[0].result).toBe("Hello from database!")
})

/**
 *  @test Database migrations are ok
 */
test("Database migrations are ok", async () => {
	const tablesKey: string = `Tables_in_${process.env.DB_DATABASE}`

	const response: Response = await request(Express).get("/test/migration")
	const JSONResponse: any[] = JSON.parse(response.text)

	expect(response.status).toBe(200)

	// case insensitive fixs the problem on windows tables name
	expect(JSONResponse[0][tablesKey]).toMatch(/SequelizeMeta/i)
	expect(JSONResponse[1][tablesKey]).toMatch(/Tester/i)
})

/**
 *  @test Database seeders are ok
 */
test("Database seeders are ok", async () => {
	const response: Response = await request(Express).get("/test/seeder")
	const JSONResponse: object[] = await JSON.parse(response.text)

	expect(response.status).toBe(200)
	expect(JSONResponse.length).toBeGreaterThan(0)
})

afterAll(async () => {
	Express.close()

	// Closing connection allow to jest exit successfully
	await Sequelize.close()
})

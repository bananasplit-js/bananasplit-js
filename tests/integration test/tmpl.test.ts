/**
 * 
 *  Test: {Name}
 *  @module "tests/integration test/{name}"
 * 
 *  @description {description}
 * 
 */

import { express } from "@services"
import { Sequelize } from "@bananasplit-js"

import request, { Response } from "supertest"
import http from "http"

// Express server
let Express: http.Server

/**
 *  Do something before run the tests
 */
beforeAll(() => {
	Express = express.serve(6627)
})

/**
 *  @description Test a entire module
 */
test("Test a entire module", async () => {
	const response: Response = await request(Express).get("/")
	expect(response.status).toBe(200)
})

/**
 *  Do something after run the tests
 */
afterAll(async () => {
	Express.close()

	// Closing connection allow to jest exit successfully
	await Sequelize.close()
})

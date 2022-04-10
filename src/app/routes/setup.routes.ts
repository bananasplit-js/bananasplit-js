/**
 * 
 *  Router: Setup
 *  @module providers/core/app/routes/setup
 * 
 *  @description routes for setup test
 * 
 */

import { Router, Application } from "express"

// Controller
import SetupController from "@controllers/setup"

const $: Router = Router()

export default (_: Application): Router => {
	// Express server test
	$.route("/")
		.get(SetupController.expressTest)

	// Database connection test
	$.route("/test/connection")
		.get(SetupController.databaseConnectionTest)

	// Database query test
	$.route("/test/query")
		.get(SetupController.databaseQueryTest)

	// User table migration test
	$.route("/test/migration")
		.get(SetupController.testerTableMigrationTest)

	// User table seeder test
	$.route("/test/seeder")
		.get(SetupController.testerTableSeederTest)

	return $
}

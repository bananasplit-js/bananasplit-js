/**
 *
 *  Router: Setup
 *  @module providers/core/app/routes/__tester
 *
 *  @description routes for setup tester
 *
 */

import { Router } from 'express'

// Controller
import TesterController from '@controllers/__tester'

const $: Router = Router()

export default (): Router => {
	// Express server test
	$.route('/').get(TesterController.expressTest)

	// Database connection test
	$.route('/test/connection').get(TesterController.databaseConnectionTest)

	// Database query test
	$.route('/test/query').get(TesterController.databaseQueryTest)

	// User table migration test
	$.route('/test/migration').get(TesterController.tableMigrationTest)

	// User table seeder test
	$.route('/test/seeder').get(TesterController.tableSeederTest)

	return $
}

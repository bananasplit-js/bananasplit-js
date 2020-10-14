/**
 * 
 *  Router: Setup
 *  @module providers/core/app/routes/setup
 * 
 *  @description routes for setup test
 * 
 */
import { Router } from 'express'


const $: Router = Router()


/**
 *  @import @controller
 */
import Setup from '@providers/core/app/controllers/setup.controller'



/**
 *  @routes
 */

// Express test
$.route( '/' )
    .get( Setup.expressTest )
;

// Database connection test
$.route( '/test-connection' )
    .get( Setup.databaseConnectionTest )
;

// Database query test
$.route( '/test-query' )
    .get( Setup.databaseQueryTest )
;

// User table migration test
$.route( '/test-migration' )
    .get( Setup.userTableMigrationTest )
;

// User table seeder test
$.route( '/test-seeder' )
    .get( Setup.userTableSeederTest )
;



export default $

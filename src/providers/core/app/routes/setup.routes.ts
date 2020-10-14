/**
 * 
 *  Router: Setup
 *  @module providers/core/app/routes/setup
 * 
 *  @description routes for setup test
 * 
 */
import Express, { Router } from 'express'


const $: Express.Router = Router()


/**
 * 
 *  @import @controller
 * 
 */
import Setup from '@providers/core/app/controllers/setup.controller'


export default ( app: Express.Application ) => {
    
    /**
     * 
     *  @routes
     * 
     */
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


    return $

}

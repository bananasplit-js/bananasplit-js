/**
 * 
 *  Router: Setup
 *  @module providers/core/app/routes/setup
 * 
 *  @description routes for setup test
 * 
 */
import { Router } from 'express'


const router: Router = Router()


/**
 *  @import @controller
 */
import Setup from '@bananasplit-js/app/controllers/setup.controller'


; ( $ => {

    /**
     *  @routes
     */

    // Hello
    $.route( '/' )
        .get( Setup.hello )
    ;

    // Database connection test
    $.route( '/test-auth' )
        .get( Setup.databaseConnectionTest )
    ;

    // Database query test
    $.route( '/test-query' )
        .get( Setup.databaseQueryTest )
    ;

    // Sequelize ORM test, get users
    $.route( '/test-model' )
        .get( Setup.getUsers )
    ;

})( router )


export default router

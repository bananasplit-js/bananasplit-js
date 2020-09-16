/**
 * 
 *  Router: Setup
 *  @module app/routes/setup
 * 
 *  @description * you can remove or modify this file *
 * 
 */
import { Router } from 'express'


const router: Router = Router()


/**
 * 
 *  @import @controller
 *  Your controller import goes here
 * 
 */
import Setup from '../controllers/setup.controller'


; ( $ => {

    /**
     * 
     *  @routes
     *  Your routes goes here
     * 
     */

    // Hello
    $.route( '/' )
        .get( Setup.hello )
    ;

    // Database connection test
    $.route( '/auth-test' )
        .get( Setup.databaseConnectionTest )
    ;

    // Database query test
    $.route( '/query-test' )
        .get( Setup.databaseQueryTest )
    ;

    // Sequelize ORM test, get users
    $.route( '/model-test' )
        .get( Setup.getUsers )
    ;

})( router )


export default router

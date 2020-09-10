/**
 * 
 *  Router example
 *  @routes
 * 
 *  @module app/routes/example.routes
 *  @description * you can remove or modify this file *
 * 
 */



import { Router } from 'express'



// Creates a new Router
const router: Router = Router()


/**
 * 
 *  @import @controller
 *  Your controller import goes here
 * 
 */
import Controller from '../controllers/example'


($ => {

    /**
     * 
     *  @routes
     *  Your routes goes here
     * 
     */

    // Hello
    $.route( '/' )
        .get( Controller.hello )
    

    // Database connection test
    $.route( '/auth-test' )
        .get( Controller.databaseConnectionTest )
    

    // Database query test
    $.route( '/query-test' )
        .get( Controller.databaseQueryTest )


    // Sequelize ORM test, get users
    $.route( '/model-test' )
        .get( Controller.getUsers )
    

})( router )


export default router

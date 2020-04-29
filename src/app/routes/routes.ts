/**
 * 
 *  Router example
 *  @routes
 * 
 *  @module app/routes/routes
 *  @description * you can remove it or modify it *
 * 
 *  @use this file as your Routers template **
 * 
 */



import { Router } from 'express'



// Creates new Router
const router: Router = Router()


/**
 * 
 *  @import @controller
 *  Your controller import goes here.
 * 
 */
import Controller from '../controllers/controller'


( $ => {

    /**
     * 
     *  @routes
     *  Your routes goes here.
     * 
     */

    // Hello
    $.route( '/' )
        .get( Controller.hello )
    

    // Database connection test
    $.route( '/db-auth-test' )
        .get( Controller.databaseConnectionTest )
    

    // Database query test
    $.route( '/db-query-test' )
        .get( Controller.databaseQueryTest )


    // Sequelize ORM test, get users
    $.route( '/model-query-test' )
        .get( Controller.getUsers )
    

})( router )


export default router

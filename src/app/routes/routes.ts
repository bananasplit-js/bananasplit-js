/**
 * 
 *  Router example
 *  @routes
 * 
 *  @module app/routes/routes
 *  @description * you can remove it or modify it *
 * 
 *  @use this file as your Routers template! ***
 * 
 */


import { Router } from 'express'

// Creates new Router:
const router: Router = Router()


/**
 * 
 *  Your controller import goes here!!
 *  @import @controller
 * 
 */
import Controller from '../controllers/controller'


( ($) => {

    /**
     * 
     *  Your routes goes here!!
     *  @routes
     * 
     */
    

    // hello:
    $.route( '/' )
        .get( Controller.hello )
    

    // database connection test:
    $.route( '/db-auth-test' )
        .get( Controller.databaseConnectionTest )
    

    // database query test:
    $.route( '/db-query-test' )
        .get( Controller.databaseQueryTest )


    // sequelize ORM test, get users:
    $.route( '/orm-query-test' )
        .get( Controller.getUsers )
    

} )( router )


export default router

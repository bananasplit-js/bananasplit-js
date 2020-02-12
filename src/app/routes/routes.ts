/**
 * 
 *  Router example
 *  @routes
 * 
 *  @module routes/routes
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


( $ => {

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
    $.route( '/database-auth' )
        .get( Controller.databaseConnectionTest )
    

    // database query test:
    $.route( '/database-query' )
        .get( Controller.databaseQueryTest )
    

} )( router )


export default router

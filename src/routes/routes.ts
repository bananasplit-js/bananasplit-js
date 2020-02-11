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
    ;


} )( router )


export default router

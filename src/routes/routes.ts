/**
 * 
 *  Router example
 *  @routes

 *  @module routes/routes
 *  @description * you can remove it or modify it *
 * 
 *  @use this file as your Routers template! ***
 * 
 */

import { Router } from 'express'


// Controller:
import Controller from '../controllers/controller'


// Creates default Router:
const router: Router = Router()


;( ($): void => {

    /**
     * 
     *  Your routes goes here!!
     *  @routes
     * 
     */

    // hello:
    $.route('/')
        .get( Controller.hello )
    ;

} )( router )


export default router

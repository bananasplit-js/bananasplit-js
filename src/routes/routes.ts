/**
 * 
 *  Router
 *  @routes

 *  @module routes/routes
 *  @description * you can remove it or modify it *
 * 
 */

import { Router } from 'express'


// Controller:
import Controller from '../controllers/controller'


// Creates default Router:
const $: Router = Router()


; ( (): void => {

    /**
     * 
     *  Your routes goes here!
     *  @routes @set
     * 
     */

    // hello:
    $.route('/')
        .get( Controller.hello )
    ;

} )()


export default $

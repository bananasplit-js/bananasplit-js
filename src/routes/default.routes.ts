/**
 * 
 *  Default Router
 *  @routes

 *  @module routes/default.routes
 *  @description * you can remove it or modify it *
 * 
 */

import { Router } from 'express'


// Controller:
import Controller from '../controllers/default.controller'


// Creates default Router:
const $: Router = Router()


; ( (): void => {

    /**
     * 
     *  Your default routes goes here!
     *  @routes @set
     * 
     */

    // hello:
    $.route('/')
        .get( Controller.hello )
    ;

} )()


export default $

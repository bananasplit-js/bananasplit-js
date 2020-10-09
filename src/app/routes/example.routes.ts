/**
 * 
 *  Router: { Name }
 *  @module app/routes/{name}
 * 
 *  @description { description }
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



; ( $ => {

    /**
     * 
     *  @routes
     *  Your routes goes here
     * 
     */
    $.route( '/url' )
        .get( /* @handler from controller */ )
        .post( /* same */ )
    ;


})( router )



export default router

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
    $.route( '/{path}' )
        .get( /* @handler */ )
    ;

})( router )


export default router

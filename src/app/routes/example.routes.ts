/**
 * 
 *  Router: {Name}
 *  @module app/routes/{name}
 * 
 *  @description {description}
 * 
 */
import Express, { Router } from 'express'


const $: Express.Router = Router()


/**
 * 
 *  @import @controller
 *  Your controller import goes here
 * 
 */



export default ( app: Express.Application ): Router => {
    
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


    return $

}

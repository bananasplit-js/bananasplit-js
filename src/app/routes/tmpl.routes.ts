/**
 * 
 *  Router: {Name}
 *  @module app/routes/{name}
 * 
 *  @description {description}
 * 
 */
import Express, { Router } from 'express'

/**
 *  @controller
 */



const $: Express.Router = Router()


export default ( app: Express.Application ): Router => {
    
    /**
     *  @routes
     */
    $.route( '/url' ).get( /* @handler from controller */ )

    return $

}


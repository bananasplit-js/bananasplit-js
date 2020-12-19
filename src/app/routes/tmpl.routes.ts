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


// Router
const $: Express.Router = Router()


export default

    ( app: Express.Application ): Router => {
        
        /**
         *  @routes
         */
        $.route( '/url' )
          .get( /* controller @handler */ )

        return $

    }

;


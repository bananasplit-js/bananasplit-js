/**
 * 
 *  Router: {PluralName}
 *  @module app/routes/{plural_name}
 * 
 *  @description routes for {plural_name}
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
          .get( /* controller handler */ )

        return $

    }

;


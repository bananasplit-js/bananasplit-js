/**
 * 
 *  Router: {PluralName}
 *  @module app/routes/{plural_name}
 * 
 *  @description routes for {plural_name}
 * 
 */
import { Application, Router } from 'express'

/**
 *  @middlewares import
 */


/**
 *  @controllers import
 */


// Basic Router
const $: Router = Router()


export default
	( app: Application ): Router => {

		/**
		 *  @routes
		 */
		$.route( '/route' )
			.get( /* controller handler */ )


			return $

	}
;

/**
 * 
 *  Router: {PluralName}
 *  @module app/routes/{plural_name}
 * 
 *  @description routes for {plural_name}
 * 
 */

import { Application, Router } from "express"


const $: Router = Router()


export default

	(app: Application): Router => {

		$.route("/")
			.get(/* controller */)


		return $
	}

;

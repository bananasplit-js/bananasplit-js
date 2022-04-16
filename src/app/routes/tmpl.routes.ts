/**
 *
 *  Router: {PluralName}
 *
 *  @module app/routes/{plural_name}
 *
 *  @description routes for {plural_name}
 *
 */

import { Router } from 'express'

const $: Router = Router()

export default (): Router => {
	$.route('/').get(/* controller */)

	return $
}

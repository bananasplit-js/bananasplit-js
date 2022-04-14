/**
 *
 *  Router: Default
 *  @module app/routes/default
 *
 *  @description default routes
 *
 */

import { Router } from 'express'

// Default Controller
import DefaultController from '@core/app/controllers/default'

const $: Router = Router()

export default (): Router => {
	$.route('/').get(DefaultController.index)

	return $
}

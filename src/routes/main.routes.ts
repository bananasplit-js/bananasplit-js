/**
 * 
 *  Main Router
 *  @module routes/main.routes
 * 
 */


import { Router } from 'express'

import MainController from '../controllers/main.controller'


/**
 * 
 *  Router object
 * 
 */
const router: Router = Router()


// Routes and Controllers:
router.route('/')
    .get( MainController.mainResponse )
;


// Export:
export default router

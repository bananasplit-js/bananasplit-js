/**
 * 
 *  Main Router
 *  @module routes/main.routes
 * 
 */


import { Router } from 'express'

import MainController from '../controllers/main.controller'


// Main Router:
const router: Router = Router()


/**
 *
 *  Your routes goes here!!
 *
 */

router.route('/')
    .get( MainController.mainResponse )
;


// Export:
export default router

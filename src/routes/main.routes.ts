/**
 * 
 *  Main Router
 *  @module routes/main.routes
 * 
 */


import { Router } from 'express'

import MainController from '../controllers/main.controller'


const router = Router()

router.route('/')
    .get( MainController.mainResponse )


export default router

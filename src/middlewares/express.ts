/**
 *
 *  Express Middleware
 *
 *  @module middlewares/express
 *
 *  @description main middleware
 *
 */

import Express, { Application, Router } from 'express'
import { IRouters } from '@bananasplit-js/interfaces'

import Morgan from 'morgan'
import dontenv from 'dotenv'

dontenv.config()

export default (app: Application, routers: IRouters): void => {
	// Http Request Logger
	process.env.NODE_ENV === 'production' && app.use(Morgan('combined'))
	process.env.NODE_ENV === 'development' && app.use(Morgan('dev'))

	// Incoming JSON Request Parser
	app.use(Express.json())

	// Public
	app.use(Express.static(app.get('public')))

	// Use all routers by default
	Object.values(routers).forEach((router: Router) => app.use(router))
}

/**
 *
 *  Provider: Express
 *
 *  @module providers/core/libs/express
 *
 *  @description the express nodejs provider
 *
 */
import http from 'http'
import Express from 'express'

import customSettings from '@settings/express'
import defaultRouterReturner from '@core/app/routes/default.routes'

import { loadResources, getRouters, getMiddleware } from '@core/helpers/resources'

// Interfaces
import { IModule, IRouters } from '@core/interfaces'

/**
 *
 *  Definition for config options
 *
 *  @interface { IC }
 *
 */
interface IC {
	port?: number
}

/**
 *
 *  Router Type
 *
 *  @typedef { Router }
 *
 */
type IRouterReturner = (app?: Express.Application) => Express.Router

export default /**
 *
 *  @class ExpressProvider
 *
 *  @description provides an express server
 *
 */
class ExpressProvider {
	/**
	 *
	 *  @property { string } name
	 *
	 */
	public readonly name: string = 'Express'

	/**
	 *
	 *  @property { Express.Application } service
	 *
	 */
	private service!: Express.Application

	/**
	 *
	 *  @property { number } port
	 *
	 */
	public port = 3627

	/**
	 *
	 *  Singleton instance
	 *
	 *  @property { ExpressProvider } instance
	 *
	 */
	private static instance: ExpressProvider

	/**
	 *
	 *  @constructor
	 *
	 *  Not accesible
	 *  Singleton pattern
	 *
	 */
	private constructor() {
		/* Singleton */
	}

	/**
	 *
	 *  Singleton
	 *
	 *  @method provide
	 *  @description provides or returns a singleton instance for ExpressProvider
	 *
	 *  @param { IC } config - config object
	 *  @returns { ExpressProvider }
	 *
	 */
	public static provide(config?: IC): ExpressProvider {
		if (!this.instance) {
			this.instance = new ExpressProvider()
			this.instance.service = Express()
			this.instance.settings(config)

			const routers: IRouters = this.instance.routers()
			this.instance.middlewares(routers)
		}

		return this.instance
	}

	/**
	 *
	 *  Returns the ExpressProvider singleton instance
	 *
	 *  @method getInstance
	 *
	 *  @returns { ExpressProvider }
	 *
	 */
	public static getInstance = (): ExpressProvider => ExpressProvider.instance

	/**
	 *
	 *  Gets the express server application
	 *
	 *  @method getApplication
	 *
	 *  @returns { Express.Application }
	 *
	 */
	public getApplication = (): Express.Application => ExpressProvider.getInstance().service

	/**
	 *
	 *  Settings for ExpressProvider
	 *
	 *  @method settings
	 *
	 *  @param { IC } config object
	 *  @returns { void }
	 *
	 */
	private settings(config?: IC): void {
		this.port = config?.port || <number>(process.env.PORT || this.port)
		this.service.set('port', this.port)

		/** Custom settings overwrite */
		customSettings(this.service)
	}

	/**
	 *
	 *  Sets the main middleware
	 *
	 *  @method middlewares
	 *
	 *  @returns { void }
	 *
	 */
	private middlewares(routers: IRouters): void {
		const expressMiddleware: IModule[] = getMiddleware()

		if (expressMiddleware.length) {
			loadResources({
				service: this.service,
				modulePaths: expressMiddleware,
				moduleParams: [routers]
			})
		}
	}

	/**
	 *
	 *  Collects all routers
	 *
	 *  @method routers
	 *
	 *  @returns { IRouters }
	 *
	 */
	private routers(): IRouters {
		const modulePaths: IModule[] = getRouters()

		if (modulePaths.length) {
			const routers: IRouters = {}

			modulePaths.forEach((module: IModule) => {
				const { default: Module } = require(module.path)
				const key: string = module.filename.replace(/\.routes\.(ts|js)$/, '')

				routers[key] = (Module as IRouterReturner)(this.service)
			})

			return routers
		}

		const defaultRouter: Express.Router = (defaultRouterReturner as IRouterReturner)(this.service)
		this.service.use(defaultRouter)

		return {}
	}

	/**
	 *
	 *  Serve express in the specified port
	 *
	 *  @method serve
	 *
	 *  @returns { http.Server }
	 *
	 */
	public serve(port?: number): http.Server {
		return this.service.listen(port || this.port)
	}
}

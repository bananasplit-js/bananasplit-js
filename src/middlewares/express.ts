/**
 * 
 *  Express Middleware
 *  @module middlewares/express
 * 
 *  @description main middleware
 * 
 */
import Express, { Application, Router } from "express"
import { IRouters } from "@bananasplit-js/interfaces"

import Morgan from "morgan"
import dontenv from "dotenv"


dontenv.config()


export default

	( app: Application, routers: IRouters ): void => {
		/**
		 *  @middlewares 
		 */
		if ( process.env.NODE_ENV === "development" ) {
			app.use( Morgan("dev") )
		}

		app.use( Express.json() )

		// Public
		app.use(
			Express.static( app.get("public") )
		)

		// Use all routers by default
		Object.values(routers).forEach(
			(router: Router) => app.use(router)
		)

		const getAboutStore = (_: any, res: any) => res.send("about store")
		const dumbMiddleware = (_: any, res: any) => res.send("dumb middleware")

		app.get("/store/about", [dumbMiddleware], getAboutStore)

		const getShareProductMetada = (_: any, res: any) => res.send("share product")
		app.get("/product/:id/share", getShareProductMetada)

		const passMiddleware = (_: any, __: any, next: any) => next()
		const passMiddleware2 = (_: any, __: any, next: any) => next()
		app.use("/products", passMiddleware)
		app.use("/products", passMiddleware2)
	}

;

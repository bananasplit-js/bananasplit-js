/**
 * 
 *  Middleware: {Name}
 *  @module middlewares/{name}
 * 
 *  @description {description}
 * 
 */

import { Request, Response, NextFunction } from "express"

/**
 *
 *	Middleware: Auth
 *	@description checks for user auth before get the route
 *
 */
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	next()
}

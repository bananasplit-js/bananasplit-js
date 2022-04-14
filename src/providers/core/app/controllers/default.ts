/**
 *
 *  Controller: Default
 *  @module controllers/default
 *
 *  @description default controller
 *
 */

import { Request, Response } from 'express'

export default class DefaultController {
	/**
	 *  @description default route
	 */
	public static index(_: Request, res: Response) {
		return res.send('GET / 200')
	}
}

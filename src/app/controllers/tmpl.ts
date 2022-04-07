/**
 * 
 *  Controller: {PluralName}
 *  @module controllers/{plural_name}
 * 
 *  @description controller for {plural_name}
 * 
 */

import { Request, Response } from "express"

export default class PluralNameController {
	/**
	 *  @description gets a specified resource
	 */
	public static index (req: Request, res: Response) {
		return res.json()
	}

	/**
	 *  @description creates a new resource
	 */
	public static create (req: Request, res: Response) {
		return res.json()
	}

	/**
	 *  @description updates an existent resource
	 */
	public static update (req: Request, res: Response) {
		return res.json()
	}

	/**
	 *  @description deletes an existent resource
	 */
	public static delete (req: Request, res: Response) {
		return res.json()
	}
}

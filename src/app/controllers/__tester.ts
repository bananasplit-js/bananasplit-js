/**
 * 
 *  Controller: Tester
 *  @module providers/core/app/controllers/__tester
 * 
 *  @description controller for setup tester
 * 
 */

import { Request, Response } from "express"
import { Sequelize } from "@core"

/**
 *  model
 */
import Tester from "@models/__tester"

export default class TesterController {
	/**
	 *   @description Express test
	 */
	public static expressTest (_: Request, res: Response) {
		return res.status(200).send("GET 200 /")
	}

	/**
	 *  @description Database connection test
	 */
	public static async databaseConnectionTest (_: Request, res: Response) {
		try {
			await Sequelize.authenticate()
			res.status(200).send("Connection has been established successfully.")

		} catch (e) {
			res.status(500).send(`Unable to connect to the database: ${e}`)
		}

		return res
	}

	/**
	 *  @description Database query test
	 */
	public static async databaseQueryTest (_: Request, res: Response) {
		try {
			const [result] = await Sequelize.query("SELECT 'Hello from database!' as result")
			res.status(200).send(result)

		} catch (e) {
			res.status(500).send(`Unable to connect to the database: ${e}`)
		}

		return res
	}

	/**
	 *  @description Tester table migration test
	 */
	public static async tableMigrationTest (_: Request, res: Response) {
		try {
			const [result] = await Sequelize.query("SHOW TABLES")
			res.status(200).send(result)

		} catch (e) {
			res.status(500).send(`Unable to connect to the database: ${e}`)
		}

		return res
	}

	/**
	 *  @description Tester table seeder test
	 */
	public static async tableSeederTest (_: Request, res: Response) {
		try {
			const result = await Tester.findAll()
			res.status(200).send(result)

		} catch (e) {
			console.log(e)
			res.status(500).send(e)
		}

		return res
	}
}

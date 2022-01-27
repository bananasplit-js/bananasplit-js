/**
 * 
 *  Controller: Setup
 *  @module providers/core/app/controllers/setup
 * 
 *  @description controller for setup test
 * 
 */
import { Request, Response } from "express"
import { Sequelize } from "@core"


/**
 *  @model
 */
import User from "@models/user"


export default

	class Controller {
		/**
		 *   @description Express test
		 */
		public static expressTest ( req: Request, res: Response ): Response {
			return res.status(200).send("GET 200 / Hello")
		}


		/**
		 *  @description Database connection test
		 */
		public static async databaseConnectionTest ( req: Request, res: Response ): Promise<Response> {
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
		public static async databaseQueryTest ( req: Request, res: Response ): Promise<Response> {
			try {
				const [result] = await Sequelize.query( "SELECT 'Hello from database!' as result" )
					res.status(200).send(result)

			} catch (e) {
				res.status(500).send(`Unable to connect to the database: ${e}`)
			}


			return res
		}


		/**
		 *  @description User table migration test
		 */
		public static async userTableMigrationTest ( req: Request, res: Response ): Promise<Response> {
			try {
				const [result] = await Sequelize.query("SHOW TABLES")
					res.status(200).send(result)

			} catch (e) {
				res.status(500).send(`Unable to connect to the database: ${e}`)
			}


			return res
		}


		/**
		 *  @description User table seeder test
		 */
		public static async userTableSeederTest ( req: Request, res: Response ): Promise<Response> {
			try {
				const result = await User.findAll()
					res.status(200).send(result)

			} catch (e) {
				res.status(500).send(e)
			}


			return res
		}
	}

;

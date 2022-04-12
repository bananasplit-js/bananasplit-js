/**
 *
 *  Model: Tester
 *  @module app/models/__tester
 * 
 *  @description setup tester model
 * 
 */

import { Model } from "@bananasplit-js"
import { DataTypes, ModelAttributes, ModelOptions } from "sequelize"

class Tester extends Model {
	/**
	 *  columns
	 */
	declare id: number
	declare key: string
	declare value: string

	/**
	 *  attributes
	 */
	public static attributes: ModelAttributes = {
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true
		},

		key: {
			type: DataTypes.STRING,
			allowNull: false
		},

		value: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}

	/**
	 *  options
	 */
	public static $options: ModelOptions = {
		tableName: "Tester",
		timestamps: false
	}
}

// Init the model
Tester.init()

export default Tester

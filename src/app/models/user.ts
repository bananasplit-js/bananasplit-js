/**
 *
 *  Model: User
 *  @module app/models/user
 * 
 *  @description basic user model
 * 
 */
import { Model } from "@bananasplit-js"
import { DataTypes, ModelAttributes } from "sequelize"


class User extends Model {

	/**
	 *  @columns
	 */
	public id!: number
	public name!: string
	public lastname!: string
	public email!: string
	public password!: string


	/**
	 *  @attributes
	 */
	public static attributes: ModelAttributes = {
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,

			primaryKey: true
		},

		name: {
			type: DataTypes.STRING,
			allowNull: false
		},

		lastname: {
			type: DataTypes.STRING,
			allowNull: false
		},

		email: {
			type: DataTypes.STRING,
			allowNull: false
		},

		password: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}


	/**
	 *  @options
	 */
	public static $options: object = {
		timestamps: true
	}

}


// Init the model
User.init()


export default User

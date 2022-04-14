/**
 *
 *  Sequelize Client: options
 *  @config
 *
 *  @description manage default and custom sequelize client options
 *
 */
const dotenv = require('dotenv')
const CustomOptions = require('@config/sequelize/sequelize-cli.conf')

dotenv.config()

module.exports = {
	/**
	 *  development
	 */
	development: {
		dialect: eval(`"${process.env.DB_DIALECT}"`),

		host: process.env.DB_HOST,
		port: process.env.DB_PORT,

		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,

		dialectOptions: {
			bigNumberStrings: true
		},

		...CustomOptions.development
	},

	/**
	 *  test
	 */
	test: {
		dialect: eval(`"${process.env.DB_DIALECT}"`),

		host: process.env.DB_HOST,
		port: process.env.DB_PORT,

		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,

		dialectOptions: {
			bigNumberStrings: true
		},

		...CustomOptions.test
	},

	/**
	 *  production
	 */
	production: {
		dialect: eval(`"${process.env.DB_DIALECT}"`),

		host: process.env.DB_HOST,
		port: process.env.DB_PORT,

		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,

		dialectOptions: {
			bigNumberStrings: true,
			ssl: {}
		},

		...CustomOptions.production
	}
}

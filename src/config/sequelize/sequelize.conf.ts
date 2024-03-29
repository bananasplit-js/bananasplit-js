/**
 *
 *  Sequelize: database configuration
 *
 *  @description sequelize options
 *
 */

import { Options as SequelizeOptions } from 'sequelize'

const options: SequelizeOptions = {
	/**
	 *
	 *  Options
	 *  This object is passed directly to the sequelize constructor
	 *
	 */
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	},

	sync: {}
}

export default options

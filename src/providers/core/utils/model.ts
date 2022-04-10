/**
 * 
 *  Utils: Model
 *  @module providers/core/utils/model
 *  
 *  @description provides an easy to handle sequelize model
 * 
 */

import {
	Model as SequelizeModel,
	ModelOptions,
	InitOptions,
	ModelAttributes
} from 'sequelize'

import sequelize from '@core/libs/sequelize'

/**
 * 
 *  @class Model
 *  @extends SequelizeModel
 *
 *  @description provides a more simply layer to use models
 * 
 */
export default class Model extends SequelizeModel {
	/**
	 *  default options
	 */
	public static options: InitOptions = {
		sequelize,
		timestamps: true
	}

	/**
	 *  custom options
	 */
	public static $options: ModelOptions = {}

	/**
	 *  model definition
	 */
	public static attributes: ModelAttributes = {}

	/**
	 *  init the model
	 */
	public static init (this: any): any {
		super.init
		return super.init.call(
			this,
			this.model,
			{ ...this.options, ...this.$options as ModelOptions }
		)
	}
}

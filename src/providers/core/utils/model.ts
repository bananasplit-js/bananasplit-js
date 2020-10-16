/**
 * 
 *  Provider: Model
 *  @module providers/core/utils/model
 *  
 *  @description provides an easy to handle sequelize model
 * 
 */
import { Model as SequelizeModel, InitOptions, ModelAttributes } from 'sequelize'
import sequelize from '@core/libs/sequelize'


export default
    /**
     * 
     *  @class Model @extends SequelizeModel
     *  @description provides a more simply layer to use models
     * 
     */
    class Model extends SequelizeModel {

        /**
         *  @default options
         */
        public static options: InitOptions = {
            sequelize,
            timestamps: true
        }

        /**
         *  @custom options
         */
        public static $options: object = {}

        /**
         *  @model definition
         */
        public static model: ModelAttributes = {}


        /**
         *  @init the model
         */
        public static init (): SequelizeModel {
            return super.init.call( this, this.model, {
                ...this.options,
                ...this.$options
            })
        }

    }
;

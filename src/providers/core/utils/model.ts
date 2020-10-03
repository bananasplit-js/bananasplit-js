/**
 * 
 *  Provider: Model
 *  @module providers/core/utils/model @extends SequelizeModel
 *  
 *  @description provides an easy to handle sequelize model
 * 
 */
import { Model as SequelizeModel } from 'sequelize'
import Sequelize from '../libs/sequelize'


export default

    class Model extends SequelizeModel {

        /**
         *  @defaults @options
         */
        public static options = {
            sequelize: Sequelize,
            timestamps: true
        }

        /**
         *  @custom @options
         */
        public static $options = { }

        /**
         *  @model
         */
        public static model = { }


        /**
         *  @init
         */
        public static init () {
            super.init.call( this, this.model, {...this.options, ...this.$options} )
        }

    }

;

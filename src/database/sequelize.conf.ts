/**
 * 
 *  Database Configuration file for Sequelize
 *  @config
 * 
 *  @description This file let you overwrite default Sequelize options object.
 * 
 */


import { Options as SequelizeOptions } from 'sequelize'
import dotenv from 'dotenv'


dotenv.config()



const SequelizeOptions: SequelizeOptions = {

    /**
     * 
     *  @options @overwrite
     *  Sequelize Options
     * 
     *  You can overwrite default options by yours **
     *  This option object is directly passed to Sequelize constructor in the Provider.
     * 
     */

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }

}


export default SequelizeOptions

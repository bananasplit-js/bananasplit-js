/**
 * 
 *  Sequelize: Database configuration file
 *  @configig @overwrite
 * 
 *  @description Allow to you to overwrite default sequelize options
 * 
 */


import { Options as SequelizeOptions } from 'sequelize'



const SequelizeOptions: SequelizeOptions = {

    /**
     * 
     *  @options @overwrite
     *  Sequelize options
     * 
     *  This option object is directly passed to sequelize constructor (provider)
     * 
     */

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

}


export default SequelizeOptions

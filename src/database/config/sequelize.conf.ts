/**
 * 
 *  Sequelize: Database configuration
 *  @description allow to you to overwrite default sequelize options
 * 
 */
import { Options } from 'sequelize'


const Options: Options = {

    /**
     * 
     *  @options
     *  This object is passed directly to the sequelize constructor in providers
     * 
     */

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

}


export default Options

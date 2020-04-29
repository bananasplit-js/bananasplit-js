/**
 *
 *  Sequelize Provider
 * 
 *  @module providers/sequelize
 *  @description Provides an ORM for interact with Database
 * 
 */


import { Sequelize } from 'sequelize'
import { DBAuth, SequelizeOptions } from '../database/database.conf'


/**
 * 
 *  @class SequelizeProvider
 *  @classdesc Provides an ORM for interact with Database
 * 
 */
class SequelizeProvider {
    
    /**
     * 
     *  @private @property { Sequelize } sequelize
     * 
     */
    private sequelize: Sequelize


    /**
     * 
     * @constructor
     * 
     * @param { object | string } DBAuth 
     * @param { object } SequelizeOptions
     * 
     */
    constructor( DBAuth: object | string, SequelizeOptions: object ) {

        if ( typeof DBAuth === 'object' )
            this.sequelize = new Sequelize( ... Object.values( DBAuth ), SequelizeOptions )
        
        else
            this.sequelize = new Sequelize( DBAuth, SequelizeOptions )

    }


    /**
     * 
     *  Returns sequelize instance
     *  
     *  @method
     *  @returns { Sequelize }
     * 
     */
    public get = (): Sequelize => this.sequelize

}



// Sequelize instance for usage
const sequelizeProvider: SequelizeProvider = new SequelizeProvider( DBAuth, SequelizeOptions )
const sequelize: Sequelize = sequelizeProvider.get()



// You can add more sequelize instances to export ** 
export { sequelize }

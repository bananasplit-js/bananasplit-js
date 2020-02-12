/**
 * 
 *  Database Config file
 *  @config
 * 
 */


import Sequelize from 'sequelize'
import DBAuth from '../providers/interfaces/database.auth'


/**
 * 
 *  Authentication:
 *  @auth
 * 
 */
const DBAuth: DBAuth | string =  {
 
    database: 'test',
    username: 'root',
    password: 'Bastard'

}


/**
 * 
 *  Sequelize Options:
 *  @options
 * 
 */
const SequelizeOptions: Sequelize.Options = {

    host: 'localhost',
    dialect: 'mysql',   // Engines: 'mysql' | 'mariadb' | 'postgres' | 'mssql'

}


export { DBAuth, SequelizeOptions }

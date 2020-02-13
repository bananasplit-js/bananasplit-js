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
 *  DB Authentication:
 *  @auth
 * 
 */
const DBAuth: DBAuth | string =  {
 
    database: <string> process.env.DATABASE,
    username: <string> process.env.USERNAME,
    password: <string> process.env.PASSWORD

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

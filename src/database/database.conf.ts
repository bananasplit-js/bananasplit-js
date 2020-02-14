/**
 * 
 *  Database Config file
 *  @config
 * 
 */


import Sequelize from 'sequelize'
import DBAuth from '../providers/interfaces/database.auth'
import dotenv from 'dotenv'

dotenv.config()


/**
 * 
 *  Sequelize Options:
 *  @options
 * 
 */
const SequelizeOptions: Sequelize.Options = {

    host: <string> process.env.HOST,    // MUST be modified at the .env file !! ***
    dialect: 'mysql',   // Engines: 'mysql' | 'mariadb' | 'postgres' | 'mssql'
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }

}


/**
 * 
 *  DB Authentication:
 *  @auth
 * 
 */
const DBAuth: DBAuth | string =  {

    // Database credentials MUST be modified at the .env file !! ***
    
    database: <string> process.env.DATABASE,
    username: <string> process.env.USERNAME,
    password: <string> process.env.PASSWORD

}


export { DBAuth, SequelizeOptions }

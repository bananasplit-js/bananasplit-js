/**
 * 
 *  Database Config file
 *  @config
 * 
 *  @description Contains all App database configurations
 * 
 */


import Sequelize from 'sequelize'
import DBAuth from '../providers/interfaces/database.auth'
import dotenv from 'dotenv'


dotenv.config()


/**
 * 
 *  Sequelize App Options:
 *  @options
 * 
 */
const SequelizeOptions: Sequelize.Options = {

    dialect: '',    // 'mysql' | 'mariadb' | 'postgres' | 'mssql'

    // host MUST be modified at the .env file !! ***
    host: <string> process.env.HOST,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }

}


/**
 * 
 *  DB App Authentication:
 *  @auth
 * 
 */
const DBAuth: DBAuth | string =  {

    // all database credentials MUST be modified at the .env file !! ***
    
    database: <string> process.env.DB_DATABASE,
    username: <string> process.env.DB_USERNAME,
    password: <string> process.env.DB_PASSWORD

}


export { DBAuth, SequelizeOptions }

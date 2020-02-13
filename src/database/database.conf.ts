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
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }

}


export { DBAuth, SequelizeOptions }

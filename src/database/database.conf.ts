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
 *  @options
 *  Sequelize App Options
 * 
 */
const SequelizeOptions: Sequelize.Options = {

    dialect: 'mysql',       // 'mysql' | 'mariadb' | 'postgres' | 'mssql'

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
 *  @auth
 *  DB App Authentication
 * 
 */
const DBAuth: DBAuth | string =  {
    
    database: <string> process.env.DB_DATABASE,
    username: <string> process.env.DB_USERNAME,
    password: <string> process.env.DB_PASSWORD

}


export { DBAuth, SequelizeOptions }

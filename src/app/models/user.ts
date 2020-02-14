/**
 *
 *  User Model
 *  @model
 * 
 *  @module app/models/user
 *  @description Defines a user model example
 * 
 */


 import { Model, DataTypes } from 'sequelize'
 import { sequelize } from '../../providers/sequelize'


 class User extends Model {

    // Fields:
    private id!: number
    private name!: string
    private lastname!: string
    private email!: string
    private password!: string

    private readonly createdAt!: Date
    private readonly updatedAt!: Date


    // Fields Definitions (defines Model):
    private static fields = {

        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },

        name: {
            type: new DataTypes.STRING(30),
            allowNull: false
        },

        lastname: {
            type: new DataTypes.STRING(30),
            allowNull: false
        },

        email: {
            type: new DataTypes.STRING(50),
            allowNull: false
        },

        password: {
            type: new DataTypes.STRING(50),
            allowNull: false
        }
        
    }

    // Options:
    private static _options = {
        sequelize,  // sequelize connection
        timestamps: true
    }


    // Loads field definitions into the ORM:
    public static init() {

        super.init.call( this, this.fields, this._options )
        this._sync()

        return this

    }


    // Synchronizes database with Model:
    public static _sync() {

        User.sync({
            force: true     // force to drop the table if exists *
        })


        // Then do something, like create a new user or seed the database:

    }

 }


 export default User.init()

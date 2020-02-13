/**
 *
 *  Model
 *  @model
 * 
 *  @module app/models/model
 *  @description Defines a model example
 * 
 */


 import { Model, DataTypes } from 'sequelize'
 import { sequelize } from '../../providers/sequelize'


 class User extends Model {

    public id!: number
    public name!: string
    public lastname!: string
    public email!: string
    private password!: string

    public readonly createdAt!: Date
    public readonly updatedAt!: Date

    
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


    public static init() {

        super.init.call( this, this.fields, {
            sequelize,
            tableName: 'users'
        } )

        return this

    }

 }


 export default User.init()

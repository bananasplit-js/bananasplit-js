/**
 *
 *  User Model
 *  @model
 * 
 *  @module app/models/example.model
 *  @description Defines an user model example
 * 
 */



 import { Model, DataTypes } from 'sequelize'
 import sequelize from '../../providers/sequelize'

 

 class User extends Model {

    // Fields
    private id!: number
    private name!: string
    private lastname!: string
    private email!: string
    private password!: string

    private readonly createdAt!: Date
    private readonly updatedAt!: Date


    // Fields Definitions
    public static fields = {

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

    // Options
    public static options = {
        sequelize,
        timestamps: true
    }


    // Init
    public static init() {
        super.init.call( this, this.fields, this.options )
    }

 }
 

 
 // Load the model
 User.init()


 
 ; ( async () => {
 
     // do something async before export the model
 
 } )()

 
 
 export default User

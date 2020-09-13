/**
 *
 *  User model
 *  @model
 *  @module app/models/user
 * 
 *  @description user basic model
 * 
 */
// import Sequelize from '../../providers/modules/sequelize'
import { Sequelize } from '../../providers'
import { Model, DataTypes } from 'sequelize'

console.log( "llega objeto", typeof Sequelize )
class User extends Model {

    // Fields
    private id!: number
    private name!: string
    private lastname!: string
    private email!: string
    private password!: string

    private readonly createdAt!: Date
    private readonly updatedAt!: Date


    // Fields definitions
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
        sequelize: Sequelize,
        timestamps: true
    }


    // Init
    public static init() {
        super.init.call( this, this.fields, this.options )
    }

}


 // Loads the model
// User.init()


; ( async () => {

     // do something async before export the model

})()


export default User

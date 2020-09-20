/**
 *
 *  Model: User
 *  @module app/models/user
 * 
 *  @description user basic model
 * 
 */
import { Sequelize as sequelize } from '@bananasplit-js'
import { Model, DataTypes } from 'sequelize'


class User extends Model {

    /**
     *  @def
     */
    private id!: number
    private name!: string
    private lastname!: string
    private email!: string
    private password!: string


    /**
     *  @model
     */
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


    /**
     *  @options
     */
    public static options = {
        sequelize,
        timestamps: true
    }


    // Init
    public static init () {
        super.init.call( this, this.fields, this.options )
    }

}


; ( async () => {

    User.init()

    // do something async before export the model like synchronize

})()


export default User

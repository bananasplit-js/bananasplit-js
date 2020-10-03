/**
 *
 *  Model: User
 *  @module app/models/user
 * 
 *  @description basic user model
 * 
 */
import { Model } from '@bananasplit-js'
import { DataTypes } from 'sequelize'


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
    public static model = {

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
    public static $options = {
        timestamps: true
    }

}


; ( async () => {

    User.init()

    // do something async before export the model like synchronize

})()


export default User

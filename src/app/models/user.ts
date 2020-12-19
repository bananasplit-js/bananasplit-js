/**
 *
 *  Model: User
 *  @module app/models/user
 * 
 *  @description basic user model
 * 
 */
import { Model } from '@bananasplit-js'
import { DataTypes, ModelAttributes } from 'sequelize'


class User extends Model {

    /**
     *  @fields
     */
    public id!: number
    public name!: string
    public lastname!: string
    public email!: string
    public password!: string


    /**
     *  @model
     */
    public static model: ModelAttributes = {

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
    public static $options: object = {
        timestamps: true
    }

}


; ( async (): Promise<void> => {

    User.init()

    // do something async before export the model like synchronize

})()


export default User

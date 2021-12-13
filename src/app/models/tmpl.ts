/**
 *
 *  Model: {SingularName}
 *  @module app/models/{singular_name}
 * 
 *  @description model for {singular_name}
 * 
 */
import { Model } from '@bananasplit-js'
import { DataTypes, ModelAttributes } from 'sequelize'


class SingularName extends Model {

    /**
     *  @fields
     */
    public id!: number


    /**
     *  @model
     */
    public static attributes: ModelAttributes = {

        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            
            primaryKey: true
        },
        
    }


    /**
     *  @options
     */
    public static $options: object = {
        timestamps: true
    }

}


// Init the model
SingularName.init()

export default SingularName

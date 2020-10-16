/**
 *
 *  Model: {Name}
 *  @module app/models/{name}
 * 
 *  @description {description}
 * 
 */
import { Model } from '@bananasplit-js'
import { DataTypes, ModelAttributes } from 'sequelize'


class Name extends Model {

    /**
     *  @def
     */
    private id!: number


    /**
     *  @model
     */
    public static model: ModelAttributes = {

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


; ( async (): Promise<void> => {

    Name.init()

    // do something async before export the model, like synchronize

})()


export default Name

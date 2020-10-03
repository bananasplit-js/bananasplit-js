/**
 *
 *  Model: { Name }
 *  @module app/models/{name}
 * 
 *  @description { description }
 * 
 */
import { Model } from '@bananasplit-js'
import { DataTypes } from 'sequelize'


class Name extends Model {

    /**
     *  @def
     */
    private id!: number


    /**
     *  @model
     */
    public static model = {

        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            
            primaryKey: true
        },
        
    }


    /**
     *  @options
     */
    public static $options = {
        timestamps: true
    }

}


; ( async () => {

    Name.init()

    // do something async before export the model like synchronize

})()


export default Name

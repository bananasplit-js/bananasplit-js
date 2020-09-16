/**
 *
 *  Model: { Name }
 *  @module app/models/{name}
 * 
 *  @description { description }
 * 
 */
import { Sequelize as sequelize } from '../../providers'
import { Model, DataTypes } from 'sequelize'


class Name extends Model {

    /**
     *  @def
     */
    private id!: number


    /**
     *  @model
     */
    public static fields = {

        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        
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

    Name.init()

    // do something async before export the model like synchronize

})()


export default Name

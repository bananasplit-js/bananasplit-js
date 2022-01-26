/**
 * 
 *  Sequelize Client: custom options
 *  @config
 * 
 *  @description custom options for sequelize client
 * 
 */


export default {

    /**
     *  @development
     */
    development: {
        dialectOptions: {
            bigNumberStrings: true
        },
    },


    /**
     *  @test
     */
    test: {
        dialectOptions: {
            bigNumberStrings: true
        },
    },


    /**
     *  @production
     */
    production: {
        dialectOptions: {
            bigNumberStrings: true,
            ssl: {}
        },
    }

}

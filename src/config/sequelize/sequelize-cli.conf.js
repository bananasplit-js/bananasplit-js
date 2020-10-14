/**
 * 
 *  Sequelize client: configuration
 *  @description options for the sequelize client
 * 
 */


const Options = {

    /**
     * 
     *  DEVELOPMENT
     *  @options
     * 
     */
    development: {
        
        dialectOptions: {
            bigNumberStrings: true
        },

    },


    /**
     * 
     *  TESTING
     *  @options
     * 
     */
    test: {

        dialectOptions: {
            bigNumberStrings: true
        },

    },


    /**
     * 
     *  PRODUCTION
     *  @options
     * 
     */
    production: {

        dialectOptions: {
            bigNumberStrings: true,
            ssl: {}
        },

    }

}


export default Options

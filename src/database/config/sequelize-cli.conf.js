/**
 * 
 *  Sequelize: Client configuration
 *  @description overwrites the default sequelize client configuration
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


module.exports = Options

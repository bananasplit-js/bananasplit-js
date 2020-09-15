/**
 * 
 *  Sequelize: Client configuration (sequelize-cli)
 *  @config
 * 
 *  @description overwrites the default sequelize client configuration
 * 
 */


const Options = {

    /**
     * 
     *  DEVELOPMENT
     * 
     *  @options
     *  Configuration for development
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
     * 
     *  @options
     *  Configuration for testing
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
     * 
     *  @options
     *  Configuration for production
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

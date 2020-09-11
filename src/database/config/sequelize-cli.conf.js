/**
 * 
 *  Sequelize-cli configuration file
 *  @config @overwrite
 * 
 *  @description Allow to you overwrite the default configuration
 * 
 */



const SequelizeCLIOptions = {

    /**
     * 
     *  DEVELOPMENT
     * 
     *  @options @overwrite
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
     *  @options @overwrite
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
     *  @options @overwrite
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


module.exports = SequelizeCLIOptions

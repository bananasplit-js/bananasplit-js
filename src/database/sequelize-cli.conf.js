/**
 * 
 *  Sequelize-CLI configuration file
 *  @config @overwrite
 * 
 *  @description This file let you overwrite default Sequelize-CLI config for
 *  development, testing and production.
 * 
 */



const SequelizeCLIOptions = {

    /**
     * 
     *  Development
     * 
     *  @options @overwrite
     *  Sequelize-CLI config for Development
     * 
     *  You can overwrite default config by yours **
     * 
     */
    development: {
        
        dialectOptions: {
            bigNumberStrings: true
        },

    },



    /**
     * 
     *  Testing
     * 
     *  @options @overwrite
     *  Sequelize-CLI config for Testing
     * 
     *  You can overwrite default config by yours **
     * 
     */
    test: {

        dialectOptions: {
            bigNumberStrings: true
        },

    },



    /**
     * 
     *  Production
     * 
     *  @options @overwrite
     *  Sequelize-CLI config for Production
     * 
     *  You can overwrite default config by yours **
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

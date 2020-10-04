/**
 * 
 *  Users seeder
 *  @description seeds the user table with fake data
 * 
 */
'use strict';


/**
 * 
 *  @generator @import
 * 
 */
const createUser = require( '../generators/create-user' )


module.exports = {

    up: ( queryInterface, Sequelize ) => {

        let amount = 10
        let users = []

        while ( amount-- )
            users.push( createUser() )
        ;


        return queryInterface.bulkInsert( 'Users', users, {} )

    },

    down: ( queryInterface, Sequelize ) => {
        return queryInterface.bulkDelete( 'Users', null, {} )
    }

}

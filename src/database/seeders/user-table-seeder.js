/**
 * 
 *  Users seeder
 *  @description seeds the user table with fake data
 * 
 */
'use strict';


const createUser = require( '../factories/create-user' )


module.exports = {

    up: ( queryInterface, Sequelize ) => {

        let amount = 10
        let data = []

        while ( amount-- )
            data.push( createUser() )
        ;


        return queryInterface.bulkInsert( 'Users', data, {} )

    },

    down: ( queryInterface, Sequelize ) => {
        return queryInterface.bulkDelete( 'Users', null, {} )
    }

}

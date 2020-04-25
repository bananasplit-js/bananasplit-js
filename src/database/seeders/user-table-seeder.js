/**
 * 
 *  Users Seeder
 *  (generated with Sequelize-CLI)
 * 
 *  @seeder @db
 * 
 *  @description a seeder example for User
 * 
 */


 
'use strict';


const faker = require( 'faker' )

// You can set your locate with: faker.setLocale( 'en' )


module.exports = {

    up: ( queryInterface, Sequelize ) => {

        let data = []
        
        const date = new Date()
        let amount = 10

        while ( amount-- )

            data.push({

                name: faker.name.firstName(),
                lastname: faker.name.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                createdAt: date,
                updatedAt: date

            })
        ;


        return queryInterface.bulkInsert( 'Users', data, {} )

    },

    down: ( queryInterface, Sequelize ) => {
          return queryInterface.bulkDelete( 'Users', null, {} )
    }

}

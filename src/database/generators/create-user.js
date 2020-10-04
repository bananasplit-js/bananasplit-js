/**
 * 
 *  User generator
 *  @description creates an user based on fake data
 * 
 */
'use strict';


const faker = require( 'faker' )


/**
 * 
 *  You can set your locate with:
 *  faker.setLocale('en')
 * 
 */


const date = new Date


module.exports = ( user={} ) => ({

    name: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    createdAt: date,
    updatedAt: date,

    ...user

})

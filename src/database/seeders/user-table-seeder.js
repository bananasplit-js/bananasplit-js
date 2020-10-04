/**
 * 
 *  Users seeder
 *  @description seeds the user table with fake data
 * 
 */


/**
 * 
 *  @generator @import
 * 
 */
import createUser from '@generators/create-user'


export function up ( queryInterface, Sequelize ) {

    let amount = 10
    let users = []

    while ( amount-- )
        users.push( createUser() )
    ;

    return queryInterface.bulkInsert( 'Users', users, {} )

}


export function down ( queryInterface, Sequelize ) {
    return queryInterface.bulkDelete( 'Users', null, {} )
}

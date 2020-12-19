/**
 * 
 *  Seeder: Users
 *  @description seeds the user table with fake data
 * 
 */


/**
 *  @generator
 */
import createUser from '@generators/create-user'


export function up ( queryInterface ) {

    let amount = 10
    let users = []

    while ( amount-- )
        users.push( createUser() )
    ;

    return queryInterface.bulkInsert( 'Users', users, {} )

}


export function down ( queryInterface ) {
    return queryInterface.bulkDelete( 'Users', null, {} )
}

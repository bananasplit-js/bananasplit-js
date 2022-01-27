/**
 * 
 *  Seeder: Users
 *  @description seeds the user table with fake data
 * 
 */


/**
 *  @generator import
 */
import createUser from '@generators/create-user'


export function up ( queryInterface ) {
	const users = createUser.amount(10)
	return queryInterface.bulkInsert('Users', users, {})
}


export function down ( queryInterface ) {
	return queryInterface.bulkDelete('Users', null, {})
}

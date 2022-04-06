/**
 * 
 *  Seeder: Users
 *  @description seeds the user table with fake data
 * 
 */

const createUser = require("@generators/create-user")

const up = ( queryInterface ) => {
	const users = createUser.amount(10)
	return queryInterface.bulkInsert("Users", users, {})
}

const down = ( queryInterface ) => {
	return queryInterface.bulkDelete("Users", null, {})
}

module.exports = { up, down }

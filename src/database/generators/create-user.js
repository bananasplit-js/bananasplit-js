/**
 *	
 *  Generator: User
 *  @description creates an user object based on fake data
 * 
 */

const Generator = require("@bananasplit-js/utils/generator")
const faker = require("faker")

/**
 * 
 *  You can set your locale:
 *  faker.setLocale("en")
 * 
 */

// Timestamps date
const date = new Date()

// Generator
const createUser = (user={}) => ({
	// Fields
	name: faker.name.firstName(),
	lastname: faker.name.lastName(),
	email: faker.internet.email(),
	password: faker.internet.password(),

	// Timestamps
	createdAt: date,
	updatedAt: date,

	// Extend
	...user
})

module.exports = Generator(createUser)

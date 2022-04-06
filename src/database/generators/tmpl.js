/**
 * 
 *  Generator: {SingularName}
 *  @description creates an {singular_name} object based on fake data
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
const createSingularName = (singular_name={}) => ({
	// Fields
	field: faker.lorem.word(),

	// Timestamps
	createdAt: date,
	updatedAt: date,

	// Extend
	...singular_name
})

module.exports = Generator(createSingularName)

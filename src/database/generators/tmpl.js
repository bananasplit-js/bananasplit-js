/**
 * 
 *  Generator: {SingularName}
 *  @description creates an {singular_name} object based on fake data
 * 
 */

import { Generator } from "@bananasplit-js"
import faker from "faker"


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

	...singular_name

})


export default Generator(createSingularName)

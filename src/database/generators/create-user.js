/**
 * 
 *  Generator: User
 *  @description creates an user object based on fake data
 * 
 */
import faker from 'faker'


/**
 * 
 *  You can set your locale:
 *  faker.setLocale('en')
 * 
 */


// Timestamps date
const date = new Date()


export default

    ( user={} ) => ({

        // Fields
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),

        // Timestamps
        createdAt: date,
        updatedAt: date,

        ...user

    })

;

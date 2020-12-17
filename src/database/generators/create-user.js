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


const date = new Date()


export default ( user={} ) => ({

    name: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    createdAt: date,
    updatedAt: date,

    ...user

})

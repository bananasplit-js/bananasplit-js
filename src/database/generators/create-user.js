/**
 * 
 *  Generator: User
 *  @description creates an user object based on fake data
 * 
 */
import { name, internet } from 'faker'


/**
 * 
 *  You can set your locale:
 *  faker.setLocale('en')
 * 
 */


const date = new Date()


export default ( user={} ) => ({

    name: name.firstName(),
    lastname: name.lastName(),
    email: internet.email(),
    password: internet.password(),
    createdAt: date,
    updatedAt: date,

    ...user

})

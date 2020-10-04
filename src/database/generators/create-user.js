/**
 * 
 *  Generator: User
 *  @description creates an user based on fake data
 * 
 */
import { name, internet } from 'faker'


/**
 * 
 *  You can set your locate with:
 *  faker.setLocale('en')
 * 
 */


const date = new Date


export default ( user={} ) => ({

    name: name.firstName(),
    lastname: name.lastName(),
    email: internet.email(),
    password: internet.password(),
    createdAt: date,
    updatedAt: date,

    ...user

})

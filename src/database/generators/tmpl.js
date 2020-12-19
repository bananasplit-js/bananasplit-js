/**
 * 
 *  Generator: {Name}
 *  @description creates an {name} object based on fake data
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

    ( name={} ) => ({
        
        // Fields
        name: faker.name.firstName(),
        
        // Timestamps
        createdAt: date,
        updatedAt: date,

        ...name

    })

;

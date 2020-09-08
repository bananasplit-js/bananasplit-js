/**
 * 
 *  Unit test file example
 *  @test
 * 
 *  @module "tests/unit test/unit.test"
 *  @description * you can remove or modify it *
 * 
 *  use this file as your test template **
 * 
 */


import { express } from '../../app'
import sequelize from '../../providers/sequelize'

import request, { Response } from 'supertest'


// Express App as parallel instance
const app: any = express.app()



beforeAll( async () => {

    // Do something before run the tests

})



/**
 *  @test   Here the action I describe
 */
test( 'Here the action I describe', async () => {

    const response: Response = await request( app ).get( '/route' )

    expect( 1 + 1 ).toBe( 2 )   // or not?

})



afterAll( done => {

    // Closing the database connection allows jest to exit successfully
    // sequelize.close()
    done()
    
})

/**
 * 
 *  Unit test file example
 *  @test
 * 
 *  @module "tests/unit test/unit.test"
 *  @description * you can remove it or modify it *
 * 
 *  @use this file as your test template **
 * 
 */


import Express from 'express'
import request, { Response } from 'supertest'

import { express } from '../../app'
import sequelize from '../../providers/sequelize'



// Express App as parallel instance
const app: Express.Application = express.app()



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

    // Closing the db connection allows to Jest exit successfully
    // sequelize.close()
    done()
    
})

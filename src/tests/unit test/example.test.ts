/**
 * 
 *  Test: Unit test example
 *  @module "tests/unit test/example"
 * 
 *  @description * you can remove or modify this file *
 * 
 */
import { express } from '../../services'
import { Sequelize } from '../../providers'

import request, { Response } from 'supertest'


// Express server
let Express: any


/**
 *  Do something before run the tests
 */
beforeAll( () => {

    Express = express.serve( 6627 )

})


/**
 *  @test Here the action I describe
 */
test( 'Here the action I describe', async () => {

    const response: Response = await request( Express ).get( '/' )
    expect( response.status ).toBe( 200 )

})


/**
 *  Do something after run the tests
 */
afterAll( async done => {

    Express.close()

    // Closing connection allow to jest exit successfully
    await Sequelize.close()
    
    done()
    
})

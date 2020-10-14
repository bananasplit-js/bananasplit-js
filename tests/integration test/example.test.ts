/**
 * 
 *  Test: Integration test example
 *  @module "tests/integration test/example"
 * 
 *  @description * you can remove or modify this file *
 * 
 */
const { express } = require( '@services' )
const { Sequelize } = require( '@bananasplit-js' )

import request, { Response } from 'supertest'


// Express server
let Express: any


/**
 *  Do something before run the tests
 */
beforeAll( () => {

    Express = express.serve( 6627 )

})
// 

/**
 *  @test Test a entire module
 */
test( 'Test a entire module', async () => {

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

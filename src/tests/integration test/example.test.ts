/**
 * 
 *  App Integration test file example
 *  @test
 * 
 *  @module "tests/integration test/app.test"
 *  @description * you can remove or modify it *
 * 
 *  @use this file as your Tests template **
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
 *  @test   Test a entire module
 */
test( 'Test a entire module', (): void => {

    expect( 1 + 1 ).toBe( 2 )   // or not?

})



afterAll( done => {

    // Do something after run the tests
    done()
    
})

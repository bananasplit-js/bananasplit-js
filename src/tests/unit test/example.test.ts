/**
 * 
 *  Test: Unit test example
 *  @module "tests/unit test/example"
 * 
 *  @description * you can remove or modify this file *
 * 
 */
import { express } from '../../services'
import request, { Response } from 'supertest'


// Express service as parallel instance
const express_server: any = express.app()


beforeAll( async () => {

    // Do something before run the tests

})


/**
 *  @test Here the action I describe
 */
test( 'Here the action I describe', async () => {

    const response: Response = await request( express_server ).get( '/route' )

    expect( 1 + 1 ).toBe( 2 )   // or is not?

})


afterAll( done => {

    // Do something after run the tests
    done()
    
})

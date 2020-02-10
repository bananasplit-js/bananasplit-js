/**
 * 
 *  Hello example Test
 *  @test @module tests/unit test/hello.test
 * 
 */


import Express from 'express'
import request from 'supertest'

import App from '../../apps/app'


// Express App as parallel instance:
const app: Express.Application = App.build().get()


/**
 * 
 *  Hello test
 *  @test
 * 
 */
test( 'Hello response is received', async () => {

    const response: any = await request( app ).get( '/' )

    expect( response.status ).toBe( 200 )
    expect( response.text ).toMatch( 'Hello from Express!' )

} )

/**
 * 
 *  Hello example Test
 *  @test @module tests/unit test/hello.test
 * 
 */


import { Application as ExpressApp } from 'express'
import request from 'supertest'

import App from '../../apps/app'


// Express App as parallel instance:
const app: ExpressApp = App.build({}).get()


/**
 * 
 *  Hello test
 *  @test
 * 
 */
test( 'Hello response is received', async () => {

    const response: any = await request( app ).get( '/' )
    expect( response.statusCode ).toBe( 200 )

} )

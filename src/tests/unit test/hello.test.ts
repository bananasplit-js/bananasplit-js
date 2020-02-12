/**
 * 
 *  Hello Unit test file example
 *  @test
 * 
 *  @module "tests/unit test/hello.test"
 *  @description * you can remove it or modify it *
 * 
 *  @use this file as your Tests template! ***
 * 
 */


import Express from 'express'
import request, { Response } from 'supertest'

import App from '../../providers/express'


// Express App as parallel instance:
const app: Express.Application = App.build().get()



/**
 *  @test   Hello response is received
 */
test( 'Hello response is received', async () => {

    const response: Response = await request( app ).get( '/' )

    expect( response.status ).toBe( 200 )
    expect( response.text ).toMatch( 'Hello from Express!' )

} )


/**
 *  @test   Hello from database is received
 */
test( 'Hello from database is received', async () => {

    const response: Response = await request( app ).get( '/database-query' )
    const JSONResponse: { result: string }[] =  JSON.parse( response.text )

    expect( response.status ).toBe( 200 )
    expect( JSONResponse[0].result ).toMatch( 'Hello from database!' )

} )

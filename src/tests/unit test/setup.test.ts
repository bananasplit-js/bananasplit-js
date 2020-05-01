/**
 * 
 *  Setup Unit test file example
 *  @test
 * 
 *  @module "tests/unit test/setup.test"
 *  @description * you can remove it or modify it *
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
 *  @test   Hello response is received
 */
test( 'Hello response is received', async () => {

    const response: Response = await request( app ).get( '/' )

    expect( response.status ).toBe( 200 )
    expect( response.text ).toMatch( 'Hello from Express!' )

})


/**
 *  @test   Database Authetication is correct
 */
test( 'Database Authetication is correct', async () => {

    const response: Response = await request( app ).get( '/auth-test' )

    expect( response.status ).toBe( 200 )
    expect( response.text ).toMatch( 'Connection has been established successfully.' )

})


/**
 *  @test   Hello from database is received
 */
test( 'Hello from database is received', async () => {

    const response: Response = await request( app ).get( '/query-test' )
    const JSONResponse: { result: string }[] = JSON.parse( response.text )

    expect( response.status ).toBe( 200 )
    expect( JSONResponse[0].result ).toMatch( 'Hello from database!' )


})


/**
 *  @test   User model returns all users
 */
test( 'User model returns all users', async () => {

    const response: Response = await request( app ).get( '/model-test' )
    const JSONResponse: {}[] = await JSON.parse( response.text )

    expect( response.status ).toBe( 200 )
    expect( JSONResponse.length ).toBeGreaterThan( 0 )

})



afterAll( done => {

    // Closing the db connection allows to Jest exit successfully
    sequelize.close()
    done()
    
})

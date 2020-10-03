/**
 * 
 *  Test: Setup test
 *  @module "tests/unit test/setup"
 * 
 *  @description * you can remove or modify this file *
 * 
 */
import { express } from '@services'
import { Sequelize } from '@bananasplit-js'

import request, { Response } from 'supertest'


// Express server
let Express: any


beforeAll( async () => {

    Express = express.serve( 6627 )

})


/**
 *  @test Hello response is received
 */
test( 'Hello response is received', async () => {

    const response: Response = await request( Express ).get( '/' )

    expect( response.status ).toBe( 200 )
    expect( response.text ).toMatch( 'GET 200 / Hello' )

})


/**
 *  @test Database authetication is correct
 */
test( 'Database authetication is correct', async () => {

    const response: Response = await request( Express ).get( '/test-auth' )

    expect( response.status ).toBe( 200 )
    expect( response.text ).toBe( 'Connection has been established successfully.' )

})


/**
 *  @test Hello from database is received
 */
test( 'Hello from database is received', async () => {

    interface IResponse {
        result: String
    }

    const response: Response = await request( Express ).get( '/test-query' )
    const JSONResponse: IResponse[] = JSON.parse( response.text )

    expect( response.status ).toBe( 200 )
    expect( JSONResponse[0].result ).toBe( 'Hello from database!' )


})


/**
 *  @test User model returns all users
 */
test( 'User model returns all users', async () => {

    const response: Response = await request( Express ).get( '/test-model' )
    const JSONResponse: Object[] = await JSON.parse( response.text )

    expect( response.status ).toBe( 200 )
    expect( JSONResponse.length ).toBeGreaterThan( 0 )

})


afterAll( async done => {

    Express.close()

    // Closing connection allow to jest exit successfully
    await Sequelize.close()

    done()
    
})

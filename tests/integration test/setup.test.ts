/**
 * 
 *  Test: Setup test
 *  @module "tests/unit test/setup"
 * 
 *  @description tests the entire stack setup
 *  
 *  * you can remove or modify this file *
 * 
 */
const { express } = require( '@services' )
const { Sequelize } = require( '@bananasplit-js' )

import request, { Response } from 'supertest'


// Express server
let Express: any


beforeAll( async () => {

    Express = express.serve( 6627 )

})


/**
 *  @test Express server is ok
 */
test( 'Express server is ok', async () => {

    const response: Response = await request( Express ).get( '/' )

    expect( response.status ).toBe( 200 )
    expect( response.text ).toMatch( 'GET 200 / Hello' )

})


/**
 *  @test Database connection is ok
 */
test( 'Database connection is ok', async () => {

    const response: Response = await request( Express ).get( '/test-connection' )

    expect( response.status ).toBe( 200 )
    expect( response.text ).toBe( 'Connection has been established successfully.' )

})


/**
 *  @test Database queries are ok
 */
test( 'Database queries are ok', async () => {

    interface IResponse {
        result: String
    }

    const response: Response = await request( Express ).get( '/test-query' )
    const JSONResponse: IResponse[] = JSON.parse( response.text )

    expect( response.status ).toBe( 200 )
    expect( JSONResponse[0].result ).toBe( 'Hello from database!' )


})


/**
 *  @test Database migrations are ok
 */
test( 'Database migrations are ok', async () => {

    interface IResponse {
        Tables_in_test: String
    }

    const response: Response = await request( Express ).get( '/test-migration' )
    const JSONResponse: IResponse[] = JSON.parse( response.text )

    expect( response.status ).toBe( 200 )
    // case insensitive fixs the problem on windows tables name
    expect( JSONResponse[0]['Tables_in_test'] ).toMatch( /SequelizeMeta/i )
    expect( JSONResponse[1]['Tables_in_test'] ).toMatch( /Users/i )

})


/**
 *  @test Database seeders are ok
 */
test( 'Database seeders are ok', async () => {

    const response: Response = await request( Express ).get( '/test-seeder' )
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

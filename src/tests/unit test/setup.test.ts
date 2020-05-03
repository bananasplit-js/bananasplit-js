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

import { express, apollo } from '../../app'
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
    expect( response.text ).toBe( 'Connection has been established successfully.' )

})


/**
 *  @test   Hello from database is received
 */
test( 'Hello from database is received', async () => {

    const response: Response = await request( app ).get( '/query-test' )
    const JSONResponse: { result: string }[] = JSON.parse( response.text )

    expect( response.status ).toBe( 200 )
    expect( JSONResponse[0].result ).toBe( 'Hello from database!' )


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


/**
 *  @test   'GraphQL Playground loads'
 */
test( 'GraphQL Playground loads', async() => {

    const response: Response = await request( app )
        .get( '/graphql' )
        .accept( 'text/html' )
    ;


    expect( response.status ).toBe( 200 )
    expect( response.text ).toMatch( 'GraphQL Playground' )

})


/**
 *  @test   Hello from GraphQL is received
 */
test( 'Hello from GraphQL is received', async() => {

    const response: Response = await request( app )
        .post( '/graphql' )
        .send( { query: `query { hello }` } )
    ;

    const JSONResponse: { data: { hello: string } } = await JSON.parse( response.text )


    expect( JSONResponse.data.hello ).toBe( 'Hello from GraphQL!' )

})



afterAll( done => {

    // Closing the db connection allows to Jest exit successfully
    sequelize.close()
    done()
    
})

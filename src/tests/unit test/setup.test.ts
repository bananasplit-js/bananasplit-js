/**
 * 
 *  Setup Unit test file example
 *  @test
 * 
 *  @module "tests/unit test/setup.test"
 *  @description * you can remove it after test *
 * 
 */


import Express from 'express'
import { ApolloServer } from 'apollo-server'
import request, { Response } from 'supertest'

import { express, apollo } from '../../app'
import sequelize from '../../providers/sequelize'



// Apollo Server
let apolloserver: any = apollo.app()



beforeAll( async () => {

    /*
     *  1. If Apollo Server is not a middleware then we start the service
     *  2. (apollo.port + 1) prevents: "address already in use"
     */
    if ( apollo.middleware === false )
        apolloserver = await (apolloserver as ApolloServer).listen( apollo.port + 1 )
    ;

})



/**
 *  @test   Hello response is received
 */
test( 'Hello response is received', async () => {

    const response: Response = await request( express.app() ).get( '/' )

    expect( response.status ).toBe( 200 )
    expect( response.text ).toMatch( 'Hello from Bananasplit-js!' )

})


/**
 *  @test   Database Authetication is correct
 */
test( 'Database Authetication is correct', async () => {

    const response: Response = await request( express.app() ).get( '/auth-test' )

    expect( response.status ).toBe( 200 )
    expect( response.text ).toBe( 'Connection has been established successfully.' )

})


/**
 *  @test   Hello from database is received
 */
test( 'Hello from database is received', async () => {

    const response: Response = await request( express.app() ).get( '/query-test' )
    const JSONResponse: { result: string }[] = JSON.parse( response.text )

    expect( response.status ).toBe( 200 )
    expect( JSONResponse[0].result ).toBe( 'Hello from database!' )


})


/**
 *  @test   User model returns all users
 */
test( 'User model returns all users', async () => {

    const response: Response = await request( express.app() ).get( '/model-test' )
    const JSONResponse: {}[] = await JSON.parse( response.text )

    expect( response.status ).toBe( 200 )
    expect( JSONResponse.length ).toBeGreaterThan( 0 )

})


/**
 *  @test   'GraphQL Playground loads'
 */
test( 'GraphQL Playground loads', async() => {

    const apolloapp: Express.Application | string = apollo.middleware ?
        express.app() : apolloserver.url
    ;

    const response: Response = await request( apolloapp )
        .get( apolloserver.subscriptionsPath )
        .accept( 'text/html' )
    ;


    expect( response.status ).toBe( 200 )
    expect( response.text ).toMatch( 'GraphQL Playground' )

})


/**
 *  @test   Hello from GraphQL is received
 */
test( 'Hello from GraphQL is received', async() => {

    const apolloapp: Express.Application | string = apollo.middleware ?
        express.app() : apolloserver.url
    ;

    const response: Response = await request( apolloapp )
        .post( apolloserver.subscriptionsPath )
        .send( { query: `query { hello }` } )
    ;

    const JSONResponse: { data: { hello: string } } = await JSON.parse( response.text )


    expect( JSONResponse.data.hello ).toBe( 'Hello from GraphQL!' )

})



afterAll( done => {

    // If Apollo Server is not a middleware then we stop the service
    if ( apollo.middleware === false )
        apollo.app().stop()
    ;

    // Closing the db connection allows to Jest exit successfully
    sequelize.close()
    done()
    
})

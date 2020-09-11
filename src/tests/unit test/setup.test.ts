/**
 * 
 *  Test: Setup test
 *  @test
 *  @module "tests/unit test/setup"
 * 
 *  @description * you can remove or modify this file *
 * 
 */
import { express, apollo } from '../../services'
import sequelize from '../../providers/sequelize'

import request, { Response } from 'supertest'


// Apollo server instance
let apollo_server: any = apollo.app()

// Express server instance
let express_server: any = express.app()


beforeAll( async () => {

    // If apollo server is not an express middleware then we start the service
    if ( !apollo.middleware )
        apollo_server = await apollo.start( apollo.port + 1 /* avoid port in use*/ )
    ;

})


/**
 *  @test   Hello response is received
 */
test( 'Hello response is received', async () => {

    const response: Response = await request( express_server ).get( '/' )

    expect( response.status ).toBe( 200 )
    expect( response.text ).toMatch( 'GET 200 / Hello' )

})


/**
 *  @test   Database authetication is correct
 */
test( 'Database authetication is correct', async () => {

    const response: Response = await request( express_server ).get( '/auth-test' )

    expect( response.status ).toBe( 200 )
    expect( response.text ).toBe( 'Connection has been established successfully.' )

})


/**
 *  @test   Hello from database is received
 */
test( 'Hello from database is received', async () => {

    const response: Response = await request( express_server ).get( '/query-test' )
    const JSONResponse: { result: string }[] = JSON.parse( response.text )

    expect( response.status ).toBe( 200 )
    expect( JSONResponse[0].result ).toBe( 'Hello from database!' )


})

/**
 *  @test   User model returns all users
 */
test( 'User model returns all users', async () => {

    const response: Response = await request( express_server ).get( '/model-test' )

    const JSONResponse: {}[] = await JSON.parse( response.text )

    expect( response.status ).toBe( 200 )
    expect( JSONResponse.length ).toBeGreaterThan( 0 )

})


/**
 *  @test   Graphql playground loads
 */
test( 'Graphql playground loads', async() => {

    const apollo_endpoint: any = apollo.middleware ?
        express_server : apollo_server.url
    ;

    const response: Response = await request( apollo_endpoint )
        .get( apollo_server.subscriptionsPath )
        .accept( 'text/html' )
    ;


    expect( response.status ).toBe( 200 )
    expect( response.text ).toMatch( 'GraphQL Playground' )

})


/**
 *  @test   Hello from graphql is received
 */
test( 'Hello from graphql is received', async() => {

    const apollo_endpoint: any = apollo.middleware ?
        express_server : apollo_server.url
    ;

    const response: Response = await request( apollo_endpoint )
        .post( apollo_server.subscriptionsPath )
        .send({ query: `query { hello }` })
    ;

    const JSONResponse: { data: { hello: string } } = await JSON.parse( response.text )


    expect( JSONResponse.data.hello ).toBe( 'Hello from GraphQL!' )

})


afterAll( done => {

    // If apollo server is not an express middleware then we stop the service
    if ( !apollo.middleware )
        apollo_server.stop()
    ;

    // Closing database connection allow jest to exit successfully
    sequelize.close()
    done()
    
})

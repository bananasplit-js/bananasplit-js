/**
 * 
 *  Test: Setup test
 *  @module "tests/unit test/setup"
 * 
 *  @description * you can remove or modify this file *
 * 
 */
import { express, apollo } from '../../services'
import { Sequelize } from '../../providers'

import request, { Response } from 'supertest'


// Express server
let Express: any

// Apollo server
let Apollo: any


beforeAll( async () => {

    Express = express.serve( 6627 )
    Apollo = apollo.middleware ? apollo.application() : await apollo.serve( 5627 )

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

    const response: Response = await request( Express ).get( '/auth-test' )

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

    const response: Response = await request( Express ).get( '/query-test' )
    const JSONResponse: IResponse[] = JSON.parse( response.text )

    expect( response.status ).toBe( 200 )
    expect( JSONResponse[0].result ).toBe( 'Hello from database!' )


})

/**
 *  @test User model returns all users
 */
test( 'User model returns all users', async () => {

    const response: Response = await request( Express ).get( '/model-test' )
    const JSONResponse: Object[] = await JSON.parse( response.text )

    expect( response.status ).toBe( 200 )
    expect( JSONResponse.length ).toBeGreaterThan( 0 )

})


/**
 *  @test Graphql playground loads
 */
test( 'Graphql playground loads', async() => {

    const endpoint: Express.Application | String = apollo.middleware ?
        Express : Apollo.url
    ;

    const response: Response = await request( endpoint )
        .get( Apollo.subscriptionsPath )
        .accept( 'text/html' )
    ;


    expect( response.status ).toBe( 200 )
    expect( response.text ).toMatch( 'GraphQL Playground' )

})


/**
 *  @test Hello from graphql is received
 */
test( 'Hello from graphql is received', async() => {

    interface IResponse {
        data: {
            hello: String
        }
    }

    const endpoint: Express.Application | String = apollo.middleware ?
        Express : Apollo.url
    ;

    const response: Response = await request( endpoint )
        .post( Apollo.subscriptionsPath )
        .send({ query: `query { hello }` })
    ;

    const JSONResponse: IResponse = await JSON.parse( response.text )


    expect( JSONResponse.data.hello ).toBe( 'Hello from GraphQL!' )

})


afterAll( async done => {

    Express.close()
    apollo.middleware || Apollo.server.close()

    // Closing connection allow to jest exit successfully
    await Sequelize.close()

    done()
    
})

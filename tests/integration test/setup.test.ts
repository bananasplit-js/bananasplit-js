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
import { express, apollo } from '@services'
import { Sequelize } from '@bananasplit-js'

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


/**
 *  @test Graphql playground is ok
 */
test( 'Graphql playground is ok', async() => {

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
 *  @test Graphql queries are ok
 */
test( 'Graphql queries are ok', async() => {

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

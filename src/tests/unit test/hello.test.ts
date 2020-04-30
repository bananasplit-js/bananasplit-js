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
import chalk from 'chalk'

import { express } from '../../app'
import { sequelize } from '../../providers/sequelize'



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

} )


/**
 *  @test   Hello from database is received
 */
test( 'Hello from database is received', async () => {

    const response: Response = await request( app ).get( '/db-query-test' )
    
    try {
        const JSONResponse: { result: string }[] = JSON.parse( response.text )

        expect( response.status ).toBe( 200 )
        expect( JSONResponse[0].result ).toMatch( 'Hello from database!' )
        
    } catch(e) {
        console.log( chalk.bgRed(response.text) )

    }

} )



afterAll( done => {

    // Closing the db connection allows to Jest exit successfully
    sequelize.close()
    done()
    
})

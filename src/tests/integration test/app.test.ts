/**
 * 
 *  App Integration test file example
 *  @test
 * 
 *  @module "tests/integration test/app.test"
 *  @description * you can remove it or modify it *
 * 
 *  @use this file as your Tests template! ***
 * 
 */


import Express from 'express'
import request, { Response } from 'supertest'

import App from '../../providers/express'
import { sequelize } from '../../providers/sequelize'


// Express App as parallel instance:
const app: Express.Application = App.build().get()


/**
 *  @test   Test a entire module
 */
test( 'Test a entire module', (): void => {
    expect( 1 + 1 ).toBe( 2 )   // or not?
})

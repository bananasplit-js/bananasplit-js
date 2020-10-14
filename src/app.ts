/**
 * 
 *  Bananasplit-js for Express
 *  @module .
 * 
 *  @description all begins here
 * 
 */
import { Stack } from '@bananasplit-js'
import { express } from '@services'


const services = Stack([
    express
])


services.serve()

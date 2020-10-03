/**
 * 
 *  Bananasplit-js for Express
 *  @module .
 * 
 *  @description all begins here
 * 
 */
import { Stack } from '@bananasplit-js'
import { express, apollo } from '@services'


const services = Stack([
    express,
    apollo
])

services.serve()

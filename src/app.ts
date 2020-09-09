/**
 * 
 *  Bananasplit-js for Express
 * 
 *  @module app
 *  @description All begins here
 * 
 */


import { express, apollo } from './services'


; ( async () => {

    // Start the services
    await express.start()

})()

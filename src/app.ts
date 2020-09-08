/**
 * 
 *  App
 * 
 *  @module app
 *  @description This is your Bananasplit App!
 * 
 */



import Express from './providers/express'
import Apollo from './providers/apollo'



/* ----------------------------------------------------------------
 *  
 *  This is your Bananasplit App!
 *  
 *  You can specify ports
 *      Express.provide({ port: 7000 }) or express.start( 7000 )
 *  
 * -----------------------------------------------------------------*/


// Express Server Provider
const express: Express = Express.provide()

// Apollo Server Provider
const apollo: Apollo = Apollo.provide({
    middleware: express
})


export { express, apollo }

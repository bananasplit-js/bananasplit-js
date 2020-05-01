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
 *      Express.build({ port: 7000 }) or express.start( 7000 )
 * 
 -----------------------------------------------------------------*/


// Express Server Provider
const express: Express = Express.build()

// Apollo Server Provider
const apollo: Apollo = Apollo.build({
    middleware: express
})


export { express, apollo }

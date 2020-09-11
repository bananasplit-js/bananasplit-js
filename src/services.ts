/**
 * 
 *  Services
 * 
 *  @module services
 *  @description Services provided by Bananasplit
 * 
 */
import Express from './providers/express'
import Apollo from './providers/apollo'



/* ------------------------------------------------
 *  
 *  You can specify ports:
 *      Express.provide({ port: 7000 })
 *  
 * -----------------------------------------------*/


// Express Server Provider
const express: Express = Express.provide()

// Apollo Server Provider
const apollo: Apollo = Apollo.provide({
    middleware: express
})


export { express, apollo }

/**
 * 
 *  Services
 *  @module services
 * 
 *  @description services provided by Bananasplit
 * 
 */
import { Express, Apollo } from '@bananasplit-js'


/* ------------------------------------------------
 *  
 *  You can specify ports:
 *      Express.provide({ port: 7000 })
 *  
 * -----------------------------------------------*/


// Express server provider
const express: Express = Express.provide()

// Apollo server provider
const apollo: Apollo = Apollo.provide({
    middleware: express
})


export { express, apollo }

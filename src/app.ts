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



/* -------------------------------------
 * 
 *  This is your Bananasplit App!
 *  
 *  You can specify ports
 *      Express.build({ port: 7000 })
 * 
 --------------------------------------*/


// Express Server
const express: Express = Express.build()

// Apollo Server
const apollo: Apollo = Apollo.build({
    middleware: express
})


; ( async () => {

    // Start the services
    await express.start()

})()


// Export ----------------------------

const app = express.get()
const graphql = apollo.get()


export { app, graphql }

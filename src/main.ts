/**
 * 
 *  Main
 *  @module main
 * 
 */


import Server from './server'


// Makes Server:
( async () => {
    const server = new Server( 4000 )
    await server.listen()
} )()

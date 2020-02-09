/**
 * 
 *  Main
 *  @module main
 * 
 */


import { Server, Apollo as ApolloServer } from './services'


/**
 *  If you want to run Nodejs server and Apollo Server in separated ports, you have to declarate apollo new instance
 *  argument without key parameter 'middleware'. Then just run the process with: await apollo.listen()
 * 
 *  Key parameters 'port' and 'middleware' in both cases are OPTIONALS. If there is not port specified, then Services uses
 *  system defined ports or defaults.
 */


( async () => {

    // Nodejs Server:
    const server: Server = Server.create({
        port: 4000
    })

    // Apollo Server:
    const apollo: ApolloServer = ApolloServer.create({
        port: 5000,
        middleware: server
    })

    await server.listen()
    // await apollo.listen()

} )()

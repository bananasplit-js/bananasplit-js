/**
 * 
 *  Main
 * 
 *  @module main
 *  @description All begins here!
 * 
 */


import Server from './services/http-server'
import ApolloServer from './services/apollo-server'


/**
 * 
 *  If you want to run Nodejs Server and/or Apollo Server as separated ports, you have to create the services throw 'create' function
 *  without the key parameter 'middleware' for Apollo and passing a valid port value into it. Finally call his 'listen' method, as below:
 * 
 *  await server.listen()
 *  await apollo.listen()
 * 
 *  Key parameters 'port' and 'middleware' are always OPTIONALS. If there is not port specified, then services uses the system
 *  defined port or the default value.
 * 
 */


( async () => {

    // Nodejs Server:
    const server: Server = Server.create({
        port: 4000
    })

    // Apollo Server:
    const apollo: ApolloServer = ApolloServer.create({
        middleware: server
    })

    await server.listen()
    // await apollo.listen()

} )()

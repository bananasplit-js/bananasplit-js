import Server from './server'

( async () => {
    const server = new Server( 4000 )
    await server.listen()
} )()

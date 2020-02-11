/**
 * 
 *  App
 * 
 *  @module app
 *  @description All begins here!
 * 
 */


import Express from './providers/express'
import Apollo from './providers/apollo'


/**
 * 
 *  If you want to run Nodejs Server and/or Apollo Server as separated ports, you have to create the services throw 'build' function
 *  without the key parameter 'middleware' for Apollo and passing a valid port value into it. Finally call his 'start' method, as below:
 * 
 *  await app.start()
 *  await apollo.start()
 * 
 *  Key parameters 'port' and 'middleware' are always OPTIONALS. If there is not port specified, then services uses the system
 *  defined port or the default value.
 * 
 *  You can pass the listen port as parameter in 'start' function too or pass it in settings file throw 'use' function.
 * 
 */


( async () => {

    // Express Express:
    const app = Express.build({
        port: 4000
    })

    // Apollo Express:
    const apollo: Apollo = Apollo.build({
        middleware: app
    })

    await app.start()
    // await apollo.start()

} )()

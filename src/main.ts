/**
 * 
 *  Main
 * 
 *  @module main
 *  @description All begins here!
 * 
 */


import App from './apps/app'
import ApolloApp from './apps/apollo.app'


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
 */


( async () => {

    // Express App:
    const app = App.build({
        port: 4000
    })

    // Apollo App:
    const apollo: ApolloApp = ApolloApp.build({
        middleware: app
    })

    await app.start()
    // await apollo.start()

} )()

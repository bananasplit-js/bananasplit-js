/**
 *
 *  Services
 * 
 *  @module services
 *  @description Provides Backend Services
 * 
 */


import Express from 'express'
import Morgan from 'morgan'

import MainRouter from './routes/main.routes'


/**
 * 
 *  Definitions for Server new Instances parameters
 *  @typedef
 * 
 */
type ServerProps = {
    port?: number | string
}


export
    /**
     * 
     *  @class Server
     *  @classdesc Initializes the Server
     * 
     */
    class Server {
        
        /**
         * 
         *  @property { Express.Application } server
         * 
         */
        private server: ( Express.Application | null ) = null

        /**
         * 
         *  @private @property { number | string } port
         * 
         */
        private port? : number | string

        /**
         *
         *  Singleton Instance
         *  @private @property { Server } instance
         * 
         */
        private static instance: Server
        

        /**
         * 
         *  @constructor
         *  @private
         * 
         *  Not Accesible.
         *  Implements: Singleton Pattern
         * 
         */
        private constructor() {
            // Singleton      
        }

        /**
         *  
         *  Singleton
         *  @description Creates or returns a Singleton Instance for Server
         * 
         *  @method create
         *  @param { number | string } port? - Port number
         * 
         */
        public static create( { port }: ServerProps ): Server {

            if ( ! Server.instance ) {

                // Creates a new Instance:
                Server.instance = new Server()
                Server.instance.server = Express()

                // Sets properties:
                Server.instance.port = port

                // Executes methods:
                Server.instance.settings()
                Server.instance.middlewares()
                Server.instance.routes()

            }

            return Server.instance

        }


        /**
         * 
         *  Gets Express Server Instance
         *  @returns { Express.Application }
         *  
         */
        public getService(): Express.Application {
            return <Express.Application> this.server
        }


        /**
         * 
         *  Settings for Server
         * 
         *  @private @method settings
         *  @returns void
         * 
         */
        private settings(): void {
            const $this = <Express.Application> this.server
            $this.set( 'port', this.port || process.env.PORT || 4000 )
        }


        /**
         * 
         *  Sets All Middlewares
         * 
         *  @private @method middlewares
         *  @returns void
         * 
         */
        private middlewares(): void {
            const $this = <Express.Application> this.server
            $this.use( Morgan('dev') )
        }


        /**
         * 
         *  Makes Routes for Server
         * 
         *  @private @method routes
         *  @returns void
         * 
         */
        private routes(): void {
            const $this = <Express.Application> this.server
            $this.use( MainRouter )
        }


        /**
         * 
         *  Runs the Server on specified/system/default port
         * 
         *  @method listen
         *  @returns { Promise }
         * 
         */
        public async listen(): Promise <any> {
            const $this = <Express.Application> this.server

            await $this.listen( $this.get('port') )
            console.log( 'Server: Nodejs running on port', $this.get('port') )

        }

    }
;




import { ApolloServer } from 'apollo-server'
import { ApolloServer as ApolloServerExpress } from 'apollo-server-express'

import Schemas from './graphql/schemas'
import Resolvers from './graphql/resolvers'


/**
 * 
 *  Definitions for Apollo new Instances parameters
 *  @typedef
 * 
 */
type ApolloProps = {
    port?: number
    middleware?: Server
}


export
    /**
     * 
     *  @class Apollo
     *  @classdesc Provides GraphQL throws Apollo Service
     * 
     */
    class Apollo {

        /**
         *
         *  @private @property { number } port
         * 
         */
        private port?: number

        /**
         *
         *  @private @property { ApolloServer } server
         * 
         */
        private server: ( ApolloServerExpress | ApolloServer | null ) = null
        
        /**
         *
         *  Singleton instance
         *  @private @property { Server } instance
         * 
         */
        private static instance: Apollo


        /**
         * 
         *  @constructor
         *  @private
         * 
         *  Not Accesible.
         *  Implements: Singleton Pattern
         * 
         */
        private constructor() {
            // Singleton
        }


        /**
         *  
         *  Singleton
         *  @description Creates or returns a Singleton Instance for Apollo Server
         * 
         *  @method create
         *  @param { number | string } port? - Port number
         * 
         */
        public static create( { port, middleware }: ApolloProps ) {

            if ( ! Apollo.instance ) {

                Apollo.instance =  new Apollo()

                Apollo.instance.port = ( port || process.env.PORT || 5000 ) as number

                const config: object = {
                    typeDefs: [ Schemas ],
                    resolvers: [ Resolvers ]
                }

                if ( middleware ) {

                    Apollo.instance.server = new ApolloServerExpress( config )

                    Apollo.instance.server.applyMiddleware({
                        app: middleware.getService()
                    })

                    console.log( 'Server: Apollo running on', Apollo.instance.server.graphqlPath )

                } else

                    Apollo.instance.server = new ApolloServer( config )

                ;

            }

            return Apollo.instance

        }


        /**
         * 
         *  Gets Apollo Server Instance
         *  @returns { ApolloServerExpress | ApolloServer }
         *  
         */
        public getService(): ApolloServerExpress | ApolloServer {
            return <ApolloServer> this.server
        }


        /**
         *
         *  Runs the Apollo Server on specified/system/default port
         * 
         *  @method listen
         *  @returns { Promise }
         * 
         */
        public async listen(): Promise <void> {
            
            const $this = <ApolloServer> this.server 

            await $this.listen( this.port )
            console.log( 'Server: Apollo running on port', this.port )

        }

    }
;

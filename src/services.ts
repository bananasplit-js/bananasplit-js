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
         *  @property { express.Application } server
         * 
         */
        private server: Express.Application

        /**
         * 
         *  @private @property { number | string } port
         * 
         */
        private port? : number | string


        /**
         * 
         *  @constructor
         *  @param { number | string } port? - Port number
         * 
         */
        constructor( { port }: ServerProps ) {

            this.server = Express()
            this.port = port

            this.settings()
            this.middlewares()
            this.routes()
            
        }


        /**
         * 
         *  Gets Express Server Instance
         *  @returns { Express.Application }
         *  
         */
        public getService(): Express.Application {
            return this.server
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
            this.server.set( 'port', this.port || process.env.PORT || 4000 )
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
            this.server.use( Morgan('dev') )
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
            this.server.use( MainRouter )
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

            await this.server.listen( this.server.get('port') )
            console.log( 'Server: Nodejs running on port', this.server.get('port') )

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
        private port: number

        /**
         *
         *  @private @property { ApolloServer } server
         * 
         */
        private server: ApolloServerExpress | ApolloServer


        /**
         *
         *  @constructor
         * 
         *  @param { number } port?
         *  @param { Server } middleware?
         * 
         */
        constructor( { port, middleware }: ApolloProps ) {

            this.port = ( port || process.env.PORT || 5000 ) as number

            const config: object = {
                typeDefs: [ Schemas ],
                resolvers: [ Resolvers ]
            }

            if ( middleware ) {

                this.server = new ApolloServerExpress( config )

                this.server.applyMiddleware({
                    app: middleware.getService()
                })

                console.log( 'Server: Apollo running on', this.server.graphqlPath )

            } else

                this.server = new ApolloServer( config )
            ;

        }


        /**
         * 
         *  Gets Apollo Server Instance
         *  @returns { ApolloServerExpress | ApolloServer }
         *  
         */
        public getService(): ApolloServerExpress | ApolloServer {
            return this.server
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
            
            const server = this.server as ApolloServer

            await server.listen( this.port )
            console.log( 'Server: Apollo running on port', this.port )

        }

    }
;

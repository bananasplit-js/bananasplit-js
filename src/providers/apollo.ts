/**
 *
 *  Provider: Apollo
 *  @module providers/apollo
 * 
 *  @description provides graphql service throw apollo server 
 * 
 */
import http from 'http'

import { ApolloServer } from 'apollo-server'
import { ApolloServer as ApolloServerExpress, makeExecutableSchema } from 'apollo-server-express'
import { GraphQLSchema } from 'graphql'
import chalk from 'chalk'

import App from './express'

import Schemas from '../graphql/schemas/main'
import Resolvers from '../graphql/resolvers/main'
import customizeGraphQL from '../graphql/custom/graphql'


/**
 * 
 *  Definitions for ApolloProvider singleton parameters
 *  @typedef
 * 
 */
type IApollo = {
    port?: number
    middleware?: App
}

/**
 * 
 *  Definitions for ApolloServer
 *  @typedef
 * 
 */
type IApolloServer = {
    url: String,
    subscriptionsPath: String,
    httpServer?: http.Server
}


export default
    /**
     * 
     *  @class ApolloProvider
     *  @classdesc provides graphql service throws apollo server
     * 
     */
    class ApolloProvider {

        /**
         *
         *  @property { string } name
         * 
         */
        public name: string = 'GraphQL'


        /**
         *
         *  @property { boolean } middleware
         * 
         */
        public middleware: boolean = false


        /**
         *
         *  @property { number } port
         * 
         */
        public port: number = 4627


        /**
         *
         *  @property { string } path
         * 
         */
        public path: string = ""


        /**
         *
         *  @private @property { object } options
         * 
         */
        private options: object = {}


        /**
         *
         *  @private @property { GraphQLSchema } schema
         * 
         */
        private schema!: GraphQLSchema


        /**
         *
         *  @private @property { ApolloServer | ApolloServer | undefined } service
         * 
         */
        private service: ( ApolloServerExpress | ApolloServer | undefined )
        

        /**
         *
         *  Singleton instance
         *  @private @static @property { ApolloProvider } instance
         * 
         */
        private static instance: ApolloProvider


        
        /**
         * 
         *  @constructor
         *  @private
         * 
         *  Not accesible
         *  Implements: singleton pattern
         * 
         */
        private constructor() {
            // Singleton
        }


        /**
         *  
         *  Singleton
         *  @description provide or returns a singleton instance of ApolloProvider
         * 
         *  @static @method provide
         *  @param { number } port? - Port number
         *  @param { App } middleware? - Middleware throw specified app
         * 
         *  @returns { ApolloServer | ApolloServerExpress }
         * 
         */
        public static provide( { port, middleware }: IApollo = {} ) {

            if ( ! this.instance ) {

                // Creates new instance
                this.instance = new ApolloProvider()

                // Build the Schema
                this.instance.makeSchema()

                // Returns a new manipulated schema within an options object for pass to new ApolloServer construct
                this.instance.customizeGraphQL()

                // Creates ApolloProvider app as middleware or independent service
                if ( middleware ) {

                    this.instance.service = new ApolloServerExpress( this.instance.options )

                    this.instance.service.applyMiddleware({
                        app: middleware.app()
                    })

                    this.instance.middleware = true
                    this.instance.port = 0
                    this.instance.path = this.instance.service.graphqlPath

                } else {

                    this.instance.service = new ApolloServer( this.instance.options )

                    // Sets properties
                    if ( port )
                        this.instance.port = port
                    ;

                }

            }

            return this.instance

        }


        /**
         * 
         *  Collect typeDefs and resolvers for provide the schema
         *  @private @method makeSchema
         * 
         */
        private makeSchema(): void {

            // Builds the Schema
            ApolloProvider.instance.schema = makeExecutableSchema({
                typeDefs: Schemas,
                resolvers: Resolvers
            })

        }


        /**
         * 
         *  Instance for manipulate the schema before call apollo construct (dev customization)
         *  @private @method customizeGraphQL
         * 
         */
        private customizeGraphQL(): void {
            ApolloProvider.instance.options = customizeGraphQL( ApolloProvider.instance.schema )
        }


        /**
         * 
         *  Returns the ApolloProvider singleton instance
         * 
         *  @static @method getInstance
         *  @returns { ApolloProvider }
         * 
         */
        public static getInstance = (): ApolloProvider => ApolloProvider.instance


        /**
         * 
         *  Gets apollo server app
         *  
         *  @method app
         *  @returns { ApolloServerExpress | ApolloServer }
         *  
         */
        public app = (): ( ApolloServerExpress | ApolloServer ) => <ApolloServer> ApolloProvider.getInstance().service


        /**
         *
         *  Start the apollo server on the specified or default port
         * 
         *  @async @method start
         *  @returns { Promise<IApolloServer> }
         * 
         */
        public async start( port?: number ): Promise <IApolloServer> {
            
            if ( port )
                this.port = port
            ;

            const apolloServer: IApolloServer = await ( <ApolloServer>this.service ).listen( this.port )


            return apolloServer

        }

    }
;

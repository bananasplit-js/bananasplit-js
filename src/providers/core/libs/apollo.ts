/**
 *
 *  Provider: Apollo
 *  @module providers/modules/apollo
 * 
 *  @description provides graphql service throw apollo server 
 * 
 */
import http from 'http'
import ExpressProvider from './express'
import { ApolloServer } from 'apollo-server'
import { ApolloServer as ApolloServerMiddleware, makeExecutableSchema } from 'apollo-server-express'
import { GraphQLSchema } from 'graphql'

import Schemas from '@schemas/main'
import Resolvers from '@resolvers/main'
import customizeGraphQL from '@graphql/custom/graphql'


/**
 * 
 *  Definitions for ApolloProvider singleton parameters
 *  @typedef
 * 
 */
type IApollo = {
    port?: number
    middleware?: ExpressProvider
}

/**
 * 
 *  Definitions for ApolloServer
 *  @typedef
 * 
 */
type IApolloServer = {
    url: string,
    subscriptionsPath: string,
    server?: http.Server
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
        public readonly name: string = 'GraphQL'


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
         *  @private @property { ApolloServer | ApolloServerMiddleware | undefined } service
         * 
         */
        private service: ( ApolloServer | ApolloServerMiddleware | undefined )
        

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
        private constructor () {
            // Singleton
        }


        /**
         *  
         *  Singleton
         *  @description provide or returns a singleton instance of ApolloProvider
         * 
         *  @static @method provide
         *  @param { number } port ? - Port number
         *  @param { ExpressProvider } middleware ? - Middleware throw the specified app
         * 
         *  @returns { ApolloServer | ApolloServerMiddleware }
         * 
         */
        public static provide ({ port, middleware }: IApollo = {}): ApolloProvider {

            if ( !this.instance ) {

                // Creates new instance
                this.instance = new ApolloProvider()

                // Build the Schema
                this.instance.makeSchema()

                // Returns a manipulated schema within options object
                this.instance.customizeGraphQL()

                // Creates apollo server as middleware or independent service
                if ( middleware ) {

                    this.instance.service = new ApolloServerMiddleware( this.instance.options )

                    this.instance.service.applyMiddleware({
                        app: middleware.application()
                    })

                    this.instance.port = 0
                    this.instance.middleware = true
                    this.instance.path = this.instance.service.graphqlPath

                } else {

                    this.instance.service = new ApolloServer( this.instance.options )

                    if ( port )
                        this.instance.port = port
                    ;

                }

            }

            return this.instance

        }


        /**
         * 
         *  Collect typeDefs and resolvers and provide a schema
         *  @private @method makeSchema
         * 
         */
        private makeSchema (): void {

            // Builds the Schema
            ApolloProvider.instance.schema = makeExecutableSchema({
                typeDefs: Schemas,
                resolvers: Resolvers
            })

        }


        /**
         * 
         *  Instance that allow developer to manipulate the schema
         *  @private @method customizeGraphQL
         * 
         */
        private customizeGraphQL (): void {
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
         *  Gets apollo application
         *  
         *  @method application
         *  @returns { ApolloServer | ApolloServerMiddleware }
         *  
         */
        public application = (): ( ApolloServer | ApolloServerMiddleware ) => <ApolloServer> ApolloProvider.getInstance().service


        /**
         *
         *  Serve apollo server in the specified port
         * 
         *  @async @method serve
         *  @returns { Promise <IApolloServer> }
         * 
         */
        public async serve ( port?: number ): Promise <IApolloServer> {
            
            if ( port )
                this.port = port
            ;
            
            const ApolloServer: IApolloServer = await ( <ApolloServer> this.service ).listen( this.port )


            return ApolloServer

        }

    }
;

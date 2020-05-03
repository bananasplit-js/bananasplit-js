/**
 *
 *  Apollo Provider
 * 
 *  @module providers/apollo
 *  @description Provides GraphQL service throw Apollo Server 
 * 
 */



import http from 'http'
import { ApolloServer } from 'apollo-server'
import { ApolloServer as ApolloServerExpress, makeExecutableSchema } from 'apollo-server-express'
import { GraphQLSchema } from 'graphql'
import chalk from 'chalk'

import App from './express'

import Schemas from '../graphql/main.schemas'
import Resolvers from '../graphql/main.resolvers'
import customizeGraphQL from '../graphql/apollo/customize.graphql'



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
     *  @classdesc Provides GraphQL service throws Apollo Server
     * 
     */
    class ApolloProvider {

        /**
         *
         *  @private @property { number | string } port
         * 
         */
        private port?: number | string


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
         *  @private @property { ApolloServer } service
         * 
         */
        private service: ( ApolloServerExpress | ApolloServer | undefined )
        

        /**
         *
         *  Singleton instance
         *  @private @static @property { App } instance
         * 
         */
        private static instance: ApolloProvider


        
        /**
         * 
         *  @constructor
         *  @private
         * 
         *  Not accesible
         *  Implements: Singleton pattern
         * 
         */
        private constructor() {
            // Singleton
        }


        /**
         *  
         *  Singleton
         *  @description Build or returns a Singleton instance of ApolloProvider
         * 
         *  @static @method build
         *  @param { number | string } port? - Port number
         *  @param { App } middleware? - Middleware throw specified app
         * 
         *  @retuns { ApolloServer | ApolloServerExpress } instance - Apollo as Independent or throw Express Middleware
         * 
         */
        public static build( { port, middleware }: IApollo = {} ) {

            if ( ! this.instance ) {

                // Creates new instance
                this.instance = new ApolloProvider()

                // Sets properties
                this.instance.port = ( port || 4000 )

                // Build the Schema
                this.instance.makeSchema()

                // Returns a new manipulated Schema within an options object for pass to new ApolloServer construct
                this.instance.customizeGraphQL()

                // Creates ApolloProvider app as Middleware or independent service
                if ( middleware ) {

                    this.instance.service = new ApolloServerExpress( this.instance.options )

                    this.instance.service.applyMiddleware({
                        app: middleware.app()
                    })

                    
                    if ( process.env.NODE_ENV === 'development' )

                        console.log(
                            chalk.bgCyan.black( 'GraphQL' ), '->',
                            chalk.bgWhite.black( `http://localhost:${middleware.app().get('port')}${this.instance.service.graphqlPath}` )
                        )

                    ;

                } else

                    this.instance.service = new ApolloServer( this.instance.options )

                ;

            }

            return this.instance

        }


        /**
         * 
         *  Collect typeDefs and resolvers for build the Schema
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
         *  Instance for manipulate the Schema before call Apollo construct (dev customization)
         *  @private @method customizeGraphQL
         * 
         */
        private customizeGraphQL(): void {
            ApolloProvider.instance.options = customizeGraphQL( ApolloProvider.instance.schema )
        }


        /**
         * 
         *  Returns the ApolloProvider Singleton instance
         * 
         *  @static @method getInstance
         *  @returns { ApolloProvider } instance
         * 
         */
        public static getInstance = (): ApolloProvider => ApolloProvider.instance


        /**
         * 
         *  Gets Apollo Server App
         *  
         *  @method app
         *  @returns { ApolloServerExpress | ApolloServer } server - Apollo as independent or throw Express Middleware
         *  
         */
        public app = (): ( ApolloServerExpress | ApolloServer ) => <ApolloServer> ApolloProvider.getInstance().service


        /**
         *
         *  Start the Apollo Server on the specified or default port
         * 
         *  @async @method start
         *  @returns { Promise <IApolloServer> } apolloServer - Object containing url, subscriptionsPath and the httpServer
         * 
         */
        public async start( port?: number ): Promise <IApolloServer> {

            if ( port )
                this.port = port
            ;

            const apolloServer: IApolloServer = await ( <ApolloServer> this.service ).listen( this.port )
            

            if ( process.env.NODE_ENV === 'development' ) {

                console.log(
                    chalk.bgCyan.black( 'GraphQL' ), '->',
                    chalk.bgWhite.black( `http://localhost:${this.port}` )
                )

                console.log( 'GraphQL is running!\n' )

            }


            return apolloServer

        }

    }
;

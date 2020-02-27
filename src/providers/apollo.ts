/**
 *
 *  Apollo Provider
 * 
 *  @module providers/apollo
 *  @description Provides GraphQL data throw Apollo Server 
 * 
 */



import { ApolloServer } from 'apollo-server'
import { ApolloServer as ApolloServerExpress, makeExecutableSchema } from 'apollo-server-express'
import { GraphQLSchema } from 'graphql'

import App from './express'

import Schemas from '../graphql/main.schemas'
import Resolvers from '../graphql/main.resolvers'
import customizeGraphQL from '../graphql/apollo/customize.graphql'

import chalk from 'chalk'



/**
 * 
 *  Definitions for ApolloProvider singleton parameters
 *  @typedef
 * 
 */
type ApolloProps = {
    port?: number
    middleware?: App
}


export default
    /**
     * 
     *  @class ApolloProvider
     *  @classdesc Provides GraphQL throws Apollo Server
     * 
     */
    class ApolloProvider {

        /**
         *
         *  @private @property { number } port
         * 
         */
        private port?: number


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
         *  @private @property { ApolloServer } server
         * 
         */
        private server: ( ApolloServerExpress | ApolloServer | null ) = null
        

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
         *  @description Build or returns a Singleton Instance of ApolloProvider
         * 
         *  @static @method build
         *  @param { number | string } port? - Port number
         *  @param { App } middleware? - Middleware throw App specified
         * 
         *  @retuns { ApolloServer | ApolloServerExpress }
         * 
         */
        public static build( { port, middleware }: ApolloProps ) {

            if ( ! ApolloProvider.instance ) {

                // Creates new Instance:
                ApolloProvider.instance = new ApolloProvider()

                // Sets Properties:
                ApolloProvider.instance.port = ( port || process.env.PORT || 5000 ) as number

                // Build the Schema:
                ApolloProvider.instance.makeSchema()

                // Returns a new manipulated Schema within an options object for pass to new ApolloServer construct:
                ApolloProvider.instance.customizeGraphQL()

                // Create ApolloProvider App as Middleware or Independent:
                if ( middleware ) {

                    ApolloProvider.instance.server = new ApolloServerExpress( ApolloProvider.instance.options )

                    ApolloProvider.instance.server.applyMiddleware({
                        app: middleware.get()
                    })

                    console.log( chalk.bgGreen.black.bold( 'ApolloProvider: running on', ApolloProvider.instance.server.graphqlPath ) )

                } else

                    ApolloProvider.instance.server = new ApolloServer( ApolloProvider.instance.options )

                ;

            }

            return ApolloProvider.instance

        }


        /**
         * 
         *  Collect typeDefs and resolvers for build the Schema
         *  @private @method makeSchema
         * 
         */
        private makeSchema(): void {

            // Builds the Schema:
            ApolloProvider.instance.schema = makeExecutableSchema({
                typeDefs: Schemas,
                resolvers: Resolvers
            })

        }


        /**
         * 
         *  Let the chance to dev for manipulate the Schema and set the options
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
         *  Gets Apollo Server Instance
         *  
         *  @method get
         *  @returns { ApolloServerExpress | ApolloServer }
         *  
         */
        public get = (): ( ApolloServerExpress | ApolloServer ) => <ApolloServer> this.server


        /**
         *
         *  Start the Apollo Server on specified/system/default port
         * 
         *  @async @method start
         *  @returns { Promise }
         * 
         */
        public async start( port?: number ): Promise <void> {

            await ( <ApolloServer> this.server ).listen( port || this.port )
            console.log( chalk.bgGreen.black.bold( 'App: ApolloProvider running on port', this.port ) )

        }

    }
;

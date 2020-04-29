/**
 *
 *  Apollo Provider
 * 
 *  @module providers/apollo
 *  @description Provides GraphQL service throw Apollo Server 
 * 
 */


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
type ApolloProps = {
    port?: number
    middleware?: App
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
         *  @private @property { number| string } port
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
         *  @retuns { ApolloServer | ApolloServerExpress }
         * 
         */
        public static build( { port, middleware }: ApolloProps = {} ) {

            if ( ! ApolloProvider.instance ) {

                // Creates new instance
                ApolloProvider.instance = new ApolloProvider()

                // Sets properties
                ApolloProvider.instance.port = ( port || 4000 )

                // Build the Schema
                ApolloProvider.instance.makeSchema()

                // Returns a new manipulated Schema within an options object for pass to new ApolloServer construct
                ApolloProvider.instance.customizeGraphQL()

                // Creates ApolloProvider app as Middleware or independent service
                if ( middleware ) {

                    ApolloProvider.instance.server = new ApolloServerExpress( ApolloProvider.instance.options )

                    ApolloProvider.instance.server.applyMiddleware({
                        app: middleware.get()
                    })

                    console.log(
                        chalk.bgCyan.black( 'GraphQL' ), '->',
                        chalk.bgWhite.black( `http://localhost:${middleware.get().get('port')}${ApolloProvider.instance.server.graphqlPath}` )
                    )

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
         *  @returns { ApolloProvider }
         * 
         */
        public static getInstance = (): ApolloProvider => ApolloProvider.instance


        /**
         * 
         *  Gets Apollo Server instance
         *  
         *  @method get
         *  @returns { ApolloServerExpress | ApolloServer }
         *  
         */
        public get = (): ( ApolloServerExpress | ApolloServer ) => <ApolloServer> ApolloProvider.getInstance().server


        /**
         *
         *  Start the Apollo Server on the specified or default port
         * 
         *  @async @method start
         *  @returns { Promise }
         * 
         */
        public async start( port?: number ): Promise <void> {

            if ( port )
                this.port = port
            ;

            await ( <ApolloServer> this.server ).listen( this.port )
            
            console.log(
                chalk.bgCyan.black( 'GraphQL' ), '->',
                chalk.bgWhite.black( `http://localhost:${this.port}` )
            )

        }

    }
;

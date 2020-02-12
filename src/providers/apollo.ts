/**
 *
 *  Apollo Provider
 * 
 *  @module providers/apollo
 *  @description Provides GraphQL data throw Apollo Server 
 * 
 */


import { ApolloServer } from 'apollo-server'
import { ApolloServer as ApolloServerExpress } from 'apollo-server-express'

import App from './express'

import Schemas from '../graphql/main.schemas'
import Resolvers from '../graphql/main.resolvers'

import settings from '../settings/apollo.settings'


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
        private options?: object

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
                ApolloProvider.instance =  new ApolloProvider()

                // Sets Properties:
                ApolloProvider.instance.port = ( port || process.env.PORT || 5000 ) as number

                // Get options from apollo.settings file in settings:
                const options: object = ApolloProvider.instance.settings()

                // Create ApolloProvider App as Middleware or Independent:
                if ( middleware ) {

                    ApolloProvider.instance.server = new ApolloServerExpress( options )

                    ApolloProvider.instance.server.applyMiddleware({
                        app: middleware.get()
                    })

                    console.log( 'ApolloProvider: running on', ApolloProvider.instance.server.graphqlPath )

                } else

                    ApolloProvider.instance.server = new ApolloServer( options )

                ;

            }

            return ApolloProvider.instance

        }


        /**
         * 
         *  Gets settings from Apollo Settings file
         * 
         *  @private @method settings
         *  @returns { object }
         * 
         */
        private settings(): object {

            // Defines Resolvers, Schemas, etc as config object:
            const config: object = {
                typeDefs: Schemas,
                resolvers: Resolvers
            }

            const options = settings

            // Return merged options obtained in settings file with config obj to force modularized typeDefs and resolvers:
            return { ...options, ...config }

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
            console.log( 'App: ApolloProvider running on port', this.port )

        }

    }
;

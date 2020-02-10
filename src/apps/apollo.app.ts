/**
 *
 *  Apollo App
 * 
 *  @module apollo.app
 *  @description Provides an Apollo App to serve data throw GraphQL
 * 
 */


import { ApolloServer } from 'apollo-server'
import { ApolloServer as ApolloServerExpress } from 'apollo-server-express'

import App from './app'

import Schemas from '../graphql/main.schemas'
import Resolvers from '../graphql/main.resolvers'

import settings from '../settings/apollo.settings'


/**
 * 
 *  Definitions for Apollo new Instances parameters
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
         *  @private @property { App } instance
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
         *  @description Build or returns a Singleton Instance for Apollo App
         * 
         *  @method build
         *  @param { number | string } port? - Port number
         *  @param { App } middleware? - Middleware throw App specified
         *  @param { object } options? - Options object passed to Apollo Server new instance
         * 
         */
        public static build( { port, middleware }: ApolloProps ) {

            if ( ! Apollo.instance ) {

                // Creates new Instance:
                Apollo.instance =  new Apollo()

                // Sets Properties:
                Apollo.instance.port = ( port || process.env.PORT || 5000 ) as number

                // Get options from apollo.settings file in settings:
                const options: object = Apollo.instance.settings()

                // Create Apollo App as Middleware or Independent:
                if ( middleware ) {

                    Apollo.instance.server = new ApolloServerExpress( options )

                    Apollo.instance.server.applyMiddleware({
                        app: middleware.get()
                    })

                    console.log( 'Apollo: running on', Apollo.instance.server.graphqlPath )

                } else

                    Apollo.instance.server = new ApolloServer( options )

                ;

            }

            return Apollo.instance

        }


        /**
         * 
         *  Gets settings from apollo settings file
         * 
         *  @method settings
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
         *  Returns the Apollo App class Instance
         *  @static @method getInstance
         * 
         */
        public static getInstance(): Apollo {
            return Apollo.instance
        }


        /**
         * 
         *  Gets Apollo App Instance
         *  
         *  @method get
         *  @returns { ApolloServerExpress | ApolloServer }
         *  
         */
        public get(): ApolloServerExpress | ApolloServer {
            return <ApolloServer> this.server
        }


        /**
         *
         *  Runs the Apollo App on specified/system/default port
         * 
         *  @method listen
         *  @returns { Promise }
         * 
         */
        public async start( port?: number ): Promise <void> {

            await ( <ApolloServer> this.server ).listen( port || this.port )
            console.log( 'App: Apollo running on port', this.port )

        }

    }
;

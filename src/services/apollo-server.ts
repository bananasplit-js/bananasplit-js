/**
 *
 *  Apollo Server
 * 
 *  @module apollo-server
 *  @description Provides an Apollo Server
 * 
 */


import { ApolloServer } from 'apollo-server'
import { ApolloServer as ApolloServerExpress } from 'apollo-server-express'

import Server from './express-server'

import Schemas from '../graphql/main.schemas'
import Resolvers from '../graphql/main.resolvers'


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

                // Creates new Instance:
                Apollo.instance =  new Apollo()

                // Sets Properties:
                Apollo.instance.port = ( port || process.env.PORT || 5000 ) as number

                // Defines Resolvers, Schemas, etc as config object:
                const config: object = {
                    typeDefs: Schemas,
                    resolvers: Resolvers
                }

                // Create Apollo Server as Middleware or Independent:
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
         *  Returns the Apollo Server class Instance
         *  @method
         * 
         */
        public static getInstance(): Apollo {
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

            await ( <ApolloServer> this.server ).listen( this.port )
            console.log( 'Server: Apollo running on port', this.port )

        }

    }
;

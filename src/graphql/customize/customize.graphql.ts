/**
 * 
 *  Apollo Customize
 *  @customize
 * 
 *  @module graphql/customize/customize.graphql
 *  @description This function gives to you the Schema for manipulate as you want,
 *               then returns the options object that goes directly to new ApolloServer()
 *               argument for build the instance.
 * 
 */


import { GraphQLSchema } from 'graphql'


export default

    ( schema: GraphQLSchema ): object => {

        // manipulate schema:


        /**
         * 
         *  Your Apollo options goes here!!
         *  @options
         * 
         */
        const options: object = {

            schema,
            context: {}
            // ... rootValue, etc

        }
        

        return options

    }

;

/**
 * 
 *  Apollo Customize
 *  @customize
 *  @module graphql/apollo/customize.graphql
 * 
 *  @description
 *  This file gives to you the opportunity to manipulate the Schema as you want,
 *  function then returns the options object that goes directly to new ApolloServer()
 *  constructor for pull-up your service.
 * 
 */



import { GraphQLSchema } from 'graphql'



export default

    ( schema: GraphQLSchema ): object => {

        // You can manipulate your schema here:


        /**
         * 
         *  Your Apollo options goes in there!!
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

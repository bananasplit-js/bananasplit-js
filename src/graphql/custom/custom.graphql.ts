/**
 * 
 *  Apollo: Customize
 * 
 *  @customize
 *  @module graphql/apollo/customize.graphql
 * 
 *  @description This file gives to you the opportunity to manipulate the Schema as you want,
 *  function then returns the options object that goes directly to new ApolloServer()
 *  constructor for pull-up your service.
 * 
 */



import { GraphQLSchema } from 'graphql'



export default

    ( schema: GraphQLSchema ): object => {

        // You can customize your schema here ---------------

            // Do customizations

        // End ----------------------------------------------



        const options: object = {

            /**
             * 
             *  @options
             *  Your Apollo options goes here
             * 
             */

            schema,
            context: {},

        }
        

        return options

    }

;

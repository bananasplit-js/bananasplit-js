/**
 * 
 *  Apollo: Customize
 *  @module apollo/custom/graphql
 * 
 *  @description allow to manipulate the graphql schema as you want. Returns an options object that is passed directly to the apollo server constructor
 * 
 */
import { GraphQLSchema } from 'graphql'


export default

    ( schema: GraphQLSchema ): object => {

        // Customize the schema here ------------------------------



        // End ----------------------------------------------------


        const options: object = {

            /**
             * 
             *  @options
             *  Your apollo options goes here
             * 
             */
            schema,
            context: {},

        }
        

        return options

    }

;

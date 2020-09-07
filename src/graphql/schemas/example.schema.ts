/**
 * 
 *  Hello Schema example
 *  @schemas
 * 
 *  @module graphql/hello/hello.schema
 *  @description * you can remove it or modify it *
 * 
 *  @use this file as your Schemas template **
 * 
 */

 

import { gql } from 'apollo-server'


export default gql`

    #*
    #
    #   @schemas
    #   Your schemas goes here.
    #
    #*

    type Query {
        hello: String
    }
    
`

/**
 * 
 *  Hello Schema example
 *  @schemas
 * 
 *  @module graphql/hello/hello.schema
 *  @description * you can remove it or modify it *
 * 
 *  @use this file as your Schemas template! ***
 * 
 */


import { gql } from 'apollo-server'


export default gql`

    #*
    #
    #   Your schemas goes here!!
    #   @schemas
    #
    #*

    type Query {
        hello: String
    }
    
`

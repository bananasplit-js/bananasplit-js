/**
 * 
 *  Hello schema example
 *  @schemas
 * 
 *  @module graphql/schemas/example
 *  @description * you can remove it or modify it *
 * 
 *  use this file as your schemas template **
 * 
 */

 

import { gql } from 'apollo-server'


export default gql`

    #*
    #
    #   @schemas
    #   Your schemas goes here
    #
    #*

    type Query {
        hello: String
    }
    
`

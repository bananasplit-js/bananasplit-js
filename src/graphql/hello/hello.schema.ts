/**
 * 
 *  Hello Schema
 *  @module graphql/hello/hello.schema
 * 
 */


import { gql } from 'apollo-server'


export default gql`

    type Query {
        hello: String
    }
    
`

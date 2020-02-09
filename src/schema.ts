/**
 * 
 *  Schemas for Apollo GraphQL Server
 *  @module schema
 * 
 */


import { gql } from 'apollo-server'


export default
    /**
     * 
     *  Schema
     * 
     */
    gql`
        type Query {
            hello: String
        }
    `
;

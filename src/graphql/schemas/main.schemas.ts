/**
 * 
 *  Schemas for Apollo GraphQL Server
 *  @schemas
 * 
 *  @module graphql/main.schema
 *  @description Register all GraphQL Schemas
 * 
 */


 /**
 *
 *  @import @schemas
 *  Your Schemas import goes here.
 * 
 */
import HelloSchema from './example.schema'


export default [
    
    /**
     *
     *  @registry @schemas
     *  Your Schemas registry goes here.
     * 
     */
    HelloSchema,

]

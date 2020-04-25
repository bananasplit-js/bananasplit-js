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
import HelloSchema from './schemas/hello.schema'


export default [
    
    /**
     *
     *  @register @schemas
     *  Your Schemas register goes here.
     * 
     */
    HelloSchema,

]

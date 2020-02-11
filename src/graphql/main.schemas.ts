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
 *  Your Schemas import goes here!!
 *  @import @schemas
 * 
 */
import HelloSchema from './hello/hello.schema'


export default [
    
    /**
     *
     *  Your Schemas register goes here!!
     *  @register @schemas
     * 
     */

    HelloSchema,

]

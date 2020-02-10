/**
 * 
 *  Schemas for Apollo GraphQL Server
 *  @module graphql/main.schema
 * 
 */


 /**
 *
 *  Your Schemas import goes here!!
 *  @schemas @import
 * 
 */
import HelloSchema from './hello/hello.schema'


export default [
    
    /**
     *
     *  Your Schemas register goes here!!
     *  @schemas @register
     * 
     */

    HelloSchema,

]

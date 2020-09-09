/**
 * 
 *  Schemas for apollo server
 *  @schemas
 * 
 *  @module graphql/schemas/main
 *  @description Register all graphql schemas
 * 
 */


/**
 *
 *  @import @schemas
 *  Your schemas import goes here
 * 
 */
import HelloSchema from './example'


export default [
    
    /**
     *
     *  @registry @schemas
     *  Your schemas registry goes here
     * 
     */
    HelloSchema,

]

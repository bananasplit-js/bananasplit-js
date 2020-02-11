/**
 * 
 *  Resolvers for Apollo GraphQL Server
 *  @resolvers
 * 
 *  @module graphql/main.resolvers
 *  @description Registers all GraphQL resolvers
 * 
 */


 /**
 *
 *  Your Resolvers import goes here!!
 *  @import @resolvers
 * 
 */
import HelloResolvers from './hello/hello.resolvers'


export default [
    
    /**
     *
     *  Your Resolvers register goes here!!
     *  @register @resolvers
     * 
     */

    HelloResolvers

]

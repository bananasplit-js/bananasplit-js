/**
 * 
 *  Hello Resolvers example
 *  @resolvers
 *  
 *  @module graphql/hello/hello.resolvers
 *  @description * you can remove it or modify it *
 * 
 *  @use this file as your Resolvers template **
 * 
 */

 

export default {

    /**
     * 
     *  @resolvers
     *  Your resolvers goes here.
     * 
     */
    Query: {
        hello: () => {
            return 'Hello from GraphQL!'
        }
    }
    
}

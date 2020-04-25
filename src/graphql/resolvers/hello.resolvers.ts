/**
 * 
 *  Hello Resolvers example
 *  @resolvers
 *  
 *  @module graphql/hello/hello.resolvers
 *  @description * you can remove it or modify it *
 * 
 *  @use this file as your Resolvers template! ***
 * 
 */

 

export default {

    /**
     * 
     *  Your resolvers goes here!!
     *  @resolvers
     * 
     */

    Query: {
        hello: () => {
            return 'hello from GraphQL!'
        }
    }
    
}

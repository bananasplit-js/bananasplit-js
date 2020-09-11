/**
 * 
 *  Resolvers example
 *  @resolvers
 *  @module graphql/resolvers/example
 * 
 *  @description * you can remove or modify this file *
 * 
 */


export default {

    /**
     * 
     *  @resolvers
     *  Your resolvers goes here
     * 
     */
    Query: {
        hello: () => {
            return 'Hello from GraphQL!'
        }
    }
    
}

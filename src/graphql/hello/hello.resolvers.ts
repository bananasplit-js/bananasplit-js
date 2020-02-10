/**
 * 
 *  Hello Resolvers
 *  @module graphql/hello/hello.resolvers
 * 
 */


export default {

    Query: {
        hello: () => {
            return 'hello from Apollo!'
        }
    }
    
}

/**
 * 
 *  Resolvers for Apollo GraphQL Server
 *  @module resolvers
 * 
 */


export default
    /**
     * 
     *  Resolvers
     * 
     */
    {
        Query: {
            hello: () => {
                return 'hello world!'
            }
        }
    }
;

/**
 * 
 *  Middlewares
 *  @module middlewares/express
 * 
 *  @description contains all express server middlewares
 * 
 */
import Express from 'express'

import Morgan from 'morgan'
import dontenv from 'dotenv'


dontenv.config()


export default ( app: Express.Application ): void => {
    
    /**
     *  @middlewares 
     */
    if ( process.env.NODE_ENV === 'development' )
        app.use( Morgan('dev') )
    ;

    app.use( Express.json() )

    // Public
    app.use(
        Express.static( app.get('public') )
    )

}

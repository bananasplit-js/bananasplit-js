/**
 * 
 *  Middlewares
 *  @module middlewares/example
 * 
 *  @description an example middleware
 * 
 */
import Express, { Request, Response } from 'express'


export default ( app: Express.Application ) => {
    
    /**
     *
     *  @middlewares 
     *  Your middlewares goes here
     * 
     */
    app.use(( req: Request, res: Response, next: Function ) => {

        // middleware

        next()
        
    })

}

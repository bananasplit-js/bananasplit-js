/**
 * 
 *  Middleware: {Name}
 *  @module middlewares/{name}
 * 
 *  @description {description}
 * 
 */
import Express, { Request, Response } from 'express'


export default ( app: Express.Application ): void => {
    
    /**
     *
     *  @middlewares 
     *  Your middlewares goes here
     * 
     */
    app.use(( req: Request, res: Response, next: Function ): void => {

        // middleware

        next()
        
    })

}

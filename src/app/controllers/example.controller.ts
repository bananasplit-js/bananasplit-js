/**
 * 
 *  Controller: {Name}
 *  @module controllers/{name}
 * 
 *  @description {description}
 * 
 */
import { Request, Response } from 'express'


/**
 * 
 *  @model @import
 *  Your model import goes here
 * 
 */



export default

    class Name {
        
        /**
         *  @handler {action description}
         */
        public static action ( req: Request, res: Response ): Response {
            return res.send()
        }

    }

;

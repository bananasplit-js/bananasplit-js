/**
 * 
 *  Router: { Name }
 *  @module app/routes/{name}
 * 
 *  @description { description }
 * 
 */
import { Router } from 'express'


const $: Router = Router()


/**
 * 
 *  @import @controller
 *  Your controller import goes here
 * 
 */



/**
 * 
 *  @routes
 *  Your routes goes here
 * 
 */
$.route( '/url' )
    .get( /* @handler from controller */ )
    .post( /* same */ )
;



export default $

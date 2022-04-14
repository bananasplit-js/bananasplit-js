/**
 *
 *  Services
 *  @module providers/services
 *
 *  @description services provided by bananasplit
 *
 */

import { Express } from '@bananasplit-js'

/* ------------------------------------------------
 *
 *  You can specify ports:
 *      Express.provide({ port: 7000 })
 *
 * -----------------------------------------------*/

// Express server provider
const express: Express = Express.provide()

export { express }

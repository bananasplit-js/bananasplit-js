/**
 *
 *  Interfaces
 *
 *  @module providers/core/interfaces
 *
 *  @description provides shared interfaces in the core
 *
 */

import Express from 'express'

export interface IModule {
	path: string
	filename: string
	type: string
}

export interface IRouters {
	[key: string]: Express.Router
}

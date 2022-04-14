/**
 *
 *  Module autoimport
 *  @interface { IModule }
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

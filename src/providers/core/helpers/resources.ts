/**
 *
 *  Helpers: Resources
 *
 *  @module providers/core/helpers/resources
 *
 *  @description contains resources handlers
 *
 */
import Express from 'express'

import fs from 'fs'
import path from 'path'
import chalk from 'chalk'

// Interfaces
import { IModule } from '@core/interfaces'

/**
 *
 *  Resources types returned by modules
 *
 *  @type
 *
 */
type Resource = Express.Router | undefined

interface IM {
	readonly dir: string
	readonly criteria: RegExp
	readonly excludeList: string[]
	modulesList?: IModule[]
}

interface ILR {
	readonly service: Express.Application
	readonly modulePaths: IModule[]
	readonly moduleParams?: any[]
	callback?: Function
}

/**
 *
 *  Get modules
 *
 *  @description gets all modules path in a directory recursively
 *
 *  @param { IM } params
 *  @returns { IModule[] }
 *
 */
export const getModules = (params: IM): IModule[] => {
	const { dir, criteria, excludeList } = params
	let { modulesList = [] } = params

	const modulePrefix: string = getModulePrefix()
	const modulesDir: string = path.resolve(`${modulePrefix}${dir}`)
	const modules: string[] = fs.readdirSync(modulesDir)

	const r: RegExp[] = process.platform === 'win32' ? [/\\\w+$/, /^\\/] : [/\/\w+$/, /^\//]

	modules.forEach((_module: string) => {
		const modulePath: string = path.resolve(modulesDir, _module)

		if (fs.statSync(modulePath).isDirectory()) {
			// Recursive call
			modulesList = getModules({ dir: modulePath, criteria, excludeList, modulesList })
		} else if (criteria.test(_module) && !excludeList.includes(_module)) {
			modulesList.push({
				path: modulePath,
				filename: _module,
				type: modulesDir.match(r[0])![0].replace(r[1], '')
			})
		}
	})

	return modulesList
}

/**
 *
 *  Get routers
 *
 *  @description gets all router modules path from app routes directory
 *
 *  @returns { IModule[] }
 *
 */
export const getRouters = (): IModule[] => {
	const dir = './src/app/routes'
	const criteria = /^.+\.routes\.(ts|js)$/

	const excludeList: string[] = ['tmpl.routes.ts', 'tmpl.routes.js']

	return getModules({ dir, criteria, excludeList })
}

/**
 *
 *  Get middleware
 *
 *  @description gets express middleware module path from middlewares directory
 *
 *  @returns { IModule[] }
 *
 */
export const getMiddleware = (): IModule[] => {
	const dir = './src/middlewares'
	const criteria = /^express\.(ts|js)$/

	return getModules({ dir, criteria, excludeList: [] })
}

/**
 *
 *  Load resources
 *
 *  @description loads external resources and executes them
 *
 *  @param { ILR } params
 *  @returns { void }
 *
 */
export const loadResources = (params: ILR): void => {
	const { service, modulePaths, moduleParams = [], callback } = params

	modulePaths.forEach((_module: IModule) => {
		const { default: Module } = require(_module.path)

		if (Module instanceof Function) {
			const $resource: Resource = Module.apply(null, [service, ...moduleParams])

			if (callback instanceof Function) {
				callback($resource)
			}
		} else {
			console.warn(
				chalk.yellow(
					`WARNING: @${_module.type} → ${_module.filename.replace(
						/\.(ts|js)$/,
						''
					)} must export a function by default`
				)
			)
		}
	})
}

/**
 *
 *  Get module prefix
 *
 *  @description get the prefix to start compiled app from relative path (not dist)
 *
 *  @returns { string }
 *
 */
export const getModulePrefix = (args = process.argv.slice(2)): string => {
	const c: string = process.platform === 'win32' ? '\\' : '/'
	return args[0] === '--exec' && args[1] ? `${args[1]}${c}` : ''
}

/**
 * 
 *  List Routes
 *  @script src/providers/core/jobs/list-routes
 * 
 *  @description lists all server application routes
 *  @author diegoulloao
 * 
 */


import { express } from "@services"
import Express from "express"

import Table from "cli-table3"
import chalk from "chalk"
import path from "path"


/**
 * 
 *  Gets route path from route regex
 * 
 *  @param { RegExp } regexp
 *  @returns { string }
 * 
 */
const getPathFromRegex = (regexp: RegExp): string => {

	return regexp
		.toString()
		.replace("/^", "")
		.replace("?(?=\\/|$)/i", "")
		.replace(/\\\//g, "/")

}

/**
 * 
 *  Reducer Function: Combines all server application stacks in one
 * 
 *  @param { [] } acc
 *  @param { stacks } any
 *
 *  @returns { any[] }
 * 
 */
const combineStacks = ( acc: [], stack: any ): any[] => {

	if ( stack.handle.stack ) {
		const routerPath: string = getPathFromRegex(stack.regexp)
		const innerStack: object[] = stack.handle.stack.map(
			(s: object) => ({ routerPath, ...s })
		)

		return [...acc, ...innerStack]
	}

	return [...acc, stack]

}

/**
 * 
 *  Get routes from merged stacks
 * 
 *  @param { any[] } stacks
 *  @returns { any[] }
 * 
 */
const getRoutesFromStacks = ( stacks: any[] ): any[] => {

	const routes: any[] = []

	if ( stacks ) {
		for ( const stack of stacks ) {
			if ( stack.route ) {
				const routeLogged: { [index: string]: any } = {}

				for ( const route of stack.route.stack ) {
					const method: any = route.method ? route.method.toUpperCase() : null

					if ( !routeLogged[method] && method ) {
						const stackMethod: string = method
						const stackPath: string = path.resolve(
							[stack.routerPath, stack.route.path, route.path]
								.filter((s: string) => !!s).join("")
						)

						routes.push([
							chalk.cyan.bold(stackMethod),
							chalk.white(stackPath)
						])
					}
				}
			}
		}
	}

	return routes

}

console.log("")
console.log(chalk.yellow("Inspecting routes..."))

const table = new Table({
	head: [
		chalk.yellow.bold("\nmethod\n"),
		chalk.yellow.bold("\nroute\n")
	],

	style: {
		"padding-left": 3,
		"padding-right": 3
	},

	chars: {
		"top": chalk.yellow("═"),
		"top-mid": chalk.yellow("╤"),
		"top-left": chalk.yellow("╔"),
		"top-right": chalk.yellow("╗"),
		"bottom": chalk.yellow("═"),
		"bottom-mid": chalk.yellow("╧"), 
		"bottom-left": chalk.yellow("╚"),
		"bottom-right": chalk.yellow("╝"),
		"left": chalk.yellow("║"),
		"left-mid": "",
		"mid": "",
		"mid-mid": "",
		"right": chalk.yellow("║"),
		"right-mid": "",
		"middle": chalk.yellow("│")
	}
})


const server: Express.Application = express.application()
const stacks: any[] = server._router.stack.reduce(combineStacks, [])
const routes: any[] = getRoutesFromStacks(stacks)

table.push(...routes, ["", ""])

console.log("")
console.log(table.toString(), "\n")
console.log(chalk.green("Are available in your application 🚀"), "\n")

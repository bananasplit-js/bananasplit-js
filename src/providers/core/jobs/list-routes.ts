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
const getPathFromRegex = ( regexp: RegExp ): string => {

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
		// Extract route path from regex
		const routerPath: string = getPathFromRegex(stack.regexp)

		// Collect inner stack adding routePath
		const innerStack: object[] = stack.handle.stack.map(
			(s: object) => ({ routerPath, ...s })
		)

		// Return accumulated inner stack
		return [...acc, ...innerStack]
	}

	// Return accumulated stack
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

	// Routes accumulator
	const routes: any[] = []

	if ( stacks ) {
		for ( const stack of stacks ) {
			if ( stack.route ) {
				const routeLogged: { [index: string]: any } = {}

				for ( const route of stack.route.stack ) {
					// Extract route method
					const method: string | null = route.method ? route.method.toUpperCase() : null

					if ( method && !routeLogged[method] ) {
						// Route path parts
						const fullPathArray: string[] = [stack.routerPath, stack.route.path, route.path]

						// Convert path parts to a entire string
						const stackPath: string = path.resolve(
							fullPathArray.filter((s: string) => !!s).join("")
						)

						// Push method and route to the accumulator
						routes.push([
							chalk.cyan.bold(method),
							chalk.white(stackPath)
						])

						routeLogged[method] = true
					}
				}
			}
		}
	}

	return routes

}

// First message
console.log("")
console.log(chalk.yellow("Inspecting routes..."))

// Server application, stacks and routes
const server: Express.Application = express.application()
const stacks: any[] = server._router.stack.reduce(combineStacks, [])
const routes: any[] = getRoutesFromStacks(stacks)

// Checks if express version >= 4 or exit
if ( !server._router?.stack ) {
	console.log("")
	console.log(chalk.bgRed.black(" You must use a express version >= 4 "), "\n")
	process.exit()
}

// Output table + config
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


// Push routes and an extra space to the table
table.push(...routes, ["", ""])

// Log the table
console.log("")
console.log(table.toString(), "\n")

// Success message
console.log(chalk.green("Are available in your application 🚀"), "\n")

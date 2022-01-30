/**
 * 
 *  Routes List
 *  @script src/providers/core/jobs/routes-list
 * 
 *  @description lists all server application routes
 *  @author diegoulloao
 * 
 */


import Table from "cli-table3"
import chalk from "chalk"
import path from "path"

// Types
import Express from "express"

const { express } = require("@services")
const sortPaths: any = require("sort-route-paths")
const packageJson: any = require("@root/package.json")


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
 *  Colorizes route method string for nice output
 * 
 *  @param { string } method
 *  @returns { string }
 * 
 */
const colorizeRouteMethod = ( method: string ): string => {

	const colors: { [key: string]: string } = {
		"GET": chalk.bgGreen.black.bold(` ${method} `),
		"POST": chalk.bgBlue.black.bold(` ${method} `),
		"PUT": chalk.bgYellow.black.bold(` ${method} `),
		"DELETE": chalk.bgRed.black.bold(` ${method} `),
		"PATCH": chalk.bgCyan.black.bold(` ${method} `)
	}

	return colors[method] || chalk.white.bold(method)

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
		const innerStack: object[] = stack.handle.stack.map((s: any) => {
			// Middlewares collection
			const middlewares: string[] = []

			if ( s.route?.stack ) {
				middlewares.push(...s.route.stack.map((s: any) => s.name))
			}

			return { routerPath, middlewares, ...s }
		})

		// Return accumulated inner stack
		return [...acc, ...innerStack]

	} else if ( stack.route ) {
		// Middlewares collection
		const middlewares: string[] = []

		if ( stack.route.stack ) {
			middlewares.push(...stack.route.stack.map((s: any) => s.name))
		}

		return [...acc, { middlewares, ...stack }]
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
						const middlewaresString: string = stack.middlewares ? stack.middlewares.join(", ") : ""

						// Convert path parts to a entire string
						const stackPath: string = path.resolve(
							fullPathArray.filter((s: string) => !!s).join("")
						)

						routes.push({
							path: stackPath,
							method,
							middlewares: middlewaresString
						})

						// Avoid duplicated routes during iteration
						routeLogged[method] = true
					}
				}
			}
		}
	}

	return routes

}

/**
 * 
 *  Colorizes all routes data in a nice way
 * 
 *  @param { any[] } routes
 *  @returns { any[] }
 * 
 */
const tablerizeRoutes = ( routes: any[] ): any[] => {

	const sortedRoutes: any[] = []
	const r: RegExp = /^\/[a-z0-9]*\/?/
	const i: RegExp = /\//g

	routes.reduce((p: any, n: any): any => {
		// Highlights each :param with chalk
		const highlightedParamsPath: string = n.path.replace(/:[a-z0-9]+/g, chalk.cyan.bold("$&"))

		// Changes <anonymous> by anonymous
		const cleanedMiddlewareString: string = n.middlewares.replace(/^<anonymous>$/g, chalk.red("anonymous"))

		// Add section label if previous and next routes have different base path
		if ( p?.path.match(r)[0].replace(i, "") !== n.path.match(r)[0].replace(i, "") ) {
			// Only add empty row when there is valid previous route
			if (p) sortedRoutes.push(Array(3).fill(""))

			const section: string = n.path.match(r)[0].replace(i, "") || "general"
			const sectionCapitalized: string = section.charAt(0).toUpperCase() + section.substring(1)

			// Push empty row
			sortedRoutes.push(["", chalk.gray(sectionCapitalized), ""])
		}

		// Push route detail row
		sortedRoutes.push([
			colorizeRouteMethod(n.method),
			chalk.white(highlightedParamsPath),
			chalk.gray(cleanedMiddlewareString)
		])

		return n

	}, null)

	return sortedRoutes	

}

// Group filter array passed as params
const groupsParamArray: string[] = process.argv.slice(2)

// First message spacing
console.log("")

if ( !groupsParamArray.length ) {
	// Message when inspecting all routes
	console.log(chalk.yellow("Inspecting all routes..."), "\n")

} else {
	// Message when inspecting groups of routes
	const headMessageArray: string[] = [
		`Inspecting routes that matches with`,
		groupsParamArray.join(groupsParamArray.length > 2 ? ", " : " and ") + "..."
	]

	console.log(chalk.yellow(headMessageArray.join(" ")), "\n")
}

// Show application name if defined in package.json
if ( packageJson.name ) {
	console.log(
		chalk.bgYellow.black.bold(
			` ${packageJson.name.charAt(0).toUpperCase() + packageJson.name.substring(1)} `
		)
	)
}

// Server application, stacks and routes
const server: Express.Application = express.application()
const stacks: any[] = server._router.stack.reduce(combineStacks, [])

// Routes make-up
const routes: any[] = getRoutesFromStacks(stacks)
const sortedRoutes: any = sortPaths(routes, (r: any) => r.path)

// Filtered routes collection if filter defined
let filteredRoutes: any[] | undefined

if ( groupsParamArray.length ) {
	filteredRoutes = sortedRoutes.filter(
		(r: any) => new RegExp(`^\/(${groupsParamArray.join("|")})(\/|$)`).test(r.path)
	)
}

// Colorizes all routes data parts
const tablerizedRoutes: any[] = tablerizeRoutes(filteredRoutes || sortedRoutes)

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
		chalk.yellow.bold("\nroute\n"),
		chalk.yellow.bold("\nmiddlewares\n")
	],

	style: {
		"padding-left": 3,
		"padding-right": 3
	},

	chars: {
		"top": chalk.yellow("─"),
		"top-mid": chalk.yellow("┬"),
		"top-left": chalk.yellow("┌"),
		"top-right": chalk.yellow("┐"),
		"bottom": chalk.yellow("─"),
		"bottom-mid": chalk.yellow("┴"), 
		"bottom-left": chalk.yellow("└"),
		"bottom-right": chalk.yellow("┘"),
		"left": chalk.yellow("│"),
		"left-mid": "",
		"mid": "",
		"mid-mid": "",
		"right": chalk.yellow("│"),
		"right-mid": "",
		"middle": chalk.yellow("│")
	}
})


// Push routes and an extra space to the table
table.push(...tablerizedRoutes, Array(3).fill(""))

// Log the table
console.log(table.toString(), "\n")

// Check if there is anonymous functions used as middlewares
const hasAnonymous: boolean = (
	(filteredRoutes || sortedRoutes).some((r: any) => /<anonymous>/.test(r.middlewares))
)

if ( hasAnonymous ) {
	console.log(
		chalk.red.bold(
			"* Do not use anonymous functions as middlewares, store them in a constant instead.\n"
		)
	)
}

// Success message
if ( !filteredRoutes ) {
	console.log(
		chalk.green(
			`${chalk.bold(`${routes.length} total`)} route${routes.length > 1 ? "s" : ""} available in your application 🚀`
		),
		"\n"
	)

} else {
	// Filtered routes total
	const totalFiltered: number = filteredRoutes.length

	// Message as array
	const filteredSuccessMessage: string[] = [
		`${chalk.bold(`${totalFiltered} of ${routes.length}`)} total route${routes.length > 1 ? "s" : ""}`,
		`that matches with ${chalk.bold(groupsParamArray.join(groupsParamArray.length > 2 ? ", " : " and "))}`,
		`${totalFiltered ? "🚀" : ""}`
	]

	console.log(chalk.green(filteredSuccessMessage.join(" ")), "\n")
}

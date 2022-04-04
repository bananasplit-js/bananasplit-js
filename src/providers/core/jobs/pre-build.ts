/**
 * 
 *  Pre Build
 *  @script src/providers/core/jobs/pre-build
 * 
 *  @description updates module aliases at package.json
 *  @author diegoulloao
 * 
 */
import "tsconfig-paths/register"

import fs from "fs"
import path from "path"
import chalk from "chalk"
import { spawnSync } from "child_process"

// Helpers
const { getRouters } = require("@core/helpers/resources")

// Interfaces
const { IModule } = require("@core/interfaces")

// Require prevents module not found notifications by editor
const packageJson = require( "@root/package.json" )
const tsconfigJson = require( "@root/tsconfig.json" )


console.log(`\n${chalk.yellow("○ Preparing to build...")}`)


/**
 * 
 *  Abort the execution of the script
 * 
 *  @param { string } msg
 *  @returns { void }
 * 
 */
const Abort = ( msg: string ): void => { 
	console.error(`\n${msg}`)
	process.exit(0)
}

// Stores path alias and system path as pair
let pathsPair: [string, string[]][] = []

try {
	// Parse to array of arrays containing path-alias and system-path
	pathsPair = Object.entries(tsconfigJson.compilerOptions.paths)

} catch (_) {
	Abort("Key paths does not exists at tsconfig.json")
}


// Aborts when no paths founded in the list
if ( !pathsPair.length ) {
	Abort("There is no path defined into property paths at tsconfig.json")
}


// Type "any" allow index the object by string
var _moduleAliases: any = {}

// Store the prefix "dist|custom"
const prefix: string = tsconfigJson.compilerOptions.outDir

// Regex for clean /* from path alias
const cRex: RegExp[] = [/\/\*$/, /\/\//]


// Parse each path pair to package.json compatible format
pathsPair.forEach((pathPair: [string, string[]]) => {

	// Removes /* at the end of each path alias: @path-alias/* -> @path-alias
	const index: string = pathPair[0].replace(cRex[0], "")

	// Path to dist depends if root or not
	let distPath: string


	// Removes /* at the end of each system path: path/to/module/* -> path/to/module
	if ( !/@?root/.test(pathPair[0]) )
		distPath = `${prefix}/${pathPair[1][0].replace(cRex[0], "").replace(cRex[1], "/")}`

	else
		distPath = pathPair[1][0].replace(cRex[0], "").replace(cRex[1], "/")
	;

	// Adds package.json compatible path format to the list
	_moduleAliases[index] = distPath
})


// Assigns new formatted paths to package.json
packageJson._moduleAliases = _moduleAliases


try {
	// Writes the changes in package.json
	fs.writeFileSync(path.resolve("./package.json"), JSON.stringify(packageJson, null, 4))

} catch ( err: any ) {
	console.error(err)
	process.exit(1)
}

// All right!
console.log(`${chalk.green("\n● Pre-build:")} module aliases updated at package.json`)

// Copy default routes if no routes were added
const modulePaths: typeof IModule[] = getRouters()

if ( !modulePaths.length ) {
	// Copy default routes file
	const $process = spawnSync(
		"cp",
		[
			path.resolve("./src/providers/core/app/routes/setup.routes.ts"),
			path.resolve("./src/app/routes")
		],
		{ cwd: process.cwd(), stdio: "inherit" }
	)

	if ( $process.status === 0 ) {
		console.log(`${chalk.green("● Pre-build:")} ${chalk.cyan("no routes detected -> default were copied")}`)

	} else {
		console.log(`${chalk.red("● Pre-build:")} no routes detected -> defaults could not be copied`)
	}
}

console.log("")


console.log(chalk.yellow("○ Building...\n"))

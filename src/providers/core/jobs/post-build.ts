/**
 * 
 *  Post Build
 *  @script src/providers/core/jobs/post-build
 * 
 *  @description prepare dist extras for production
 *  @author diegoulloao
 * 
 */
import "tsconfig-paths/register"

import fs from "fs-extra"
import path from "path"
import chalk from "chalk"
import { spawnSync } from "child_process"

// Require prevents module not found notifications by editor
const tsconfigJson = require( "@root/tsconfig.json" )
const tsconfigPathsJson = require( "@root/tsconfig.paths.json" )
const bananasplitJson = require( "@root/bananasplit.json" )
const packageJson = require( "@root/dist/package.json" )


console.log(`\n${chalk.green("● Build:")} app compiled to dist!\n`)
console.log(chalk.yellow("○ Packing..."))


/**
 * 
 *  Abort the execution of the script
 * 
 *  @param { string } msg
 *  @returns { void }
 * 
 */
const Abort = ( msg: string ): void => {
	console.error(chalk.red(`\n${msg}`))
	process.exit(1)
}


// Stores path alias and system path as pair
let pathsPair: [string, string[]][] = []

try {
	// Parse to array of arrays containing path-alias and system-path
	pathsPair = Object.entries(tsconfigPathsJson.compilerOptions.paths)

} catch (_) {
	Abort("Key paths does not exists at tsconfig.json")
}


// Aborts when no paths founded in the list
if ( !pathsPair.length ) {
	Abort("There is no path defined into property paths at tsconfig.json")
}


// Picks includes and excludes files/dir from bananasplit.json
const includes: [string|string[]] = bananasplitJson.dist.include || []
const excludes: string[] = bananasplitJson.dist.exclude || []
const options: Object = bananasplitJson.dist.options || {}

const dist: string = tsconfigJson.compilerOptions.outDir || "dist"


if ( includes.length ) {
	console.log("  ", chalk.cyanBright(`- Copying static files\n`))

	// Copy each extra file/dir to "dist"
	includes.forEach((include: string|string[]) => {

		// Include element can be: "src" or ["src", "dest"]
		const src: string = (include instanceof Array) ? include[0] : include
		const dest: string = (include instanceof Array) ? `${dist}/${include[1]}` : `${dist}/${include}`

		try {
			const copyOptions: object = {
				...options,

				// exclude filter
				filter: ( src: string ): boolean => {
					// Check for windows
					const isWindows: boolean = (process.platform === "win32")
					src = isWindows ? src.replace(/\\/g, "/") : src

					return excludes.includes(src) ? false : true
				}
			}

			// Copy the file or dist recursively
			fs.copy(src, dest, copyOptions)

		} catch ( err: any ) {
			Abort(err)
		}
	})


	console.log(`${chalk.green("● Post-build:")} files copied successfully!`)
}


// Type "any" allow index the object by string
var _moduleAliases: any = {}

// Regex for clean /* from path alias
const cRex: RegExp[] = [/\/\*$/, /\/\//]


/*
 * 
 *  Removes /* from the end of each path pair
 *  @path-alias/*: path/to/module/* -> @path-alias: path/to/module
 * 
 */
pathsPair.forEach((pathPair: [string, string[]]) => {
	const index: string = pathPair[0].replace(cRex[0], "")
	const distPath: string = pathPair[1][0].replace(cRex[0], "").replace(cRex[1], "/")

	_moduleAliases[index] = distPath
})


// Type "any" allow to use delete
const $packageJson: any = packageJson

// Removes all non-production package.json key:values
$packageJson.scripts.dev && delete $packageJson.scripts.dev
$packageJson.scripts.build && delete $packageJson.scripts.build
$packageJson.scripts["build:stack"] && delete $packageJson.scripts["build:stack"]
$packageJson.scripts["route:list"] && delete $packageJson.scripts["routes:list"]
$packageJson.scripts["generator:create"] && delete $packageJson.scripts["generator:create"]
$packageJson.scripts.test && delete $packageJson.scripts.test
$packageJson.scripts["test:watch"] && delete $packageJson.scripts["test:watch"]
$packageJson.scripts["test:coverage"] && delete $packageJson.scripts["test:coverage"]
$packageJson.scripts["test:cache"] && delete $packageJson.scripts["test:cache"]
$packageJson.scripts["upgrade:stack"] && delete $packageJson.scripts["upgrade:stack"]
$packageJson.scripts.lint && delete $packageJson.scripts.lint
$packageJson.scripts["lint:fix"] && delete $packageJson.scripts["lint:fix"]
$packageJson.scripts.prebuild && delete $packageJson.scripts.prebuild
$packageJson.scripts.postbuild && delete $packageJson.scripts.postbuild
$packageJson.devDependencies && delete $packageJson.devDependencies


// Assigns new values to dist/package.json
$packageJson._moduleAliases = _moduleAliases
$packageJson.scripts.start = packageJson.scripts.start.replace(/dist\/|\s--exec\s\w+\s?/g, "")
$packageJson.scripts["build:database"] = packageJson.scripts["build:database"].replace(" && sequelize db:seed:all", "")
$packageJson.main = packageJson.main.replace(/\.ts$/, ".js")


try {
	// Writes the changes into dist/package.json
	fs.writeFileSync(path.resolve("./dist/package.json"), JSON.stringify($packageJson, null, 4))

	// All right!
	console.log(`${chalk.green("● Post-build:")} dist/package.json is ready for production 🚀`)

} catch ( err: any ) {
	console.error(err)
	process.exit(1)
}


// Silent: Remove setup.routes from routes folder if were copied
spawnSync(
	"rm",
	[path.resolve("./src/app/routes/setup.routes.ts")],
	{ cwd: process.cwd(), stdio: "ignore" }
)


console.log(`${chalk.bgGreen.black.bold("\n Build done! ")} ✨\n`)

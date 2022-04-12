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
import { spawnSync, SpawnSyncReturns } from "child_process"

// Types
import { CopyOptionsSync } from "fs-extra"

/*
 *	Note: Require prevents missing module error by LSP
 */

// TS Config json
const tsconfigJson: any = require("@root/tsconfig.json")
const sequelizerc: any = require("@root/.sequelizerc")
const jestConfig: any = require("@root/jest.config.js")

/**
 * 
 *  Abort the execution of the script
 * 
 *  @param { string } msg
 *  @returns { void }
 * 
 */
const Abort = (msg: string): void => {
	console.error(msg)
	process.exit(1)
}


// Script begins ----------------------------------------------------------------------

// Outdir from tsconfig or dist
const dist: string = tsconfigJson.compilerOptions.outDir.replace(/\/$/, "") || "dist"

// Require prevents module not found notifications by editor
const bananasplitLocalJSON: any = require("@root/bananasplit.json")
const bananasplitJSON: any = require("@core/bananasplit.json")

// Dist package.json
const packageJson: any = require(path.resolve(process.cwd(), `${dist}/package.json`))

// Prettier conf if exists
let prettierJson: any = null

try {
	prettierJson = require("@root/.prettierrc")

} catch (_) {
	prettierJson = { tabWidth: 2 }
}

// Get all tests folder roots
const testConfigPaths: string[] = jestConfig.roots

// Check if at least one folder exists
const hasTests: boolean | undefined = testConfigPaths.some((f: string) => {
	// Dist tests folder absolute path
	const distTestFolderPath: string = path.resolve(
		process.cwd(),
		path.join(dist, f.replace("<rootDir>/", ""))
	)

	console.log(distTestFolderPath)

	// Return true if exists, otherwise false
	return fs.existsSync(distTestFolderPath)
})

// Build logs
console.log(`\n${chalk.green("● Build:")} app compiled to ${dist}!\n`)
console.log(chalk.yellow("○ Packing..."))

// Banana default includes and local banana includes
const bananaIncludes: Array<string|string[]> = bananasplitJSON.dist.include
const localIncludes: Array<string|string[]> = bananasplitLocalJSON.dist.include

// Picks includes files/dir from both bananasplit.json
const includes: Array<string|string[]> = [...bananaIncludes, ...localIncludes]

// Banana default excludes and local banana excludes
const bananaExcludes: string[] = bananasplitJSON.dist.exclude
const bananaLocalExcludes: string[] = bananasplitLocalJSON.dist.exclude

// Picks excludes files/dir from both bananasplit.json
const excludes: string[] = [...bananaExcludes, ...bananaLocalExcludes]

// If no tests then add jest.config to the excludes list
if (!hasTests) {
	excludes.push("jest.config.js")
}

// Fs copy partial options
const options: Partial<CopyOptionsSync> = bananasplitLocalJSON.dist.options || {}

if (includes.length) {
	console.log(" ", chalk.cyanBright(`Copying included files`))

	// Copy each extra file/dir to "dist"
	includes.forEach((include: string|string[]) => {
		// Include element can be: "src" or ["src", "dest"]
		const src: string = Array.isArray(include) ? include[0] : include
		const dest: string = Array.isArray(include) ? `${dist}/${include[1]}` : `${dist}/${include}`

		try {
			const copyOptions: CopyOptionsSync = {
				...options,

				// exclude filter
				filter: (src: string): boolean => {
					// Check for windows
					const isWindows: boolean = (process.platform === "win32")
					src = isWindows ? src.replace(/\\/g, "/") : src

					return excludes.includes(src) ? false : true
				}
			}

			// Copy the file or dist recursively
			fs.copySync(
				path.resolve(process.cwd(), src),
				path.resolve(process.cwd(), dest),
				copyOptions
			)

			// File copy success log
			console.log(
				chalk.cyan("    ✔ "),
				chalk.cyan(
					`${src} ${src !== dest.replace(new RegExp(`^${dist}/`), "") ? `-> ${dest}` : ""}`
				)
			)

		} catch (e: any) {
			// File copy error log
			console.log(
				chalk.red(
					`    ✘  ${src} ${src !== dest.replace(new RegExp(`^${dist}/`), "") ? `-> ${dest}` : ""}\n`
				)
			)

			process.exit(1)
		}
	})

	console.log(`\n${chalk.green("● Post-build:")} files copied successfully!`)
}

// Migrations and database absolute paths
const distMigrationsPath: string = path.resolve(
	process.cwd(),
	path.join(dist, sequelizerc["migrations-path"].replace(process.cwd(), ""))
)
 
const distDatabasePath: string = path.normalize(distMigrationsPath.replace(/\/[A-Za-z0-9_-]+$/, ""))

// Migrations relative path to the project
const distMigrationsRelativePath: string = (
	path.normalize(distMigrationsPath.replace(process.cwd(), ""))
		.replace(/^\//, "")
)

// Check if database folder exists
if (!fs.existsSync(distDatabasePath)) {
	// Adds database and migrations folders. This avoid "no migrations folder found" when running migrations
	const $createMigrationsFolderProcess: SpawnSyncReturns<Buffer> = (
		spawnSync("mkdir", [distDatabasePath, distMigrationsPath], { stdio: "ignore" })
	)

	// If migrations folder creation fails, log an error message
	if ($createMigrationsFolderProcess.status === 1) {
		console.error("\nCould not create migrations folders.")
		console.error("This can cause \"no such file or directory migrations\" message when running migrations.")
		console.error("\nTo avoid this add it manually: ", chalk.gray(distMigrationsRelativePath))
	}

	// Else omit and continue
}

// Type "any" allow to use delete
const $packageJson: any = packageJson

// If there are tests then remove ts-jest preset from jest.config.js
if (hasTests) {
	try {
		// Read the file
		let jestConfigData: string = fs.readFileSync(
			path.resolve(process.cwd(), `${dist}/jest.config.js`),
			"utf-8"
		)

		// Delete ts-node string between double quotes
		jestConfigData = jestConfigData.replace("\"ts-jest\"", "\"\"")

		// Write changes in the same file
		fs.writeFileSync(
			path.resolve(process.cwd(), `${dist}/jest.config.js`),
			jestConfigData
		)

		// Remove --passWithNoTests because if no tests, then test script is removed
		$packageJson.scripts.test = $packageJson.scripts.test
			? $packageJson.scripts.test.replace(/--passWithNoTests\s?/, "")
			: "jest --runInBand"

		console.log(`${chalk.green("● Post-build:")} jest.config.js updated!`)

	} catch(_) {
		Abort("\nCould not remove ts-node preset from jest.config.js\n")
	}

} else {
	// If there are no tests, then delete test script from package.json
	$packageJson.scripts.test && delete $packageJson.scripts.test

	// Delete test dependencies included by bananasplit-js
	;["jest", "supertest"].forEach((d: string) => {
		$packageJson.dependencies[d] && delete $packageJson.dependencies[d]
	})
}

// Removes all non-production package.json key:values
$packageJson.scripts.dev && delete $packageJson.scripts.dev
$packageJson.scripts.build && delete $packageJson.scripts.build
$packageJson.scripts["build:stack"] && delete $packageJson.scripts["build:stack"]
$packageJson.scripts["route:list"] && delete $packageJson.scripts["route:list"]
$packageJson.scripts["generator:create"] && delete $packageJson.scripts["generator:create"]
$packageJson.scripts["test:watch"] && delete $packageJson.scripts["test:watch"]
$packageJson.scripts["test:coverage"] && delete $packageJson.scripts["test:coverage"]
$packageJson.scripts["test:cache"] && delete $packageJson.scripts["test:cache"]
$packageJson.scripts["upgrade:stack"] && delete $packageJson.scripts["upgrade:stack"]
$packageJson.scripts.lint && delete $packageJson.scripts.lint
$packageJson.scripts["lint:fix"] && delete $packageJson.scripts["lint:fix"]
$packageJson.scripts.prebuild && delete $packageJson.scripts.prebuild
$packageJson.scripts.postbuild && delete $packageJson.scripts.postbuild
$packageJson.devDependencies && delete $packageJson.devDependencies

$packageJson.scripts.start = "node src/app"
$packageJson.scripts["build:database"] = packageJson.scripts["build:database"].replace(" && sequelize db:seed:all", "")
$packageJson.main = packageJson.main.replace(/\.ts$/, ".js")

try {
	// Writes the changes into dist/package.json
	fs.writeFileSync(
		path.resolve(process.cwd(), `${dist}/package.json`),
		JSON.stringify($packageJson, null, prettierJson.tabWidth || 2)
	)

	// All right!
	console.log(`${chalk.green("● Post-build:")} ${dist}/package.json is ready for production 🚀`)

} catch (_) {
	Abort("\nCould not write changes in package.json\n")
}

// Silent: Remove setup.routes from routes folder if were copied
spawnSync(
	"rm",
	[path.resolve(process.cwd(), "src/app/routes/default.routes.ts")],
	{ cwd: process.cwd(), stdio: "ignore" }
)

// Output message
console.log(chalk.gray(`\nOutput directory: ${path.resolve(process.cwd(), `${dist}/`)}`))

// Success output message
console.log(`${chalk.bgGreen.black.bold("\n Build done! ")} ✨\n`)
